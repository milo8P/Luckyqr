// SQL to run manually in Supabase SQL editor:
// create table if not exists video_qrs (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   code text unique not null,
//   title text,
//   video_url text,
//   created_at timestamp default now()
// );
// alter table video_qrs enable row level security;
// create policy "Usuario ve sus video qrs" on video_qrs for all using (auth.uid() = user_id);
// create policy "Publico puede leer video qrs" on video_qrs for select using (true);

const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

function escapeHtml(str) {
  if (!str) return ''
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')
}

function getEmbedUrl(url) {
  if (!url) return null
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  // Direct video file
  const ext = url.split('?')[0].split('.').pop().toLowerCase()
  if (['mp4','webm','ogg'].includes(ext)) return null // handled as <video> tag
  return null
}

function isDirectVideo(url) {
  if (!url) return false
  const ext = url.split('?')[0].split('.').pop().toLowerCase()
  return ['mp4','webm','ogg'].includes(ext)
}

export default async function handler(req, res) {
  const { code } = req.query
  if (!code) return res.status(400).send('Código no especificado')

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/video_qrs?code=eq.${encodeURIComponent(code)}&select=title,video_url`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  const data = await r.json()
  if (!data || data.length === 0) {
    return res.status(404).send(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Video no encontrado</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#faf9f7;text-align:center}.b{max-width:400px}.ic{font-size:3rem;margin-bottom:1rem}a{color:#1d6b4a}</style></head>
<body><div class="b"><div class="ic">🍀</div><h1 style="font-size:1.5rem;margin-bottom:.5rem">Video no encontrado</h1>
<p style="color:#7a756c;margin-bottom:1.5rem">Este video QR no existe o fue eliminado.</p>
<a href="https://lucky-qr.com">Ir a Lucky QR</a></div></body></html>`)
  }

  const { title, video_url } = data[0]
  const embedUrl = getEmbedUrl(video_url)
  const direct = isDirectVideo(video_url)
  const safeVideoUrl = (video_url && (video_url.startsWith('https://') || video_url.startsWith('http://'))) ? video_url : ''

  let videoBlock = ''
  if (embedUrl) {
    videoBlock = `<div class="video-wrap"><iframe src="${escapeHtml(embedUrl)}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"></iframe></div>`
  } else if (direct && safeVideoUrl) {
    videoBlock = `<div class="video-wrap"><video controls playsinline><source src="${escapeHtml(safeVideoUrl)}"/></video></div>`
  } else if (safeVideoUrl) {
    videoBlock = `<div class="link-wrap"><a href="${escapeHtml(safeVideoUrl)}" class="btn" target="_blank" rel="noopener">▶ Ver video</a></div>`
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(title || 'Video')} — Lucky QR</title>
<meta name="robots" content="noindex"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#18160f;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1rem}
.brand{font-size:.65rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:#1d6b4a;margin-bottom:1.5rem;display:flex;align-items:center;gap:6px}
.brand-dot{width:6px;height:6px;background:#1d6b4a;border-radius:50%;display:inline-block}
h1{font-size:1.6rem;font-weight:600;color:#fff;letter-spacing:-.3px;text-align:center;margin-bottom:1.5rem}
.video-wrap{width:100%;max-width:800px;border-radius:16px;overflow:hidden;box-shadow:0 8px 48px rgba(0,0,0,.5);background:#000}
.video-wrap iframe,.video-wrap video{width:100%;aspect-ratio:16/9;display:block;border:none}
.link-wrap{text-align:center}
.btn{display:inline-block;padding:1rem 2.5rem;background:#1d6b4a;color:#fff;border-radius:14px;text-decoration:none;font-size:1rem;font-weight:500;transition:all .2s}
.btn:hover{background:#155638}
.footer{text-align:center;margin-top:2rem;font-size:.72rem;color:#1d6b4a;opacity:.65}
.footer a{color:inherit;text-decoration:none}
</style>
</head>
<body>
<div class="brand"><span class="brand-dot"></span>Lucky QR</div>
<h1>${escapeHtml(title || 'Video')}</h1>
${videoBlock}
<div class="footer"><a href="https://lucky-qr.com">Creado con Lucky QR 🍀</a></div>
</body>
</html>`)
}
