import { Link } from "react-router-dom";

import { CATEGORIES } from "@/components/header/nav.config";

const articles = [
  {
    title: "Droits musicaux 2025 : comment sécuriser vos licences pour le digital",
    slug: "droits-musicaux-video",
    excerpt:
      "Tour d'horizon des licences synchronisation, des catalogues libres de droits et des coûts à prévoir selon vos canaux.",
    readTime: "6 min",
    date: "Sept. 2025",
    tags: ["Budgets", "Juridique"],
  },
  {
    title: "Révisions incluses : les bonnes pratiques pour cadrer vos allers-retours",
    slug: "revisions-video",
    excerpt:
      "Combien d'itérations prévoir, comment valider un script efficace et quelles clauses ajouter pour rester serein.",
    readTime: "4 min",
    date: "Août 2025",
    tags: ["Process", "Collaboration"],
  },
  {
    title: "Délais de production : nos repères catégorie par catégorie",
    slug: "delais-production-video",
    excerpt:
      "Découvrez les plannings types pour l'entreprise, l'événementiel, l'immobilier, les réseaux sociaux et le mariage.",
    readTime: "5 min",
    date: "Juil. 2025",
    tags: ["Planning"],
  },
];

const faq = [
  {
    question: "Comment fonctionnent les droits musicaux ?",
    answer:
      "Nous travaillons avec des catalogues premium (Artlist, Tracklib Pro, Universal Production). Chaque devis précise la portée des licences (territoires, durées, plateformes). Pour des campagnes payantes, prévoyez 150–450 € HT par morceau.",
  },
  {
    question: "Combien de révisions sont incluses ?",
    answer:
      "Deux vagues d'ajustements sont comprises pour chaque livrable. Une validation scénario + moodboard en amont limite les surprises. Des itérations supplémentaires sont facturées au temps passé, après accord écrit.",
  },
  {
    question: "Quels délais prévoir selon le type de vidéo ?",
    answer:
      "Entreprise : 10–15 j ouvrés. Événementiel : aftermovie J+3, pack complet J+7. Immobilier : 48–72 h. Réseaux sociaux : calendrier mensuel. Mariage : film long en 21 j. Motion design / IA : 3–5 semaines selon complexité.",
  },
  {
    question: "Que couvrent les livrables ?",
    answer:
      "Chaque pack inclut exports optimisés (16:9 et 9:16), sous-titres, miniatures, ainsi qu'un dossier de diffusion avec recommandations par canal. Les rushs sont archivés 12 mois avec option d'extension.",
  },
];

const Blog = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 82% 22%, rgba(236,72,153,0.16), transparent 60%), linear-gradient(155deg, rgba(15,23,42,0.95), rgba(15,23,42,0.74))",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-10">
        <header className="space-y-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70">
            Conseils 2025 · Budgets · Process
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Ressources pour piloter vos projets vidéo avec sérénité
            </h1>
            <p className="max-w-3xl text-base text-white/70">
              Les articles et FAQ ci-dessous vous donnent une vision claire des budgets, des délais et des points de vigilance pour chaque catégorie. Objectif : vous aider à choisir le bon format, au bon prix, au bon moment.
            </p>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex h-full flex-col gap-5 rounded-[2.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold leading-snug">
                <Link to={`/blog/${article.slug}`} className="transition group-hover:text-white">
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm leading-relaxed text-white/70">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${article.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200"
              >
                Lire l'article
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </section>

        <section className="space-y-6 rounded-[3.5rem] border border-white/10 bg-white/5 p-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">FAQ budgétaire</p>
            <h2 className="text-3xl font-bold">Toutes les réponses budget, droits et livrables</h2>
            <p className="max-w-3xl text-sm text-white/70">
              Ces questions reviennent le plus souvent pendant la préparation de devis. N'hésitez pas à les partager en interne pour accélérer vos validations.
            </p>
          </header>
          <div className="grid gap-6 lg:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question} className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm text-white/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-[3rem] border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 p-10 backdrop-blur-2xl">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Contact & Devis</p>
            <h2 className="text-3xl font-bold leading-tight">
              Besoin d'un plan d'action précis ?
            </h2>
            <p className="max-w-2xl text-sm text-white/75">
              Expliquez vos enjeux, vos délais et les formats attendus : nous vous répondons sous 24 h avec une estimation claire, un rétroplanning et des idées de diffusion.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
            >
              Ouvrir le formulaire de devis
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
            >
              Voir Services & Tarifs
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
            {CATEGORIES.map((category) => (
              <span key={category.slug} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                {category.label}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
