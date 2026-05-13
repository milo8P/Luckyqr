const Stripe = require('stripe')

export const config = {
  api: { bodyParser: false }
}

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

module.exports = async function handler(req, res) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const sig    = req.headers['stripe-signature']
  const buf    = await buffer(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch(e) {
    console.error('Webhook error:', e.message)
    return res.status(400).send('Webhook error: ' + e.message)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId  = session.metadata.userId

    console.log('Session completa:', JSON.stringify(session))
    console.log('Activando premium para userId:', userId)

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        apikey:         process.env.SUPABASE_KEY,
        Authorization:  `Bearer ${process.env.SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer:         'return=minimal'
      },
      body: JSON.stringify({ plan: 'premium' })
    })
  }

  res.json({ received: true })
}