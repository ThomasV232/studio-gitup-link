import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { BrandMark } from "@/components/branding/BrandMark";
import { CATEGORIES } from "@/components/header/nav.config";
import PageShell from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useStudio } from "@/context/StudioContext";
import { cn } from "@/lib/utils";

const contactFormats = [
  { value: "visio", label: "Appel visio 30 min" },
  { value: "rdv", label: "Rendez-vous sur site" },
  { value: "atelier", label: "Atelier cadrage 90 min" },
];

const budgetRanges = [
  { value: "<1500", label: "Moins de 1 500 €" },
  { value: "1500-3000", label: "1 500 – 3 000 €" },
  { value: "3000-6000", label: "3 000 – 6 000 €" },
  { value: ">6000", label: "Plus de 6 000 €" },
];

const urgencyOptions = [
  { value: "hier", label: "Projet urgent" },
  { value: "cette-semaine", label: "Démarrage cette semaine" },
  { value: "ce-mois", label: "Ce mois-ci" },
  { value: "planifie", label: "Je planifie tranquillement" },
];

const processSteps = [
  {
    title: "Diagnostic & cadrage",
    description: "30 min pour comprendre enjeux, audiences et KPI. Livrable : synthèse stratégique + moodboard.",
  },
  {
    title: "Production agile",
    description: "Tournages multicam, drone, pipeline IA supervisé et équipe dimensionnée selon vos besoins.",
  },
  {
    title: "Activation",
    description: "Montage, déclinaisons verticales, sous-titres dynamiques et plan de diffusion avec reporting 30 j.",
  },
];

const Contact = () => {
  const { recordContactRequest } = useStudio();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    serviceType: CATEGORIES[0]?.label ?? "Entreprise",
    budget: budgetRanges[1].value,
    urgency: urgencyOptions[1].value,
    deadline: "",
    format: contactFormats[0].value,
    message: "",
    briefFile: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return;
    }
    setFormState("sending");
    const summary = [
      `Type de vidéo : ${form.serviceType}`,
      `Budget : ${form.budget}`,
      `Deadline : ${form.deadline || "À définir"}`,
      `Urgence : ${form.urgency}`,
      `Format d'échange : ${contactFormats.find((option) => option.value === form.format)?.label ?? form.format}`,
      `Brief joint : ${form.briefFile || "Aucun"}`,
      "---",
      form.message,
    ].join("\n");

    const normalizedUrgency = form.urgency === "hier" ? "hier" : form.urgency === "cette-semaine" ? "cette-semaine" : "quand-c-est-parfait";

    recordContactRequest({
      name: form.name,
      email: form.email,
      projectSpark: summary,
      urgency: normalizedUrgency,
    });

    setTimeout(() => {
      setFormState("sent");
      setForm({
        name: "",
        email: "",
        serviceType: CATEGORIES[0]?.label ?? "Entreprise",
        budget: budgetRanges[1].value,
        urgency: urgencyOptions[1].value,
        deadline: "",
        format: contactFormats[0].value,
        message: "",
        briefFile: "",
      });
    }, 400);
  };

  return (
    <PageShell
      gradientStyle={{
        background:
          "radial-gradient(circle at 10% 15%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 85% 70%, rgba(236,72,153,0.12), transparent 60%), linear-gradient(160deg, rgba(15,23,42,0.95), rgba(15,23,42,0.72))",
      }}
      contentClassName="pb-28"
    >
      <div className="page-container max-w-5xl">
        <header className="space-y-6">
          <BrandMark dual className="max-w-xs" />
          <SectionHeading
            eyebrow="Contact & Devis"
            title="Parlons de votre prochain film"
            description="Expliquez votre projet : nous répondons sous 24 h avec une estimation budgétaire, un rétroplanning et des recommandations de diffusion adaptées à vos canaux."
          />
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-white/50">
            <Link to="https://cal.com" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white transition hover:bg-white/15">
              Réserver un créneau visio
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white/70">
              Réponse sous 24 h
            </span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="surface-panel space-y-6 p-8 sm:p-10">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Type de vidéo
              <select
                value={form.serviceType}
                onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.slug} value={category.label} className="text-slate-900">
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Budget indicatif
              <select
                value={form.budget}
                onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              >
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value} className="text-slate-900">
                    {range.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Deadline souhaitée
              <input
                type="date"
                value={form.deadline}
                onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Urgence
              <select
                value={form.urgency}
                onChange={(event) => setForm((current) => ({ ...current, urgency: event.target.value }))}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              >
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message
            <textarea
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className="min-h-[160px] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
              placeholder="Objectifs, messages clés, inspirations, canaux de diffusion..."
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <fieldset className="space-y-2 text-sm text-white/70">
              <legend className="text-xs uppercase tracking-[0.35em] text-white/60">Format d'échange</legend>
              <div className="grid gap-2">
                {contactFormats.map((option) => {
                  const isActive = form.format === option.value;
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em]",
                        isActive ? "border-sky-400/60 bg-sky-500/20 text-white" : "border-white/20 bg-white/10 text-white/70",
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
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Brief / cahier des charges (PDF, max 10 Mo)
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setForm((current) => ({ ...current, briefFile: file?.name ?? "" }));
                }}
                className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              />
              {form.briefFile && <span className="text-xs text-white/60">Fichier sélectionné : {form.briefFile}</span>}
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.35em] text-white shadow-[0_18px_80px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={formState === "sending"}
          >
            {formState === "sending" ? "Envoi..." : formState === "sent" ? "Message envoyé" : "Envoyer"}
          </button>
        </form>

        <section className="surface-panel p-8 sm:p-10">
          <SectionHeading
            eyebrow="Processus / Méthode"
            title="Notre méthodologie"
            description="Transparence totale sur le déroulement du projet et les responsabilités de chacun. Vous êtes accompagné par le même interlocuteur du cadrage à la diffusion."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="surface-card p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">Phase 0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default Contact;
