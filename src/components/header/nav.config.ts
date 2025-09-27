const excerptMap = {
  entreprise: "Films de marque, interviews et témoignages cadrés conversion",
  evenementiel: "Aftermovies dynamiques, teasers J-3 et captations conférences",
  immobilier: "Visites 4K lumineuses, plans drone & bandeaux infos",
  mariage: "Récits ciné lumineux + teaser vertical livré sous 72 h",
  "reseaux-sociaux": "Capsules verticales, formats ads et séries éditoriales",
  "motion-ia": "Expériences hybrides : motion design, IA générative, volumétrique",
} as const;

export const CATEGORIES = [
  { label: "Entreprise", slug: "entreprise" },
  { label: "Événementiel", slug: "evenementiel" },
  { label: "Immobilier", slug: "immobilier" },
  { label: "Mariage", slug: "mariage" },
  { label: "Réseaux sociaux", slug: "reseaux-sociaux" },
  { label: "Motion Design / IA", slug: "motion-ia" },
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

