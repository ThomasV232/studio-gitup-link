import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BrandMark } from "@/components/branding/BrandMark";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageShell from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";
import { cn } from "@/lib/utils";
import { CATEGORIES, type CategorySlug } from "@/components/header/nav.config";

const ALL_CATEGORY = "Tous les projets";

const getEmbedUrl = (url: string): string | null => {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (!videoId) {
        return url;
      }

      const params = new URLSearchParams(parsed.searchParams);
      params.delete("v");
      const query = params.toString();

      return `https://www.youtube.com/embed/${videoId}${query ? `?${query}` : ""}`;
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.replace(/^\//, "");
      if (!videoId) {
        return url;
      }

      const params = parsed.search ? parsed.search.replace(/^\?/, "") : "";
      return `https://www.youtube.com/embed/${videoId}${params ? `?${params}` : ""}`;
    }

    return url;
  } catch (error) {
    console.warn("Unable to build embed url for portfolio video", error);
    return url;
  }
};

const Portfolio = () => {
  const { portfolioItems } = useStudio();
  const navigate = useNavigate();
  const { category: categorySlug } = useParams<{ category?: string }>();

  const slugToLabel = useMemo(() => {
    const map = new Map<string, string>();
    CATEGORIES.forEach((category) => map.set(category.slug, category.label));
    return map;
  }, []);

  const labelToSlug = useMemo(() => {
    const map = new Map<string, string>();
    CATEGORIES.forEach((category) => map.set(category.label, category.slug));
    return map;
  }, []);
  const slugToService = useMemo(() => {
    const map = new Map<string, (typeof servicesData)[number]>();
    servicesData.forEach((service) => map.set(service.slug, service));
    return map;
  }, []);

  const categories = useMemo(() => {
    const ordered = CATEGORIES.map((category) => category.label);
    const extras = Array.from(
      new Set(
        portfolioItems
          .map((item) => item.category)
          .filter((label): label is string => Boolean(label) && !ordered.some(o => o === label))
      )
    );

    return [ALL_CATEGORY, ...ordered, ...extras];
  }, [portfolioItems]);

  const [activeCategory, setActiveCategory] = useState(() => {
    if (categorySlug) {
      return slugToLabel.get(categorySlug) ?? ALL_CATEGORY;
    }
    return ALL_CATEGORY;
  });

  useEffect(() => {
    if (!categorySlug) {
      setActiveCategory(ALL_CATEGORY);
      return;
    }

    const label = slugToLabel.get(categorySlug);
    if (!label) {
      navigate("/realisations", { replace: true });
      return;
    }

    setActiveCategory(label);
  }, [categorySlug, navigate, slugToLabel]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(ALL_CATEGORY);
    }
  }, [categories, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === ALL_CATEGORY) {
      navigate("/realisations");
      return;
    }

    const slug = labelToSlug.get(category);
    navigate(slug ? `/realisations/${slug}` : "/realisations");
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);
  const activeService = useMemo(() => {
    const slug = labelToSlug.get(activeCategory);
    if (!slug) return null;
    return slugToService.get(slug) ?? null;
  }, [activeCategory, labelToSlug, slugToService]);

  const heroTitle =
    activeCategory === ALL_CATEGORY
      ? "Showreel & études de cas orchestrées"
      : `Réalisations ${activeCategory} — pipeline complet`;

  return (
    <PageShell
      gradientClassName="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%)]"
      contentClassName="pb-24"
    >
      <div className="page-container">
        <header className="space-y-8">
          <BrandMark dual className="max-w-xs" />
          <SectionHeading
            eyebrow="Portfolio"
            title={heroTitle}
            description="Films corporate, événements, immobilier, réseaux sociaux, mariage ou motion design : chaque projet est livré avec un plan de diffusion 2025, un pilotage IA supervisé et des indicateurs de performance."
          />
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
                    onClick={() => handleCategoryChange(category)}
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
            {filteredItems.map((item) => {
              const embedUrl = getEmbedUrl(item.videoUrl);
              const dialogTitleId = `portfolio-dialog-title-${item.id}`;
              const dialogTaglineId = `portfolio-dialog-tagline-${item.id}`;
              const dialogDescriptionId = `portfolio-dialog-description-${item.id}`;
              const ariaDescription = `${dialogTaglineId} ${dialogDescriptionId}`.trim();

              return (
                <Dialog key={item.id}>
                  <article className="portfolio-card group">
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
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="portfolio-card-cta"
                          aria-label={`Visionner ${item.title}`}
                        >
                          <span className="portfolio-card-ctaLabel">
                            <Play className="h-4 w-4" aria-hidden />
                            Visionner
                          </span>
                        </button>
                      </DialogTrigger>
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

                  <DialogContent
                    className="portfolio-dialog"
                    aria-labelledby={dialogTitleId}
                    aria-describedby={ariaDescription || undefined}
                  >
                    <div className="portfolio-dialog-aurora" aria-hidden />
                    <div className="portfolio-dialog-body">
                      <div className="portfolio-dialog-media">
                        <div className="portfolio-dialog-media-frame">
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              title={`Lecture de ${item.title}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              referrerPolicy="strict-origin-when-cross-origin"
                              loading="lazy"
                            />
                          ) : item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.title} loading="lazy" />
                          ) : (
                            <div className="portfolio-dialog-media-fallback" aria-hidden />
                          )}
                        </div>
                      </div>

                      <div className="portfolio-dialog-details">
                        <DialogTitle id={dialogTitleId} className="portfolio-dialog-title">
                          {item.title}
                        </DialogTitle>
                        <DialogDescription id={dialogTaglineId} className="portfolio-dialog-tagline">
                          {item.tagline}
                        </DialogDescription>
                        <p id={dialogDescriptionId} className="portfolio-dialog-description">
                          {item.description}
                        </p>

                        <div className="portfolio-dialog-meta">
                          <div className="portfolio-dialog-section">
                            <span className="portfolio-dialog-section-label">Durée</span>
                            <div className="portfolio-dialog-chipRow">
                              <span className="portfolio-dialog-chip">{item.duration}</span>
                            </div>
                          </div>

                          <div className="portfolio-dialog-section">
                            <span className="portfolio-dialog-section-label">Catégorie / Année</span>
                            <div className="portfolio-dialog-chipRow">
                              <span className="portfolio-dialog-chip">{item.category}</span>
                              <span className="portfolio-dialog-chip">{item.year}</span>
                            </div>
                          </div>

                          {item.aiTools.length > 0 && (
                            <div className="portfolio-dialog-section portfolio-dialog-section--wide">
                              <span className="portfolio-dialog-section-label">Pipeline IA</span>
                              <div className="portfolio-dialog-chipRow">
                                {item.aiTools.map((tool) => (
                                  <span key={tool} className="portfolio-dialog-chip">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.deliverables.length > 0 && (
                            <div className="portfolio-dialog-section portfolio-dialog-section--wide">
                              <span className="portfolio-dialog-section-label">Services & Livrables</span>
                              <div className="portfolio-dialog-chipRow">
                                {item.deliverables.map((deliverable) => (
                                  <span key={deliverable} className="portfolio-dialog-chip" data-variant="soft">
                                    {deliverable}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.socialStack.length > 0 && (
                            <div className="portfolio-dialog-section portfolio-dialog-section--wide">
                              <span className="portfolio-dialog-section-label">Diffusion ciblée</span>
                              <div className="portfolio-dialog-chipRow">
                                {item.socialStack.map((channel) => (
                                  <span key={channel} className="portfolio-dialog-chip" data-variant="soft">
                                    {channel}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="portfolio-dialog-section portfolio-dialog-section--wide">
                            <span className="portfolio-dialog-section-label">Passer à l'action</span>
                            <div className="portfolio-dialog-chipRow">
                              <Link
                                to={`/contact?projet=${encodeURIComponent(item.title)}`}
                                className="portfolio-dialog-chip"
                                data-variant="primary"
                              >
                                Demander un brief similaire
                              </Link>
                              <Link
                                to={`/services/${labelToSlug.get(item.category) ?? ""}`}
                                className="portfolio-dialog-chip"
                                data-variant="soft"
                              >
                                Voir le service associé
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-white/70">
                Aucun projet ne correspond encore à ce filtre. Revenez bientôt, nous produisons en continu.
              </div>
            )}
          </div>
        </section>

        <section className="surface-panel p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <SectionHeading
                eyebrow="Processus / Méthode"
                title={activeService ? `Workflow ${activeService.title}` : "Une méthode fluide pour chaque catégorie"}
                description="Chaque tournage est encadré par un chef de projet unique, un plan de repérage, un pipeline IA supervisé et un plan de diffusion multi-format. Voici le déroulé que nous appliquons à vos réalisations."
              />
            </div>
            <div className="space-y-4">
              {(activeService?.phases ?? servicesData[0].phases).slice(0, 4).map((phase, index) => (
                <div key={phase.title} className="surface-card flex flex-col gap-2 p-5 text-sm text-white/80">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/60">Étape 0{index + 1}</span>
                  <p className="text-sm text-white">{phase.title}</p>
                  <p>{phase.description}</p>
                  <p className="text-xs text-sky-200/85">Upgrade IA : {phase.aiUpgrade}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-panel space-y-6 p-8 sm:p-10">
          <SectionHeading
            eyebrow="Contact & Devis"
            title="Prêts pour un projet similaire ?"
            description="Racontez-nous vos objectifs, les canaux de diffusion visés et votre deadline. Nous revenons sous 24 h avec un budget transparent, un plan de tournage et des idées de déclinaisons verticales."
          />
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
            >
              Demander un devis
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
            >
              Explorer les services
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default Portfolio;
