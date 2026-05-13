const Stripe = require('stripe')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const { userId, email } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: 'price_1TWlWRJ2mvjOcUaYhf4lUSuT',
        quantity: 1
      }],
      customer_email: email,
      metadata: { userId },
      success_url: 'https://lucky-qr.com/?premium=success',
      cancel_url: 'https://lucky-qr.com/?premium=cancelled',
    })

    res.json({ url: session.url })
  } catch(e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}