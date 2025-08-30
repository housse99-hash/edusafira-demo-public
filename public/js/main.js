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

/* ============================================================
   COMPTEURS COMMUNITY — anim d'entrée + "live" (exos / connectés / encadreurs)
   ============================================================ */
(function () {
  const formatFR = (n) => Number(n).toLocaleString('fr-FR');

  /* ---------- Animation d’entrée pour tous les .stat-value ---------- */
  function animateIn(el, to, duration = 1400) {
    const start = performance.now();
    const from = 0;
    const end = Number(to);

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      const value = Math.round(from + (end - from) * eased);
      el.textContent = formatFR(value);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Lance l’anim d’entrée quand la section #stats entre en vue
  (function initEntrance(){
    const stats = document.querySelector('#stats');
    if (!stats) return;
    const values = stats.querySelectorAll('.stat-value');

    if (!('IntersectionObserver' in window) || values.length === 0) {
      values.forEach(el => el.textContent = formatFR(el.dataset.target || 0));
      return;
    }

    let done = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !done) {
          done = true;
          values.forEach(el => animateIn(el, el.dataset.target || 0));
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(stats);
  })();

  /* ---------- Compteur “Abonné·e·s connectés” (live sans limite) ---------- */
  (function liveConnected(){
    const el = document.getElementById('live-connected');
    if (!el) return;

    const getVal = () => {
      const raw = (el.textContent || '0').replace(/\s/g,'').replace(/\u00A0/g,'').replace(/[.,]/g,'');
      const n = parseInt(raw,10);
      return isNaN(n) ? 0 : n;
    };
    const setVal = (n) => { el.textContent = formatFR(n); };

    function makeTicker({minStep=2, maxStep=9, interval=12000, jitter=0.3, pauseHidden=true}={}){
      let timer = null;
      const schedule = () => {
        const j = 1 + (Math.random()*2 - 1) * jitter;
        const delay = Math.max(2000, Math.round(interval * j));
        timer = setTimeout(tick, delay);
      };
      const tick = () => {
        if (pauseHidden && document.hidden) return schedule();
        const curr = getVal();
        const step = Math.floor(minStep + Math.random()*(maxStep - minStep + 1));
        setVal(curr + step);
        schedule();
      };
      return { start(){ if (!timer) schedule(); }, stop(){ if (timer){ clearTimeout(timer); timer=null; } } };
    }

    const live = makeTicker();
    setTimeout(() => { live.start(); }, 1800); // après anim d’entrée
  })();

  /* ---------- Compteur “Exercices / jour” (live avec plafond 1872) ---------- */
  (function liveExos(){
    const el = document.getElementById('live-exos');
    if (!el) return;

    const cap = 1872;
    const getVal = () => {
      const raw = (el.textContent || '0').replace(/\s/g,'').replace(/\u00A0/g,'').replace(/[.,]/g,'');
      const n = parseInt(raw,10);
      return isNaN(n) ? 0 : n;
    };
    const setVal = (n) => { el.textContent = formatFR(n); };

    function makeTicker({minStep=8, maxStep=28, interval=8000, jitter=0.35, pauseHidden=true}={}){
      let timer = null;
      const schedule = () => {
        const j = 1 + (Math.random()*2 - 1) * jitter;
        const delay = Math.max(2000, Math.round(interval * j));
        timer = setTimeout(tick, delay);
      };
      const tick = () => {
        if (pauseHidden && document.hidden) return schedule();
        const curr = getVal();
        const step = Math.floor(minStep + Math.random()*(maxStep - minStep + 1));
        const next = Math.min(curr + step, cap);
        if (next > curr) setVal(next);
        schedule();
      };
      return { start(){ if (!timer) schedule(); }, stop(){ if (timer){ clearTimeout(timer); timer=null; } } };
    }

    const live = makeTicker();
    setTimeout(() => { live.start(); }, 1800);
  })();

  /* ---------- Compteur “Encadreurs disponibles” (oscillation 75 ↔ 126) ---------- */
  (function liveEncadreurs(){
    const el = document.getElementById('live-encadreurs');
    if (!el) return;

    const minVal = 75, maxVal = 126;
    const getVal = () => {
      const raw = (el.textContent || `${minVal}`).replace(/\D/g,'');
      const n = parseInt(raw,10);
      return isNaN(n) ? minVal : n;
    };
    const setVal = (n) => { el.textContent = formatFR(n); };

    function schedule(){
      const delay = 6000 + Math.random()*6000; // 6–12 s
      setTimeout(tick, delay);
    }
    function tick(){
      if (document.hidden) return schedule();
      const curr = getVal();
      const step = Math.floor(Math.random()*7) - 3; // -3..+3
      let next = curr + step;
      if (next < minVal) next = minVal + Math.floor(Math.random()*3);
      if (next > maxVal) next = maxVal - Math.floor(Math.random()*3);
      setVal(next);
      schedule();
    }

    // départ aléatoire dans la borne
    setVal(minVal + Math.floor(Math.random()*(maxVal - minVal + 1)));
    setTimeout(schedule, 2000); // lance après un court délai
  })();
})();

// Filtre naïf par mot-clé sur les listes .card ou .topic
(function(){
  const toolbars = document.querySelectorAll('.toolbar');
  toolbars.forEach(tb => {
    const search = tb.querySelector('input[type="search"]');
    if (!search) return;
    const scope = tb.nextElementSibling; // la section qui suit
    if (!scope) return;

    const items = scope.querySelectorAll('.card, .topic');
    const index = Array.from(items).map(el => ({
      el,
      text: (el.textContent || '').toLowerCase()
    }));

    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      index.forEach(({el,text}) => {
        el.style.display = (q==='' || text.includes(q)) ? '' : 'none';
      });
    });
  });
})();
