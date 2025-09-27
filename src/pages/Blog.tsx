import { Link } from "react-router-dom";

import { BrandMark } from "@/components/branding/BrandMark";
import PageShell from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
    <PageShell
      gradientStyle={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 82% 22%, rgba(236,72,153,0.16), transparent 60%), linear-gradient(155deg, rgba(15,23,42,0.95), rgba(15,23,42,0.74))",
      }}
      contentClassName="pb-24"
    >
      <div className="page-container">
        <header className="space-y-8">
          <BrandMark dual className="max-w-xs" />
          <SectionHeading
            eyebrow="Conseils 2025 · Budgets · Process"
            title="Ressources pour piloter vos projets vidéo avec sérénité"
            description="Les articles et FAQ ci-dessous vous donnent une vision claire des budgets, des délais et des points de vigilance pour chaque catégorie. Objectif : vous aider à choisir le bon format, au bon prix, au bon moment."
          />
        </header>

        <section className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="surface-card group relative flex h-full flex-col gap-5 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(56,189,248,0.18)]"
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

        <section className="surface-panel space-y-6 p-8 sm:p-10">
          <SectionHeading
            eyebrow="FAQ budgétaire"
            title="Toutes les réponses budget, droits et livrables"
            description="Ces questions reviennent le plus souvent pendant la préparation de devis. N'hésitez pas à les partager en interne pour accélérer vos validations."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question} className="surface-card p-6">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm text-white/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-panel space-y-6 p-8 sm:p-10">
          <SectionHeading
            eyebrow="Contact & Devis"
            title="Besoin d'un plan d'action précis ?"
            description="Expliquez vos enjeux, vos délais et les formats attendus : nous vous répondons sous 24 h avec une estimation claire, un rétroplanning et des idées de diffusion."
          />
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
    </PageShell>
  );
};

export default Blog;
