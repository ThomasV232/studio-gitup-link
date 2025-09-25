import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { register: registerUser, login, user } = useStudio();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = (location.state as { from?: string })?.from ?? "/dashboard";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    industry: "",
    membership: "Hyperdrive" as const,
  });

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "register") {
      if (!form.name || !form.email || !form.password) {
        setError("Merci de remplir tous les champs indispensables.");
        return;
      }
      const response = registerUser(form);
      if (response.success) {
        setSuccess("Compte créé avec succès. Vous êtes désormais connecté·e.");
      } else {
        setError(response.message ?? "Impossible de créer le compte.");
      }
    } else {
      const response = login(form.email, form.password);
      if (!response.success) {
        setError(response.message ?? "Impossible de se connecter.");
      } else {
        setSuccess("Connexion réussie. Vous pouvez préparer votre brief.");
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, hsla(var(--visual-accent)/0.22), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 90% 90%, hsla(var(--visual-secondary)/0.22), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-24 pt-28 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_25px_120px_rgba(14,165,233,0.2)] visual-accent-halo">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
              Studio VBG · Espace client
            </span>
            <h1 className="text-5xl font-black leading-tight">
              Accédez à l'espace client
            </h1>
            <p className="text-lg text-slate-200/80">
              Créez votre compte ou connectez-vous pour consulter le tableau de
              bord, déposer un brief, suivre vos devis et échanger avec nos
              équipes.
            </p>
            <div className="grid gap-4 text-sm text-slate-200/70 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
                  Onboarding structuré
                </p>
                <p className="mt-2">
                  Un formulaire clair pour rassembler les informations
                  essentielles à votre projet.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
                  Sécurité maîtrisée
                </p>
                <p className="mt-2">
                  Vos données sont hébergées en interne et utilisées
                  exclusivement pour vos projets.
                </p>
              </div>
            </div>
          </div>
        </div>
        <form
          className="space-y-6 rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.2)] visual-secondary-veil"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
            <span>{mode === "register" ? "Créer un compte" : "Connexion"}</span>
            <button
              type="button"
              onClick={() => {
                setMode((prev) =>
                  prev === "register" ? "login" : "register"
                );
                setError(null);
                setSuccess(null);
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white"
            >
              {mode === "register"
                ? "J'ai déjà un compte"
                : "Créer un compte"}
            </button>
          </div>

          {mode === "register" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                  Nom complet
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Nom et prénom"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                    Entreprise
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.company}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        company: event.target.value,
                      }))
                    }
                    placeholder="Nom de l'entreprise"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                    Secteur
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.industry}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        industry: event.target.value,
                      }))
                    }
                    placeholder="Secteur d'activité"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                  Programme
                </label>
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  value={form.membership}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      membership: event.target.value as typeof prev.membership,
                    }))
                  }
                >
                  <option value="Impulse">Impulse (starter)</option>
                  <option value="Hyperdrive">
                    Hyperdrive (campagne multi-format)
                  </option>
                  <option value="Continuum">
                    Continuum (retainer annuel)
                  </option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="vous@studio2025.com"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                Mot de passe
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Au moins 8 caractères"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white"
          >
            <span className="relative z-10">
              {mode === "register" ? "Créer mon compte" : "Connexion"}
            </span>
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 transition-transform duration-700 group-hover:translate-x-0 visual-accent-gradient" />
          </button>

          {error && (
            <p className="rounded-2xl border border-rose-200/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-2xl border border-emerald-200/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
