// SQL to run manually in Supabase SQL editor:
// alter table qr_scans add column if not exists city text;
// alter table qr_scans add column if not exists os text;
// alter table qr_scans add column if not exists hour int;
// alter table dynamic_qrs add column if not exists password text;
// alter table dynamic_qrs add column if not exists password_enabled boolean default false;

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

function detectOS(ua) {
  if (/windows/i.test(ua)) return 'Windows'
  if (/iphone|ipad/i.test(ua)) return 'iOS'
  if (/android/i.test(ua)) return 'Android'
  if (/mac os x|macintosh/i.test(ua)) return 'Mac'
  if (/linux/i.test(ua)) return 'Linux'
  return 'Otro'
}

function passwordPage(code, error) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>QR protegido — Lucky QR</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf9f7;color:#18160f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
.box{background:#fff;border:1px solid #e8e4de;border-radius:18px;box-shadow:0 8px 32px rgba(0,0,0,.08);padding:2.5rem;width:100%;max-width:380px;text-align:center}
.icon{font-size:3rem;margin-bottom:1rem}
h1{font-size:1.4rem;font-weight:600;margin-bottom:.4rem}
.sub{font-size:.85rem;color:#7a756c;margin-bottom:1.5rem}
input[type=password]{width:100%;padding:.75rem 1rem;border:1px solid #e8e4de;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.95rem;color:#18160f;outline:none;background:#faf9f7;transition:border-color .2s;margin-bottom:1rem;text-align:center;letter-spacing:3px}
input[type=password]:focus{border-color:#1d6b4a;box-shadow:0 0 0 3px rgba(29,107,74,.1)}
button{width:100%;padding:.8rem;background:#1d6b4a;color:#fff;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:500;cursor:pointer;transition:background .18s}
button:hover{background:#155638}
.pw-error{color:#b83232;background:#fdf0f0;border:1px solid #f5c6c6;border-radius:8px;padding:8px 12px;font-size:.8rem;margin-bottom:1rem;display:block}
.brand{margin-top:1.75rem;font-size:.72rem;color:#b0a99e}
.brand a{color:#1d6b4a;text-decoration:none}
</style>
</head>
<body>
<div class="box">
  <div class="icon">🔒</div>
  <h1>QR protegido</h1>
  <p class="sub">Este contenido requiere contraseña para acceder.</p>
  ${error ? '<span class="pw-error">' + error + '</span>' : ''}
  <input type="password" id="pwd" placeholder="••••••••" autofocus/>
  <button onclick="go()">Acceder</button>
  <div class="brand">Powered by <a href="https://lucky-qr.com">Lucky QR</a></div>
</div>
<script>
function go(){
  var v=document.getElementById('pwd').value;
  if(!v)return;
  window.location.href='/r/${code}?pwd='+encodeURIComponent(v);
}
document.getElementById('pwd').addEventListener('keydown',function(e){if(e.key==='Enter')go();});
</script>
</body>
</html>`
}

function notFoundPage() {
  return `<!DOCTYPE html>
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
</html>`
}

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip, 30, 60_000)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes' })
  }

  const { code, pwd } = req.query

  if (!code) {
    return res.status(400).send('Código QR no especificado')
  }

  const qrRes = await fetch(
    `${SUPABASE_URL}/rest/v1/dynamic_qrs?short_code=eq.${encodeURIComponent(code)}&select=destination_url,id,password,password_enabled`,
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

  const { destination_url, id, password, password_enabled } = data[0]

  if (password_enabled && password) {
    if (!pwd) {
      return res.status(200).send(passwordPage(code, ''))
    }
    if (pwd !== password) {
      return res.status(200).send(passwordPage(code, 'Contraseña incorrecta. Intentá de nuevo.'))
    }
  }

  const ua = req.headers['user-agent'] || ''
  const device = /mobile/i.test(ua) ? 'mobile' : 'desktop'
  const country = req.headers['x-vercel-ip-country'] || 'desconocido'
  const city = req.headers['x-vercel-ip-city'] || ''
  const browser = /chrome/i.test(ua) ? 'Chrome' : /firefox/i.test(ua) ? 'Firefox' : /safari/i.test(ua) ? 'Safari' : 'Otro'
  const os = detectOS(ua)
  const hour = new Date().getHours()

  await fetch(`${SUPABASE_URL}/rest/v1/qr_scans`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ qr_id: id, device, country, browser, city, os, hour })
  })

  res.redirect(302, destination_url)
}
