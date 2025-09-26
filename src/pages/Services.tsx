import { Link } from "react-router-dom";

const services = [
  {
    slug: "entreprise",
    title: "Vidéo Entreprise",
    hook: "Expliquez, recrutez, vendez — avec des films clairs et crédibles.",
    deliverables: [
      "1 film principal 60–90 s",
      "3 déclinaisons 15–30 s",
      "Sous-titres FR/EN & miniatures",
    ],
    timeline: "10–15 jours ouvrés",
    price: "À partir de 1 900 € HT",
    proof: "+38 % d’inscriptions à un webinaire",
    cta: "Découvrir le service Entreprise",
  },
  {
    slug: "evenementiel",
    title: "Vidéo Événementiel",
    hook: "Faites revivre votre événement, et donnez envie de venir au prochain.",
    deliverables: [
      "Aftermovie 60–90 s",
      "5 capsules verticales 10–15 s",
      "Galerie photo optionnelle",
    ],
    timeline: "J+3 à J+7",
    price: "À partir de 1 400 € HT",
    proof: "Taux de réinscription +24 %",
    cta: "Voir le service Événementiel",
  },
  {
    slug: "immobilier",
    title: "Vidéo Immobilier",
    hook: "Vendez plus vite — mettez en valeur volumes, lumière et quartier.",
    deliverables: [
      "Visite 60 s + plan de coupe",
      "Version verticale 30 s",
      "Photos HDR en option",
    ],
    timeline: "48–72 h après tournage",
    price: "À partir de 650 € HT",
    proof: "2 offres reçues en 72 h",
    cta: "Découvrir le service Immobilier",
  },
  {
    slug: "reseaux-sociaux",
    title: "Réseaux sociaux",
    hook: "Un workflow mensuel pour rester visible sans y passer vos soirées.",
    deliverables: [
      "8–16 vidéos verticales/mois",
      "Pack sous-titres & templates",
      "Calendrier éditorial inclus",
    ],
    timeline: "Cadence mensuelle",
    price: "Abonnement dès 890 € HT / mois",
    proof: "+120 % de vues sur 60 jours",
    cta: "Voir le service Réseaux sociaux",
  },
  {
    slug: "mariage",
    title: "Vidéo Mariage",
    hook: "Un film sincère, vivant, pour revivre l’émotion sans longueur.",
    deliverables: [
      "Film 5–8 minutes",
      "Bande-annonce 60 s",
      "Discours & galerie privée",
    ],
    timeline: "3–6 semaines",
    price: "À partir de 1 900 € TTC",
    proof: "97 % des couples recommandent",
    cta: "Voir le service Mariage",
  },
  {
    slug: "motion-design-ia",
    title: "Motion design / IA",
    hook: "Expliquez l’invisible : process, produit tech, data — simplement.",
    deliverables: [
      "Vidéo 45–90 s animée",
      "Déclinaisons 30 s & 15 s",
      "Voice-over & sound design",
    ],
    timeline: "2–4 semaines",
    price: "À partir de 2 400 € HT",
    proof: "+32 % de taux de complétion",
    cta: "Voir le service Motion design/IA",
  },
];

const processSteps = [
  {
    title: "Brief & objectifs",
    description: "30 min d’appel pour cadrer message, public, KPI.",
  },
  {
    title: "Scénario & planning",
    description: "J’écris, vous validez, on cale les dates.",
  },
  {
    title: "Tournage / prod",
    description: "Discret, efficace, respect du cadre & sécurité.",
  },
  {
    title: "Montage & révisions",
    description: "1 à 2 allers-retours inclus, sous-titres, habillage.",
  },
  {
    title: "Livraison & publications",
    description: "Exports optimisés (YouTube, LinkedIn, Insta), miniatures.",
  },
];

const packs = [
  {
    name: "Essentiel",
    description: "Tournage 1/2 journée, film principal, sous-titres.",
    price: "À partir de 950 € HT",
  },
  {
    name: "Pro",
    description: "1 journée, film principal + 2 déclinaisons, miniatures.",
    price: "Dès 1 400 € HT",
  },
  {
    name: "Full",
    description: "1–2 jours, multi-formats (16:9 & 9:16), 5–8 capsules.",
    price: "Sur devis",
  },
];

const options = [
  "Sous-titres multi-langues",
  "Version 9:16",
  "Thumbnails designées",
  "Voix-off pro",
  "Captation drone (selon zone)",
  "Livraison express",
  "Charte motion légère",
];

const faqs = [
  {
    question: "Combien coûte une vidéo ?",
    answer:
      "Ça dépend du temps de tournage, du montage et des livrables. Mes projets démarrent dès 650 € HT (immobilier) et 1 400–1 900 € HT pour entreprise/événementiel. Vous recevez un devis poste par poste.",
  },
  {
    question: "Quels délais prévoir ?",
    answer:
      "Entre 3 jours (événementiel express) et 2–4 semaines (motion design/IA). On cale une date ferme au devis.",
  },
  {
    question: "Et si on n’aime pas la première version ?",
    answer:
      "1 à 2 allers-retours sont inclus. On part d’un script validé pour éviter les surprises.",
  },
  {
    question: "Qui possède les droits ?",
    answer:
      "Vous disposez d’un droit d’usage illimité sur les livrables finaux, pour les canaux précisés au devis. Les rushs restent archivés 12 mois (option rachat possible).",
  },
  {
    question: "Pouvez-vous gérer la musique et les voix-off ?",
    answer:
      "Oui — musiques licenciées et comédiens voix-off sur demande (FR/EN).",
  },
  {
    question: "Vous travaillez partout ?",
    answer:
      "Basé·e à Paris, je me déplace en France/Europe. Frais de déplacement indiqués à l’avance.",
  },
];

const testimonials = [
  {
    quote: "\"+38 % d’inscriptions au webinar — on a enfin un film clair.\"",
    author: "Lina, Marketing",
  },
  {
    quote: "\"Aftermovie livré en 72h, parfait pour relancer les ventes early-bird.\"",
    author: "Romain, Event manager",
  },
  {
    quote: "\"Notre annonce immo a pris 2 offres en 3 jours.\"",
    author: "Sophie, Agence immo",
  },
];

const Services = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.18), transparent 55%), radial-gradient(circle at 80% 65%, rgba(236, 72, 153, 0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-28">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_30px_120px_rgba(56,189,248,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-cyan-200/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                Services 2025 · Videaste freelance
              </span>
              <h1 className="text-5xl font-black leading-tight">
                Des vidéos qui servent vos objectifs — pas seulement l’esthétique
              </h1>
              <p className="text-lg text-slate-200/80">
                De l’idée au livrable prêt à publier, je produis des vidéos efficaces pour l’entreprise, l’événementiel, l’immobilier, les réseaux sociaux, le mariage et le motion design/IA.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/30"
                >
                  Demander un devis
                </Link>
                <Link
                  to="/realisations"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                >
                  Voir des réalisations
                </Link>
              </div>
            </div>
            <div className="grid gap-4 text-sm text-slate-200/70">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Stack créative 2025</p>
                <p className="mt-2 leading-relaxed">
                  Sony Burano 8K · FX6 Duo · DaVinci Resolve Neural · Runway Gen-3 · ElevenLabs Dubbing · Notion AI Ops.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Assurance résultat</p>
                <p className="mt-2 leading-relaxed">
                  KPI fixés avant tournage, suivi post-publication 30 jours et plan d’optimisation inclus.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-16 space-y-12">
          <div className="flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_25px_100px_rgba(236,72,153,0.18)] lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold">Pourquoi travailler ensemble</h2>
              <p className="text-slate-200/70">
                Verbes d’action, suivi mesurable, livrables sans surprise : chaque projet est pensé pour votre audience et vos canaux.
              </p>
            </div>
            <dl className="grid gap-6 text-sm text-slate-200/80 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Clarté</dt>
                <dd className="mt-3 text-base text-white">
                  Un process carré, des livrables précis, pas de surprises.
                </dd>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Efficacité</dt>
                <dd className="mt-3 text-base text-white">
                  Formats adaptés à vos canaux (16:9 / 9:16), sous-titres inclus.
                </dd>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <dt className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Impact mesurable</dt>
                <dd className="mt-3 text-base text-white">
                  Pensés pour le clic, le lead ou la candidature — pas juste « beau ».
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Les 6 services</h2>
            <p className="mt-3 max-w-3xl text-slate-200/70">
              Chaque carte résume l’angle, les livrables, les délais et la preuve sociale. Pour aller plus loin, consultez la fiche service dédiée.
            </p>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.slug}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/40 to-slate-900/70 p-8 shadow-[0_20px_90px_rgba(59,130,246,0.22)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <span className="pointer-events-none absolute inset-0 translate-x-[-60%] bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100" />
                  <div className="relative space-y-6">
                    <header className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{service.title}</p>
                      <h3 className="text-2xl font-semibold text-white">{service.hook}</h3>
                    </header>
                    <ul className="space-y-2 text-sm text-slate-200/80">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/70">
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">{service.timeline}</span>
                      <span className="rounded-full border border-cyan-200/30 bg-cyan-500/20 px-4 py-2 text-cyan-100/90">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-100/80">{service.proof}</p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                    >
                      {service.cta}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">Comment ça se passe</h2>
          <p className="mt-3 max-w-3xl text-slate-200/70">
            Un process clair, cinq étapes. Vous gardez tous les exports finaux et l’accès aux fichiers pendant 12 mois.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(14,165,233,0.2)]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Étape 0{index + 1}</p>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-200/80">{step.description}</p>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.2)]">
            <h2 className="text-3xl font-bold">Packs & options</h2>
            <p className="mt-3 max-w-3xl text-slate-200/70">
              Essentiel, Pro ou Full : choisissez la couverture qui correspond à votre enjeu. Chaque devis liste clairement ce qui est inclus, les délais et les conditions d’utilisation musique.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {packs.map((pack) => (
                <div key={pack.name} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                  <h3 className="text-xl font-semibold text-white">{pack.name}</h3>
                  <p className="mt-2 text-sm text-slate-200/80">{pack.description}</p>
                  <p className="mt-4 text-sm font-semibold text-cyan-100/90">{pack.price}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_20px_100px_rgba(59,130,246,0.2)]">
            <h3 className="text-2xl font-semibold text-white">Options utiles</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-200/80">
              {options.map((option) => (
                <li key={option} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Chaque devis précise délais, usages musicaux et conditions de diffusion.
            </p>
          </aside>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_15px_70px_rgba(14,165,233,0.18)]"
              >
                <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-white">
                  <span>{faq.question}</span>
                  <span className="text-cyan-200 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold">Témoignages</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.author} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_90px_rgba(236,72,153,0.18)]">
                <blockquote className="text-sm text-slate-200/80">{testimonial.quote}</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan-200/70">{testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900/80 to-fuchsia-500/10 p-12 shadow-[0_30px_150px_rgba(59,130,246,0.35)]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black leading-snug">Prêt·e à lancer votre vidéo ?</h2>
              <p className="text-lg text-slate-100/90">
                Expliquez votre besoin en 2 minutes — je reviens vers vous sous 24h ouvrées.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                >
                  Demander un devis
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-cyan-200/40 bg-cyan-500/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/40"
                >
                  Réserver un appel de 30 min
                </Link>
              </div>
              <p className="text-sm text-slate-100/70">Aucun engagement. Réponse claire, budget et délais.</p>
            </div>
            <form className="space-y-5 rounded-[2.5rem] border border-white/20 bg-white/10 p-6 text-sm text-slate-100/80 backdrop-blur">
              <div className="space-y-2">
                <label htmlFor="objectif" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quel type de vidéo souhaitez-vous ?
                </label>
                <select
                  id="objectif"
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez une option
                  </option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                  <option value="autre">Autre besoin vidéo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="budget" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quel ordre de budget ? (une fourchette suffit)
                </label>
                <input
                  id="budget"
                  type="text"
                  placeholder="Ex. 1 500 – 2 500 €"
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Quelques lignes sur le contexte
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Aide : cible, diffusion, échéance..."
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-200/70">Aide message : Quelques lignes sur le contexte, la cible, la diffusion.</p>
              </div>
              <label className="flex items-start gap-3 text-xs text-slate-200/80">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border border-white/30 bg-slate-950/60" />
                <span>Je consens à être recontacté·e (pas de spam).</span>
              </label>
              <button
                type="submit"
                className="w-full rounded-full border border-cyan-200/40 bg-cyan-500/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-cyan-500/40"
              >
                Envoyer la demande
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
