const Legal = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24">
        <header className="space-y-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Informations légales
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mentions légales</h1>
          <p className="mx-auto max-w-3xl text-sm text-white/70">
            Cette page rassemble les informations réglementaires relatives au Studio VBG. Pour toute question, contactez-nous à
            l'adresse hello@studio-vbg.com.
          </p>
        </header>

        <section className="space-y-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-sm leading-relaxed text-white/80">
          <div>
            <h2 className="text-lg font-semibold text-white">Éditeur</h2>
            <p className="mt-2">
              Studio VBG · Alex VBG — Entreprise individuelle enregistrée sous le numéro SIRET 912 445 778 00021.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Siège social</h2>
            <p className="mt-2">35 rue des Artistes, 75011 Paris, France.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2">
              Téléphone : +33 6 45 78 23 11 — Email : hello@studio-vbg.com.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Hébergement</h2>
            <p className="mt-2">
              Hébergement assuré par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Propriété intellectuelle</h2>
            <p className="mt-2">
              L'ensemble des contenus présents sur ce site (textes, visuels, vidéos) sont protégés par le droit d'auteur et
              demeurent la propriété exclusive de Studio VBG. Toute reproduction ou diffusion sans autorisation est interdite.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Responsabilité</h2>
            <p className="mt-2">
              Studio VBG s'efforce d'assurer l'exactitude des informations publiées mais ne peut être tenue responsable des
              erreurs ou omissions. Les liens externes proposés ne sauraient engager la responsabilité du studio.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
