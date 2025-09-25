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

  const filtered = useMemo(
    () => (filter === "Tous" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)),
    [filter, portfolioItems],
  );

  const heroEpisodes = useMemo(() => {
    const source = filter === "Tous" ? portfolioItems : filtered;
    return source.slice(0, 3);
  }, [filter, filtered, portfolioItems]);

  const highlightProject = heroEpisodes[0] ?? portfolioItems[0] ?? null;

  const getEmbedUrl = useCallback((url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return url;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, hsl(var(--visual-accent) / 0.35), transparent 55%), radial-gradient(circle at 82% 82%, hsl(var(--visual-secondary) / 0.25), transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div className="portfolio-aurora-cloud" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-28">
        <section className="overflow-hidden rounded-[3.75rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-950/60 to-slate-950/90 p-12 shadow-[0_60px_160px_rgba(56,189,248,0.22)] visual-accent-halo">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Studio VBG — Saison 2025
              </span>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                Ressentez l'immersion d'une production IA & terrain parfaitement synchronisée
              </h1>
              <p className="max-w-xl text-base text-slate-200/85 sm:text-lg">
                Notre portfolio mélange captations haute fidélité, direction artistique générative et workflows Midjourney, Kling,
                Seedance et Veo orchestrés dans DaVinci & Adobe. Chaque capsule est contrôlable depuis le tableau de bord — ajoutez,
                modifiez, publiez, recommencez.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 rounded-full border border-transparent bg-gradient-to-r from-cyan-400/80 via-fuchsia-500/80 to-amber-400/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.4em] text-slate-950 shadow-lg shadow-cyan-400/40 transition duration-500 hover:scale-[1.03]"
                >
                  Demander un devis
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition duration-500 hover:bg-white/15"
                >
                  Contact rapide
                </Link>
              </div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-cyan-200/70 visual-accent-text">
                Midjourney V7 · Kling 2.5 · Seedance Pro · Veo 3 · Suno AI · LypSync V2
              </p>
              {heroEpisodes.length > 0 ? (
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                  {heroEpisodes.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="portfolio-episode group text-left"
                    >
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-slate-100/70">
                        <span>Épisode {String(index + 1).padStart(2, "0")}</span>
                        <span>{project.year}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-white">{project.title}</h2>
                      <p className="mt-3 text-xs text-slate-200/75">{project.tagline}</p>
                      <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-cyan-100/75 visual-accent-text-strong">
                        {project.aiTools.slice(0, 3).map((tool) => (
                          <span key={tool} className="rounded-full bg-white/10 px-3 py-1">
                            {tool}
                          </span>
                        ))}
                        {project.aiTools.length > 3 && (
                          <span className="rounded-full border border-white/20 px-3 py-1">+{project.aiTools.length - 3}</span>
                        )}
                      </div>
                      <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-cyan-100/70 visual-accent-text">
                        <span>{project.duration}</span>
                        <span>{project.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-10 rounded-[2.75rem] border border-dashed border-white/20 bg-white/5 p-6 text-xs text-slate-200/65">
                  Ajoutez vos premiers projets depuis le tableau de bord pour activer l'aperçu cinématique.
                </div>
              )}
            </div>
            <div className="relative">
              <span className="portfolio-orbit planet-one" />
              <span className="portfolio-orbit planet-two" />
              <div className="portfolio-hero-card">
                {highlightProject ? (
                  <>
                    <img
                      src={highlightProject.thumbnail}
                      alt={highlightProject.title}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">
                        {highlightProject.category}
                      </p>
                      <h2 className="text-3xl font-semibold text-white">{highlightProject.title}</h2>
                      <p className="text-sm text-slate-200/80">{highlightProject.tagline}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-cyan-100/75 visual-accent-text-strong">
                        {highlightProject.aiTools.slice(0, 4).map((tool) => (
                          <span key={tool} className="rounded-full bg-white/10 px-3 py-1">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-300/70">
                    Déposez votre première capsule vidéo pour activer la vitrine immersive.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 space-y-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Réacteur de productions Studio VBG</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-200/75">
                Explorez nos capsules classées par univers. Chaque vignette déclenche une fiche immersive avec la vidéo YouTube, les
                livrables et la stratégie IA correspondante.
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em]">
              {categories.map((category) => {
                const isActive = filter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={`portfolio-filter-trigger ${
                      isActive ? "portfolio-filter-active" : "portfolio-filter-idle"
                    }`}
                    aria-pressed={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </nav>
          </header>

          <div className="portfolio-gallery grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
                className="portfolio-card group"
              >
                <div className="portfolio-card-media">
                  <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover object-center" />
                  <div className="portfolio-card-overlay" />
                  <div className="portfolio-card-copy">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/70 visual-accent-text">{project.category}</p>
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                    <p className="text-xs text-slate-200/75">{project.tagline}</p>
                  </div>
                </div>
                <div className="portfolio-card-meta text-xs text-slate-200/80">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-200/60">
                    <span>{project.year}</span>
                    <span>{project.duration}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-cyan-100/75 visual-accent-text-strong">
                    {project.aiTools.slice(0, 3).map((tool) => (
                      <span key={tool} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                        {tool}
                      </span>
                    ))}
                    {project.aiTools.length > 3 && (
                      <span className="rounded-full border border-white/20 px-3 py-1">+{project.aiTools.length - 3}</span>
                    )}
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
                    Diffusions
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    {project.socialStack.map((channel) => (
                      <span key={channel} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="portfolio-card-cta">Ouvrir la capsule</div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 rounded-[3.25rem] border border-white/10 bg-white/10 p-12 text-center text-sm text-slate-200/70">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Aucun projet pour l'instant</p>
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

        <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProject(null)}>
          <DialogContent className="portfolio-dialog max-w-4xl border border-white/10 bg-slate-950/95 text-white backdrop-blur">
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
                          <span key={tool} className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1 text-xs text-cyan-100/80">
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
