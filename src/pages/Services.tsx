import { useMemo } from "react";
import { Link } from "react-router-dom";

import { CATEGORIES } from "@/components/header/nav.config";
import { servicesData } from "@/lib/services";

const heroHighlights = [
  { label: "Stack 2025", value: "Burano 8K + Gen-5", note: "Workflow hybride IA & humain" },
  { label: "Délais", value: "72 h – 5 sem.", note: "selon complexité & diffusion" },
  { label: "Satisfaction", value: "4,9/5", note: "Avis clients vérifiés" },
];

const servicePacks: Record<string, { name: string; description: string; price: string; includes: string[] }[]> = {
  entreprise: [
    {
      name: "Pack Journée",
      description: "1 jour de tournage multicam + interviews", 
      price: "À partir de 1 900 € HT",
      includes: ["Film 60–90 s", "2 teasers 9:16", "Sous-titres FR/EN"],
    },
    {
      name: "Pack Weekend",
      description: "2 jours (interviews + B-roll terrain)",
      price: "Dès 2 900 € HT",
      includes: ["Film 90 s", "4 capsules 15 s", "Miniatures brandées"],
    },
    {
      name: "Pack Sur demande",
      description: "Narration premium + captations multi-sites",
      price: "Sur devis", 
      includes: ["Script direction com.", "Version 1:1 et 9:16", "Plan diffusion clé en main"],
    },
  ],
  evenementiel: [
    {
      name: "Pack Journée",
      description: "Captation express 1 jour",
      price: "À partir de 1 400 € HT",
      includes: ["Aftermovie 60 s", "Stories verticales", "Livraison J+3"],
    },
    {
      name: "Pack Weekend",
      description: "2 jours d'événement",
      price: "Dès 2 200 € HT",
      includes: ["Aftermovie 90 s", "5 capsules sponsor", "Galerie photo optionnelle"],
    },
    {
      name: "Pack Sur demande",
      description: "Couverture complète + live clips",
      price: "Sur devis",
      includes: ["Highlights demi-journée", "Montage 24 h", "Kit médias partenaires"],
    },
  ],
  immobilier: [
    {
      name: "Pack Journée",
      description: "Visite 4K HDR",
      price: "À partir de 650 € HT",
      includes: ["Film 60 s", "Version 9:16", "Photos HDR option"],
    },
    {
      name: "Pack Weekend",
      description: "2 biens ou biens premium",
      price: "Dès 1 150 € HT",
      includes: ["Plans drone", "Titres quartiers", "Miniatures agence"],
    },
    {
      name: "Pack Sur demande",
      description: "Programme neuf / luxe",
      price: "Sur devis",
      includes: ["Interviews promoteur", "Version ADS", "Visite virtuelle option"],
    },
  ],
  "reseaux-sociaux": [
    {
      name: "Pack Journée",
      description: "Tournage batch 6 vidéos",
      price: "À partir de 1 050 € HT",
      includes: ["6 formats 9:16", "Scripts + prompts", "Sous-titres dynamiques"],
    },
    {
      name: "Pack Weekend",
      description: "Tournage 2 jours",
      price: "Dès 1 850 € HT",
      includes: ["12 vidéos 9:16", "Templates motion", "Planning publication"],
    },
    {
      name: "Pack Sur demande",
      description: "Programme 3 mois",
      price: "Sur devis",
      includes: ["16-24 vidéos/mois", "Dashboards KPI", "Coaching équipes"],
    },
  ],
  mariage: [
    {
      name: "Pack Journée",
      description: "Cérémonie + cocktail",
      price: "À partir de 1 750 € TTC",
      includes: ["Film 6-8 min", "Teaser 60 s", "Discours micro HF"],
    },
    {
      name: "Pack Weekend",
      description: "Préparatifs + jour J complet",
      price: "Dès 2 450 € TTC",
      includes: ["Film 10-12 min", "Clips réseaux", "Coffret USB"],
    },
    {
      name: "Pack Sur demande",
      description: "Destination / production élargie",
      price: "Sur devis",
      includes: ["Drone FPV", "Voix-off storytelling", "Montage express 72 h"],
    },
  ],
  "motion-design-ia": [
    {
      name: "Pack Journée",
      description: "Script + storyboard + animatic",
      price: "À partir de 2 200 € HT",
      includes: ["Vidéo 45 s", "Habillage sonore", "Illustrations personnalisées"],
    },
    {
      name: "Pack Weekend",
      description: "Motion + IA générative",
      price: "Dès 3 200 € HT",
      includes: ["Vidéo 60-75 s", "Version 9:16", "Titres multilingues"],
    },
    {
      name: "Pack Sur demande",
      description: "Série pédagogique / onboarding",
      price: "Sur devis",
      includes: ["3-5 épisodes", "Assistant IA voix", "Guide diffusion"],
    },
  ],
};

const Services = () => {
  const services = useMemo(() => servicesData, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at 80% 15%, rgba(147,51,234,0.18), transparent 60%), radial-gradient(circle at 50% 90%, rgba(236,72,153,0.2), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-24 sm:px-10">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/[0.04] p-12 shadow-[0_40px_140px_rgba(14,165,233,0.28)] backdrop-blur-3xl">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(125,211,252,0.15),rgba(244,114,182,0.1),rgba(14,165,233,0.25),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="space-y-10">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-200/30 bg-cyan-500/15 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                Services & Tarifs · Septembre 2025
              </span>
              <div className="space-y-6">
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Des offres packagées, pilotées et mesurables
                </h1>
                <p className="max-w-2xl text-lg text-slate-200/80">
                  De l'idée au plan de diffusion, chaque service suit un pipeline préproduction → production → postproduction → activation. Vous choisissez le pack, nous orchestrons le reste.
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
              <dl className="grid gap-6 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
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

        {/* SERVICE SECTIONS */}
        <div className="mt-20 space-y-16">
          {services.map((service) => {
            const packs = servicePacks[service.slug] ?? [];
            return (
              <section
                key={service.slug}
                id={`service-${service.slug}`}
                className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                      <span>{service.title}</span>
                      <span className="opacity-50">•</span>
                      <span>{service.timeline}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">{service.hook}</h2>
                    <p className="text-sm text-white/70">{service.promise}</p>
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Essentiel du déroulement</p>
                      <ol className="grid gap-3 text-sm text-white/70">
                        {service.phases.slice(0, 5).map((phase, index) => (
                          <li
                            key={phase.title}
                            className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-4"
                          >
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/50">
                              Étape 0{index + 1}
                            </p>
                            <p className="mt-2 text-sm text-white">{phase.title}</p>
                            <p className="mt-1 text-sm text-white/70">{phase.description}</p>
                            <p className="mt-2 text-xs text-sky-200/80">Upgrade IA : {phase.aiUpgrade}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Packs & livrables</p>
                      <div className="grid gap-4">
                        {packs.map((pack) => (
                          <div key={pack.name} className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/70">
                              <span className="text-white">{pack.name}</span>
                              <span>{pack.price}</span>
                            </div>
                            <p className="mt-2 text-sm text-white/60">{pack.description}</p>
                            <ul className="mt-4 space-y-2 text-sm text-white/70">
                              {pack.includes.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" aria-hidden />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6 text-sm text-white/70">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Livrables inclus</p>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/50">Preuve</p>
                      <p className="text-sm text-white">{service.proof}</p>
                      <Link
                        to={`/contact?service=${service.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200"
                      >
                        Demander un devis détaillé
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-20 rounded-[3rem] border border-white/10 bg-slate-950/70 p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">FAQ budgétaire</p>
          <p className="mt-3">
            Pour toutes les questions liées aux droits musicaux, aux révisions, aux délais ou aux livrables, consultez la section « Conseils » du blog. Vous y trouverez les repères budgétaires détaillés et des modèles de checklists à télécharger.
          </p>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            Accéder à la FAQ
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
