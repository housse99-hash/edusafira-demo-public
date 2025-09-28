export default function SloHub() {
  const sites = [
    'https://edusafira.com',
    'https://ecole.edusafira.com',
    'https://communaute.edusafira.com',
    'https://actusecoles.edusafira.com',
    'https://boutique.edusafira.com',
  ];
  return (
    <html lang="fr">
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
        <style>{`iframe{display:none}`}</style>
        <title>Déconnexion…</title>
      </head>
      <body>
        <main style={{fontFamily:'system-ui',maxWidth:640,margin:'40px auto',textAlign:'center'}}>
          <h1>Vous êtes déconnecté(e).</h1>
          <p>Nettoyage des sessions sur tous les sites…</p>
          {sites.map(u => (<iframe key={u} src={`${u.replace(/\/$/,'')}/slo?local=1`} />))}
          <p style={{marginTop:24}}>
            <a href="/">Retour à l’accueil</a> · <a href="/api/auth/login">Se reconnecter</a>
          </p>
          <script dangerouslySetInnerHTML={{__html:`try{localStorage.clear();sessionStorage.clear();}catch(e){}`}} />
        </main>
      </body>
    </html>
  );
}
