import { Link } from "react-router-dom";
import { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";

const heroHooks = [
  "Votre board veut du wow. On livre du *whoa*.",
  "Les algorithmes scrollent aussi — parlons leur langage.",
  "Les budgets n'aiment pas les tunnels sans fin. Nous non plus.",
];

const techStack = [
  "Midjourney V7",
  "Kling 2.5",
  "Seedance Pro",
  "Veo 3",
  "Suno AI",
  "LypSync V2",
  "DaVinci Resolve",
  "Adobe Video Sensei",
];

const Index = () => {
  const { portfolioItems, recordContactRequest } = useStudio();
  const [hookIndex, setHookIndex] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectSpark: "",
    urgency: "hier" as const,
  });

  const heroProject = portfolioItems[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_45deg_at_30%_30%,rgba(59,130,246,0.18),rgba(236,72,153,0.18),transparent_70%)]" />
      <div className="relative">
        <header className="mx-auto flex max-w-7xl flex-col gap-12 px-6 pt-20 pb-28 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-10">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200 backdrop-blur">
              Studio VBG · Agence vidéaste 2025
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400 bg-clip-text text-transparent">
                Studio VBG
              </span>{" "}
              orchestre vos contenus vidéo comme un{' '}
              <span className="underline decoration-wavy decoration-cyan-300">thriller orbital</span>.
            </h1>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-lg leading-relaxed shadow-[0_0_60px_rgba(56,189,248,0.25)]">
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <p className="font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Hook du moment</p>
              <p className="mt-4 text-2xl" onMouseEnter={() => setHookIndex((i) => (i + 1) % heroHooks.length)}>
                {heroHooks[hookIndex]}
              </p>
              <p className="mt-6 text-sm text-slate-200/80">
                Nous mixons humour calibré, pipeline IA et équipes plateau pour que vos stories deviennent des franchises.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="group relative overflow-hidden rounded-full border border-cyan-200/30 bg-cyan-500/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-100 shadow-[0_10px_40px_rgba(8,145,178,0.35)] transition hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-xl">⚡</span> Demande de devis quantique
                </span>
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-500 transition-all duration-500 group-hover:translate-y-0" />
              </Link>
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-xl">📞</span> Demande rapide
                </span>
                <span className="absolute inset-0 -z-0 translate-y-full bg-white/20 transition-all duration-500 group-hover:translate-y-0" />
              </a>
            </div>
            <div className="grid gap-4 text-sm text-slate-300/80 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Pipeline IA</p>
                <p className="mt-2 font-semibold text-white">Midjourney V7 · Kling 2.5 · Seedance Pro · Veo 3 · Suno AI · LypSync V2</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Résultats 2024</p>
                <p className="mt-2 font-semibold text-white">+320% d'engagement moyen · 48h pour produire un bundle complet</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(236,72,153,0.2)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.3),transparent_65%)]" />
              <div className="relative space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200/70">Cas phare</p>
                <h2 className="text-2xl font-bold leading-tight">{heroProject?.title}</h2>
                <p className="text-slate-200/80">{heroProject?.tagline}</p>
                <div className="grid gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{heroProject?.category}</div>
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{heroProject?.duration}</div>
                  <div className="rounded-2xl bg-white/5 p-3 text-center">{heroProject?.year}</div>
                </div>
                <img
                  src={heroProject?.thumbnail}
                  alt={heroProject?.title}
                  className="h-64 w-full rounded-[2rem] object-cover object-center"
                />
                <div className="flex flex-wrap gap-2 text-xs text-cyan-100/80">
                  {heroProject?.aiTools.map((tool) => (
                    <span key={tool} className="rounded-full bg-cyan-500/20 px-3 py-1">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {techStack.slice(0, 4).map((tool) => (
                <div key={tool} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Stack</p>
                  <p className="mt-2 text-lg font-bold text-white">{tool}</p>
                  <p className="text-[0.75rem] text-slate-200/70">Automatisé, documenté, prêt pour vos contenus.</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "radial-gradient(circle at 20% 20%, rgba(6,182,212,0.15), transparent 60%)" }} />
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
            <div className="flex flex-col items-start gap-6 pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Pipeline orchestré</p>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Une stack IA + plateau réel calibrée pour faire sourire vos KPIs
                </h2>
              </div>
              <div className="flex gap-3 text-sm text-slate-200/80">
                {techStack.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300" /> {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {servicesData.map((service, index) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_30px_100px_rgba(56,189,248,0.12)] transition-transform duration-500 hover:-translate-y-2"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-cyan-500/30 via-transparent to-transparent transition-transform duration-700 group-hover:translate-y-0" />
                  <div className="relative space-y-4">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-cyan-200/80">
                      <span className="text-2xl">0{index + 1}</span> {service.title}
                    </span>
                    <p className="text-xl font-bold text-white">{service.subtitle}</p>
                    <p className="text-sm text-slate-200/80">{service.promise}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-cyan-100/70">
                      {service.stack.map((tool) => (
                        <span key={tool} className="rounded-full bg-cyan-500/10 px-3 py-1">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">
                      Lire la méthode →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1 space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200/70">Réalisations atypiques</p>
              <h2 className="text-4xl font-extrabold leading-tight">
                Portfolio modulable, prêt à être remixé, supprimé, amélioré en un clic
              </h2>
              <p className="text-lg text-slate-200/80">
                Chaque projet est pensé comme un kit LEGO vidéo : vous pouvez ajouter, modifier, supprimer les blocs depuis notre dashboard.
              </p>
              <div className="grid gap-4 text-sm text-slate-200/80">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Humour & brise-glace</p>
                  <p className="mt-2">Avant chaque tournage on joue à deviner le prompt Midjourney du client. Spoiler : on gagne souvent.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Organisation atypique</p>
                  <p className="mt-2">Clusters thématiques, scoring IA, et playlist Suno AI pour caler le rythme des séquences.</p>
                </div>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 rounded-full border border-fuchsia-200/40 bg-fuchsia-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_15px_50px_rgba(236,72,153,0.3)]"
              >
                Explorer la galerie complète
              </Link>
            </div>
            <div className="flex-1 space-y-6">
              {portfolioItems.slice(0, 3).map((project, index) => (
                <article
                  key={project.id}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-[0_25px_90px_rgba(244,114,182,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_120px_rgba(14,165,233,0.2)]`}
                >
                  <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `linear-gradient(120deg, rgba(56,189,248,0.25), rgba(236,72,153,0.2))` }} />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                      <span>Projet 0{index + 1}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-slate-200/80">{project.description}</p>
                    <div className="grid gap-3 text-xs text-cyan-100/80 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.duration}</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.year}</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-center">{project.socialStack[0]}</div>
                    </div>
                    <img src={project.thumbnail} alt={project.title} className="h-56 w-full rounded-[2rem] object-cover" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-24" id="contact">
          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-[0_25px_100px_rgba(8,145,178,0.18)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Demande rapide</p>
                <h2 className="text-4xl font-extrabold leading-tight">
                  90 secondes pour nous briefer. On vous rappelle avant que votre café refroidisse.
                </h2>
                <div className="grid gap-4 text-sm text-slate-200/80">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Break the ice</p>
                    <p className="mt-2">On veut tout savoir : votre running gag préféré, vos pires tournages, vos deadlines absurdes.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Synergie intelligente</p>
                    <p className="mt-2">Votre brief est injecté dans notre cockpit : IA, plateau, copywriters. Tout le monde est alerté.</p>
                  </div>
                </div>
              </div>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  recordContactRequest(form);
                  setContactSent(true);
                  setForm({ name: "", email: "", projectSpark: "", urgency: "hier" });
                }}
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Nom / pseudo</label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 focus:outline-none"
                    placeholder="Jane Photon ou CEO qui n'a pas dormi"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 focus:outline-none"
                    placeholder="vous@futurebrand.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Étincelle</label>
                  <textarea
                    required
                    value={form.projectSpark}
                    onChange={(event) => setForm((prev) => ({ ...prev, projectSpark: event.target.value }))}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 focus:outline-none"
                    placeholder="On veut un plan séquence avec un chatbot sarcastique qui fait des saltos"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Urgence</label>
                  <select
                    value={form.urgency}
                    onChange={(event) => setForm((prev) => ({ ...prev, urgency: event.target.value as typeof form.urgency }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="hier">Il fallait hier</option>
                    <option value="cette-semaine">Cette semaine</option>
                    <option value="quand-c-est-parfait">Quand c'est parfait</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white"
                >
                  <span className="relative z-10">Envoyer ma demande fulgurante</span>
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 transition-transform duration-700 group-hover:translate-x-0" />
                </button>
                {contactSent && (
                  <p className="rounded-2xl border border-cyan-200/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                    Merci ! Notre équipe vous répond avec un meme personnalisé sous 2 heures.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-sm text-slate-200/70">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Studio VBG</p>
                <p className="mt-2 text-lg text-white">Agence de production, captation vidéo, création de contenus réseaux sociaux.</p>
              </div>
              <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-slate-300/80">
                <Link to="/process" className="hover:text-white">Méthode</Link>
                <Link to="/services" className="hover:text-white">Services</Link>
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              </div>
              <div className="text-xs text-slate-300/80">
                © {new Date().getFullYear()} Studio VBG · Pipeline alimenté par IA et bon café.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
