const excerptMap = {
  entreprise: "Film manifeste + preuves sociales prêtes pour vos RDV commerciaux",
  evenementiel: "Aftermovie J+3 et capsules verticales pour sponsors & réseaux",
  immobilier: "Visite 4K HDR + version verticale optimisée annonces premium",
  "reseaux-sociaux": "Séries mensuelles 9:16 montées avec scripts et sous-titres",
  mariage: "Film cinématique + bande-annonce émotions fortes 72 h",
  "motion-design-ia": "Motion narratif mêlant design & IA générative pour expliquer",
} as const;

export const CATEGORIES = [
  { label: "Entreprise", slug: "entreprise" },
  { label: "Événementiel", slug: "evenementiel" },
  { label: "Immobilier", slug: "immobilier" },
  { label: "Réseaux sociaux", slug: "reseaux-sociaux" },
  { label: "Mariage", slug: "mariage" },
  { label: "Motion design / IA", slug: "motion-design-ia" },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export const MAIN_NAV = [
  { label: "Accueil", href: "/" },
  {
    label: "Réalisations",
    href: "/realisations",
    children: CATEGORIES.map((category) => ({
      label: category.label,
      href: `/realisations/${category.slug}`,
    })),
  },
  {
    label: "Services & Tarifs",
    href: "/services",
    mega: CATEGORIES.map((category) => ({
      label: category.label,
      href: `/services/${category.slug}`,
      excerpt: excerptMap[category.slug as keyof typeof excerptMap],
    })),
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Conseils", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const CTA = { label: "Connexion", href: "/connexion" } as const;

