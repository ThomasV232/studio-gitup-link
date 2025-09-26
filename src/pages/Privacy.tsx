const Privacy = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.16),transparent_60%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24">
        <header className="space-y-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Données & confidentialité
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Politique de confidentialité</h1>
          <p className="mx-auto max-w-3xl text-sm text-white/70">
            Studio VBG protège vos données et applique une approche privacy-by-design sur l'ensemble des parcours de contact,
            devis et collaboration.
          </p>
        </header>

        <section className="space-y-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-sm leading-relaxed text-white/80">
          <div>
            <h2 className="text-lg font-semibold text-white">Collecte des données</h2>
            <p className="mt-2">
              Nous collectons uniquement les informations nécessaires au traitement de vos demandes : identité, coordonnées,
              contexte de projet, préférences. Ces données sont fournies par vos soins via les formulaires du site ou lors des
              échanges directs.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Finalités</h2>
            <p className="mt-2">
              Les données servent à répondre à vos demandes de devis, organiser les productions et assurer le suivi administratif.
              Aucune donnée n'est vendue ou cédée à des tiers.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Durée de conservation</h2>
            <p className="mt-2">
              Les informations sont conservées pendant la durée de la relation commerciale puis archivées pendant 3 ans, sauf
              obligations légales spécifiques.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Sous-traitance & hébergement</h2>
            <p className="mt-2">
              Les données sont hébergées dans l'Union européenne. Les outils partenaires (CRM, facturation, hébergeur vidéo) sont
              sélectionnés pour leur conformité RGPD et des accords de traitement sont en place.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Vos droits</h2>
            <p className="mt-2">
              Vous pouvez exercer vos droits d'accès, de rectification, d'opposition ou de suppression en écrivant à
              hello@studio-vbg.com. Une réponse est apportée sous 30 jours ouvrés.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Cookies & analytics</h2>
            <p className="mt-2">
              Le site utilise des cookies analytiques anonymisés pour mesurer l'audience. Vous pouvez les désactiver via la
              bannière de consentement ou les paramètres de votre navigateur.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
