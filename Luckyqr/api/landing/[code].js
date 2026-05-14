// SQL to run manually in Supabase SQL editor:
// create table if not exists landing_pages (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   code text unique not null,
//   title text,
//   description text,
//   button_text text,
//   button_url text,
//   bg_color text default '#ffffff',
//   accent_color text default '#1d6b4a',
//   created_at timestamp default now()
// );
// alter table landing_pages enable row level security;
// create policy "Usuario ve sus landing pages" on landing_pages for all using (auth.uid() = user_id);
// create policy "Publico puede leer landing pages" on landing_pages for select using (true);

const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function safeUrl(url) {
  if (!url) return '#'
  const u = String(url).trim()
  return (u.startsWith('https://') || u.startsWith('http://')) ? u : '#'
}

export default async function handler(req, res) {
  const { code } = req.query
  if (!code) return res.status(400).send('Código no especificado')

  const lRes = await fetch(
    `${SUPABASE_URL}/rest/v1/landing_pages?code=eq.${encodeURIComponent(code)}&select=title,description,button_text,button_url,bg_color,accent_color`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const data = await lRes.json()
  if (!data || data.length === 0) {
    return res.status(404).send(`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><title>Página no encontrada</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#faf9f7;text-align:center}
.b{max-width:400px}.ic{font-size:3rem;margin-bottom:1rem}a{color:#1d6b4a}</style></head>
<body><div class="b"><div class="ic">🍀</div><h1 style="font-size:1.5rem;margin-bottom:.5rem">Página no encontrada</h1>
<p style="color:#7a756c;margin-bottom:1.5rem">Esta landing page no existe o fue eliminada.</p>
<a href="https://lucky-qr.com">Ir a Lucky QR</a></div></body></html>`)
  }

  const { title, description, button_text, button_url, bg_color, accent_color } = data[0]
  const bg = escapeHtml(bg_color || '#ffffff')
  const accent = escapeHtml(accent_color || '#1d6b4a')
  const safeBtn = safeUrl(button_url)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(title || 'Lucky QR Landing')}</title>
<meta name="robots" content="noindex"/>
<meta property="og:title" content="${escapeHtml(title || '')}"/>
<meta property="og:description" content="${escapeHtml(description || '')}"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:${bg};min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem}
.card{background:#fff;border-radius:24px;box-shadow:0 8px 48px rgba(0,0,0,.12);padding:3rem 2.5rem;max-width:500px;width:100%;text-align:center}
.brand{font-size:.65rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:${accent};margin-bottom:2.5rem;display:flex;align-items:center;justify-content:center;gap:6px}
.brand-dot{width:6px;height:6px;background:${accent};border-radius:50%}
h1{font-size:2.2rem;font-weight:600;color:#18160f;margin-bottom:1.25rem;line-height:1.2;letter-spacing:-.5px}
.desc{font-size:1rem;color:#7a756c;line-height:1.8;margin-bottom:2.5rem}
.btn{display:inline-block;padding:1rem 2.5rem;background:${accent};color:#fff;border-radius:14px;text-decoration:none;font-size:1rem;font-weight:500;transition:all .2s;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}
.footer{margin-top:2.5rem;font-size:.7rem;color:${accent};opacity:.6}
.footer a{color:inherit;text-decoration:none}
.footer a:hover{opacity:1}
</style>
</head>
<body>
<div class="card">
  <div class="brand"><span class="brand-dot"></span>Lucky QR</div>
  <h1>${escapeHtml(title || '')}</h1>
  <p class="desc">${escapeHtml(description || '')}</p>
  <a href="${safeBtn}" class="btn">${escapeHtml(button_text || 'Ver más')} →</a>
</div>
<div class="footer"><a href="https://lucky-qr.com">Creado con Lucky QR 🍀</a></div>
</body>
</html>`)
}
