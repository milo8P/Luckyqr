// Lucky QR — i18n.js — 6 languages
var I18N = {
  en: {
    meta: {
      title: 'Lucky QR — Free Custom QR Code Generator',
      description: 'Create free QR codes instantly. URL, WiFi, WhatsApp, vCard, location and more. No watermarks, 100% private.',
      ogTitle: 'Lucky QR — Free QR Code Generator',
      ogDescription: 'Create custom QR codes for free. No watermarks, 100% private.'
    },
    nav: { hint:'Sign up to generate QR codes', login:'Log in', register:'Sign up free', logout:'Log out', logoutFull:'Log out', profile:'My profile', activity:'Activity' },
    hero: {
      chip:'Online generator — Free',
      h1:'Create your perfect<br><em>QR code</em> in seconds',
      sub:'URL, WiFi, WhatsApp, contacts, location and more. Customize colors and size. Download instantly.',
      cta1:'Create free account', cta2:'I already have an account',
      banner:'You need an account to generate QR — <a onclick="openModal(\'register\')">Sign up for free</a>'
    },
    gen: {
      title:'Configuration', chars:'characters',
      content:'Content', design:'Design', advanced:'Advanced options',
      typeLabel:'QR type',
      types: { text:'Text', tel:'Phone', geo:'Location', event:'Event' },
      colorLabel:'Colors', modules:'Modules', bg:'Background',
      colorWarning:'⚠ Colors are very similar — the QR may not scan correctly',
      gradient:'Use gradient',
      shapeLabel:'Module shape', square:'Square', rounded:'Rounded', dots:'Dots',
      frameLabel:'Frame', frameNone:'No frame', frameScanme:'SCAN ME', frameEscaneame:'Scan me', frameLeeme:'Read me!', frameSimple:'Simple',
      sizeLabel:'Size',
      ecLabel:'Error correction',
      ecL:'L — Low (7%)', ecM:'M — Medium (15%) recommended', ecQ:'Q — High (25%)', ecH:'H — Maximum (30%)',
      logoLabel:'Logo in center', logoHint:'Premium only', logoRemove:'✕ Remove logo',
      btn:'Generate QR',
      statusEmpty:'Not generated'
    },
    wifi: { ssid:'Network name', pass:'Password', sec:'Security', noPass:'No password' },
    sms: { number:'Number', message:'Message' },
    vc: { name:'Full name', phone:'Phone', company:'Company', web:'Website' },
    geo: { input:'Google Maps link or coordinates', lat:'Latitude', lng:'Longitude' },
    wa: { phone:'WhatsApp number', msg:'Default message' },
    yt: { link:'YouTube link' },
    ig: { user:'Instagram username or link' },
    pdf: { link:'File link', hint:'Google Drive, Dropbox, etc.' },
    ev: { name:'Event name', date:'Date', time:'Time', loc:'Location', desc:'Description' },
    app: { name:'App name', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — the QR detects the device and redirects to the correct store automatically.' },
    soc: { titleLabel:'Profile name' },
    lp: { info:'⭐ Premium — the QR points to a custom page with your title, description and button.', title:'Title', desc:'Description', btnText:'Button text', btnUrl:'Button URL', bg:'Background color', accent:'Accent color' },
    preview: { title:'Preview', empty:'Fill in the form<br>and press <strong>Generate QR</strong>', copy:'Copy', download:'Download PNG', share:'Share', print:'Print' },
    premium: {
      tag:'Premium Plan',
      title:'<em style="font-style:italic;font-weight:400;color:var(--accent)">Dynamic</em> QR &amp; analytics',
      freeBadge:'🆓 Free Plan',
      lockedTitle:'Unlock Lucky QR Premium',
      lockedDesc:'Create QR codes you can edit without reprinting and track how many times they were scanned.',
      f1:'Dynamic QR — change the URL without reprinting',
      f2:'Detailed analytics (city, OS, peak hour)',
      f3:'Folders to organize your QR codes',
      f4:'Password-protected QR',
      f5:'Custom Landing Pages',
      f6:'Bulk generation (up to 50 QR in ZIP)',
      f7:'Public API to integrate in your apps',
      f8:'Logo in the center of the QR',
      upgrade:'Get Premium — $4.99 USD/mo',
      cancelBtn:'Cancel Premium'
    },
    dqr: {
      new:'New dynamic QR', name:'QR name', url:'Destination URL',
      pwProtect:'Password protect', pw:'Access password',
      folder:'Folder', noFolder:'No folder',
      create:'+ Create dynamic QR', list:'My dynamic QR codes',
      empty:'You haven\'t created any dynamic QR codes yet.'
    },
    stats: { title:'Scan analytics', total:'Total', today:'Today', peak:'Peak hour', devices:'Devices', os:'Systems', countries:'Top countries', cities:'Top cities' },
    folders: { title:'Folders', new:'+ New folder', empty:'No folders yet.' },
    bulk: {
      sectionTitle:'Bulk generation',
      sectionDesc:'Paste up to 50 URLs and download them as a ZIP. Each QR uses the current style (colors, shape, frame).',
      btn:'📦 Bulk generate',
      modalTitle:'Bulk QR generation',
      modalDesc:'Paste one URL per line (max 50). Generated with the current style and downloaded in a ZIP.',
      run:'📦 Generate and download ZIP',
      cancel:'Cancel',
      generating:'Generating...'
    },
    api: {
      title:'API Keys', new:'+ New key',
      desc:'Use your API key to generate QR codes programmatically.',
      docs:'View documentation →',
      empty:'No API keys. Generate one above.'
    },
    reviews: {
      tag:'Reviews',
      h2:'What our<br><em>users say</em>',
      write:'✍ Write a review',
      formTitle:'Your opinion about Lucky QR',
      placeholder:'Tell us what you think of Lucky QR...',
      submit:'Submit review',
      loading:'Loading reviews...'
    },
    why: {
      tag:'Why Lucky QR',
      h2:'Not all QR generators<br>are <em>equal</em>',
      sub:'Most ask you to pay, fill you with invasive ads or store your data on their servers. Lucky QR was built to be different from day one.',
      c1t:'Your information never leaves your device', c1d:'Everything is processed in your browser. Nobody sees what you type — not even us. Your WiFi passwords and contact data are yours alone.', c1tag:'Real privacy',
      c2t:'Instant and without annoying signups', c2d:'You can explore everything first and sign up only when you want to generate. No endless forms or credit card required.', c2tag:'Frictionless',
      c3t:'Real customization, not decorative', c3d:'You choose the exact color with a full color wheel. If colors are too similar, we warn you before the QR becomes unreadable.', c3tag:'Total control',
      c4t:'Bulk generation — up to 50 QR at once', c4d:'Paste your URLs, we generate all QR codes and package them in a ZIP ready to download. Save hours of work.', c4tag:'Bulk generation',
      c5t:'16 QR types + Custom Landing Pages', c5d:'URL, WiFi, WhatsApp, vCard, App Store, Social Networks, Custom Landing Page and more. All without limits.', c5tag:'All included',
      c6t:'Analytics that really matter', c6d:'How many scans, from which city, which OS, at what time. Real data to make better decisions.', c6tag:'Premium Analytics',
      compareTitle:'Lucky QR vs the competition',
      compareNote:'* Comparison based on free plans of each service at time of publication.',
      fFeature:'Feature', fFree:'100% free', fWatermark:'No watermarks', fPrivate:'Private data',
      fOffline:'Works offline', fSvg:'Free SVG', fTypes:'Free QR types', fColors:'Custom colors',
      fStats:'Detailed analytics', fBulk:'Bulk generation', fLanding:'Landing Pages',
      fApi:'Public API', fPassword:'Password QR', fFolders:'Folders / organization', fLangs:'Languages',
      vAlways:'✓ Always', vNever:'✓ Never', vLocal:'✓ 100% local', vYes:'✓ Yes', vIncluded:'✓ Included',
      v16:'✓ 16 types', vWheel:'✓ Full color wheel', vCityOs:'✓ City, OS, hour', v50zip:'✓ Up to 50 in ZIP',
      vWithDocs:'✓ With docs', vLangs:'✓ ES / EN / PT',
      vLimited:'Limited', vFreemium:'Freemium', vPremiumOnly:'Premium only',
      vViaServer:'Via server', vBasic:'Basic', vEsOnly:'ES only', vEnOnly:'EN only'
    },
    info: {
      tag:'What it\'s for',
      h2:'More uses than you <em>imagine</em>',
      c1t:'Menus and catalogs', c1d:'Put a QR at your table or counter. Customers access the updated menu instantly, without printing or extra costs.',
      c2t:'Contact cards', c2d:'Share your name, phone, email and company with a single scan using the vCard format.',
      c3t:'Easy WiFi access', c3d:'Generate a QR with your network and password. Guests connect by scanning, without typing anything.',
      c4t:'Locations and maps', c4d:'Share the location of your business or event. Paste the Google Maps link and we extract the coordinates automatically.',
      c5t:'Direct WhatsApp', c5d:'Generate a QR that opens WhatsApp with your number and a preset message. Perfect for customer service.',
      c6t:'100% private', c6d:'Everything happens in your browser. No data you enter leaves your device. No servers, no tracking.'
    },
    how: {
      tag:'Simple process',
      h2:'In 3 steps your<br>QR is <em>ready to use</em>',
      s1t:'Create your free account', s1d:'You just need an email and a password. No credit card. You\'re in within 30 seconds.',
      s2t:'Configure your QR', s2d:'Choose the type, customize colors and adjust the size. See the result in real time.',
      s3t:'Download and use', s3d:'Export in PNG or SVG. What you see on screen is exactly what you download. No surprises.'
    },
    faq: {
      tag:'Frequently asked questions',
      h2:'What people <em>ask us most</em>',
      q1:'Do generated QR codes expire?', a1:'No. Lucky QR codes are static and never expire. They work forever as long as the content remains valid.',
      q2:'Why do I need to sign up?', a2:'Registration lets us save your history and offer future features. It\'s completely free and we never sell your information.',
      q3:'What size do I need for printing?', a3:'For printing we recommend at least 300px or use SVG which scales without loss. For screens, 256px is sufficient.',
      q4:'Are my WiFi credentials saved on any server?', a4:'No. All processing happens in your browser. Your passwords and any data you enter never leave your device.',
      q5:'Can I use Lucky QR for my business?', a5:'Yes, without restrictions. You can generate QR for menus, cards, WiFi networks, catalogs and campaigns. All free and unlimited.',
      q6:'What is a social QR code?', a6:'It\'s like a Linktree but inside Lucky QR. You create a single QR that when scanned shows a page with all your profiles — Instagram, TikTok, LinkedIn, YouTube and more. Available for Premium users.'
    },
    footer: { home:'Home', generator:'Generator', why:'Why Lucky QR', faq:'FAQ', register:'Sign up', privacy:'Privacy', terms:'Terms', copy:'lucky-qr.com · No servers · 100% private · 2026' },
    modal: {
      login:'Log in', register:'Sign up',
      titleLogin:'Welcome back', titleRegister:'Create your free account',
      subLogin:'Sign in to generate your QR codes. <strong>It\'s free.</strong>',
      subRegister:'Generate unlimited QR codes, save your history and more.',
      fieldName:'Name', fieldEmail:'Email', fieldPass:'Password', fieldConfirm:'Confirm your password',
      btnLogin:'Log in', btnRegister:'Create account',
      switchLogin:'Don\'t have an account? <a onclick="switchAuthTab(\'register\')">Sign up free</a>',
      switchRegister:'Already have an account? <a onclick="switchAuthTab(\'login\')">Log in</a>',
      forgotPass:'Forgot your password?', or:'or', security:'Your data is private and secure',
      namePlaceholder:'Your name', emailPlaceholder:'you@email.com',
      passPlaceholder:'Minimum 6 characters', confirmPlaceholder:'Repeat your password'
    },
    reset: { title:'New password', sub:'Enter your new password to access your account.', passLabel:'New password', confirmLabel:'Confirm password', btn:'Change password', passPlaceholder:'Minimum 6 characters', confirmPlaceholder:'Repeat your password' },
    edit: { title:'Edit destination URL', label:'New URL', save:'Save changes', cancel:'Cancel', placeholder:'https://new-url.com' },
    folder: { title:'New folder', name:'Name', color:'Color', create:'Create folder', cancel:'Cancel', placeholder:'e.g. Restaurant' },
    cookie: { text:'🍪 We use cookies to improve your experience and show relevant ads. <a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">View privacy policy</a>', accept:'Accept', decline:'Essential only' },
    user: { profile:'My profile', activity:'Activity', name:'Name', web:'Website', bio:'Bio', save:'Save changes', dynamicQr:'Dynamic QR', reviews:'Reviews' },
    toast: {
      loginRequired:'Sign in to generate QR codes', fillContent:'Fill in the content first',
      premiumRequired:'You need Premium to use this feature ⭐',
      generated:'QR generated successfully', error:'Generation error',
      copied:'Copied to clipboard', shared:'Shared successfully', printed:'Sent to print',
      welcome:'Welcome back!', registered:'Account created. Check your email to confirm.',
      saved:'Profile saved', loggedOut:'Logged out',
      reviewSent:'Review sent, thank you!', connectionError:'Connection error verifying plan',
      dqrCreated:'Dynamic QR created', urlSaved:'URL updated', dqrDeleted:'QR deleted',
      folderCreated:'Folder created', premiumDynamic:'You need Premium to create dynamic QR ⭐',
      loginReview:'Sign in to leave a review', loginDynamic:'Sign in first',
      landing_title:'Enter a title for the Landing Page', landing_err:'Error saving Landing Page',
      app_err:'Enter at least one valid app URL (https://)', app_save_err:'Error saving App QR',
      social_err:'Fill in at least one social network', dqr_name_err:'Enter a name for the QR',
      dqr_url_err:'Enter a valid URL', dqr_limit:'You\'ve reached the dynamic QR limit',
      edit_err:'Enter a valid URL', bulk_err:'Paste at least one URL', bulk_limit:'Maximum 50 URLs',
      api_created:'API key created', api_limit:'API key limit reached',
      cancel_premium_confirm:'Are you sure you want to cancel Premium? It will remain active until end of period.',
      premium_canceled:'Cancellation requested'
    }
  },

  es: {
    meta: {
      title: 'Lucky QR — Generador de Códigos QR Gratis y Personalizado',
      description: 'Creá códigos QR gratis, sin marcas de agua y al instante. URL, WiFi, WhatsApp, vCard, ubicación y más. El mejor generador de QR gratuito en español.',
      ogTitle: 'Lucky QR — Generador de Códigos QR Gratis',
      ogDescription: 'Creá QR personalizados gratis. Sin marcas de agua, 100% privado.'
    },
    nav: { hint:'Registrate para generar QR', login:'Iniciar sesión', register:'Registrarse gratis', logout:'Salir', logoutFull:'Cerrar sesión', profile:'Mi perfil', activity:'Actividad' },
    hero: {
      chip:'Generador online — Sin costo',
      h1:'Creá tu código QR<br><em>perfecto</em> en segundos',
      sub:'URL, WiFi, WhatsApp, contacto, ubicación y más. Personalizá colores y tamaño. Descargá al instante.',
      cta1:'Crear cuenta gratis', cta2:'Ya tengo cuenta',
      banner:'Necesitás una cuenta para generar QR — <a onclick="openModal(\'register\')">Registrarse es gratis</a>'
    },
    gen: {
      title:'Configuración', chars:'caracteres',
      content:'Contenido', design:'Diseño', advanced:'Opciones avanzadas',
      typeLabel:'Tipo de QR',
      types: { text:'Texto', tel:'Teléfono', geo:'Ubicación', event:'Evento' },
      colorLabel:'Colores', modules:'Módulos', bg:'Fondo',
      colorWarning:'⚠ Los colores son muy similares — el QR puede no leerse',
      gradient:'Usar gradiente',
      shapeLabel:'Forma de módulos', square:'Cuadrado', rounded:'Redondeado', dots:'Puntos',
      frameLabel:'Marco', frameNone:'Sin marco', frameScanme:'SCAN ME', frameEscaneame:'Escaneame', frameLeeme:'¡Leeme!', frameSimple:'Simple',
      sizeLabel:'Tamaño',
      ecLabel:'Corrección de errores',
      ecL:'L — Bajo (7%)', ecM:'M — Medio (15%) recomendado', ecQ:'Q — Alto (25%)', ecH:'H — Máximo (30%)',
      logoLabel:'Logo en el centro', logoHint:'solo Premium', logoRemove:'✕ Quitar logo',
      btn:'Generar QR',
      statusEmpty:'Sin generar'
    },
    wifi: { ssid:'Nombre de red', pass:'Contraseña', sec:'Seguridad', noPass:'Sin contraseña' },
    sms: { number:'Número', message:'Mensaje' },
    vc: { name:'Nombre completo', phone:'Teléfono', company:'Empresa', web:'Sitio web' },
    geo: { input:'Link de Google Maps o coordenadas', lat:'Latitud', lng:'Longitud' },
    wa: { phone:'Número de WhatsApp', msg:'Mensaje predefinido' },
    yt: { link:'Link de YouTube' },
    ig: { user:'Usuario o link de Instagram' },
    pdf: { link:'Link del archivo', hint:'Google Drive, Dropbox, etc.' },
    ev: { name:'Nombre del evento', date:'Fecha', time:'Hora', loc:'Lugar', desc:'Descripción' },
    app: { name:'Nombre de la app', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — el QR detecta el dispositivo y redirige a la tienda correcta automáticamente.' },
    soc: { titleLabel:'Nombre del perfil' },
    lp: { info:'⭐ Premium — el QR apunta a una página personalizada con tu título, descripción y botón.', title:'Título', desc:'Descripción', btnText:'Texto del botón', btnUrl:'URL del botón', bg:'Color de fondo', accent:'Color de acento' },
    preview: { title:'Vista previa', empty:'Completá el formulario<br>y presioná <strong>Generar QR</strong>', copy:'Copiar', download:'Descargar PNG', share:'Compartir', print:'Imprimir' },
    premium: {
      tag:'Plan Premium',
      title:'QR <em style="font-style:italic;font-weight:400;color:var(--accent)">dinámicos</em> y estadísticas',
      freeBadge:'🆓 Plan Gratis',
      lockedTitle:'Desbloqueá Lucky QR Premium',
      lockedDesc:'Creá QR que podés editar sin reimprimir y ve cuántas veces se escanearon.',
      f1:'QR dinámicos — cambiás la URL sin reimprimir',
      f2:'Estadísticas detalladas (ciudad, OS, hora pico)',
      f3:'Carpetas para organizar tus QR',
      f4:'QR con contraseña',
      f5:'Landing Pages personalizadas',
      f6:'Generación en lote (hasta 50 QR en ZIP)',
      f7:'API pública para integrar en tus apps',
      f8:'Logo en el centro del QR',
      upgrade:'Obtener Premium — $4.99 USD/mes',
      cancelBtn:'Cancelar Premium'
    },
    dqr: {
      new:'Nuevo QR dinámico', name:'Nombre del QR', url:'URL destino',
      pwProtect:'Proteger con contraseña', pw:'Contraseña de acceso',
      folder:'Carpeta', noFolder:'Sin carpeta',
      create:'+ Crear QR dinámico', list:'Mis QR dinámicos',
      empty:'Todavía no creaste ningún QR dinámico.'
    },
    stats: { title:'Estadísticas de escaneos', total:'Total', today:'Hoy', peak:'Hora pico', devices:'Dispositivos', os:'Sistemas', countries:'Top países', cities:'Top ciudades' },
    folders: { title:'Carpetas', new:'+ Nueva carpeta', empty:'Sin carpetas todavía.' },
    bulk: {
      sectionTitle:'Generación en lote',
      sectionDesc:'Pegá hasta 50 URLs y descargalas como ZIP. Cada QR lleva el estilo actual (colores, forma, marco).',
      btn:'📦 Generar en lote',
      modalTitle:'Generar QR en lote',
      modalDesc:'Pegá una URL por línea (máximo 50). Se generan con el estilo actual y se descargan en un ZIP.',
      run:'📦 Generar y descargar ZIP',
      cancel:'Cancelar',
      generating:'Generando...'
    },
    api: {
      title:'API Keys', new:'+ Nueva key',
      desc:'Usá tu API key para generar QR programáticamente.',
      docs:'Ver documentación →',
      empty:'Sin API keys. Generá una arriba.'
    },
    reviews: {
      tag:'Opiniones',
      h2:'Lo que dicen<br><em>nuestros usuarios</em>',
      write:'✍ Dejar reseña',
      formTitle:'Tu opinión sobre Lucky QR',
      placeholder:'Contanos qué te pareció Lucky QR...',
      submit:'Enviar reseña',
      loading:'Cargando reseñas...'
    },
    why: {
      tag:'Por qué Lucky QR',
      h2:'No todos los generadores<br>de QR son <em>iguales</em>',
      sub:'La mayoría te pide que pagues, te llena de publicidad invasiva o guarda tus datos en sus servidores. Lucky QR nació para ser diferente desde el primer día.',
      c1t:'Tu información nunca sale de tu dispositivo', c1d:'Todo se procesa en tu navegador. Nadie ve lo que escribís — ni nosotros. Tus contraseñas de WiFi y datos de contacto son solo tuyos.', c1tag:'Privacidad real',
      c2t:'Instantáneo y sin registros molestos', c2d:'Podés explorar todo primero y registrarte solo cuando querés generar. Sin formularios infinitos ni tarjeta de crédito.', c2tag:'Sin fricciones',
      c3t:'Personalización real, no de adorno', c3d:'Elegís el color exacto con una rueda completa. Si los colores son parecidos, te avisamos antes de que el QR sea ilegible.', c3tag:'Control total',
      c4t:'Generación en lote — hasta 50 QR de una vez', c4d:'Pegá tus URLs, generamos todos los QR y los empaquetamos en un ZIP listo para descargar. Ahorrás horas de trabajo.', c4tag:'Bulk generation',
      c5t:'16 tipos de QR + Landing Pages propias', c5d:'URL, WiFi, WhatsApp, vCard, App Store, Redes Sociales, Landing Page personalizada y más. Todo sin límites.', c5tag:'Todo incluido',
      c6t:'Estadísticas que realmente importan', c6d:'Cuántos escaneos, desde qué ciudad, qué sistema operativo, a qué hora. Datos reales para tomar mejores decisiones.', c6tag:'Analytics Premium',
      compareTitle:'Lucky QR vs la competencia',
      compareNote:'* Comparativa basada en los planes gratuitos de cada servicio al momento de publicación.',
      fFeature:'Característica', fFree:'100% gratis', fWatermark:'Sin marcas de agua', fPrivate:'Datos privados',
      fOffline:'Funciona offline', fSvg:'SVG gratis', fTypes:'Tipos de QR gratis', fColors:'Colores personalizados',
      fStats:'Estadísticas detalladas', fBulk:'Generación en lote', fLanding:'Landing Pages',
      fApi:'API pública', fPassword:'QR con contraseña', fFolders:'Carpetas / organización', fLangs:'Idiomas',
      vAlways:'✓ Siempre', vNever:'✓ Nunca', vLocal:'✓ 100% local', vYes:'✓ Sí', vIncluded:'✓ Incluido',
      v16:'✓ 16 tipos', vWheel:'✓ Rueda completa', vCityOs:'✓ Ciudad, OS, hora', v50zip:'✓ Hasta 50 en ZIP',
      vWithDocs:'✓ Con documentación', vLangs:'✓ ES / EN / PT',
      vLimited:'Limitado', vFreemium:'Freemium', vPremiumOnly:'Solo premium',
      vViaServer:'Pasan por servidor', vBasic:'Básicas', vEsOnly:'Solo ES', vEnOnly:'Solo EN'
    },
    info: {
      tag:'Para qué sirve',
      h2:'Más usos de los que <em>imaginás</em>',
      c1t:'Menús y catálogos', c1d:'Poné un QR en tu mesa o mostrador. Tus clientes acceden al menú actualizado al instante, sin impresiones ni costos extra.',
      c2t:'Tarjetas de contacto', c2d:'Compartí tu nombre, teléfono, email y empresa con un solo escaneo usando el formato vCard.',
      c3t:'Acceso WiFi fácil', c3d:'Generá un QR con tu red y contraseña. Tus visitas se conectan escaneando, sin escribir nada.',
      c4t:'Ubicaciones y mapas', c4d:'Compartí la ubicación de tu local o evento. Pegás el link de Google Maps y extraemos las coordenadas automáticamente.',
      c5t:'WhatsApp directo', c5d:'Generá un QR que abre WhatsApp con tu número y un mensaje predefinido. Perfecto para atención al cliente.',
      c6t:'100% privado', c6d:'Todo ocurre en tu navegador. Ningún dato que ingresás sale de tu dispositivo. Sin servidores, sin rastreo.'
    },
    how: {
      tag:'Proceso simple',
      h2:'En 3 pasos tenés<br>tu QR <em>listo para usar</em>',
      s1t:'Creá tu cuenta gratis', s1d:'Solo necesitás un email y una contraseña. Sin tarjeta de crédito. En 30 segundos estás adentro.',
      s2t:'Configurá tu QR', s2d:'Elegí el tipo, personalizá los colores y ajustá el tamaño. Ves el resultado en tiempo real.',
      s3t:'Descargá y usá', s3d:'Exportá en PNG o SVG. Lo que ves en pantalla es exactamente lo que descargás. Sin sorpresas.'
    },
    faq: {
      tag:'Preguntas frecuentes',
      h2:'Lo que más nos <em>preguntan</em>',
      q1:'¿Los QR generados expiran?', a1:'No. Los QR de Lucky QR son estáticos y no expiran jamás. Funcionan para siempre mientras el contenido siga siendo válido.',
      q2:'¿Por qué necesito registrarme?', a2:'El registro nos permite guardarte el historial y ofrecerte funciones futuras. Es completamente gratis y nunca vendemos tu información.',
      q3:'¿Qué tamaño necesito para imprimir?', a3:'Para impresión recomendamos al menos 300px o usar SVG que escala sin pérdida. Para pantalla, 256px es suficiente.',
      q4:'¿Mis datos de WiFi se guardan en algún servidor?', a4:'No. Todo el procesamiento ocurre en tu navegador. Tus contraseñas y cualquier dato que ingresás nunca salen de tu dispositivo.',
      q5:'¿Puedo usar Lucky QR para mi negocio?', a5:'Sí, sin restricciones. Podés generar QR para menús, tarjetas, redes WiFi, catálogos y campañas. Todo gratis y sin límite.',
      q6:'¿Qué es un QR de redes sociales?', a6:'Es como un Linktree pero dentro de Lucky QR. Creás un único QR que al escanearse muestra una página con todos tus perfiles — Instagram, TikTok, LinkedIn, YouTube y más. Disponible para usuarios Premium.'
    },
    footer: { home:'Inicio', generator:'Generador', why:'Por qué Lucky QR', faq:'FAQ', register:'Registrarse', privacy:'Privacidad', terms:'Términos', copy:'lucky-qr.com · Sin servidores · 100% privado · 2026' },
    modal: {
      login:'Iniciar sesión', register:'Registrarse',
      titleLogin:'Bienvenido de vuelta', titleRegister:'Creá tu cuenta gratis',
      subLogin:'Ingresá para generar tus códigos QR. <strong>Es gratis.</strong>',
      subRegister:'Generá QR ilimitados, guardá tu historial y más.',
      fieldName:'Nombre', fieldEmail:'Email', fieldPass:'Contraseña', fieldConfirm:'Confirmá tu contraseña',
      btnLogin:'Iniciar sesión', btnRegister:'Crear cuenta',
      switchLogin:'¿No tenés cuenta? <a onclick="switchAuthTab(\'register\')">Registrate gratis</a>',
      switchRegister:'¿Ya tenés cuenta? <a onclick="switchAuthTab(\'login\')">Iniciá sesión</a>',
      forgotPass:'¿Olvidaste tu contraseña?', or:'o', security:'Tus datos son privados y seguros',
      namePlaceholder:'Tu nombre', emailPlaceholder:'tu@email.com',
      passPlaceholder:'Mínimo 6 caracteres', confirmPlaceholder:'Repetí tu contraseña'
    },
    reset: { title:'Nueva contraseña', sub:'Ingresá tu nueva contraseña para acceder a tu cuenta.', passLabel:'Nueva contraseña', confirmLabel:'Confirmá la contraseña', btn:'Cambiar contraseña', passPlaceholder:'Mínimo 6 caracteres', confirmPlaceholder:'Repetí tu contraseña' },
    edit: { title:'Editar URL destino', label:'Nueva URL', save:'Guardar cambios', cancel:'Cancelar', placeholder:'https://nueva-url.com' },
    folder: { title:'Nueva carpeta', name:'Nombre', color:'Color', create:'Crear carpeta', cancel:'Cancelar', placeholder:'ej: Restaurante' },
    cookie: { text:'🍪 Usamos cookies para mejorar tu experiencia y mostrar anuncios relevantes. <a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">Ver política de privacidad</a>', accept:'Aceptar', decline:'Solo necesarias' },
    user: { profile:'Mi perfil', activity:'Actividad', name:'Nombre', web:'Sitio web', bio:'Bio', save:'Guardar cambios', dynamicQr:'QR dinámicos', reviews:'Reseñas' },
    toast: {
      loginRequired:'Iniciá sesión para generar QR', fillContent:'Completá el contenido primero',
      premiumRequired:'Necesitás Premium para usar esta función ⭐',
      generated:'QR generado correctamente', error:'Error al generar',
      copied:'Copiado al portapapeles', shared:'Compartido correctamente', printed:'Enviado a imprimir',
      welcome:'Bienvenido de vuelta!', registered:'Cuenta creada. Revisá tu email para confirmar.',
      saved:'Perfil guardado', loggedOut:'Sesión cerrada',
      reviewSent:'Reseña enviada, gracias!', connectionError:'Error de conexión al verificar el plan',
      dqrCreated:'QR dinámico creado', urlSaved:'URL actualizada', dqrDeleted:'QR eliminado',
      folderCreated:'Carpeta creada', premiumDynamic:'Necesitás Premium para crear QR dinámicos ⭐',
      loginReview:'Iniciá sesión para dejar una reseña', loginDynamic:'Iniciá sesión primero',
      landing_title:'Ingresá un título para la Landing Page', landing_err:'Error al guardar la Landing Page',
      app_err:'Completá al menos una URL válida de la app (https://)', app_save_err:'Error al guardar el QR de app',
      social_err:'Completá al menos una red social', dqr_name_err:'Ingresá un nombre para el QR',
      dqr_url_err:'Ingresá una URL válida', dqr_limit:'Llegaste al límite de QR dinámicos',
      edit_err:'Ingresá una URL válida', bulk_err:'Pegá al menos una URL', bulk_limit:'Máximo 50 URLs',
      api_created:'API key creada', api_limit:'Límite de API keys alcanzado',
      cancel_premium_confirm:'¿Seguro que querés cancelar el plan Premium? Seguirá activo hasta fin del período.',
      premium_canceled:'Cancelación solicitada'
    }
  },

  pt: {
    meta: {
      title: 'Lucky QR — Gerador de Códigos QR Grátis e Personalizado',
      description: 'Crie códigos QR grátis, sem marcas d\'água e instantaneamente. URL, WiFi, WhatsApp, vCard, localização e mais.',
      ogTitle: 'Lucky QR — Gerador de Códigos QR Grátis',
      ogDescription: 'Crie QR personalizados de graça. Sem marcas d\'água, 100% privado.'
    },
    nav: { hint:'Cadastre-se para gerar QR', login:'Entrar', register:'Cadastrar grátis', logout:'Sair', logoutFull:'Sair da conta', profile:'Meu perfil', activity:'Atividade' },
    hero: {
      chip:'Gerador online — Gratuito',
      h1:'Crie seu código QR<br><em>perfeito</em> em segundos',
      sub:'URL, WiFi, WhatsApp, contatos, localização e mais. Personalize cores e tamanho. Baixe instantaneamente.',
      cta1:'Criar conta grátis', cta2:'Já tenho conta',
      banner:'Você precisa de uma conta para gerar QR — <a onclick="openModal(\'register\')">Cadastre-se gratuitamente</a>'
    },
    gen: {
      title:'Configuração', chars:'caracteres',
      content:'Conteúdo', design:'Design', advanced:'Opções avançadas',
      typeLabel:'Tipo de QR',
      types: { text:'Texto', tel:'Telefone', geo:'Localização', event:'Evento' },
      colorLabel:'Cores', modules:'Módulos', bg:'Fundo',
      colorWarning:'⚠ As cores são muito parecidas — o QR pode não ser lido',
      gradient:'Usar gradiente',
      shapeLabel:'Forma dos módulos', square:'Quadrado', rounded:'Arredondado', dots:'Pontos',
      frameLabel:'Moldura', frameNone:'Sem moldura', frameScanme:'SCAN ME', frameEscaneame:'Escanear', frameLeeme:'Leia-me!', frameSimple:'Simples',
      sizeLabel:'Tamanho',
      ecLabel:'Correção de erros',
      ecL:'L — Baixo (7%)', ecM:'M — Médio (15%) recomendado', ecQ:'Q — Alto (25%)', ecH:'H — Máximo (30%)',
      logoLabel:'Logo no centro', logoHint:'apenas Premium', logoRemove:'✕ Remover logo',
      btn:'Gerar QR',
      statusEmpty:'Não gerado'
    },
    wifi: { ssid:'Nome da rede', pass:'Senha', sec:'Segurança', noPass:'Sem senha' },
    sms: { number:'Número', message:'Mensagem' },
    vc: { name:'Nome completo', phone:'Telefone', company:'Empresa', web:'Site' },
    geo: { input:'Link do Google Maps ou coordenadas', lat:'Latitude', lng:'Longitude' },
    wa: { phone:'Número do WhatsApp', msg:'Mensagem padrão' },
    yt: { link:'Link do YouTube' },
    ig: { user:'Usuário ou link do Instagram' },
    pdf: { link:'Link do arquivo', hint:'Google Drive, Dropbox, etc.' },
    ev: { name:'Nome do evento', date:'Data', time:'Hora', loc:'Local', desc:'Descrição' },
    app: { name:'Nome do app', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — o QR detecta o dispositivo e redireciona para a loja correta automaticamente.' },
    soc: { titleLabel:'Nome do perfil' },
    lp: { info:'⭐ Premium — o QR aponta para uma página personalizada com seu título, descrição e botão.', title:'Título', desc:'Descrição', btnText:'Texto do botão', btnUrl:'URL do botão', bg:'Cor de fundo', accent:'Cor de destaque' },
    preview: { title:'Visualização', empty:'Preencha o formulário<br>e clique em <strong>Gerar QR</strong>', copy:'Copiar', download:'Baixar PNG', share:'Compartilhar', print:'Imprimir' },
    premium: {
      tag:'Plano Premium',
      title:'QR <em style="font-style:italic;font-weight:400;color:var(--accent)">dinâmicos</em> e estatísticas',
      freeBadge:'🆓 Plano Grátis',
      lockedTitle:'Desbloqueie o Lucky QR Premium',
      lockedDesc:'Crie QR codes que pode editar sem reimprimir e veja quantas vezes foram escaneados.',
      f1:'QR dinâmicos — altere a URL sem reimprimir',
      f2:'Estatísticas detalhadas (cidade, OS, hora de pico)',
      f3:'Pastas para organizar seus QR',
      f4:'QR com senha',
      f5:'Landing Pages personalizadas',
      f6:'Geração em lote (até 50 QR em ZIP)',
      f7:'API pública para integrar em seus apps',
      f8:'Logo no centro do QR',
      upgrade:'Obter Premium — $4,99 USD/mês',
      cancelBtn:'Cancelar Premium'
    },
    dqr: { new:'Novo QR dinâmico', name:'Nome do QR', url:'URL de destino', pwProtect:'Proteger com senha', pw:'Senha de acesso', folder:'Pasta', noFolder:'Sem pasta', create:'+ Criar QR dinâmico', list:'Meus QR dinâmicos', empty:'Você ainda não criou nenhum QR dinâmico.' },
    stats: { title:'Estatísticas de escaneamentos', total:'Total', today:'Hoje', peak:'Hora de pico', devices:'Dispositivos', os:'Sistemas', countries:'Top países', cities:'Top cidades' },
    folders: { title:'Pastas', new:'+ Nova pasta', empty:'Sem pastas ainda.' },
    bulk: { sectionTitle:'Geração em lote', sectionDesc:'Cole até 50 URLs e baixe como ZIP. Cada QR usa o estilo atual.', btn:'📦 Gerar em lote', modalTitle:'Gerar QR em lote', modalDesc:'Cole uma URL por linha (máx. 50). Gerados com o estilo atual e baixados em ZIP.', run:'📦 Gerar e baixar ZIP', cancel:'Cancelar', generating:'Gerando...' },
    api: { title:'Chaves de API', new:'+ Nova chave', desc:'Use sua chave de API para gerar QR programaticamente.', docs:'Ver documentação →', empty:'Sem chaves de API. Gere uma acima.' },
    reviews: { tag:'Opiniões', h2:'O que nossos<br><em>usuários dizem</em>', write:'✍ Deixar avaliação', formTitle:'Sua opinião sobre Lucky QR', placeholder:'Conte-nos o que achou do Lucky QR...', submit:'Enviar avaliação', loading:'Carregando avaliações...' },
    why: {
      tag:'Por que Lucky QR', h2:'Nem todos os geradores<br>de QR são <em>iguais</em>',
      sub:'A maioria pede que você pague, enche de publicidade invasiva ou guarda seus dados em servidores. O Lucky QR nasceu para ser diferente desde o primeiro dia.',
      c1t:'Suas informações nunca saem do seu dispositivo', c1d:'Tudo é processado no seu navegador. Ninguém vê o que você digita — nem nós. Suas senhas WiFi e dados de contato são só seus.', c1tag:'Privacidade real',
      c2t:'Instantâneo e sem cadastros chatos', c2d:'Você pode explorar tudo primeiro e se cadastrar só quando quiser gerar. Sem formulários infinitos nem cartão de crédito.', c2tag:'Sem fricção',
      c3t:'Personalização real, não decorativa', c3d:'Você escolhe a cor exata com uma roda completa. Se as cores forem parecidas, avisamos antes do QR ficar ilegível.', c3tag:'Controle total',
      c4t:'Geração em lote — até 50 QR de uma vez', c4d:'Cole suas URLs, geramos todos os QR e empacotamos em um ZIP pronto para baixar. Economize horas de trabalho.', c4tag:'Bulk generation',
      c5t:'16 tipos de QR + Landing Pages próprias', c5d:'URL, WiFi, WhatsApp, vCard, App Store, Redes Sociais, Landing Page personalizada e mais. Tudo sem limites.', c5tag:'Tudo incluído',
      c6t:'Estatísticas que realmente importam', c6d:'Quantos escaneamentos, de qual cidade, qual sistema operacional, em que hora. Dados reais para tomar melhores decisões.', c6tag:'Analytics Premium',
      compareTitle:'Lucky QR vs a concorrência',
      compareNote:'* Comparativo baseado nos planos gratuitos de cada serviço no momento da publicação.',
      fFeature:'Recurso', fFree:'100% grátis', fWatermark:'Sem marca d\'água', fPrivate:'Dados privados',
      fOffline:'Funciona offline', fSvg:'SVG grátis', fTypes:'Tipos de QR grátis', fColors:'Cores personalizadas',
      fStats:'Estatísticas detalhadas', fBulk:'Geração em lote', fLanding:'Landing Pages',
      fApi:'API pública', fPassword:'QR com senha', fFolders:'Pastas / organização', fLangs:'Idiomas',
      vAlways:'✓ Sempre', vNever:'✓ Nunca', vLocal:'✓ 100% local', vYes:'✓ Sim', vIncluded:'✓ Incluído',
      v16:'✓ 16 tipos', vWheel:'✓ Roda completa', vCityOs:'✓ Cidade, OS, hora', v50zip:'✓ Até 50 em ZIP',
      vWithDocs:'✓ Com documentação', vLangs:'✓ ES / EN / PT',
      vLimited:'Limitado', vFreemium:'Freemium', vPremiumOnly:'Somente premium',
      vViaServer:'Via servidor', vBasic:'Básico', vEsOnly:'Só ES', vEnOnly:'Só EN'
    },
    info: { tag:'Para que serve', h2:'Mais usos do que você <em>imagina</em>', c1t:'Menus e catálogos', c1d:'Coloque um QR na sua mesa ou balcão. Clientes acessam o menu atualizado instantaneamente.', c2t:'Cartões de contato', c2d:'Compartilhe nome, telefone, e-mail e empresa com um único scan usando o formato vCard.', c3t:'Acesso WiFi fácil', c3d:'Gere um QR com sua rede e senha. Visitas se conectam escaneando, sem digitar nada.', c4t:'Localizações e mapas', c4d:'Compartilhe a localização do seu negócio ou evento. Cole o link do Google Maps e extraímos as coordenadas.', c5t:'WhatsApp direto', c5d:'Gere um QR que abre o WhatsApp com seu número e mensagem predefinida. Perfeito para atendimento.', c6t:'100% privado', c6d:'Tudo acontece no seu navegador. Nenhum dado que você insere sai do dispositivo. Sem servidores, sem rastreamento.' },
    how: { tag:'Processo simples', h2:'Em 3 passos seu<br>QR está <em>pronto para usar</em>', s1t:'Crie sua conta grátis', s1d:'Você só precisa de um e-mail e senha. Sem cartão de crédito. Em 30 segundos você está dentro.', s2t:'Configure seu QR', s2d:'Escolha o tipo, personalize as cores e ajuste o tamanho. Veja o resultado em tempo real.', s3t:'Baixe e use', s3d:'Exporte em PNG ou SVG. O que você vê na tela é exatamente o que baixa. Sem surpresas.' },
    faq: { tag:'Perguntas frequentes', h2:'O que mais nos <em>perguntam</em>', q1:'Os QR gerados expiram?', a1:'Não. Os QR do Lucky QR são estáticos e nunca expiram. Funcionam para sempre enquanto o conteúdo for válido.', q2:'Por que preciso me cadastrar?', a2:'O cadastro nos permite salvar seu histórico e oferecer recursos futuros. É completamente grátis e nunca vendemos suas informações.', q3:'Qual tamanho preciso para imprimir?', a3:'Para impressão recomendamos pelo menos 300px ou usar SVG que escala sem perda. Para tela, 256px é suficiente.', q4:'Minha senha WiFi é salva em algum servidor?', a4:'Não. Todo o processamento ocorre no seu navegador. Suas senhas e dados nunca saem do dispositivo.', q5:'Posso usar o Lucky QR para meu negócio?', a5:'Sim, sem restrições. Você pode gerar QR para menus, cartões, redes WiFi, catálogos e campanhas. Tudo grátis e sem limite.', q6:'O que é um QR de redes sociais?', a6:'É como um Linktree mas dentro do Lucky QR. Você cria um único QR que ao ser escaneado mostra uma página com todos os seus perfis. Disponível para usuários Premium.' },
    footer: { home:'Início', generator:'Gerador', why:'Por que Lucky QR', faq:'FAQ', register:'Cadastrar', privacy:'Privacidade', terms:'Termos', copy:'lucky-qr.com · Sem servidores · 100% privado · 2026' },
    modal: { login:'Entrar', register:'Cadastrar', titleLogin:'Bem-vindo de volta', titleRegister:'Crie sua conta grátis', subLogin:'Entre para gerar seus QR codes. <strong>É grátis.</strong>', subRegister:'Gere QR ilimitados, salve seu histórico e mais.', fieldName:'Nome', fieldEmail:'E-mail', fieldPass:'Senha', fieldConfirm:'Confirme sua senha', btnLogin:'Entrar', btnRegister:'Criar conta', switchLogin:'Não tem conta? <a onclick="switchAuthTab(\'register\')">Cadastre-se grátis</a>', switchRegister:'Já tem conta? <a onclick="switchAuthTab(\'login\')">Entre</a>', forgotPass:'Esqueceu sua senha?', or:'ou', security:'Seus dados são privados e seguros', namePlaceholder:'Seu nome', emailPlaceholder:'voce@email.com', passPlaceholder:'Mínimo 6 caracteres', confirmPlaceholder:'Repita sua senha' },
    reset: { title:'Nova senha', sub:'Digite sua nova senha para acessar sua conta.', passLabel:'Nova senha', confirmLabel:'Confirme a senha', btn:'Alterar senha', passPlaceholder:'Mínimo 6 caracteres', confirmPlaceholder:'Repita sua senha' },
    edit: { title:'Editar URL de destino', label:'Nova URL', save:'Salvar alterações', cancel:'Cancelar', placeholder:'https://nova-url.com' },
    folder: { title:'Nova pasta', name:'Nome', color:'Cor', create:'Criar pasta', cancel:'Cancelar', placeholder:'ex: Restaurante' },
    cookie: { text:'🍪 Usamos cookies para melhorar sua experiência. <a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">Ver política de privacidade</a>', accept:'Aceitar', decline:'Somente essenciais' },
    user: { profile:'Meu perfil', activity:'Atividade', name:'Nome', web:'Site', bio:'Bio', save:'Salvar alterações', dynamicQr:'QR dinâmicos', reviews:'Avaliações' },
    toast: { loginRequired:'Entre para gerar QR', fillContent:'Preencha o conteúdo primeiro', premiumRequired:'Você precisa do Premium para usar este recurso ⭐', generated:'QR gerado com sucesso', error:'Erro ao gerar', copied:'Copiado para a área de transferência', shared:'Compartilhado com sucesso', printed:'Enviado para impressão', welcome:'Bem-vindo de volta!', registered:'Conta criada. Verifique seu e-mail para confirmar.', saved:'Perfil salvo', loggedOut:'Sessão encerrada', reviewSent:'Avaliação enviada, obrigado!', connectionError:'Erro de conexão ao verificar o plano', dqrCreated:'QR dinâmico criado', urlSaved:'URL atualizada', dqrDeleted:'QR excluído', folderCreated:'Pasta criada', premiumDynamic:'Você precisa do Premium para criar QR dinâmicos ⭐', loginReview:'Entre para deixar uma avaliação', loginDynamic:'Entre primeiro', landing_title:'Insira um título para a Landing Page', landing_err:'Erro ao salvar a Landing Page', app_err:'Preencha pelo menos uma URL válida do app (https://)', app_save_err:'Erro ao salvar o QR do app', social_err:'Preencha pelo menos uma rede social', dqr_name_err:'Insira um nome para o QR', dqr_url_err:'Insira uma URL válida', dqr_limit:'Você atingiu o limite de QR dinâmicos', edit_err:'Insira uma URL válida', bulk_err:'Cole pelo menos uma URL', bulk_limit:'Máximo 50 URLs', api_created:'Chave de API criada', api_limit:'Limite de chaves de API atingido', cancel_premium_confirm:'Tem certeza que quer cancelar o Premium? Continuará ativo até o fim do período.', premium_canceled:'Cancelamento solicitado' }
  },

  ru: {
    meta: { title:'Lucky QR — Бесплатный генератор QR-кодов', description:'Создавайте QR-коды бесплатно. URL, WiFi, WhatsApp, vCard, геолокация и многое другое. Без водяных знаков, 100% приватно.', ogTitle:'Lucky QR — Бесплатный генератор QR-кодов', ogDescription:'Создавайте персонализированные QR-коды бесплатно. Без водяных знаков, 100% приватно.' },
    nav: { hint:'Зарегистрируйтесь для генерации QR', login:'Войти', register:'Регистрация бесплатно', logout:'Выйти', logoutFull:'Выйти из аккаунта', profile:'Мой профиль', activity:'Активность' },
    hero: { chip:'Онлайн-генератор — Бесплатно', h1:'Создайте идеальный<br><em>QR-код</em> за секунды', sub:'URL, WiFi, WhatsApp, контакты, геолокация и многое другое. Настройте цвета и размер. Скачайте мгновенно.', cta1:'Создать бесплатный аккаунт', cta2:'У меня уже есть аккаунт', banner:'Для генерации QR нужен аккаунт — <a onclick="openModal(\'register\')">Регистрация бесплатная</a>' },
    gen: { title:'Настройки', chars:'символов', content:'Содержимое', design:'Дизайн', advanced:'Дополнительно', typeLabel:'Тип QR', types:{ text:'Текст', tel:'Телефон', geo:'Локация', event:'Событие' }, colorLabel:'Цвета', modules:'Модули', bg:'Фон', colorWarning:'⚠ Цвета слишком похожи — QR может не читаться', gradient:'Использовать градиент', shapeLabel:'Форма модулей', square:'Квадрат', rounded:'Скруглённый', dots:'Точки', frameLabel:'Рамка', frameNone:'Без рамки', frameScanme:'SCAN ME', frameEscaneame:'Сканируй', frameLeeme:'Читай!', frameSimple:'Простая', sizeLabel:'Размер', ecLabel:'Коррекция ошибок', ecL:'L — Низкая (7%)', ecM:'M — Средняя (15%) рекомендуется', ecQ:'Q — Высокая (25%)', ecH:'H — Максимум (30%)', logoLabel:'Логотип в центре', logoHint:'только Premium', logoRemove:'✕ Убрать логотип', btn:'Создать QR', statusEmpty:'Не создан' },
    wifi: { ssid:'Имя сети', pass:'Пароль', sec:'Безопасность', noPass:'Без пароля' },
    sms: { number:'Номер', message:'Сообщение' },
    vc: { name:'Полное имя', phone:'Телефон', company:'Компания', web:'Сайт' },
    geo: { input:'Ссылка Google Maps или координаты', lat:'Широта', lng:'Долгота' },
    wa: { phone:'Номер WhatsApp', msg:'Предустановленное сообщение' },
    yt: { link:'Ссылка YouTube' },
    ig: { user:'Имя пользователя или ссылка Instagram' },
    pdf: { link:'Ссылка на файл', hint:'Google Drive, Dropbox и т.д.' },
    ev: { name:'Название события', date:'Дата', time:'Время', loc:'Место', desc:'Описание' },
    app: { name:'Название приложения', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — QR определяет устройство и перенаправляет в нужный магазин автоматически.' },
    soc: { titleLabel:'Имя профиля' },
    lp: { info:'⭐ Premium — QR ведёт на персональную страницу с вашим заголовком, описанием и кнопкой.', title:'Заголовок', desc:'Описание', btnText:'Текст кнопки', btnUrl:'URL кнопки', bg:'Цвет фона', accent:'Акцентный цвет' },
    preview: { title:'Предпросмотр', empty:'Заполните форму<br>и нажмите <strong>Создать QR</strong>', copy:'Копировать', download:'Скачать PNG', share:'Поделиться', print:'Печать' },
    premium: { tag:'Premium план', title:'<em style="font-style:italic;font-weight:400;color:var(--accent)">Динамические</em> QR и аналитика', freeBadge:'🆓 Бесплатный план', lockedTitle:'Разблокируйте Lucky QR Premium', lockedDesc:'Создавайте QR, которые можно редактировать без перепечати, и отслеживайте сканирования.', f1:'Динамические QR — меняйте URL без перепечати', f2:'Детальная аналитика (город, ОС, пиковое время)', f3:'Папки для организации QR-кодов', f4:'QR с паролем', f5:'Персональные Landing Pages', f6:'Массовая генерация (до 50 QR в ZIP)', f7:'Публичный API для интеграции', f8:'Логотип в центре QR', upgrade:'Получить Premium — $4.99 USD/мес', cancelBtn:'Отменить Premium' },
    dqr: { new:'Новый динамический QR', name:'Название QR', url:'Целевой URL', pwProtect:'Защитить паролем', pw:'Пароль доступа', folder:'Папка', noFolder:'Без папки', create:'+ Создать динамический QR', list:'Мои динамические QR', empty:'Вы ещё не создали ни одного динамического QR.' },
    stats: { title:'Статистика сканирований', total:'Всего', today:'Сегодня', peak:'Пиковый час', devices:'Устройства', os:'Системы', countries:'Топ стран', cities:'Топ городов' },
    folders: { title:'Папки', new:'+ Новая папка', empty:'Папок пока нет.' },
    bulk: { sectionTitle:'Массовая генерация', sectionDesc:'Вставьте до 50 URL и скачайте как ZIP. Каждый QR использует текущий стиль.', btn:'📦 Массовая генерация', modalTitle:'Массовая генерация QR', modalDesc:'Вставьте по одному URL в строке (макс. 50). Генерируются с текущим стилем.', run:'📦 Создать и скачать ZIP', cancel:'Отмена', generating:'Генерация...' },
    api: { title:'API ключи', new:'+ Новый ключ', desc:'Используйте API ключ для программной генерации QR.', docs:'Документация →', empty:'Нет API ключей. Создайте выше.' },
    reviews: { tag:'Отзывы', h2:'Что говорят<br><em>наши пользователи</em>', write:'✍ Оставить отзыв', formTitle:'Ваше мнение о Lucky QR', placeholder:'Расскажите, что вы думаете о Lucky QR...', submit:'Отправить отзыв', loading:'Загрузка отзывов...' },
    why: { tag:'Почему Lucky QR', h2:'Не все генераторы QR<br><em>одинаковы</em>', sub:'Большинство просят оплату, заполнены навязчивой рекламой или хранят ваши данные на серверах. Lucky QR создан быть другим с первого дня.', c1t:'Ваши данные никогда не покидают устройство', c1d:'Всё обрабатывается в вашем браузере. Никто не видит, что вы вводите — даже мы. Ваши WiFi-пароли и контакты только ваши.', c1tag:'Настоящая приватность', c2t:'Мгновенно и без регистрации', c2d:'Можно сначала всё посмотреть и зарегистрироваться только когда захотите генерировать. Без бесконечных форм и банковских карт.', c2tag:'Без трений', c3t:'Настоящая кастомизация', c3d:'Выбирайте точный цвет с полной цветовой палитрой. Если цвета похожи, предупредим до того, как QR станет нечитаемым.', c3tag:'Полный контроль', c4t:'Массовая генерация — до 50 QR за раз', c4d:'Вставьте URL, мы создадим все QR и упакуем в ZIP. Сэкономьте часы работы.', c4tag:'Массовая генерация', c5t:'16 типов QR + Landing Pages', c5d:'URL, WiFi, WhatsApp, vCard, App Store, соцсети, Landing Page и многое другое. Без ограничений.', c5tag:'Всё включено', c6t:'Аналитика, которая важна', c6d:'Сколько сканирований, из какого города, какая ОС, в какое время. Реальные данные для лучших решений.', c6tag:'Premium аналитика', compareTitle:'Lucky QR против конкурентов', compareNote:'* Сравнение основано на бесплатных планах каждого сервиса на момент публикации.', fFeature:'Функция', fFree:'100% бесплатно', fWatermark:'Без водяных знаков', fPrivate:'Приватность данных', fOffline:'Работает офлайн', fSvg:'SVG бесплатно', fTypes:'Бесплатных типов QR', fColors:'Настраиваемые цвета', fStats:'Детальная аналитика', fBulk:'Массовая генерация', fLanding:'Landing Pages', fApi:'Публичный API', fPassword:'QR с паролем', fFolders:'Папки', fLangs:'Языки', vAlways:'✓ Всегда', vNever:'✓ Никогда', vLocal:'✓ 100% локально', vYes:'✓ Да', vIncluded:'✓ Включено', v16:'✓ 16 типов', vWheel:'✓ Полная палитра', vCityOs:'✓ Город, ОС, час', v50zip:'✓ До 50 в ZIP', vWithDocs:'✓ С документацией', vLangs:'✓ ES / EN / PT', vLimited:'Ограничено', vFreemium:'Freemium', vPremiumOnly:'Только premium', vViaServer:'Через сервер', vBasic:'Базовая', vEsOnly:'Только ES', vEnOnly:'Только EN' },
    info: { tag:'Для чего это', h2:'Больше применений, чем вы <em>думаете</em>', c1t:'Меню и каталоги', c1d:'Поставьте QR на столик. Клиенты мгновенно открывают актуальное меню.', c2t:'Визитные карточки', c2d:'Поделитесь именем, телефоном, email и компанией одним сканированием в формате vCard.', c3t:'Подключение к WiFi', c3d:'Создайте QR с вашей сетью и паролем. Гости подключаются сканируя, не набирая ничего.', c4t:'Локации и карты', c4d:'Поделитесь адресом бизнеса или мероприятия. Вставьте ссылку Google Maps — координаты извлечём сами.', c5t:'WhatsApp напрямую', c5d:'Создайте QR, открывающий WhatsApp с вашим номером и предустановленным сообщением.', c6t:'100% приватно', c6d:'Всё происходит в вашем браузере. Никакие данные не покидают устройство. Без серверов, без слежки.' },
    how: { tag:'Простой процесс', h2:'Всего 3 шага —<br>QR <em>готов к использованию</em>', s1t:'Создайте бесплатный аккаунт', s1d:'Нужен только email и пароль. Без банковской карты. За 30 секунд вы внутри.', s2t:'Настройте QR', s2d:'Выберите тип, настройте цвета и размер. Видите результат в реальном времени.', s3t:'Скачайте и используйте', s3d:'Экспортируйте в PNG или SVG. То, что видите на экране — именно то, что скачаете.' },
    faq: { tag:'Часто задаваемые вопросы', h2:'Что нас <em>спрашивают чаще всего</em>', q1:'Срок действия QR-кодов истекает?', a1:'Нет. QR Lucky QR статические и никогда не истекают. Работают вечно, пока контент действителен.', q2:'Зачем нужна регистрация?', a2:'Регистрация позволяет сохранять историю и предлагать функции в будущем. Полностью бесплатно, ваши данные не продаём.', q3:'Какой размер нужен для печати?', a3:'Для печати рекомендуем не менее 300px или SVG, который масштабируется без потерь. Для экрана 256px достаточно.', q4:'Мои WiFi-данные сохраняются на сервере?', a4:'Нет. Всё обрабатывается в браузере. Пароли и любые данные никогда не покидают устройство.', q5:'Можно использовать Lucky QR для бизнеса?', a5:'Да, без ограничений. Генерируйте QR для меню, визиток, WiFi, каталогов и кампаний. Всё бесплатно.', q6:'Что такое QR для соцсетей?', a6:'Как Linktree, но внутри Lucky QR. Один QR — страница со всеми профилями: Instagram, TikTok, LinkedIn, YouTube и другими. Для Premium-пользователей.' },
    footer: { home:'Главная', generator:'Генератор', why:'Почему Lucky QR', faq:'FAQ', register:'Регистрация', privacy:'Конфиденциальность', terms:'Условия', copy:'lucky-qr.com · Без серверов · 100% приватно · 2026' },
    modal: { login:'Войти', register:'Регистрация', titleLogin:'С возвращением', titleRegister:'Создайте бесплатный аккаунт', subLogin:'Войдите для генерации QR-кодов. <strong>Это бесплатно.</strong>', subRegister:'Генерируйте неограниченное число QR, сохраняйте историю и многое другое.', fieldName:'Имя', fieldEmail:'Email', fieldPass:'Пароль', fieldConfirm:'Подтвердите пароль', btnLogin:'Войти', btnRegister:'Создать аккаунт', switchLogin:'Нет аккаунта? <a onclick="switchAuthTab(\'register\')">Зарегистрируйтесь бесплатно</a>', switchRegister:'Уже есть аккаунт? <a onclick="switchAuthTab(\'login\')">Войдите</a>', forgotPass:'Забыли пароль?', or:'или', security:'Ваши данные приватны и защищены', namePlaceholder:'Ваше имя', emailPlaceholder:'vы@email.com', passPlaceholder:'Минимум 6 символов', confirmPlaceholder:'Повторите пароль' },
    reset: { title:'Новый пароль', sub:'Введите новый пароль для доступа к аккаунту.', passLabel:'Новый пароль', confirmLabel:'Подтвердите пароль', btn:'Изменить пароль', passPlaceholder:'Минимум 6 символов', confirmPlaceholder:'Повторите пароль' },
    edit: { title:'Изменить целевой URL', label:'Новый URL', save:'Сохранить изменения', cancel:'Отмена', placeholder:'https://новый-url.com' },
    folder: { title:'Новая папка', name:'Название', color:'Цвет', create:'Создать папку', cancel:'Отмена', placeholder:'Напр.: Ресторан' },
    cookie: { text:'🍪 Мы используем cookies для улучшения опыта. <a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">Политика конфиденциальности</a>', accept:'Принять', decline:'Только необходимые' },
    user: { profile:'Мой профиль', activity:'Активность', name:'Имя', web:'Сайт', bio:'О себе', save:'Сохранить', dynamicQr:'Динамические QR', reviews:'Отзывы' },
    toast: { loginRequired:'Войдите для генерации QR', fillContent:'Заполните содержимое', premiumRequired:'Нужен Premium для этой функции ⭐', generated:'QR успешно создан', error:'Ошибка генерации', copied:'Скопировано', shared:'Поделились успешно', printed:'Отправлено на печать', welcome:'С возвращением!', registered:'Аккаунт создан. Проверьте email.', saved:'Профиль сохранён', loggedOut:'Вышли из системы', reviewSent:'Отзыв отправлен, спасибо!', connectionError:'Ошибка соединения при проверке плана', dqrCreated:'Динамический QR создан', urlSaved:'URL обновлён', dqrDeleted:'QR удалён', folderCreated:'Папка создана', premiumDynamic:'Нужен Premium для динамических QR ⭐', loginReview:'Войдите для отзыва', loginDynamic:'Сначала войдите', landing_title:'Введите заголовок для Landing Page', landing_err:'Ошибка сохранения Landing Page', app_err:'Введите хотя бы один URL приложения', app_save_err:'Ошибка сохранения QR приложения', social_err:'Заполните хотя бы одну соцсеть', dqr_name_err:'Введите название QR', dqr_url_err:'Введите корректный URL', dqr_limit:'Достигнут лимит динамических QR', edit_err:'Введите корректный URL', bulk_err:'Вставьте хотя бы один URL', bulk_limit:'Максимум 50 URL', api_created:'API ключ создан', api_limit:'Лимит API ключей достигнут', cancel_premium_confirm:'Отменить Premium? Останется активным до конца периода.', premium_canceled:'Отмена запрошена' }
  },

  zh: {
    meta: { title:'Lucky QR — 免费自定义二维码生成器', description:'免费生成二维码，无水印，即时可用。支持URL、WiFi、WhatsApp、vCard、位置等多种类型。', ogTitle:'Lucky QR — 免费二维码生成器', ogDescription:'免费创建自定义二维码。无水印，100%私密。' },
    nav: { hint:'注册以生成二维码', login:'登录', register:'免费注册', logout:'退出', logoutFull:'退出账号', profile:'我的资料', activity:'活动记录' },
    hero: { chip:'在线生成器 — 免费', h1:'几秒内创建您的<br><em>完美二维码</em>', sub:'支持URL、WiFi、WhatsApp、联系人、位置等。自定义颜色和大小，即时下载。', cta1:'免费创建账号', cta2:'我已有账号', banner:'生成二维码需要账号 — <a onclick="openModal(\'register\')">免费注册</a>' },
    gen: { title:'配置', chars:'字符', content:'内容', design:'设计', advanced:'高级选项', typeLabel:'二维码类型', types:{ text:'文本', tel:'电话', geo:'位置', event:'事件' }, colorLabel:'颜色', modules:'模块', bg:'背景', colorWarning:'⚠ 颜色过于相似 — 二维码可能无法识别', gradient:'使用渐变', shapeLabel:'模块形状', square:'方形', rounded:'圆角', dots:'圆点', frameLabel:'边框', frameNone:'无边框', frameScanme:'SCAN ME', frameEscaneame:'扫描我', frameLeeme:'阅读我！', frameSimple:'简单', sizeLabel:'尺寸', ecLabel:'纠错级别', ecL:'L — 低 (7%)', ecM:'M — 中 (15%) 推荐', ecQ:'Q — 高 (25%)', ecH:'H — 最高 (30%)', logoLabel:'中心Logo', logoHint:'仅限Premium', logoRemove:'✕ 删除Logo', btn:'生成二维码', statusEmpty:'未生成' },
    wifi: { ssid:'网络名称', pass:'密码', sec:'安全类型', noPass:'无密码' },
    sms: { number:'号码', message:'消息' },
    vc: { name:'全名', phone:'电话', company:'公司', web:'网站' },
    geo: { input:'Google地图链接或坐标', lat:'纬度', lng:'经度' },
    wa: { phone:'WhatsApp号码', msg:'预设消息' },
    yt: { link:'YouTube链接' },
    ig: { user:'Instagram用户名或链接' },
    pdf: { link:'文件链接', hint:'Google Drive、Dropbox等' },
    ev: { name:'事件名称', date:'日期', time:'时间', loc:'地点', desc:'描述' },
    app: { name:'应用名称', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — 二维码检测设备并自动跳转到对应应用商店。' },
    soc: { titleLabel:'个人资料名称' },
    lp: { info:'⭐ Premium — 二维码指向带有您的标题、描述和按钮的自定义页面。', title:'标题', desc:'描述', btnText:'按钮文字', btnUrl:'按钮URL', bg:'背景色', accent:'强调色' },
    preview: { title:'预览', empty:'填写表单<br>然后点击<strong>生成二维码</strong>', copy:'复制', download:'下载PNG', share:'分享', print:'打印' },
    premium: { tag:'Premium计划', title:'<em style="font-style:italic;font-weight:400;color:var(--accent)">动态</em>二维码与分析', freeBadge:'🆓 免费计划', lockedTitle:'解锁Lucky QR Premium', lockedDesc:'创建可编辑的二维码无需重新打印，并追踪扫描次数。', f1:'动态二维码 — 无需重印即可更改URL', f2:'详细分析（城市、OS、高峰时段）', f3:'文件夹组织您的二维码', f4:'密码保护二维码', f5:'自定义落地页', f6:'批量生成（最多50个ZIP）', f7:'公共API集成', f8:'二维码中心Logo', upgrade:'获取Premium — $4.99 美元/月', cancelBtn:'取消Premium' },
    dqr: { new:'新动态二维码', name:'二维码名称', url:'目标URL', pwProtect:'密码保护', pw:'访问密码', folder:'文件夹', noFolder:'无文件夹', create:'+ 创建动态二维码', list:'我的动态二维码', empty:'您还未创建任何动态二维码。' },
    stats: { title:'扫描统计', total:'总计', today:'今天', peak:'高峰时段', devices:'设备', os:'系统', countries:'热门国家', cities:'热门城市' },
    folders: { title:'文件夹', new:'+ 新文件夹', empty:'暂无文件夹。' },
    bulk: { sectionTitle:'批量生成', sectionDesc:'粘贴最多50个URL并以ZIP下载。每个二维码使用当前样式。', btn:'📦 批量生成', modalTitle:'批量生成二维码', modalDesc:'每行粘贴一个URL（最多50个）。使用当前样式生成并打包为ZIP。', run:'📦 生成并下载ZIP', cancel:'取消', generating:'生成中...' },
    api: { title:'API密钥', new:'+ 新密钥', desc:'使用API密钥以编程方式生成二维码。', docs:'查看文档 →', empty:'无API密钥，请在上方生成。' },
    reviews: { tag:'用户评价', h2:'<em>用户</em>怎么说', write:'✍ 写评价', formTitle:'您对Lucky QR的看法', placeholder:'告诉我们您对Lucky QR的看法...', submit:'提交评价', loading:'加载评价中...' },
    why: { tag:'为什么选择Lucky QR', h2:'并非所有二维码<br>生成器都<em>相同</em>', sub:'大多数要求付费、充满广告或在服务器上存储您的数据。Lucky QR从第一天起就与众不同。', c1t:'您的信息永远不会离开您的设备', c1d:'一切都在您的浏览器中处理。没有人看到您输入的内容——包括我们。您的WiFi密码和联系数据只属于您。', c1tag:'真正的隐私', c2t:'即时且无烦人注册', c2d:'您可以先探索一切，只在想生成时才注册。无需无休止的表单或信用卡。', c2tag:'无摩擦', c3t:'真正的自定义', c3d:'用完整调色盘选择精确颜色。若颜色相似，在二维码变得不可读前我们会提醒您。', c3tag:'完全控制', c4t:'批量生成 — 一次最多50个', c4d:'粘贴URL，我们生成所有二维码并打包为ZIP。节省数小时工作。', c4tag:'批量生成', c5t:'16种二维码类型+自定义落地页', c5d:'URL、WiFi、WhatsApp、vCard、App Store、社交网络、自定义落地页等，无限制。', c5tag:'全部包含', c6t:'真正重要的分析', c6d:'多少次扫描、来自哪个城市、哪个操作系统、在什么时间。真实数据做出更好决策。', c6tag:'Premium分析', compareTitle:'Lucky QR与竞争对手比较', compareNote:'* 比较基于各服务发布时的免费计划。', fFeature:'功能', fFree:'100%免费', fWatermark:'无水印', fPrivate:'数据隐私', fOffline:'离线工作', fSvg:'免费SVG', fTypes:'免费二维码类型', fColors:'自定义颜色', fStats:'详细分析', fBulk:'批量生成', fLanding:'落地页', fApi:'公共API', fPassword:'密码二维码', fFolders:'文件夹', fLangs:'语言', vAlways:'✓ 始终', vNever:'✓ 从不', vLocal:'✓ 100%本地', vYes:'✓ 是', vIncluded:'✓ 包含', v16:'✓ 16种', vWheel:'✓ 完整调色盘', vCityOs:'✓ 城市、OS、时段', v50zip:'✓ 最多50个ZIP', vWithDocs:'✓ 含文档', vLangs:'✓ ES/EN/PT', vLimited:'有限', vFreemium:'免费增值', vPremiumOnly:'仅Premium', vViaServer:'经服务器', vBasic:'基础', vEsOnly:'仅ES', vEnOnly:'仅EN' },
    info: { tag:'用途', h2:'比您<em>想象的</em>更多用途', c1t:'菜单与目录', c1d:'在桌上放QR码，客户即时访问最新菜单，无需打印。', c2t:'名片', c2d:'用vCard格式一次扫描分享姓名、电话、邮件和公司。', c3t:'简易WiFi连接', c3d:'生成包含网络和密码的QR码。访客扫描即连接，无需输入。', c4t:'位置与地图', c4d:'分享商业地址或活动地点。粘贴Google地图链接，自动提取坐标。', c5t:'直接WhatsApp', c5d:'生成可打开WhatsApp的QR码，包含号码和预设消息。完美的客服工具。', c6t:'100%私密', c6d:'一切都在浏览器中发生。您输入的数据不会离开设备。无服务器，无追踪。' },
    how: { tag:'简单流程', h2:'3步即可<br><em>使用</em>您的二维码', s1t:'创建免费账号', s1d:'只需邮箱和密码，无需信用卡，30秒内完成注册。', s2t:'配置二维码', s2d:'选择类型、自定义颜色和大小，实时查看结果。', s3t:'下载并使用', s3d:'导出为PNG或SVG。屏幕上看到的就是您下载的。无惊喜。' },
    faq: { tag:'常见问题', h2:'人们<em>最常问</em>我们的问题', q1:'生成的二维码会过期吗？', a1:'不会。Lucky QR生成的是静态二维码，永不过期，只要内容有效就一直有效。', q2:'为什么需要注册？', a2:'注册让我们能保存您的历史记录并提供未来功能。完全免费，我们绝不出售您的信息。', q3:'打印需要什么尺寸？', a3:'打印建议至少300px或使用无损缩放的SVG。屏幕显示256px足够。', q4:'我的WiFi数据会保存到服务器吗？', a4:'不会。所有处理都在浏览器中进行。您输入的密码和数据永远不会离开设备。', q5:'可以将Lucky QR用于商业用途吗？', a5:'可以，无任何限制。可为菜单、名片、WiFi、目录和营销活动生成二维码，全部免费无限制。', q6:'什么是社交二维码？', a6:'类似Linktree，但集成在Lucky QR中。创建一个扫描后显示所有社交资料页面的二维码：Instagram、TikTok、LinkedIn、YouTube等。仅限Premium用户。' },
    footer: { home:'首页', generator:'生成器', why:'为什么选择Lucky QR', faq:'常见问题', register:'注册', privacy:'隐私', terms:'条款', copy:'lucky-qr.com · 无服务器 · 100%私密 · 2026' },
    modal: { login:'登录', register:'注册', titleLogin:'欢迎回来', titleRegister:'创建免费账号', subLogin:'登录以生成您的二维码。<strong>免费的。</strong>', subRegister:'生成无限二维码，保存历史记录等更多功能。', fieldName:'姓名', fieldEmail:'邮箱', fieldPass:'密码', fieldConfirm:'确认密码', btnLogin:'登录', btnRegister:'创建账号', switchLogin:'没有账号？<a onclick="switchAuthTab(\'register\')">免费注册</a>', switchRegister:'已有账号？<a onclick="switchAuthTab(\'login\')">登录</a>', forgotPass:'忘记密码？', or:'或', security:'您的数据是私密且安全的', namePlaceholder:'您的姓名', emailPlaceholder:'您@email.com', passPlaceholder:'最少6个字符', confirmPlaceholder:'重复密码' },
    reset: { title:'新密码', sub:'输入新密码以访问您的账号。', passLabel:'新密码', confirmLabel:'确认密码', btn:'更改密码', passPlaceholder:'最少6个字符', confirmPlaceholder:'重复密码' },
    edit: { title:'编辑目标URL', label:'新URL', save:'保存更改', cancel:'取消', placeholder:'https://new-url.com' },
    folder: { title:'新建文件夹', name:'名称', color:'颜色', create:'创建文件夹', cancel:'取消', placeholder:'例如：餐厅' },
    cookie: { text:'🍪 我们使用Cookie改善体验。<a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">查看隐私政策</a>', accept:'接受', decline:'仅必要' },
    user: { profile:'我的资料', activity:'活动', name:'姓名', web:'网站', bio:'简介', save:'保存更改', dynamicQr:'动态二维码', reviews:'评价' },
    toast: { loginRequired:'请登录以生成二维码', fillContent:'请先填写内容', premiumRequired:'此功能需要Premium ⭐', generated:'二维码生成成功', error:'生成错误', copied:'已复制到剪贴板', shared:'分享成功', printed:'已发送到打印', welcome:'欢迎回来！', registered:'账号已创建，请查看邮件确认。', saved:'资料已保存', loggedOut:'已退出登录', reviewSent:'评价已提交，谢谢！', connectionError:'验证计划时连接错误', dqrCreated:'动态二维码已创建', urlSaved:'URL已更新', dqrDeleted:'二维码已删除', folderCreated:'文件夹已创建', premiumDynamic:'创建动态二维码需要Premium ⭐', loginReview:'请登录以留下评价', loginDynamic:'请先登录', landing_title:'请输入落地页标题', landing_err:'保存落地页时出错', app_err:'至少填写一个有效应用URL', app_save_err:'保存应用二维码时出错', social_err:'至少填写一个社交网络', dqr_name_err:'请输入二维码名称', dqr_url_err:'请输入有效URL', dqr_limit:'已达到动态二维码限制', edit_err:'请输入有效URL', bulk_err:'至少粘贴一个URL', bulk_limit:'最多50个URL', api_created:'API密钥已创建', api_limit:'已达到API密钥限制', cancel_premium_confirm:'确定取消Premium？将在期末保持有效。', premium_canceled:'取消请求已提交' }
  },

  de: {
    meta: { title:'Lucky QR — Kostenloser QR-Code-Generator', description:'Erstellen Sie kostenlos QR-Codes. URL, WiFi, WhatsApp, vCard, Standort und mehr. Ohne Wasserzeichen, 100% privat.', ogTitle:'Lucky QR — Kostenloser QR-Code-Generator', ogDescription:'Erstellen Sie personalisierte QR-Codes kostenlos. Ohne Wasserzeichen, 100% privat.' },
    nav: { hint:'Registrieren zum QR-Generieren', login:'Anmelden', register:'Kostenlos registrieren', logout:'Abmelden', logoutFull:'Abmelden', profile:'Mein Profil', activity:'Aktivität' },
    hero: { chip:'Online-Generator — Kostenlos', h1:'Erstellen Sie Ihren perfekten<br><em>QR-Code</em> in Sekunden', sub:'URL, WiFi, WhatsApp, Kontakte, Standort und mehr. Farben und Größe anpassen. Sofort herunterladen.', cta1:'Kostenloses Konto erstellen', cta2:'Ich habe schon ein Konto', banner:'Sie benötigen ein Konto — <a onclick="openModal(\'register\')">Kostenlos registrieren</a>' },
    gen: { title:'Einstellungen', chars:'Zeichen', content:'Inhalt', design:'Design', advanced:'Erweiterte Optionen', typeLabel:'QR-Typ', types:{ text:'Text', tel:'Telefon', geo:'Standort', event:'Veranstaltung' }, colorLabel:'Farben', modules:'Module', bg:'Hintergrund', colorWarning:'⚠ Farben sind zu ähnlich — der QR-Code ist möglicherweise nicht lesbar', gradient:'Verlauf verwenden', shapeLabel:'Modulform', square:'Quadrat', rounded:'Abgerundet', dots:'Punkte', frameLabel:'Rahmen', frameNone:'Kein Rahmen', frameScanme:'SCAN ME', frameEscaneame:'Scannen', frameLeeme:'Lies mich!', frameSimple:'Einfach', sizeLabel:'Größe', ecLabel:'Fehlerkorrektur', ecL:'L — Niedrig (7%)', ecM:'M — Mittel (15%) empfohlen', ecQ:'Q — Hoch (25%)', ecH:'H — Maximum (30%)', logoLabel:'Logo in der Mitte', logoHint:'nur Premium', logoRemove:'✕ Logo entfernen', btn:'QR generieren', statusEmpty:'Nicht generiert' },
    wifi: { ssid:'Netzwerkname', pass:'Passwort', sec:'Sicherheit', noPass:'Kein Passwort' },
    sms: { number:'Nummer', message:'Nachricht' },
    vc: { name:'Vollständiger Name', phone:'Telefon', company:'Unternehmen', web:'Webseite' },
    geo: { input:'Google Maps-Link oder Koordinaten', lat:'Breitengrad', lng:'Längengrad' },
    wa: { phone:'WhatsApp-Nummer', msg:'Voreingestellte Nachricht' },
    yt: { link:'YouTube-Link' },
    ig: { user:'Instagram-Benutzername oder Link' },
    pdf: { link:'Datei-Link', hint:'Google Drive, Dropbox usw.' },
    ev: { name:'Veranstaltungsname', date:'Datum', time:'Uhrzeit', loc:'Ort', desc:'Beschreibung' },
    app: { name:'App-Name', ios:'App Store (iOS)', android:'Play Store (Android)', info:'⭐ Premium — der QR erkennt das Gerät und leitet automatisch zum richtigen Store weiter.' },
    soc: { titleLabel:'Profilname' },
    lp: { info:'⭐ Premium — der QR zeigt auf eine personalisierte Seite mit Ihrem Titel, Beschreibung und Button.', title:'Titel', desc:'Beschreibung', btnText:'Button-Text', btnUrl:'Button-URL', bg:'Hintergrundfarbe', accent:'Akzentfarbe' },
    preview: { title:'Vorschau', empty:'Formular ausfüllen<br>und <strong>QR generieren</strong> drücken', copy:'Kopieren', download:'PNG herunterladen', share:'Teilen', print:'Drucken' },
    premium: { tag:'Premium-Plan', title:'<em style="font-style:italic;font-weight:400;color:var(--accent)">Dynamische</em> QR &amp; Statistiken', freeBadge:'🆓 Kostenloser Plan', lockedTitle:'Lucky QR Premium freischalten', lockedDesc:'Erstellen Sie QR-Codes, die Sie ohne Neudruck bearbeiten können, und verfolgen Sie Scans.', f1:'Dynamische QR — URL ohne Neudruck ändern', f2:'Detaillierte Statistiken (Stadt, OS, Spitzenstunde)', f3:'Ordner zur QR-Organisation', f4:'Passwortgeschützte QR', f5:'Personalisierte Landing Pages', f6:'Massengenerierung (bis zu 50 QR im ZIP)', f7:'Öffentliche API zur Integration', f8:'Logo in der Mitte des QR', upgrade:'Premium holen — $4,99 USD/Monat', cancelBtn:'Premium kündigen' },
    dqr: { new:'Neuer dynamischer QR', name:'QR-Name', url:'Ziel-URL', pwProtect:'Mit Passwort schützen', pw:'Zugangspasswort', folder:'Ordner', noFolder:'Kein Ordner', create:'+ Dynamischen QR erstellen', list:'Meine dynamischen QR-Codes', empty:'Sie haben noch keine dynamischen QR-Codes erstellt.' },
    stats: { title:'Scan-Statistiken', total:'Gesamt', today:'Heute', peak:'Spitzenstunde', devices:'Geräte', os:'Systeme', countries:'Top-Länder', cities:'Top-Städte' },
    folders: { title:'Ordner', new:'+ Neuer Ordner', empty:'Noch keine Ordner.' },
    bulk: { sectionTitle:'Massengenerierung', sectionDesc:'Bis zu 50 URLs einfügen und als ZIP herunterladen. Jeder QR verwendet den aktuellen Stil.', btn:'📦 Massengenerierung', modalTitle:'QR-Massengenerierung', modalDesc:'Eine URL pro Zeile einfügen (max. 50). Mit aktuellem Stil generiert und als ZIP heruntergeladen.', run:'📦 Generieren und ZIP herunterladen', cancel:'Abbrechen', generating:'Wird generiert...' },
    api: { title:'API-Schlüssel', new:'+ Neuer Schlüssel', desc:'Verwenden Sie Ihren API-Schlüssel zur programmatischen QR-Generierung.', docs:'Dokumentation ansehen →', empty:'Keine API-Schlüssel. Oben einen generieren.' },
    reviews: { tag:'Bewertungen', h2:'Was unsere<br><em>Nutzer sagen</em>', write:'✍ Bewertung schreiben', formTitle:'Ihre Meinung zu Lucky QR', placeholder:'Erzählen Sie uns, was Sie von Lucky QR halten...', submit:'Bewertung senden', loading:'Bewertungen laden...' },
    why: { tag:'Warum Lucky QR', h2:'Nicht alle QR-Generatoren<br>sind <em>gleich</em>', sub:'Die meisten verlangen Zahlungen, sind mit aufdringlicher Werbung gefüllt oder speichern Ihre Daten auf Servern. Lucky QR wurde von Anfang an anders gestaltet.', c1t:'Ihre Daten verlassen Ihr Gerät nie', c1d:'Alles wird in Ihrem Browser verarbeitet. Niemand sieht, was Sie eingeben – auch wir nicht. Ihre WLAN-Passwörter und Kontaktdaten gehören nur Ihnen.', c1tag:'Echte Privatsphäre', c2t:'Sofort und ohne lästige Registrierung', c2d:'Sie können alles zuerst erkunden und sich nur registrieren, wenn Sie generieren möchten. Keine endlosen Formulare oder Kreditkarte erforderlich.', c2tag:'Reibungslos', c3t:'Echte Anpassung, nicht dekorativ', c3d:'Wählen Sie die genaue Farbe mit einem vollständigen Farbrad. Wenn Farben zu ähnlich sind, warnen wir Sie, bevor der QR unleserlich wird.', c3tag:'Volle Kontrolle', c4t:'Massengenerierung — bis zu 50 QR auf einmal', c4d:'URLs einfügen, alle QR generieren lassen und als ZIP verpacken. Stunden Arbeit sparen.', c4tag:'Massengenerierung', c5t:'16 QR-Typen + Landing Pages', c5d:'URL, WiFi, WhatsApp, vCard, App Store, soziale Netzwerke, Landing Page und mehr. Alles ohne Grenzen.', c5tag:'Alles inklusive', c6t:'Statistiken, die wirklich wichtig sind', c6d:'Wie viele Scans, aus welcher Stadt, welches Betriebssystem, zu welcher Uhrzeit. Echte Daten für bessere Entscheidungen.', c6tag:'Premium-Analytik', compareTitle:'Lucky QR vs. Wettbewerb', compareNote:'* Vergleich basiert auf kostenlosen Plänen der Dienste zum Zeitpunkt der Veröffentlichung.', fFeature:'Funktion', fFree:'100% kostenlos', fWatermark:'Keine Wasserzeichen', fPrivate:'Private Daten', fOffline:'Offline nutzbar', fSvg:'SVG kostenlos', fTypes:'Kostenlose QR-Typen', fColors:'Benutzerdefinierte Farben', fStats:'Detaillierte Statistiken', fBulk:'Massengenerierung', fLanding:'Landing Pages', fApi:'Öffentliche API', fPassword:'QR mit Passwort', fFolders:'Ordner', fLangs:'Sprachen', vAlways:'✓ Immer', vNever:'✓ Nie', vLocal:'✓ 100% lokal', vYes:'✓ Ja', vIncluded:'✓ Inklusive', v16:'✓ 16 Typen', vWheel:'✓ Volles Farbrad', vCityOs:'✓ Stadt, OS, Stunde', v50zip:'✓ Bis zu 50 im ZIP', vWithDocs:'✓ Mit Doku', vLangs:'✓ ES / EN / PT', vLimited:'Begrenzt', vFreemium:'Freemium', vPremiumOnly:'Nur Premium', vViaServer:'Über Server', vBasic:'Einfach', vEsOnly:'Nur ES', vEnOnly:'Nur EN' },
    info: { tag:'Wofür es gut ist', h2:'Mehr Anwendungen als Sie <em>denken</em>', c1t:'Menüs und Kataloge', c1d:'Platzieren Sie einen QR auf Ihrem Tisch. Kunden greifen sofort auf das aktuelle Menü zu, ohne Druckkosten.', c2t:'Visitenkarten', c2d:'Teilen Sie Name, Telefon, E-Mail und Unternehmen mit einem einzigen Scan im vCard-Format.', c3t:'Einfacher WLAN-Zugang', c3d:'Erstellen Sie einen QR mit Netzwerk und Passwort. Gäste verbinden sich durch Scannen, ohne etwas einzutippen.', c4t:'Standorte und Karten', c4d:'Teilen Sie Ihren Unternehmensstandort. Fügen Sie den Google Maps-Link ein – wir extrahieren die Koordinaten automatisch.', c5t:'Direkter WhatsApp', c5d:'Erstellen Sie einen QR, der WhatsApp mit Ihrer Nummer und einer voreingestellten Nachricht öffnet.', c6t:'100% privat', c6d:'Alles passiert in Ihrem Browser. Keine eingegebenen Daten verlassen Ihr Gerät. Keine Server, kein Tracking.' },
    how: { tag:'Einfacher Prozess', h2:'In 3 Schritten ist Ihr<br>QR <em>einsatzbereit</em>', s1t:'Kostenloses Konto erstellen', s1d:'Nur E-Mail und Passwort nötig. Keine Kreditkarte. In 30 Sekunden sind Sie dabei.', s2t:'QR konfigurieren', s2d:'Typ wählen, Farben anpassen und Größe einstellen. Ergebnis in Echtzeit sehen.', s3t:'Herunterladen und verwenden', s3d:'Als PNG oder SVG exportieren. Was Sie sehen ist genau das, was Sie herunterladen.' },
    faq: { tag:'Häufig gestellte Fragen', h2:'Was man uns <em>am häufigsten fragt</em>', q1:'Verfallen generierte QR-Codes?', a1:'Nein. Lucky QR-Codes sind statisch und verfallen nie. Sie funktionieren für immer, solange der Inhalt gültig ist.', q2:'Warum muss ich mich registrieren?', a2:'Die Registrierung ermöglicht es uns, Ihren Verlauf zu speichern. Komplett kostenlos, wir verkaufen Ihre Daten nie.', q3:'Welche Größe brauche ich zum Drucken?', a3:'Für den Druck empfehlen wir mindestens 300px oder SVG, das verlustfrei skaliert. Für Bildschirm reichen 256px.', q4:'Werden meine WLAN-Daten auf einem Server gespeichert?', a4:'Nein. Alle Verarbeitung erfolgt in Ihrem Browser. Passwörter und Daten verlassen Ihr Gerät nie.', q5:'Kann ich Lucky QR für mein Unternehmen nutzen?', a5:'Ja, ohne Einschränkungen. QR für Menüs, Karten, WLAN, Kataloge und Kampagnen generieren. Alles kostenlos.', q6:'Was ist ein Social-QR-Code?', a6:'Wie Linktree, aber in Lucky QR. Ein QR, das beim Scannen eine Seite mit allen Ihren Profilen zeigt. Nur für Premium-Nutzer.' },
    footer: { home:'Startseite', generator:'Generator', why:'Warum Lucky QR', faq:'FAQ', register:'Registrieren', privacy:'Datenschutz', terms:'AGB', copy:'lucky-qr.com · Keine Server · 100% privat · 2026' },
    modal: { login:'Anmelden', register:'Registrieren', titleLogin:'Willkommen zurück', titleRegister:'Kostenloses Konto erstellen', subLogin:'Anmelden um QR-Codes zu generieren. <strong>Kostenlos.</strong>', subRegister:'Unbegrenzte QR generieren, Verlauf speichern und mehr.', fieldName:'Name', fieldEmail:'E-Mail', fieldPass:'Passwort', fieldConfirm:'Passwort bestätigen', btnLogin:'Anmelden', btnRegister:'Konto erstellen', switchLogin:'Kein Konto? <a onclick="switchAuthTab(\'register\')">Kostenlos registrieren</a>', switchRegister:'Schon ein Konto? <a onclick="switchAuthTab(\'login\')">Anmelden</a>', forgotPass:'Passwort vergessen?', or:'oder', security:'Ihre Daten sind privat und sicher', namePlaceholder:'Ihr Name', emailPlaceholder:'Sie@email.com', passPlaceholder:'Mindestens 6 Zeichen', confirmPlaceholder:'Passwort wiederholen' },
    reset: { title:'Neues Passwort', sub:'Neues Passwort eingeben, um auf Ihr Konto zuzugreifen.', passLabel:'Neues Passwort', confirmLabel:'Passwort bestätigen', btn:'Passwort ändern', passPlaceholder:'Mindestens 6 Zeichen', confirmPlaceholder:'Passwort wiederholen' },
    edit: { title:'Ziel-URL bearbeiten', label:'Neue URL', save:'Änderungen speichern', cancel:'Abbrechen', placeholder:'https://neue-url.com' },
    folder: { title:'Neuer Ordner', name:'Name', color:'Farbe', create:'Ordner erstellen', cancel:'Abbrechen', placeholder:'z.B. Restaurant' },
    cookie: { text:'🍪 Wir verwenden Cookies zur Verbesserung der Erfahrung. <a href="/privacy.html" style="color:#a3d9b8;text-decoration:underline">Datenschutzrichtlinie</a>', accept:'Akzeptieren', decline:'Nur notwendige' },
    user: { profile:'Mein Profil', activity:'Aktivität', name:'Name', web:'Webseite', bio:'Bio', save:'Änderungen speichern', dynamicQr:'Dynamische QR', reviews:'Bewertungen' },
    toast: { loginRequired:'Anmelden um QR zu generieren', fillContent:'Inhalt zuerst ausfüllen', premiumRequired:'Premium für diese Funktion benötigt ⭐', generated:'QR erfolgreich generiert', error:'Generierungsfehler', copied:'In Zwischenablage kopiert', shared:'Erfolgreich geteilt', printed:'An Drucker gesendet', welcome:'Willkommen zurück!', registered:'Konto erstellt. E-Mail prüfen.', saved:'Profil gespeichert', loggedOut:'Abgemeldet', reviewSent:'Bewertung gesendet, danke!', connectionError:'Verbindungsfehler bei Planverifizierung', dqrCreated:'Dynamischer QR erstellt', urlSaved:'URL aktualisiert', dqrDeleted:'QR gelöscht', folderCreated:'Ordner erstellt', premiumDynamic:'Premium für dynamische QR benötigt ⭐', loginReview:'Anmelden um Bewertung zu hinterlassen', loginDynamic:'Zuerst anmelden', landing_title:'Titel für Landing Page eingeben', landing_err:'Fehler beim Speichern der Landing Page', app_err:'Mindestens eine gültige App-URL eingeben', app_save_err:'Fehler beim Speichern des App-QR', social_err:'Mindestens ein soziales Netzwerk ausfüllen', dqr_name_err:'QR-Namen eingeben', dqr_url_err:'Gültige URL eingeben', dqr_limit:'Limit für dynamische QR erreicht', edit_err:'Gültige URL eingeben', bulk_err:'Mindestens eine URL einfügen', bulk_limit:'Maximal 50 URLs', api_created:'API-Schlüssel erstellt', api_limit:'API-Schlüssel-Limit erreicht', cancel_premium_confirm:'Premium wirklich kündigen? Bleibt bis Ende des Zeitraums aktiv.', premium_canceled:'Kündigung angefordert' }
  }
};

// ── Core i18n functions ──
var _currentLang = 'en';

function getLang() {
  var urlParam = new URLSearchParams(window.location.search).get('lang');
  if (urlParam && I18N[urlParam]) return urlParam;
  var stored = localStorage.getItem('lucky_qr_lang');
  if (stored && I18N[stored]) return stored;
  return 'en';
}

function t(key) {
  var lang = _currentLang;
  var parts = key.split('.');
  var val = I18N[lang];
  for (var i = 0; i < parts.length; i++) { if (val === undefined) break; val = val[parts[i]]; }
  if (val !== undefined && typeof val !== 'object') return val;
  // fallback to English
  val = I18N['en'];
  for (var j = 0; j < parts.length; j++) { if (val === undefined) break; val = val[parts[j]]; }
  return (val !== undefined && typeof val !== 'object') ? val : key;
}

function applyLanguage(lang) {
  if (!I18N[lang]) return;
  _currentLang = lang;
  var tr = I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (val !== key) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var val = t(key);
    if (val !== key) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-title');
    var val = t(key);
    if (val !== key) el.title = val;
  });

  // meta
  if (tr.meta) {
    if (tr.meta.title) document.title = tr.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && tr.meta.description) desc.setAttribute('content', tr.meta.description);
    var ogT = document.querySelector('meta[property="og:title"]');
    if (ogT && tr.meta.ogTitle) ogT.setAttribute('content', tr.meta.ogTitle);
    var ogD = document.querySelector('meta[property="og:description"]');
    if (ogD && tr.meta.ogDescription) ogD.setAttribute('content', tr.meta.ogDescription);
  }

  // html lang attribute
  document.documentElement.lang = lang;

  // update selector button
  var flags = { en:'🇺🇸', es:'🇦🇷', pt:'🇧🇷', ru:'🇷🇺', zh:'🇨🇳', de:'🇩🇪' };
  var names = { en:'EN', es:'ES', pt:'PT', ru:'RU', zh:'中文', de:'DE' };
  var btn = document.getElementById('lang-selector-btn');
  if (btn) btn.innerHTML = (flags[lang] || '') + ' ' + (names[lang] || lang.toUpperCase());

  document.querySelectorAll('.lang-option').forEach(function(opt) {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });
}

function setLang(lang) {
  if (!I18N[lang]) return;
  localStorage.setItem('lucky_qr_lang', lang);
  applyLanguage(lang);
}

function toggleLangDropdown() {
  var dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.toggle('open');
}

function chooseLang(lang) {
  setLang(lang);
  var dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.remove('open');
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  var sel = document.getElementById('lang-selector');
  if (sel && !sel.contains(e.target)) {
    var dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  applyLanguage(getLang());
});
