import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

const Portfolio = () => {
  const { portfolioItems } = useStudio();
  const categories = useMemo(() => ["Tous", ...new Set(portfolioItems.map((item) => item.category))], [portfolioItems]);
  const [filter, setFilter] = useState("Tous");

  const filtered = useMemo(
    () =>
      filter === "Tous"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === filter),
    [filter, portfolioItems],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 10% 10%, hsla(var(--visual-accent)/0.25), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 90% 90%, hsla(var(--visual-secondary)/0.2), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_25px_120px_rgba(14,165,233,0.2)] visual-accent-halo">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Portfolio futuriste
              </span>
              <h1 className="text-5xl font-black leading-tight">Nos histoires préférées (pour l'instant)</h1>
              <p className="text-lg text-slate-200/80">
                Chaque projet est une mini-série : humour, rythme, pipelines IA, data. Ajoutez, modifiez, supprimez vos cases depuis le dashboard.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Gestion autonome</p>
              <p className="mt-3">Rendez-vous dans le dashboard pour éditer le portfolio en 3 clics.</p>
              <Link
                to="/dashboard"
                className="mt-4 inline-flex items-center gap-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                Ouvrir le tableau de bord
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  filter === category
                    ? "border-cyan-200/60 visual-accent-border bg-cyan-500/20 visual-accent-bg text-white"
                    : "border-white/20 bg-white/10 text-slate-200/80 hover:bg-white/15"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => (
              <article
                key={project.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/40 to-slate-900/60 p-6 shadow-[0_20px_110px_rgba(56,189,248,0.15)] visual-accent-veil transition-transform duration-500 hover:-translate-y-2"
              >
                <span
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(120deg, hsla(var(--visual-secondary)/0.25), hsla(var(--visual-accent)/0.2))",
                  }}
                />
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                  <span>Episode 0{index + 1}</span>
                  <span>{project.category}</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-white">{project.title}</h2>
                <p className="mt-2 text-sm text-slate-200/80">{project.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-cyan-100/70 visual-accent-text-strong">
                  {project.aiTools.map((tool) => (
                    <span key={tool} className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 text-xs text-slate-200/70 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{project.year}</div>
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{project.duration}</div>
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{project.socialStack.join(" · ")}</div>
                </div>
                <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10">
                  <img src={project.thumbnail} alt={project.title} className="h-56 w-full object-cover object-center" />
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-200/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Deliverables</p>
                  <ul className="space-y-1">
                    {project.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 rounded-[3rem] border border-white/10 bg-white/10 p-12 text-center text-sm text-slate-200/70">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Filtre un peu trop spécifique</p>
              <p className="mt-4 text-2xl text-white">Ajoutez un nouveau projet depuis le dashboard pour remplir cette catégorie.</p>
              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                Ajouter un projet
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
