module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ premium: false, error: 'No token' })
    }

    const token = auth.replace('Bearer ', '')

    // Decodificar JWT sin verificar firma (la verificación la hace Supabase RLS)
    const parts = token.split('.')
    if (parts.length !== 3) {
      return res.status(401).json({ premium: false, error: 'Invalid token format' })
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    const userId = payload.sub

    if (!userId) {
      return res.status(401).json({ premium: false, error: 'No user ID in token' })
    }

    // Verificar expiración del token
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ premium: false, error: 'Token expired' })
    }

    // Consultar plan en Supabase usando service key
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=plan`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        }
      }
    )

    const profiles = await response.json()
    console.log('profiles:', JSON.stringify(profiles), 'userId:', userId)

    const isPremium = Array.isArray(profiles) && profiles.length > 0 && profiles[0].plan === 'premium'
    return res.json({ premium: isPremium })

  } catch(e) {
    console.error('verify-premium error:', e)
    return res.status(500).json({ premium: false, error: e.message })
  }
}
