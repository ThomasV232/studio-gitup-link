import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";
import type { QuoteRequest } from "@/context/StudioContext";

const quickNavigation = [
  { label: "Accueil", description: "Page d'accueil", icon: "🏠", to: "/" },
  { label: "Services", description: "Offres & méthodologies", icon: "🛰️", to: "/services" },
  { label: "Playground IA", description: "Laboratoires IA", icon: "🧪", to: "/playground" },
  { label: "Portfolio", description: "Cas pratiques", icon: "🎬", to: "/portfolio" },
  { label: "Process", description: "Workflow Studio", icon: "🛠️", to: "/process" },
  { label: "Dashboard", description: "Pilotage projet", icon: "📊", to: "/dashboard" },
];

const quoteStatusCopy: Record<QuoteRequest["status"], { label: string; tone: string; border: string }> = {
  nouveau: {
    label: "Nouveau",
    tone: "bg-cyan-500/15 text-cyan-100",
    border: "border-cyan-400/40",
  },
  "en revue": {
    label: "En revue",
    tone: "bg-sky-500/15 text-sky-100",
    border: "border-sky-400/40",
  },
  validé: {
    label: "Validé",
    tone: "bg-emerald-500/15 text-emerald-100",
    border: "border-emerald-400/40",
  },
  refusé: {
    label: "Réorienté",
    tone: "bg-rose-500/15 text-rose-100",
    border: "border-rose-400/40",
  },
};

const Dashboard = () => {
  const { user, quoteRequests, portfolioItems, chats } = useStudio();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState("Dashboard");
  const [credentials, setCredentials] = useState({
    email: user?.email ?? "",
    password: "",
  });

  const myQuotes = useMemo(() => {
    if (!user) return [] as QuoteRequest[];
    return quoteRequests
      .filter((quote) => quote.clientId === user.id)
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [quoteRequests, user]);

  const lastMessages = useMemo(() => {
    const userQuoteIds = new Set(myQuotes.map((quote) => quote.id));
    return chats
      .filter((thread) => userQuoteIds.has(thread.quoteId))
      .map((thread) => ({
        quoteId: thread.quoteId,
        projectName: thread.projectName,
        last: thread.messages.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0],
      }))
      .filter((thread) => Boolean(thread.last))
      .slice(0, 3);
  }, [chats, myQuotes]);

  const handleConnect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-between rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#1a2656] via-[#0c0e24] to-[#120420] p-10 shadow-[0_60px_120px_rgba(10,15,45,0.6)]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.4em] text-slate-200/70">
              Studio VBG · Espace client
            </span>
            <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Accédez à l'espace client
            </h1>
            <p className="mt-6 max-w-lg text-base text-slate-200/80">
              Créez votre compte ou connectez-vous pour consulter le tableau de bord, déposer un brief, suivre vos devis et échanger avec nos équipes.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">Onboarding structuré</p>
                <p className="mt-4 text-sm text-slate-200/80">
                  Un formulaire clair pour rassembler les informations essentielles et aligner notre équipe sur votre projet.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/80">Sécurité maîtrisée</p>
                <p className="mt-4 text-sm text-slate-200/80">
                  Vos données sont hébergées en interne sur des environnements chiffrés et monitorés par nos producteurs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-200/60">
            <span>Mode Vague</span>
            <span className="h-px w-12 bg-slate-200/40" aria-hidden="true" />
            <span>Palette Solstice</span>
            <span className="h-px w-12 bg-slate-200/40" aria-hidden="true" />
            <span>Typographie calibrée</span>
          </div>
        </div>

        <div className="flex flex-1 items-stretch">
          <div className="relative w-full overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-b from-[#1a1f3a]/90 via-[#141226]/95 to-[#0b091b] p-10 shadow-[0_60px_120px_rgba(9,11,30,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-slate-100/70">
                <span className="text-base">🌊</span> Mode Vague
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-slate-100/70">
                <span className="text-base">🎨</span> Palette Solstice
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-slate-100/70">
                <span className="text-base">🔐</span> Mot de passe oublié
              </div>
            </div>

            {!isUnlocked ? (
              <form className="mt-10 space-y-6" onSubmit={handleConnect}>
                <div className="grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm uppercase tracking-[0.35em] text-slate-100/70">
                  <button
                    type="button"
                    className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(45,150,255,0.25)]"
                  >
                    Connexion
                  </button>
                  <button type="button" className="rounded-full px-6 py-3 text-slate-200/60">
                    Créer un compte
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.35em] text-slate-200/70">Email</label>
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                      placeholder="vous@studio2025.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.35em] text-slate-200/70">Mot de passe</label>
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                      placeholder="Au moins 8 caractères"
                      required
                      minLength={8}
                    />
                    <div className="flex items-center justify-between text-[0.7rem] text-slate-300/70">
                      <span>Minimum 8 caractères</span>
                      <button type="button" className="font-semibold uppercase tracking-[0.3em] text-cyan-200/80 transition hover:text-cyan-100">
                        Mot de passe oublié ?
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.35em] text-white"
                >
                  <span className="relative z-10">Connexion</span>
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 transition-transform duration-700 group-hover:translate-x-0" />
                </button>
              </form>
            ) : (
              <div className="mt-10 space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-200/70">Bienvenue</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {user?.name ?? "Client Studio"}, voici votre cockpit projet.
                  </h2>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Visualisez vos devis, derniers échanges et accédez aux ressources clés de Studio VBG.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Devis en cours</p>
                    <ul className="mt-4 space-y-4">
                      {myQuotes.length === 0 && (
                        <li className="text-sm text-slate-200/70">Aucun devis en cours pour le moment.</li>
                      )}
                      {myQuotes.slice(0, 3).map((quote) => {
                        const statusStyle = quoteStatusCopy[quote.status];
                        return (
                          <li key={quote.id} className="rounded-2xl border border-white/10 bg-[#0f1327]/80 p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-white">{quote.projectName}</p>
                                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-300/70">{quote.clientName}</p>
                              </div>
                              <span className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] ${statusStyle.tone} ${statusStyle.border}`}>
                                {statusStyle.label}
                              </span>
                            </div>
                            <p className="mt-3 text-xs text-slate-200/70">Budget : {quote.budgetRange} · Deadline : {quote.deadline || "À définir"}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">Navigation rapide</p>
                    <div className="mt-4 space-y-3">
                      {quickNavigation.map((item) => {
                        const isActive = item.label === activeNavigation;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onMouseEnter={() => setActiveNavigation(item.label)}
                            className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                              isActive
                                ? "border-cyan-300/60 bg-cyan-500/10 text-white shadow-[0_12px_40px_rgba(45,150,255,0.25)]"
                                : "border-white/10 text-slate-200/80 hover:border-cyan-200/40 hover:bg-white/10"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-[0.25em]">{item.label}</p>
                              <p className="text-xs text-slate-300/70">{item.description}</p>
                            </div>
                            <span className="text-lg">{item.icon}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/80">Derniers échanges</p>
                  <ul className="mt-4 space-y-4">
                    {lastMessages.length === 0 && (
                      <li className="text-sm text-slate-200/70">Aucun échange récent. Lancez la conversation depuis votre chat projet.</li>
                    )}
                    {lastMessages.map((thread) => (
                      <li key={thread.quoteId} className="rounded-2xl border border-white/10 bg-[#0f1327]/80 p-4">
                        <p className="text-sm font-semibold text-white">{thread.projectName}</p>
                        <p className="mt-2 text-xs text-slate-200/70">
                          {thread.last?.from === "studio" ? "Studio VBG" : user?.name ?? "Vous"} · {thread.last?.content}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">Projets en vitrine</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {portfolioItems.slice(0, 2).map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-[#0f1327]/80 p-4">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-200/70">{item.category} · {item.year}</p>
                        <p className="mt-2 text-xs text-slate-300/70">{item.tagline}</p>
                      </div>
                    ))}
                    {portfolioItems.length === 0 && (
                      <p className="text-sm text-slate-200/70">Aucun projet publié pour le moment.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
