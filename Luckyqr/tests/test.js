// Lucky QR — Test Suite Completo
// Correr con: node tests/test.js

const BASE = 'https://lucky-qr.com'
let passed = 0, failed = 0

async function test(name, fn) {
  try {
    await fn()
    console.log(`\x1b[32m✅ ${name}\x1b[0m`)
    passed++
  } catch(e) {
    console.log(`\x1b[31m❌ ${name}\x1b[0m`)
    console.log(`   → ${e.message}`)
    failed++
  }
}

function expect(val) {
  return {
    toBe: (expected) => { if (val !== expected) throw new Error(`Expected ${expected}, got ${val}`) },
    toContain: (str) => { if (!String(val).includes(str)) throw new Error(`Expected to contain "${str}"`) },
    toBeLessThan: (n) => { if (val >= n) throw new Error(`Expected < ${n}, got ${val}`) },
    toBeOneOf: (arr) => { if (!arr.includes(val)) throw new Error(`Expected one of ${arr}, got ${val}`) }
  }
}

async function get(path, opts = {}) {
  return fetch(`${BASE}${path}`, { redirect: 'follow', ...opts })
}

async function post(path, body) {
  return fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'follow'
  })
}

;(async () => {
  console.log('\n🍀 Lucky QR — Test Suite Completo\n')

  // ── PÁGINAS PRINCIPALES ──
  console.log('\n📄 Páginas principales')
  await test('Página principal carga (200)', async () => {
    const r = await get('/'); expect(r.status).toBe(200)
  })
  await test('Página de precios carga (200)', async () => {
    const r = await get('/pricing'); expect(r.status).toBe(200)
  })
  await test('Página de privacidad carga (200)', async () => {
    const r = await get('/privacy'); expect(r.status).toBe(200)
  })
  await test('Página de términos carga (200)', async () => {
    const r = await get('/terms'); expect(r.status).toBe(200)
  })
  await test('Página de éxito carga (200)', async () => {
    const r = await get('/success'); expect(r.status).toBe(200)
  })
  await test('Blog carga (200)', async () => {
    const r = await get('/blog/'); expect(r.status).toBe(200)
  })
  await test('OG Image carga (200)', async () => {
    const r = await get('/og-image.html'); expect(r.status).toBe(200)
  })
  await test('404 personalizado funciona', async () => {
    const r = await get('/esta-pagina-no-existe-xyz'); expect(r.status).toBe(404)
  })

  // ── SEO Y ARCHIVOS ──
  console.log('\n🔍 SEO y archivos')
  await test('sitemap.xml carga y tiene contenido', async () => {
    const r = await get('/sitemap.xml')
    const text = await r.text()
    expect(r.status).toBe(200)
    expect(text).toContain('urlset')
    expect(text).toContain('lucky-qr.com')
  })
  await test('robots.txt carga correctamente', async () => {
    const r = await get('/robots.txt')
    const text = await r.text()
    expect(r.status).toBe(200)
    expect(text).toContain('Sitemap')
  })

  // ── APIs DE SISTEMA ──
  console.log('\n⚙️ APIs de sistema')
  await test('verify-premium rechaza sin token (401)', async () => {
    const r = await post('/api/verify-premium', {})
    expect(r.status).toBe(401)
  })
  await test('paddle-webhook rechaza sin firma (401)', async () => {
    const r = await post('/api/paddle-webhook', {})
    expect(r.status).toBe(401)
  })
  await test('send-welcome rechaza GET (405)', async () => {
    const r = await get('/api/send-welcome')
    expect(r.status).toBe(405)
  })
  await test('cancel-subscription rechaza GET (405)', async () => {
    const r = await get('/api/cancel-subscription')
    expect(r.status).toBe(405)
  })
  await test('paddle-checkout rechaza GET (405)', async () => {
    const r = await get('/api/paddle-checkout')
    expect(r.status).toBe(405)
  })

  // ── QR DINÁMICOS ──
  console.log('\n🔗 QR dinámicos y redirects')
  await test('/r/codigo-invalido devuelve 404 con HTML', async () => {
    const r = await get('/r/codigoinvalidoxyz123')
    const text = await r.text()
    expect(r.status).toBe(404)
    expect(text).toContain('QR')
  })
  await test('/app/codigo-invalido devuelve 404', async () => {
    const r = await get('/app/codigoinvalidoxyz123')
    expect(r.status).toBe(404)
  })
  await test('/social/codigo-invalido devuelve 404', async () => {
    const r = await get('/social/codigoinvalidoxyz123')
    expect(r.status).toBe(404)
  })
  await test('/landing/codigo-invalido devuelve 404', async () => {
    const r = await get('/landing/codigoinvalidoxyz123')
    expect(r.status).toBe(404)
  })

  // ── SEGURIDAD ──
  console.log('\n🔒 Seguridad')
  await test('Headers de seguridad presentes', async () => {
    const r = await get('/')
    expect(r.headers.get('x-content-type-options')).toBe('nosniff')
    expect(r.headers.get('x-xss-protection')).toBe('1; mode=block')
  })
  await test('API pública rechaza sin API key', async () => {
    const r = await post('/api/public/generate', { url: 'https://test.com' })
    expect(r.status).toBeOneOf([400, 401, 403])
  })

  // ── RATE LIMITING ──
  console.log('\n⏱ Rate limiting')
  await test('Rate limiting activo en /r/', async () => {
    let got429 = false
    for (let i = 0; i < 35; i++) {
      const r = await get('/r/testrate' + i)
      if (r.status === 429) { got429 = true; break }
    }
    if (!got429) throw new Error('Rate limiting no activado después de 35 requests')
  })

  // ── BLOG ──
  console.log('\n📝 Blog')
  await test('Artículo WiFi carga (200)', async () => {
    const r = await get('/blog/como-crear-qr-wifi')
    expect(r.status).toBe(200)
  })
  await test('Artículo restaurantes carga (200)', async () => {
    const r = await get('/blog/qr-para-restaurantes')
    expect(r.status).toBe(200)
  })
  await test('Artículo WhatsApp carga (200)', async () => {
    const r = await get('/blog/como-usar-qr-whatsapp')
    expect(r.status).toBe(200)
  })

  // ── RESUMEN ──
  const total = passed + failed
  console.log(`\n${'─'.repeat(40)}`)
  console.log(`\x1b[${failed ? '31' : '32'}m${failed ? '⚠' : '🎉'} Resultado: ${passed}/${total} tests pasaron\x1b[0m`)
  if (failed > 0) console.log(`\x1b[31m${failed} test(s) fallaron\x1b[0m`)
  else console.log('\x1b[32mTodos los tests pasaron 🍀\x1b[0m')
  console.log('')

  process.exit(failed > 0 ? 1 : 0)
})()
