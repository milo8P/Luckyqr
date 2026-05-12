const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

exports.handler = async (event) => {
  const code = event.queryStringParameters?.code

  if (!code) {
    return { statusCode: 400, body: 'Código QR no especificado' }
  }

  // Buscar el QR en Supabase
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/dynamic_qrs?short_code=eq.${code}&select=destination_url,id`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const data = await res.json()

  if (!data || data.length === 0) {
    return { statusCode: 404, body: 'QR no encontrado' }
  }

  const { destination_url, id } = data[0]

  // Guardar estadística del escaneo
  const ua = event.headers['user-agent'] || ''
  const device = /mobile/i.test(ua) ? 'mobile' : 'desktop'
  const country = event.headers['x-country'] || 'desconocido'

  await fetch(`${SUPABASE_URL}/rest/v1/qr_scans`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ qr_id: id, device, country })
  })

  // Redirigir al destino
  return {
    statusCode: 302,
    headers: { Location: destination_url }
  }
}