import ClearStorage from './ClearStorage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Déconnexion…',
  robots: { index: false, follow: false },
};

const sites = [
  'https://edusafira.com',
  'https://ecole.edusafira.com',
  'https://communaute.edusafira.com',
  'https://actusecoles.edusafira.com',
  'https://boutique.edusafira.com',
];

export default function Page() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:640,margin:'40px auto',textAlign:'center'}}>
      <h1>Vous êtes déconnecté(e).</h1>
      <p>Nettoyage des sessions sur tous les sites…</p>

      {/* Appels silencieux aux SLO locaux */}
      {sites.map(u => (
        <iframe
          key={u}
          src={`${u.replace(/\/$/,'')}/slo?local=1`}
          style={{display:'none',width:0,height:0,border:0}}
        />
      ))}

      <p style={{marginTop:24}}>
        <a href="/">Retour à l’accueil</a> · <a href="/api/auth/login">Se reconnecter</a>
      </p>

      {/* Purge du stockage navigateur */}
      <ClearStorage />
    </main>
  );
}
