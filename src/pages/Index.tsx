import { Link } from "react-router-dom";
import { FormEvent, useMemo, useState } from "react";

import HeroRibbon from "@/components/HeroRibbon";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";
import { cn } from "@/lib/utils";

const heroMetrics = [
  { label: "Films livrés", value: "120+", note: "corporate, events & marques" },
  { label: "Note clients", value: "4.9/5", note: "sur 2023-2025" },
  { label: "Délai moyen", value: "12 j", note: "de la prod à la diffusion" },
];

const creativePrinciples = [
  {
    title: "Narration incarnée",
    description:
      "Un accompagnement auteur pour révéler vos talents, vos clients et vos valeurs avec un ton juste et mémorable.",
  },
  {
    title: "Pipeline hybride",
    description:
      "Caméras cinéma, drone FPV, studio mobile et IA générative dernière génération pour fluidifier chaque étape.",
  },
  {
    title: "Diffusion pilotée",
    description:
      "Déclinaisons verticales, sous-titres dynamiques, templates motion et recommandations éditoriales clés en main.",
  },
];

const stackHighlights = [
  {
    title: "Capture cinématique",
    description:
      "Sony Burano 8K, FX6 duo, DJI Inspire 3 et optiques G Master pour un rendu cinéma en toutes situations.",
  },
  {
    title: "IA créative",
    description:
      "Runway Gen-5 Enterprise, Sora Pro Colorist, Luma Ray Reconstruction, ElevenLabs Dubbing.",
  },
  {
    title: "Montage & finishing",
    description:
      "DaVinci Resolve 19 Neural, Adobe Premiere Pro Sensei et mixage Dolby Atmos ready.",
  },
  {
    title: "Pilotage projet",
    description:
      "Notion 2025, automation CRM et dashboards personnalisés pour suivre production et ROI.",
  },
];

const testimonials = [
  {
    quote:
      "Alex a capté l'énergie de notre équipe et a livré un film corporate qui a fait l'unanimité auprès de notre COMEX.",
    author: "Claire L.",
    role: "Directrice communication, Helia Labs",
  },
  {
    quote:
      "Notre aftermovie était prêt dès le lendemain avec toutes les déclinaisons sociales. Sponsors et participants ont adoré.",
    author: "Marc D.",
    role: "Fondateur, Paris Tech Summit",
  },
  {
    quote:
      "Une vraie vision créative et un accompagnement rigoureux. Les vidéos sociales performent depuis trois mois d'affilée !",
    author: "Sonia V.",
    role: "Head of Brand, Nova SaaS",
  },
];

const urgencyOptions = [
  { value: "hier", label: "Projet urgent" },
  { value: "cette-semaine", label: "Démarrage cette semaine" },
  { value: "quand-c-est-parfait", label: "Je planifie tranquillement" },
] as const;

const Index = () => {
  const { portfolioItems, recordContactRequest } = useStudio();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectSpark: "",
    urgency: urgencyOptions[1].value,
  });

  const featuredProjects = useMemo(() => portfolioItems.slice(0, 3), [portfolioItems]);
  const highlightServices = useMemo(() => servicesData.slice(0, 3), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.projectSpark) return;
    if (formState === "sending") return;

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
    }, 400);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 15%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 85% 30%, rgba(244,63,94,0.15), transparent 60%), linear-gradient(160deg, rgba(15,23,42,0.9), rgba(15,23,42,0.65))",
        }}
      />
      <HeroRibbon />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-32 pt-32 sm:px-10 lg:gap-32">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-[3.25rem] border border-white/10 bg-white/5 p-12 shadow-[0_24px_120px_rgba(56,189,248,0.35)] backdrop-blur">
          <div className="absolute -top-24 right-16 hidden h-64 w-64 rounded-full bg-sky-500/40 blur-3xl lg:block" aria-hidden />
          <div className="absolute -bottom-28 left-10 hidden h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl lg:block" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                Alex VBG · Vidéaste Freelance 2025
              </span>
              <h1 className="text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
                <span className="block text-xs font-semibold uppercase tracking-[0.6em] text-white/50">
                  Films, contenus & experiences vidéo
                </span>
                <span className="mt-4 block text-[2.75rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4.25rem]">
                  Vos histoires méritent un regard cinématique et une diffusion maîtrisée.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-white/75">
                Création de films d'entreprise, aftermovies, contenus social et motion design augmenté par l'IA. Une approche agile,
                humaine et technologique pour amplifier votre marque.
              </p>
              <div className="flex flex-wrap gap-4">
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
                  Voir les services 2025
                </Link>
              </div>
              <div className="grid gap-6 pt-6 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="text-xs text-white/60">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-transparent to-fuchsia-500/20 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2.75rem] border border-white/15 bg-slate-900/60 shadow-[0_40px_160px_rgba(56,189,248,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-60" aria-hidden />
                <div className="relative aspect-[4/5] sm:aspect-[4/5.5]">
                  {featuredProjects[0]?.thumbnail ? (
                    <img
                      src={featuredProjects[0].thumbnail}
                      alt={featuredProjects[0].title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-500/30 to-indigo-500/30 text-center">
                      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">Showreel</p>
                      <p className="mt-3 max-w-xs text-xs text-white/70">
                        Découvrez une sélection de projets cinématiques réalisés entre 2023 et 2025.
                      </p>
                    </div>
                  )}
                  {featuredProjects[0] && (
                    <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-slate-950/85 via-slate-950/60 to-transparent p-6">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
                        {featuredProjects[0].category} · {featuredProjects[0].year}
                      </p>
                      <p className="text-2xl font-semibold leading-tight text-white">{featuredProjects[0].title}</p>
                      <p className="text-sm text-white/70">{featuredProjects[0].tagline}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SIGNATURE */}
        <section className="grid gap-6 rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(236,72,153,0.18)]">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Signature</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Une méthode de vidéaste freelance pour vos ambitions de marque</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {creativePrinciples.map((principle) => (
              <div key={principle.title} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-xl font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm text-white/70">{principle.description}</p>
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
          <div className="grid gap-10 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-slate-900/60"
              >
                <div className="relative h-64 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className={cn("h-full w-full", project.gradient, "bg-gradient-to-br")} />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-5 flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/70">
                    <span>{project.category}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
                    <span>{project.year}</span>
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
        <section className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Services</p>
                <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Offres signatures</h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
              >
                Explorer tous les services
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {highlightServices.map((service) => (
                <article
                  key={service.slug}
                  className="flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6 shadow-[0_18px_80px_rgba(59,130,246,0.18)]"
                >
                  <div className="space-y-2">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
                      {service.slug.replaceAll("-", " ")}
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

          <aside className="flex h-full flex-col justify-between gap-6 rounded-[2.75rem] border border-white/10 bg-gradient-to-br from-sky-500/10 via-slate-900/60 to-indigo-500/10 p-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">Technologie & craft</p>
              <h2 className="text-3xl font-extrabold text-white">Stack 2025</h2>
              <p className="text-sm text-white/70">
                Chaque projet bénéficie d'un setup modulable. Voici les briques que j'assemble selon vos enjeux.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/75">
              {stackHighlights.map((item) => (
                <li key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
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

        {/* TESTIMONIALS */}
        <section className="grid gap-10 rounded-[3rem] border border-white/10 bg-white/5 p-12">
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
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.author}
                className="flex h-full flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8"
              >
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
        <section className="grid gap-12 rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-950 to-indigo-950 p-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">Préparez votre projet</p>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Brief express</h2>
              <p className="max-w-xl text-sm text-white/70">
                Dites-moi ce qui vous anime, je vous propose un cadrage et une dispo de tournage en moins de 24 heures.
              </p>
              <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Prochaines disponibilités</p>
                <ul className="mt-4 space-y-2">
                  <li>• Semaine du 17 février : tournage corporate</li>
                  <li>• 3-4 mars : aftermovie & événementiel</li>
                  <li>• Slots motion design ouverts sur avril</li>
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
                  className="min-h[120px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                  placeholder="Lancement film de marque, aftermovie, série social..."
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
                          isActive
                            ? "border-sky-400/60 bg-sky-500/20 text-white"
                            : "border-white/20 bg-white/10 text-white/70"
                        )}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.value}
                          checked={isActive}
                          onChange={(event) => setForm((current) => ({ ...current, urgency: event.target.value }))}
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
                disabled={formState !== "idle" && formState !== "sent"}
              >
                {formState === "sending" ? "Envoi..." : formState === "sent" ? "Brief reçu !" : "Envoyer le brief"}
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Prêt à écrire la prochaine scène ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            Parlons de vos ambitions vidéo : je vous envoie un plan d'action, un calendrier et un devis précis sous 24 h.
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
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 hover:text-white"
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
