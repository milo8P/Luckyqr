// SQL to run manually in Supabase SQL editor:
// create table if not exists gallery_qrs (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   code text unique not null,
//   title text,
//   images jsonb default '[]',
//   created_at timestamp default now()
// );
// alter table gallery_qrs enable row level security;
// create policy "Usuario ve sus gallery qrs" on gallery_qrs for all using (auth.uid() = user_id);
// create policy "Publico puede leer gallery qrs" on gallery_qrs for select using (true);

const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

function escapeHtml(str) {
  if (!str) return ''
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')
}

function safeUrl(url) {
  if (!url) return null
  const u = String(url).trim()
  return (u.startsWith('https://') || u.startsWith('http://')) ? u : null
}

export default async function handler(req, res) {
  const { code } = req.query
  if (!code) return res.status(400).send('Código no especificado')

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/gallery_qrs?code=eq.${encodeURIComponent(code)}&select=title,images`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  const data = await r.json()
  if (!data || data.length === 0) {
    return res.status(404).send(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Galería no encontrada</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#faf9f7;text-align:center}.b{max-width:400px}.ic{font-size:3rem;margin-bottom:1rem}a{color:#1d6b4a}</style></head>
<body><div class="b"><div class="ic">🍀</div><h1 style="font-size:1.5rem;margin-bottom:.5rem">Galería no encontrada</h1>
<p style="color:#7a756c;margin-bottom:1.5rem">Esta galería no existe o fue eliminada.</p>
<a href="https://lucky-qr.com">Ir a Lucky QR</a></div></body></html>`)
  }

  const { title, images } = data[0]
  const imgs = Array.isArray(images) ? images.filter(safeUrl) : []

  const imgItems = imgs.map(url =>
    `<div class="img-wrap"><img src="${escapeHtml(url)}" loading="lazy" onerror="this.parentNode.style.display='none'" alt=""/></div>`
  ).join('')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(title || 'Galería')} — Lucky QR</title>
<meta name="robots" content="noindex"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf9f7;min-height:100vh;padding:2rem 1rem}
.header{text-align:center;margin-bottom:2rem}
.brand{font-size:.65rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#1d6b4a;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;gap:6px}
.brand-dot{width:6px;height:6px;background:#1d6b4a;border-radius:50%;display:inline-block}
h1{font-size:2rem;font-weight:600;color:#18160f;letter-spacing:-.5px}
.gallery{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.img-wrap{border-radius:14px;overflow:hidden;background:#e8e4de;aspect-ratio:4/3;box-shadow:0 2px 12px rgba(0,0,0,.08)}
.img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
.img-wrap:hover img{transform:scale(1.03)}
.footer{text-align:center;margin-top:2.5rem;font-size:.72rem;color:#1d6b4a;opacity:.65}
.footer a{color:inherit;text-decoration:none}
@media(max-width:480px){h1{font-size:1.5rem}}
</style>
</head>
<body>
<div class="header">
  <div class="brand"><span class="brand-dot"></span>Lucky QR</div>
  <h1>${escapeHtml(title || 'Galería')}</h1>
</div>
<div class="gallery">
  ${imgItems || '<p style="text-align:center;color:#7a756c;grid-column:1/-1">No hay imágenes en esta galería.</p>'}
</div>
<div class="footer"><a href="https://lucky-qr.com">Creado con Lucky QR 🍀</a></div>
</body>
</html>`)
}
