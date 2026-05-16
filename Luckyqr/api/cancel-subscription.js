module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { userId, email } = req.body
  try {
    const response = await fetch('https://api.paddle.com/subscriptions?status=active&per_page=50', {
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
      }
    })
    const data = await response.json()
    console.log('All subscriptions:', JSON.stringify(data))

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({ error: 'No active subscriptions found' })
    }

    let sub = data.data.find(s => s.custom_data?.user_id === userId)

    if (!sub && email) {
      const custRes = await fetch(`https://api.paddle.com/customers?email=${encodeURIComponent(email)}`, {
        headers: { 'Authorization': `Bearer ${process.env.PADDLE_API_KEY}` }
      })
      const custData = await custRes.json()
      console.log('Customers:', JSON.stringify(custData))

      if (custData.data && custData.data.length > 0) {
        const customerId = custData.data[0].id
        sub = data.data.find(s => s.customer_id === customerId)
      }
    }

    if (!sub) {
      return res.status(404).json({ error: 'No subscription found for this user', userId, subscriptions: data.data.length })
    }

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
    console.error('Cancel error:', e)
    return res.status(500).json({ error: e.message })
  }
}
