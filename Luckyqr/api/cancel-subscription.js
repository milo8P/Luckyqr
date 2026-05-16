module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { userId } = req.body
  try {
    const response = await fetch('https://api.paddle.com/subscriptions?status=active', {
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('Paddle subscriptions:', JSON.stringify(data))

    const sub = data.data?.find(s => s.custom_data?.user_id === userId)

    if (!sub) return res.status(404).json({ error: 'No active subscription found' })

    const cancelRes = await fetch(`https://api.paddle.com/subscriptions/${sub.id}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ effective_from: 'next_billing_period' })
    })

    const cancelData = await cancelRes.json()
    console.log('Cancel response:', JSON.stringify(cancelData))

    return res.json({ success: true })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
