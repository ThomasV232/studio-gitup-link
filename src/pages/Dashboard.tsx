import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CLIENT_TYPES, useStudio } from "@/context/StudioContext";
import type { ClientType, QuoteRequest } from "@/context/StudioContext";
import { BrandMark } from "@/components/branding/BrandMark";

/* ----------------------------- NAV / STATUS UI ---------------------------- */

const quickNavigation = [
  { label: "Accueil", description: "Page d'accueil", icon: "🏠", to: "/" },
  { label: "Services", description: "Offres & méthodologies", icon: "🛰️", to: "/services" },
  { label: "Playground IA", description: "Laboratoires IA", icon: "🧪", to: "/playground" },
  { label: "Portfolio", description: "Cas pratiques", icon: "🎬", to: "/portfolio" },
  { label: "Process", description: "Workflow Studio", icon: "🛠️", to: "/process" },
  { label: "Dashboard", description: "Pilotage projet", icon: "📊", to: "/dashboard" },
];

const quoteStatusCopy: Record<QuoteRequest["status"], { label: string; tone: string; border: string }> = {
  nouveau: { label: "Nouveau", tone: "bg-cyan-500/15 text-cyan-100", border: "border-cyan-400/40" },
  "en revue": { label: "En revue", tone: "bg-sky-500/15 text-sky-100", border: "border-sky-400/40" },
  validé: { label: "Validé", tone: "bg-emerald-500/15 text-emerald-100", border: "border-emerald-400/40" },
  refusé: { label: "Réorienté", tone: "bg-rose-500/15 text-rose-100", border: "border-rose-400/40" },
};

/* -------------------------- ADMIN / ACCOUNT HELPERS ----------------------- */

const ADMIN_EMAIL = "volberg.thomas@gmail.com";

const membershipOptions = [
  { value: "Hyperdrive", label: "Hyperdrive", description: "Production intensive pour contenus à cadence élevée." },
  { value: "Continuum", label: "Continuum", description: "Accompagnement annuel avec équipe dédiée." },
  { value: "Impulse", label: "Impulse", description: "Starter agile pour lancer votre présence vidéo." },
] as const;

type MembershipValue = (typeof membershipOptions)[number]["value"];

type AccountDraft = {
  name: string;
  clientType: ClientType;
  company: string;
  industry: string;
  membership: MembershipValue;
  lastProject: string;
};

/* ------------------------- QUOTES TIMELINE HELPERS ------------------------ */

type QuoteStatus = QuoteRequest["status"];
type QuoteStep = Extract<QuoteStatus, "nouveau" | "en revue" | "validé">;

const STATUS_STEPS: Array<{ key: QuoteStep; title: string; description: string }> = [
  { key: "nouveau", title: "Brief reçu", description: "Votre demande est horodatée, l'équipe la priorise dans la file Studio VBG." },
  { key: "en revue", title: "Analyse créative", description: "Nous alignons budget, équipe et pipeline IA avant de vous soumettre la proposition." },
  { key: "validé", title: "Kick-off", description: "Le devis est signé, la salle de chat projet et la préproduction s'activent." },
];

const STATUS_BADGES: Record<QuoteStatus, string> = {
  nouveau: "border-cyan-200/40 bg-cyan-500/10 text-cyan-100",
  "en revue": "border-sky-200/40 bg-sky-500/10 text-sky-100",
  validé: "border-emerald-200/40 bg-emerald-500/10 text-emerald-100",
  refusé: "border-rose-300/50 bg-rose-500/10 text-rose-100",
};

const STATUS_LABELS: Record<QuoteStatus, string> = {
  nouveau: "Nouveau",
  "en revue": "En revue",
  validé: "Validé",
  refusé: "Réorienté",
};

/* ---------------------------- PORTFOLIO HELPERS --------------------------- */

type PortfolioDraft = {
  title: string;
  tagline: string;
  category: string;
  year: number;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  aiTools: string;
  deliverables: string;
  socialStack: string;
};

const getDefaultProject = (categories: string[]): PortfolioDraft => ({
  title: "",
  tagline: "",
  category: categories[0] ?? "Entreprise",
  year: new Date().getFullYear(),
  duration: "00:45",
  description: "",
  thumbnail: "",
  videoUrl: "",
  aiTools: "",
  deliverables: "",
  socialStack: "",
});

/* -------------------------------- COMPONENT ------------------------------- */

const Dashboard = () => {
  const {
    user,
    clients,
    portfolioItems,
    pricingTiers,
    quoteRequests,
    contactRequests,
    chats,
    serviceCategories,
    brandAssets,
    addPortfolioItem,
    updatePortfolioItem,
    removePortfolioItem,
    updatePricingTier,
    advanceQuoteStatus,
    appendChatMessage,
    updateAccount,
    updateBrandAsset,
    resetBrandAssets,
  } = useStudio();

  const isAdmin = user?.email === ADMIN_EMAIL;
  const userId = user?.id ?? null;

  const myQuotes = useMemo(() => {
    if (!userId) return [] as QuoteRequest[];
    return quoteRequests
      .filter((quote) => quote.clientId === userId)
      .slice()
      .sort((a, b) => getTimeValue(b.createdAt) - getTimeValue(a.createdAt));
  }, [quoteRequests, userId]);

  const myValidatedQuoteIds = useMemo(
    () => new Set(myQuotes.filter((quote) => quote.status === "validé").map((quote) => quote.id)),
    [myQuotes],
  );

  const myChats = useMemo(
    () => chats.filter((thread) => myValidatedQuoteIds.has(thread.quoteId)),
    [chats, myValidatedQuoteIds],
  );

  const [newProject, setNewProject] = useState<PortfolioDraft>(() => getDefaultProject([...serviceCategories]));
  const [chatInput, setChatInput] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(() => chats[0]?.quoteId ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isImportingMetadata, setIsImportingMetadata] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const [logoTarget, setLogoTarget] = useState<"solstice" | "nebula">("solstice");
  const [brandFeedback, setBrandFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [editDraft, setEditDraft] = useState<(PortfolioDraft & { id: string }) | null>(null);
  const [accountDraft, setAccountDraft] = useState<AccountDraft>(() => ({
    name: user?.name ?? "",
    clientType: (user?.clientType ?? CLIENT_TYPES[0]) as ClientType,
    company: user?.company ?? "",
    industry: user?.industry ?? "",
    membership: (user?.membership ?? "Hyperdrive") as MembershipValue,
    lastProject: user?.lastProject ?? "",
  }));
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [accountFeedback, setAccountFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const activeChat = useMemo(() => chats.find((chat) => chat.quoteId === selectedChatId), [chats, selectedChatId]);

  const [clientSelectedQuoteId, setClientSelectedQuoteId] = useState(() => myQuotes[0]?.id ?? "");
  const [clientSelectedChatId, setClientSelectedChatId] = useState(() => myChats[0]?.quoteId ?? "");
  const [clientChatInput, setClientChatInput] = useState("");
  const isCustomSolstice = useMemo(() => brandAssets.solstice.startsWith("data:"), [brandAssets.solstice]);
  const isCustomNebula = useMemo(() => brandAssets.nebula.startsWith("data:"), [brandAssets.nebula]);

  useEffect(() => {
    setClientSelectedQuoteId((current) => {
      if (myQuotes.length === 0) return "";
      return myQuotes.some((q) => q.id === current) ? current : myQuotes[0].id;
    });
  }, [myQuotes]);

  useEffect(() => {
    setClientSelectedChatId((current) => {
      if (myChats.length === 0) return "";
      return myChats.some((t) => t.quoteId === current) ? current : myChats[0].quoteId;
    });
  }, [myChats]);

  useEffect(() => {
    if (!user) return;
    setAccountDraft({
      name: user.name,
      clientType: user.clientType as ClientType,
      company: user.company,
      industry: user.industry,
      membership: user.membership as MembershipValue,
      lastProject: user.lastProject ?? "",
    });
    setAccountFeedback(null);
  }, [user]);

  const clientActiveChat = useMemo(
    () => myChats.find((thread) => thread.quoteId === clientSelectedChatId) ?? null,
    [myChats, clientSelectedChatId],
  );

  const selectedClientQuote = useMemo(
    () => myQuotes.find((quote) => quote.id === clientSelectedQuoteId) ?? null,
    [clientSelectedQuoteId, myQuotes],
  );

  const handleAccountSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setIsSavingAccount(true);
    setAccountFeedback(null);

    const response = await updateAccount({
      name: accountDraft.name.trim(),
      clientType: accountDraft.clientType,
      company: accountDraft.company.trim(),
      industry: accountDraft.industry.trim(),
      membership: accountDraft.membership,
      lastProject: accountDraft.lastProject.trim().length > 0 ? accountDraft.lastProject.trim() : null,
    });

    setIsSavingAccount(false);
    setAccountFeedback({
      type: response.success ? "success" : "error",
      message: response.message ?? (response.success ? "Profil mis à jour." : "La mise à jour du profil a échoué. Réessayez."),
    });
  };

  const handleAccountReset = () => {
    if (!user) return;
    setAccountDraft({
      name: user.name,
      clientType: user.clientType as ClientType,
      company: user.company,
      industry: user.industry,
      membership: user.membership as MembershipValue,
      lastProject: user.lastProject ?? "",
    });
    setAccountFeedback(null);
  };

  const handleOpenLogoPicker = (target: "solstice" | "nebula") => {
    setLogoTarget(target);
    setBrandFeedback(null);
    requestAnimationFrame(() => {
      logoInputRef.current?.click();
    });
  };

  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isSupported =
      file.type === "image/svg+xml" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif";

    if (!isSupported) {
      setBrandFeedback({
        type: "error",
        message: "Format non pris en charge. Utilisez un SVG, PNG ou WebP.",
      });
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      updateBrandAsset(logoTarget, result);
      setBrandFeedback({
        type: "success",
        message:
          logoTarget === "solstice"
            ? "Logo Solstice mis à jour avec succès."
            : "Logo Nebula mis à jour avec succès.",
      });
      event.target.value = "";
    };
    reader.onerror = () => {
      setBrandFeedback({
        type: "error",
        message: "Lecture du fichier impossible. Réessayez avec un autre visuel.",
      });
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleResetBrandAssets = () => {
    resetBrandAssets();
    setBrandFeedback({ type: "success", message: "Logos réinitialisés." });
  };

  const handleClientSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!clientActiveChat || !clientChatInput.trim()) return;
    appendChatMessage(clientActiveChat.quoteId, { from: "client", content: clientChatInput.trim() });
    setClientChatInput("");
  };

  const resetNewProject = () => {
    setNewProject(getDefaultProject([...serviceCategories]));
    setYoutubeUrl("");
    setMetadataError(null);
  };

  const extractYoutubeId = useCallback((url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    return match?.[1] ?? null;
  }, []);

  const handleImportMetadata = useCallback(async () => {
    if (!youtubeUrl.trim()) {
      setMetadataError("Ajoutez un lien YouTube pour importer un projet.");
      return;
    }
    const id = extractYoutubeId(youtubeUrl.trim());
    if (!id) {
      setMetadataError("Le lien YouTube n'est pas reconnu. Essayez avec l'URL complète.");
      return;
    }

    setIsImportingMetadata(true);
    setMetadataError(null);

    const canonicalUrl = youtubeUrl.includes("http") ? youtubeUrl.trim() : `https://www.youtube.com/watch?v=${id}`;

    try {
      const oEmbedResponse = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(canonicalUrl)}`);
      if (!oEmbedResponse.ok) throw new Error("Impossible de récupérer les informations depuis YouTube.");
      const oEmbedData = await oEmbedResponse.json();

      let description = "";
      try {
        const pageResponse = await fetch(`https://r.jina.ai/https://www.youtube.com/watch?v=${id}`);
        if (pageResponse.ok) {
          const raw = await pageResponse.text();
          const m = raw.match(/"shortDescription":"(.*?)"/);
          if (m?.[1]) {
            description = m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\'/g, "'");
          }
        }
      } catch {
        /* ignore */
      }

      const taglineCandidate = description
        .split(/\n|\./)
        .map((l) => l.trim())
        .find((l) => l.length > 0);

      setNewProject((prev) => ({
        ...prev,
        title: oEmbedData.title ?? prev.title,
        tagline: taglineCandidate ?? prev.tagline,
        description: description || prev.description,
        thumbnail: oEmbedData.thumbnail_url ?? prev.thumbnail,
        videoUrl: canonicalUrl,
      }));
    } catch (error) {
      setMetadataError(error instanceof Error ? error.message : "Import impossible. Essayez manuellement.");
    } finally {
      setIsImportingMetadata(false);
    }
  }, [extractYoutubeId, youtubeUrl]);

  if (!user) return null;

  /* --------------------------- CLIENT VIEW (non-admin) --------------------------- */

  if (!isAdmin) {
    const hasQuotes = myQuotes.length > 0;
    const statusSequence = STATUS_STEPS.map((step) => step.key);
    const timelineIndex = selectedClientQuote
      ? selectedClientQuote.status === "refusé"
        ? statusSequence.indexOf("en revue")
        : statusSequence.indexOf(selectedClientQuote.status as QuoteStep)
      : -1;

    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 15% 20%, hsla(var(--visual-accent)/0.24), transparent 60%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 80% 85%, hsla(var(--visual-secondary)/0.2), transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-24">
          <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.18)] visual-accent-veil">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Espace client · Studio VBG
              </span>
              <h1 className="text-5xl font-black leading-tight">Bonjour {user.name.split(" ")[0] ?? user.name}</h1>
              <p className="text-lg text-slate-200/80">
                Suivez vos demandes de devis, consultez les étapes clés et échangez avec le producteur dédié.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/quote"
                  className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                >
                  Nouvelle demande
                </Link>
                <a
                  href="mailto:hello@studiovbg.com?subject=Studio%20VBG%20-%20Suivi%20de%20devis"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 hover:text-white"
                >
                  Parler à un producer
                </a>
              </div>
            </div>
            <div className="mt-10 grid gap-4 text-sm text-slate-200/80 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Demandes</p>
                <p className="mt-2 text-2xl font-semibold text-white">{myQuotes.length}</p>
                <p className="text-xs text-slate-200/60">Toutes les demandes enregistrées depuis votre compte.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">En cours</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {myQuotes.filter((q) => q.status === "nouveau" || q.status === "en revue").length}
                </p>
                <p className="text-xs text-slate-200/60">Briefs en analyse créative ou en cadrage budgétaire.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Validés</p>
                <p className="mt-2 text-2xl font-semibold text-white">{myQuotes.filter((q) => q.status === "validé").length}</p>
                <p className="text-xs text-slate-200/60">Projets prêts à démarrer avec chat ouvert.</p>
              </div>
            </div>
          </header>

          <section className="mt-16 space-y-12">
            {/* Profil client */}
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_90px_rgba(56,189,248,0.12)] visual-accent-veil">
              <form className="space-y-8" onSubmit={handleAccountSubmit}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Profil client</p>
                    <h2 className="text-3xl font-bold text-white">Vos informations</h2>
                    <p className="text-sm text-slate-200/70">
                      Complétez votre identité et vos préférences pour que l'IA prépare des recommandations sur-mesure.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={handleAccountReset}
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-200/80 transition hover:text-white"
                    >
                      Réinitialiser
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingAccount}
                      className={`rounded-full border px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] transition ${
                        isSavingAccount
                          ? "cursor-not-allowed border-cyan-200/30 bg-cyan-500/10 text-white/70"
                          : "border-cyan-200/40 bg-cyan-500/20 text-white hover:scale-[1.02]"
                      }`}
                    >
                      {isSavingAccount ? "Enregistrement..." : "Enregistrer"}
                    </button>
                  </div>
                </div>

                {accountFeedback && (
                  <p
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      accountFeedback.type === "success"
                        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                        : "border-rose-400/40 bg-rose-500/10 text-rose-100"
                    }`}
                  >
                    {accountFeedback.message}
                  </p>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Nom complet</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                      value={accountDraft.name}
                      onChange={(e) => {
                        setAccountDraft((p) => ({ ...p, name: e.target.value }));
                        setAccountFeedback(null);
                      }}
                      placeholder="Nom et prénom"
                      required
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Type de client</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {CLIENT_TYPES.map((type) => {
                        const isActive = accountDraft.clientType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setAccountDraft((p) => ({ ...p, clientType: type }));
                              setAccountFeedback(null);
                            }}
                            className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                              isActive
                                ? "border-cyan-300/80 bg-cyan-500/20 text-white shadow-[0_8px_30px_rgba(56,189,248,0.25)]"
                                : "border-white/10 bg-white/5 text-slate-200/80 hover:border-cyan-200/40 hover:bg-white/10"
                            }`}
                            aria-pressed={isActive}
                          >
                            <span className="font-semibold uppercase tracking-[0.25em] text-cyan-100/80 visual-accent-text-strong">
                              {type}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Structure</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                      value={accountDraft.company}
                      onChange={(e) => {
                        setAccountDraft((p) => ({ ...p, company: e.target.value }));
                        setAccountFeedback(null);
                      }}
                      placeholder="Votre entreprise, collectif ou service"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Secteur</label>
                    <input
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                      value={accountDraft.industry}
                      onChange={(e) => {
                        setAccountDraft((p) => ({ ...p, industry: e.target.value }));
                        setAccountFeedback(null);
                      }}
                      placeholder="Ex. Tech, Luxe, Événementiel..."
                    />
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Formule active</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {membershipOptions.map((option) => {
                        const isActive = accountDraft.membership === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setAccountDraft((p) => ({ ...p, membership: option.value }));
                              setAccountFeedback(null);
                            }}
                            className={`rounded-2xl border px-4 py-3 text-left transition ${
                              isActive
                                ? "border-cyan-300/80 bg-cyan-500/20 text-white shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                                : "border-white/10 bg-white/5 text-slate-200/80 hover:border-cyan-200/40 hover:bg-white/10"
                            }`}
                            aria-pressed={isActive}
                          >
                            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100/80 visual-accent-text-strong">
                              {option.label}
                            </span>
                            <p className="mt-2 text-xs text-slate-200/80">{option.description}</p>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-[0.7rem] text-slate-300/70">
                      Ajustable à tout moment selon l'intensité de vos campagnes.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Dernier projet marquant</label>
                    <textarea
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                      value={accountDraft.lastProject}
                      onChange={(e) => {
                        setAccountDraft((p) => ({ ...p, lastProject: e.target.value }));
                        setAccountFeedback(null);
                      }}
                      placeholder="Partagez un tournage, un lancement ou un succès que vous souhaitez prolonger."
                    />
                    <p className="mt-2 text-[0.7rem] text-slate-300/70">
                      Ces éléments nourrissent les prompts IA et facilitent la préparation des briefs.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Suivi des devis */}
            {hasQuotes ? (
              <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(56,189,248,0.18)] visual-accent-veil">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Suivi de dossier</p>
                      <h2 className="mt-2 text-3xl font-bold text-white">{selectedClientQuote?.projectName}</h2>
                      <p className="mt-2 text-sm text-slate-200/70">
                        Créé le {selectedClientQuote ? formatDate(selectedClientQuote.createdAt) : "-"} · Budget{" "}
                        {selectedClientQuote?.budgetRange}
                      </p>
                    </div>
                    {selectedClientQuote && (
                      <span
                        className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-xs font-semibold uppercase tracking-[0.3em] ${STATUS_BADGES[selectedClientQuote.status]}`}
                      >
                        {STATUS_LABELS[selectedClientQuote.status]}
                      </span>
                    )}
                  </div>

                  {myQuotes.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {myQuotes.map((quote) => (
                        <button
                          key={quote.id}
                          type="button"
                          onClick={() => setClientSelectedQuoteId(quote.id)}
                          className={`rounded-full border px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition ${
                            clientSelectedQuoteId === quote.id
                              ? "border-cyan-300 bg-white/20 text-white"
                              : "border-white/15 bg-white/5 text-slate-200/70 hover:border-cyan-200/40 hover:text-white"
                          }`}
                        >
                          {quote.projectName}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedClientQuote && (
                    <>
                      <p className="text-sm text-slate-200/80">{STATUS_MESSAGES[selectedClientQuote.status]}</p>
                      <div className="mt-6 grid gap-6 md:grid-cols-3">
                        {STATUS_STEPS.map((step, index) => {
                          const reached = timelineIndex >= index && timelineIndex !== -1;
                          const isCurrent = timelineIndex === index;
                          return (
                            <div key={step.key} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                              <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold uppercase tracking-[0.2em] transition ${
                                  reached
                                    ? "border-cyan-300 bg-white/20 text-white shadow-[0_0_25px_rgba(56,189,248,0.35)]"
                                    : "border-white/15 text-slate-200/70"
                                } ${isCurrent ? "scale-[1.05]" : ""}`}
                              >
                                {reached ? "✓" : index + 1}
                              </div>
                              <div className="mt-4 space-y-2">
                                <p className="text-base font-semibold text-white">{step.title}</p>
                                <p className="text-xs text-slate-200/70">{step.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Services inclus</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedClientQuote.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Moodboard & intentions</p>
                          <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-line pr-1 text-sm text-slate-200/80">
                            {selectedClientQuote.moodboardPrompt}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-200/60">
                        <span>
                          Deadline {selectedClientQuote.deadline ? formatDate(selectedClientQuote.deadline) : "À définir"}
                        </span>
                        <span>Créé le {formatDate(selectedClientQuote.createdAt)}</span>
                        <span>ID {selectedClientQuote.id.slice(0, 8)}...</span>
                      </div>

                      {selectedClientQuote.status === "refusé" && (
                        <div className="mt-6 rounded-2xl border border-rose-300/40 bg-rose-500/10 p-5 text-sm text-rose-100">
                          Nous revenons vers vous avec une proposition alternative ou un ajustement budgétaire.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-[3rem] border border-white/10 bg-white/10 p-12 text-center text-slate-200/80">
                <h2 className="text-3xl font-semibold text-white">Aucune demande enregistrée pour l'instant</h2>
                <p className="mt-4 text-sm">
                  Lancez votre première demande en décrivant votre projet et laissez notre IA orchestrer la mise en production.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/quote"
                    className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                  >
                    Démarrer un brief
                  </Link>
                </div>
              </div>
            )}

            {/* Historique + Chat */}
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(236,72,153,0.15)] visual-secondary-veil">
                <h2 className="text-2xl font-bold text-white">Historique des demandes</h2>
                <div className="mt-6 space-y-4 text-sm text-slate-200/70">
                  {myQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className={`flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-200/40 hover:bg-white/10 ${
                        clientSelectedQuoteId === quote.id ? "border-cyan-300 bg-white/15" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">{formatDate(quote.createdAt)}</p>
                          <p className="text-base font-semibold text-white">{quote.projectName}</p>
                          <p className="text-xs text-slate-200/60">{quote.services.join(" • ")}</p>
                        </div>
                        <span
                          className={`inline-flex h-8 items-center rounded-full border px-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${STATUS_BADGES[quote.status]}`}
                        >
                          {STATUS_LABELS[quote.status]}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-slate-200/50">
                        <span>Budget {quote.budgetRange}</span>
                        <span>Deadline {quote.deadline ? formatDate(quote.deadline) : "À définir"}</span>
                        {quote.status === "validé" && (
                          <button
                            type="button"
                            onClick={() => {
                              setClientSelectedQuoteId(quote.id);
                              setClientSelectedChatId(quote.id);
                            }}
                            className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-emerald-100"
                          >
                            Ouvrir le chat
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(34,211,238,0.18)]">
                <h2 className="text-2xl font-bold text-white">Chat projet</h2>
                {myChats.length > 0 ? (
                  <div className="mt-6 flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {myChats.map((thread) => (
                        <button
                          key={thread.quoteId}
                          type="button"
                          onClick={() => setClientSelectedChatId(thread.quoteId)}
                          className={`rounded-full border px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition ${
                            clientSelectedChatId === thread.quoteId
                              ? "border-emerald-300 bg-white/20 text-white"
                              : "border-white/15 bg-white/5 text-slate-200/70 hover:border-emerald-200/40 hover:text-white"
                          }`}
                        >
                          {thread.projectName}
                        </button>
                      ))}
                    </div>
                    {clientActiveChat ? (
                      <div className="space-y-5">
                        <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
                          {clientActiveChat.messages.map((message) => (
                            <div key={message.id} className={`flex ${message.from === "client" ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`max-w-[80%] rounded-2xl border px-4 py-3 text-sm shadow-sm ${
                                  message.from === "client"
                                    ? "border-cyan-200/40 bg-cyan-500/20 text-cyan-100"
                                    : "border-white/10 bg-white/5 text-slate-100"
                                }`}
                              >
                                <p>{message.content}</p>
                                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleClientSendMessage} className="flex gap-3">
                          <input
                            value={clientChatInput}
                            onChange={(e) => setClientChatInput(e.target.value)}
                            placeholder="Votre message"
                            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-emerald-300/60 focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-emerald-100"
                          >
                            Envoyer
                          </button>
                        </form>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-200/70">
                        Dès qu'un devis est validé, une conversation dédiée s'affichera ici pour caler la production.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200/70">
                    Dès validation d'un devis, le chat SMS s'active et permet de suivre les ajustements minute par minute.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ------------------------------- ADMIN VIEW ------------------------------ */

  const handleAddProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProject.videoUrl) {
      setMetadataError("Ajoutez ou importez un lien YouTube pour ce projet.");
      return;
    }
    addPortfolioItem({
      title: newProject.title,
      tagline: newProject.tagline,
      category: newProject.category,
      year: Number(newProject.year),
      duration: newProject.duration,
      description: newProject.description,
      thumbnail: newProject.thumbnail || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
      videoUrl: newProject.videoUrl,
      aiTools: newProject.aiTools.split(",").map((i) => i.trim()).filter(Boolean),
      deliverables: newProject.deliverables.split(",").map((i) => i.trim()).filter(Boolean),
      socialStack: newProject.socialStack.split(",").map((i) => i.trim()).filter(Boolean),
    });
    resetNewProject();
  };

  const startEditingProject = (projectId: string) => {
    const project = portfolioItems.find((item) => item.id === projectId);
    if (!project) return;
    setEditDraft({
      id: project.id,
      title: project.title,
      tagline: project.tagline,
      category: project.category,
      year: project.year,
      duration: project.duration,
      description: project.description,
      thumbnail: project.thumbnail,
      videoUrl: project.videoUrl,
      aiTools: project.aiTools.join(", "),
      deliverables: project.deliverables.join(", "),
      socialStack: project.socialStack.join(", "),
    });
  };

  const handleUpdateProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editDraft) return;
    updatePortfolioItem(editDraft.id, {
      title: editDraft.title,
      tagline: editDraft.tagline,
      category: editDraft.category,
      year: Number(editDraft.year),
      duration: editDraft.duration,
      description: editDraft.description,
      thumbnail: editDraft.thumbnail,
      videoUrl: editDraft.videoUrl,
      aiTools: editDraft.aiTools.split(",").map((i) => i.trim()).filter(Boolean),
      deliverables: editDraft.deliverables.split(",").map((i) => i.trim()).filter(Boolean),
      socialStack: editDraft.socialStack.split(",").map((i) => i.trim()).filter(Boolean),
    });
    setEditDraft(null);
  };

  const cancelEdit = () => setEditDraft(null);

  const handleSendMessage = () => {
    const chat = activeChat;
    if (!chat || !chatInput.trim()) return;
    appendChatMessage(chat.quoteId, { from: "studio", content: chatInput.trim() });
    setChatInput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 15% 15%, hsla(var(--visual-accent)/0.25), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 85% 80%, hsla(var(--visual-secondary)/0.2), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)] visual-accent-veil">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
                Dashboard Studio VBG
              </span>
              <h1 className="text-5xl font-black leading-tight">Bienvenue {user.name.split(" ")[0]}</h1>
              <p className="text-lg text-slate-200/80">
                Gérez vos projets, suivez vos devis, ajustez vos tarifs et discutez avec nos équipes. Tout est synchronisé avec notre pipeline IA.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Stat instantané</p>
              <p className="mt-3 text-white">
                {portfolioItems.length} projets en cours · {quoteRequests.length} devis · {contactRequests.length} demandes rapides
              </p>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Portfolio Admin */}
          <div className="space-y-10">
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(56,189,248,0.2)] visual-accent-veil">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
                    Identité visuelle
                  </span>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold">Logos Solstice & Nebula</h2>
                    <p className="text-sm text-slate-200/70">
                      Téléversez vos variantes claire (Solstice) et sombre (Nebula). Elles s'appliqueront instantanément sur le site et dans le header animé.
                    </p>
                    <div className="space-y-1 text-[0.65rem] uppercase tracking-[0.35em] text-white/45">
                      <p>Solstice : {isCustomSolstice ? "personnalisé" : "logo par défaut"}</p>
                      <p>Nebula : {isCustomNebula ? "personnalisé" : "logo par défaut"}</p>
                    </div>
                  </div>
                </div>
                <BrandMark dual className="w-full max-w-xs" />
              </div>

              {brandFeedback && (
                <p
                  className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                    brandFeedback.type === "success"
                      ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-100"
                      : "border-rose-300/50 bg-rose-500/10 text-rose-100"
                  }`}
                >
                  {brandFeedback.message}
                </p>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleOpenLogoPicker("solstice")}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
                >
                  Mettre à jour Solstice
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenLogoPicker("nebula")}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
                >
                  Mettre à jour Nebula
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/45">
                <button
                  type="button"
                  onClick={handleResetBrandAssets}
                  className="rounded-full border border-white/20 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
                >
                  Réinitialiser logos
                </button>
                <span>Formats acceptés : SVG, PNG, WebP</span>
              </div>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/svg+xml,image/png,image/webp,image/jpeg,image/gif"
                className="hidden"
                onChange={handleLogoFileChange}
              />
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(56,189,248,0.18)] visual-accent-veil">
              <h2 className="text-2xl font-bold">Ajouter un projet au portfolio</h2>
              <p className="mt-2 text-sm text-slate-200/70">Ajoutez, modifiez, supprimez librement les projets visibles côté vitrine.</p>
              <form className="mt-6 grid gap-4" onSubmit={handleAddProject}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Titre"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <input
                    required
                    value={newProject.tagline}
                    onChange={(e) => setNewProject((p) => ({ ...p, tagline: e.target.value }))}
                    placeholder="Tagline"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-[1.5fr_auto]">
                  <input
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Lien YouTube (youtu.be ou youtube.com)"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleImportMetadata}
                    disabled={isImportingMetadata}
                    className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isImportingMetadata ? "Import..." : "Importer"}
                  </button>
                </div>
                {metadataError && <p className="text-xs text-rose-300">{metadataError}</p>}
                <div className="grid gap-4 sm:grid-cols-4">
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject((p) => ({ ...p, category: e.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  >
                    {serviceCategories.map((category) => (
                      <option key={category} value={category} className="bg-slate-900 text-white">
                        {category}
                      </option>
                    ))}
                  </select>
                  <input
                    value={newProject.year}
                    type="number"
                    onChange={(e) => setNewProject((p) => ({ ...p, year: Number(e.target.value) }))}
                    placeholder="Année"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <input
                    value={newProject.duration}
                    onChange={(e) => setNewProject((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="Durée"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <input
                    value={newProject.videoUrl}
                    onChange={(e) => setNewProject((p) => ({ ...p, videoUrl: e.target.value }))}
                    placeholder="Lien vidéo final"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                </div>
                <input
                  value={newProject.thumbnail}
                  onChange={(e) => setNewProject((p) => ({ ...p, thumbnail: e.target.value }))}
                  placeholder="URL vignette (optionnel si import)"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                />
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))}
                  rows={4}
                  placeholder="Description punchy"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    value={newProject.aiTools}
                    onChange={(e) => setNewProject((p) => ({ ...p, aiTools: e.target.value }))}
                    placeholder="IA tools (séparés par virgule)"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <input
                    value={newProject.deliverables}
                    onChange={(e) => setNewProject((p) => ({ ...p, deliverables: e.target.value }))}
                    placeholder="Livrables"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <input
                    value={newProject.socialStack}
                    onChange={(e) => setNewProject((p) => ({ ...p, socialStack: e.target.value }))}
                    placeholder="Stack social"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                  >
                    Ajouter au portfolio
                  </button>
                  <button
                    type="button"
                    onClick={resetNewProject}
                    className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                  >
                    Réinitialiser
                  </button>
                </div>
              </form>

              {editDraft && (
                <form className="mt-10 grid gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-6" onSubmit={handleUpdateProject}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Modifier : {editDraft.title}</h3>
                    <button type="button" onClick={cancelEdit} className="text-xs uppercase tracking-[0.3em] text-rose-300 hover:text-rose-200">
                      Annuler
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      value={editDraft.title}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, title: e.target.value } : p))}
                      placeholder="Titre"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                    <input
                      required
                      value={editDraft.tagline}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, tagline: e.target.value } : p))}
                      placeholder="Tagline"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <select
                      value={editDraft.category}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, category: e.target.value } : p))}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    >
                      {serviceCategories.map((category) => (
                        <option key={category} value={category} className="bg-slate-900 text-white">
                          {category}
                        </option>
                      ))}
                    </select>
                    <input
                      value={editDraft.year}
                      type="number"
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, year: Number(e.target.value) } : p))}
                      placeholder="Année"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                    <input
                      value={editDraft.duration}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, duration: e.target.value } : p))}
                      placeholder="Durée"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                    <input
                      value={editDraft.videoUrl}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, videoUrl: e.target.value } : p))}
                      placeholder="Lien vidéo"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={editDraft.description}
                    onChange={(e) => setEditDraft((p) => (p ? { ...p, description: e.target.value } : p))}
                    rows={4}
                    placeholder="Description"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <input
                      value={editDraft.thumbnail}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, thumbnail: e.target.value } : p))}
                      placeholder="Vignette"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                    <input
                      value={editDraft.aiTools}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, aiTools: e.target.value } : p))}
                      placeholder="IA Tools"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                    <input
                      value={editDraft.deliverables}
                      onChange={(e) => setEditDraft((p) => (p ? { ...p, deliverables: e.target.value } : p))}
                      placeholder="Livrables"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    />
                  </div>
                  <input
                    value={editDraft.socialStack}
                    onChange={(e) => setEditDraft((p) => (p ? { ...p, socialStack: e.target.value } : p))}
                    placeholder="Stack social"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-4">
                    <button type="submit" className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (editDraft) {
                          removePortfolioItem(editDraft.id);
                          setEditDraft(null);
                        }
                      }}
                      className="rounded-full border border-rose-300/60 bg-rose-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </form>
              )}
              <div className="mt-6 grid gap-4 text-sm text-slate-200/70 sm:grid-cols-2">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                      <span>{item.category}</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => startEditingProject(item.id)} className="text-cyan-200 hover:text-cyan-100">
                          Modifier
                        </button>
                        <button type="button" onClick={() => removePortfolioItem(item.id)} className="text-rose-300 hover:text-rose-200">
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-200/60">{item.tagline}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarifs */}
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.18)] visual-secondary-veil">
              <h2 className="text-2xl font-bold">Gestion des tarifs</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {pricingTiers.map((tier) => (
                  <div key={tier.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">{tier.name}</p>
                    <input
                      type="number"
                      className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                      value={tier.price}
                      onChange={(e) => updatePricingTier(tier.id, { price: Number(e.target.value) })}
                    />
                    <p className="mt-2 text-xs text-slate-200/60">{tier.description}</p>
                    <p className="mt-2 text-xs text-slate-200/60">{tier.sla}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar admin */}
          <aside className="space-y-10">
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(56,189,248,0.15)] visual-accent-veil">
              <h2 className="text-2xl font-bold">Comptes clients</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-200/70">
                {clients.map((client) => (
                  <div key={client.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-xs text-slate-200/60">{client.email}</p>
                      </div>
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80 visual-accent-text">
                        {client.membership}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/60">
                      {[client.clientType, client.company, client.industry].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(236,72,153,0.15)] visual-secondary-veil">
              <h2 className="text-2xl font-bold">Demandes de devis</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-200/70">
                {quoteRequests.map((quote) => (
                  <div key={quote.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{quote.projectName}</p>
                        <p className="text-xs text-slate-200/60">{quote.clientName} · {quote.budgetRange}</p>
                      </div>
                      <select
                        value={quote.status}
                        onChange={(e) => advanceQuoteStatus(quote.id, e.target.value as typeof quote.status)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en revue">En revue</option>
                        <option value="validé">Validé</option>
                        <option value="refusé">Refusé</option>
                      </select>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/60">Deadline : {quote.deadline}</p>
                    <p className="mt-2 text-xs text-slate-200/60">Services : {quote.services.join(", ")}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedChatId(quote.id)}
                      className="mt-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white"
                    >
                      Ouvrir le chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(34,211,238,0.18)]">
              <h2 className="text-2xl font-bold">Chat style SMS</h2>
              <div className="mt-4 flex gap-4">
                <div className="w-1/3 space-y-2 text-xs text-slate-200/70">
                  {chats.map((thread) => (
                    <button
                      key={thread.quoteId}
                      type="button"
                      onClick={() => setSelectedChatId(thread.quoteId)}
                      className={`w-full rounded-2xl border px-3 py-2 text-left ${thread.quoteId === selectedChatId ? "border-cyan-300 bg-white/20" : "border-white/10 bg-white/5"}`}
                    >
                      <p className="font-semibold text-white">{thread.clientName}</p>
                      <p className="text-[0.65rem] text-slate-200/60">{thread.projectName}</p>
                    </button>
                  ))}
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  {activeChat ? (
                    <div className="flex h-full flex-col">
                      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                        {activeChat.messages.map((message) => (
                          <div key={message.id} className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.from === "studio" ? "ml-auto bg-cyan-500/20 visual-accent-bg text-cyan-100 visual-accent-text-strong" : "bg-white/10 text-slate-100"}`}>
                            <p>{message.content}</p>
                            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-200/50">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <input
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Répondre avec panache"
                          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleSendMessage}
                          className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                        >
                          Envoyer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-200/70">Aucun chat sélectionné.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

/* --------------- utilitaires locaux supposés présents ailleurs ------------- */
function getTimeValue(iso: string) {
  return new Date(iso).getTime();
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString();
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString();
}
const STATUS_MESSAGES: Record<QuoteStatus, string> = {
  nouveau: "Votre brief est bien reçu. L'équipe le place en file et prépare l'analyse.",
  "en revue": "Notre équipe aligne la proposition : cadrage créatif, budget, équipe et pipeline IA.",
  validé: "Top ! Le devis est validé. On active le chat projet et la préprod.",
  refusé: "Le devis est réorienté. Nous revenons vers vous avec un plan alternatif.",
};
