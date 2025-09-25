import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";

import { useStudio } from "@/context/StudioContext";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "Tous les projets";

const Portfolio = () => {
  const { portfolioItems, serviceCategories } = useStudio();

  const categories = useMemo(() => {
    const unique = new Set<string>([...serviceCategories]);
    portfolioItems.forEach((item) => unique.add(item.category));
    return [ALL_CATEGORY, ...unique];
  }, [portfolioItems, serviceCategories]);

  const [activeCategory, setActiveCategory] = useState(() => categories[0] ?? ALL_CATEGORY);

  useEffect(() => {
    if (!categories.length) {
      return;
    }

    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredItems = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 sm:px-10 lg:py-24">
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.55em] text-slate-400">Portfolio</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Films génératifs orchestrés pour vos lancements stratégiques
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Chaque projet conjugue direction artistique, IA générative et diffusion multicanale. Explorez nos études
            de cas pour visualiser ce que notre studio peut activer pour votre marque.
          </p>
        </header>

        <section className="space-y-8">
          <div className="portfolio-filter-scroll-wrapper overflow-x-auto">
            <div className="flex w-max gap-3 py-1">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "portfolio-filter-trigger shrink-0",
                      isActive ? "portfolio-filter-active" : "portfolio-filter-idle"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="portfolio-gallery grid gap-10 lg:gap-14">
            {filteredItems.map((item) => (
              <article key={item.id} className="portfolio-card group">
                <div className="portfolio-card-media">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className={cn("h-full w-full", item.gradient, "bg-gradient-to-br")} aria-hidden />
                  )}
                  <div className="portfolio-card-overlay" />
                  <div className="portfolio-card-copy">
                    <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                      <span>{item.category}</span>
                      <span className="opacity-70">•</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{item.title}</h3>
                    <p className="max-w-xl text-sm text-white/75 sm:text-base">{item.tagline}</p>
                  </div>
                  <div className="portfolio-card-cta">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold tracking-[0.35em] text-white/90 backdrop-blur">
                      <Play className="h-4 w-4" />
                      Visionner
                    </span>
                  </div>
                </div>

                <div className="portfolio-card-meta">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                    <span>{item.duration}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-flex" aria-hidden />
                    <span>{item.aiTools.length} outils IA</span>
                    <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-flex" aria-hidden />
                    <span>Diffusion : {item.socialStack.join(" · ")}</span>
                  </div>
                  <p className="text-sm text-white/75 sm:text-base">{item.description}</p>
                  {item.aiTools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.aiTools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.deliverables.length > 0 && (
                    <div className="flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/55">
                      {item.deliverables.map((deliverable) => (
                        <span key={deliverable}>{deliverable}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}

            {filteredItems.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-white/70">
                Aucun projet ne correspond encore à ce filtre. Revenez bientôt, nous produisons en continu.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
