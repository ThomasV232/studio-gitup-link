import { useState } from "react";

const labs = [
  {
    id: "midjourney",
    title: "Midjourney V7 - Prompt Lab",
    punchline: "On fait sourire vos board members avec des planches qui respirent la SF raffinée.",
    description:
      "Moodboards générés, re-colorisés et animés. Nous mixons prompts narratifs et contraintes brand pour produire des planches qui donnent envie d'approuver le budget.",
    upgrades: [
      "Variations dynamiques par persona",
      "Palette synchronisée avec votre brandbook",
      "Export storyboard animé en 45 secondes",
    ],
    ambient: "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.3),transparent_70%)]",
  },
  {
    id: "kling",
    title: "Kling 2.5 - Volumetric Stage",
    punchline: "On simule le plateau avant même de le louer.",
    description:
      "Prévisualisation 3D, trajectoires de caméras automatisées, éclairage calculé par IA. Vous voyez votre shoot avant même qu'on appuie sur REC.",
    upgrades: [
      "Pathfinding caméra autonome",
      "Simulation lumière temps réel",
      "Export plan de tournage gamifié",
    ],
    ambient: "bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.25),transparent_70%)]",
  },
  {
    id: "seedance",
    title: "Seedance Pro - Choreo Engine",
    punchline: "La danse des caméras orchestrée par l'IA.",
    description:
      "Seedance anticipe les mouvements, cale le rythme, propose des riffs caméra improbables. On ne perd plus un moment fort.",
    upgrades: [
      "Pré-visualisation motion capture",
      "Macro Atem scriptée en live",
      "Export plan chorégraphique pdf + audio guide",
    ],
    ambient: "bg-[radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.25),transparent_70%)]",
  },
  {
    id: "veo",
    title: "Veo 3 - Post-production AI",
    punchline: "Montage, colorimétrie et VFX : tout parle le même langage.",
    description:
      "L'IA nous aide à synchroniser les points de montage, générer des transitions, calibrer vos LUTs et sortir 9 formats en parallèle.",
    upgrades: [
      "Timeline multivers en un clic",
      "Détection gag & punchline automatique",
      "Livraison 9:16 optimisée en 30 min",
    ],
    ambient: "bg-[radial-gradient(circle_at_20%_80%,rgba(248,113,113,0.25),transparent_70%)]",
  },
];

const Playground = () => {
  const [selected, setSelected] = useState(labs[0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 animate-[spin_30s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(56,189,248,0.12),transparent_60%,rgba(236,72,153,0.12))]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                Playground IA & R&D
              </span>
              <h1 className="text-5xl font-black leading-tight">Nos laboratoires privés pour hybrider réel & IA</h1>
              <p className="text-lg text-slate-200/80">
                On expérimente chaque semaine : prompts absurdes, lip-sync robotique, caméras autonomes. Résultat : des tournages ultra fluides et des idées fraîches.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Mise à jour</p>
              <p className="mt-3 text-white">Version septembre 2025 : compatibilité Suno AI 2.0 et workflow Kling 2.5 live.</p>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Choisissez votre terrain de jeu</p>
            <div className="mt-6 grid gap-3">
              {labs.map((lab) => (
                <button
                  key={lab.id}
                  type="button"
                  onClick={() => setSelected(lab)}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 px-5 py-4 text-left transition-all ${
                    selected.id === lab.id ? "border-cyan-300 bg-white/15" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(120deg, rgba(56,189,248,0.25), rgba(236,72,153,0.2))" }} />
                  <p className="text-sm font-semibold text-white">{lab.title}</p>
                  <p className="text-xs text-slate-200/70">{lab.punchline}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200/70">
              <p className="uppercase tracking-[0.3em] text-cyan-200/70">Bonus</p>
              <p className="mt-2">Chaque expérimentation donne lieu à une mini capsule making-of envoyée à nos clients fidèles.</p>
            </div>
          </div>
          <div className={`relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(56,189,248,0.18)] ${selected.ambient}`}>
            <div className="relative space-y-8">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Lab actif</div>
              <h2 className="text-4xl font-extrabold">{selected.title}</h2>
              <p className="text-lg text-slate-200/80">{selected.description}</p>
              <div className="grid gap-4 text-sm text-slate-200/80 sm:grid-cols-2">
                {selected.upgrades.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" /> Upgrade
                    </p>
                    <p className="mt-3">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-200/70">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Humour garanti</p>
                <p className="mt-2">On a même un bot qui fait des blagues sur Davinci Resolve pour détendre le plateau.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Playground;
