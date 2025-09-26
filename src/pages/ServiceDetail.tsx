import { Link, useParams } from "react-router-dom";
import { servicesData } from "@/lib/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Service introuvable</p>
        <h1 className="mt-4 text-4xl font-bold">Ce module n'est pas disponible pour le moment.</h1>
        <Link to="/services" className="mt-8 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white">
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
            "conic-gradient(from 120deg at 20% 20%, hsla(var(--visual-accent)/0.25), hsla(var(--visual-secondary)/0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(34,211,238,0.2)] visual-accent-veil">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Module Studio VBG
              </span>
              <h1 className="text-5xl font-black">{service.title}</h1>
              <p className="text-lg text-slate-200/80">{service.subtitle}</p>
            </div>
            <div className="text-sm text-slate-200/70">
              <p className="uppercase tracking-[0.3em] text-cyan-200/80 visual-accent-text">Point différenciant</p>
              <p className="mt-2 text-lg text-white">{service.signatureMove}</p>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_15px_80px_rgba(14,165,233,0.2)] visual-accent-glow">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Narration</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-200/80">{service.promise}</p>
            </div>
            <div className="space-y-6">
              {service.phases.map((phase, index) => (
                <div
                  key={phase.title}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_20px_90px_rgba(236,72,153,0.18)] visual-secondary-veil"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-fuchsia-500/20 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                      <span>Phase 0{index + 1}</span>
                      <span>{phase.aiUpgrade}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{phase.title}</h2>
                    <p className="text-sm text-slate-200/80">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-8">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Livrables inclus</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/80">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Chiffres clés</p>
              <ul className="mt-4 space-y-4 text-sm text-slate-200/80">
                {service.metrics.map((metric) => (
                  <li key={metric.label} className="rounded-2xl bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold text-cyan-200 visual-accent-text">{metric.value}</p>
                    <p className="text-xs text-slate-200/60">{metric.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Étape suivante</p>
              <p className="mt-4">Intéressé par ce module ? Connectez-vous, demandez un devis et nous lançons la préproduction.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/auth" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  Me connecter
                </Link>
                <Link to="/quote" className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  Demander un devis
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
