const crypto = require('crypto')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const signature = req.headers['paddle-signature']
    if (!signature) return res.status(401).json({ error: 'No signature' })

    // Parsear la firma de Paddle: ts=xxx;h1=xxx
    const parts = {}
    signature.split(';').forEach(part => {
      const [key, value] = part.split('=')
      parts[key] = value
    })

    const ts = parts['ts']
    const h1 = parts['h1']

    if (!ts || !h1) return res.status(401).json({ error: 'Invalid signature format' })

    // Leer el body raw (bodyParser deshabilitado)
    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const rawBody = Buffer.concat(chunks).toString('utf8')
    const body = JSON.parse(rawBody)

    // Construir el payload firmado: ts:rawBody
    const signedPayload = `${ts}:${rawBody}`

    // Calcular HMAC
    const secret = process.env.PADDLE_WEBHOOK_SECRET
    const computed = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex')

    console.log('Expected h1:', computed)
    console.log('Received h1:', h1)
    console.log('Secret present:', !!secret)

    if (computed !== h1) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = body
    console.log('Paddle event type:', event.event_type)

    // transaction.completed o subscription.activated → activar Premium
    if (event.event_type === 'transaction.completed' || event.event_type === 'subscription.activated') {
      const userId = event.data?.custom_data?.user_id
      console.log('userId from custom_data:', userId)

      if (userId) {
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            apikey: process.env.SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ plan: 'premium' })
        })
        console.log('Supabase update status:', response.status)
      }
    }

    // subscription.canceled → volver a free
    if (event.event_type === 'subscription.canceled') {
      const userId = event.data?.custom_data?.user_id
      if (userId) {
        await fetch(`${process.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            apikey: process.env.SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ plan: 'free' })
        })
      }
    }

    return res.json({ received: true })

  } catch(e) {
    console.error('Paddle webhook error:', e)
    return res.status(500).json({ error: e.message })
  }
}

module.exports.config = {
  api: { bodyParser: false }
}
