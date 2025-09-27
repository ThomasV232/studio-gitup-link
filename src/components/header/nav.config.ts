const excerptMap = {
  entreprise: "Film manifeste + preuves sociales prêtes pour vos RDV commerciaux",
  evenementiel: "Aftermovie J+3 et capsules verticales pour sponsors & réseaux",
  immobilier: "Visite 4K HDR + version verticale optimisée annonces premium",
  mariage: "Film cinématique + bande-annonce émotions fortes 72 h",
} as const;

export const CATEGORIES = [
  { label: "Entreprise", slug: "entreprise" },
  { label: "Événementiel", slug: "evenementiel" },
  { label: "Immobilier", slug: "immobilier" },
  { label: "Mariage", slug: "mariage" },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export const MAIN_NAV = [
  {
    label: "Réalisations",
    href: "/portfolio",
    children: CATEGORIES.map((category) => ({
      label: category.label,
      href: `/portfolio/${category.slug}`,
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
