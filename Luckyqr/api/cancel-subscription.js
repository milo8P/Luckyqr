const Stripe = require('stripe')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const { customerId } = req.body

  try {
    // buscar suscripción activa
    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1
    })

    if (!subs.data.length) {
      return res.status(404).json({ error: 'No hay suscripción activa' })
    }

    // cancelar al final del período
    await stripe.subscriptions.update(subs.data[0].id, {
      cancel_at_period_end: true
    })

    res.json({ success: true })
  } catch(e) {
    res.status(500).json({ error: e.message })
  }
}