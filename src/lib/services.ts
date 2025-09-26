export type ServiceDetail = {
  slug: string;
  title: string;
  subtitle: string;
  hook: string;
  problem: string;
  promise: string;
  stack: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string;
  proof: string;
  ctaLabel: string;
  phases: {
    title: string;
    description: string;
    aiUpgrade: string;
  }[];
  signatureMove: string;
  metrics: { label: string; value: string; note: string }[];
};

export const servicesData: ServiceDetail[] = [
  /* -------------------------------------------------- */
  /* 1) ENTREPRISE                                      */
  /* -------------------------------------------------- */
  {
    slug: "entreprise",
    title: "Vidéo d’entreprise — claire, crédible, utile",
    subtitle: "Expliquez mieux, recrutez plus, vendez sans forcer.",
    hook: "Expliquez, recrutez, vendez — avec des films clairs et crédibles.",
    problem:
      "Vous avez besoin d’un film qui clarifie votre proposition de valeur autant pour les prospects que pour les talents que vous ciblez.",
    promise:
      "Je construis un récit structuré autour de vos objectifs business, avec interviews guidées, preuves sociales et assets prêts à diffuser sur vos canaux clés.",
    stack: ["Sony Burano 8K", "DaVinci Resolve Neural 19", "Notion Storyboard AI", "Runway Gen-3 Alpha"],
    deliverables: [
      "Film principal 60–90 s (16:9)",
      "3 déclinaisons courtes 15–30 s (9:16 & 1:1)",
      "Pack sous-titres FR/EN + miniatures brandées",
    ],
    timeline: "10–15 jours ouvrés",
    startingPrice: "À partir de 1 900 € HT",
    proof: "+38 % d’inscriptions à un webinaire (cas client)",
    ctaLabel: "Découvrir le service Entreprise",
    phases: [
      {
        title: "Brief & objectifs",
        description: "Session de cadrage 30 min pour prioriser vos messages, audiences et KPI.",
        aiUpgrade: "Synthèse automatique des enjeux et moodboard instantané partagé à l’équipe.",
      },
      {
        title: "Scénario & planning",
        description: "Scripts interview, repérages, organisation plateau et validation direction.",
        aiUpgrade: "Storyboard génératif + checklist logistique intelligente.",
      },
      {
        title: "Tournage cinématique",
        description: "Interviews multicam, B-roll immersif, captation audio double système.",
        aiUpgrade: "Téléprompteur adaptatif et monitoring colorimétrique en direct.",
      },
      {
        title: "Montage & révisions",
        description: "Montage narratif, motion léger, habillage sonore, 2 allers-retours inclus.",
        aiUpgrade: "Suggestions de cuts par IA vérifiées humainement pour accélérer les itérations.",
      },
      {
        title: "Activation multicanale",
        description: "Exports LinkedIn, YouTube, intranet + scripts de diffusion prêts à publier.",
        aiUpgrade: "Assistant publication pour générer posts et thumbnails optimisés.",
      },
    ],
    signatureMove: "Teaser 45 s livré sous 72 h pour vos comités ou campagnes teasing.",
    metrics: [
      { label: "Preuve", value: "+38%", note: "d’inscriptions webinar (cas client 2025)" },
      { label: "Délais", value: "10–15 j", note: "ouvrés selon agenda tournage" },
      { label: "Itérations", value: "≤2", note: "grâce au script validé en amont" },
    ],
  },

  /* -------------------------------------------------- */
  /* 2) ÉVÉNEMENTIEL                                    */
  /* -------------------------------------------------- */
  {
    slug: "evenementiel",
    title: "Aftermovie & contenus événementiels — l’énergie qui reste",
    subtitle: "Faites revivre, vendez le prochain.",
    hook: "Faites revivre votre événement, et donnez envie de venir au prochain.",
    problem:
      "Vous devez capitaliser à chaud sur l’émotion des participants et fournir des preuves tangibles à vos sponsors.",
    promise:
      "Je capte l’événement avec une équipe mobile, monte en flux tendu et livre un aftermovie vibrant accompagné de capsules verticales prêtes à poster.",
    stack: ["Sony FX6 Duo", "DJI Inspire 3", "Veo Live Suite", "Suno Studio Max"],
    deliverables: ["Aftermovie 60–90 s", "5 capsules verticales 10–15 s", "Galerie photo optionnelle"],
    timeline: "J+3 à J+7",
    startingPrice: "À partir de 1 400 € HT",
    proof: "Taux de réinscription +24 %",
    ctaLabel: "Voir le service Événementiel",
    phases: [
      {
        title: "Brief & objectifs",
        description: "30 min pour valider messages sponsor, moments forts et KPIs post-event.",
        aiUpgrade: "Feuille de route dynamique + scénarisation des séquences à capturer.",
      },
      {
        title: "Scénario & planning",
        description: "Run de production, repérages et coordination avec vos équipes scène et sécurité.",
        aiUpgrade: "Alertes logistiques IA (météo, flux visiteurs) et gestion accréditations.",
      },
      {
        title: "Tournage terrain",
        description: "Multi-cam, micro-trottoirs, drone FPV indoor, captation audio immersive.",
        aiUpgrade: "Reconnaissance VIP + tagging automatique pour retrouver les moments clés.",
      },
      {
        title: "Montage & révisions",
        description: "Montage express, étalonnage, sous-titres multilingues, brand kit sponsors.",
        aiUpgrade: "Templates IA pour générer hooks et variations verticales en temps réel.",
      },
      {
        title: "Diffusion",
        description: "Exports prêts LinkedIn, Insta, YouTube + kit médias pour vos partenaires.",
        aiUpgrade: "Analyse performance 72 h avec recommandations de relance.",
      },
    ],
    signatureMove: "Aftermovie livré en J+3 maximum, stories verticales pendant l’événement.",
    metrics: [
      { label: "Preuve", value: "+24%", note: "de réinscriptions early-bird" },
      { label: "Délais", value: "J+3", note: "after movie complet" },
      { label: "Capsules", value: "5", note: "verticales prêtes à publier" },
    ],
  },

  /* -------------------------------------------------- */
  /* 3) IMMOBILIER                                      */
  /* -------------------------------------------------- */
  {
    slug: "immobilier",
    title: "Vidéo immobilière — déclencheur de visites",
    subtitle: "Valorisez volumes, lumière et quartier.",
    hook: "Vendez plus vite — mettez en valeur volumes, lumière et quartier.",
    problem:
      "Vos annonces doivent se démarquer instantanément pour générer des demandes qualifiées avant vos concurrents.",
    promise:
      "Je capture le bien en 4K HDR, révèle les points forts du quartier et livre une version verticale dédiée aux portails et réseaux sociaux.",
    stack: ["Sony A1", "DJI Avata 2", "Luma Rooms AI", "Lightroom 2025"],
    deliverables: ["Visite vidéo 60 s", "Version verticale 30 s", "Photos HDR & plan de coupe (option)"],
    timeline: "48–72 h après tournage",
    startingPrice: "À partir de 650 € HT",
    proof: "2 offres reçues en 72 h",
    ctaLabel: "Découvrir le service Immobilier",
    phases: [
      {
        title: "Brief & objectifs",
        description: "Identification des arguments clés, calendrier et ciblage acquéreurs.",
        aiUpgrade: "Analyse du marché local + benchmark express des annonces concurrentes.",
      },
      {
        title: "Scénario & planning",
        description: "Storyboard visite, planning tournage et check-list home staging.",
        aiUpgrade: "Simulation de lumière horaire pour choisir le meilleur créneau.",
      },
      {
        title: "Tournage sur site",
        description: "Plans gimbal, drone intérieur/extérieur, détails architecturaux.",
        aiUpgrade: "Stabilisation gyroscopique IA + correction de perspective en direct.",
      },
      {
        title: "Montage & révisions",
        description: "Montage rythmé, titrage quartiers, étalonnage neutre luxe.",
        aiUpgrade: "Suggestions de call-to-action et miniatures optimisées.",
      },
      {
        title: "Activation",
        description: "Exports portails, réseaux sociaux, emailing + kit visuels.",
        aiUpgrade: "Génération d’annonces texte prêtes à publier.",
      },
    ],
    signatureMove: "Version verticale ADS incluse pour booster vos campagnes Meta/Google.",
    metrics: [
      { label: "Preuve", value: "2 offres", note: "reçues en 72 h (cas réel)" },
      { label: "Délais", value: "48–72 h", note: "après tournage" },
      { label: "Prix d’appel", value: "650 €", note: "HT" },
    ],
  },

  /* -------------------------------------------------- */
  /* 4) RÉSEAUX SOCIAUX                                 */
  /* -------------------------------------------------- */
  {
    slug: "reseaux-sociaux",
    title: "Contenus courts récurrents — rester visible sans y passer vos soirées",
    subtitle: "Un pack mensuel cadré, des posts qui sortent du lot.",
    hook: "Un workflow mensuel pour rester visible sans y passer vos soirées.",
    problem:
      "Vous manquez de temps pour produire des vidéos courtes régulières sans sacrifier la cohérence de marque.",
    promise:
      "Je mets en place un workflow mensuel avec tournages batchés, automatisations IA et reporting clair pour nourrir vos réseaux.",
    stack: ["Sony FX3", "Aputure Infinibar", "CapCut Pro 2025", "OpusClip AI"],
    deliverables: [
      "8–16 vidéos verticales/mois",
      "Pack sous-titres & templates titres",
      "Calendrier éditorial + scripts hooks",
    ],
    timeline: "Production mensuelle cadencée",
    startingPrice: "Abonnement dès 890 € HT / mois",
    proof: "+120 % de vues sur 60 jours",
    ctaLabel: "Voir le service Réseaux sociaux",
    phases: [
      {
        title: "Brief & objectifs",
        description: "Atelier éditorial pour prioriser vos campagnes, promos et piliers de contenu.",
        aiUpgrade: "Audit performance social + recommandations de formats IA.",
      },
      {
        title: "Scénario & planning",
        description: "Scripts hooks, plan de tournage batch et pré-production logistique.",
        aiUpgrade: "Générateur de variations de scripts pour A/B testing.",
      },
      {
        title: "Production agile",
        description: "Tournages 1/2 journée, B-roll snack, captation audio autonome.",
        aiUpgrade: "Sélection automatique des meilleures prises et cadrages.",
      },
      {
        title: "Montage & révisions",
        description: "Montage rapide, sous-titres animés, habillage motion réutilisable.",
        aiUpgrade: "Templates dynamiques et suggestions de cuts pour chaque plateforme.",
      },
      {
        title: "Pilotage",
        description: "Livraison hebdo, bibliothèque Notion, reporting mensuel détaillé.",
        aiUpgrade: "Dashboards automatisés avec idées de posts à venir.",
      },
    ],
    signatureMove: "Réunion éditoriale mensuelle + livraison des contenus prêts à programmer sous 48 h.",
    metrics: [
      { label: "Preuve", value: "+120%", note: "de vues sur 60 jours" },
      { label: "Cadence", value: "8–16", note: "vidéos verticales / mois" },
      { label: "Abonnement", value: "890 €", note: "HT / mois dès" },
    ],
  },

  /* -------------------------------------------------- */
  /* 5) MARIAGE                                         */
  /* -------------------------------------------------- */
  {
    slug: "mariage",
    title: "Film de mariage — vivant, élégant, fidèle à vous",
    subtitle: "Un film que vous aurez plaisir à revoir et partager.",
    hook: "Un film sincère, vivant, pour revivre l’émotion sans longueur.",
    problem:
      "Vous voulez revivre votre journée sans longueurs ni artifices, avec vos proches au centre.",
    promise:
      "Je capture chaque instant avec discrétion et livre un film sincère accompagné d’un teaser rapide et d’une galerie privée.",
    stack: ["Sony A1", "Leica Q3", "Kodak Super 8", "Sora Colorist"],
    deliverables: ["Film 5–8 minutes", "Bande-annonce 60 s", "Discours & moments bonus + galerie privée"],
    timeline: "3–6 semaines",
    startingPrice: "À partir de 1 900 € TTC",
    proof: "97 % des couples recommandent",
    ctaLabel: "Voir le service Mariage",
    phases: [
      {
        title: "Brief & objectifs",
        description: "Rencontre vidéo, intentions artistiques, planning avec le wedding planner.",
        aiUpgrade: "Moodboard émotionnel généré à partir de vos inspirations.",
      },
      {
        title: "Scénario & planning",
        description: "Storyline de la journée, repérages, coordination prestataires.",
        aiUpgrade: "Assistant planning pour anticiper les moments clés et la lumière.",
      },
      {
        title: "Tournage",
        description: "Captation discrète, audio haute fidélité, séquences super 8 en option.",
        aiUpgrade: "Focus tracking pour ne manquer aucun visage important.",
      },
      {
        title: "Montage & révisions",
        description: "Montage narratif, musique licenciée, 1 aller-retour inclus.",
        aiUpgrade: "Sélection musicale assistée par IA validée avec vous.",
      },
      {
        title: "Livraison",
        description: "Bande-annonce J+7, film final 3–6 semaines, coffret souvenir.",
        aiUpgrade: "Galerie privée sécurisée + backup 12 mois.",
      },
    ],
    signatureMove: "Teaser livré sous 7 jours pour annoncer votre film complet.",
    metrics: [
      { label: "Preuve", value: "97%", note: "des couples recommandent" },
      { label: "Délais", value: "3–6 sem.", note: "selon saison" },
      { label: "Présence", value: "14 h", note: "de couverture continue" },
    ],
  },

  /* -------------------------------------------------- */
  /* 6) MOTION DESIGN / IA                              */
  /* -------------------------------------------------- */
  {
    slug: "motion-design-ia",
    title: "Motion design / IA — rendez l’abstrait évident",
    subtitle: "On comprend vite, on retient mieux, on agit plus.",
    hook: "Expliquez l’invisible : process, produit tech, data — simplement.",
    problem:
      "Vos process tech ou data sont difficiles à expliquer sans support visuel pédagogique.",
    promise:
      "Je combine motion 2D/3D, avatars génératifs et sound design immersif pour vulgariser vos innovations et déclencher l’action.",
    stack: ["After Effects 2025", "Blender Geo Nodes", "Runway Gen-3", "ElevenLabs Dubbing"],
    deliverables: ["Vidéo 45–90 s animée", "Déclinaisons 30 s et 15 s", "Kit illustrations & loops UI"],
    timeline: "2–4 semaines",
    startingPrice: "À partir de 2 400 € HT",
    proof: "+32 % de taux de complétion",
    ctaLabel: "Voir le service Motion design/IA",
    phases: [
      {
        title: "Brief & objectifs",
        description: "Atelier storytelling produit, identification des messages clés et KPI.",
        aiUpgrade: "Mindmap IA pour clarifier les parcours utilisateurs et objections.",
      },
      {
        title: "Scénario & planning",
        description: "Script, storyboard illustré, moodboard design et charte motion.",
        aiUpgrade: "Animatics génératifs + voix témoin pour valider rythme.",
      },
      {
        title: "Production",
        description: "Animation 2D/3D, simulations data, intégration UI et avatars.",
        aiUpgrade: "Textures génératives et avatars IA pilotés sur mesure.",
      },
      {
        title: "Montage & révisions",
        description: "Sound design, mixage multilingue, itérations ciblées.",
        aiUpgrade: "Traductions et doublages IA validés par relecture humaine.",
      },
      {
        title: "Activation",
        description: "Exports webinaire, landing page, réseaux sociaux + toolkit brand.",
        aiUpgrade: "Check-list accessibilité + QA automatique des contrastes.",
      },
    ],
    signatureMove: "Version multilingue (FR/EN/ES) incluse grâce au pipeline de doublage IA.",
    metrics: [
      { label: "Preuve", value: "+32%", note: "de taux de complétion" },
      { label: "Délais", value: "2–4 sem.", note: "selon complexité" },
      { label: "Formats", value: "3", note: "durées livrées (90/30/15 s)" },
    ],
  },
];

