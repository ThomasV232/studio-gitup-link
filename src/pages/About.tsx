import { Link } from "react-router-dom";

import { servicesData } from "@/lib/services";

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 60%, rgba(236,72,153,0.15), transparent 60%), linear-gradient(160deg, rgba(15,23,42,0.92), rgba(15,23,42,0.72))",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 pt-28 sm:px-10">
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">À propos</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Alex VBG, vidéaste freelance & directeur artistique</h1>
          <p className="max-w-3xl text-base text-white/70">
            Depuis 2016, j'accompagne des marques, des startups et des agences pour produire des films qui mixent esthétique
            cinématographique, narration incarnée et innovation technologique. Basé à Paris, je me déplace en France et en Europe
            avec un studio mobile pensé pour 2025.
          </p>
        </header>

        <section className="grid gap-8 rounded-[3rem] border border-white/10 bg-white/5 p-10 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Approche</h2>
            <p className="text-sm text-white/70">
              Une relation directe, des process transparents et une obsession pour le détail. Du cadrage éditorial à la diffusion,
              tout est orchestré pour vous faire gagner du temps et de l'impact.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Équipement</h2>
            <p className="text-sm text-white/70">
              Sony Burano 8K, FX6, FX3, drones DJI Inspire 3 et Avata 2, optiques G Master, set audio Sennheiser 6000, éclairage
              Aputure Infinibar, station mobile M3 Max.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Réseau</h2>
            <p className="text-sm text-white/70">
              Un collectif d'opérateurs drone, motion designers, maquilleurs et ingénieurs du son pour dimensionner les équipes
              selon votre projet.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold">Méthodologie</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {["Co-création", "Production", "Diffusion"].map((step, index) => (
              <div key={step} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">Phase 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{step}</h3>
                <p className="mt-3 text-sm text-white/70">
                  {index === 0 && "Atelier vision, moodboard, repérages et script validés ensemble."}
                  {index === 1 && "Tournages agiles, direction artistique exigeante et coordination des talents."}
                  {index === 2 && "Montage, déclinaisons, sous-titres dynamiques et accompagnement à la mise en ligne."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold">Services phares</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {servicesData.slice(0, 4).map((service) => (
              <article key={service.slug} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">{service.slug.replace(/-/g, " ")}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-white/70">{service.subtitle}</p>
                <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                  Voir le détail
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-white/5 p-10 text-center text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">Next step</p>
          <h2 className="mt-4 text-3xl font-extrabold text-white">Envie d'échanger autour de votre prochain film ?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/quote" className="rounded-full border border-sky-300/40 bg-sky-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Réserver un call
            </Link>
            <Link to="/realisations" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 hover:text-white">
              Voir les réalisations
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
