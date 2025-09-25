import { Link } from "react-router-dom";
import { servicesData } from "@/lib/services";

const Services = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(8,145,178,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.25),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-32 pt-32">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_25px_120px_rgba(14,165,233,0.2)]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                Services Studio VBG · 2025
              </span>
              <h1 className="text-5xl font-black leading-tight">
                Trois modules interstellaires pour propulser vos contenus vidéo
              </h1>
              <p className="text-lg text-slate-200/80">
                Chaque service est pensé comme un épisode de série premium : intro explosive, développement punchy, final qui fait cliquer.
                On combine plateau réel, IA générative et humour bien dosé.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-slate-200/70">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Synergie stack</p>
                <p className="mt-2">Midjourney V7 · Kling 2.5 · Seedance Pro · Veo 3 · Suno AI · LypSync V2</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Petit plus</p>
                <p className="mt-2">Chaque module inclut un icebreaker comique avec votre équipe.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-12">
          {servicesData.map((service, index) => (
            <article
              key={service.slug}
              className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/40 to-slate-900/60 p-12 shadow-[0_20px_120px_rgba(59,130,246,0.18)]"
            >
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent opacity-0 transition-all duration-700 hover:translate-x-0 hover:opacity-100" />
              <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                    <span>Module 0{index + 1}</span>
                    <span>{service.signatureMove}</span>
                  </div>
                  <h2 className="text-4xl font-extrabold">{service.title}</h2>
                  <p className="text-lg text-slate-200/80">{service.subtitle}</p>
                  <div className="grid gap-4 text-sm text-slate-200/80 lg:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Problème</p>
                      <p className="mt-2 leading-relaxed">{service.problem}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Promesse</p>
                      <p className="mt-2 leading-relaxed">{service.promise}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                    {service.stack.map((tool) => (
                      <span key={tool} className="rounded-full border border-cyan-200/30 bg-cyan-500/10 px-4 py-2">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                  >
                    Découvrir les coulisses
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Livrables</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-cyan-300" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Chiffres clés</p>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200/80">
                      {service.metrics.map((metric) => (
                        <li key={metric.label} className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-3">
                          <span>{metric.label}</span>
                          <span className="text-cyan-200">{metric.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center text-sm text-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Envie d'un mix personnalisé ?</p>
          <p className="mt-6 text-3xl font-semibold text-white">
            On assemble un module sur-mesure en mixant nos services, on y ajoute une pincée d'IA et une blague bien placée.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/quote"
              className="rounded-full border border-cyan-200/30 bg-cyan-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              Je veux un devis futuriste
            </Link>
            <Link
              to="/auth"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              Me connecter avant de briefer
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
