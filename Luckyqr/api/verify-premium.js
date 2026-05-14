const { createClient } = require('@supabase/supabase-js')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ premium: false, error: 'No token' })
    }

    const token = auth.replace('Bearer ', '')

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ premium: false, error: 'Invalid token' })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const isPremium = profile?.plan === 'premium'
    return res.json({ premium: isPremium })

  } catch (e) {
    console.error('verify-premium error:', e)
    return res.status(500).json({ premium: false, error: e.message })
  }
}
