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
    subtitle: "Multi-cam, drone neurone et plateau XR synchronisé",
    problem: "Vous avez un événement, un lancement, un live. Mais vous refusez que cela ressemble à un livestream Zoom 2020.",
    promise:
      "Nous transformons chaque captation en matière noire cinématographique : caméra robotisée, suivi volumétrique Seedance Pro et compositing temps réel.",
    stack: ["Seedance Pro", "DaVinci Resolve", "Blackmagic Atem Scripting", "Audio Suno AI"],
    deliverables: [
      "Réalisations live multi-cam 12K",
      "Mixage audio spatial et stems Suno",
      "Capsules sociales instantanées",
    ],
    phases: [
      {
        title: "Pré-show quantique",
        description: "Scouting via LiDAR, mapping lumière IA et écriture dramaturgique avec GPT Cinematic.",
        aiUpgrade: "Modélisation 3D Midjourney V7 + previs animée Kling 2.5.",
      },
      {
        title: "Jour J orchestré",
        description: "Pilotage robotique, switcher automatisé par gestes, overlay data en direct.",
        aiUpgrade: "Seedance Pro prédit les mouvements clés pour anticiper les changements d'angle.",
      },
      {
        title: "Afterglow instantané",
        description: "Montage express, VFX Veo 3 et publication orchestrée via nos automations.",
        aiUpgrade: "IA narrative qui génère punchlines et CTA adaptés par réseau.",
      },
    ],
    signatureMove: "Nous livrons une version 9:16 optimisée dans les 47 minutes post-show.",
    metrics: [
      { label: "Switchs caméra", value: "480", note: "gérés par prédiction gestuelle" },
      { label: "Équipe plateau", value: "6", note: "dont 2 IA operators" },
      { label: "Taux de rétention", value: "+63%", note: "vs livestream standard" },
    ],
  },
  {
    slug: "campagne-holo-sociale",
    title: "Campagne Holo-Sociale",
    subtitle: "Brand content orbitant sur tous les réseaux en 6 formats",
    problem: "Vos audiences scrollent à 200 km/h. Il faut un crochet, un running gag, un plan que personne n'a vu.",
    promise:
      "Nous fusionnons humour, motion design et IA générative pour créer un storytelling modulable qui respire 2025.",
    stack: ["Midjourney V7", "Veo 3", "Adobe After Effects", "Premiere Pro Sensei"],
    deliverables: [
      "Film héro + 12 snack content",
      "Memes corporate prêts à poster",
      "Banque de visuels IA brandés",
    ],
    phases: [
      {
        title: "Narrative Lab",
        description: "Atelier de hooks, persona memetics, copywriting borderline mais on gère.",
        aiUpgrade: "Prompt engineering Midjourney V7 & GPT-Voix pour script multi-tonalité.",
      },
      {
        title: "Tournage & capture humour",
        description: "Plan-séquence, drones indoor, comédiens, avatars lip-sync.",
        aiUpgrade: "LypSync V2 synchronise dialogues et improvisations générées.",
      },
      {
        title: "Déclinaisons fulgurantes",
        description: "Montage modulaire, VFX data-driven, automation de publication.",
        aiUpgrade: "Veille tendance en temps réel pour booster chaque format.",
      },
    ],
    signatureMove: "Un gag métaverse caché dans chaque version 9:16. Les fans en redemandent.",
    metrics: [
      { label: "Temps de prod", value: "12 jours", note: "du brief au drop" },
      { label: "Variations IA", value: "128", note: "prompts optimisés en live" },
      { label: "UGC généré", value: "x4", note: "vs campagne classique" },
    ],
  },
  {
    slug: "programme-continuum",
    title: "Programme Continuum",
    subtitle: "Studio vidéo externe pour votre marque sur 12 mois",
    problem: "Vous voulez une présence vidéo constante sans monter une équipe interne de 12 personnes.",
    promise:
      "Studio VBG devient votre cellule de création : plan editorial, tournages mensuels, lives trimestriels et veille tendances.",
    stack: ["DaVinci Resolve", "Notion Automations", "Adobe Premiere Pro", "Veo 3", "Kling 2.5"],
    deliverables: [
      "Roadmap éditoriale évolutive",
      "Plateau captation récurrent",
      "Dashboard ROI et insights",
    ],
    phases: [
      {
        title: "Onboarding orbite",
        description: "Audit contenus, modélisation audience, définition KPIs.",
        aiUpgrade: "Analyse sémantique GPT+ pour détecter les angles différenciants.",
      },
      {
        title: "Production vivante",
        description: "Captations mensuelles, micros contenus, live event trimestriel.",
        aiUpgrade: "Planification automatisée et scripts IA personnalisés.",
      },
      {
        title: "Optimisation continue",
        description: "Analyse de performance, suggestions IA, refonte créative.",
        aiUpgrade: "Dashboard React + IA pour recommandations en 1 clic.",
      },
    ],
    signatureMove: "Une rétro mensuelle stand-up pour célébrer les fails qui marchent.",
    metrics: [
      { label: "Période", value: "12 mois", note: "renouvelable" },
      { label: "ROI moyen", value: "x5.6", note: "sur les leads inbound" },
      { label: "Taux de stress", value: "-73%", note: "mesuré chez vos équipes marketing" },
    ],
  },
];
