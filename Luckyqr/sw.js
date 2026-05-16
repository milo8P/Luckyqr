const CACHE = 'lucky-qr-v2'
const ASSETS = [
  '/',
  '/qr-script.js',
  '/manifest.json'
]

// Instalar — cachear solo los assets esenciales
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  )
  self.skipWaiting()
})

// Activar — limpiar caches viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch — network first, cache como fallback solo para assets esenciales
self.addEventListener('fetch', e => {
  // Solo cachear GET requests
  if (e.request.method !== 'GET') return

  // No cachear APIs ni páginas HTML dinámicas
  const url = new URL(e.request.url)
  if (url.pathname.startsWith('/api/')) return
  if (url.pathname.startsWith('/r/')) return
  if (url.pathname.startsWith('/app/')) return
  if (url.pathname.startsWith('/social/')) return
  if (url.pathname.startsWith('/landing/')) return
  if (url.pathname.startsWith('/gallery/')) return
  if (url.pathname.startsWith('/video/')) return

  // Network first para páginas HTML
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    )
    return
  }

  // Cache first para assets estáticos (JS, CSS, fonts)
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
})
