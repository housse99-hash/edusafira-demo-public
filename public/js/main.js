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
