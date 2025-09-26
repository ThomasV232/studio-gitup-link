import { Link } from "react-router-dom";
import { FormEvent, useMemo, useState } from "react";

import HeroRibbon from "@/components/HeroRibbon";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";
import { cn } from "@/lib/utils";

const heroStats = [
  { label: "Films livrés", value: "140+", note: "marques, événements, lancements" },
  { label: "Satisfaction", value: "4.9/5", note: "Avis clients vérifiés 2023-2025" },
  { label: "Lead time", value: "10 j", note: "du tournage à la diffusion" },
];

const partnerBadges = ["Station F", "Bpifrance", "WeAre600", "LVMH DARE", "French Tech"];

const craftPillars = [
  {
    title: "Narration incarnée",
    description:
      "Ateliers éditoriaux, story research et direction artistique pour faire émerger des histoires mémorables.",
  },
  {
    title: "Pipeline hybride",
    description:
      "Studio mobile, IA créative et workflow cloud pour capter, monter et livrer plus vite sans sacrifier le craft.",
  },
  {
    title: "Diffusion pilotée",
    description:
      "Déclinaisons verticales, motion templates et playbooks de diffusion pour chaque plateforme.",
  },
];

const stackModules = [
  {
    title: "Capture cinématique",
    description:
      "Sony Burano 8K, FX6 duo, DJI Inspire 3, optiques G Master, set audio Sennheiser 6000.",
  },
  {
    title: "IA créative",
    description:
      "Runway Gen-5 Enterprise, Sora Color Suite, Luma Ray Reconstruction, ElevenLabs Dubbing.",
  },
  {
    title: "Montage & finishing",
    description:
      "DaVinci Resolve 19 Neural, Adobe Premiere Pro Sensei, mixage Dolby Atmos ready.",
  },
  {
    title: "Pilotage projet",
    description:
      "Notion OS 2025, automations Zapier AI et dashboards KPI personnalisés.",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Vision & cadrage",
    description:
      "Workshop objectifs, moodboard immersif et repérages NeRF pour aligner la vision dès J1.",
  },
  {
    id: "02",
    title: "Production agile",
    description:
      "Tournages multi-cam + drone FPV, captation son premium et équipe adaptée à chaque terrain.",
  },
  {
    id: "03",
    title: "Activation multicanale",
    description:
      "Montage, color grading ACES, motion sur-mesure, déclinaisons verticales et plan de diffusion.",
  },
];

const testimonials = [
  {
    quote:
      "Un partenaire qui comprend autant l'image que le business. Notre film de lancement a généré 63 % de prises de contact en plus.",
    author: "Claire L.",
    role: "Directrice communication · Helia Labs",
  },
  {
    quote:
      "L'aftermovie était prêt avant la conférence de presse du lendemain. Sponsors et participants ont partagé massivement.",
    author: "Marc D.",
    role: "Fondateur · Paris Tech Summit",
  },
  {
    quote:
      "Notre programme social bat des records depuis trois mois. Process carré, créativité constante, reporting limpide.",
    author: "Sonia V.",
    role: "Head of Brand · Nova SaaS",
  },
];

const urgencyOptions = [
  { value: "hier", label: "Projet urgent" },
  { value: "cette-semaine", label: "Démarrage cette semaine" },
  { value: "quand-c-est-parfait", label: "Je planifie tranquillement" },
] as const;

const glassPanel = "rounded-[3rem] border border-white/10 bg-white/5";
const darkPanel = "rounded-[2.75rem] border border-white/10 bg-slate-900/70";

const Index = () => {
  const { portfolioItems, recordContactRequest } = useStudio();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectSpark: "",
    urgency: urgencyOptions[1].value,
  });

  const featuredProjects = useMemo(() => portfolioItems.slice(0, 4), [portfolioItems]);
  const heroProject = featuredProjects[0];
  const serviceHighlights = useMemo(() => servicesData.slice(0, 3), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.projectSpark) {
      return;
    }
    if (formState === "sending") {
      return;
    }

    setFormState("sending");
    recordContactRequest({
      name: form.name,
      email: form.email,
      projectSpark: form.projectSpark,
      urgency: form.urgency as (typeof urgencyOptions)[number]["value"],
    });

    setTimeout(() => {
      setFormState("sent");
      setForm({ name: "", email: "", projectSpark: "", urgency: urgencyOptions[1].value });
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at 82% 28%, rgba(236,72,153,0.18), transparent 60%), linear-gradient(150deg, rgba(15,23,42,0.92), rgba(15,23,42,0.68))",
        }}
      />
      <HeroRibbon />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 lg:gap-28">
        {/* HERO */}
        <section className={cn(glassPanel, "relative overflow-hidden p-10 sm:p-12 lg:p-16")}>
          <div
            className="absolute -top-32 right-12 hidden h-72 w-72 rounded-full bg-sky-500/35 blur-3xl lg:block"
            aria-hidden
          />
          <div
            className="absolute -bottom-40 left-16 hidden h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl lg:block"
            aria-hidden
          />
          <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                Alex VBG · Vidéaste freelance nouvelle génération
              </span>
              <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-[3.8rem]">
                <span className="block text-xs font-semibold uppercase tracking-[0.6em] text-white/50">
                  Films, contenus & expériences vidéo
                </span>
                <span className="mt-4 block">
                  Votre marque mérite une mise en scène cinématique et un plan de diffusion calibré 2025.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-white/75">
                J'accompagne marques, scale-ups et institutions avec une stack mêlant tournages haut de gamme, IA créative
                et stratégies social media pour délivrer des films qui performent.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Programmer un appel créatif
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white/70 transition-colors duration-300 hover:text-white"
                >
                  Explorer les offres
                </Link>
              </div>

              <div className="grid gap-5 pt-6 sm:grid-cols-3">
                {heroStats.map((metric) => (
                  <div key={metric.label} className={cn(darkPanel, "p-5")}>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="text-xs text-white/60">{metric.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[0.6rem] uppercase tracking-[0.45em] text-white/45">
                {partnerBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/10 px-3 py-2 text-white/60">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky-500/25 via-transparent to-fuchsia-500/25 blur-3xl"
                aria-hidden
              />
              <article
                className={cn(
                  darkPanel,
                  "relative overflow-hidden shadow-[0_40px_160px_rgba(56,189,248,0.25)]"
                )}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-60"
                  aria-hidden
                />
                <div className="relative aspect-[4/5] sm:aspect-[4/4.6]">
                  {heroProject?.thumbnail ? (
                    <img
                      src={heroProject.thumbnail}
                      alt={heroProject.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-500/30 to-indigo-500/30 text-center">
                      <p className="text-sm font-semibold uppercase tracking-[0.45em] text-white/70">Showreel 2025</p>
                      <p className="mt-3 max-w-xs text-xs text-white/70">
                        Sélection de projets corporate, événementiels et social media.
                      </p>
                    </div>
                  )}
                  {heroProject && (
                    <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-6">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
                        {heroProject.category} · {heroProject.year}
                      </p>
                      <h2 className="text-2xl font-semibold leading-tight text-white">
                        {heroProject.title}
                      </h2>
                      <p className="text-sm text-white/70">{heroProject.tagline}</p>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SIGNATURE */}
        <section className={cn(glassPanel, "p-10 sm:p-12 lg:p-16")}>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Signature</p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Une méthode créative pensée pour les ambitions des marques 2025
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {craftPillars.map((pillar) => (
              <div key={pillar.title} className={cn(darkPanel, "p-6")}>
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm text-white/70">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RÉALISATIONS */}
        <section className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Réalisations</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Projets récents</h2>
            </div>
            <Link
              to="/realisations"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
              Voir toutes les réalisations
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {featuredProjects.slice(0, 4).map((project) => (
              <article key={project.id} className={cn(darkPanel, "group overflow-hidden")}>
                <div className="relative h-72 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className={cn("h-full w-full bg-gradient-to-br", project.gradient)} aria-hidden />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" aria-hidden />
                  <div className="absolute bottom-5 left-6 flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                    <span>{project.category}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
                    <span>{project.duration}</span>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
                    {project.deliverables.slice(0, 3).map((deliverable) => (
                      <span key={deliverable}>{deliverable}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SERVICES + STACK */}
        <section className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Services</p>
                <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Offres signatures</h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
              >
                Voir toutes les offres
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {serviceHighlights.map((service) => (
                <article
                  key={service.slug}
                  className={cn(
                    darkPanel,
                    "flex flex-col gap-6 p-6 shadow-[0_18px_80px_rgba(59,130,246,0.18)]"
                  )}
                >
                  <div className="space-y-2">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
                      {service.slug.replace(/-/g, " ")}
                    </p>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="text-sm text-white/70">{service.subtitle}</p>
                  </div>
                  <p className="text-sm text-white/70">{service.promise}</p>
                  <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
                    {service.stack.slice(0, 4).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70 transition-colors hover:text-white"
                  >
                    Voir le détail
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside
            className={cn(
              darkPanel,
              "flex h-full flex-col justify-between gap-6 bg-gradient-to-br from-sky-500/10 via-slate-950/80 to-indigo-500/10 p-8"
            )}
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">
                Technologie & craft
              </p>
              <h2 className="text-3xl font-extrabold text-white">Stack 2025</h2>
              <p className="text-sm text-white/70">
                Chaque projet bénéficie d'un setup modulable. Voici les briques que j'assemble selon vos enjeux.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/75">
              {stackModules.map((item) => (
                <li
                  key={item.title}
                  className={cn(darkPanel, "border-white/15 bg-slate-900/80 p-5")}
                >
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/playground"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
              Voir les coulisses & workflows
            </Link>
          </aside>
        </section>

        {/* PROCESS */}
        <section className={cn(glassPanel, "p-10 sm:p-12 lg:p-16")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Process</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Un accompagnement clair de l'idée à la diffusion
              </h2>
            </div>
            <Link
              to="/process"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
              Découvrir la méthodologie
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.id} className={cn(darkPanel, "flex flex-col gap-4 p-6")}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
                  Phase {step.id}
                </p>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className={cn(glassPanel, "p-10 sm:p-12 lg:p-16")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Retours clients</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Ils m'ont confié leurs histoires</h2>
            </div>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
              En savoir plus sur Alex
            </Link>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author} className={cn(darkPanel, "flex h-full flex-col gap-4 p-8")}>
                <p className="text-base text-white/80">“{testimonial.quote}”</p>
                <footer className="space-y-1 text-sm text-white/60">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p>{testimonial.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* BRIEF EXPRESS */}
        <section className={cn(glassPanel, "p-10 sm:p-12 lg:p-16")}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">Brief express</p>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Parlons de votre prochain film</h2>
              <p className="max-w-xl text-sm text-white/70">
                Partagez vos objectifs : je reviens vers vous sous 24 h avec un plan d'action, un budget indicatif et mes
                prochaines disponibilités de tournage.
              </p>
              <div className={cn(darkPanel, "p-6 text-sm text-white/70")}>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Slots ouverts</p>
                <ul className="mt-4 space-y-2">
                  <li>• 17-19 février · Tournage corporate & interviews</li>
                  <li>• 3-4 mars · Aftermovie & captation conférence</li>
                  <li>• Avril · Pack social & motion design IA</li>
                </ul>
              </div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  Nom
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                    placeholder="Prénom Nom"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                    placeholder="vous@entreprise.com"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                Projet
                <textarea
                  value={form.projectSpark}
                  onChange={(event) => setForm((current) => ({ ...current, projectSpark: event.target.value }))}
                  className="min-h-[130px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                  placeholder="Lancement de produit, aftermovie, série social, motion design..."
                  required
                />
              </label>

              <fieldset className="space-y-3 text-sm text-white/70">
                <legend className="text-xs uppercase tracking-[0.35em] text-white/60">Urgence</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {urgencyOptions.map((option) => {
                    const isActive = form.urgency === option.value;
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] transition-colors",
                          isActive ? "border-sky-400/60 bg-sky-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"
                        )}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.value}
                          checked={isActive}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, urgency: event.target.value as "cette-semaine" }))
                          }
                          className="hidden"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={formState === "sending"}
              >
                {formState === "sending" ? "Envoi..." : formState === "sent" ? "Brief reçu !" : "Envoyer le brief"}
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className={cn(glassPanel, "p-10 text-center sm:p-12 lg:p-16")}>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Prêt à écrire la prochaine scène ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            Je vous accompagne de l'idée à la diffusion. Recevez un plan d'action personnalisé, un calendrier et un budget
            sous 24 h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/quote"
              className="rounded-full border border-sky-300/40 bg-sky-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white"
            >
              Demander un devis
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
              M'écrire directement
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
