// ── Estado global ──
var currentUser  = JSON.parse(localStorage.getItem('qr_user') || 'null');
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
  currentUser = null;
  localStorage.removeItem('qr_user');
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

function loadUserPanel() {
  if (!currentUser) return;
  var n = document.getElementById('up-name'); if (n) n.value = currentUser.name || '';
  var e = document.getElementById('up-email'); if (e) e.value = currentUser.email || '';
  var b = document.getElementById('up-bio'); if (b) b.value = currentUser.bio || '';
  var w = document.getElementById('up-web'); if (w) w.value = currentUser.web || '';
  var qrs  = JSON.parse(localStorage.getItem('qr_history_' + currentUser.email) || '[]');
  var revs = JSON.parse(localStorage.getItem('qr_reviews') || '[]');
  var myR  = revs.filter(function(r){ return r.email === currentUser.email; });
  var cnt  = document.getElementById('up-qr-count');  if (cnt)  cnt.textContent  = qrs.length;
  var rcnt = document.getElementById('up-review-count'); if (rcnt) rcnt.textContent = myR.length;
  var hl = document.getElementById('up-history-list');
  if (hl) {
    if (qrs.length === 0) {
      hl.innerHTML = '<p style="font-size:.75rem;color:var(--muted2)">Todavía no generaste ningún QR.</p>';
    } else {
      hl.innerHTML = '<p style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-weight:500">Últimos QR generados:</p>'
        + qrs.slice(0,5).map(function(q){
            return '<div style="font-size:.72rem;padding:5px 0;border-bottom:1px solid var(--border);color:var(--muted)">'
              + '<span style="color:var(--accent);font-weight:500">' + q.type.toUpperCase() + '</span> · ' + q.date + '</div>';
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

function saveProfile() {
  var name = document.getElementById('up-name').value.trim();
  var bio  = document.getElementById('up-bio').value.trim();
  var web  = document.getElementById('up-web').value.trim();
  if (!name) { showToast('Ingresá tu nombre'); return; }
  currentUser.name = name; currentUser.bio = bio; currentUser.web = web;
  localStorage.setItem('qr_user', JSON.stringify(currentUser));
  var users = JSON.parse(localStorage.getItem('qr_users') || '{}');
  if (users[currentUser.email]) {
    users[currentUser.email].name = name;
    users[currentUser.email].bio  = bio;
    users[currentUser.email].web  = web;
    localStorage.setItem('qr_users', JSON.stringify(users));
  }
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
  btn.classList.add('loading');
  setTimeout(function(){
    btn.classList.remove('loading');
    if (authMode === 'register') {
      var name    = document.getElementById('auth-name').value.trim();
      var confirm = document.getElementById('auth-confirm').value;
      if (!name)           { showModalError('Ingresá tu nombre.'); return; }
      if (pass !== confirm){ showModalError('Las contraseñas no coinciden.'); return; }
      var users = JSON.parse(localStorage.getItem('qr_users') || '{}');
      if (users[email])    { showModalError('Ese email ya está registrado.'); return; }
      users[email] = { name:name, email:email, pass:pass };
      localStorage.setItem('qr_users', JSON.stringify(users));
      currentUser = { name:name, email:email };
      localStorage.setItem('qr_user', JSON.stringify(currentUser));
      showLoggedIn(); closeModal();
      showToast('Cuenta creada. Bienvenido, ' + name + '!');
    } else {
      var users2 = JSON.parse(localStorage.getItem('qr_users') || '{}');
      var user   = users2[email];
      if (!user || user.pass !== pass) { showModalError('Email o contraseña incorrectos.'); return; }
      currentUser = { name:user.name, email:email, bio:user.bio||'', web:user.web||'' };
      localStorage.setItem('qr_user', JSON.stringify(currentUser));
      showLoggedIn(); closeModal();
      showToast('Bienvenido de vuelta, ' + user.name + '!');
    }
  }, 800);
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
function loadReviewsSection() {
  var list = document.getElementById('reviews-public-list');
  if (!list) return;
  var revs = JSON.parse(localStorage.getItem('qr_reviews') || '[]');
  var count = document.getElementById('reviews-count');
  if (count) count.textContent = revs.length;
  if (revs.length === 0) {
    list.innerHTML = '<p style="font-size:.82rem;color:var(--muted2);text-align:center;padding:1.5rem 0">Todavía no hay reseñas. ¡Sé el primero!</p>';
    return;
  }
  var avg = revs.reduce(function(a,r){ return a+r.stars; },0) / revs.length;
  var avgEl = document.getElementById('reviews-avg');
  if (avgEl) avgEl.textContent = avg.toFixed(1);
  list.innerHTML = revs.slice(0,6).map(function(r){
    var stars = '';
    for (var i=0;i<5;i++) stars += (i<r.stars ? '★' : '☆');
    return '<div class="rev-card">'
      + '<div class="rev-head">'
      + '<div class="rev-av">' + r.name.slice(0,2).toUpperCase() + '</div>'
      + '<div><div class="rev-name">' + r.name + '</div><div class="rev-date">' + r.date + '</div></div>'
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

function sendReview() {
  if (!currentUser) { openModal('login'); return; }
  if (currentStar === 0) { showToast('Elegí una puntuación'); return; }
  var text = document.getElementById('review-text-input').value.trim();
  if (!text) { showToast('Escribí tu reseña'); return; }
  var revs = JSON.parse(localStorage.getItem('qr_reviews') || '[]');
  revs.unshift({ name:currentUser.name, email:currentUser.email, stars:currentStar, text:text, date:new Date().toLocaleDateString('es-AR') });
  localStorage.setItem('qr_reviews', JSON.stringify(revs));
  document.getElementById('review-text-input').value = '';
  currentStar = 0;
  document.querySelectorAll('.star-btn').forEach(function(s){ s.classList.remove('on'); });
  document.getElementById('write-review-form').classList.remove('open');
  loadReviewsSection();
  showToast('Reseña enviada. ¡Gracias!');
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
