import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import HeroRibbon from "@/components/HeroRibbon";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";
import { cn } from "@/lib/utils";

const heroStats = [
  { label: "Films livrés", value: "140+", note: "Lancements, événements, campagnes" },
  { label: "Satisfaction", value: "4,9/5", note: "Avis clients vérifiés 2023-2025" },
  { label: "Lead time", value: "72 h – 4 sem.", note: "selon format & diffusion" },
];

const partnerBadges = ["Station F", "Bpifrance", "WeAre600", "LVMH DARE", "French Tech"];

const processShort = [
  {
    id: "01",
    title: "Vision & cadrage",
    description:
      "Atelier éditorial, moodboard immersif et repérages 3D pour verrouiller le message, les audiences et le plan de diffusion.",
  },
  {
    id: "02",
    title: "Production agile",
    description:
      "Tournages multi-cam, drone FPV, pipeline IA supervisé et direction artistique sur mesure pour des images impeccables.",
  },
  {
    id: "03",
    title: "Activation multicanale",
    description:
      "Montage, étalonnage ACES, déclinaisons verticales, sous-titres dynamiques et playbooks de publication par canal.",
  },
];

const testimonials = [
  {
    quote:
      "Un partenaire qui comprend autant l'image que la stratégie. Notre film de lancement a généré +63 % de leads qualifiés.",
    author: "Claire L.",
    role: "Directrice communication · Helia Labs",
  },
  {
    quote:
      "Aftermovie livré en J+2 avec stories verticales live. Sponsors et participants ont relancé leurs réseaux immédiatement.",
    author: "Marc D.",
    role: "Fondateur · Paris Tech Summit",
  },
  {
    quote:
      "Workflow mensuel ultra carré : scripts, tournages batchés, reporting. Notre reach social est en hausse de 48 %.",
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
  const serviceHighlights = useMemo(
    () =>
      servicesData.map((service) => ({
        slug: service.slug,
        title: service.name,
        intro: service.description,
        timeline: service.timeline,
        startingPrice: service.startingPrice,
        deliverables: service.deliverables.slice(0, 2),
      })),
    [],
  );

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
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-28 pt-10 sm:px-10 lg:gap-28">
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
                Studio VBG · Stack vidéo Sept. 2025
              </span>
              <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-[3.8rem]">
                <span className="block text-xs font-semibold uppercase tracking-[0.6em] text-white/50">
                  Showreel + diffusion pilotée
                </span>
                <span className="mt-4 block">
                  Votre marque mérite une mise en scène cinématique et un plan de diffusion calibré 2025.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-white/75">
                Je conçois, tourne et active vos contenus avec un pipeline mêlant Sony Burano 8K, drone FPV, IA générative (Runway Gen-5, Sora Color Suite) et reporting temps réel pour booster vos campagnes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Programmer un appel créatif
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white/70 transition-colors duration-300 hover:text-white"
                >
                  Voir le showreel
                </Link>
              </div>

              <div className="grid gap-5 pt-6 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-2xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-6 rounded-[2.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_28px_120px_rgba(59,130,246,0.25)] backdrop-blur-3xl">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-400/25 blur-3xl" />
              <div className="relative space-y-4 rounded-[2.5rem] border border-white/10 bg-white/10 p-6">
                <div className="flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-white/60">
                  <span>Showreel 2025</span>
                  <span>02:12</span>
                </div>
                <div className="relative h-52 overflow-hidden rounded-[2rem] border border-white/10">
                  {heroProject?.thumbnail ? (
                    <img src={heroProject.thumbnail} alt={heroProject.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className={cn("h-full w-full", heroProject?.gradient, "bg-gradient-to-br")} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/60">Dernier projet</p>
                      <p className="text-sm font-semibold text-white">{heroProject?.title ?? "Studio VBG"}</p>
                    </div>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white"
                    >
                      Lecture
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.4em] text-white/60">
                <span>Partenaires & références</span>
                <div className="flex flex-wrap gap-3 text-[0.6rem] text-white/50">
                  {partnerBadges.map((partner) => (
                    <span key={partner} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXTRAITS RÉALISATIONS */}
        <section className="space-y-12">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Extraits Réalisations</p>
              <h2 className="text-3xl font-bold sm:text-4xl">6 catégories, un même niveau d'exigence</h2>
              <p className="max-w-2xl text-sm text-white/70">
                Sélectionnez un extrait pour visualiser notre rendu colorimétrique, le soin apporté aux interviews et la fluidité des transitions motion.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
            >
              Découvrir le portfolio complet
            </Link>
          </header>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.id} className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="relative h-56 overflow-hidden rounded-[2.2rem] border border-white/10">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className={cn("h-full w-full", project.gradient, "bg-gradient-to-br")} />
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent p-4 text-xs uppercase tracking-[0.35em] text-white/70">
                    <span>{project.category}</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/70">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/50">
                    {project.deliverables.slice(0, 3).map((deliverable) => (
                      <span key={deliverable} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* APERÇU SERVICES */}
        <section className="space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Services & Tarifs</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Des packs maîtrisés pour chaque catégorie</h2>
            <p className="max-w-3xl text-sm text-white/70">
              Pipeline préproduction → production → postproduction → diffusion. Les packs Journée, Weekend ou Sur demande s'adaptent à vos enjeux et intègrent IA, sous-titres et miniatures.
            </p>
          </header>
          <div className="grid gap-6 lg:grid-cols-3">
            {serviceHighlights.map((service) => (
              <article key={service.slug} className="relative flex h-full flex-col gap-4 rounded-[2.75rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-white/25 hover:bg-white/10">
                <div className="flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                  <span>{service.timeline}</span>
                  <span>{service.startingPrice}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-white/70">{service.intro}</p>
                <ul className="space-y-2 text-sm text-white/60">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200"
                >
                  Voir les packs
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className={cn(darkPanel, "p-10 sm:p-12")}>
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Processus / Méthode</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Une méthode éprouvée, adaptée à chaque service</h2>
            <p className="max-w-3xl text-sm text-white/70">
              Chaque étape est documentée, automatisée quand c'est pertinent et pilotée par un chef de projet unique. Objectif : fluidité, visibilité, impact.
            </p>
          </header>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {processShort.map((step) => (
              <div key={step.id} className="relative flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-white/50">Phase {step.id}</span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Témoignages</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Ce que disent les clients accompagnés</h2>
            <p className="max-w-2xl text-sm text-white/70">
              Réalisations corporate, événements, réseaux sociaux : un suivi constant et des résultats mesurables.
            </p>
          </header>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author} className="flex h-full flex-col gap-4 rounded-[2.75rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm italic text-white/80">“{testimonial.quote}”</p>
                <footer className="mt-auto text-xs uppercase tracking-[0.35em] text-white/60">
                  <span className="block font-semibold text-white">{testimonial.author}</span>
                  <span className="text-white/60">{testimonial.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* CONTACT & DEVIS */}
        <section className={cn(glassPanel, "p-10 sm:p-12")}>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Contact & Devis</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Parlez-nous de votre prochain tournage</h2>
              <p className="text-sm text-white/70">
                Décrivez votre projet (type de vidéo, deadline, KPI) : nous revenons vers vous sous 24 h avec budget estimatif, planning et premières idées d'activation.
              </p>
              <div className="space-y-4 text-sm text-white/60">
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/50">Créneaux disponibles</span>
                  <p className="text-white">Appel découverte 30 min · slots 48 h / 5 j</p>
                </div>
                <Link
                  to="https://cal.com"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
                >
                  Réserver un créneau visio
                </Link>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-[2.75rem] border border-white/10 bg-slate-950/70 p-8">
              <div className="grid gap-4 sm:grid-cols-2">
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
                  className="min-h-[160px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                  placeholder="Type de vidéo, objectifs, délais, diffusion..."
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Urgence
                <select
                  value={form.urgency}
                  onChange={(event) => setForm((current) => ({ ...current, urgency: event.target.value as typeof form.urgency }))}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
                >
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-slate-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={formState === "sending"}
              >
                {formState === "sending" ? "Envoi..." : formState === "sent" ? "Message envoyé" : "Envoyer"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
