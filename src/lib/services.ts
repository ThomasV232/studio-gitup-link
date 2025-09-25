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
    slug: "captation-spectrale",
    title: "Captation Spectrale",
    subtitle: "Multi-cam, drone et plateau XR entièrement synchronisés",
    problem:
      "Vous préparez un lancement stratégique ou un événement majeur qui exige une captation irréprochable sur chaque angle.",
    promise:
      "Nous orchestrons une réalisation premium avec régie automatisée, robotique Seedance Pro et compositing temps réel pour délivrer un rendu broadcast immédiatement exploitable.",
    stack: ["Seedance Pro", "DaVinci Resolve", "Blackmagic Atem Scripting", "Audio Suno AI"],
    deliverables: [
      "Réalisations live multi-cam 12K",
      "Mixage audio spatial et stems Suno",
      "Capsules sociales instantanées",
    ],
    phases: [
      {
        title: "Pré-production",
        description:
          "Repérages LiDAR, plan lumière anticipé par IA et trame éditoriale validée avec votre équipe.",
        aiUpgrade:
          "Modélisation 3D Midjourney V7 et prévisualisation Kling 2.5 pour sécuriser les angles.",
      },
      {
        title: "Captation",
        description:
          "Pilotage robotisé, switcher automatisé et overlay data en direct pour garantir la continuité de service.",
        aiUpgrade:
          "Seedance Pro anticipe les mouvements clés et optimise les transitions caméra.",
      },
      {
        title: "Post-événement",
        description:
          "Montage express, corrections colorimétriques et exports multi-formats prêts à diffuser.",
        aiUpgrade:
          "Scripts IA pour générer les accroches et CTA adaptés à chaque réseau.",
      },
    ],
    signatureMove:
      "Livraison d'une déclinaison 9:16 optimisée dans les 47 minutes suivant la fin de l'événement.",
    metrics: [
      { label: "Transitions caméra", value: "480", note: "pilotées par anticipation Seedance" },
      { label: "Équipe plateau", value: "6", note: "réalisateurs, cadreurs et spécialistes IA" },
      { label: "Taux de rétention", value: "+63%", note: "comparé à un livestream standard" },
    ],
  },
  {
    slug: "campagne-holo-sociale",
    title: "Campagne Holo-Sociale",
    subtitle: "Brand content orchestré pour chaque réseau et chaque format",
    problem:
      "Vos audiences sont dispersées sur plusieurs plateformes et attendent des contenus différenciés mais cohérents.",
    promise:
      "Nous combinons narration, motion design et IA générative pour produire des campagnes multi-format parfaitement alignées avec votre image de marque.",
    stack: ["Midjourney V7", "Veo 3", "Adobe After Effects", "Premiere Pro Sensei"],
    deliverables: [
      "Film héro + 12 contenus snack",
      "Visuels corporate prêts à publier",
      "Banque de visuels IA brandés",
    ],
    phases: [
      {
        title: "Atelier stratégique",
        description:
          "Analyse des personas, cadrage des messages clés et définition de la grille éditoriale.",
        aiUpgrade:
          "Prompt engineering Midjourney V7 et génération de scripts multi-tonalité par GPT-Voix.",
      },
      {
        title: "Production",
        description:
          "Tournages live, captations drone, motion design et avatars lip-sync selon les besoins.",
        aiUpgrade:
          "LypSync V2 synchronise dialogues et voix générées en temps réel.",
      },
      {
        title: "Déclinaisons",
        description:
          "Montage modulaire, VFX data-driven et automatisation des exports selon les plateformes.",
        aiUpgrade:
          "Veille tendance en temps réel pour ajuster les variations et recommandations de diffusion.",
      },
    ],
    signatureMove:
      "Chaque déclinaison 9:16 intègre les optimisations IA nécessaires pour maximiser la rétention.",
    metrics: [
      { label: "Temps de production", value: "12 jours", note: "du brief à la mise en ligne" },
      { label: "Variations IA", value: "128", note: "prompts ajustés en continu" },
      { label: "UGC généré", value: "x4", note: "par rapport à une campagne standard" },
    ],
  },
  {
    slug: "programme-continuum",
    title: "Programme Continuum",
    subtitle: "Studio vidéo externalisé pour votre marque sur 12 mois",
    problem:
      "Vous recherchez une production récurrente sans internaliser l'ensemble des compétences vidéo.",
    promise:
      "Studio VBG agit comme votre cellule vidéo intégrée : plan éditorial, tournages mensuels, lives trimestriels et analyses de performance.",
    stack: ["DaVinci Resolve", "Notion Automations", "Adobe Premiere Pro", "Veo 3", "Kling 2.5"],
    deliverables: [
      "Roadmap éditoriale évolutive",
      "Plateau captation récurrent",
      "Dashboard ROI et insights",
    ],
    phases: [
      {
        title: "Onboarding",
        description:
          "Audit des contenus existants, modélisation des audiences et définition des KPIs cibles.",
        aiUpgrade:
          "Analyse sémantique GPT+ pour identifier les angles différenciants et opportunités éditoriales.",
      },
      {
        title: "Production continue",
        description:
          "Captations mensuelles, micro-formats récurrents et événements live trimestriels.",
        aiUpgrade:
          "Planification automatisée et scripts IA personnalisés selon les actualités de votre marque.",
      },
      {
        title: "Optimisation",
        description:
          "Analyse de performance, recommandations éditoriales et ajustements créatifs en continu.",
        aiUpgrade:
          "Dashboard IA pour générer des recommandations exploitables en un clic.",
      },
    ],
    signatureMove:
      "Revue mensuelle structurée avec partage des indicateurs clés et arbitrages éditoriaux.",
    metrics: [
      { label: "Période", value: "12 mois", note: "offre renouvelable" },
      { label: "ROI moyen", value: "x5.6", note: "sur les leads entrants" },
      { label: "Charge opérationnelle", value: "-73%", note: "mesurée auprès de vos équipes marketing" },
    ],
  },
];
