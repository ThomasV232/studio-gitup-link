export type ServiceDetail = {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  startingPrice: string;
  benefits: string[];
  formats: { title: string; description: string }[];
  workflow: {
    preprod: string[];
    production: string[];
    postprod: string[];
    delivery: string[];
  };
  process: { title: string; description: string }[];
  deliverables: string[];
  options?: string[];
  pricing: { name: string; price: string; description: string }[];
  ctaLabel: string;
  ctaSubcopy: string;
  miniFaq?: { question: string; answer: string }[];
  faqs?: { question: string; answer: string }[];
};

export const servicesData: ServiceDetail[] = [
  {
    slug: "entreprise",
    name: "Vidéo d’entreprise",
    title: "Vidéo d’entreprise — film de marque, interviews et témoignages",
    subtitle:
      "Humanisez votre communication et clarifiez votre offre avec des vidéos brèves, percutantes et crédibles. Idéal pour pages d’accueil, campagnes Social Ads, recrutement et onboarding.",
    description: "Film de marque, interviews, recrutement, témoignages clients.",
    timeline: "Livraison 5 à 10 jours ouvrés après tournage",
    startingPrice: "À partir de 950 € HT",
    benefits: [
      "Crédibilité immédiate grâce aux interviews & cas clients",
      "Efficacité : scripts courts, message mémorisable, CTA clair",
      "Polyvalence : versions horizontales/verticales pour site, LinkedIn, Instagram",
    ],
    formats: [
      { title: "Film de marque (60–90 s)", description: "Manifeste vidéo + images métier" },
      { title: "Interview(s) / Portrait(s)", description: "Dirigeant·e, collaborateurs, clients" },
      { title: "Témoignage client", description: "Histoire, problème, solution, résultat" },
      { title: "Capsules social (15–30 s)", description: "Messages ciblés pour campagnes" },
    ],
    workflow: {
      preprod: [
        "Brief & objectifs alignés (positionnement, audience, KPI)",
        "Script + questions d’interview validés avec vos équipes",
      ],
      production: [
        "Tournage 1/2 à 1 journée : interviews, plans d’illustration, ambiance",
        "Son & lumière pro, prompteur si nécessaire",
      ],
      postprod: [
        "Montage narratif sous 5–7 jours, habillage et mixage inclus",
        "Sous-titres brandés et motion design léger pour clarifier l’offre",
      ],
      delivery: [
        "Master 4K + déclinaisons 1080p",
        "Capsules verticales optionnelles pour LinkedIn, Instagram, TikTok",
      ],
    },
    process: [
      { title: "Brief & objectifs", description: "Positionnement, audience, KPI" },
      { title: "Script & feuille de route", description: "Plan d’images, questions d’interview" },
      { title: "Tournage (1/2 à 1 journée)", description: "Son et lumière pro, prompteur si nécessaire" },
      { title: "Montage", description: "1ère version sous 5–7 jours" },
      { title: "Allers-retours", description: "2 séries d’ajustements incluses" },
    ],
    deliverables: [
      "1 master en 4K + déclinaisons 1080p",
      "Sous-titres (.srt) + version incrustée",
      "Couverture miniature optimisée (YouTube/LinkedIn)",
    ],
    options: ["Drone (selon zone)", "Motion design léger", "Voix-off", "Sound design", "Photos making-of"],
    pricing: [
      {
        name: "Pack Essentiel",
        price: "950–1 400 € HT",
        description: "1/2 journée, 1 interview, film 45–60 s",
      },
      {
        name: "Pack Pro",
        price: "1 800–2 600 € HT",
        description: "1 journée, 2–3 interviews, film 60–90 s + 2 capsules",
      },
      {
        name: "Pack Sur Demande",
        price: "Sur devis rapide",
        description: "Déploiement multi-sites, motion avancé, voix-off premium",
      },
    ],
    ctaLabel: "Parler de votre projet",
    ctaSubcopy: "Devis en 24 h, simple et sans jargon.",
    miniFaq: [
      {
        question: "Peut-on tourner dans vos locaux ?",
        answer: "Oui, j’apporte lumière et son compacts pour valoriser vos espaces sans les bloquer.",
      },
      {
        question: "Aidez-vous à écrire ?",
        answer: "Oui, script, questions d’interview et feuille de route sont inclus.",
      },
    ],
  },
  {
    slug: "evenementiel",
    name: "Vidéos événementielles",
    title: "Aftermovie & captation — mettez votre événement en valeur",
    subtitle:
      "Du teaser d’avant à l’aftermovie qui prolonge l’émotion, je capture l’énergie de votre événement et vos messages clés (conférences, salons, séminaires, concerts, lancements).",
    description: "Aftermovie, teaser, captation conférences & salons.",
    timeline: "Livraison standard J+5 (option express J+2)",
    startingPrice: "À partir de 1 500 € HT",
    benefits: [
      "Réactivité terrain : équipe légère, discrète, multi-cam possible",
      "Storytelling : rythme + sound design pour un rendu dynamique",
      "Livraison rapide pour vos remerciements et réseaux sociaux",
    ],
    formats: [
      { title: "Teaser 20–40 s", description: "Pour annoncer l’événement" },
      { title: "Aftermovie 60–120 s", description: "Résumé émotion + messages clés" },
      { title: "Captation Talks", description: "Multi-cam possible" },
      { title: "Clips réseaux", description: "Verticals 10–20 s" },
    ],
    workflow: {
      preprod: [
        "Repérage et cadrage des moments clés + interviews",
        "Storyboard express & planning logistique avec vos équipes",
      ],
      production: [
        "Couverture terrain en équipe légère (1 à 2 caméras + drone le cas échéant)",
        "Interviews participants/speakers, captation son dédiée",
      ],
      postprod: [
        "Montage express possible (J+2/J+3) avec sound design immersif",
        "Habillage graphique sponsor / branding événement",
      ],
      delivery: [
        "Aftermovie 4K + versions verticales, miniatures personnalisées",
        "Clips réseaux optimisés + exports streaming",
      ],
    },
    process: [
      { title: "Repérage", description: "Analyse des flux et des moments forts" },
      { title: "Planning", description: "Coordination avec vos équipes" },
      { title: "Tournage (1 à 2 caméras)", description: "Couverture terrain + interviews" },
      { title: "Montage express possible", description: "J+2 / J+3 selon options" },
      { title: "Livraison", description: "Exports aftermovie + clips" },
    ],
    deliverables: [
      "Master 4K/1080p",
      "Versions verticales",
      "Sous-titres",
      "Miniature optimisée",
      "Export J+5 (option express J+2)",
    ],
    pricing: [
      {
        name: "Pack Starter",
        price: "1 200–1 600 € HT",
        description: "1 caméra, 1 journée, aftermovie 60–90 s",
      },
      {
        name: "Pack Plus",
        price: "2 200–3 200 € HT",
        description: "2 caméras, interviews, aftermovie 90–120 s + 3 clips",
      },
      {
        name: "Captation conférence",
        price: "Sur devis",
        description: "Multi-cam + son régie, diffusion live possible",
      },
    ],
    ctaLabel: "Planifier la captation",
    ctaSubcopy: "Verrouillez la date, devis en 24 h.",
  },
  {
    slug: "immobilier",
    name: "Vidéo immobilière",
    title: "Visites vidéo & drone — valorisez vos biens, vendez plus vite",
    subtitle:
      "Des vidéos lumineuses et rythmées qui révèlent volumes, circulation et atouts du quartier. Parfait pour annonces premium, réseaux, landing pages et emailing.",
    description: "Biens résidentiels & pros, visites filmées + drone.",
    timeline: "Créneau sous 72 h, livraison 48–72 h après tournage",
    startingPrice: "À partir de 450 € HT",
    benefits: [
      "Clarté : parcours fluide, cadrages stables, exposition maîtrisée",
      "Gain de temps : moins de visites inutiles, meilleure qualification",
      "Drone (selon réglementation) pour vues d’ensemble & environnements",
    ],
    formats: [
      { title: "Visite Essentielle", description: "Tournage 1–2 h, montage 45–60 s" },
      { title: "Visite Premium", description: "Tournage 2–3 h, montage 60–90 s + plan de quartier + 5 photos" },
      { title: "Option Drone", description: "+150–250 € HT selon zone et autorisations" },
    ],
    workflow: {
      preprod: [
        "Brief & check-list pour préparer le bien (rangement, lumières, détails)",
        "Repérage rapide + validation autorisations drone le cas échéant",
      ],
      production: [
        "Tournage stabilisé 4K + plans slider, drone selon zone",
        "Prises de vues complémentaires (quartier, équipements, vues extérieures)",
      ],
      postprod: [
        "Montage rythmique, bandeau infos (surface, pièces, atouts)",
        "Étalonnage lumineux + musique sous licence",
      ],
      delivery: [
        "Vidéo 4K + version verticale 9:16",
        "Miniature et pack visuels pour portail immo et réseaux",
      ],
    },
    process: [
      { title: "Brief & check-list", description: "Arguments clés et préparation du bien" },
      { title: "Repérage & planning", description: "Créneau lumière idéal" },
      { title: "Tournage 4K", description: "Plans stabilisés + drone si autorisé" },
      { title: "Montage", description: "Bandeau infos, musique sous licence" },
      { title: "Livraison multi-formats", description: "Version horizontale + verticale" },
    ],
    deliverables: [
      "1 vidéo 4K/1080p",
      "Version verticale 9:16",
      "Bandeau infos (surface, pièces, atouts)",
      "Musique sous licence",
    ],
    options: ["Drone", "5 photos HDR", "Plan de quartier"],
    pricing: [
      {
        name: "Visite Essentielle",
        price: "450–600 € HT",
        description: "Tournage 1–2 h, montage 45–60 s",
      },
      {
        name: "Visite Premium",
        price: "650–750 € HT",
        description: "Tournage 2–3 h, montage 60–90 s + plan de quartier + 5 photos",
      },
      {
        name: "Pack Sur Demande",
        price: "Sur devis",
        description: "Campagne multi-biens, voice-over, plans drone étendus",
      },
    ],
    ctaLabel: "Mettre votre bien en valeur",
    ctaSubcopy: "Créneau sous 72 h possible.",
    miniFaq: [
      {
        question: "Préparation du bien ?",
        answer: "Je fournis une check-list (rangement, lumières, détails) pour un rendu premium.",
      },
      {
        question: "Biens occupés ?",
        answer: "Oui, tournage discret et respectueux avec cadrage serré sur les atouts.",
      },
    ],
  },
  {
    slug: "mariage",
    name: "Film de mariage",
    title: "Film de mariage — un souvenir vivant, sobre et élégant",
    subtitle:
      "Je raconte votre journée avec discrétion : de vrais moments, des émotions sincères, une esthétique lumineuse et naturelle.",
    description: "Un film authentique, naturel et élégant de votre journée.",
    timeline: "1er montage sous 3–4 semaines",
    startingPrice: "À partir de 1 600 € TTC",
    benefits: [
      "Style documentaire ciné, couleurs douces",
      "Prise de son des vœux & discours",
      "Montage rythmé par votre énergie",
    ],
    formats: [
      { title: "Formule Cœur", description: "Préparatifs → ouverture de bal, film 4–6 min" },
      { title: "Formule Signature", description: "Préparatifs → 1 h du matin, film 6–8 min + teaser 60–90 s" },
      {
        title: "Options",
        description: "Second shooter, drone, discours intégral, livraison express, clé USB souvenir",
      },
    ],
    workflow: {
      preprod: [
        "Appel découverte pour raconter votre histoire",
        "Feuille de route avec moments clés, timings, playlists",
      ],
      production: [
        "Présence discrète préparatifs → soirée, captation multi-cam des discours",
        "Audio de secours et micros cravates pour vœux + cérémonies",
      ],
      postprod: [
        "Montage cinématique 4–6 min, étalonnage doux",
        "Sélection musique sous licence + teaser vertical",
      ],
      delivery: [
        "Film 4K + 1080p, teaser vertical",
        "Galerie privée protégée + clé USB optionnelle",
      ],
    },
    process: [
      { title: "Appel découverte", description: "On définit votre histoire et vos envies" },
      { title: "Feuille de route", description: "Organisation des moments clés" },
      { title: "Tournage discret", description: "Présence continue, captation son dédiée" },
      { title: "Montage émotion", description: "Sélection musique sous licence, narration sincère" },
      { title: "Livraison", description: "Film + teaser vertical, galerie privée" },
    ],
    deliverables: [
      "Film en 4K + 1080p",
      "Teaser vertical",
      "Bande-son sous licence",
      "Galerie privée en ligne",
    ],
    options: ["Second shooter", "Drone", "Discours intégral", "Livraison express", "Clé USB souvenir"],
    pricing: [
      {
        name: "Formule Cœur",
        price: "1 600–2 600 € TTC",
        description: "Préparatifs → ouverture de bal, film 4–6 min",
      },
      {
        name: "Formule Signature",
        price: "2 200–2 800 € TTC",
        description: "Préparatifs → 1 h du matin, film 6–8 min + teaser 60–90 s",
      },
      {
        name: "Pack Sur Demande",
        price: "Sur devis",
        description: "Destination wedding, second shooter, drone, livraison express",
      },
    ],
    ctaLabel: "Vérifier ma disponibilité",
    ctaSubcopy: "Réponse sous 24 h, acompte pour bloquer la date.",
  },
];

export const methodSteps = [
  { title: "Brief clair", description: "Objectifs, audience, style, canaux" },
  { title: "Préparation simple", description: "Script/plan de tournage, repérages, feuille de route" },
  { title: "Tournage léger", description: "Lumière & son pro, direction naturelle" },
  { title: "Montage soigné", description: "Rythme, musique/licences, étalonnage" },
  { title: "Livraison multi-formats", description: "Formats web, réseaux, sous-titres, corrections incluses" },
];

export const testimonials = [
  {
    quote: "Une vidéo qui a doublé notre taux de conversion sur la page d’accueil.",
    author: "Client Entreprise",
  },
  {
    quote: "Aftermovie livré en 72 h, parfait pour notre recap LinkedIn.",
    author: "Organisateur de salon",
  },
];
