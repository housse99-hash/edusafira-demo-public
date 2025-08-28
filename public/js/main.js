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
