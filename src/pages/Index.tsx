import { Link } from "react-router-dom";
import { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { servicesData } from "@/lib/services";

const heroHooks = [
  "Votre direction attend des résultats tangibles : nous concevons des productions qui les démontrent.",
  "Les plateformes privilégient les contenus cohérents. Chaque format est calibré pour sa diffusion.",
  "Les échéances serrées exigent une organisation impeccable. Notre équipe reste mobilisée du brief au delivery.",
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at top, hsla(var(--visual-accent)/0.35), transparent 55%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 animate-[spin_20s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 45deg at 30% 30%, hsla(var(--visual-accent-soft)/0.22), hsla(var(--visual-secondary)/0.2), transparent 70%)",
        }}
      />
      <div className="relative">
        <header className="mx-auto flex max-w-7xl flex-col gap-12 px-6 pt-20 pb-28 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-10">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200 backdrop-blur">
              Studio VBG · Agence vidéo 2025
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400 bg-clip-text text-transparent visual-accent-gradient">
                Studio VBG
              </span>{" "}
              orchestre vos contenus vidéo avec une précision cinématographique.
            </h1>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-lg leading-relaxed shadow-[0_0_60px_rgba(56,189,248,0.25)] visual-accent-shadow">
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <p className="font-semibold uppercase tracking-[0.2em] text-cyan-200/80 visual-accent-text">Message clé</p>
              <p className="mt-4 text-2xl" onMouseEnter={() => setHookIndex((i) => (i + 1) % heroHooks.length)}>
                {heroHooks[hookIndex]}
              </p>
              <p className="mt-6 text-sm text-slate-200/80">
                Nous combinons conception éditoriale, pipeline IA et expertise plateau pour transformer chaque vidéo en actif durable.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="group relative overflow-hidden rounded-full border border-cyan-200/30 visual-accent-border bg-cyan-500/20 visual-accent-bg px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-100 visual-accent-text-strong shadow-[0_10px_40px_rgba(8,145,178,0.35)] visual-accent-shadow transition hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-xl">⚡</span> Demande de devis
                </span>
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-500 visual-accent-gradient transition-all duration-500 group-hover:translate-y-0 visual-accent-gradient" />
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
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Chaîne IA</p>
                <p className="mt-2 font-semibold text-white">Midjourney V7 · Kling 2.5 · Seedance Pro · Veo 3 · Suno AI · LypSync V2</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Résultats 2024</p>
                <p className="mt-2 font-semibold text-white">+320% d'engagement moyen · 48h pour produire un bundle complet</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(236,72,153,0.2)] visual-accent-halo">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 20% 20%, hsla(var(--visual-secondary)/0.3), transparent 65%)" }}
              />
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
                <div className="flex flex-wrap gap-2 text-xs text-cyan-100/80 visual-accent-text-strong">
                  {heroProject?.aiTools.map((tool) => (
                    <span key={tool} className="rounded-full bg-cyan-500/20 visual-accent-bg px-3 py-1">{tool}</span>
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
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(circle at 20% 20%, hsla(var(--visual-accent)/0.18), transparent 60%)" }}
          />
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_80px_rgba(59,130,246,0.15)] visual-accent-veil">
            <div className="flex flex-col items-start gap-6 pb-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Méthode intégrée</p>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Une chaîne de production qui synchronise IA et équipes de plateau
                </h2>
              </div>
              <div className="flex gap-3 text-sm text-slate-200/80">
                {techStack.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300 visual-accent-dot" /> {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {servicesData.map((service, index) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_30px_100px_rgba(56,189,248,0.12)] visual-accent-hover-shadow transition-transform duration-500 hover:-translate-y-2"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-cyan-500/30 via-transparent to-transparent visual-accent-gradient transition-transform duration-700 group-hover:translate-y-0 visual-accent-gradient" />
                  <div className="relative space-y-4">
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-cyan-200/80 visual-accent-text">
                      <span className="text-2xl">0{index + 1}</span> {service.title}
                    </span>
                    <p className="text-xl font-bold text-white">{service.subtitle}</p>
                    <p className="text-sm text-slate-200/80">{service.promise}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-cyan-100/70 visual-accent-text-strong">
                      {service.stack.map((tool) => (
                        <span key={tool} className="rounded-full bg-cyan-500/10 visual-accent-chip px-3 py-1">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">
                      Consulter la méthodologie →
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
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200/70">Réalisations récentes</p>
              <h2 className="text-4xl font-extrabold leading-tight">
                Un portefeuille modulable piloté depuis votre tableau de bord
              </h2>
              <p className="text-lg text-slate-200/80">
                Chaque projet est structuré pour évoluer. Ajoutez, mettez à jour ou archivez vos références depuis le tableau de bord administrateur.
              </p>
              <div className="grid gap-4 text-sm text-slate-200/80">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Processus éditorial</p>
                  <p className="mt-2">Brief, scénario, droits et livrables sont documentés dès la préproduction pour sécuriser la validation interne.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Pilotage data</p>
                  <p className="mt-2">Classement par thématique, scoring IA des performances et bibliothèques audio certifiées pour accélérer la production.</p>
                </div>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 rounded-full border border-fuchsia-200/40 bg-fuchsia-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_15px_50px_rgba(236,72,153,0.3)] visual-secondary-glow visual-accent-glow"
              >
                Explorer la galerie complète
              </Link>
            </div>
            <div className="flex-1 space-y-6">
              {portfolioItems.slice(0, 3).map((project, index) => (
                <article
                  key={project.id}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-[0_25px_90px_rgba(244,114,182,0.12)] visual-accent-hover-shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_120px_rgba(14,165,233,0.2)] visual-accent-hover-shadow`}
                >
                  <span
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, hsla(var(--visual-accent)/0.25), hsla(var(--visual-secondary)/0.2))",
                    }}
                  />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
                      <span>Projet 0{index + 1}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-slate-200/80">{project.description}</p>
                    <div className="grid gap-3 text-xs text-cyan-100/80 visual-accent-text-strong sm:grid-cols-3">
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
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Demande rapide</p>
                <h2 className="text-4xl font-extrabold leading-tight">
                  90 secondes suffisent pour lancer un échange avec nos équipes.
                </h2>
                <div className="grid gap-4 text-sm text-slate-200/80">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Analyse initiale</p>
                    <p className="mt-2">Objectifs, publics cibles et formats souhaités : nous collectons les informations essentielles pour préparer la proposition.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60 visual-accent-text">Coordination interne</p>
                    <p className="mt-2">Le brief est partagé avec le pôle création, l'équipe plateau et notre cellule IA pour une réponse argumentée et chiffrée.</p>
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
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
                    placeholder="Nom et prénom"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
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
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300/60 focus:border-cyan-400 visual-accent-border focus:outline-none"
                    placeholder="Décrivez le contexte, les objectifs et les livrables attendus"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Urgence</label>
                  <select
                    value={form.urgency}
                    onChange={(event) => setForm((prev) => ({ ...prev, urgency: event.target.value as typeof form.urgency }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  >
                    <option value="hier">Projet urgent</option>
                    <option value="cette-semaine">Démarrage sous 7 jours</option>
                    <option value="quand-c-est-parfait">Planifié</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white"
                >
                  <span className="relative z-10">Envoyer ma demande</span>
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 visual-accent-gradient transition-transform duration-700 group-hover:translate-x-0 visual-accent-gradient" />
                </button>
                {contactSent && (
                  <p className="rounded-2xl border border-cyan-200/30 visual-accent-border bg-cyan-500/10 visual-accent-chip px-4 py-3 text-sm text-cyan-100 visual-accent-text-strong">
                    Merci pour votre message. Un membre de l'équipe Studio VBG revient vers vous sous 2 heures ouvrées.
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
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Studio VBG</p>
                <p className="mt-2 text-lg text-white">Agence de production, captation vidéo, création de contenus réseaux sociaux.</p>
              </div>
              <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-slate-300/80">
                <Link to="/process" className="hover:text-white">Méthode</Link>
                <Link to="/services" className="hover:text-white">Services</Link>
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              </div>
              <div className="text-xs text-slate-300/80">
                © {new Date().getFullYear()} Studio VBG · Pipeline propulsé par l'IA et une gestion de projet rigoureuse.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
