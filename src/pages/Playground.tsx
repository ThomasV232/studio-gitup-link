/* src/pages/Playground.tsx */
import { useState } from "react";

const labs = [
  {
    id: "midjourney",
    title: "Midjourney V7 - Prompt Lab",
    punchline: "Des moodboards précis pour convaincre vos comités de direction.",
    description:
      "Moodboards générés, recolorisés et animés. Nous combinons prompts narratifs et contraintes de marque pour livrer des planches immédiatement exploitables en comité.",
    upgrades: [
      "Variations dédiées par persona",
      "Palette synchronisée à votre brandbook",
      "Export storyboard animé en 45 secondes",
    ],
    gradient: "radial-gradient(circle at top, hsla(var(--visual-accent-soft)/0.3), transparent 70%)",
  },
  {
    id: "kling",
    title: "Kling 2.5 - Volumetric Stage",
    punchline: "Visualisez votre plateau avant la réservation des décors.",
    description:
      "Prévisualisation 3D, trajectoires caméra automatisées et éclairage calculé par IA pour valider les choix techniques avant production.",
    upgrades: [
      "Pathfinding caméra autonome",
      "Simulation lumière temps réel",
      "Export plan de tournage détaillé",
    ],
    gradient: "radial-gradient(circle at bottom left, hsla(var(--visual-secondary)/0.25), transparent 70%)",
  },
  {
    id: "seedance",
    title: "Seedance Pro - Choreo Engine",
    punchline: "Synchronisez vos caméras avec un pilotage IA fiable.",
    description:
      "Seedance anticipe les mouvements, règle le tempo et propose des trajectoires caméra optimisées pour ne manquer aucune séquence clé.",
    upgrades: [
      "Pré-visualisation motion capture",
      "Macro Atem scriptée en live",
      "Export plan chorégraphique PDF + audio guide",
    ],
    gradient: "radial-gradient(circle at 80% 30%, hsla(var(--visual-tertiary)/0.22), transparent 70%)",
  },
  {
    id: "veo",
    title: "Veo 3 - Post-production AI",
    punchline: "Un pipeline postproduction unifié pour accélérer vos livrables.",
    description:
      "L'IA synchronise les points de montage, génère les transitions, ajuste vos LUTs et prépare les exports multi-format en parallèle.",
    upgrades: [
      "Timeline multivers en un clic",
      "Détection automatique des moments clés",
      "Livraison 9:16 optimisée en 30 min",
    ],
    gradient: "radial-gradient(circle at 20% 80%, hsla(var(--visual-secondary)/0.24), transparent 70%)",
  },
];

const Playground = () => {
  const [selected, setSelected] = useState(labs[0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 animate-[spin_30s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, hsla(var(--visual-accent)/0.12), transparent 60%, hsla(var(--visual-secondary)/0.12))",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)] visual-accent-veil">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Playground IA & R&D
              </span>
              <h1 className="text-5xl font-black leading-tight">Nos laboratoires pour hybrider réel et IA</h1>
              <p className="text-lg text-slate-200/80">
                Nous testons en continu de nouveaux workflows : prompts avancés, lip-sync automatisé et caméras autonomes. Objectif : des tournages fluides et des livrables fiables.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Mise à jour</p>
              <p className="mt-3 text-white">Version septembre 2025 : compatibilité Suno AI 2.0 et workflow Kling 2.5 en direct.</p>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Choisissez votre terrain de jeu</p>
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
                  <span
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, hsla(var(--visual-accent)/0.25), hsla(var(--visual-secondary)/0.2))",
                    }}
                  />
                  <p className="text-sm font-semibold text-white">{lab.title}</p>
                  <p className="text-xs text-slate-200/70">{lab.punchline}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200/70">
              <p className="uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Suivi</p>
              <p className="mt-2">Chaque expérimentation documentée est partagée avec nos clients afin d'alimenter leurs futures productions.</p>
            </div>
          </div>
          <div
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(56,189,248,0.18)] visual-accent-veil"
            style={{ backgroundImage: selected.gradient }}
          >
            <div className="relative space-y-8">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Lab actif</div>
              <h2 className="text-4xl font-extrabold">{selected.title}</h2>
              <p className="text-lg text-slate-200/80">{selected.description}</p>
              <div className="grid gap-4 text-sm text-slate-200/80 sm:grid-cols-2">
                {selected.upgrades.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
                      <span className="h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" /> Upgrade
                    </p>
                    <p className="mt-3">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-200/70">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Support continu</p>
                <p className="mt-2">Une équipe dédiée accompagne chaque expérimentation pour assurer la transition vers vos projets clients.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Playground;
