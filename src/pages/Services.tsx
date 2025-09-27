import { useMemo } from "react";
import { Link } from "react-router-dom";

import { methodSteps, servicesData } from "@/lib/services";

const uspList = [
  "✅ Un seul interlocuteur : accompagnement, préparation, tournage & livraison (100% garanti)",
  "🎯 Pensé ROI : scénarisation orientée objectif (conversion, notoriété, vente)",
  "⚡ Délais courts : tournage réactif, option livraison express",
  "📱 Social-first : versions verticales & sous-titrées sur demande",
];

const pricingPreview = [
  "Entreprise : à partir de 950 € HT (tournage 1 journée + montage court)",
  "Événementiel : à partir de 1 500 € HT (tournage journée + aftermovie 60–90 s)",
  "Immobilier : à partir de 450 € HT (prise de vue + montage 45–60 s)",
  "Mariage : à partir de 1 600 € TTC (préparatifs → soirée, film 4–6 min)",
];

const faqExcerpt = [
  {
    question: "Quels délais ?",
    answer: "5 à 10 jours ouvrés après tournage selon la complexité.",
  },
  {
    question: "Et si je n’ai pas d’idée ?",
    answer: "Je propose script + plan d’images selon vos objectifs.",
  },
  {
    question: "Droits musicaux ?",
    answer: "Musiques sous licence incluse pour le web (hors TV/cinéma).",
  },
  {
    question: "Déplacements ?",
    answer: "Basé à [Ville], déplacements partout (frais en sus).",
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
            "radial-gradient(circle at 20% 15%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.16), transparent 60%), radial-gradient(circle at 50% 95%, rgba(14,165,233,0.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-32 pt-20 sm:px-10">
        <header className="space-y-10 rounded-[3.5rem] border border-white/10 bg-slate-950/70 p-12 shadow-[0_30px_160px_rgba(56,189,248,0.28)] backdrop-blur-3xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/70">
                Services & Tarifs
              </span>
              <div className="space-y-5">
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Des vidéos pro qui font grandir votre marque
                </h1>
                <div className="space-y-3 text-lg text-white/75">
                  <p>Vous imaginez, nous réalisons.</p>
                  <p>
                    Chez <strong>Studio VBG</strong>, nous concevons, organisons, tournons et montons des vidéos claires, belles et efficaces, taillées pour vos objectifs. Entreprise, événementiel, immobilier et mariage : des formats sur-mesure, livrés rapidement et optimisés pour le web et les réseaux sociaux.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5"
                >
                  Demander un devis en 2 minutes
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  Voir des réalisations
                </Link>
              </div>
              <p className="text-sm text-white/60">
                <span className="font-semibold">Microcopy :</span> Réponse sous 24 h ouvrées. Devis gratuit et sans engagement.
              </p>
            </div>

            <div className="space-y-4 rounded-[2.75rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Blocs cartes services</p>
              <ul className="space-y-3 text-sm text-white/75">
                <li>
                  <strong>Vidéo d’entreprise</strong> → Film de marque, interviews, recrutement, témoignages clients.
                </li>
                <li>
                  <strong>Vidéos événementielles</strong> → Aftermovie, teaser, captation conférences & salons.
                </li>
                <li>
                  <strong>Vidéo immobilière</strong> → Biens résidentiels & pros, visites filmées + drone.
                </li>
                <li>
                  <strong>Film de mariage</strong> → Un film authentique, naturel et élégant de votre journée.
                </li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
                Chaque carte ouvre une fiche détaillée sans tarifs dans Réalisations.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Panorama des services</p>
              <h2 className="text-3xl font-bold text-white">Choisissez le module adapté à votre objectif</h2>
            </div>
            <p className="max-w-xl text-sm text-white/65">
              Chaque section ci-dessous se concentre sur un format précis : déroulement, process détaillé et packs clairs. Les fiches complètes restent accessibles pour approfondir.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6 transition hover:border-sky-300/40"
              >
                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-sky-500/20 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0" aria-hidden />
                <div className="relative space-y-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">{service.name}</p>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/70">{service.description}</p>
                </div>
                <div className="relative flex flex-col gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
                  <span>{service.startingPrice}</span>
                  <span>{service.timeline}</span>
                  <span className="inline-flex items-center gap-2 text-sky-200">
                    Voir le détail <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Preuves & USP</h2>
            <ul className="space-y-3 text-sm text-white/75">
              {uspList.map((usp) => (
                <li key={usp} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" aria-hidden />
                  <span>{usp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Aperçu tarifs (extraits)</h3>
            <ul className="space-y-3 text-sm text-white/75">
              {pricingPreview.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/60">Les tarifs exacts dépendent du scénario, de la durée, du lieu et des options.</p>
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/80 p-10 text-sm text-white/75 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Demander un devis</h2>
            <p>
              Formulaire court : service, budget, objectifs, deadline. Lien prise de rendez-vous disponible sur la page contact.
            </p>
            <p className="text-white/65">Réponse sous 24 h ouvrées. Devis gratuit et sans engagement.</p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
          >
            Accéder au formulaire Contact & Devis
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/55">
            Pour droits musicaux, révisions, délais et livrables → voir la FAQ budgétaire dans le blog.
          </p>
        </section>

        <section className="space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Méthode Studio VBG</h2>
            <p className="text-sm text-white/70">Brief clair → Préparation simple → Tournage léger → Montage soigné → Livraison multi-formats. La même exigence s’applique à chaque service, avec des ajustements selon votre secteur.</p>
          </div>
          <ol className="grid gap-4 lg:grid-cols-5">
            {methodSteps.map((step, index) => (
              <li key={step.title} className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6">
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Étape 0{index + 1}</p>
                <p className="mt-3 text-lg font-semibold text-white">{step.title}</p>
                <p className="mt-2 text-sm text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">FAQ (extrait)</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {faqExcerpt.map((faq) => (
                <div key={faq.question} className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6">
                  <p className="text-sm font-semibold text-white">{faq.question}</p>
                  <p className="mt-2 text-sm text-white/75">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/65">
              FAQ budgétaire complète disponible dans la rubrique <Link to="/blog" className="underline decoration-dotted decoration-white/50 underline-offset-4">Conseils</Link>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
