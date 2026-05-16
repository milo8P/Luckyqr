// Handles both /gallery/:code and /video/:code
// SQL for gallery_qrs and video_qrs tables — run in Supabase SQL editor:
//
// create table if not exists gallery_qrs (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   code text unique not null, title text, images jsonb default '[]',
//   created_at timestamp default now()
// );
// alter table gallery_qrs enable row level security;
// create policy "read gallery" on gallery_qrs for select using (true);
// create policy "own gallery" on gallery_qrs for all using (auth.uid() = user_id);
//
// create table if not exists video_qrs (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   code text unique not null, title text, video_url text,
//   created_at timestamp default now()
// );
// alter table video_qrs enable row level security;
// create policy "read video" on video_qrs for select using (true);
// create policy "own video" on video_qrs for all using (auth.uid() = user_id);

const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

function esc(str) {
  if (!str) return ''
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')
}

function safeUrl(url) {
  if (!url) return null
  const u = String(url).trim()
  return (u.startsWith('https://') || u.startsWith('http://')) ? u : null
}

function notFound(what) {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>No encontrado</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#faf9f7;text-align:center}.b{max-width:400px}a{color:#1d6b4a}</style></head>
<body><div class="b"><div style="font-size:3rem;margin-bottom:1rem">🍀</div>
<h1 style="font-size:1.5rem;margin-bottom:.5rem">${esc(what)} no encontrado</h1>
<p style="color:#7a756c;margin-bottom:1.5rem">Este contenido no existe o fue eliminado.</p>
<a href="https://lucky-qr.com">Ir a Lucky QR</a></div></body></html>`
}

async function galleryPage(code, res) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/gallery_qrs?code=eq.${encodeURIComponent(code)}&select=title,images`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  const data = await r.json()
  if (!data || data.length === 0) return res.status(404).send(notFound('Galería'))

  const { title, images } = data[0]
  const imgs = Array.isArray(images) ? images.filter(safeUrl) : []
  const imgItems = imgs.map(url =>
    `<div class="img-wrap"><img src="${esc(url)}" loading="lazy" onerror="this.parentNode.style.display='none'" alt=""/></div>`
  ).join('')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(title || 'Galería')} — Lucky QR</title><meta name="robots" content="noindex"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:#faf9f7;min-height:100vh;padding:2rem 1rem}
.header{text-align:center;margin-bottom:2rem}.brand{font-size:.65rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#1d6b4a;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;gap:6px}
.brand-dot{width:6px;height:6px;background:#1d6b4a;border-radius:50%;display:inline-block}
h1{font-size:2rem;font-weight:600;color:#18160f;letter-spacing:-.5px}
.gallery{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.img-wrap{border-radius:14px;overflow:hidden;background:#e8e4de;aspect-ratio:4/3;box-shadow:0 2px 12px rgba(0,0,0,.08)}
.img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.img-wrap:hover img{transform:scale(1.03)}
.footer{text-align:center;margin-top:2.5rem;font-size:.72rem;color:#1d6b4a;opacity:.65}.footer a{color:inherit;text-decoration:none}</style>
</head><body>
<div class="header"><div class="brand"><span class="brand-dot"></span>Lucky QR</div><h1>${esc(title || 'Galería')}</h1></div>
<div class="gallery">${imgItems || '<p style="text-align:center;color:#7a756c;grid-column:1/-1">No hay imágenes en esta galería.</p>'}</div>
<div class="footer"><a href="https://lucky-qr.com">Creado con Lucky QR 🍀</a></div>
</body></html>`)
}

async function videoPage(code, res) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_qrs?code=eq.${encodeURIComponent(code)}&select=title,video_url`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  const data = await r.json()
  if (!data || data.length === 0) return res.status(404).send(notFound('Video'))

  const { title, video_url } = data[0]
  const safe = safeUrl(video_url) || ''

  let embedUrl = null
  const ytMatch = safe.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`
  const vimeoMatch = safe.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`

  const ext = safe.split('?')[0].split('.').pop().toLowerCase()
  const isDirect = ['mp4','webm','ogg'].includes(ext)

  let videoBlock = ''
  if (embedUrl) {
    videoBlock = `<div class="vw"><iframe src="${esc(embedUrl)}" allowfullscreen frameborder="0"></iframe></div>`
  } else if (isDirect && safe) {
    videoBlock = `<div class="vw"><video controls playsinline><source src="${esc(safe)}"/></video></div>`
  } else if (safe) {
    videoBlock = `<div style="text-align:center"><a href="${esc(safe)}" class="btn" target="_blank" rel="noopener">▶ Ver video</a></div>`
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(title || 'Video')} — Lucky QR</title><meta name="robots" content="noindex"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:#18160f;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1rem}
.brand{font-size:.65rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#1d6b4a;margin-bottom:1.5rem;display:flex;align-items:center;gap:6px}
.brand-dot{width:6px;height:6px;background:#1d6b4a;border-radius:50%;display:inline-block}
h1{font-size:1.6rem;font-weight:600;color:#fff;letter-spacing:-.3px;text-align:center;margin-bottom:1.5rem}
.vw{width:100%;max-width:800px;border-radius:16px;overflow:hidden;box-shadow:0 8px 48px rgba(0,0,0,.5);background:#000}
.vw iframe,.vw video{width:100%;aspect-ratio:16/9;display:block;border:none}
.btn{display:inline-block;padding:1rem 2.5rem;background:#1d6b4a;color:#fff;border-radius:14px;text-decoration:none;font-size:1rem;font-weight:500}.btn:hover{background:#155638}
.footer{text-align:center;margin-top:2rem;font-size:.72rem;color:#1d6b4a;opacity:.65}.footer a{color:inherit;text-decoration:none}</style>
</head><body>
<div class="brand"><span class="brand-dot"></span>Lucky QR</div>
<h1>${esc(title || 'Video')}</h1>
${videoBlock}
<div class="footer"><a href="https://lucky-qr.com">Creado con Lucky QR 🍀</a></div>
</body></html>`)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const { type, code } = req.query
  if (!code) return res.status(400).send('Código no especificado')
  if (type === 'gallery') return galleryPage(code, res)
  if (type === 'video') return videoPage(code, res)
  return res.status(400).send('Tipo no especificado')
}
