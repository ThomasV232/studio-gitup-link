import { useMemo } from "react";
import { Link } from "react-router-dom";

import { methodSteps, servicesData } from "@/lib/services";

const Services = () => {
  const services = useMemo(() => servicesData, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.16), transparent 60%), radial-gradient(circle at 50% 90%, rgba(14,165,233,0.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-32 pt-20 sm:px-10">
        <header className="rounded-[3.5rem] border border-white/10 bg-slate-950/70 p-12 shadow-[0_30px_160px_rgba(56,189,248,0.28)] backdrop-blur-3xl">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/70">
                Services & Tarifs
              </span>
              <div className="space-y-5">
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Des vidéos pro qui font grandir votre marque
                </h1>
                <p className="max-w-2xl text-lg text-white/75">
                  Vous imaginez, nous réalisons. Chez <strong>Studio VBG</strong>, nous concevons, organisons, tournons et montons des vidéos claires, belles et efficaces pour vos objectifs : entreprise, événementiel, immobilier, réseaux sociaux, mariage ou formats hybrides IA.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact?focus=devis"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5"
                >
                  Demander un devis
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  Voir des réalisations
                </Link>
              </div>
            </div>

            <div className="space-y-5 rounded-[2.75rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Pourquoi Studio VBG ?
              </p>
              <ul className="space-y-3 text-sm text-white/75">
                <li>✅ Un seul interlocuteur du brief à la livraison</li>
                <li>🎯 Pensé ROI : script orienté conversion & diffusion</li>
                <li>⚡ Délais courts avec options express</li>
                <li>📱 Social-first : déclinaisons verticales & sous-titres</li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
                Droits, révisions, livrables détaillés → FAQ budgétaire dans le <Link to="/blog" className="underline decoration-dotted decoration-white/50 underline-offset-4">Blog</Link>.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Panorama des services
              </p>
              <h2 className="text-3xl font-bold text-white">Choisissez le module adapté à votre objectif</h2>
            </div>
            <p className="max-w-xl text-sm text-white/65">
              Chaque section ci-dessous se concentre sur un format précis : déroulement, process détaillé et packs clairs. Les fiches complètes restent accessibles pour approfondir.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={`${service.slug}-card`}
                to={`#${service.slug}`}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6 transition hover:border-sky-300/40"
              >
                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-sky-500/20 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0" aria-hidden />
                <div className="relative space-y-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">{service.name}</p>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/70">{service.description}</p>
                  <div className="flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
                    <span>{service.startingPrice}</span>
                    <span>{service.timeline}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-sky-200">
                    Explorer le détail
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {services.map((service) => (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-32 space-y-12 rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl"
          >
            <header className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                  {service.name}
                </span>
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-white">{service.title}</h3>
                  <p className="text-base text-white/75">{service.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-white/70">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">À partir de</p>
                    <p className="mt-2 text-xl font-semibold text-white">{service.startingPrice}</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Timeline</p>
                    <p className="mt-2 text-xl font-semibold text-white">{service.timeline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {service.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/70"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 text-sm text-white/75">
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Formats proposés</p>
                <ul className="mt-4 space-y-3">
                  {service.formats.map((format) => (
                    <li key={format.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">{format.title}</p>
                      <p className="mt-1 text-sm text-white/70">{format.description}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </header>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">Essentiel du déroulement</h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {(
                      [
                        { label: "Préprod", steps: service.workflow.preprod },
                        { label: "Prod", steps: service.workflow.production },
                        { label: "Postprod", steps: service.workflow.postprod },
                        { label: "Livrables", steps: service.workflow.delivery },
                      ] as const
                    ).map((block) => (
                      <div key={block.label} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">{block.label}</p>
                        <ul className="mt-3 space-y-2 text-sm text-white/75">
                          {block.steps.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">Processus détaillé</h4>
                  <ol className="grid gap-4 sm:grid-cols-2">
                    {service.process.map((phase, index) => (
                      <li key={phase.title} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
                        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Étape 0{index + 1}</p>
                        <p className="mt-3 text-lg font-semibold text-white">{phase.title}</p>
                        <p className="mt-2 text-sm text-white/75">{phase.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Livrables inclus</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-300" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.options?.length ? (
                  <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Options</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/80">
                      {service.options.map((option) => (
                        <li key={option} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 text-sm text-white/80">
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/55">Packs & tarifs</p>
                  <div className="mt-3 grid gap-3">
                    {service.pricing.map((pack) => (
                      <div key={pack.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{pack.name}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{pack.price}</p>
                        <p className="mt-1 text-sm text-white/70">{pack.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={`/contact?service=${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-sky-500/20 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white"
                    >
                      Demander un devis
                    </Link>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/75 transition hover:bg-white/15 hover:text-white"
                    >
                      Voir la fiche détaillée
                    </Link>
                  </div>
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-white/55">
                  Besoin de précisions sur droits musicaux, révisions ou délais ? Consultez la <Link to="/blog" className="underline decoration-dotted decoration-white/50 underline-offset-4">FAQ budgétaire</Link> du blog.
                </p>
              </aside>
            </div>
          </section>
        ))}

        <section className="space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Méthode Studio VBG</h2>
            <p className="text-sm text-white/70">
              Brief clair → Préparation simple → Tournage léger → Montage soigné → Livraison multi-formats. La même exigence s’applique à chaque service, avec des ajustements selon votre secteur.
            </p>
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

        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/80 p-10 text-sm text-white/75 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Prêts à cadrer votre projet ?</h2>
            <p>
              Brief express, budget indicatif et deadline suffisent pour recevoir un cadrage clair sous 24 h ouvrées. Formulaire + prise de rendez-vous disponibles sur la page contact.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
          >
            Accéder au formulaire contact & devis
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Services;
