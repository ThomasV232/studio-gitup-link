/* src/pages/Process.tsx */
const timeline = [
  {
    id: "brief",
    title: "Brief initial",
    description:
      "Nous analysons votre contexte, vos objectifs et vos audiences. Notre IA priorise les informations clés et structure les premières pistes créatives.",
    gradient: "radial-gradient(circle at top, hsla(var(--visual-accent)/0.25), transparent 70%)",
  },
  {
    id: "design",
    title: "Conception narrative",
    description:
      "Moodboards Midjourney V7, scripts générés et découpage technique. Chaque séquence est associée à un objectif précis et à des indicateurs de performance.",
    gradient: "radial-gradient(circle at 60% 20%, hsla(var(--visual-secondary)/0.28), transparent 70%)",
  },
  {
    id: "shoot",
    title: "Production",
    description:
      "Seedance Pro anticipe les mouvements caméra, Kling 2.5 projette les décors et nos équipes plateau pilotent chaque séquence avec précision.",
    gradient: "radial-gradient(circle at 30% 80%, hsla(var(--visual-tertiary)/0.24), transparent 70%)",
  },
  {
    id: "post",
    title: "Postproduction",
    description:
      "Veo 3 accélère le montage, Davinci assure la colorimétrie, Suno AI compose le sound design et LypSync V2 harmonise les voix.",
    gradient: "radial-gradient(circle at bottom right, hsla(var(--visual-accent-soft)/0.24), transparent 70%)",
  },
  {
    id: "launch",
    title: "Diffusion",
    description:
      "Nous publions, suivons la performance et ajustons les formats. Les reportings sont partagés en temps réel via le tableau de bord.",
    gradient: "radial-gradient(circle at 50% 50%, hsla(var(--visual-secondary)/0.22), transparent 70%)",
  },
];

const Process = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "conic-gradient(from 60deg at 50% 50%, hsla(var(--visual-accent)/0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)] visual-accent-veil">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
              Processus Studio VBG
            </span>
            <h1 className="text-5xl font-black leading-tight">Notre méthodologie de production vidéo</h1>
            <p className="text-lg text-slate-200/80">
              De la définition du brief à la diffusion, chaque étape est orchestrée pour garantir une qualité constante et une visibilité complète sur l&apos;avancement.
            </p>
          </div>
        </header>

        <section className="mt-16 space-y-12">
          {timeline.map((step, index) => (
            <article
              key={step.id}
              className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_20px_110px_rgba(56,189,248,0.15)] visual-accent-veil"
              style={{ backgroundImage: step.gradient }}
            >
              <span className="absolute left-12 top-8 text-6xl font-black text-white/10">0{index + 1}</span>
              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-4">
                  <h2 className="text-3xl font-extrabold">{step.title}</h2>
                  <p className="text-lg text-slate-200/80">{step.description}</p>
                </div>

                <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-6 text-sm text-slate-200/70">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Livrables associés</p>
                  <p className="mt-3">
                    {index === 0 && "Compte rendu synthétique, plan d'action initial et échéancier partagé."}
                    {index === 1 && "Scénario validé, moodboards, prévisualisations et planning de tournage."}
                    {index === 2 && "Feuilles de service, captations sécurisées, rushes organisés et backups."}
                    {index === 3 && "Montages intermédiaires, validations collaboratives et exports multi-plateformes."}
                    {index === 4 && "Calendrier de diffusion, reporting de performance et recommandations d'optimisation."}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center text-sm text-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Prêt à collaborer ?</p>
          <p className="mt-6 text-3xl font-semibold text-white">
            Connectez-vous, partagez votre brief et nous lançons la production dans les meilleurs délais.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Process;
