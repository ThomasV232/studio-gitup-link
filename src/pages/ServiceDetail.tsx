/* src/pages/QuoteBuilder.tsx */
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "@/context/StudioContext";

const availableServices = [
  "Captation multicam",
  "Scénarisation assistée par IA",
  "Plateau XR",
  "Pack réseaux sociaux",
  "Diffusion live",
  "Contenus verticaux 9:16",
];

const QuoteBuilder = () => {
  const { user, createQuoteRequest } = useStudio();
  const [step, setStep] = useState(0);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [form, setForm] = useState({
    projectName: "",
    budgetRange: "",
    deadline: "",
    services: [] as string[],
    moodboardPrompt: "",
  });

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <div className="max-w-xl space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Étape obligatoire</p>
          <h1 className="text-4xl font-black leading-tight">Connectez-vous avant de demander un devis</h1>
          <p className="text-lg text-slate-200/80">
            Une fois votre compte actif, vous accédez au tableau de bord et au suivi en temps réel de votre dossier.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auth"
              className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              Me connecter
            </Link>
            <Link
              to="/"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              Explorer avant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const quote = createQuoteRequest(form);
    if (quote) {
      setSuccessId(quote.id);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 15% 15%, hsla(var(--visual-accent)/0.22), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 85% 85%, hsla(var(--visual-secondary)/0.22), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)] visual-accent-veil">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
              Demande de devis · Studio VBG
            </span>
            <h1 className="text-5xl font-black leading-tight">Construisons votre projet vidéo</h1>
            <p className="text-lg text-slate-200/80">
              Trois étapes guidées : notre IA synthétise votre brief pour préparer le travail des équipes de production.
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-16 space-y-8 rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.2)] visual-secondary-veil"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/70">
            <span>Étape {step + 1} / 3</span>
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className={`h-1.5 w-16 rounded-full ${index <= step ? "bg-cyan-300 visual-accent-dot" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Nom du projet</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  value={form.projectName}
                  onChange={(event) => setForm((prev) => ({ ...prev, projectName: event.target.value }))}
                  placeholder="Nom du projet"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Budget pressenti</label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.budgetRange}
                    onChange={(event) => setForm((prev) => ({ ...prev, budgetRange: event.target.value }))}
                    placeholder="15 000 € - 25 000 €"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Deadline</label>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                    value={form.deadline}
                    onChange={(event) => setForm((prev) => ({ ...prev, deadline: event.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Services souhaités</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {availableServices.map((service) => {
                  const active = form.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          services: active
                            ? prev.services.filter((item) => item !== service)
                            : [...prev.services, service],
                        }))
                      }
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        active ? "border-cyan-300 bg-white/20 text-white" : "border-white/20 bg-white/10 text-slate-200/80"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Moodboard & intentions</label>
                <textarea
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 visual-accent-border focus:outline-none"
                  rows={6}
                  value={form.moodboardPrompt}
                  onChange={(event) => setForm((prev) => ({ ...prev, moodboardPrompt: event.target.value }))}
                  placeholder="Décrivez les enjeux, les messages prioritaires et les livrables attendus."
                  required
                />
              </div>
              <p className="text-xs text-slate-200/60">
                Notre IA transforme ce brief en storyboard, sélection d&apos;actifs et planning prévisionnel.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              className="rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:opacity-40"
              disabled={step === 0}
            >
              Retour
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, 2))}
                className="rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                Étape suivante
              </button>
            ) : (
              <button
                type="submit"
                className="group relative overflow-hidden rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                <span className="relative z-10">Envoyer le brief</span>
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 transition-transform duration-700 group-hover:translate-x-0 visual-accent-gradient" />
              </button>
            )}
          </div>

          {successId && (
            <div className="rounded-3xl border border-emerald-200/40 bg-emerald-500/10 p-6 text-sm text-emerald-100">
              Votre demande est enregistrée. Un espace de discussion dédié s&apos;ouvrira dès validation du devis. ID :{" "}
              {successId.slice(0, 8)}...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteBuilder;
