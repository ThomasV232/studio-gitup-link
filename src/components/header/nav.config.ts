const excerptMap = {
  entreprise: "Films clairs pour convaincre (60–90s + déclinaisons)",
  evenementiel: "Aftermovie + capsules verticales",
  immobilier: "Visites vidéo + version verticale",
  "reseaux-sociaux": "Lots mensuels 8–16 vidéos",
  mariage: "Film 5–8min + bande-annonce",
  "motion-design-ia": "Explications animées 45–90s",
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
    label: "Services",
    href: "/services",
    mega: CATEGORIES.map((category) => ({
      label: category.label,
      href: `/services/${category.slug}`,
      excerpt: excerptMap[category.slug as keyof typeof excerptMap],
    })),
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
] as const;

export const CTA = { label: "Demander un devis", href: "/contact" } as const;

export const ANNOUNCEMENT = {
  message: "Septembre 2025 : 2 créneaux tournage restants",
  linkLabel: "Bloquer un créneau",
  href: "/contact",
  dismissible: true,
} as const;

export const TRUST_BADGES = [
  { label: "Clients 2025", value: "Helia · Nova · Urbania" },
  { label: "Zone", value: "Paris · France / Europe" },
  { label: "Assurances", value: "RC Pro + drone DGAC" },
  { label: "Délais", value: "72h – 4 semaines" },
] as const;
