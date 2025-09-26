export type ServiceDetail = {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  promise: string;
  stack: string[];
  deliverables: string[];
  phases: {
    title: string;
    description: string;
    aiUpgrade: string;
  }[];
  signatureMove: string;
  metrics: { label: string; value: string; note: string }[];
};

export const servicesData: ServiceDetail[] = [
  {
    slug: "entreprise",
    title: "Films de marque & culture d'entreprise",
    subtitle: "Positionnez votre équipe comme le média de référence de votre secteur",
    problem:
      "Vous devez incarner votre vision, vos expertises et vos talents avec un film premium qui suscite l'adhésion en interne comme en externe.",
    promise:
      "Je conçois un récit cinématique qui mêle interviews, captations de terrain et séquences immersives pour révéler la personnalité de votre entreprise.",
    stack: [
      "Sony Burano 8K",
      "DaVinci Resolve 19 Neural",
      "Runway Gen-5 Enterprise",
      "Adobe Premiere Pro Sensei",
    ],
    deliverables: [
      "Film maître 16:9 calibré broadcast",
      "3 déclinaisons 9:16 et 1:1 optimisées social",
      "Pack photo + sound design original",
    ],
    phases: [
      {
        title: "Préproduction stratégique",
        description:
          "Atelier vision, repérages immersifs et storyboard augmenté pour sécuriser chaque séquence clé.",
        aiUpgrade:
          "Prévisualisation Runway + Luma Ray pour valider les axes caméra et la lumière avant tournage.",
      },
      {
        title: "Tournage cinématique",
        description:
          "Interviews multicam, plans drones FPV et captation sonore double système avec mixage live.",
        aiUpgrade: "Pilotage focus assisté par IA et script téléprompteur dynamique pour fluidifier les prises.",
      },
      {
        title: "Activation multicanale",
        description:
          "Montage narratif, color grading ACES, habillage graphique et exports calibrés pour chaque canal.",
        aiUpgrade:
          "Scripts LinkedIn & newsletter générés avec vérification humaine pour accélérer votre diffusion.",
      },
    ],
    signatureMove:
      "Livraison d'une version teaser 45'' prête pour vos comités de direction en 72 heures.",
    metrics: [
      { label: "Satisfaction direction", value: "98%", note: "mesurée sur 36 projets corporate" },
      { label: "Itérations", value: "≤2", note: "grâce à la préparation éditoriale" },
      { label: "Boost leads", value: "+61%", note: "impact moyen post diffusion" },
    ],
  },
  {
    slug: "evenementiel",
    title: "Aftermovies & captations événementielles",
    subtitle: "Immortalisez l'énergie de vos événements avec une diffusion express",
    problem:
      "Vos participants attendent un contenu à chaud et vos sponsors veulent des assets prêts à partager dès le lendemain.",
    promise:
      "Je couvre votre événement avec une équipe légère mais ultra équipée pour livrer un aftermovie vibrant et des capsules sociales instantanées.",
    stack: ["FX6 Duo Multicam", "DJI Inspire 3", "Veo 3 Live", "Suno Studio Max"],
    deliverables: [
      "Aftermovie 90''", "Capsule verticale jour J", "Banque de plans bruts triés",
    ],
    phases: [
      {
        title: "Cadrage & logistique",
        description:
          "Repérages techniques, déroulé chronologique et plan de captation multi-équipes.",
        aiUpgrade: "Timeline dynamique Notion + alerte météo IA pour ajuster les équipes en temps réel.",
      },
      {
        title: "Tournage terrain",
        description:
          "Captation stabilisée, micro-trottoirs, drone FPV indoor et ambiance sonore immersive.",
        aiUpgrade:
          "Reconnaissance visage pour retrouver vos VIP et tagging automatique des séquences clés.",
      },
      {
        title: "Montage à chaud",
        description:
          "Montage express sur station mobile, étalonnage LUT perso et intégration branding sponsor.",
        aiUpgrade:
          "Génération d'accroches et sous-titres multilingues par IA vérifiés en direct.",
      },
    ],
    signatureMove:
      "Aftermovie livré en 24 h et stories verticales publiables pendant l'événement.",
    metrics: [
      { label: "Délai livraison", value: "24 h", note: "après clap de fin" },
      { label: "Equipe terrain", value: "3", note: "opérateurs polyvalents + IA ops" },
      { label: "Taux partage", value: "+74%", note: "vs. contenus non animés" },
    ],
  },
  {
    slug: "immobilier",
    title: "Visites premium & lancements immobiliers",
    subtitle: "Valorisez chaque mètre carré avec une narration architecturale sur-mesure",
    problem:
      "Vos biens haut de gamme nécessitent un contenu qui révèle la lumière, la circulation et les signatures architecturales.",
    promise:
      "Je scénarise une visite immersive qui combine plan séquence stabilisé, drone FPV et motion design pour magnifier vos projets.",
    stack: ["Insta360 Ace Pro", "DJI Avata 2", "Luma NeRF", "Unreal Engine 5.4"],
    deliverables: [
      "Film visite 4K HDR",
      "Plan masse animé & synthèses 3D",
      "Pack d'annonces optimisées portals",
    ],
    phases: [
      {
        title: "Préparation scénographique",
        description:
          "Moodboard lumière, repérage NeRF et script voix-off selon vos personas acquéreurs.",
        aiUpgrade: "Projection 3D Luma pour tester les mouvements caméra et la mise en scène déco.",
      },
      {
        title: "Tournage sur site",
        description:
          "Travellings gimbal, drone intérieur/extérieur, timelapses et détails matières macro.",
        aiUpgrade: "Stabilisation gyroscopique active + focus tracking IA sur les éléments différenciants.",
      },
      {
        title: "Post-production signature",
        description:
          "Voix-off, sound design, color grading neutre luxe et exports en plusieurs langues.",
        aiUpgrade: "Génération de variantes de textes pour portails immobiliers et réseaux sociaux.",
      },
    ],
    signatureMove:
      "Version courte verticale dédiée aux campagnes Meta Ads incluse dans chaque prestation.",
    metrics: [
      { label: "Rdv qualifiés", value: "+38%", note: "moyenne observée sur 2024-2025" },
      { label: "Tournage", value: "1 jour", note: "équipe réduite et agile" },
      { label: "Variantes", value: "6", note: "formats livrés prêts à diffuser" },
    ],
  },
  {
    slug: "reseaux-sociaux",
    title: "Content social & campagnes always-on",
    subtitle: "Alimentez vos communautés avec des formats courts ultra performants",
    problem:
      "Vous devez publier régulièrement sans sacrifier la qualité ni l'alignement de marque.",
    promise:
      "Je mets en place une machine à contenus qui combine tournages agiles, IA générative et pilotage éditorial pour tenir la cadence.",
    stack: ["Sony FX3", "Aputure Infinibar", "CapCut Pro 2025", "OpusClip AI"],
    deliverables: [
      "Série de 8 à 12 vidéos courtes/mois",
      "Templates motion réutilisables",
      "Kit miniatures & légendes optimisées",
    ],
    phases: [
      {
        title: "Sprint éditorial",
        description:
          "Calendrier thématique, scripts hooks et choix des trends adaptés à votre tonalité.",
        aiUpgrade:
          "Veille algorithmique TikTok/Instagram + scoring IA pour prioriser les concepts à fort potentiel.",
      },
      {
        title: "Production agile",
        description:
          "Tournages batch, B-roll créatif, motion snack et captation audio autonome.",
        aiUpgrade:
          "Assistants IA pour générer variations de hook et sélectionner les meilleures prises.",
      },
      {
        title: "Optimisation & pilotage",
        description:
          "Montage rapide, sous-titres animés, thumbnails générés et reporting mensuel.",
        aiUpgrade:
          "Analyse de performance automatisée avec recommandations prêtes à publier.",
      },
    ],
    signatureMove: "Réunion éditoriale hebdo + drop de contenus prêts à programmer sous 48 h.",
    metrics: [
      { label: "Croissance moyenne", value: "+89%", note: "sur 90 jours" },
      { label: "Cadence", value: "10+", note: "vidéos livrées / mois" },
      { label: "Taux complétion", value: "65%", note: "moyenne des formats 9:16" },
    ],
  },
  {
    slug: "mariage",
    title: "Films de mariage haute couture",
    subtitle: "Un storytelling poétique pour revivre chaque émotion",
    problem:
      "Vous voulez un film sincère, élégant et intemporel qui capture vos proches autant que vos détails.",
    promise:
      "Je vous accompagne dès les préparatifs pour créer un film sur-mesure, tourné en analogique + numérique, livré avec un coffret exclusif.",
    stack: ["Sony A1", "Leica Q3", "Kodak Super 8", "Sora Pro Colorist"],
    deliverables: [
      "Film signature 6-8 minutes",
      "Teaser 60'' livré sous 5 jours",
      "Galerie photo + mini site privé",
    ],
    phases: [
      {
        title: "Rencontre & intention",
        description:
          "Moodboard émotionnel, repérage des lieux et coordination avec wedding planner.",
        aiUpgrade: "Assistant de style IA pour traduire vos inspirations en palette visuelle unique.",
      },
      {
        title: "Jour J discret",
        description:
          "Captation cinématographique discrète, audio haute fidélité et moments volés.",
        aiUpgrade:
          "Reconnaissance visage pour identifier les proches prioritaires et ne manquer aucune émotion.",
      },
      {
        title: "Montage émotion",
        description:
          "Montage musical, mixage binaural, étalonnage film et packaging collector.",
        aiUpgrade:
          "IA musicale pour adapter la bande sonore et générer une version rallongée sur demande.",
      },
    ],
    signatureMove: "Coffret USB gravé + tirages fine art livrés avec le film final.",
    metrics: [
      { label: "Livraison teaser", value: "5 jours", note: "après le mariage" },
      { label: "Satisfaction couples", value: "100%", note: "note moyenne 5/5" },
      { label: "Présence", value: "14 h", note: "de couverture continue" },
    ],
  },
  {
    slug: "motion-design-ia",
    title: "Motion design augmenté par l'IA",
    subtitle: "Expliquez vos innovations avec des visuels ultra fluides",
    problem:
      "Vos produits tech ou SaaS sont complexes et nécessitent une pédagogie visuelle claire et spectaculaire.",
    promise:
      "Je mixe motion design, 3D générative et avatars intelligents pour créer une vidéo explicative mémorable.",
    stack: ["After Effects 2025", "Blender Geometry Nodes", "Runway Gen-5", "ElevenLabs Dubbing"],
    deliverables: [
      "Film motion 90''",
      "Cutdowns 30'' et 15''",
      "Kit illustrations + loops UI",
    ],
    phases: [
      {
        title: "Scénarisation",
        description:
          "Workshop script, board illustré et définition de la charte motion.",
        aiUpgrade: "Storyboards génératifs et voix témoin IA pour valider les rythmes.",
      },
      {
        title: "Production visuelle",
        description:
          "Animation 2D/3D, simulations physiques et intégration de data en temps réel.",
        aiUpgrade: "Runway Gen-5 pour textures dynamiques et avatars de démonstration.",
      },
      {
        title: "Optimisation diffusion",
        description:
          "Mixage audio multilingue, sous-titres adaptatifs et exports pour webinaire / réseaux.",
        aiUpgrade: "Dubbing ElevenLabs et QA automatique des contrastes pour l'accessibilité.",
      },
    ],
    signatureMove: "Version multilingue (FR/EN/ES) prête à livrer grâce au pipeline de doublage IA.",
    metrics: [
      { label: "Temps prod", value: "21 jours", note: "cycle complet" },
      { label: "Variantes", value: "9", note: "formats prêts à l'emploi" },
      { label: "Compréhension", value: "+48%", note: "sur vos démos produit" },
    ],
  },
];
