// ── Supabase ──
var SUPABASE_URL = 'https://mqhgqdozuilerfhisoqy.supabase.co';
var SUPABASE_KEY = 'sb_publishable_Owm4MnvGI5FepdV9-wTo9w_U9xI7oxH';
var supabase = null;

window.addEventListener('load', function() {
  if (window.supabase && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    // escuchar cambios de sesión
    supabase.auth.onAuthStateChange(function(event, session) {
      if (session && session.user) {
        loadUserProfile(session.user);
      } else {
        currentUser = null;
        showLoggedOut();
      }
    });
    // verificar sesión existente
    supabase.auth.getSession().then(function(res) {
      if (res.data && res.data.session) {
        loadUserProfile(res.data.session.user);
      } else {
        showLoggedOut();
      }
    });
  }
});

async function loadUserProfile(authUser) {
  // buscar perfil en tabla profiles
  var res = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (res.error || !res.data) {
    // crear perfil si no existe
    await supabase.from('profiles').insert({
      id:    authUser.id,
      email: authUser.email,
      name:  authUser.user_metadata.name || authUser.email.split('@')[0],
      plan:  'free'
    });
    currentUser = {
      id:    authUser.id,
      email: authUser.email,
      name:  authUser.user_metadata.name || authUser.email.split('@')[0],
      plan:  'free'
    };
  } else {
    currentUser = res.data;
  }

  showLoggedIn();
  checkPremiumStatus();
}

// ── Estado global ──
var currentUser  = null;
var authMode     = 'login';
var currentType  = 'url';
var currentStar  = 0;
var currentShape = 'square';
var currentDark  = '#18160f';
var currentLight = '#ffffff';

var shapes = [
  { id:'square',   label:'Cuadrado',   css:'border-radius:2px' },
  { id:'round',    label:'Redondeado', css:'border-radius:8px' },
  { id:'dot',      label:'Puntos',     css:'border-radius:50%' },
  { id:'extra',    label:'Extra rnd',  css:'border-radius:14px' },
  { id:'diamond',  label:'Diamante',   css:'transform:rotate(45deg);border-radius:2px' },
  { id:'cross',    label:'Cruz',       css:'clip-path:polygon(33% 0%,67% 0%,67% 33%,100% 33%,100% 67%,67% 67%,67% 100%,33% 100%,33% 67%,0% 67%,0% 33%,33% 33%)' },
  { id:'star',     label:'Estrella',   css:'clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' },
  { id:'pixel',    label:'Pixel',      css:'border-radius:0px;image-rendering:pixelated' },
];

// ── Init ──
(function init() {
  if (currentUser) showLoggedIn(); else showLoggedOut();
  renderShapes();
  loadReviewsSection();
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
  document.getElementById('nav-avatar').textContent    = i;
  document.getElementById('nav-username').textContent  = currentUser.name || currentUser.email.split('@')[0];
  var av = document.getElementById('up-av'); if (av) av.textContent = i;
  var dn = document.getElementById('up-dname'); if (dn) dn.textContent = currentUser.name || 'Usuario';
  var de = document.getElementById('up-demail'); if (de) de.textContent = currentUser.email;
}

function showLoggedOut() {
  sEl('nav-auth-hint','flex'); sEl('btn-nav-login','inline-flex'); sEl('btn-nav-register','inline-flex');
  sEl('register-banner','flex'); sEl('hero-btns','flex');
  hEl('nav-user'); hEl('user-panel');
}

function logout() {
  if (supabase) supabase.auth.signOut();
  currentUser = null;
  showLoggedOut();
  showToast('Sesión cerrada');
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
  var qrRes  = await supabase.from('dynamic_qrs').select('id', { count:'exact' }).eq('user_id', currentUser.id);
  var cnt  = document.getElementById('up-qr-count');  if (cnt)  cnt.textContent  = qrRes.count || 0;
  var histRes = await supabase.from('dynamic_qrs').select('name,created_at').eq('user_id', currentUser.id).order('created_at', { ascending:false }).limit(5);
  var hl = document.getElementById('up-history-list');
  if (hl) {
    if (!histRes.data || histRes.data.length === 0) {
      hl.innerHTML = '<p style="font-size:.75rem;color:var(--muted2)">Todavía no generaste ningún QR.</p>';
    } else {
      hl.innerHTML = '<p style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-weight:500">Últimos QR dinámicos:</p>'
        + histRes.data.map(function(q){
            return '<div style="font-size:.72rem;padding:5px 0;border-bottom:1px solid var(--border);color:var(--muted)">'
              + '<span style="color:var(--accent);font-weight:500">' + q.name + '</span> · '
              + new Date(q.created_at).toLocaleDateString("es-AR") + '</div>';
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
  var res = await supabase.from('profiles').update({ name:name, bio:bio, web:web }).eq('id', currentUser.id);
  if (res.error) { showToast('Error al guardar'); return; }
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
  setTimeout(function(){ document.getElementById('auth-email').focus(); }, 300);
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
    var name = document.getElementById('auth-name').value.trim();
    var confirm = document.getElementById('auth-confirm').value;
    if (!name) { showModalError('Ingresá tu nombre.'); btn.classList.remove('loading'); return; }
    if (pass !== confirm) { showModalError('Las contraseñas no coinciden.'); btn.classList.remove('loading'); return; }

    supabase.auth.signUp({
      email: email,
      password: pass,
      options: { data: { name: name } }
    }).then(function(res) {
      btn.classList.remove('loading');
      if (res.error) { showModalError(res.error.message); return; }
      closeModal();
      showToast('Cuenta creada. Bienvenido, ' + name + '!');
    });

  } else {
    supabase.auth.signInWithPassword({
      email: email,
      password: pass
    }).then(function(res) {
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
  var ids = ['input-area','wifi-fields','sms-fields','vcard-fields','geo-fields','whatsapp-fields','youtube-fields','instagram-fields','pdf-fields'];
  ids.forEach(function(id){ var e = document.getElementById(id); if (e) e.style.display = 'none'; });
  var cfg = {
    url:       { l:'URL',            s:'ej: https://mi-sitio.com', p:'https://',                t:'url'   },
    text:      { l:'Texto',          s:'cualquier mensaje',        p:'Escribí tu texto...',      t:'text'  },
    email:     { l:'Email',          s:'dirección de correo',      p:'nombre@ejemplo.com',       t:'email' },
    tel:       { l:'Teléfono',       s:'con código de país',       p:'+54 9 11 1234 5678',       t:'tel'   },
  };
  var specials = { wifi:'wifi-fields', sms:'sms-fields', vcard:'vcard-fields', geo:'geo-fields', whatsapp:'whatsapp-fields', youtube:'youtube-fields', instagram:'instagram-fields', pdf:'pdf-fields' };
  if (specials[type]) {
    var el = document.getElementById(specials[type]);
    if (el) el.style.display = 'block';
  } else {
    var c    = cfg[type] || { l:type, s:'', p:'', t:'text' };
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
  document.getElementById('char-count').textContent = (c ? c.length : 0) + ' caracteres';
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
  if (currentType === 'youtube') {
    var yu = document.getElementById('yt-url').value.trim();
    return yu || null;
  }
  if (currentType === 'instagram') {
    var ig = document.getElementById('ig-user').value.trim();
    if (!ig) return null;
    if (ig.startsWith('http')) return ig;
    return 'https://instagram.com/' + (ig.startsWith('@') ? ig.slice(1) : ig);
  }
  if (currentType === 'pdf') {
    var pu = document.getElementById('pdf-url').value.trim();
    return pu || null;
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

// ── Shapes — renderiza previews y aplica forma real al QR ──
function renderShapes() {
  var container = document.getElementById('shape-picker');
  if (!container) return;
  container.innerHTML = shapes.map(function(s, i) {
    return '<button class="shape-btn' + (i===0 ? ' active' : '') + '" '
      + 'onclick="selectShape(\'' + s.id + '\',this)" title="' + s.label + '">'
      + '<div class="shape-demo" style="' + s.css + ';background:var(--text);width:28px;height:28px;display:inline-block;transition:all .2s"></div>'
      + '<span>' + s.label + '</span>'
      + '</button>';
  }).join('');
}

function selectShape(id, btn) {
  currentShape = id;
  document.querySelectorAll('.shape-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  // aplicar forma a canvas existente si hay QR generado
}

// QR generado directamente por QRCode.js sin post-procesado


function drawModule(ctx, x, y, size, shape) {
  var cx = x + size/2, cy = y + size/2, r = size/2 * 0.85;
  ctx.beginPath();
  switch(shape) {
    case 'square':
      ctx.rect(x+1, y+1, size-2, size-2);
      break;
    case 'round':
      roundRect(ctx, x+1, y+1, size-2, size-2, size*0.3);
      break;
    case 'dot':
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      break;
    case 'extra':
      roundRect(ctx, x+1, y+1, size-2, size-2, size*0.45);
      break;
    case 'diamond':
      ctx.moveTo(cx, y+1);
      ctx.lineTo(x+size-1, cy);
      ctx.lineTo(cx, y+size-1);
      ctx.lineTo(x+1, cy);
      ctx.closePath();
      break;
    case 'cross':
      var t = size*0.28;
      ctx.rect(x+t, y+1, size-t*2, size-2);
      ctx.rect(x+1, y+t, size-2, size-t*2);
      break;
    case 'star':
      drawStar(ctx, cx, cy, 5, r, r*0.45);
      break;
    case 'pixel':
      ctx.rect(x, y, size, size);
      break;
    default:
      ctx.rect(x+1, y+1, size-2, size-2);
  }
  ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  if (r > w/2) r = w/2;
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
  var rot = Math.PI/2*3;
  var step = Math.PI/spikes;
  ctx.moveTo(cx, cy-outerR);
  for (var i=0; i<spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot)*outerR, cy + Math.sin(rot)*outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot)*innerR, cy + Math.sin(rot)*innerR);
    rot += step;
  }
  ctx.lineTo(cx, cy-outerR);
  ctx.closePath();
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
      var output  = document.getElementById('qr-output');
      output.innerHTML = '';
      // generar QR base siempre cuadrado primero
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
        document.getElementById('qr-info-meta').textContent = size + ' × ' + size + ' px · ' + currentShape;
        document.getElementById('qr-info').style.display = 'block';
        saveToHistory(content, currentType, size);
        showToast('QR generado correctamente');
      }, 150);
    } catch(e) {
      btn.classList.remove('loading');
      bar.style.width = '0%';
      document.getElementById('qr-output').innerHTML = '<p style="color:var(--danger);font-size:.82rem;text-align:center;padding:1rem">Error al generar el QR. Verificá el contenido.</p>';
      showToast('Error al generar');
    }
  }, 250);
}

function saveToHistory(content, type, size) {
  if (!currentUser) return;
  var key  = 'qr_history_' + currentUser.email;
  var hist = JSON.parse(localStorage.getItem(key) || '[]');
  hist.unshift({ content:content, type:type, size:size, date:new Date().toLocaleDateString('es-AR') });
  if (hist.length > 20) hist.pop();
  localStorage.setItem(key, JSON.stringify(hist));
}

// ── Descargas ──
function downloadQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var a = document.createElement('a');
  a.download = 'qr-studio-' + currentType + '.png';
  a.href = c.toDataURL('image/png');
  a.click();
  showToast('Descargando PNG...');
}

function downloadSVG() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var sz  = c.width;
  var img = c.toDataURL('image/png');
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + sz + '" height="' + sz + '"><image href="' + img + '" width="' + sz + '" height="' + sz + '"/></svg>';
  var blob = new Blob([svg], {type:'image/svg+xml'});
  var a = document.createElement('a'); a.download='qr-studio.svg'; a.href=URL.createObjectURL(blob); a.click();
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
  if (!c || !navigator.share) { showToast('Compartir no disponible en este navegador'); return; }
  c.toBlob(function(blob){
    var file = new File([blob], 'qr-studio.png', {type:'image/png'});
    navigator.share({files:[file], title:'Mi código QR — QR Studio'}).catch(function(){});
  });
}

function printQR() {
  var c = document.querySelector('#qr-output canvas');
  if (!c) return;
  var img  = c.toDataURL('image/png');
  var info = document.getElementById('qr-info-text').textContent;
  var win  = window.open('','_blank');
  win.document.write('<html><head><title>QR Studio — Imprimir</title>'
    + '<style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;gap:1rem;background:#fff}'
    + 'img{max-width:280px;border:1px solid #eee;border-radius:8px;padding:12px}'
    + 'p{font-size:11px;color:#666;text-align:center;max-width:280px;word-break:break-all}'
    + 'small{font-size:10px;color:#aaa}</style></head>'
    + '<body><img src="' + img + '"/><p>' + info + '</p><small>qrstudio.com</small>'
    + '<script>window.onload=function(){window.print();window.close()}<\/script></body></html>');
  win.document.close();
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
    for (var i=0;i<5;i++) stars += (i<r.stars ? '★' : '☆');
    return '<div class="rev-card">'
      + '<div class="rev-head">'
      + '<div class="rev-av">' + r.name.slice(0,2).toUpperCase() + '</div>'
      + '<div><div class="rev-name">' + r.name + '</div><div class="rev-date">' + new Date(r.created_at).toLocaleDateString("es-AR") + '</div></div>'
      + '<div class="rev-stars">' + stars + '</div>'
      + '</div>'
      + '<div class="rev-text">' + r.text + '</div>'
      + '</div>';
  }).join('');
}

function toggleWriteReview() {
  if (!currentUser) { openModal('login'); showToast('Iniciá sesión para dejar una reseña'); return; }
  var form = document.getElementById('write-review-form');
  if (form) form.classList.toggle('open');
}

function setStar(n) {
  currentStar = n;
  document.querySelectorAll('.star-btn').forEach(function(s, i){
    s.classList.toggle('on', i < n);
  });
}

async function sendReview() {
  if (!currentUser) { openModal('login'); return; }
  if (currentStar === 0) { showToast('Elegí una puntuación'); return; }
  var text = document.getElementById('review-text-input').value.trim();
  if (!text) { showToast('Escribí tu reseña'); return; }
  if (!supabase) return;
  var res = await supabase.from('reviews').insert({
    user_id: currentUser.id,
    name:    currentUser.name,
    email:   currentUser.email,
    stars:   currentStar,
    text:    text
  });
  if (res.error) { showToast('Error al enviar reseña'); return; }
  document.getElementById('review-text-input').value = '';
  currentStar = 0;
  document.querySelectorAll('.star-btn').forEach(function(s){ s.classList.remove('on'); });
  document.getElementById('write-review-form').classList.remove('open');
  loadReviewsSection();
  showToast('Reseña enviada. ¡Gracias!');
}

// ── Premium ──
function checkPremiumStatus() {
  if (!currentUser) return;
  var plan = currentUser.plan || 'free';
  if (plan === 'premium') {
    showPremiumPanel();
  }
}

function showPremiumPanel() {
  var locked = document.getElementById('premium-locked');
  var panel  = document.getElementById('premium-panel');
  var badge  = document.getElementById('plan-badge');
  if (locked) locked.style.display = 'none';
  if (panel)  panel.style.display  = 'block';
  if (badge)  badge.textContent    = '⭐ Plan Premium';
  loadDynamicQRs();
}

// ── QR Dinámicos ──
function generateShortCode() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var code  = '';
  for (var i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function createDynamicQR() {
  if (!currentUser) { openModal('login'); return; }
  if (!supabase)    { showToast('Error de conexión'); return; }

  var name = document.getElementById('dqr-name').value.trim();
  var url  = document.getElementById('dqr-url').value.trim();
  if (!name) { showToast('Ingresá un nombre para el QR'); return; }
  if (!url)  { showToast('Ingresá una URL destino'); return; }
  if (!url.startsWith('http')) { showToast('La URL debe empezar con https://'); return; }

  var code = generateShortCode();

  var res = await supabase.from('dynamic_qrs').insert({
    user_id:         currentUser.id,
    short_code:      code,
    destination_url: url,
    name:            name
  });

  if (res.error) {
    showToast('Error al crear QR: ' + res.error.message);
    return;
  }

  document.getElementById('dqr-name').value = '';
  document.getElementById('dqr-url').value  = '';
  showToast('QR dinámico creado correctamente');
  loadDynamicQRs();
}

async function loadDynamicQRs() {
  if (!currentUser || !supabase) return;

  var res = await supabase
    .from('dynamic_qrs')
    .select('*, qr_scans(count)')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });

  if (res.error) { showToast('Error al cargar QR'); return; }

  var list  = document.getElementById('dqr-list');
  var count = document.getElementById('dqr-count');
  var qrs   = res.data || [];

  if (count) count.textContent = qrs.length + ' QR';

  if (qrs.length === 0) {
    list.innerHTML = '<p style="font-size:.82rem;color:var(--muted2);text-align:center;padding:1rem 0">Todavía no creaste ningún QR dinámico.</p>';
    return;
  }

  list.innerHTML = qrs.map(function(qr) {
    var scans = qr.qr_scans ? qr.qr_scans.length : 0;
    var link  = 'https://lucky-qr.com/r/' + qr.short_code;
    return '<div class="dqr-item">'
      + '<div class="dqr-item-head">'
      + '<span class="dqr-item-name">' + qr.name + '</span>'
      + '<span class="dqr-item-code">' + qr.short_code + '</span>'
      + '</div>'
      + '<div class="dqr-item-url">' + qr.destination_url + '</div>'
      + '<div style="font-size:.7rem;color:var(--muted2);margin-bottom:.6rem">📊 ' + scans + ' escaneos · ' + link + '</div>'
      + '<div class="dqr-item-actions">'
      + '<button class="btn-dqr-action" onclick="copyText(\'' + link + '\')">Copiar link</button>'
      + '<button class="btn-dqr-action" onclick="openEditModal(\'' + qr.id + '\',\'' + qr.destination_url + '\')">Editar URL</button>'
      + '<button class="btn-dqr-action" onclick="generateDynamicQRCode(\'' + link + '\')">Ver QR</button>'
      + '<button class="btn-dqr-action danger" onclick="deleteDynamicQR(\'' + qr.id + '\')">Borrar</button>'
      + '</div>'
      + '</div>';
  }).join('');
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
  var res = await supabase.from('dynamic_qrs').update({ destination_url: url, updated_at: new Date().toISOString() }).eq('id', id);
  if (res.error) { showToast('Error al guardar'); return; }
  closeEditModal();
  showToast('URL actualizada — el QR ya redirige al nuevo destino');
  loadDynamicQRs();
}

function generateDynamicQRCode(url) {
  var output = document.getElementById('qr-output');
  output.innerHTML = '';
  new QRCode(output, { text: url, width: 256, height: 256, colorDark: currentDark, colorLight: currentLight, correctLevel: QRCode.CorrectLevel.H });
  document.getElementById('qr-info-text').textContent = url;
  document.getElementById('qr-info-meta').textContent = 'QR Dinámico · 256 × 256 px';
  document.getElementById('qr-info').style.display = 'block';
  var st = document.getElementById('qr-status');
  st.textContent = 'Listo ✓'; st.style.color = 'var(--accent)';
  ['btn-copy','btn-dl','btn-share','btn-print','btn-svg'].forEach(function(id){
    var el = document.getElementById(id); if (el) el.disabled = false;
  });
  window.scrollTo({ top: document.getElementById('generator').offsetTop - 80, behavior: 'smooth' });
  showToast('QR dinámico generado');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(function() {
    showToast('Link copiado al portapapeles');
  });
}

// ── FAQ ──
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
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
  if (e.key === 'Escape') closeModal();
});

// ── Click fuera del panel de usuario ──
document.addEventListener('click', function(e){
  var panel  = document.getElementById('user-panel');
  var avatar = document.getElementById('nav-avatar');
  if (panel && panel.style.display==='block' && !panel.contains(e.target) && e.target!==avatar) {
    panel.style.display = 'none';
  }
});
