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

function notFoundPage() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>QR no encontrado — Lucky QR</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
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
</html>`
}

function desktopPage(name, iosUrl, androidUrl) {
  const iosBtn = iosUrl ? `
    <a class="btn btn-ios" href="${iosUrl}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
      App Store (iOS)
    </a>` : ''

  const androidBtn = androidUrl ? `
    <a class="btn btn-android" href="${androidUrl}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
      Play Store (Android)
    </a>` : ''

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${name ? name + ' — ' : ''}Descargar App — Lucky QR</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf9f7;color:#18160f;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:2rem;gap:1rem}
.card{background:#fff;border-radius:20px;border:1px solid #e8e3dc;padding:2.5rem 2rem;text-align:center;max-width:360px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.07)}
.logo{font-size:.75rem;font-weight:600;color:#1d6b4a;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.5rem;opacity:.7}
h1{font-size:1.45rem;font-weight:600;margin-bottom:.4rem}
.sub{font-size:.85rem;color:#7a756c;margin-bottom:1.75rem;line-height:1.6}
.btns{display:flex;flex-direction:column;gap:.75rem}
.btn{display:flex;align-items:center;justify-content:center;gap:.65rem;padding:.85rem 1.25rem;border-radius:14px;text-decoration:none;font-size:.92rem;font-weight:500;transition:transform .15s,opacity .15s}
.btn:hover{transform:translateY(-2px);opacity:.92}
.btn-ios{background:#18160f;color:#fff}
.btn-android{background:#1d6b4a;color:#fff}
.powered{font-size:.72rem;color:#b0aa9f}
.powered a{color:#1d6b4a;text-decoration:none}
.powered a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="card">
  <div class="logo">Lucky QR</div>
  <h1>${name || 'Descargar App'}</h1>
  <p class="sub">Elegí tu plataforma para descargar la aplicación</p>
  <div class="btns">
    ${iosBtn}
    ${androidBtn}
  </div>
</div>
<div class="powered">Creado con <a href="https://lucky-qr.com">Lucky QR</a></div>
</body>
</html>`
}

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip, 30, 60_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes' })
  }

  const { code } = req.query
  if (!code) return res.status(400).send('Código QR no especificado')

  const qrRes = await fetch(
    `${SUPABASE_URL}/rest/v1/app_qrs?code=eq.${encodeURIComponent(code)}&select=ios_url,android_url,name`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const data = await qrRes.json()

  if (!data || data.length === 0) {
    return res.status(404).send(notFoundPage())
  }

  const { ios_url, android_url, name } = data[0]
  const ua = req.headers['user-agent'] || ''

  if (/iPhone|iPad|iPod/i.test(ua) && ios_url) {
    return res.redirect(302, ios_url)
  }
  if (/Android/i.test(ua) && android_url) {
    return res.redirect(302, android_url)
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  return res.status(200).send(desktopPage(name, ios_url, android_url))
}
