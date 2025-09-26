import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroRibbon from "@/components/HeroRibbon";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";
import { cn } from "@/lib/utils";

const heroHooks = [
  "Premières exclusives chaque semaine",
  "Séances immersives calibrées pour votre salon",
  "Recommandations propulsées par l'IA curatoriale",
];

const heroCategories = [
  "Action",
  "Romance",
  "Comedy",
  "Horror",
  "Animation",
  "Sci-Fi",
  "More",
];

const techStack = [
  "Midjourney V7",
  "Kling 2.5",
  "Seedance Pro",
  "Veo 3",
  "Suno AI",
  "LypSync V2",
  "DaVinci Resolve",
  "Adobe Video Sensei",
];

const Index = () => {
  const { portfolioItems, recordContactRequest, user } = useStudio();
  const [hookIndex, setHookIndex] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [isRibbonVisible, setIsRibbonVisible] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectSpark: "",
    urgency: "hier" as const,
  });

  const heroProject = portfolioItems[0];
  const heroHookCount = heroHooks.length;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ticking = false;

    const updateVisibility = () => {
      setIsRibbonVisible(window.scrollY <= 40);
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (heroHookCount <= 1 || typeof window === "undefined") {
      return;
    }

    const timer = window.setInterval(() => {
      setHookIndex((index) => (index + 1) % heroHookCount);
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroHookCount]);

  useEffect(() => {
    setHeroImageLoaded(false);
    setHeroImageError(false);
  }, [heroProject?.thumbnail]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <HeroRibbon visible={isRibbonVisible} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 25%, hsla(var(--visual-secondary) / 0.32), transparent 55%), radial-gradient(circle at 82% 65%, hsla(var(--visual-accent) / 0.24), transparent 60%), linear-gradient(160deg, hsl(266 65% 11% / 0.9), hsl(335 70% 12% / 0.78))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 70%), linear-gradient(120deg, rgba(15,118,110,0.08), transparent 55%)",
          }}
        />
      <div className="relative">
        <header className="relative isolate overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 12% 18%, hsla(var(--visual-secondary) / 0.35), transparent 55%), radial-gradient(circle at 85% 35%, hsla(var(--visual-accent) / 0.28), transparent 60%), linear-gradient(160deg, hsla(326 66% 20% / 0.85), hsla(258 62% 14% / 0.8))",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06), transparent 68%), linear-gradient(120deg, rgba(255,255,255,0.04), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-36 lg:pb-32">
            <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/75 backdrop-blur">
                  Studio VBG Premiere
                </span>
                <h1 className="text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-[3.75rem]">
                  <span className="block text-xs font-semibold uppercase tracking-[0.55em] text-white/55">
                    Feel the sensation of
                  </span>
                  <span className="mt-4 block text-[2.75rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4.25rem]">
                    le <span className="text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-purple-500 bg-clip-text">cinéma</span> chez vous
                  </span>
                </h1>
                <p className="max-w-xl text-lg text-white/75">
                  Wide selection of films with the best audio and visual quality.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(236,72,153,0.4)] transition-transform duration-300 hover:translate-y-[-2px]"
                  >
                    Join now
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    Learn more
                  </Link>
                </div>
                <div className="flex items-center gap-3 pt-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 shadow-[0_0_0_6px_rgba(236,72,153,0.25)]" />
                  <span>{heroHooks[hookIndex]}</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 rounded-[3.5rem] bg-gradient-to-br from-fuchsia-500/25 via-transparent to-purple-500/25 blur-3xl" />
                <div className="relative overflow-hidden rounded-[3rem] border border-white/15 bg-white/10 shadow-[0_40px_140px_rgba(236,72,153,0.35)] backdrop-blur">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-60" />
                  <div className="relative">
                    <div className="relative h-[420px] overflow-hidden rounded-[2.5rem]">
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-70",
                          heroProject?.gradient ?? "from-fuchsia-500 via-rose-500 to-purple-600",
                        )}
                      />
                      {!heroImageError && heroProject?.thumbnail ? (
                        <img
                          src={heroProject.thumbnail}
                          alt={heroProject.title}
                          onLoad={() => setHeroImageLoaded(true)}
                          onError={() => setHeroImageError(true)}
                          className={cn(
                            "absolute inset-0 h-full w-full object-cover object-center transition duration-700",
                            heroImageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
                          )}
                        />
                      ) : (
                        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 bg-[#12061f] text-center">
                          <span className="text-3xl">🎬</span>
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Aperçu en préparation</p>
                          <p className="text-xs text-white/60">L'image du projet sera bientôt disponible.</p>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0617]/90 via-[#0b0617]/35 to-transparent" />
                    </div>
                    <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/75 backdrop-blur">
                      {heroProject?.category ?? "Featured"}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 rounded-b-[3rem] bg-gradient-to-t from-[#0b0617]/95 via-[#0b0617]/55 to-transparent px-8 pb-10 pt-16">
                      <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Now streaming</p>
                          <p className="text-2xl font-bold text-white">{heroProject?.title ?? "Votre prochain film"}</p>
                          <p className="text-sm text-white/70">
                            {heroProject?.tagline ?? "Immersion totale dans notre univers narratif."}
                          </p>
                          <div className="flex flex-wrap gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-white/45">
                            {heroProject?.aiTools?.slice(0, 3).map((tool) => (
                              <span key={tool} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/55">
                          {heroProject?.duration ? (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">{heroProject.duration}</span>
                          ) : null}
                          {heroProject?.year ? (
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">{heroProject.year}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em]">
                  {heroCategories.map((category, index) => (
                    <span
                      key={category}
                      className={cn(
                        "cursor-pointer transition-colors duration-300",
                        index === 0 ? "text-white" : "text-white/55 hover:text-white",
                      )}
                    >
                      {category}
                    </span>
                  ))}
                </nav>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Voir le portfolio <span className="text-base">➜</span>
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {portfolioItems.slice(0, 4).map((project) => (
                  <Link
                    key={project.id}
                    to="/portfolio"
                    className="group relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_30px_110px_rgba(236,72,153,0.18)] transition-transform duration-500 hover:-translate-y-2"
                    aria-label={`Voir le projet ${project.title} dans le portfolio`}
                  >
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={`Aperçu du projet ${project.title}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-slate-900/40 text-sm uppercase tracking-[0.3em] text-white/70">
                        Aperçu en attente
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0617]/30 to-[#0b0617]/90" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/70">
                      {project.category}
                    </div>
                    <div className="relative flex h-full flex-col justify-end gap-2 p-6">
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                        {project.duration} · {project.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-6xl px-6 pb-24">
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(circle at 20% 20%, hsl(var(--visual-accent) / 0.18), transparent 60%)" }}
          />
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_80px_rgba(59,130,246,0.15)] visual-accent-veil">
            <div className="flex flex-col items-start gap-6 pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Méthode intégrée</p>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Une chaîne de production qui synchronise IA et équipes de plateau
                </h2>
              </div>
              <div className="flex gap-3 text-sm text-slate-200/80">
                {techStack.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" /> {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {servicesData.map((service, index) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_30px_100px_rgba(56,189,248,0.12)] visual-accent-hover-shadow transition-transform duration-500 hover:-translate-y-2"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-cyan-500/30 via-transparent to-transparent visual-accent-gradient transition-transform duration-700 group-hover:translate-y-0 visual-accent-gradient" />
                  <div className="relative space-y-4">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-cyan-200/80 visual-accent-text">
                      <span className="text-2xl">0{index + 1}</span> {service.title}
                    </span>
                    <p className="text-xl font-bold text-white">{service.subtitle}</p>
                    <p className="text-sm text-slate-200/80">{service.promise}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-cyan-100/70 visual-accent-text-strong">
                      {service.stack.map((tool) => (
                        <span key={tool} className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">Consulter la méthodologie →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1 space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200/70">Réalisations récentes</p>
              <h2 className="text-4xl font-extrabold leading-tight">
                Un portefeuille modulable piloté depuis votre tableau de bord
              </h2>
              <p className="text-lg text-slate-200/80">
                Chaque projet est structuré pour évoluer. Ajoutez, mettez à jour ou archivez vos références depuis le tableau de bord administrateur.
              </p>
              <div className="grid gap-4 text-sm text-slate-200/80">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Processus éditorial</p>
                  <p className="mt-2">Brief, scénario, droits et livrables sont documentés dès la préproduction pour sécuriser la validation interne.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Pilotage data</p>
                  <p className="mt-2">Classement par thématique, scoring IA des performances et bibliothèques audio certifiées pour accélérer la production.</p>
                </div>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 rounded-full border border-fuchsia-200/40 bg-fuchsia-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_15px_50px_rgba(236,72,153,0.3)] visual-secondary-glow visual-accent-glow"
              >
                Explorer la galerie complète
              </Link>
            </div>

            <div className="flex-1 space-y-6">
              {portfolioItems.slice(0, 3).map((project, index) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-[0_25px_90px_rgba(244,114,182,0.12)] visual-accent-hover-shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_120px_rgba(14,165,233,0.2)]"
                >
                  <span
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, hsl(var(--visual-accent) / 0.25), hsl(var(--visual-secondary) / 0.2))",
                    }}
                  />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                      <span>Projet 0{index + 1}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-slate-200/80">{project.description}</p>
                    <div className="grid gap-3 text-xs text-cyan-100/80 visual-accent-text-strong sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.duration}</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.year}</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.socialStack[0]}</div>
                    </div>
                    <img src={project.thumbnail} alt={project.title} className="h-56 w-full rounded-[2rem] object-cover" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-24" id="contact">
          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-[0_25px_100px_rgba(8,145,178,0.18)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Demande rapide</p>
                <h2 className="text-4xl font-extrabold leading-tight">
                  90 secondes suffisent pour lancer un échange avec nos équipes.
                </h2>
                <div className="grid gap-4 text-sm text-slate-200/80">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Analyse initiale</p>
                    <p className="mt-2">Objectifs, publics cibles et formats souhaités : nous collectons les informations essentielles pour préparer la proposition.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Coordination interne</p>
                    <p className="mt-2">Le brief est partagé avec le pôle création, l'équipe plateau et notre cellule IA pour une réponse argumentée et chiffrée.</p>
                  </div>
                </div>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  recordContactRequest(form);
                  setContactSent(true);
                  setForm({ name: "", email: "", projectSpark: "", urgency: "hier" });
                }}
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Nom / pseudo</label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
                    placeholder="Nom et prénom"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
                    placeholder="vous@futurebrand.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Étincelle</label>
                  <textarea
                    required
                    value={form.projectSpark}
                    onChange={(event) => setForm((prev) => ({ ...prev, projectSpark: event.target.value }))}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
                    placeholder="Décrivez le contexte, les objectifs et les livrables attendus"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Urgence</label>
                  <select
                    value={form.urgency}
                    onChange={(event) => setForm((prev) => ({ ...prev, urgency: event.target.value as typeof form.urgency }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  >
                    <option value="hier">Projet urgent</option>
                    <option value="cette-semaine">Démarrage sous 7 jours</option>
                    <option value="quand-c-est-parfait">Planifié</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white"
                >
                  <span className="relative z-10">Envoyer ma demande</span>
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 visual-accent-gradient transition-transform duration-700 group-hover:translate-x-0 visual-accent-gradient" />
                </button>
                {contactSent && (
                  <p className="rounded-2xl border border-cyan-200/30 visual-accent-border bg-cyan-500/10 visual-accent-chip px-4 py-3 text-sm text-cyan-100 visual-accent-text-strong">
                    Merci pour votre message. Un membre de l'équipe Studio VBG revient vers vous sous 2 heures ouvrées.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-sm text-slate-200/70">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Studio VBG</p>
                <p className="mt-2 text-lg text-white">Agence de production, captation vidéo, création de contenus réseaux sociaux.</p>
              </div>
              <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-slate-300/80">
                <Link to="/process" className="hover:text-white">Méthode</Link>
                <Link to="/services" className="hover:text-white">Services</Link>
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              </div>
              <div className="text-xs text-slate-300/80">
                © {new Date().getFullYear()} Studio VBG · Pipeline propulsé par l'IA et une gestion de projet rigoureuse.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
