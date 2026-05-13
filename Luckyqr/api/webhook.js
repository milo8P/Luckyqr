const Stripe = require('stripe')

module.exports = async function handler(req, res) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const sig    = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret)
  } catch(e) {
    return res.status(400).send('Webhook error: ' + e.message)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId  = session.metadata.userId

    // activar Premium en Supabase
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        apikey:          process.env.SUPABASE_KEY,
        Authorization:  `Bearer ${process.env.SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plan: 'premium', stripe_customer_id: session.customer })
    })
  }

  res.json({ received: true })
}