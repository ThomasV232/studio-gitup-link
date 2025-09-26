import { FormEvent, useState } from "react";

import { useStudio } from "@/context/StudioContext";
import { cn } from "@/lib/utils";

const options = [
  { value: "appel", label: "Appel visio" },
  { value: "rdv", label: "Rendez-vous sur site" },
  { value: "atelier", label: "Atelier cadrage" },
];

const Contact = () => {
  const { recordContactRequest } = useStudio();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectSpark: "",
    urgency: "cette-semaine" as const,
    format: options[0].value,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.projectSpark) {
      return;
    }
    setFormState("sending");
    recordContactRequest({
      name: form.name,
      email: form.email,
      projectSpark: `${form.projectSpark}\nFormat souhaité : ${form.format}`,
      urgency: form.urgency,
    });
    setTimeout(() => {
      setFormState("sent");
      setForm({ name: "", email: "", projectSpark: "", urgency: "cette-semaine", format: options[0].value });
    }, 400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 15%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 85% 70%, rgba(236,72,153,0.12), transparent 60%), linear-gradient(160deg, rgba(15,23,42,0.95), rgba(15,23,42,0.72))",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 pb-24 pt-28 sm:px-10">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Contact</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Parlons de votre prochain film</h1>
          <p className="max-w-2xl text-sm text-white/70">
            Expliquez-moi votre projet, je vous réponds dans la journée avec un plan de production, un budget indicatif et mes
            prochaines disponibilités.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_24px_120px_rgba(56,189,248,0.18)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Nom
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                placeholder="Prénom Nom"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                placeholder="vous@entreprise.com"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Projet
            <textarea
              value={form.projectSpark}
              onChange={(event) => setForm((current) => ({ ...current, projectSpark: event.target.value }))}
              className="min-h-[160px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
              placeholder="Format souhaité, objectifs, ambiance, échéance..."
              required
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Urgence
              <select
                value={form.urgency}
                onChange={(event) => setForm((current) => ({ ...current, urgency: event.target.value as typeof form.urgency }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              >
                <option value="hier">Projet urgent</option>
                <option value="cette-semaine">Démarrage cette semaine</option>
                <option value="quand-c-est-parfait">Je planifie tranquillement</option>
              </select>
            </label>
            <fieldset className="space-y-2 text-sm text-white/70">
              <legend className="text-xs uppercase tracking-[0.35em] text-white/60">Format d'échange</legend>
              <div className="grid gap-2">
                {options.map((option) => {
                  const isActive = form.format === option.value;
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em]",
                        isActive ? "border-sky-400/60 bg-sky-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"
                      )}
                    >
                      <input
                        type="radio"
                        name="contact-format"
                        value={option.value}
                        checked={isActive}
                        onChange={(event) => setForm((current) => ({ ...current, format: event.target.value }))}
                        className="hidden"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={formState === "sending"}
          >
            {formState === "sending" ? "Envoi..." : formState === "sent" ? "Message envoyé" : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
