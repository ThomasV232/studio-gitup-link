/* src/pages/Portfolio.tsx */
import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStudio, type PortfolioItem } from "@/context/StudioContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Portfolio = () => {
  const { portfolioItems, serviceCategories } = useStudio();
  const categories = useMemo(() => ["Tous", ...serviceCategories], [serviceCategories]);
  const [filter, setFilter] = useState("Tous");
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const highlightProject = useMemo(
    () =>
      (filter === "Tous" ? portfolioItems[0] : portfolioItems.find((item) => item.category === filter)) ||
      portfolioItems[0],
    [filter, portfolioItems],
  );

  const getEmbedUrl = useCallback((url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return url;
  }, []);

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
        style={{ background: "radial-gradient(circle at 10% 15%, hsla(var(--visual-accent)/0.35), transparent 55%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 90% 85%, hsla(var(--visual-secondary)/0.25), transparent 50%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24">
        {/* HERO / HIGHLIGHT */}
        <section className="overflow-hidden rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-950/40 to-slate-950/80 p-12 shadow-[0_45px_140px_rgba(56,189,248,0.22)] visual-accent-halo">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Studio VBG Originals
              </span>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                Des références vidéo pilotées par l&apos;IA et la production terrain
              </h1>
              <p className="text-base text-slate-200/85 sm:text-lg">
                Chaque projet illustre notre maîtrise des tournages premium et des optimisations IA. Tous les éléments peuvent
                être mis à jour, archivés ou dupliqués depuis le tableau de bord.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 rounded-full border border-transparent bg-gradient-to-r from-cyan-400/80 via-fuchsia-500/80 to-amber-400/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.4em] text-slate-950 shadow-lg shadow-cyan-400/40 transition hover:scale-[1.03]"
                >
                  Demander un devis
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
                >
                  Contact rapide
                </Link>
              </div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-cyan-200/70 visual-accent-text">
                Kling 2.5 · Midjourney V7 · Seedance Pro · Veo 3 · Suno AI
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-14 -top-14 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-16 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 shadow-[0_35px_120px_rgba(14,165,233,0.35)]">
                {highlightProject ? (
                  <>
                    <img
                      src={highlightProject.thumbnail}
                      alt={highlightProject.title}
                      className="h-[22rem] w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-200/70 visual-accent-text">
                        {highlightProject.category}
                      </p>
                      <h2 className="text-2xl font-bold text-white">{highlightProject.title}</h2>
                      <p className="text-xs text-slate-200/80">{highlightProject.tagline}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[22rem] items-center justify-center bg-slate-900/60 text-sm text-slate-400">
                    Ajoutez un projet depuis le tableau de bord pour activer cet aperçu.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FILTERS + GRID */}
        <section className="mt-20">
          <nav className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em]">
            {categories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`rounded-full px-5 py-2 transition ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400/40 via-fuchsia-500/40 to-amber-400/40 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                      : "border border-white/15 bg-white/5 text-slate-200/70 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((project) => (
              <article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveProject(project);
                  }
                }}
                className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 shadow-[0_25px_120px_rgba(56,189,248,0.2)] transition-transform duration-500 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute left-6 right-6 bottom-6 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">{project.category}</p>
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                    <p className="text-xs text-slate-200/75">{project.tagline}</p>
                  </div>
                </div>

                <div className="space-y-4 px-6 pb-6 pt-5 text-xs text-slate-200/75">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-slate-200/60">
                    <span>{project.year}</span>
                    <span>{project.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] text-cyan-100/75 visual-accent-text-strong">
                    {project.aiTools.slice(0, 3).map((tool) => (
                      <span key={tool} className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1">
                        {tool}
                      </span>
                    ))}
                    {project.aiTools.length > 3 && (
                      <span className="rounded-full border border-white/15 px-3 py-1">
                        +{project.aiTools.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Diffusions</div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {project.socialStack.map((channel) => (
                      <span key={channel} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 hidden items-center justify-center bg-slate-950/70 text-[11px] uppercase tracking-[0.35em] text-white backdrop-blur-md transition group-hover:flex">
                  Ouvrir la fiche
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 rounded-[3.25rem] border border-white/10 bg-white/10 p-12 text-center text-sm text-slate-200/70">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Aucun projet pour l&apos;instant</p>
              <p className="mt-4 text-2xl text-white">
                Ajoutez une nouvelle réalisation depuis le tableau de bord pour alimenter cette catégorie.
              </p>
              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                Ajouter un projet
              </Link>
            </div>
          )}
        </section>

        {/* DIALOG */}
        <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProject(null)}>
          <DialogContent className="max-w-4xl border border-white/10 bg-slate-950/95 text-white backdrop-blur">
            {activeProject && (
              <div className="space-y-8">
                <DialogHeader className="space-y-3 text-left">
                  <DialogTitle className="text-3xl font-bold text-white">{activeProject.title}</DialogTitle>
                  <DialogDescription className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
                    {activeProject.category} · {activeProject.duration} · {activeProject.year}
                  </DialogDescription>
                  <p className="text-base text-slate-200/80">{activeProject.tagline}</p>
                </DialogHeader>

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-[2.5rem] border border-white/10 bg-black">
                      <iframe
                        src={getEmbedUrl(activeProject.videoUrl)}
                        title={activeProject.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200/80">
                      {activeProject.description}
                    </p>
                  </div>

                  <aside className="space-y-5 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-200/80">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Pipeline IA</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeProject.aiTools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1 text-xs text-cyan-100/80"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Livrables</p>
                      <ul className="mt-2 space-y-2">
                        {activeProject.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-center gap-3 text-xs">
                            <span className="h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" /> {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Diffusions</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        {activeProject.socialStack.map((channel) => (
                          <span key={channel} className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Portfolio;
