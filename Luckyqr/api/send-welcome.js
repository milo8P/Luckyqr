const { Resend } = require('resend')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, name } = req.body
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Lucky QR <onboarding@resend.dev>',
      to: email,
      subject: '¡Bienvenido a Lucky QR! 🍀',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:2rem;background:#faf9f7;border-radius:16px">
          <div style="text-align:center;margin-bottom:2rem">
            <span style="font-size:3rem">🍀</span>
            <h1 style="font-family:serif;font-size:1.8rem;color:#18160f;margin:.5rem 0">Lucky QR</h1>
          </div>
          <h2 style="color:#1d6b4a">¡Hola ${name}! 👋</h2>
          <p style="color:#7a756c;line-height:1.8;margin:1rem 0">Tu cuenta fue creada correctamente. Ya podés generar códigos QR gratis, sin marcas de agua y al instante.</p>
          <p style="color:#7a756c;line-height:1.8;margin:1rem 0">Con Lucky QR podés crear QR para:</p>
          <ul style="color:#7a756c;line-height:2;padding-left:1.5rem">
            <li>URLs y sitios web</li>
            <li>WiFi — para que tus visitas se conecten fácil</li>
            <li>WhatsApp directo</li>
            <li>Tarjetas de contacto vCard</li>
            <li>Y 8 tipos más</li>
          </ul>
          <div style="text-align:center;margin:2rem 0">
            <a href="https://lucky-qr.com" style="background:#1d6b4a;color:#fff;padding:.75rem 2rem;border-radius:12px;text-decoration:none;font-weight:500">Ir a Lucky QR</a>
          </div>
          <p style="color:#b0a99e;font-size:.75rem;text-align:center">lucky-qr.com · Sin servidores · 100% privado</p>
        </div>
      `
    })
    res.json({ success: true })
  } catch(e) {
    res.status(500).json({ error: e.message })
  }
}