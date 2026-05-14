// ══════════════════════════════════════════
//  Lucky QR — qr-script.js
//  Supabase Auth + Dynamic QR + Reviews
// ══════════════════════════════════════════

// ── Variables globales ──
var SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co';
var SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH';
var supabase     = null;
var currentUser  = null;
var authMode     = 'login';
var currentType  = 'url';
var currentStar  = 0;
var currentDark  = '#18160f';
var currentLight = '#ffffff';
var currentShape = 'square';
var currentFrame = 'none';
var currentGradient = false;
var currentGradientColor = '#1d6b4a';

// ── Inicializar Supabase con ESM dinámico ──
(async function() {
  try {
var mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    supabase = mod.createClient(SUPABASE_URL, SUPABASE_KEY);
    // escuchar cambios de sesión
    supabase.auth.onAuthStateChange(function(event, session) {
      if (event === 'PASSWORD_RECOVERY') {
        document.getElementById('reset-modal').classList.add('open');
        return;
      }
      if (session && session.user) {
        loadUserProfile(session.user);
      } else {
        currentUser = null;
        showLoggedOut();
      }
    });
    // verificar sesión existente al cargar
    var res = await supabase.auth.getSession();
    if (res.data && res.data.session) {
      loadUserProfile(res.data.session.user);
    } else {
      showLoggedOut();
    }
  } catch(e) {
    console.error('Supabase error:', e);
    showLoggedOut();
  }
})();
// ── Helpers ──
function hEl(id) { var e = document.getElementById(id); if (e) e.style.display = 'none'; }
function sEl(id, d) { var e = document.getElementById(id); if (e) e.style.display = d || 'block'; }

// ── Auth UI ──
function showLoggedIn() {
  hEl('nav-auth-hint'); hEl('btn-nav-login'); hEl('btn-nav-register');
  hEl('register-banner'); hEl('hero-btns');
  sEl('nav-user', 'flex');
  var i = (currentUser.name || currentUser.email).slice(0,2).toUpperCase();
  document.getElementById('nav-avatar').textContent   = i;
  document.getElementById('nav-username').textContent = currentUser.name || currentUser.email.split('@')[0];
  var av = document.getElementById('up-av'); if (av) av.textContent = i;
  var dn = document.getElementById('up-dname'); if (dn) dn.textContent = currentUser.name || 'Usuario';
  var de = document.getElementById('up-demail'); if (de) de.textContent = currentUser.email;
  checkPremiumStatus();
  var btnCancel = document.getElementById('btn-cancel-premium');
if (btnCancel) btnCancel.style.display = currentUser.plan === 'premium' ? 'block' : 'none';
}

function showLoggedOut() {
  sEl('nav-auth-hint', 'flex'); sEl('btn-nav-login', 'inline-flex'); sEl('btn-nav-register', 'inline-flex');
  sEl('register-banner', 'flex'); sEl('hero-btns', 'flex');
  hEl('nav-user'); hEl('user-panel');
}

function logout() {
  if (supabase) supabase.auth.signOut();
  currentUser = null;
  showLoggedOut();
  showToast('Sesión cerrada');
}

// ── Cargar perfil desde Supabase ──
async function loadUserProfile(authUser) {
  if (!supabase) return;
  var res = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
  if (res.error || !res.data) {
    // crear perfil nuevo
    var name = (authUser.user_metadata && authUser.user_metadata.name) || authUser.email.split('@')[0];
    await supabase.from('profiles').insert({ id: authUser.id, email: authUser.email, name: name, plan: 'free' });
    currentUser = { id: authUser.id, email: authUser.email, name: name, plan: 'free' };
  } else {
    currentUser = res.data;
  }
  showLoggedIn();
}

// ── Panel usuario ──
function toggleUserPanel() {
  var p = document.getElementById('user-panel');
  if (!p) return;
  if (p.style.display === 'block') { p.style.display = 'none'; return; }
  p.style.display = 'block';
  loadUserPanel();
}

async function loadUserPanel() {
  if (!currentUser || !supabase) return;
  var n = document.getElementById('up-name'); if (n) n.value = currentUser.name || '';
  var e = document.getElementById('up-email'); if (e) e.value = currentUser.email || '';
  var b = document.getElementById('up-bio'); if (b) b.value = currentUser.bio || '';
  var w = document.getElementById('up-web'); if (w) w.value = currentUser.web || '';
  var av = document.getElementById('up-av');
  if (av) av.textContent = (currentUser.name || currentUser.email).slice(0,2).toUpperCase();
  var dn = document.getElementById('up-dname'); if (dn) dn.textContent = currentUser.name || 'Usuario';
  var de = document.getElementById('up-demail'); if (de) de.textContent = currentUser.email;
  // contar QR dinámicos
  var qrRes = await supabase.from('dynamic_qrs').select('*', { count:'exact', head:true }).eq('user_id', currentUser.id);
  var cnt = document.getElementById('up-qr-count'); if (cnt) cnt.textContent = qrRes.count || 0;
  // historial
  var histRes = await supabase.from('dynamic_qrs').select('name,created_at').eq('user_id', currentUser.id).order('created_at', { ascending:false }).limit(5);
  var hl = document.getElementById('up-history-list');
  if (hl) {
    if (!histRes.data || histRes.data.length === 0) {
      hl.innerHTML = '<p style="font-size:.75rem;color:var(--muted2)">Todavía no creaste QR dinámicos.</p>';
    } else {
      hl.innerHTML = '<p style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-weight:500">Últimos QR dinámicos:</p>'
        + histRes.data.map(function(q){
          return '<div style="font-size:.72rem;padding:5px 0;border-bottom:1px solid var(--border);color:var(--muted)">'
            + '<span style="color:var(--accent);font-weight:500">' + q.name + '</span> · '
            + new Date(q.created_at).toLocaleDateString('es-AR') + '</div>';
        }).join('');
    }
  }
}

function switchUpTab(tab, btn) {
  document.querySelectorAll('.up-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.up-section').forEach(function(s){ s.classList.remove('active'); });
  var sec = document.getElementById('up-tab-' + tab); if (sec) sec.classList.add('active');
  if (tab === 'stats') loadUserPanel();
}

async function saveProfile() {
  var name = document.getElementById('up-name').value.trim();
  var bio  = document.getElementById('up-bio').value.trim();
  var web  = document.getElementById('up-web').value.trim();
  if (!name) { showToast('Ingresá tu nombre'); return; }
  if (!supabase || !currentUser) return;
  await supabase.from('profiles').update({ name:name, bio:bio, web:web }).eq('id', currentUser.id);
  currentUser.name = name; currentUser.bio = bio; currentUser.web = web;
  document.getElementById('nav-username').textContent = name;
  document.getElementById('nav-avatar').textContent   = name.slice(0,2).toUpperCase();
  var av = document.getElementById('up-av'); if (av) av.textContent = name.slice(0,2).toUpperCase();
  var dn = document.getElementById('up-dname'); if (dn) dn.textContent = name;
  showToast('Perfil guardado');
}

// ── Modal auth ──
function openModal(mode) {
  switchAuthTab(mode || 'login');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(function(){ var el = document.getElementById('auth-email'); if(el) el.focus(); }, 300);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modal-error').classList.remove('show');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function switchAuthTab(mode) {
  authMode = mode;
  var il = mode === 'login';
  document.getElementById('tab-login').classList.toggle('active', il);
  document.getElementById('tab-register').classList.toggle('active', !il);
  document.getElementById('field-name').style.display    = il ? 'none' : 'block';
  document.getElementById('field-confirm').style.display = il ? 'none' : 'block';
  document.getElementById('modal-title').textContent     = il ? 'Bienvenido de vuelta' : 'Creá tu cuenta';
  document.getElementById('modal-sub').innerHTML         = il
    ? 'Ingresá para generar tus códigos QR. <strong>Es gratis.</strong>'
    : 'Registrate gratis y empezá a generar QR al instante.';
  document.getElementById('btn-auth-text').textContent   = il ? 'Iniciar sesión' : 'Crear cuenta gratis';
  document.getElementById('modal-switch-text').innerHTML = il
    ? '¿No tenés cuenta? <a onclick="switchAuthTab(\'register\')">Registrate gratis</a>'
    : '¿Ya tenés cuenta? <a onclick="switchAuthTab(\'login\')">Iniciá sesión</a>';
  document.getElementById('modal-error').classList.remove('show');
}

function handleAuth() {
  var email = document.getElementById('auth-email').value.trim();
  var pass  = document.getElementById('auth-pass').value;
  var btn   = document.getElementById('btn-auth');
  document.getElementById('modal-error').classList.remove('show');
  if (!email || !pass) { showModalError('Completá todos los campos.'); return; }
  if (!email.includes('@')) { showModalError('Ingresá un email válido.'); return; }
  if (pass.length < 6) { showModalError('La contraseña debe tener al menos 6 caracteres.'); return; }
  if (!supabase) { showModalError('Error de conexión. Recargá la página.'); return; }
  btn.classList.add('loading');

  if (authMode === 'register') {
    var name = (document.getElementById('auth-name') || { value: '' }).value.trim();
    supabase.auth.signUp({ email:email, password:pass, options:{ data:{ name:name } } }).then(function(res) {
      btn.classList.remove('loading');
      if (res.error) { showModalError(res.error.message); return; }
      closeModal();
      showToast('Cuenta creada. Bienvenido, ' + name + '!');
      fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, name: name })
      });
    });
  } else {
    supabase.auth.signInWithPassword({ email:email, password:pass }).then(function(res) {
      btn.classList.remove('loading');
      if (res.error) { showModalError('Email o contraseña incorrectos.'); return; }
      closeModal();
      showToast('Bienvenido de vuelta!');
    });
  }
}
function showModalError(msg) {
  var e = document.getElementById('modal-error');
  e.textContent = msg; e.classList.add('show');
  document.getElementById('btn-auth').classList.remove('loading');
}

// ── Tipo de QR ──
function tryGenerate() {
  if (!currentUser) { openModal('login'); showToast('Iniciá sesión para generar QR'); return; }
  generateQR();
}

function setType(type, btn) {
  currentType = type;
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  var ids = ['input-area','wifi-fields','sms-fields','vcard-fields','geo-fields','whatsapp-fields','youtube-fields','instagram-fields','pdf-fields','event-fields','app-fields','social-fields'];
  ids.forEach(function(id){ var e = document.getElementById(id); if (e) e.style.display = 'none'; });
  var cfg = {
    url:   { l:'URL',      s:'ej: https://mi-sitio.com', p:'https://',            t:'url'   },
    text:  { l:'Texto',    s:'cualquier mensaje',         p:'Escribí tu texto...', t:'text'  },
    email: { l:'Email',    s:'dirección de correo',       p:'nombre@ejemplo.com',  t:'email' },
    tel:   { l:'Teléfono', s:'con código de país',        p:'+54 9 11 1234 5678',  t:'tel'   },
  };
  var specials = { wifi:'wifi-fields', sms:'sms-fields', vcard:'vcard-fields', geo:'geo-fields', whatsapp:'whatsapp-fields', youtube:'youtube-fields', instagram:'instagram-fields', pdf:'pdf-fields', event:'event-fields', app:'app-fields', social:'social-fields', landing:'landing-fields' };
  if (specials[type]) {
    var el = document.getElementById(specials[type]); if (el) el.style.display = 'block';
  } else {
    var c = cfg[type] || { l:type, s:'', p:'', t:'text' };
    var area = document.getElementById('input-area');
    if (area) {
      area.style.display = 'block';
      area.innerHTML = '<label for="qr-input">' + c.l + ' <span class="sublabel">' + c.s + '</span></label>'
        + '<input type="' + c.t + '" id="qr-input" placeholder="' + c.p + '" autocomplete="off" oninput="onInputChange()"/>';
    }
  }
  updateCharCount();
}

function onInputChange() { updateCharCount(); }

function updateCharCount() {
  var c = getContent();
  var el = document.getElementById('char-count');
  if (el) el.textContent = (c ? c.length : 0) + ' caracteres';
}

function getContent() {
  if (currentType === 'wifi') {
    var s = document.getElementById('wifi-ssid').value.trim();
    var p = document.getElementById('wifi-pass').value;
    var e = document.getElementById('wifi-sec').value;
    if (!s) return null;
    return 'WIFI:T:' + e + ';S:' + s + ';P:' + p + ';;';
  }
  if (currentType === 'sms') {
    var t = document.getElementById('sms-tel').value.trim();
    var m = document.getElementById('sms-msg').value.trim();
    if (!t) return null;
    return m ? 'smsto:' + t + ':' + m : 'sms:' + t;
  }
  if (currentType === 'vcard') {
    var fn = document.getElementById('vc-name').value.trim();
    var ph = document.getElementById('vc-phone').value.trim();
    var em = document.getElementById('vc-email').value.trim();
    var co = document.getElementById('vc-company').value.trim();
    var we = document.getElementById('vc-web').value.trim();
    if (!fn) return null;
    return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + fn + '\nTEL:' + ph + '\nEMAIL:' + em + '\nORG:' + co + '\nURL:' + we + '\nEND:VCARD';
  }
  if (currentType === 'geo') {
    var lat = document.getElementById('geo-lat').value.trim();
    var lng = document.getElementById('geo-lng').value.trim();
    if (!lat || !lng) return null;
    return 'geo:' + lat + ',' + lng;
  }
  if (currentType === 'whatsapp') {
    var wp = document.getElementById('wa-phone').value.trim().replace(/\D/g,'');
    var wm = document.getElementById('wa-msg').value.trim();
    if (!wp) return null;
    return 'https://wa.me/' + wp + (wm ? '?text=' + encodeURIComponent(wm) : '');
  }
  if (currentType === 'youtube') { var yu = document.getElementById('yt-url').value.trim(); return yu || null; }
  if (currentType === 'instagram') {
    var ig = document.getElementById('ig-user').value.trim();
    if (!ig) return null;
    if (ig.startsWith('http')) return ig;
    return 'https://instagram.com/' + (ig.startsWith('@') ? ig.slice(1) : ig);
  }
  if (currentType === 'pdf') { var pu = document.getElementById('pdf-url').value.trim(); return pu || null; }
  if (currentType === 'event') {
    var evName = (document.getElementById('ev-name')||{value:''}).value.trim();
    var evDate = (document.getElementById('ev-date')||{value:''}).value.trim();
    var evTime = (document.getElementById('ev-time')||{value:''}).value.trim();
    var evLoc  = (document.getElementById('ev-loc') ||{value:''}).value.trim();
    var evDesc = (document.getElementById('ev-desc')||{value:''}).value.trim();
    if (!evName || !evDate) return null;
    var dtStart = evDate.replace(/-/g,'') + (evTime ? 'T' + evTime.replace(':','') + '00' : '');
    return 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:' + evName
      + '\nDTSTART:' + dtStart
      + (evLoc  ? '\nLOCATION:'    + evLoc  : '')
      + (evDesc ? '\nDESCRIPTION:' + evDesc : '')
      + '\nEND:VEVENT\nEND:VCALENDAR';
  }
  if (currentType === 'app') {
    var appIos = (document.getElementById('app-ios')    ||{value:''}).value.trim();
    var appAnd = (document.getElementById('app-android')||{value:''}).value.trim();
    return appIos || appAnd || null;
  }
  if (currentType === 'social') {
    var socFields = [
      { id:'soc-ig', base:'https://instagram.com/' },
      { id:'soc-tw', base:'https://x.com/' },
      { id:'soc-tt', base:'https://tiktok.com/@' },
      { id:'soc-li', base:'' },
      { id:'soc-yt', base:'' },
      { id:'soc-fb', base:'' }
    ];
    var links = [];
    socFields.forEach(function(f) {
      var el2 = document.getElementById(f.id); if (!el2) return;
      var v2 = el2.value.trim(); if (!v2) return;
      if (f.base && !v2.startsWith('http')) v2 = f.base + (v2.startsWith('@') ? v2.slice(1) : v2);
      links.push(v2);
    });
    return links.length ? (links.length === 1 ? links[0] : links.join('\n')) : null;
  }
  var el = document.getElementById('qr-input');
  if (!el) return null;
  var v = el.value.trim();
  if (!v) return null;
  if (currentType === 'email' && !v.startsWith('mailto:')) return 'mailto:' + v;
  if (currentType === 'tel'   && !v.startsWith('tel:'))    return 'tel:'    + v;
  return v;
}

function parseGeoInput() {
  var raw = document.getElementById('geo-input').value.trim();
  if (!raw) return;
  var coordMatch = raw.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    document.getElementById('geo-lat').value = coordMatch[1];
    document.getElementById('geo-lng').value = coordMatch[2];
    updateCharCount(); return;
  }
  var direct = raw.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
  if (direct) {
    document.getElementById('geo-lat').value = direct[1];
    document.getElementById('geo-lng').value = direct[2];
    updateCharCount();
  }
}

// ── Colores ──
function onColorChange() {
  currentDark  = document.getElementById('c-dark').value;
  currentLight = document.getElementById('c-light').value;
  document.getElementById('swatch-dark').style.background  = currentDark;
  document.getElementById('swatch-light').style.background = currentLight;
  document.getElementById('hex-dark').textContent  = currentDark;
  document.getElementById('hex-light').textContent = currentLight;
  var warn = document.getElementById('color-warning');
  if (warn) warn.classList.toggle('show', colorSimilar(currentDark, currentLight));
}

function hexToRgb(hex) {
  return { r:parseInt(hex.slice(1,3),16), g:parseInt(hex.slice(3,5),16), b:parseInt(hex.slice(5,7),16) };
}

function colorSimilar(h1, h2) {
  var a = hexToRgb(h1), b = hexToRgb(h2);
  return Math.abs(a.r-b.r) + Math.abs(a.g-b.g) + Math.abs(a.b-b.b) < 120;
}

// ── Generar QR ──
function generateQR() {
  if (currentType === 'app' || currentType === 'social' || currentType === 'landing') {
    if (!currentUser || currentUser.plan !== 'premium') {
      showToast('Necesitás Premium para usar esta función ⭐'); return;
    }
    generateQRDynamic(); return;
  }
  var content = getContent();
  if (!content) { showToast('Completá el contenido primero'); return; }
  currentDark  = document.getElementById('c-dark').value;
  currentLight = document.getElementById('c-light').value;
  var btn = document.getElementById('gen-btn');
  btn.classList.add('loading');
  var bar = document.getElementById('progress-bar');
  bar.style.width = '0%';
  setTimeout(function(){ bar.style.width = '60%'; }, 50);
  setTimeout(function(){
    try {
      var size    = parseInt(document.getElementById('qr-size').value);
      var ecMap   = { L:QRCode.CorrectLevel.L, M:QRCode.CorrectLevel.M, Q:QRCode.CorrectLevel.Q, H:QRCode.CorrectLevel.H };
      var ecLevel = ecMap[document.getElementById('qr-ec').value];
      if (currentShape !== 'square') ecLevel = QRCode.CorrectLevel.H;
      var output  = document.getElementById('qr-output');
      output.innerHTML = '';
      new QRCode(output, { text:content, width:size, height:size, colorDark:currentDark, colorLight:currentLight, correctLevel:ecLevel });
      setTimeout(function(){
        bar.style.width = '100%';
        setTimeout(function(){ bar.style.width = '0%'; }, 500);
        btn.classList.remove('loading');
        ['btn-copy','btn-dl','btn-share','btn-print','btn-svg'].forEach(function(id){
          var e = document.getElementById(id); if (e) e.disabled = false;
        });
        var st = document.getElementById('qr-status');
        st.textContent = 'Listo ✓'; st.style.color = 'var(--accent)';
        var label = content.length > 38 ? content.slice(0,38) + '...' : content;
        document.getElementById('qr-info-text').textContent = label;
        document.getElementById('qr-info-meta').textContent = size + ' × ' + size + ' px';
        document.getElementById('qr-info').style.display = 'block';
        applyShapeToCanvas();
        applyLogoToCanvas();
        applyFrameToCanvas();
        showToast('QR generado correctamente');
      }, 150);
    } catch(e) {
      btn.classList.remove('loading');
      bar.style.width = '0%';
      document.getElementById('qr-output').innerHTML = '<p style="color:var(--danger);font-size:.82rem;text-align:center;padding:1rem">Error al generar el QR.</p>';
      showToast('Error al generar');
    }
  }, 250);
}

function stripHtml(str) {
  return str ? String(str).replace(/<[^>]*>/g, '').slice(0, 100) : '';
}

function validateUrl(url) {
  if (!url) return null;
  var u = url.trim().slice(0, 500);
  return (u.startsWith('https://') || u.startsWith('http://')) ? u : null;
}

async function generateQRDynamic() {
  if (!supabase) { showToast('Error de conexión'); return; }

  // Server-side premium verification — never trust local plan state
  var sessionRes = await supabase.auth.getSession();
  var jwt = sessionRes?.data?.session?.access_token;
  if (!jwt) { openModal('login'); return; }

  var verifyRes;
  try {
    verifyRes = await fetch('/api/verify-premium', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + jwt }
    });
  } catch (e) {
    showToast('Error de conexión al verificar el plan'); return;
  }
  var verifyData = await verifyRes.json();
  if (!verifyData.premium) {
    showToast('Necesitás Premium para usar esta función ⭐');
    document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  var code = generateShortCode();
  var content;

  if (currentType === 'landing') {
    var lpTitle   = stripHtml((document.getElementById('lp-title')    || {value:''}).value);
    var lpDesc    = stripHtml((document.getElementById('lp-desc')     || {value:''}).value);
    var lpBtnText = stripHtml((document.getElementById('lp-btn-text') || {value:''}).value);
    var lpBtnUrl  = validateUrl((document.getElementById('lp-btn-url') || {value:''}).value);
    var lpBg      = (document.getElementById('lp-bg')     || {value:'#ffffff'}).value;
    var lpAccent  = (document.getElementById('lp-accent') || {value:'#1d6b4a'}).value;
    if (!lpTitle) { showToast('Ingresá un título para la Landing Page'); return; }
    var res = await supabase.from('landing_pages').insert({ code, user_id: currentUser.id, title: lpTitle, description: lpDesc, button_text: lpBtnText || 'Ver más', button_url: lpBtnUrl || '', bg_color: lpBg, accent_color: lpAccent });
    if (res.error) { showToast('Error al guardar la Landing Page'); return; }
    content = 'https://lucky-qr.com/landing/' + code;
  } else if (currentType === 'app') {
    var iosUrl  = validateUrl((document.getElementById('app-ios')     || {value:''}).value);
    var andUrl  = validateUrl((document.getElementById('app-android') || {value:''}).value);
    var appName = stripHtml((document.getElementById('app-name')      || {value:''}).value);
    if (!iosUrl && !andUrl) { showToast('Completá al menos una URL válida de la app (https://)'); return; }
    var res = await supabase.from('app_qrs').insert({ code, user_id: currentUser.id, ios_url: iosUrl, android_url: andUrl, name: appName });
    if (res.error) { showToast('Error al guardar el QR de app'); return; }
    content = 'https://lucky-qr.com/app/' + code;
  } else {
    var title = stripHtml((document.getElementById('soc-title') || {value:''}).value);
    var ig    = (document.getElementById('soc-ig') || {value:''}).value.trim().slice(0, 500);
    var tw    = (document.getElementById('soc-tw') || {value:''}).value.trim().slice(0, 500);
    var tt    = (document.getElementById('soc-tt') || {value:''}).value.trim().slice(0, 500);
    var li    = (document.getElementById('soc-li') || {value:''}).value.trim().slice(0, 500);
    var yt    = (document.getElementById('soc-yt') || {value:''}).value.trim().slice(0, 500);
    var fb    = (document.getElementById('soc-fb') || {value:''}).value.trim().slice(0, 500);
    if (!ig && !tw && !tt && !li && !yt && !fb) { showToast('Completá al menos una red social'); return; }
    if (ig && !ig.startsWith('http')) ig = 'https://instagram.com/' + ig.replace('@', '');
    if (tw && !tw.startsWith('http')) tw = 'https://x.com/' + tw.replace('@', '');
    if (tt && !tt.startsWith('http')) tt = 'https://tiktok.com/@' + tt.replace('@', '');
    ig = validateUrl(ig) || ''; tw = validateUrl(tw) || ''; tt = validateUrl(tt) || '';
    li = validateUrl(li) || ''; yt = validateUrl(yt) || ''; fb = validateUrl(fb) || '';
    var res = await supabase.from('social_qrs').insert({ code, user_id: currentUser.id, title, instagram: ig, twitter: tw, tiktok: tt, linkedin: li, youtube: yt, facebook: fb });
    if (res.error) { showToast('Error al guardar el QR social'); return; }
    content = 'https://lucky-qr.com/social/' + code;
  }

  currentDark  = document.getElementById('c-dark').value;
  currentLight = document.getElementById('c-light').value;
  var btn = document.getElementById('gen-btn');
  btn.classList.add('loading');
  var bar = document.getElementById('progress-bar');
  bar.style.width = '60%';
  try {
    var size   = parseInt(document.getElementById('qr-size').value);
    var output = document.getElementById('qr-output');
    output.innerHTML = '';
    new QRCode(output, { text: content, width: size, height: size, colorDark: currentDark, colorLight: currentLight, correctLevel: QRCode.CorrectLevel.H });
    setTimeout(function() {
      bar.style.width = '100%';
      setTimeout(function() { bar.style.width = '0%'; }, 500);
      btn.classList.remove('loading');
      ['btn-copy','btn-dl','btn-share','btn-print','btn-svg'].forEach(function(id) {
        var e = document.getElementById(id); if (e) e.disabled = false;
      });
      var st = document.getElementById('qr-status');
      st.textContent = 'Listo ✓'; st.style.color = 'var(--accent)';
      document.getElementById('qr-info-text').textContent = content;
      document.getElementById('qr-info-meta').textContent = size + ' × ' + size + ' px · Premium';
      document.getElementById('qr-info').style.display = 'block';
      applyShapeToCanvas();
      applyLogoToCanvas();
      applyFrameToCanvas();
      showToast('QR Premium creado');
    }, 150);
  } catch(e) {
    btn.classList.remove('loading');
    bar.style.width = '0%';
    document.getElementById('qr-output').innerHTML = '<p style="color:var(--danger);font-size:.82rem;text-align:center;padding:1rem">Error al generar el QR.</p>';
    showToast('Error al generar');
  }
}

// ── Descargas ──
function downloadQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var a = document.createElement('a');
  a.download = 'lucky-qr-' + currentType + '.png';
  a.href = c.toDataURL('image/png');
  a.click();
  showToast('Descargando PNG...');
}

function downloadSVG() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var sz = c.width;
  var img = c.toDataURL('image/png');
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + sz + '" height="' + sz + '"><image href="' + img + '" width="' + sz + '" height="' + sz + '"/></svg>';
  var blob = new Blob([svg], {type:'image/svg+xml'});
  var a = document.createElement('a');
  a.download = 'lucky-qr.svg'; a.href = URL.createObjectURL(blob); a.click();
  showToast('Descargando SVG...');
}

function copyQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  try {
    c.toBlob(function(blob){
      navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){
        showToast('Copiado al portapapeles');
      });
    });
  } catch(e) { showToast('Tu navegador no soporta esta función'); }
}

function shareQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c || !navigator.share) { showToast('Compartir no disponible'); return; }
  c.toBlob(function(blob){
    var file = new File([blob], 'lucky-qr.png', {type:'image/png'});
    navigator.share({files:[file], title:'Mi código QR — Lucky QR'}).catch(function(){});
  });
}

function printQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var img = c.toDataURL('image/png');
  var info = document.getElementById('qr-info-text').textContent;
  var win = window.open('','_blank');
  win.document.write('<html><head><title>Lucky QR</title><style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;gap:1rem}img{max-width:280px;border:1px solid #eee;border-radius:8px;padding:12px}p{font-size:11px;color:#666;text-align:center;max-width:280px;word-break:break-all}small{font-size:10px;color:#aaa}</style></head><body><img src="' + img + '"/><p>' + info + '</p><small>lucky-qr.com</small><script>window.onload=function(){window.print();window.close()}<\/script></body></html>');
  win.document.close();
}

// ── Premium ──
function checkPremiumStatus() {
  if (!currentUser) return;
  if (currentUser.plan === 'premium') {
    var locked = document.getElementById('premium-locked');
    var panel  = document.getElementById('premium-panel');
    var badge  = document.getElementById('plan-badge');
    if (locked) locked.style.display = 'none';
    if (panel)  panel.style.display  = 'block';
    if (badge)  badge.textContent    = '⭐ Plan Premium';
    loadDynamicQRs();
    loadScansChart();
    loadFolders();
    loadApiKeys();
    var logoField = document.getElementById('logo-field');
    if (logoField) logoField.style.display = 'block';
  }
}

// ── QR Dinámicos ──
function generateShortCode() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var code  = '';
  for (var i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function createDynamicQR() {
  if (!currentUser) { openModal('login'); return; }
  if (currentUser.plan !== 'premium') { showToast('Necesitás Premium para crear QR dinámicos ⭐'); return; }
  if (!supabase) { showToast('Error de conexión'); return; }
  var name = document.getElementById('dqr-name').value.trim();
  var url  = document.getElementById('dqr-url').value.trim();
  if (!name) { showToast('Ingresá un nombre para el QR'); return; }
  if (!url)  { showToast('Ingresá una URL destino'); return; }
  if (!url.startsWith('http')) { showToast('La URL debe empezar con https://'); return; }
  var code = generateShortCode();
  var pwEnabled = document.getElementById('dqr-pw-enabled') && document.getElementById('dqr-pw-enabled').checked;
  var pw        = pwEnabled ? ((document.getElementById('dqr-pw') || {value:''}).value.trim()) : '';
  var folderId  = (document.getElementById('dqr-folder') || {value:''}).value || null;
  var insertData = { user_id: currentUser.id, short_code: code, destination_url: url, name: name };
  if (pwEnabled && pw) { insertData.password_enabled = true; insertData.password = pw; }
  if (folderId) insertData.folder_id = folderId;
  var res = await supabase.from('dynamic_qrs').insert(insertData);
  if (res.error) { showToast('Error al crear QR'); return; }
  document.getElementById('dqr-name').value = '';
  document.getElementById('dqr-url').value  = '';
  if (document.getElementById('dqr-pw-enabled')) document.getElementById('dqr-pw-enabled').checked = false;
  if (document.getElementById('dqr-pw-field')) document.getElementById('dqr-pw-field').style.display = 'none';
  if (document.getElementById('dqr-pw')) document.getElementById('dqr-pw').value = '';
  showToast('QR dinámico creado' + (pwEnabled && pw ? ' 🔒 con contraseña' : ''));
  loadDynamicQRs();
}

async function loadDynamicQRs() {
  if (!currentUser || !supabase) return;
  var res = await supabase
    .from('dynamic_qrs')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });
  if (res.error) { showToast('Error al cargar QR'); return; }
  var list  = document.getElementById('dqr-list');
  var count = document.getElementById('dqr-count');
  var qrs   = res.data || [];
  if (count) count.textContent = qrs.length + ' QR';
  if (!list) return;
  if (qrs.length === 0) {
    list.innerHTML = '<p style="font-size:.82rem;color:var(--muted2);text-align:center;padding:1rem 0">Todavía no creaste ningún QR dinámico.</p>';
    return;
  }
  var qrIds = qrs.map(function(q){ return q.id; });
  var scanRes = await supabase.from('qr_scans').select('qr_id').in('qr_id', qrIds);
  var scanData = scanRes.data || [];
  var scanCount = {};
  scanData.forEach(function(s){
    scanCount[s.qr_id] = (scanCount[s.qr_id] || 0) + 1;
  });
  var folderFilter = document.getElementById('dqr-folder-filter');
  if (folderFilter) {
    var folderRes2 = await supabase.from('folders').select('id,name,color').eq('user_id', currentUser.id).order('name');
    var foldersArr = (folderRes2.data || []);
    var chips = '<button class="folder-chip active" data-folder="" onclick="setFolderFilter(\'\',this)" style="background:var(--bg2);color:var(--muted);border-color:var(--border)">Todos</button>';
    foldersArr.forEach(function(f){
      chips += '<button class="folder-chip" data-folder="' + f.id + '" onclick="setFolderFilter(\'' + f.id + '\',this)" style="background:' + f.color + '22;color:' + f.color + ';border-color:' + f.color + '">' + f.name + '</button>';
    });
    folderFilter.innerHTML = chips;
  }

  var activeFolder = window.__activeFolder || '';
  var displayQrs = activeFolder ? qrs.filter(function(q){ return q.folder_id === activeFolder; }) : qrs;

  list.innerHTML = displayQrs.map(function(qr){
    var link  = 'https://lucky-qr.com/r/' + qr.short_code;
    var scans = scanCount[qr.id] || 0;
    var pwBadge = qr.password_enabled ? ' 🔒' : '';
    return '<div class="dqr-item">'
      + '<div class="dqr-item-head"><span class="dqr-item-name">' + qr.name + pwBadge + '</span><span class="dqr-item-code">' + qr.short_code + '</span></div>'
      + '<div class="dqr-item-url">' + qr.destination_url + '</div>'
      + '<div style="font-size:.72rem;color:var(--accent);font-weight:500;margin-bottom:.6rem">📊 ' + scans + ' escaneo' + (scans !== 1 ? 's' : '') + '</div>'
      + '<div class="dqr-item-actions">'
      + '<button class="btn-dqr-action" onclick="copyText(\'' + link + '\')">Copiar link</button>'
      + '<button class="btn-dqr-action" onclick="openEditModal(\'' + qr.id + '\',\'' + qr.destination_url.replace(/'/g,"\\'") + '\')">Editar URL</button>'
      + '<button class="btn-dqr-action" onclick="generateDynamicQRCode(\'' + link + '\')">Ver QR</button>'
      + '<button class="btn-dqr-action danger" onclick="deleteDynamicQR(\'' + qr.id + '\')">Borrar</button>'
      + '</div></div>';
  }).join('') || '<p style="font-size:.82rem;color:var(--muted2);text-align:center;padding:1rem 0">Ningún QR en esta carpeta.</p>';
}
async function deleteDynamicQR(id) {
  if (!supabase) return;
  if (!confirm('¿Seguro que querés borrar este QR?')) return;
  await supabase.from('dynamic_qrs').delete().eq('id', id);
  showToast('QR eliminado');
  loadDynamicQRs();
}

function openEditModal(id, url) {
  document.getElementById('edit-qr-id').value  = id;
  document.getElementById('edit-qr-url').value = url;
  document.getElementById('edit-modal').classList.add('open');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('open');
}

async function saveEditedURL() {
  var id  = document.getElementById('edit-qr-id').value;
  var url = document.getElementById('edit-qr-url').value.trim();
  if (!url) { showToast('Ingresá una URL válida'); return; }
  if (!supabase) return;
  await supabase.from('dynamic_qrs').update({ destination_url:url, updated_at:new Date().toISOString() }).eq('id', id);
  closeEditModal();
  showToast('URL actualizada — el QR ya redirige al nuevo destino');
  loadDynamicQRs();
}

function generateDynamicQRCode(url) {
  var output = document.getElementById('qr-output');
  output.innerHTML = '';
  new QRCode(output, { text:url, width:256, height:256, colorDark:currentDark, colorLight:currentLight, correctLevel:QRCode.CorrectLevel.H });
  document.getElementById('qr-info-text').textContent = url;
  document.getElementById('qr-info-meta').textContent = 'QR Dinámico · 256 × 256 px';
  document.getElementById('qr-info').style.display = 'block';
  var st = document.getElementById('qr-status');
  st.textContent = 'Listo ✓'; st.style.color = 'var(--accent)';
  ['btn-copy','btn-dl','btn-share','btn-print','btn-svg'].forEach(function(id){
    var e = document.getElementById(id); if (e) e.disabled = false;
  });
  window.scrollTo({ top: document.getElementById('generator').offsetTop - 80, behavior:'smooth' });
  showToast('QR dinámico generado');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(function(){ showToast('Link copiado al portapapeles'); });
}

// ── Reseñas ──
async function loadReviewsSection() {
  var list = document.getElementById('reviews-public-list');
  if (!list || !supabase) return;
  var res = await supabase.from('reviews').select('*').order('created_at', { ascending:false }).limit(6);
  var revs = res.data || [];
  var count = document.getElementById('reviews-count');
  if (count) count.textContent = revs.length;
  if (revs.length === 0) {
    list.innerHTML = '<p style="font-size:.82rem;color:var(--muted2);text-align:center;padding:1.5rem 0">Todavía no hay reseñas. ¡Sé el primero!</p>';
    return;
  }
  var avg = revs.reduce(function(a,r){ return a+r.stars; },0) / revs.length;
  var avgEl = document.getElementById('reviews-avg');
  if (avgEl) avgEl.textContent = avg.toFixed(1);
  list.innerHTML = revs.map(function(r){
    var stars = '';
    for (var i=0;i<5;i++) stars += (i<r.stars?'★':'☆');
    return '<div class="rev-card"><div class="rev-head">'
      + '<div class="rev-av">' + r.name.slice(0,2).toUpperCase() + '</div>'
      + '<div><div class="rev-name">' + r.name + '</div><div class="rev-date">' + new Date(r.created_at).toLocaleDateString('es-AR') + '</div></div>'
      + '<div class="rev-stars">' + stars + '</div></div>'
      + '<div class="rev-text">' + r.text + '</div></div>';
  }).join('');
}

function toggleWriteReview() {
  if (!currentUser) { openModal('login'); showToast('Iniciá sesión para dejar una reseña'); return; }
  var form = document.getElementById('write-review-form');
  if (form) form.classList.toggle('open');
}

function setStar(n) {
  currentStar = n;
  document.querySelectorAll('.star-btn').forEach(function(s,i){ s.classList.toggle('on', i < n); });
}

async function sendReview() {
  if (!currentUser) { openModal('login'); return; }
  if (currentStar === 0) { showToast('Elegí una puntuación'); return; }
  var text = document.getElementById('review-text-input').value.trim();
  if (!text) { showToast('Escribí tu reseña'); return; }
  if (!supabase) return;
  var res = await supabase.from('reviews').insert({ user_id:currentUser.id, name:currentUser.name, email:currentUser.email, stars:currentStar, text:text });
  if (res.error) { showToast('Error al enviar reseña'); return; }
  document.getElementById('review-text-input').value = '';
  currentStar = 0;
  document.querySelectorAll('.star-btn').forEach(function(s){ s.classList.remove('on'); });
  document.getElementById('write-review-form').classList.remove('open');
  loadReviewsSection();
  showToast('Reseña enviada. ¡Gracias!');
}
async function upgradeToPremium() {
  if (!currentUser) { openModal('login'); return; }
  showToast('Redirigiendo al pago...');
  try {
    var sessionRes = await supabase.auth.getSession();
    var jwt = sessionRes?.data?.session?.access_token;
    if (!jwt) { openModal('login'); return; }
    var res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt },
      body: JSON.stringify({ email: currentUser.email })
    });
    var data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      showToast('Error al iniciar el pago');
    }
  } catch(e) {
    showToast('Error de conexión');
  }
}
async function resetPassword() {
  var email = document.getElementById('auth-email').value.trim();
  if (!email) { showModalError('Ingresá tu email primero.'); return; }
  if (!supabase) return;
  var res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://lucky-qr.com'
  });
  if (res.error) { showModalError('Error al enviar email.'); return; }
  closeModal();
  showToast('Te enviamos un email para recuperar tu contraseña');
}

async function cancelPremium() {
  if (!currentUser || !supabase) return;
  if (!confirm('¿Seguro que querés cancelar el plan Premium? Seguirá activo hasta fin del período.')) return;
  var res = await fetch('/api/cancel-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId: currentUser.stripe_customer_id })
  });
  var data = await res.json();
  if (data.success) {
    showToast('Suscripción cancelada — seguirá activa hasta fin del período');
  } else {
    showToast('Error al cancelar: ' + data.error);
  }
}

function closeResetModal() {
  document.getElementById('reset-modal').classList.remove('open');
}

async function confirmResetPassword() {
  var pass    = document.getElementById('reset-pass').value;
  var confirm = document.getElementById('reset-pass-confirm').value;
  var errEl   = document.getElementById('reset-error');
  errEl.classList.remove('show');
  if (pass.length < 6) { errEl.textContent = 'La contraseña debe tener al menos 6 caracteres.'; errEl.classList.add('show'); return; }
  if (pass !== confirm) { errEl.textContent = 'Las contraseñas no coinciden.'; errEl.classList.add('show'); return; }
  var res = await supabase.auth.updateUser({ password: pass });
  if (res.error) { errEl.textContent = 'Error: ' + res.error.message; errEl.classList.add('show'); return; }
  closeResetModal();
  showToast('Contraseña actualizada. Ya podés iniciar sesión.');
  supabase.auth.signOut();
  showLoggedOut();
}

// ── Reset password handler ──
window.addEventListener('load', function() {
  setTimeout(function() {
    if (!supabase) return;
    supabase.auth.onAuthStateChange(function(event, session) {
      if (event === 'PASSWORD_RECOVERY') {
        document.getElementById('reset-modal').classList.add('open');
      }
    });
  }, 1500);
});
// ── FAQ ──
// ── Gráfico de escaneos (estadísticas detalladas) ──
var scansChart = null;

function statBar(label, count, total) {
  var pct = total ? Math.round(count / total * 100) : 0;
  return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:.75rem;padding:3px 0">'
    + '<span style="color:var(--muted)">' + label + '</span>'
    + '<span style="color:var(--accent);font-weight:500">' + count + ' <span style="color:var(--muted2);font-weight:400">(' + pct + '%)</span></span>'
    + '</div>';
}

async function loadScansChart() {
  if (!currentUser || !supabase) return;
  var qrRes = await supabase.from('dynamic_qrs').select('id').eq('user_id', currentUser.id);
  if (!qrRes.data || qrRes.data.length === 0) return;
  var qrIds = qrRes.data.map(function(q){ return q.id; });
  var desde = new Date();
  desde.setDate(desde.getDate() - 6);
  desde.setHours(0, 0, 0, 0);
  var scanRes = await supabase.from('qr_scans')
    .select('scanned_at,device,country,city,os,hour')
    .in('qr_id', qrIds)
    .gte('scanned_at', desde.toISOString());
  var scans = scanRes.data || [];

  // Totales
  var totalEl = document.getElementById('total-scans');
  if (totalEl) totalEl.textContent = scans.length;

  var today = new Date().toISOString().slice(0, 10);
  var todayCount = scans.filter(function(s){ return s.scanned_at && s.scanned_at.slice(0, 10) === today; }).length;
  var todayEl = document.getElementById('stats-today');
  if (todayEl) todayEl.textContent = todayCount;

  // Hora pico
  var hourCount = {};
  scans.forEach(function(s){ if (s.hour != null) hourCount[s.hour] = (hourCount[s.hour] || 0) + 1; });
  var peakHour = null, peakHourMax = 0;
  Object.keys(hourCount).forEach(function(h){ if (hourCount[h] > peakHourMax) { peakHourMax = hourCount[h]; peakHour = h; } });
  var peakEl = document.getElementById('stats-peak-hour');
  if (peakEl) peakEl.textContent = peakHour !== null ? peakHour + ':00h' : '—';

  // Gráfico por día
  var days = [], counts = [];
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('es-AR', { weekday:'short', day:'numeric' }));
    var dayStr = d.toISOString().slice(0, 10);
    counts.push(scans.filter(function(s){ return s.scanned_at && s.scanned_at.slice(0, 10) === dayStr; }).length);
  }
  var ctx = document.getElementById('scans-chart');
  if (ctx) {
    if (scansChart) scansChart.destroy();
    scansChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{ label:'Escaneos', data: counts, backgroundColor:'rgba(29,107,74,.2)', borderColor:'#1d6b4a', borderWidth:2, borderRadius:6 }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, font:{ size:10 } }, grid: { color:'#e8e4de' } },
          x: { ticks: { font:{ size:10 } }, grid: { display:false } }
        }
      }
    });
  }

  var total = scans.length || 1;

  // Dispositivos
  var devEl = document.getElementById('stats-devices');
  if (devEl) {
    var mob = scans.filter(function(s){ return s.device === 'mobile'; }).length;
    var dsk = scans.filter(function(s){ return s.device === 'desktop'; }).length;
    devEl.innerHTML = statBar('📱 Móvil', mob, total) + statBar('🖥 Desktop', dsk, total);
  }

  // OS
  var osEl = document.getElementById('stats-os');
  if (osEl) {
    var osCnt = {};
    scans.forEach(function(s){ if (s.os) osCnt[s.os] = (osCnt[s.os] || 0) + 1; });
    var osArr = Object.entries(osCnt).sort(function(a, b){ return b[1] - a[1]; }).slice(0, 4);
    osEl.innerHTML = osArr.map(function(o){ return statBar(o[0], o[1], total); }).join('') || '<span style="font-size:.73rem;color:var(--muted2)">Sin datos aún</span>';
  }

  // Países
  var cntEl = document.getElementById('stats-countries');
  if (cntEl) {
    var cntCnt = {};
    scans.forEach(function(s){ if (s.country) cntCnt[s.country] = (cntCnt[s.country] || 0) + 1; });
    var cntArr = Object.entries(cntCnt).sort(function(a, b){ return b[1] - a[1]; }).slice(0, 3);
    cntEl.innerHTML = cntArr.map(function(c){ return statBar(c[0], c[1], total); }).join('') || '<span style="font-size:.73rem;color:var(--muted2)">Sin datos aún</span>';
  }

  // Ciudades
  var citEl = document.getElementById('stats-cities');
  if (citEl) {
    var citCnt = {};
    scans.forEach(function(s){ if (s.city) citCnt[s.city] = (citCnt[s.city] || 0) + 1; });
    var citArr = Object.entries(citCnt).sort(function(a, b){ return b[1] - a[1]; }).slice(0, 3);
    citEl.innerHTML = citArr.map(function(c){ return statBar(c[0], c[1], total); }).join('') || '<span style="font-size:.73rem;color:var(--muted2)">Sin datos aún</span>';
  }
}
// ── Export CSV ──
async function exportScansCSV() {
  if (!currentUser || !supabase) return;
  var qrRes = await supabase.from('dynamic_qrs').select('id, name, short_code').eq('user_id', currentUser.id);
  if (!qrRes.data || qrRes.data.length === 0) { showToast('No tenés QR dinámicos'); return; }
  var qrIds = qrRes.data.map(function(q){ return q.id; });
  var qrMap = {};
  qrRes.data.forEach(function(q){ qrMap[q.id] = q.name + ' (' + q.short_code + ')'; });
  var scanRes = await supabase.from('qr_scans').select('*').in('qr_id', qrIds).order('scanned_at', { ascending: false });
  var scans = scanRes.data || [];
  if (scans.length === 0) { showToast('Todavía no hay escaneos'); return; }
  var csv = 'QR,Código,Fecha,Dispositivo,País\n';
  scans.forEach(function(s){
    var fecha = new Date(s.scanned_at).toLocaleString('es-AR');
    csv += '"' + (qrMap[s.qr_id] || s.qr_id) + '","' + fecha + '","' + (s.device||'') + '","' + (s.country||'') + '"\n';
  });
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lucky-qr-escaneos.csv';
  a.click();
  showToast('CSV descargado');
}
// ── Logo en QR ──
var logoDataUrl = null;

function onLogoChange() {
  var file = document.getElementById('qr-logo').files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    logoDataUrl = e.target.result;
    var preview = document.getElementById('logo-preview');
    preview.src = logoDataUrl;
    preview.style.display = 'block';
    document.getElementById('btn-remove-logo').style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  logoDataUrl = null;
  document.getElementById('qr-logo').value = '';
  document.getElementById('logo-preview').style.display = 'none';
  document.getElementById('btn-remove-logo').style.display = 'none';
}

function applyLogoToCanvas() {
  if (!logoDataUrl) return;
  var canvas = document.querySelector('#qr-output canvas');
  if (!canvas) return;
  var ctx  = canvas.getContext('2d');
  var size = canvas.width;
  var logo = new Image();
  logo.onload = function() {
    var logoSize = size * 0.22;
    var x = (size - logoSize) / 2;
    var y = (size - logoSize) / 2;
    // fondo blanco redondeado
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(x - 6, y - 6, logoSize + 12, logoSize + 12, 8);
    ctx.fill();
    // logo
    ctx.drawImage(logo, x, y, logoSize, logoSize);
  };
  logo.src = logoDataUrl;
}
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  item.classList.toggle('open');
}
// ── Cookie Consent ──
function initCookieBanner() {
  if (!localStorage.getItem('cookie_consent')) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
}

function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  document.getElementById('cookie-banner').style.display = 'none';
}

function declineCookies() {
  localStorage.setItem('cookie_consent', 'declined');
  document.getElementById('cookie-banner').style.display = 'none';
}

window.addEventListener('load', function() {
  setTimeout(initCookieBanner, 1000);
});
// ── Collapsible sections ──
function toggleCfgSec(btn) {
  btn.classList.toggle('open');
  var body = btn.nextElementSibling;
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

// ── Shape / Frame / Gradient controls ──
function setShape(shape, btn) {
  currentShape = shape;
  document.querySelectorAll('.shape-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function setFrame(frame, btn) {
  currentFrame = frame;
  document.querySelectorAll('.frame-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function onGradientChange() {
  currentGradient = document.getElementById('use-gradient').checked;
  var s = document.getElementById('grad-swatch');
  if (s) s.style.display = currentGradient ? 'block' : 'none';
}

function onGradientColorChange() {
  currentGradientColor = document.getElementById('c-grad').value;
  var bg = document.getElementById('grad-swatch-bg');
  if (bg) bg.style.background = currentGradientColor;
}

// ── Shape rendering ──
function roundedRectPath(ctx, x, y, w, h, r) {
  if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}


// Scan rows at 10%-20% of height and return the minimum pixel run length found.
// At those rows we're inside the finder pattern rows but individual module
// boundaries (e.g. the light inner ring) create runs exactly 1 module wide —
// so the minimum run correctly equals the module pixel size.
function detectModuleSize(data, w, h) {
  var minRun = w + 1;
  var yStart = Math.floor(h * 0.10);
  var yEnd   = Math.floor(h * 0.20);
  for (var py = yStart; py <= yEnd; py++) {
    var runLen = 0, prevDark = null;
    for (var x = 0; x < w; x++) {
      var idx = (py * w + x) * 4;
      var isDark = data[idx] + data[idx+1] + data[idx+2] < 384;
      if (prevDark === null) { prevDark = isDark; runLen = 1; continue; }
      if (isDark === prevDark) {
        runLen++;
      } else {
        if (runLen < minRun) minRun = runLen;
        prevDark = isDark; runLen = 1;
      }
    }
    if (runLen > 0 && runLen < minRun) minRun = runLen;
  }
  return minRun > w ? 0 : minRun;
}

function applyShapeToCanvas() {
  // square with no gradient: nothing to post-process
  if (currentShape === 'square' && !currentGradient) return;
  var canvas = document.querySelector('#qr-output canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var imageData = ctx.getImageData(0, 0, w, w);
  var data = imageData.data;

  // detect module size by finding minimum pixel run in 10-20% rows
  var moduleSize = detectModuleSize(data, w, w);

  // validate; fall back to a reasonable estimate if detection failed
  if (moduleSize < 4 || moduleSize > 30) {
    moduleSize = Math.round(w / 33);
  }
  if (moduleSize < 2) return;

  // find the left edge of the QR (first dark pixel in a middle row)
  var midY = Math.floor(w * 0.5);
  var margin = 0;
  while (margin < w && data[(midY * w + margin) * 4] + data[(midY * w + margin) * 4 + 1] + data[(midY * w + margin) * 4 + 2] >= 384) margin++;
  // snap margin to nearest module boundary
  margin = Math.round(margin / moduleSize) * moduleSize;

  var N = Math.round((w - margin * 2) / moduleSize);
  if (N < 10 || N > 200) return; // sanity check

  // build boolean module grid by sampling the centre of each cell
  var grid = [];
  for (var row = 0; row < N; row++) {
    grid[row] = [];
    for (var col = 0; col < N; col++) {
      var px = Math.min(w - 1, Math.floor(margin + col * moduleSize + moduleSize / 2));
      var py = Math.min(w - 1, Math.floor(margin + row * moduleSize + moduleSize / 2));
      var idx2 = (py * w + px) * 4;
      grid[row][col] = data[idx2] + data[idx2+1] + data[idx2+2] < 384;
    }
  }

  // clear canvas with background colour
  ctx.fillStyle = currentLight;
  ctx.fillRect(0, 0, w, w);

  // fill style: gradient or solid
  var fStyle;
  if (currentGradient) {
    var grad = ctx.createLinearGradient(0, 0, 0, w);
    grad.addColorStop(0, currentDark);
    grad.addColorStop(1, currentGradientColor);
    fStyle = grad;
  } else {
    fStyle = currentDark;
  }
  ctx.fillStyle = fStyle;

  // finder pattern + separator zones — always drawn as squares
  function isFinder(r, c) {
    if (r <= 8 && c <= 8) return true;           // top-left
    if (r <= 8 && c >= N - 8) return true;       // top-right
    if (r >= N - 8 && c <= 8) return true;       // bottom-left
    return false;
  }

  for (var row = 0; row < N; row++) {
    for (var col = 0; col < N; col++) {
      if (!grid[row][col]) continue;
      var bx = margin + col * moduleSize;
      var by = margin + row * moduleSize;
      var s  = moduleSize;

      if (isFinder(row, col) || currentShape === 'square') {
        ctx.fillRect(bx, by, s, s);
        continue;
      }

      ctx.beginPath();
      if (currentShape === 'rounded') {
        roundedRectPath(ctx, bx, by, s, s, s * 0.25);
      } else if (currentShape === 'dots') {
        ctx.arc(bx + s / 2, by + s / 2, s * 0.45, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }
}

// ── Frame rendering ──
function applyFrameToCanvas() {
  if (currentFrame === 'none') return;
  var original = document.querySelector('#qr-output canvas');
  if (!original) return;
  var labelMap = { scanme:'SCAN ME', escaneame:'Escaneame', leeme:'¡Leeme!', simple:'' };
  var text = labelMap[currentFrame] !== undefined ? labelMap[currentFrame] : '';
  var qw = original.width, qh = original.height;
  var border = Math.max(8, Math.round(qw * 0.035));
  var pad    = Math.max(12, Math.round(qw * 0.05));
  var fontSize = text ? Math.round(qw * 0.075) : 0;
  var textArea = fontSize ? fontSize + pad : 0;
  var tw = qw + (pad + border) * 2;
  var th = qh + (pad + border) * 2 + textArea;
  var nc = document.createElement('canvas');
  nc.width = tw; nc.height = th;
  var ctx = nc.getContext('2d');
  // background
  ctx.fillStyle = currentLight;
  ctx.fillRect(0, 0, tw, th);
  // border box around QR area only
  ctx.strokeStyle = currentDark;
  ctx.lineWidth = border;
  ctx.strokeRect(border/2, border/2, tw - border, th - border - textArea);
  // QR
  ctx.drawImage(original, pad + border, pad + border);
  // text label below border
  if (text) {
    ctx.fillStyle = currentDark;
    ctx.font = 'bold ' + fontSize + 'px DM Sans,sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, tw / 2, th - textArea / 2);
  }
  original.parentNode.replaceChild(nc, original);
}

// ── Toast ──
var toastTimer;
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2800);
}

// ── Reveal scroll ──
var revObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold:0.1 });
document.querySelectorAll('.reveal').forEach(function(el){ revObs.observe(el); });

// ── Teclado ──
document.addEventListener('keydown', function(e){
  if (e.key === 'Enter') {
    if (document.getElementById('modal-overlay').classList.contains('open')) handleAuth();
    else if (['INPUT','SELECT'].includes(e.target.tagName)) tryGenerate();
  }
  if (e.key === 'Escape') { closeModal(); closeEditModal(); }
});

// ── Click fuera del panel de usuario ──
document.addEventListener('click', function(e){
  var panel  = document.getElementById('user-panel');
  var avatar = document.getElementById('nav-avatar');
  if (panel && panel.style.display==='block' && !panel.contains(e.target) && e.target!==avatar) {
    panel.style.display = 'none';
  }
});

// ── Carpetas ──
async function loadFolders() {
  if (!currentUser || !supabase) return;
  var res = await supabase.from('folders').select('id,name,color').eq('user_id', currentUser.id).order('name');
  var folders = res.data || [];
  var listEl = document.getElementById('folders-list');
  if (listEl) {
    if (folders.length === 0) {
      listEl.innerHTML = '<p style="font-size:.78rem;color:var(--muted2)">Sin carpetas. Creá la primera arriba.</p>';
    } else {
      listEl.innerHTML = folders.map(function(f){
        return '<span class="folder-chip" style="background:' + f.color + '22;color:' + f.color + ';border-color:' + f.color + '">'
          + f.name
          + ' <button onclick="deleteFolder(\'' + f.id + '\')" style="background:none;border:none;cursor:pointer;font-size:.7rem;color:inherit;margin-left:3px;padding:0;line-height:1">✕</button>'
          + '</span>';
      }).join('');
    }
  }
  // Poblar select en formulario de creación
  var sel = document.getElementById('dqr-folder');
  if (sel) {
    sel.innerHTML = '<option value="">Sin carpeta</option>'
      + folders.map(function(f){ return '<option value="' + f.id + '">' + f.name + '</option>'; }).join('');
  }
}

function openFolderModal() { document.getElementById('folder-modal').classList.add('open'); }
function closeFolderModal() { document.getElementById('folder-modal').classList.remove('open'); }

async function createFolder() {
  if (!currentUser || !supabase) return;
  var name  = (document.getElementById('folder-name') || {value:''}).value.trim();
  var color = (document.getElementById('folder-color') || {value:'#1d6b4a'}).value;
  if (!name) { showToast('Ingresá un nombre para la carpeta'); return; }
  var res = await supabase.from('folders').insert({ user_id: currentUser.id, name: name, color: color });
  if (res.error) { showToast('Error al crear carpeta'); return; }
  document.getElementById('folder-name').value = '';
  closeFolderModal();
  showToast('Carpeta creada');
  loadFolders();
  loadDynamicQRs();
}

async function deleteFolder(id) {
  if (!confirm('¿Borrar esta carpeta? Los QR asignados quedarán sin carpeta.')) return;
  await supabase.from('folders').delete().eq('id', id);
  showToast('Carpeta eliminada');
  loadFolders();
  loadDynamicQRs();
}

var __activeFolder = '';
function setFolderFilter(folderId, btn) {
  window.__activeFolder = folderId;
  document.querySelectorAll('#dqr-folder-filter .folder-chip').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  loadDynamicQRs();
}

// ── Generación en lote ──
function openBulkModal() { document.getElementById('bulk-modal').classList.add('open'); }
function closeBulkModal() { document.getElementById('bulk-modal').classList.remove('open'); }

async function runBulkGeneration() {
  var raw = (document.getElementById('bulk-urls') || {value:''}).value;
  var urls = raw.split('\n').map(function(u){ return u.trim(); }).filter(function(u){ return u.startsWith('http'); });
  if (urls.length === 0) { showToast('Pegá al menos una URL válida (https://)'); return; }
  if (urls.length > 50) { urls = urls.slice(0, 50); showToast('Máximo 50 URLs — tomando las primeras 50'); }

  var btn = document.getElementById('bulk-run-btn');
  var progressDiv = document.getElementById('bulk-progress');
  var progressBar = document.getElementById('bulk-progress-bar');
  var progressText = document.getElementById('bulk-progress-text');
  if (btn) btn.disabled = true;
  if (progressDiv) progressDiv.style.display = 'block';

  var zip = new JSZip();
  var size = parseInt(document.getElementById('qr-size').value) || 256;
  var dark  = currentDark  || '#18160f';
  var light = currentLight || '#ffffff';

  for (var i = 0; i < urls.length; i++) {
    var pct = Math.round((i / urls.length) * 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.textContent = 'Generando ' + (i + 1) + ' de ' + urls.length + '...';

    var tmpDiv = document.createElement('div');
    try {
      new QRCode(tmpDiv, { text: urls[i], width: size, height: size, colorDark: dark, colorLight: light, correctLevel: QRCode.CorrectLevel.H });
      await new Promise(function(r){ setTimeout(r, 80); });
      var canvas = tmpDiv.querySelector('canvas');
      if (canvas) {
        var dataUrl = canvas.toDataURL('image/png');
        var base64  = dataUrl.replace('data:image/png;base64,', '');
        var num = String(i + 1).padStart(2, '0');
        zip.file('qr-' + num + '.png', base64, { base64: true });
      }
    } catch(e) {}
  }

  if (progressBar) progressBar.style.width = '100%';
  if (progressText) progressText.textContent = 'Creando ZIP...';

  var dateStr = new Date().toISOString().slice(0, 10);
  zip.generateAsync({ type: 'blob' }).then(function(blob) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lucky-qr-lote-' + dateStr + '.zip';
    a.click();
    if (btn) btn.disabled = false;
    if (progressDiv) progressDiv.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
    closeBulkModal();
    showToast('ZIP descargado con ' + urls.length + ' QR');
  });
}

// ── API Keys ──
function generateKeyString() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var key = 'lqr_';
  for (var i = 0; i < 32; i++) key += chars[Math.floor(Math.random() * chars.length)];
  return key;
}

async function loadApiKeys() {
  if (!currentUser || !supabase) return;
  var res = await supabase.from('api_keys').select('id,key,name,calls_count,created_at').eq('user_id', currentUser.id).order('created_at', { ascending: false });
  var keys = res.data || [];
  var listEl = document.getElementById('api-keys-list');
  if (!listEl) return;
  if (keys.length === 0) {
    listEl.innerHTML = '<p style="font-size:.78rem;color:var(--muted2)">Sin API keys. Generá una arriba.</p>';
    return;
  }
  listEl.innerHTML = keys.map(function(k){
    var shortKey = k.key.slice(0, 12) + '••••••••••••';
    return '<div class="api-key-row">'
      + '<div><div class="api-key-name">' + (k.name || 'API Key') + '</div><div class="api-key-val" title="' + k.key + '">' + shortKey + '</div></div>'
      + '<div style="display:flex;gap:6px;align-items:center;flex-shrink:0">'
      + '<span style="font-size:.68rem;color:var(--muted)">' + (k.calls_count || 0) + ' llamadas</span>'
      + '<button onclick="copyText(\'' + k.key + '\')" class="btn-dqr-action" style="font-size:.68rem;padding:3px 8px">Copiar</button>'
      + '<button onclick="deleteApiKey(\'' + k.id + '\')" class="btn-dqr-action danger" style="font-size:.68rem;padding:3px 8px">Borrar</button>'
      + '</div></div>';
  }).join('');
}

async function generateApiKey() {
  if (!currentUser || !supabase) return;
  var name = prompt('Nombre para esta API key (ej: Mi App):');
  if (name === null) return;
  var key = generateKeyString();
  var res = await supabase.from('api_keys').insert({ user_id: currentUser.id, key: key, name: name || 'API Key' });
  if (res.error) { showToast('Error al generar API key'); return; }
  showToast('API key generada — copiala ahora');
  navigator.clipboard.writeText(key).catch(function(){});
  loadApiKeys();
}

async function deleteApiKey(id) {
  if (!confirm('¿Borrar esta API key? Las integraciones que la usen dejarán de funcionar.')) return;
  await supabase.from('api_keys').delete().eq('id', id);
  showToast('API key eliminada');
  loadApiKeys();
}

// ── Cargar reseñas al inicio ──
window.addEventListener('load', function(){
  setTimeout(loadReviewsSection, 1000);
});
