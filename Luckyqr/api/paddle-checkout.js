module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { userId, email } = req.body

    const response = await fetch('https://api.paddle.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
        'Paddle-Version': '1'
      },
      body: JSON.stringify({
        items: [{
          price_id: process.env.PADDLE_PRICE_ID,
          quantity: 1
        }],
        customer: { email },
        custom_data: { user_id: userId },
        checkout: {
          url: 'https://lucky-qr.com/success.html'
        },
        currency_code: 'USD'
      })
    })

    const data = await response.json()
    console.log('Paddle full response:', JSON.stringify(data))

    if (data.data?.checkout?.url) {
      return res.json({ url: data.data.checkout.url })
    }

    return res.status(500).json({
      error: 'No checkout URL',
      data,
      apiKey: process.env.PADDLE_API_KEY ? 'present' : 'missing',
      priceId: process.env.PADDLE_PRICE_ID || 'missing'
    })

  } catch(e) {
    console.error('Paddle error:', e)
    return res.status(500).json({ error: e.message })
  }
}
