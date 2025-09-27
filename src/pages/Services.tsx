import { useMemo } from "react";
import { Link } from "react-router-dom";

import { CATEGORIES } from "@/components/header/nav.config";
import { methodSteps, servicesData, testimonials } from "@/lib/services";

const faqItems = [
  {
    question: "Quels délais ?",
    answer: "5 à 10 jours ouvrés après tournage selon la complexité (option express possible selon le service).",
  },
  {
    question: "Et si je n’ai pas d’idée ?",
    answer: "Le brief inclut un cadrage éditorial : je propose script, plan d’images et recommandations diffusion.",
  },
  {
    question: "Droits musicaux ?",
    answer: "Les musiques sous licence sont incluses pour les usages web et réseaux (hors TV/cinéma).",
  },
  {
    question: "Déplacements ?",
    answer: "Basé en Antilles-Guyane, déplacement partout en France & Europe (frais et autorisations en sus).",
  },
];

const uspList = [
  {
    icon: "✅",
    title: "Un seul interlocuteur",
    description: "Accompagnement, préparation, tournage & livraison (100% garanti)",
  },
  {
    icon: "🎯",
    title: "Pensé ROI",
    description: "Scénarisation orientée objectif (conversion, notoriété, vente)",
  },
  {
    icon: "⚡",
    title: "Délais courts",
    description: "Tournage réactif, option livraison express",
  },
  {
    icon: "📱",
    title: "Social-first",
    description: "Versions verticales & sous-titrées sur demande",
  },
];

const Services = () => {
  const services = useMemo(() => servicesData, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(56,189,248,0.24), transparent 55%), radial-gradient(circle at 80% 10%, rgba(147,51,234,0.18), transparent 60%), radial-gradient(circle at 50% 90%, rgba(236,72,153,0.2), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-32 pt-24 sm:px-10">
        <header className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/[0.05] p-12 shadow-[0_40px_140px_rgba(14,165,233,0.28)] backdrop-blur-3xl">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(125,211,252,0.15),rgba(244,114,182,0.1),rgba(14,165,233,0.25),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-200/30 bg-cyan-500/15 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                Services & Tarifs
              </span>
              <div className="space-y-6">
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Des vidéos pro qui font grandir votre marque
                </h1>
                <p className="max-w-2xl text-lg text-slate-200/85">
                  Vous imaginez, nous réalisons. Chez <strong>Studio VBG</strong>, nous concevons, organisons, tournons et montons des vidéos claires, belles et efficaces, taillées pour vos objectifs. Entreprise, événementiel, immobilier et mariage : des formats sur-mesure, livrés rapidement et optimisés pour le web et les réseaux sociaux.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-cyan-200/40 bg-cyan-500/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/35"
                >
                  Demander un devis
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/realisations"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                >
                  Voir des réalisations
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div key={service.slug} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                    <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{service.name}</dt>
                    <dd className="mt-3 text-2xl font-bold">{service.startingPrice}</dd>
                    <p className="text-xs text-slate-200/70">{service.timeline}</p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Stack créative Sept. 2025</p>
                <p className="text-sm leading-relaxed text-slate-200/80">
                  Sony Burano 8K · FX6 Duo · DJI Inspire 3 · Runway Gen-5 · Sora Color Suite · DaVinci Resolve Neural 19 · ElevenLabs Dubbing · Notion AI Ops.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Services phares</p>
                <ul className="space-y-2 text-sm text-slate-200/70">
                  {CATEGORIES.map((category) => (
                    <li key={category.slug} className="flex items-center justify-between gap-4">
                      <span>{category.label}</span>
                      <Link to={`/services/${category.slug}`} className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                        Voir
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Services</p>
              <h2 className="text-3xl font-bold text-white">Choisissez le format qui colle à votre objectif</h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              Des cartes modulaires pour accéder directement au service qui vous concerne. Chaque page détaille formats, livrables, tarifs et FAQ.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.slug} className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-slate-900/60 p-8 transition hover:border-cyan-300/40">
                <div aria-hidden className="absolute inset-0 translate-y-full bg-gradient-to-t from-sky-500/20 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0" />
                <div className="relative space-y-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/60">{service.name}</p>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/70">{service.description}</p>
                  <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                    Explorer le service
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            {uspList.map((usp) => (
              <div key={usp.title} className="flex gap-4 rounded-[2.5rem] border border-white/10 bg-slate-950/50 p-6">
                <span className="text-2xl" aria-hidden>
                  {usp.icon}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">{usp.title}</p>
                  <p className="text-sm text-white/75">{usp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Aperçu tarifs</h2>
          <p className="text-sm text-white/70">Les tarifs exacts dépendent du scénario, de la durée, du lieu et des options.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={`${service.slug}-pricing`} className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{service.name}</p>
                <p className="mt-3 text-2xl font-bold text-white">{service.startingPrice}</p>
                <p className="mt-2 text-sm text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 p-10 text-sm text-white/80 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Demander un devis en 2 minutes</h2>
            <p>
              Réponse sous 24 h ouvrées. Devis gratuit et sans engagement. Indiquez votre objectif, votre budget indicatif et votre deadline, on vous répond avec un cadrage précis.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
          >
            Demander un devis en 2 minutes
          </Link>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Méthode</h2>
            <ol className="grid gap-4 lg:grid-cols-5">
              {methodSteps.map((step, index) => (
                <li key={step.title} className="rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/50">Étape 0{index + 1}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <h2 className="text-3xl font-bold text-white">Témoignages</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6 text-sm text-white/75">
                <p className="italic text-white/85">“{testimonial.quote}”</p>
                <footer className="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">{testimonial.author}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">FAQ</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">{item.question}</p>
                  <p className="mt-2 text-sm text-white/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/80 p-10 text-sm text-white/80 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Prêts à démarrer ?</h2>
            <p>
              Formulaire : Nom, Email, Téléphone (option), Service, Budget indicatif, Message/objectif, Deadline.
            </p>
            <p className="text-white/60">Devis gratuit. Réponse sous 24 h ouvrées. Données non partagées.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/contact" className="rounded-full border border-sky-300/40 bg-sky-500/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Recevoir mon devis
            </Link>
            <Link to="/contact" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/15">
              Poser une question
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
