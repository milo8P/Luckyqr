const crypto = require('crypto')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const signature = req.headers['paddle-signature']
    const rawBody = JSON.stringify(req.body)

    const secret = process.env.PADDLE_WEBHOOK_SECRET
    const [tsPart, h1Part] = signature.split(';')
    const ts = tsPart.replace('ts=', '')
    const h1 = h1Part.replace('h1=', '')

    const signed = `${ts}:${rawBody}`
    const expected = crypto.createHmac('sha256', secret).update(signed).digest('hex')

    if (expected !== h1) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = req.body
    console.log('Paddle event:', event.event_type)

    if (event.event_type === 'subscription.activated' || event.event_type === 'transaction.completed') {
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
          body: JSON.stringify({ plan: 'premium' })
        })
        console.log('Premium activado para:', userId)
      }
    }

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
        console.log('Premium cancelado para:', userId)
      }
    }

    res.json({ received: true })
  } catch(e) {
    console.error('Paddle webhook error:', e)
    res.status(500).json({ error: e.message })
  }
}
