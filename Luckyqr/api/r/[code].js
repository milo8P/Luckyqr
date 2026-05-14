const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

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

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip, 30, 60_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes' })
  }

  const { code } = req.query

  if (!code) {
    return res.status(400).send('Código QR no especificado')
  }

  // Buscar QR en Supabase
  const qrRes = await fetch(
    `${SUPABASE_URL}/rest/v1/dynamic_qrs?short_code=eq.${code}&select=destination_url,id`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const data = await qrRes.json()

  if (!data || data.length === 0) {
    return res.status(404).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>QR no encontrado — Lucky QR</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf9f7;color:#18160f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
.box{text-align:center;max-width:400px}
.icon{font-size:4rem;margin-bottom:1rem}
h1{font-size:1.8rem;font-weight:600;margin-bottom:.5rem}
p{font-size:.9rem;color:#7a756c;line-height:1.8;margin-bottom:2rem}
a{display:inline-block;padding:.75rem 1.5rem;background:#1d6b4a;color:#fff;border-radius:12px;text-decoration:none;font-size:.88rem;font-weight:500}
a:hover{background:#155638}
</style>
</head>
<body>
<div class="box">
  <div class="icon">🍀</div>
  <h1>QR no encontrado</h1>
  <p>Este código QR no existe o fue eliminado. Si creaste este QR, iniciá sesión para verificarlo.</p>
  <a href="https://lucky-qr.com">Ir a Lucky QR</a>
</div>
</body>
</html>`)
  }

  const { destination_url, id } = data[0]

  // Guardar escaneo
  const ua = req.headers['user-agent'] || ''
  const device = /mobile/i.test(ua) ? 'mobile' : 'desktop'
  const country = req.headers['x-vercel-ip-country'] || 'desconocido'
  const browser = /chrome/i.test(ua) ? 'Chrome' : /firefox/i.test(ua) ? 'Firefox' : /safari/i.test(ua) ? 'Safari' : 'Otro'

  await fetch(`${SUPABASE_URL}/rest/v1/qr_scans`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ qr_id: id, device, country, browser })
  })

  // Redirigir
  res.redirect(302, destination_url)
}