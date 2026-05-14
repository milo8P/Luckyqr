// SQL to run manually in Supabase SQL editor:
// create table if not exists api_keys (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id) on delete cascade,
//   key text unique not null,
//   name text,
//   calls_count int default 0,
//   created_at timestamp default now()
// );
// alter table api_keys enable row level security;
// create policy "Usuario ve sus API keys" on api_keys for all using (auth.uid() = user_id);
// create policy "Service role puede leer api_keys" on api_keys for select using (true);

const SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  const { url, size = 256, api_key } = req.body || {}

  if (!api_key) return res.status(401).json({ error: 'api_key requerida' })
  if (!url) return res.status(400).json({ error: 'url requerida' })
  if (!String(url).startsWith('http')) return res.status(400).json({ error: 'URL inválida — debe empezar con https://' })

  const keyRes = await fetch(
    `${SUPABASE_URL}/rest/v1/api_keys?key=eq.${encodeURIComponent(api_key)}&select=id,calls_count`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )
  const keyData = await keyRes.json()
  if (!keyData || keyData.length === 0) {
    return res.status(401).json({ error: 'API key inválida' })
  }

  const { id: keyId, calls_count } = keyData[0]
  await fetch(`${SUPABASE_URL}/rest/v1/api_keys?id=eq.${keyId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ calls_count: (calls_count || 0) + 1 })
  })

  let QRCode
  try {
    QRCode = (await import('qrcode')).default
  } catch {
    return res.status(500).json({ error: 'Módulo qrcode no disponible. Ejecutar: npm install qrcode' })
  }

  try {
    const qrSize = Math.min(Math.max(parseInt(size) || 256, 64), 1024)
    const dataUrl = await QRCode.toDataURL(String(url).slice(0, 2048), {
      width: qrSize,
      margin: 1,
      color: { dark: '#18160f', light: '#ffffff' }
    })

    return res.status(200).json({
      success: true,
      image: dataUrl,
      url,
      size: qrSize
    })
  } catch (e) {
    return res.status(500).json({ error: 'Error al generar QR: ' + e.message })
  }
}
