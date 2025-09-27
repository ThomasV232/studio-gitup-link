import { Link } from "react-router-dom";

import { servicesData } from "@/lib/services";

const testimonials = [
  {
    quote: "Un partenaire stratégique sur nos lancements : vision, pédagogie, exécution sans friction.",
    author: "Emma R.",
    role: "CMO · Scale-up SaaS",
  },
  {
    quote: "Capable d'orchestrer un tournage multi-sites en 48 h avec un rendu cinématique impeccable.",
    author: "Julien M.",
    role: "Responsable communication · Groupe industriel",
  },
  {
    quote: "L'accompagnement mêle créativité et pilotage business. Reporting limpide, équipe réactive.",
    author: "Sarah D.",
    role: "Directrice événementiel · Agence premium",
  },
];

const processSummary = [
  {
    title: "Co-création",
    description: "Ateliers vision, personas, scripts co-validés, moodboards immersifs, repérages 3D et planning partagé.",
  },
  {
    title: "Production",
    description: "Tournages agiles (Sony Burano 8K, drone FPV, audio HF), direction artistique et pipeline IA supervisé.",
  },
  {
    title: "Activation",
    description: "Montage, étalonnage ACES, déclinaisons verticales, sous-titres dynamiques et diffusion multicanale.",
  },
];

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
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 sm:px-10">
        <header className="grid gap-10 rounded-[3.5rem] border border-white/10 bg-white/5 p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70">
              À propos · Studio VBG
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Alex VBG — réalisateur, directeur artistique & stratège diffusion</h1>
            <p className="text-sm text-white/75">
              Diplômé en cinéma et passionné par l'innovation, j'accompagne depuis 2016 des marques, startups et institutions pour créer des expériences vidéo impactantes. Basé à Paris, je déploie un studio mobile (France & Europe) avec une stack Septembre 2025 mêlant captation haut de gamme, IA générative et outils de pilotage data.
            </p>
            <div className="grid gap-3 text-sm text-white/70">
              <p>• 140+ films livrés (corporate, événementiel, social, motion)</p>
              <p>• Clients : Station F, WeAre600, LVMH DARE, agences & scale-ups</p>
              <p>• Stack : Sony Burano 8K, FX6, DJI Inspire 3, Runway Gen-5, Sora, DaVinci Neural 19</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/realisations"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
              >
                Voir le showreel
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
              >
                Échanger sur un projet
              </Link>
            </div>
          </div>
          <div className="relative flex h-full items-center justify-center">
            <div className="relative h-[320px] w-[260px] overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-6 text-center">
                <span className="text-xs uppercase tracking-[0.4em] text-white/60">Directeur créatif</span>
                <span className="text-2xl font-semibold text-white">Alex VBG</span>
              </div>
              <div className="absolute inset-0 animate-[pulse_10s_ease_infinite] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_55%)]" aria-hidden />
            </div>
          </div>
        </header>

        <section className="grid gap-8 rounded-[3rem] border border-white/10 bg-white/5 p-10 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Approche</h2>
            <p className="text-sm text-white/70">
              Relation directe, process transparents, obsession du détail. Chaque projet démarre par un cadrage stratégique pour aligner image, message et KPI.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Équipe & réseau</h2>
            <p className="text-sm text-white/70">
              Collectif d'opérateurs drone, motion designers, ingénieurs son, maquilleurs et assistants production pour dimensionner l'équipe selon votre besoin.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Stack 2025</h2>
            <p className="text-sm text-white/70">
              Sony Burano 8K · FX6 · DJI Inspire 3 & Avata 2 · Optiques G Master · Aputure Infinibar · Runway Gen-5 · Sora Color Suite · Notion AI Ops.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold">Méthodologie</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {processSummary.map((step, index) => (
              <div key={step.title} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">Phase 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold">Témoignages</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author} className="flex h-full flex-col gap-4 rounded-[2.75rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm italic text-white/80">“{testimonial.quote}”</p>
                <footer className="mt-auto text-xs uppercase tracking-[0.35em] text-white/60">
                  <span className="block font-semibold text-white">{testimonial.author}</span>
                  <span className="text-white/60">{testimonial.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-extrabold">Services phares</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {servicesData.map((service) => (
              <article key={service.slug} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">{service.slug.replace(/-/g, " ")}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{service.name}</h3>
                <p className="mt-3 text-sm text-white/70">{service.subtitle}</p>
                <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                  Voir le détail
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 p-10 text-sm text-white/75 backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">Contact & Devis</p>
          <h2 className="mt-4 text-3xl font-extrabold text-white">Envie d'échanger autour de votre prochain film ?</h2>
          <p className="mt-4 max-w-3xl">
            Décrivez votre projet, vos objectifs et vos délais : je reviens sous 24 h avec un premier cadrage budgétaire, un plan de tournage et des idées de diffusion.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/contact" className="rounded-full border border-sky-300/40 bg-sky-500/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Ouvrir le formulaire
            </Link>
            <Link to="https://cal.com" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/15">
              Réserver un créneau visio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
