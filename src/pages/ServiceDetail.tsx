import { Link, useParams } from "react-router-dom";
import { methodSteps, servicesData } from "@/lib/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Service introuvable</p>
        <h1 className="mt-4 text-4xl font-bold">Ce module n'est pas disponible pour le moment.</h1>
        <Link
          to="/services"
          className="mt-8 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
        >
          Retour aux services
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "conic-gradient(from 120deg at 20% 20%, hsla(var(--visual-accent, 190 95% 62%)/0.25), hsla(var(--visual-secondary, 286 74% 63%)/0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-10">
        {/* HERO */}
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(34,211,238,0.2)] visual-accent-veil">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                {service.name}
              </span>
              <div className="space-y-4">
                <h1 className="text-5xl font-black">{service.title}</h1>
                <p className="max-w-2xl text-lg text-slate-200/85">{service.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-200/70">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">À partir de</p>
                  <p className="mt-2 text-xl font-semibold text-white">{service.startingPrice}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Timeline</p>
                  <p className="mt-2 text-xl font-semibold text-white">{service.timeline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white"
                >
                  {service.ctaLabel}
                </Link>
                <Link
                  to="/services"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/15"
                >
                  Revenir aux services
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6 text-sm text-white/75">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Preuves & avantages</p>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        {/* CONTENU */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            {/* Formats */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_15px_80px_rgba(14,165,233,0.2)] visual-accent-glow">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">Formats proposés</p>
              <ul className="mt-4 space-y-4 text-sm text-slate-200/85">
                {service.formats.map((format) => (
                  <li key={format.title} className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-white">{format.title}</p>
                    <p className="mt-1 text-sm text-white/75">{format.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Essentiel du déroulement (affiché si workflow présent) */}
            {service.workflow && (
              <div className="space-y-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="text-3xl font-bold text-white">Essentiel du déroulement</h2>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Préprod → Livrables</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {(
                    [
                      { label: "Préprod", steps: service.workflow.preprod },
                      { label: "Prod", steps: service.workflow.production },
                      { label: "Postprod", steps: service.workflow.postprod },
                      { label: "Livrables", steps: service.workflow.delivery },
                    ] as const
                  ).map((block) => (
                    <div key={block.label} className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/55">
                        {block.label}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-white/75">
                        {block.steps.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 visual-accent-dot" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Processus (générique) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-6">
                <h2 className="text-3xl font-bold text-white">Processus</h2>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Étapes clés</p>
              </div>
              <ol className="grid gap-4 md:grid-cols-2">
                {service.process.map((phase, index) => (
                  <li key={phase.title} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/50">
                      Étape 0{index + 1}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">{phase.title}</p>
                    <p className="mt-2 text-sm text-white/75">{phase.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ASIDE */}
          <aside className="space-y-8">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">Livrables inclus</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/80">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.options?.length ? (
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">Options</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
                  {service.options.map((option) => (
                    <li key={option} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-300 visual-secondary-dot" aria-hidden />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 visual-accent-text">Prêt à démarrer ?</p>
              <p className="mt-3 text-white/85">{service.ctaSubcopy}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white"
              >
                {service.ctaLabel}
              </Link>
            </div>
          </aside>
        </section>

        {/* TARIFS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Tarifs indicatifs</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {service.pricing.map((pack) => (
              <div key={pack.name} className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{pack.name}</p>
                <p className="mt-3 text-2xl font-bold text-white">{pack.price}</p>
                <p className="mt-2 text-sm text-white/75">{pack.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 p-10 text-sm text-white/80 backdrop-blur-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">{service.ctaLabel}</h2>
            <p>{service.ctaSubcopy}</p>
            <p className="text-white/70">Réponse sous 24 h ouvrées. Devis gratuit et sans engagement.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
            >
              Demander un devis
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
            >
              Poser une question
            </Link>
          </div>
        </section>

        {/* FAQ (si fournie) ou renvoi blog */}
        {service.faqs?.length ? (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white">FAQ</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {service.faqs.map((item) => (
                <div key={item.question} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">{item.question}</p>
                  <p className="mt-2 text-sm text-white/75">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 text-sm text-white/75 backdrop-blur-2xl">
            <h2 className="text-3xl font-bold text-white">Questions budgétaires & pratiques</h2>
            <p className="mt-4">
              Droits musicaux, révisions, délais précis, formats de livraison ou conditions de déplacement sont détaillés
              dans la{" "}
              <Link to="/blog" className="underline decoration-dotted decoration-white/50 underline-offset-4">
                FAQ budgétaire du blog
              </Link>
              . Vous pouvez aussi ajouter vos questions dans le formulaire de contact.
            </p>
          </section>
        )}

        {/* Méthode studio (générique) */}
        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          <h2 className="text-3xl font-bold text-white">Méthode Studio VBG</h2>
          <p className="mt-3 text-sm text-white/70">
            Brief clair → Préparation simple → Tournage léger → Montage soigné → Livraison multi-formats.
          </p>
          <ol className="mt-6 grid gap-4 lg:grid-cols-5">
            {methodSteps.map((step, index) => (
              <li key={step.title} className="rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/50">Étape 0{index + 1}</p>
                <p className="mt-3 text-lg font-semibold text-white">{step.title}</p>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
