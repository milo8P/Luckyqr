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

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_KEY
  const supabaseHeaders = {
    apikey:         SUPABASE_KEY,
    Authorization:  `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer:         'return=minimal'
  }

  // pago completado → activar Premium
  if (event.type === 'checkout.session.completed') {
    const session      = event.data.object
    const userId       = session.metadata.userId
    const planExpires  = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    console.log('Activando premium para:', userId)
    await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: supabaseHeaders,
      body: JSON.stringify({ plan: 'premium', stripe_customer_id: session.customer, plan_expires_at: planExpires })
    })
  }

  // pago fallido → volver a free
  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object
    const customerId    = paymentIntent.customer
    if (customerId) {
      console.log('Pago fallido para customer:', customerId)
      await fetch(`${SUPABASE_URL}/rest/v1/profiles?stripe_customer_id=eq.${customerId}`, {
        method: 'PATCH',
        headers: supabaseHeaders,
        body: JSON.stringify({ plan: 'free' })
      })
    }
  }

  // suscripción cancelada → volver a free
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    const customerId   = subscription.customer
    console.log('Cancelando premium para customer:', customerId)
    await fetch(`${SUPABASE_URL}/rest/v1/profiles?stripe_customer_id=eq.${customerId}`, {
      method: 'PATCH',
      headers: supabaseHeaders,
      body: JSON.stringify({ plan: 'free' })
    })
  }

  res.json({ received: true })
}