const CACHE = 'lucky-qr-v1'
const ASSETS = ['/', '/qr-script.js', '/i18n.js', '/pricing.html', '/blog/']
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))))
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))))
