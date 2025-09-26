import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { servicesData } from "@/lib/services";

const heroHighlights = [
  {
    label: "Stack 2025",
    value: "Burano 8K + Gen-3",
    note: "Workflow hybride IA & humain",
  },
  {
    label: "Délais",
    value: "72 h – 4 sem.",
    note: "selon complexité & canal",
  },
  {
    label: "Satisfaction",
    value: "4.9/5",
    note: "50 retours vérifiés",
  },
];

const reasons = [
  {
    title: "Clarté",
    description:
      "Un process carré, script validé et rétroplanning partagé. Vous savez toujours où on en est.",
  },
  {
    title: "Efficacité",
    description:
      "Formats 16:9 & 9:16, sous-titres et miniatures fournis. On pense distribution dès l’écriture.",
  },
  {
    title: "Impact mesurable",
    description:
      "Chaque vidéo vise un KPI (clic, lead, candidature). Suivi post-publication 30 jours inclus.",
  },
];

const processSteps = [
  {
    title: "Brief & objectifs",
    description: "30 min d’appel pour cadrer message, public, KPI.",
  },
  {
    title: "Scénario & planning",
    description: "J’écris, vous validez, on cale les dates.",
  },
  {
    title: "Tournage / prod",
    description: "Discret, efficace, respect du cadre & sécurité.",
  },
  {
    title: "Montage & révisions",
    description: "1 à 2 allers-retours inclus, sous-titres, habillage.",
  },
  {
    title: "Livraison & publications",
    description: "Exports optimisés (YouTube, LinkedIn, Insta), miniatures.",
  },
];

const packs = [
  {
    name: "Essentiel",
    description: "Tournage 1/2 journée, film principal, sous-titres.",
    price: "À partir de 950 € HT",
  },
  {
    name: "Pro",
    description: "1 journée, film principal + 2 déclinaisons, miniatures.",
    price: "Dès 1 400 € HT",
  },
  {
    name: "Full",
    description: "1–2 jours, multi-formats (16:9 & 9:16), 5–8 capsules.",
    price: "Sur devis",
  },
];

const options = [
  "Sous-titres multi-langues",
  "Version 9:16",
  "Thumbnails designées",
  "Voix-off pro",
  "Captation drone (selon zone)",
  "Livraison express",
  "Charte motion légère",
];

const faqs = [
  {
    question: "Combien coûte une vidéo ?",
    answer: "Ça dépend du temps de tournage, du montage et des livrables. Mes projets démarrent dès 650 € HT (immobilier) et 1 400–1 900 € HT pour entreprise/événementiel. Vous recevez un devis poste par poste.",
  },
  {
    question: "Quels délais prévoir ?",
    answer:
      "Entre 3 jours (événementiel express) et 2–4 semaines (motion design/IA). On cale une date ferme au devis.",
  },
  {
    question: "Et si on n’aime pas la première version ?",
    answer:
      "1 à 2 allers-retours sont inclus. On part d’un script validé pour éviter les surprises.",
  },
  {
    question: "Qui possède les droits ?",
    answer:
      "Vous disposez d’un droit d’usage illimité sur les livrables finaux, pour les canaux précisés au devis. Les rushs restent archivés 12 mois (option rachat possible).",
  },
  {
    question: "Pouvez-vous gérer la musique et les voix-off ?",
    answer: "Oui — musiques licenciées et comédiens voix-off sur demande (FR/EN).",
  },
  {
    question: "Vous travaillez partout ?",
    answer:
      "Basé·e à Paris, je me déplace en France/Europe. Frais de déplacement indiqués à l’avance.",
  },
];

const testimonials = [
  {
    quote: "\"+38 % d’inscriptions au webinar — on a enfin un film clair.\"",
    author: "Lina, Marketing",
  },
  {
    quote: "\"Aftermovie livré en 72h, parfait pour relancer les ventes early-bird.\"",
    author: "Romain, Event manager",
  },
  {
    quote: "\"Notre annonce immo a pris 2 offres en 3 jours.\"",
    author: "Sophie, Agence immo",
  },
];

const Services = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const serviceCards = useMemo(
    () =>
      servicesData.map((service) => ({
        slug: service.slug,
        title: service.title,
        hook: service.hook,
        deliverables: service.deliverables,
        timeline: service.timeline,
        price: service.startingPrice,
        proof: service.proof,
        cta: service.ctaLabel,
      })),
    [],
  );

  const handleServiceJump = useCallback((slug: string) => {
    if (!slug) {
      return;
    }

    const element = document.getElementById(`service-${slug}`);

    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      if (typeof element.focus === "function") {
        element.focus({ preventScroll: true });
      }
    }

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#service-${slug}`);
    }
  }, []);

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setSelectedSlug(value);
      handleServiceJump(value);
    },
    [handleServiceJump],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.28),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(147,51,234,0.18),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.75)_55%,rgba(15,23,42,0.95)_100%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
      </div>

      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-[-240px] right-[-140px] h-[460px] w-[460px] rounded-full bg-gradient-to-l from-violet-500/15 via-cyan-500/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-24">
        <header className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-12 shadow-[0_40px_140px_rgba(14,165,233,0.28)] backdrop-blur-3xl">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(125,211,252,0.15),rgba(244,114,182,0.1),rgba(14,165,233,0.25),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="space-y-10">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-200/30 bg-cyan-500/15 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                Services Sept. 2025 · Videaste freelance
              </span>
              <div className="space-y-6">
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Des vidéos qui servent vos objectifs — pas seulement l’esthétique
                </h1>
                <p className="max-w-2xl text-lg text-slate-200/80">
                  De l’idée au livrable prêt à publier, je produis des vidéos efficaces pour l’entreprise, l’événementiel, l’immobilier, les réseaux sociaux, le mariage et le motion design/IA.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-cyan-200/40 bg-cyan-500/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/35"
                >
                  <span>Demander un devis</span>
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/realisations"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                >
                  <span>Voir des réalisations</span>
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <dl className="grid gap-6 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
                  >
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{item.label}</dt>
                    <dd className="mt-3 text-2xl font-bold">{item.value}</dd>
                    <p className="text-xs text-slate-200/70">{item.note}</p>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Stack créative 2025</p>
                <p className="text-sm leading-relaxed text-slate-200/80">
                  Sony Burano 8K · FX6 Duo · DaVinci Resolve Neural · Runway Gen-3 · ElevenLabs Dubbing · Notion AI Ops.
                </p>
              </div>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Assurance résultat</p>
                <p className="text-sm leading-relaxed text-slate-200/70">
                  KPI fixés avant tournage, suivi post-publication 30 jours et plan d’optimisation inclus.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-20 space-y-12">
          <div className="flex flex-col gap-10 rounded-[3rem] border border-white/10 bg-white/[0.05] p-12 shadow-[0_30px_120px_rgba(236,72,153,0.22)]">
            <header className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">Pourquoi travailler ensemble</h2>
              <p className="text-slate-200/70">
                Process, livrables et résultats : vous gardez la vision stratégique pendant que je sécurise l’exécution créative.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {reasons.map((reason) => (
                <article
                  key={reason.title}
                  className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-slate-900/60 p-8 backdrop-blur-lg"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full bg-gradient-to-t from-cyan-500/25 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0"
                  />
                  <div className="relative space-y-4">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-cyan-100/80">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-slate-200/80">{reason.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <header className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">Les 6 services</h2>
              <p className="text-slate-200/70">
                Chaque carte résume l’angle, les livrables clés, le délai, le prix d’appel, une preuve concrète et l’accès à la fiche détaillée.
              </p>
            </header>
            <div className="flex flex-col gap-5 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_120px_rgba(56,189,248,0.18)] backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Navigation services</p>
                <p className="text-sm text-slate-200/70">
                  Filtrez et sautez directement vers la carte qui vous intéresse, toutes les catégories sont disponibles ici.
                </p>
              </div>
              <label
                htmlFor="service-menu"
                className="flex w-full max-w-sm flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
              >
                <span className="text-[0.68rem] text-cyan-100/70">Choisir un service</span>
                <div className="relative">
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-white/70">
                    ▼
                  </span>
                  <select
                    id="service-menu"
                    name="service-menu"
                    className="w-full appearance-none rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 transition focus:border-cyan-200/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
                    value={selectedSlug}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Sélectionnez un service
                    </option>
                    {serviceCards.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              {serviceCards.map((service) => (
                <article
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className="group relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/40 to-slate-950/80 p-10 shadow-[0_26px_110px_rgba(59,130,246,0.24)] transition-transform duration-500 hover:-translate-y-1.5"
                  tabIndex={-1}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover:-left-10"
                  />
                  <div className="relative space-y-7">
                    <header className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">{service.title}</p>
                      <h3 className="text-2xl font-semibold leading-snug text-white">{service.hook}</h3>
                    </header>
                    <ul className="space-y-2 text-sm text-slate-200/80">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-100/80">
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">{service.timeline}</span>
                      <span className="rounded-full border border-cyan-200/30 bg-cyan-500/20 px-4 py-2 text-cyan-100/90">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-100/80">{service.proof}</p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                    >
                      <span>{service.cta}</span>
                      <span aria-hidden className="transition group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 space-y-12">
          <header className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-bold md:text-4xl">Comment ça se passe</h2>
            <p className="text-slate-200/70">
              Un process clair, cinq étapes. Vous gardez tous les exports finaux et l’accès aux fichiers pendant 12 mois.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_90px_rgba(14,165,233,0.2)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Étape 0{index + 1}</p>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-slate-200/80">{step.description}</p>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-10 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-8 rounded-[3rem] border border-white/10 bg-white/[0.05] p-12 shadow-[0_32px_120px_rgba(236,72,153,0.22)]">
            <header className="space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">Packs & options</h2>
              <p className="text-slate-200/70">
                Essentiel, Pro ou Full : choisissez la couverture qui correspond à votre enjeu. Chaque devis liste clairement ce qui est inclus, les délais et les conditions d’utilisation musique.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {packs.map((pack) => (
                <article key={pack.name} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
                  <h3 className="text-xl font-semibold text-white">{pack.name}</h3>
                  <p className="mt-3 text-sm text-slate-200/80">{pack.description}</p>
                  <p className="mt-5 text-sm font-semibold text-cyan-100/90">{pack.price}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="flex flex-col justify-between gap-6 rounded-[3rem] border border-white/10 bg-white/[0.05] p-12">
            <div>
              <h3 className="text-2xl font-semibold text-white">Options utiles</h3>
              <ul className="mt-6 space-y-3 text-sm text-slate-200/80">
                {options.map((option) => (
                  <li key={option} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Chaque devis précise délais, usages musicaux et conditions de diffusion.
            </p>
          </aside>
        </section>

        <section className="mt-24 space-y-8">
          <header className="space-y-4">
            <h2 className="text-3xl font-bold md:text-4xl">FAQ</h2>
            <p className="text-slate-200/70">Transparence totale sur tarifs, délais, droits et logistique.</p>
          </header>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_90px_rgba(14,165,233,0.18)] transition"
              >
                <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-white">
                  <span>{faq.question}</span>
                  <span aria-hidden className="text-cyan-200 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-10">
          <header className="space-y-4">
            <h2 className="text-3xl font-bold md:text-4xl">Témoignages</h2>
            <p className="text-slate-200/70">Des résultats concrets, livrés vite et bien.</p>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.author}
                className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(236,72,153,0.2)]"
              >
                <blockquote className="text-sm text-slate-200/80">{testimonial.quote}</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan-200/70">{testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-28 overflow-hidden rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/25 via-slate-950/70 to-fuchsia-500/20 p-12 shadow-[0_38px_160px_rgba(59,130,246,0.32)]">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black leading-snug">Prêt·e à lancer votre vidéo ?</h2>
              <p className="text-lg text-slate-100/90">
                Expliquez votre besoin en 2 minutes — je reviens vers vous sous 24h ouvrées.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                >
                  <span>Demander un devis</span>
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-cyan-200/40 bg-cyan-500/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/40"
                >
                  <span>Réserver un appel de 30 min</span>
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <p className="text-sm text-slate-100/70">Aucun engagement. Réponse claire, budget et délais.</p>
            </div>
            <form className="space-y-5 rounded-[2.8rem] border border-white/20 bg-white/10 p-8 text-sm text-slate-100/85 backdrop-blur-xl">
              <div className="space-y-2">
                <label htmlFor="objectif" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quel type de vidéo souhaitez-vous ?
                </label>
                <select
                  id="objectif"
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez une option
                  </option>
                  {serviceCards.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                  <option value="autre">Autre besoin vidéo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="budget" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quel ordre de budget ? (une fourchette suffit)
                </label>
                <input
                  id="budget"
                  type="text"
                  placeholder="Ex. 1 500 – 2 500 €"
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quelques lignes sur le contexte
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Aide : cible, diffusion, échéance..."
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-200/70">
                  Aide message : Quelques lignes sur le contexte, la cible, la diffusion.
                </p>
              </div>
              <label className="flex items-start gap-3 text-xs text-slate-200/80">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border border-white/30 bg-slate-950/60" />
                <span>Je consens à être recontacté·e (pas de spam).</span>
              </label>
              <button
                type="submit"
                className="w-full rounded-full border border-cyan-200/40 bg-cyan-500/35 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/45"
              >
                Envoyer la demande
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
