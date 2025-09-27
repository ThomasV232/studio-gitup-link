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
  /** Unified steps used across the app (replaces `process`/`workflow`) */
  phases: { title: string; description: string }[];
  deliverables: string[];
  options?: string[];
  pricing: { name: string; price: string; description: string }[];
  ctaLabel: string;
  ctaSubcopy: string;
  faqs: { question: string; answer: string }[];
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
    phases: [
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
        price: "950–1 400 € HT",
        description: "1/2 journée, 1 interview, film 45–60 s",
      },
      {
        name: "Pack Pro",
        price: "1 800–2 600 € HT",
        description: "1 journée, 2–3 interviews, film 60–90 s + 2 capsules",
      },
      {
        name: "Sur-mesure",
        price: "Devis rapide",
        description: "Adapté au scénario, aux lieux et options",
      },
    ],
    ctaLabel: "Parler de votre projet",
    ctaSubcopy: "Devis en 24 h, simple et sans jargon.",
    faqs: [
      {
        question: "Peut-on tourner dans nos locaux ?",
        answer:
          "Oui, le matériel lumière/son est compact et s’adapte à vos espaces (open-space, salle de réunion, atelier).",
      },
      {
        question: "Aidez-vous à écrire ?",
        answer:
          "Oui, le script et les questions d’interview sont inclus pour cadrer le message et fluidifier le tournage.",
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
    startingPrice: "À partir de 1 500 € HT",
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
    phases: [
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
        price: "1 200–1 600 € HT",
        description: "1 caméra, 1 journée, aftermovie 60–90 s",
      },
      {
        name: "Pack Plus",
        price: "2 200–3 200 € HT",
        description: "2 caméras, interviews, aftermovie 90–120 s + 3 clips",
      },
      {
        name: "Captation conférence",
        price: "Sur devis",
        description: "Multi-cam + son régie, slides, micro-cravates",
      },
    ],
    ctaLabel: "Planifier la captation",
    ctaSubcopy: "Verrouillez la date, devis en 24 h.",
    faqs: [
      {
        question: "Pouvez-vous livrer pendant l’événement ?",
        answer:
          "Oui, une option montage express permet de publier des stories ou clips J+1/J+2 (selon le flux et les accès).",
      },
      {
        question: "Couvrez-vous des interviews participants/speakers ?",
        answer:
          "Oui, micro dédié et cadre rapide pour capter des retours à chaud intégrables dans l’aftermovie.",
      },
    ],
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
      { title: "Visite Premium", description: "Tournage 2–3 h, montage 60–90 s + plan de quartier" },
      { title: "Option Drone", description: "+150–250 € HT selon zone" },
    ],
    phases: [
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
        name: "Option Drone",
        price: "+150–250 € HT",
        description: "Selon zone et autorisations",
      },
    ],
    ctaLabel: "Mettre votre bien en valeur",
    ctaSubcopy: "Créneau sous 72 h possible.",
    faqs: [
      {
        question: "Fournissez-vous une check-list avant le tournage ?",
        answer:
          "Oui, rangement/lumière/accessoirisation : une check-list vous est envoyée dès la confirmation.",
      },
      {
        question: "Pouvez-vous filmer un bien occupé ?",
        answer:
          "Oui, le tournage est discret et respectueux des occupants. Nous convenons d’un créneau adapté.",
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
    startingPrice: "À partir de 1 600 € TTC",
    benefits: [
      "Style documentaire ciné, couleurs douces",
      "Prise de son des vœux & discours",
      "Montage rythmé par votre énergie",
    ],
    formats: [
      { title: "Formule Cœur", description: "Préparatifs → ouverture de bal, film 4–6 min" },
      { title: "Formule Signature", description: "Préparatifs → 1 h du matin, film 6–8 min + teaser 60–90 s" },
      { title: "Options", description: "Second shooter, drone, discours intégral, livraison express, clé USB souvenir" },
    ],
    phases: [
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
        price: "1 600–2 600 € TTC",
        description: "10–12 h de présence, film 4–6 min",
      },
      {
        name: "Formule Signature",
        price: "2 200–2 800 € TTC",
        description: "Préparatifs → 1 h du matin, film 6–8 min + teaser",
      },
      {
        name: "Options",
        price: "Sur mesure",
        description: "Second shooter, drone, discours intégral, clé USB souvenir",
      },
    ],
    ctaLabel: "Vérifier ma disponibilité",
    ctaSubcopy: "Réponse sous 24 h, acompte pour bloquer la date.",
    faqs: [
      {
        question: "Peut-on personnaliser la bande-son ?",
        answer:
          "Oui, nous choisissons ensemble une musique sous licence qui correspond à votre ambiance.",
      },
      {
        question: "Proposez-vous des livraisons express ?",
        answer:
          "Oui, une option express permet de recevoir un teaser sous 72 h après le mariage.",
      },
    ],
  },
  {
    slug: "reseaux-sociaux",
    name: "Vidéos réseaux sociaux",
    title: "Capsules social-first — verticales, ads et séries éditoriales",
    subtitle:
      "Du snack content aux campagnes ads, je produis des séries verticales pensées pour TikTok, Instagram, YouTube Shorts et LinkedIn avec un mix tournage + IA générative.",
    description: "Capsules verticales, ads UGC, séries éditoriales.",
    timeline: "Livraison 3 à 5 jours ouvrés après tournage",
    startingPrice: "À partir de 650 € HT",
    benefits: [
      "Formats nativement pensés vertical/son-off",
      "Calendrier éditorial & scripts optimisés conversion",
      "Optimisation multi-plateformes + variations IA",
    ],
    formats: [
      { title: "Capsules 15–30 s", description: "Pitch produit, tips, tutoriels punchy" },
      { title: "Série éditoriale", description: "3 à 6 épisodes pour installer une rubrique" },
      { title: "Ads UGC hybrides", description: "Tournage + IA pour déclinaisons ciblées" },
      { title: "Live recap vertical", description: "Moments forts montés en 24 h" },
    ],
    phases: [
      { title: "Atelier éditorial", description: "Hooks, messages, calendrier" },
      { title: "Pré-prod agile", description: "Scripts, moodboard, templates" },
      { title: "Tournage batch", description: "1 à 2 journées, multi-sets" },
      { title: "Montage & déclinaisons", description: "Motion dynamique, variations IA" },
      { title: "Livraison & planif", description: "Exports optimisés + kit diffusion" },
    ],
    deliverables: [
      "Capsules verticales 9:16 + versions carrées",
      "Sous-titres dynamiques + fichiers .srt",
      "Miniatures optimisées",
    ],
    options: ["Pack templates Canva/After Effects", "Voix-off IA multilingue", "Pilotage Ads + reporting"],
    pricing: [
      {
        name: "Pack Starter",
        price: "750–1 050 € HT",
        description: "1 journée tournage batch, 4 capsules montées + déclinaison IA",
      },
      {
        name: "Pack Pro",
        price: "1 400–1 900 € HT",
        description: "2 jours (studio + terrain), 8 capsules + 2 ads UGC",
      },
      {
        name: "Sur Demande",
        price: "Sur devis",
        description: "Calendrier mensuel 12+ vidéos, automatisations IA & reporting",
      },
    ],
    ctaLabel: "Doper vos réseaux",
    ctaSubcopy: "On cale les hooks et la diffusion en moins de 48 h.",
    faqs: [
      {
        question: "Gérez-vous les sous-titres dynamiques ?",
        answer:
          "Oui, sous-titres brandés inclus + fichiers .srt. Versions son-off/son-on selon plateforme.",
      },
      {
        question: "Proposez-vous des variantes IA ?",
        answer:
          "Oui, variations d’accroches, de visuels et de langues sous supervision créative.",
      },
    ],
  },
  {
    slug: "motion-ia",
    name: "Motion Design / IA",
    title: "Motion design & IA — expériences hybrides, volumétriques et génératives",
    subtitle:
      "Associez motion design premium, 3D légère et IA générative (Runway, Sora, ElevenLabs) pour produire des contenus futuristes, pédagogiques ou immersifs.",
    description: "Motion design, IA générative, expériences volumétriques.",
    timeline: "Planning 4 à 6 semaines selon complexité",
    startingPrice: "À partir de 1 800 € HT",
    benefits: [
      "Narration pédagogique + direction artistique futuriste",
      "Assets IA générés sous supervision créative",
      "Livrables multi-formats (16:9, 1:1, 9:16, volumétrique)",
    ],
    formats: [
      { title: "Reveal produit", description: "Teaser motion + effets génératifs" },
      { title: "Explainer animé", description: "Storyboard, illustrations, voice-over IA" },
      { title: "Boucles volumétriques", description: "Objets 3D / NeRF animés pour stands & AR" },
      { title: "Pack lancement", description: "Manifesto + déclinaisons social + gifs" },
    ],
    phases: [
      { title: "Discovery & script", description: "Objectifs, message clé, moodboard" },
      { title: "Storyboard & design", description: "Styleframes, charte motion, prompts IA" },
      { title: "Production hybride", description: "Animation, tournage éléments, IA supervisée" },
      { title: "Post-production", description: "Compositing, sound design, QA" },
      { title: "Livraison & déclinaisons", description: "Exports multi-formats + kit templates" },
    ],
    deliverables: [
      "Vidéo principale (4K/1080p)",
      "Déclinaisons verticales + boucles sociales",
      "Pack assets (illustrations, sous-titres, templates)",
    ],
    options: ["Voix-off native + IA", "Pack AR/WebGL", "Localisations multilingues"],
    pricing: [
      {
        name: "Sprint Motion",
        price: "1 800–2 400 € HT",
        description: "Séquence 16:9 + déclinaison verticale (≈1 semaine)",
      },
      {
        name: "Explainer",
        price: "3 500–6 500 € HT",
        description: "Script, storyboard, animation 60–90 s + sound design",
      },
      {
        name: "Campagne Hybride",
        price: "Sur devis",
        description: "Manifesto, déclinaisons social, volumétrique/AR, localisations",
      },
    ],
    ctaLabel: "Imaginer un format hybride",
    ctaSubcopy: "Workshop créatif offert pour cadrer le concept.",
    faqs: [
      {
        question: "Quid des licences pour assets IA ?",
        answer:
          "Nous vérifions l’usage (commercial/web/events) et documentons les prompts, sources et licences des éléments utilisés.",
      },
      {
        question: "Pouvez-vous fournir les sources ?",
        answer:
          "Oui, remise possible (AE/Blender/Projets), avec guide d’utilisation et organisation des calques.",
      },
    ],
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
