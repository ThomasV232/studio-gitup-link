import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStudio } from "@/context/StudioContext";
import { cn } from "@/lib/utils";

const membershipTiers = [
  {
    value: "Hyperdrive",
    label: "Hyperdrive",
    tagline: "Production intensive",
    description:
      "3 tournages prioritaires par mois, cellule IA dédiée et reportings hebdomadaires.",
  },
  {
    value: "Cinematic",
    label: "Cinematic",
    tagline: "Pack signature",
    description:
      "Mix plateau / IA, direction artistique senior, livraison multi-formats en 7 jours.",
  },
  {
    value: "Launchpad",
    label: "Launchpad",
    tagline: "Accélérateur",
    description:
      "Kit contenu mensuel, optimisation réseaux sociaux et accompagnement éditorial.",
  },
  {
    value: "Impulse",
    label: "Impulse",
    tagline: "Starter",
    description:
      "Lancement rapide : sprint créatif IA, tournage condensé, kit social optimisé.",
  },
  {
    value: "Continuum",
    label: "Continuum",
    tagline: "Retainer annuel",
    description:
      "Équipe dédiée, production continue, live trimestriels et optimisation permanente.",
  },
] as const;

type MembershipPlan = (typeof membershipTiers)[number]["value"];
type AuthMode = "register" | "login" | "forgot";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("register");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser, login, requestPasswordReset, user } = useStudio();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = (location.state as { from?: string })?.from ?? "/dashboard";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("mode");

    if (view === "login" || view === "register" || view === "forgot") {
      setMode(view);
    } else {
      setMode("register");
    }

    setError(null);
    setSuccess(null);
  }, [location.search]);

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);

    const search = nextMode === "register" ? "" : `?mode=${nextMode}`;
    navigate(
      {
        pathname: location.pathname,
        search,
      },
      { replace: true, state: location.state },
    );
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    industry: "",
    membership: membershipTiers[0].value as MembershipPlan,
  });

  const membershipLabel = useMemo(() => {
    return membershipTiers.find((tier) => tier.value === form.membership)?.label ?? "";
  }, [form.membership]);

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  const resetForm = () =>
    setForm({
      name: "",
      email: "",
      password: "",
      company: "",
      industry: "",
      membership: membershipTiers[0].value,
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        if (!form.name || !form.email || !form.password || !form.company || !form.industry) {
          setError("Merci de remplir tous les champs indispensables.");
          return;
        }

        const response = await registerUser(form);
        if (response.success) {
          setSuccess(response.message ?? "Compte créé avec succès. Vous êtes désormais connecté·e.");
          resetForm();
        } else {
          setError(response.message ?? "Impossible de créer le compte.");
        }
      } else if (mode === "login") {
        const response = await login(form.email, form.password);
        if (!response.success) {
          setError(response.message ?? "Impossible de se connecter.");
        } else {
          setSuccess("Connexion réussie. Vous pouvez préparer votre brief.");
        }
      } else {
        if (!form.email) {
          setError("Merci d'indiquer l'adresse email associée à votre compte.");
          return;
        }

        const response = await requestPasswordReset(form.email);
        if (!response.success) {
          setError(response.message ?? "Impossible d'envoyer le lien de réinitialisation.");
        } else {
          setSuccess(response.message ?? "Email de réinitialisation envoyé. Pensez à vérifier vos spams.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 10% 10%, hsla(var(--visual-accent)/0.22), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 90% 90%, hsla(var(--visual-secondary)/0.22), transparent 60%)" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-24 pt-28 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_25px_120px_rgba(14,165,233,0.2)] visual-accent-halo">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
              Studio VBG · Espace client
            </span>
            <h1 className="text-5xl font-black leading-tight">Accédez à l'espace client</h1>
            <p className="text-lg text-slate-200/80">
              Créez votre compte ou connectez-vous pour consulter le tableau de bord, déposer un brief, suivre vos devis
              et échanger avec nos équipes.
            </p>
            <div className="grid gap-4 text-sm text-slate-200/70 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Onboarding structuré</p>
                <p className="mt-2">Un formulaire clair pour rassembler les informations essentielles à votre projet.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Sécurité maîtrisée</p>
                <p className="mt-2">Vos données sont hébergées en interne et utilisées exclusivement pour vos projets.</p>
              </div>
            </div>
          </div>
        </div>

        <form
          className="space-y-6 rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.2)] visual-secondary-veil"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-slate-200/70">
            <span>
              {mode === "register" ? "Créer un compte" : mode === "login" ? "Connexion" : "Mot de passe oublié"}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/10">
                <button
                  type="button"
                  onClick={() => changeMode("register")}
                  className={cn(
                    "px-4 py-2 text-[0.65rem] font-semibold transition",
                    mode === "register"
                      ? "bg-white/25 text-slate-900"
                      : "text-white/80 hover:text-white"
                  )}
                  aria-pressed={mode === "register"}
                >
                  S'inscrire
                </button>
                <button
                  type="button"
                  onClick={() => changeMode("login")}
                  className={cn(
                    "px-4 py-2 text-[0.65rem] font-semibold transition",
                    mode === "login" ? "bg-white/25 text-slate-900" : "text-white/80 hover:text-white"
                  )}
                  aria-pressed={mode === "login"}
                >
                  Connexion
                </button>
              </div>
              {mode === "forgot" && (
                <button
                  type="button"
                  onClick={() => changeMode("login")}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
                >
                  Retour connexion
                </button>
              )}
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Nom complet</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Nom et prénom"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Entreprise</label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.company}
                    onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Nom de l'entreprise"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Secteur</label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.industry}
                    onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
                    placeholder="Secteur d'activité"
                    required
                  />
                </div>
              </div>

              {/* Sélecteur de formule compatible avec StudioContext */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Formule sélectionnée</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {membershipTiers.map((tier) => {
                    const isActive = tier.value === form.membership;
                    return (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, membership: tier.value }))}
                        className={cn(
                          "rounded-2xl border bg-white/5 px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                          isActive
                            ? "border-cyan-300/80 bg-cyan-500/20 text-white shadow-[0_10px_40px_rgba(56,189,248,0.25)]"
                            : "border-white/10 text-slate-100/80 hover:border-cyan-200/40 hover:bg-white/10"
                        )}
                        aria-pressed={isActive}
                      >
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100/80 visual-accent-text-strong">
                          {tier.label}
                        </span>
                        <p className="mt-2 text-xs text-slate-200/80">{tier.tagline}</p>
                        <p className="mt-1 text-[0.7rem] text-slate-300/70">{tier.description}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[0.7rem] text-slate-300/70">
                  {membershipLabel} · ajustable à tout moment depuis le tableau de bord.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Adresse email</label>
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="vous@futurebrand.com"
                required
              />
            </div>
            {mode !== "forgot" ? (
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Mot de passe</label>
                <input
                  type="password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder={mode === "register" ? "Créer un mot de passe sécurisé" : "Votre mot de passe"}
                  required
                  minLength={8}
                />
                {mode === "register" && (
                  <p className="mt-2 text-[0.7rem] text-slate-300/70">
                    Au moins 8 caractères, une majuscule et un chiffre pour sécuriser votre espace client.
                  </p>
                )}
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => changeMode("forgot")}
                    className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-200/70 transition hover:text-white"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-[0.75rem] text-slate-200/80">
                <p>
                  Saisissez l'adresse email associée à votre compte. Nous vous enverrons un lien pour choisir un nouveau mot de passe.
                </p>
              </div>
            )}
          </div>

          {error && (
            <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
          )}

          {success && (
            <p className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "group relative w-full overflow-hidden rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white transition",
              isSubmitting && "cursor-not-allowed opacity-70"
            )}
          >
            <span className="relative z-10">
              {isSubmitting
                ? "Traitement en cours..."
                : mode === "register"
                  ? "Créer mon espace"
                  : mode === "login"
                    ? "Me connecter"
                    : "Envoyer le lien"}
            </span>
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 transition-transform duration-700 group-hover:translate-x-0" />
          </button>

          <p className="text-[0.7rem] text-slate-300/70">
            En validant, vous acceptez les conditions générales Studio VBG et notre politique de confidentialité.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
