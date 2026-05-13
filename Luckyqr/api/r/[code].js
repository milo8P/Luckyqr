const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    return res.status(400).send('Código QR no especificado')
  }

  // Buscar QR en Supabase
  const qrRes = await fetch(
    `${SUPABASE_URL}/rest/v1/dynamic_qrs?short_code=eq.${code}&select=destination_url,id`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const data = await qrRes.json()

  if (!data || data.length === 0) {
    return res.status(404).send('QR no encontrado')
  }

  const { destination_url, id } = data[0]

  // Guardar escaneo
  const ua = req.headers['user-agent'] || ''
  const device = /mobile/i.test(ua) ? 'mobile' : 'desktop'
  const country = req.headers['x-vercel-ip-country'] || 'desconocido'
  const browser = /chrome/i.test(ua) ? 'Chrome' : /firefox/i.test(ua) ? 'Firefox' : /safari/i.test(ua) ? 'Safari' : 'Otro'

  await fetch(`${SUPABASE_URL}/rest/v1/qr_scans`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ qr_id: id, device, country, browser })
  })

  // Redirigir
  res.redirect(302, destination_url)
}