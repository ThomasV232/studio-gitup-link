import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CLIENT_TYPES, useStudio } from "@/context/StudioContext";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

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
  const supabaseConfigured = isSupabaseConfigured;
  const supabaseSetupMessage =
    "L'authentification nécessite la configuration de Supabase (VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY).";
  const formDisabled = !supabaseConfigured;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("mode");

    if (view === "forgot" && !supabaseConfigured) {
      setMode("login");
      setError(supabaseSetupMessage);
      setSuccess(null);
      return;
    }

    if (view === "login" || view === "register" || view === "forgot") {
      setMode(view);
    } else {
      setMode("register");
    }

    setError(null);
    setSuccess(null);
  }, [location.search, supabaseConfigured, supabaseSetupMessage]);

  const changeMode = (nextMode: AuthMode) => {
    if (nextMode === "forgot" && !supabaseConfigured) {
      setError(supabaseSetupMessage);
      setSuccess(null);
      return;
    }

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

  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    clientType: (typeof CLIENT_TYPES)[number] | "";
  }>({
    name: "",
    email: "",
    password: "",
    clientType: "",
  });

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
      clientType: "",
    });

  useEffect(() => {
    if (mode === "forgot") {
      setForm((prev) => ({ ...prev, password: "" }));
    }
  }, [mode]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!supabaseConfigured) {
      setError(supabaseSetupMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        const trimmedPassword = form.password.trim();

        if (!form.name || !form.email || !trimmedPassword || !form.clientType) {
          setError("Merci de remplir tous les champs indispensables.");
          return;
        }

        if (trimmedPassword.length < 8 || !/[A-Z]/.test(trimmedPassword) || !/\d/.test(trimmedPassword)) {
          setError(
            "Votre mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
          );
          return;
        }

        const response = await registerUser({
          name: form.name,
          email: form.email,
          password: trimmedPassword,
          clientType: form.clientType as (typeof CLIENT_TYPES)[number],
        });
        if (response.success) {
          setSuccess(response.message ?? "Compte créé avec succès. Vous êtes désormais connecté·e.");
          resetForm();
        } else {
          setError(response.message ?? "Impossible de créer le compte.");
        }
      } else if (mode === "login") {
        const trimmedPassword = form.password.trim();

        if (!trimmedPassword) {
          setError("Merci d'indiquer votre mot de passe.");
          return;
        }

        const response = await login(form.email, trimmedPassword);
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
          {!supabaseConfigured && (
            <div className="rounded-2xl border border-amber-300/40 bg-amber-500/10 px-4 py-3 text-[0.75rem] text-amber-100">
              Pour activer l'inscription, la connexion et la récupération de mot de passe, configurez Supabase dans vos
              variables d'environnement.
            </div>
          )}
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
                  className={cn(
                    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none",
                    formDisabled && "cursor-not-allowed opacity-60",
                  )}
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Nom et prénom"
                  required
                  disabled={formDisabled}
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Type de client</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {CLIENT_TYPES.map((type) => {
                    const isSelected = form.clientType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            clientType: type,
                          }))
                        }
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-left text-sm transition",
                          isSelected
                            ? "border-cyan-300/80 bg-cyan-500/20 text-white shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                            : "border-white/10 bg-white/5 text-slate-200/80 hover:border-cyan-200/40 hover:bg-white/10",
                          formDisabled && "cursor-not-allowed opacity-60",
                        )}
                        aria-pressed={isSelected}
                        disabled={formDisabled}
                      >
                        <span className="font-semibold uppercase tracking-[0.25em] text-cyan-100/80 visual-accent-text-strong">
                          {type}
                        </span>
                        <p className="mt-2 text-xs text-slate-200/70">
                          {type === "Entreprise"
                            ? "Sociétés, startups, studios..."
                            : type === "Particulier"
                              ? "Créateurs et projets personnels."
                              : type === "Association"
                                ? "Collectifs, ONG, réseaux engagés."
                                : "Institutions publiques ou territoriales."}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Adresse email</label>
                <input
                  type="email"
                  className={cn(
                    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none",
                    formDisabled && "cursor-not-allowed opacity-60",
                  )}
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="vous@futurebrand.com"
                  required
                  disabled={formDisabled}
                />
              </div>
            {mode !== "forgot" ? (
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Mot de passe</label>
                <input
                  type="password"
                  className={cn(
                    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none",
                    formDisabled && "cursor-not-allowed opacity-60",
                  )}
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder={mode === "register" ? "Créer un mot de passe sécurisé" : "Votre mot de passe"}
                  disabled={formDisabled}
                />
                {mode === "register" && (
                  <p className="mt-2 text-[0.7rem] text-slate-300/70">
                    Au moins 8 caractères, une majuscule et un chiffre pour sécuriser votre espace client.
                  </p>
                )}
                  {mode === "login" &&
                    (supabaseConfigured ? (
                      <button
                        type="button"
                        onClick={() => changeMode("forgot")}
                        className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-200/70 transition hover:text-white"
                      >
                        Mot de passe oublié ?
                      </button>
                    ) : (
                      <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400/50">
                        Configurez Supabase pour activer la récupération de mot de passe.
                      </p>
                    ))}
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
            disabled={isSubmitting || !supabaseConfigured}
            className={cn(
              "group relative w-full overflow-hidden rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white transition",
              (isSubmitting || !supabaseConfigured) && "cursor-not-allowed opacity-70"
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
