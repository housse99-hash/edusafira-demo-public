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
