const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'

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
  if (isRateLimited(ip, 10, 3_600_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intentá en una hora.' })
  }

  const auth = req.headers['authorization']
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' })
  }
  const jwt = auth.slice(7)

  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (!serviceKey) return res.status(500).json({ error: 'Configuración interna' })

  let authUser
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${jwt}`
      }
    })
    if (!userRes.ok) return res.status(401).json({ error: 'Token inválido' })
    authUser = await userRes.json()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }

  if (!authUser?.id) return res.status(401).json({ error: 'Token inválido' })

  try {
    const profileRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(authUser.id)}&select=plan&limit=1`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`
        }
      }
    )
    const profiles = await profileRes.json()
    const premium = Array.isArray(profiles) && profiles[0]?.plan === 'premium'
    return res.json({ premium })
  } catch {
    return res.status(500).json({ error: 'Error al verificar el plan' })
  }
}
