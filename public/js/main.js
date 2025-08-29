// === Toggle "admin" (afficher le CTA admin) ===
(function(){
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') localStorage.setItem('edusafira_admin','1');
  if (params.get('admin') === '0') localStorage.removeItem('edusafira_admin');

  const isAdmin = localStorage.getItem('edusafira_admin') === '1';
  document.querySelectorAll('.btn-admin-cta').forEach(btn=>{
    if (isAdmin) btn.hidden = false;
  });
})();

// === Afficher le CTA admin si mode admin ===
(function(){
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') localStorage.setItem('edusafira_admin','1');
  if (params.get('admin') === '0') localStorage.removeItem('edusafira_admin');

  const isAdmin = localStorage.getItem('edusafira_admin') === '1';
  document.querySelectorAll('.btn-admin-cta').forEach(btn=>{
    if (isAdmin) btn.hidden = false;
  });
})();

// Menu "Mon compte" : toggle au clic + clic en dehors
(function(){
  const item = document.querySelector('.menu .has-submenu');
  if (!item) return;

  const trigger = item.querySelector('a'); // le lien "Mon compte"
  const submenu = item.querySelector('.submenu');

  // Ouvre/ferme au clic
  trigger.addEventListener('click', (e)=>{
    // si le lien "Mon compte" doit rester cliquable, enlève ce preventDefault
    e.preventDefault();
    item.classList.toggle('open');
    submenu.style.display = item.classList.contains('open') ? 'block' : 'none';
  });

  // Ferme en cliquant hors du menu
  document.addEventListener('click', (e)=>{
    if (!item.contains(e.target)) {
      item.classList.remove('open');
      submenu.style.display = 'none';
    }
  });
})();

// Burger : ouvre/ferme le menu sur mobile
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('primary-menu');
  if (!toggle || !menu) return;

  const open = () => {
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
  };
  const close = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  toggle.addEventListener('click', ()=>{
    document.body.classList.contains('menu-open') ? close() : open();
  });

  // Fermer au clic hors du menu (mobile)
  document.addEventListener('click', (e)=>{
    if (!document.body.classList.contains('menu-open')) return;
    const within = e.target.closest('.nav-center, .nav-toggle');
    if (!within) close();
  });

  // ESC pour fermer
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') close();
  });

  // Fermer quand on clique un lien du menu
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> close());
  });
})();

// Sous-menu "Mon compte" : toggle au clic (utile en mobile)
(function(){
  const item = document.querySelector('.menu .has-submenu');
  if (!item) return;
  const trigger = item.querySelector('.submenu-trigger');
  const submenu = item.querySelector('.submenu');

  // Desktop : hover géré par CSS; Mobile : clic pour ouvrir/fermer
  trigger.addEventListener('click', (e)=>{
    // Empêche la navigation immédiate si on veut ouvrir le sous-menu
    if (window.matchMedia('(max-width: 900px)').matches){
      e.preventDefault();
      const open = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  });

  // Ferme le sous-menu si clic en dehors (mobile)
  document.addEventListener('click', (e)=>{
    if (window.matchMedia('(max-width: 900px)').matches){
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();

// Forcer la lecture si l'autoplay est bloqué
(function(){
  const v = document.getElementById('promoVideo');
  if (!v) return;

  const tryPlay = () => v.play().catch(()=>{ /* silencieux */ });

  if (v.autoplay) tryPlay();
  document.addEventListener('DOMContentLoaded', tryPlay, { once:true });
  document.addEventListener('click', tryPlay, { once:true });     // 1er clic utilisateur
  document.addEventListener('touchstart', tryPlay, { once:true }); // 1er tap mobile
})();

(function(){
  const v = document.getElementById('promoVideo');
  if (!v) return;
  const tryPlay = () => v.play().catch(()=>{});
  if (v.autoplay) tryPlay();
  document.addEventListener('DOMContentLoaded', tryPlay, { once:true });
  document.addEventListener('click', tryPlay, { once:true });
  document.addEventListener('touchstart', tryPlay, { once:true });
})();

// Burger: ouvre/ferme le menu en mobile
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menuWrap = document.getElementById('primary-menu');
  if (!toggle || !menuWrap) return;

  const open = () => {
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
  };
  const close = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? close() : open();
  });

  // Fermer au clic hors panneau
  document.addEventListener('click', (e)=>{
    if (!document.body.classList.contains('menu-open')) return;
    const within = e.target.closest('.nav-center, .nav-toggle');
    if (!within) close();
  });

  // ESC ferme
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') close(); });

  // Fermer en cliquant un lien
  menuWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// Sous-menu "Mon compte" : toggle au clic en mobile
(function(){
  const item = document.querySelector('.menu .has-submenu');
  if (!item) return;
  const trigger = item.querySelector('.submenu-trigger');
  const mq = window.matchMedia('(max-width: 768px)');

  trigger.addEventListener('click', (e)=>{
    if (mq.matches){ // mobile
      e.preventDefault();
      item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    }
  });
})();

// Ombre quand on scrolle
(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('elevated', window.scrollY > 4);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

// Burger: ouvre/ferme le menu en mobile
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menuWrap = document.getElementById('primary-menu'); // <div class="nav-center" id="primary-menu">
  if (!toggle || !menuWrap) return;

  const open = () => {
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
  };
  const close = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? close() : open();
  });

  // Fermer au clic hors panneau
  document.addEventListener('click', (e)=>{
    if (!document.body.classList.contains('menu-open')) return;
    const within = e.target.closest('.nav-center, .nav-toggle');
    if (!within) close();
  });

  // ESC ferme
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') close(); });

  // Fermer en cliquant un lien du menu
  menuWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// Sous-menu "Mon compte" : toggle au clic en mobile
(function(){
  const item = document.querySelector('.menu .has-submenu');
  if (!item) return;
  const trigger = item.querySelector('.submenu-trigger');
  const mq = window.matchMedia('(max-width: 768px)');
  trigger.addEventListener('click', (e)=>{
    if (mq.matches){
      e.preventDefault();
      item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    }
  });
})();

// ===== Burger toggle =====
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-center');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
  });
})();

// Burger: ouvre/ferme le menu mobile
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-center');
  if (!toggle || !menu) return;

  // évite que le bouton soit traité comme un submit si c'est un <button>
  if (toggle.tagName.toLowerCase() === 'button') toggle.type = 'button';

  const open  = () => { document.body.classList.add('menu-open');  toggle.setAttribute('aria-expanded','true');  };
  const close = () => { document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded','false'); };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.contains('menu-open') ? close() : open();
  });

  // Fermer si on clique hors du panneau
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('menu-open')) return;
    if (!e.target.closest('.nav-center, .nav-toggle')) close();
  });

  // ESC pour fermer
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Fermer quand on clique un lien du menu
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// ===== Burger + sous-menu mobile (robuste) =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-center');
  if (!toggle || !menu) return;

  if (toggle.tagName.toLowerCase() === 'button') toggle.type = 'button';

  let isOpen = false;
  let ignoreNextDocClick = false;   // évite la fermeture immédiate après ouverture

  const open  = () => {
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    isOpen = true;
    // on ignore le prochain click document (celui qui suit le tap mobile)
    ignoreNextDocClick = true;
    setTimeout(() => { ignoreNextDocClick = false; }, 0);
  };

  const close = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    isOpen = false;
  };

  // Ouvrir / fermer avec le bouton
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isOpen ? close() : open();
  }, true);

  // Gestion du sous-menu "Mon compte" (ne pas fermer le burger)
  menu.addEventListener('click', (e) => {
    const trigger = e.target.closest('.submenu-trigger');
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const li = trigger.closest('.has-submenu');
    li.classList.toggle('open');
    trigger.setAttribute('aria-expanded', li.classList.contains('open') ? 'true' : 'false');
  });

  // Fermer si clic hors panneau
  document.addEventListener('click', (e) => {
    if (!isOpen) return;
    if (ignoreNextDocClick) return;                              // évite fermeture immédiate
    const inside = e.target.closest('.nav-center, .nav-toggle');
    if (!inside) close();
  });

  // ESC => fermer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });

  // Cliquer un lien "normal" (pas le trigger) => fermer
  menu.querySelectorAll('a:not(.submenu-trigger)').forEach(a => {
    a.addEventListener('click', () => { if (isOpen) close(); });
  });
});

// === Filet de sécurité pour colorer les 2 CTA du hero (Community) ===
document.addEventListener('DOMContentLoaded', () => {
  // heuristique: on ne touche qu'aux ancres visibles dans le haut de page
  const withinTop = (el) => el.getBoundingClientRect().top < window.innerHeight * 1.2;

  const isRegister = (a) =>
    /(register|inscription|inscrire)/i.test(a.href) ||
    /créer mon compte|rejoindre/i.test(a.textContent);

  const isLogin = (a) =>
    /(login|connexion|connect)/i.test(a.href) ||
    /(déjà un compte|se connecter)/i.test(a.textContent);

  const candidates = Array.from(document.querySelectorAll('a')).filter(withinTop);
  const reg = candidates.find(isRegister);
  const log = candidates.find(isLogin);

  // applique style inline (priorité maxi)
  if (reg) {
    reg.style.background = 'linear-gradient(135deg,#ff8c1a,#ff5e00)';
    reg.style.color = '#fff';
    reg.style.border = 'none';
    reg.style.borderRadius = '14px';
    reg.style.boxShadow = '0 6px 14px rgba(0,0,0,.12)';
  }
  if (log) {
    log.style.background = 'linear-gradient(135deg,#2563eb,#1e40af)';
    log.style.color = '#fff';
    log.style.border = 'none';
    log.style.borderRadius = '14px';
    log.style.boxShadow = '0 6px 14px rgba(0,0,0,.12)';
  }

  // espace sous le groupe si les deux sont frères
  if (reg && log && reg.parentElement === log.parentElement) {
    reg.parentElement.style.marginBottom = '1.5rem';
  }
});
