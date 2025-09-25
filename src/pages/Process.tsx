const timeline = [
  {
    id: "brief",
    title: "Brief cosmique",
    description:
      "On décode votre univers, vos objectifs, vos inside jokes. Notre IA résume, priorise et propose des premières punchlines.",
    gradient: "radial-gradient(circle at top, hsla(var(--visual-accent)/0.25), transparent 70%)",
  },
  {
    id: "design",
    title: "Design narratif",
    description:
      "Moodboards Midjourney V7, script génératif, découpage shotlist. Chaque scène a son hook, son moment humour, son CTA.",
    gradient: "radial-gradient(circle at 60% 20%, hsla(var(--visual-secondary)/0.28), transparent 70%)",
  },
  {
    id: "shoot",
    title: "Tournage chorégraphié",
    description:
      "Seedance Pro prédit les mouvements, Kling 2.5 projette les décors, nos équipes rigolent mais restent focus.",
    gradient: "radial-gradient(circle at 30% 80%, hsla(var(--visual-tertiary)/0.24), transparent 70%)",
  },
  {
    id: "post",
    title: "Post-prod synchrone",
    description:
      "Veo 3 accélère le montage, Davinci peaufine, Suno AI livre le sound design, LypSync V2 anime les punchlines.",
    gradient: "radial-gradient(circle at bottom right, hsla(var(--visual-accent-soft)/0.24), transparent 70%)",
  },
  {
    id: "launch",
    title: "Launch orchestré",
    description:
      "On publie, on tracke, on ajuste. Les memes partent, les stats montent, le chat se remplit de gifs heureux.",
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
            <h1 className="text-5xl font-black leading-tight">La méthode orbitale qui fait sourire vos KPI</h1>
            <p className="text-lg text-slate-200/80">
              Des micro-hooks en pré-prod aux chats post-devis, chaque étape est calibrée. On mélange IA, rigueur, humour et dashboards.
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
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Ce qui se passe réellement</p>
                  <p className="mt-3">
                    {index === 0 && "Notre IA résume les 14 slides reçues, extrait les insights et propose 3 hooks."}
                    {index === 1 && "On produit des scripts comiques, des visuels 3D et un plan d'attaque social média."}
                    {index === 2 && "Plateau modulable, robots, macros Atem, humour pour détendre le client."}
                    {index === 3 && "Montage collaboratif, exports multiples, automatisation sous Notion & Zapier."}
                    {index === 4 && "On livre, on tracke, on envoie un meme de célébration sur le chat de suivi."}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center text-sm text-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Prêt·e à rejoindre l'orbite ?</p>
          <p className="mt-6 text-3xl font-semibold text-white">
            Connectez-vous, briefez-nous, on déclenche le mode hyperdrive de Studio VBG.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Process;
