const Stripe = require('stripe')

const rateMap = new Map()

function isRateLimited(ip, max, windowMs) {
  const now = Date.now()
  const cutoff = now - windowMs
  const hits = (rateMap.get(ip) || []).filter(t => t > cutoff)
  if (hits.length >= max) return true
  hits.push(now)
  rateMap.set(ip, hits)
  return false
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip, 5, 60_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes' })
  }

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