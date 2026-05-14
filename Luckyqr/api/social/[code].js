const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeUrl(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  return trimmed.startsWith('https://') || trimmed.startsWith('http://') ? trimmed : null
}

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

const NETWORKS = [
  {
    key: 'instagram',
    label: 'Instagram',
    color: '#e1306c',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    color: '#000000',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    color: '#010101',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.79a4.82 4.82 0 01-1.02-.1z"/></svg>`
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    color: '#0077b5',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  },
  {
    key: 'youtube',
    label: 'YouTube',
    color: '#ff0000',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
  },
  {
    key: 'facebook',
    label: 'Facebook',
    color: '#1877f2',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  }
]

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

function socialPage(title, links) {
  const initial = title ? title.trim()[0].toUpperCase() : '?'
  const displayTitle = title || 'Mi perfil'

  const cards = links.map(({ label, color, icon, url }) => `
    <a class="social-btn" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" style="--brand:${escapeHtml(color)}">
      <span class="social-icon">${icon}</span>
      <span class="social-label">${escapeHtml(label)}</span>
      <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>`).join('\n')

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${displayTitle} — Lucky QR</title>
<meta name="description" content="Redes sociales de ${displayTitle}"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf9f7;color:#18160f;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:3rem 1.25rem 2rem}
.profile{text-align:center;margin-bottom:2rem}
.avatar{width:80px;height:80px;border-radius:50%;background:#1d6b4a;color:#fff;font-size:2rem;font-weight:600;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;box-shadow:0 4px 16px rgba(29,107,74,.25)}
.profile-name{font-size:1.35rem;font-weight:600;letter-spacing:-.3px}
.links{display:flex;flex-direction:column;gap:.75rem;width:100%;max-width:400px}
.social-btn{display:flex;align-items:center;gap:.85rem;padding:.9rem 1.1rem;background:#fff;border:1px solid #e8e3dc;border-radius:16px;text-decoration:none;color:#18160f;font-size:.95rem;font-weight:500;transition:transform .15s,box-shadow .15s,border-color .15s;position:relative;overflow:hidden}
.social-btn::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--brand);border-radius:4px 0 0 4px}
.social-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.1);border-color:var(--brand)}
.social-icon{width:22px;height:22px;flex-shrink:0;color:var(--brand)}
.social-icon svg{width:100%;height:100%}
.social-label{flex:1}
.arrow{width:16px;height:16px;color:#b0a99e;flex-shrink:0}
.powered{margin-top:2.5rem;font-size:.72rem;color:#b0aa9f;text-align:center}
.powered a{color:#1d6b4a;text-decoration:none}
.powered a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="profile">
  <div class="avatar">${initial}</div>
  <div class="profile-name">${displayTitle}</div>
</div>
<div class="links">
${cards}
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
    `${SUPABASE_URL}/rest/v1/social_qrs?code=eq.${encodeURIComponent(code)}&select=title,instagram,twitter,tiktok,linkedin,youtube,facebook`,
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

  const row = data[0]

  const links = NETWORKS
    .filter(n => safeUrl(row[n.key]))
    .map(n => ({ ...n, url: safeUrl(row[n.key]) }))

  if (links.length === 0) {
    return res.status(404).send(notFoundPage())
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  return res.status(200).send(socialPage(escapeHtml(row.title), links))
}
