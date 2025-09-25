/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";

// Local helper to generate shimmering gradient placeholders
const gradientPool = [
  "from-[#61f4de] via-[#2471d6] to-[#290a5c]",
  "from-[#fd7bff] via-[#4d31ff] to-[#120248]",
  "from-[#ffdc63] via-[#ff7a18] to-[#45108a]",
  "from-[#5dff9d] via-[#19b6ff] to-[#5916e1]",
  "from-[#ff9cc6] via-[#ff6c6c] to-[#2f2aa0]",
];

export type PortfolioItem = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: number;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  gradient: string;
  aiTools: string[];
  deliverables: string[];
  socialStack: string[];
};

export type PricingTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  deliverables: string[];
  sla: string;
};

export type QuoteRequest = {
  id: string;
  clientId: string;
  clientName: string;
  projectName: string;
  budgetRange: string;
  deadline: string;
  services: string[];
  status: "nouveau" | "en revue" | "validé" | "refusé";
  moodboardPrompt: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  from: "studio" | "client";
  content: string;
  timestamp: string;
};

export type ChatThread = {
  quoteId: string;
  clientName: string;
  projectName: string;
  messages: ChatMessage[];
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  projectSpark: string;
  urgency: "hier" | "cette-semaine" | "quand-c-est-parfait";
  createdAt: string;
};

export type ClientAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  company: string;
  industry: string;
  membership: "Impulse" | "Hyperdrive" | "Continuum";
  avatarHue: number;
  lastProject?: string;
};

type VisualMode = "nebula" | "solstice";

type VisualPalette = {
  accent: string;
  accentSoft: string;
  secondary: string;
  tertiary: string;
  accentForeground: string;
  border: string;
};

const SERVICE_CATEGORIES = [
  "Entreprise",
  "Événementiel",
  "Immobilier",
  "Réseaux sociaux",
  "Mariage",
  "Motion design / IA",
] as const;

type StudioContextValue = {
  user: ClientAccount | null;
  clients: ClientAccount[];
  portfolioItems: PortfolioItem[];
  pricingTiers: PricingTier[];
  quoteRequests: QuoteRequest[];
  contactRequests: ContactRequest[];
  chats: ChatThread[];
  serviceCategories: typeof SERVICE_CATEGORIES;
  visualMode: VisualMode;
  palette: VisualPalette;
  cycleVisualMode: () => void;
  register: (payload: Omit<ClientAccount, "id" | "avatarHue">) => { success: boolean; message?: string };
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  addPortfolioItem: (payload: Omit<PortfolioItem, "id" | "gradient"> & { gradient?: string }) => void;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void;
  removePortfolioItem: (id: string) => void;
  updatePricingTier: (id: string, updates: Partial<PricingTier>) => void;
  createQuoteRequest: (payload: Omit<QuoteRequest, "id" | "status" | "createdAt" | "clientId" | "clientName">) => QuoteRequest | null;
  advanceQuoteStatus: (id: string, status: QuoteRequest["status"]) => void;
  appendChatMessage: (quoteId: string, message: Omit<ChatMessage, "id" | "timestamp">) => void;
  recordContactRequest: (payload: Omit<ContactRequest, "id" | "createdAt">) => void;
};

const StudioContext = createContext<StudioContextValue | undefined>(undefined);

const visualPalettes: Record<VisualMode, VisualPalette> = {
  nebula: {
    accent: "188 86% 64%",
    accentSoft: "196 90% 78%",
    secondary: "315 86% 66%",
    tertiary: "251 96% 72%",
    accentForeground: "190 100% 92%",
    border: "188 86% 64%",
  },
  solstice: {
    accent: "34 97% 62%",
    accentSoft: "17 94% 64%",
    secondary: "296 76% 72%",
    tertiary: "208 88% 70%",
    accentForeground: "35 100% 92%",
    border: "34 97% 62%",
  },
};

const initialPortfolio: PortfolioItem[] = [
  {
    id: uuid(),
    title: "Pulse HoloBoard · Lancement corporate QuantumLoop",
    tagline: "Onboarder 12 000 collaborateurs en riant (et en 9:16)",
    category: SERVICE_CATEGORIES[0],
    year: 2025,
    duration: "01:32",
    description:
      "Film d'entreprise tourné en plateau robotisé avec incrustations temps réel Kling 2.5. Script co-écrit avec GPT Humorist pour humaniser l'IA interne et déclinaisons snackables pour la QVCT.",
    thumbnail: "https://images.unsplash.com/photo-1522199992901-41860af3a7f3?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=s6zR2T9vn2c",
    gradient: gradientPool[0],
    aiTools: ["Midjourney V7", "Kling 2.5", "DaVinci Resolve"],
    deliverables: ["Film HQ 16:9", "Version onboarding 9:16", "Pack slides & memes internes"],
    socialStack: ["Intranet", "LinkedIn", "YouTube"],
  },
  {
    id: uuid(),
    title: "Aftermovie NeoSolar · Festival IA & lumière",
    tagline: "Teasing événementiel qui pulse comme un drop techno",
    category: SERVICE_CATEGORIES[1],
    year: 2024,
    duration: "02:08",
    description:
      "Captation événementielle mêlant drones FPV, Seedance Pro pour prédire les mouvements de foule et montage syncro Suno AI. Résultat : un aftermovie qui donne envie de s'inscrire avant la fin du générique.",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    gradient: gradientPool[1],
    aiTools: ["Seedance Pro", "Suno AI", "DaVinci Resolve"],
    deliverables: ["Aftermovie 4K", "Teaser 30s", "Stories pré-event"],
    socialStack: ["Instagram", "TikTok", "YouTube Shorts"],
  },
  {
    id: uuid(),
    title: "Skyline Loop · Visite immobilière narrée par IA",
    tagline: "Un penthouse raconté comme une mini-série sci-fi",
    category: SERVICE_CATEGORIES[2],
    year: 2025,
    duration: "01:05",
    description:
      "Visite immersive en drone FPV avec overlays data générés par Kling 2.5 et voix off Suno IA. Chaque pièce devient un chapitre et le call-to-action se déclenche via QR code interactif.",
    thumbnail: "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    gradient: gradientPool[2],
    aiTools: ["Midjourney V7", "Kling 2.5", "Suno AI"],
    deliverables: ["Film 16:9", "Version VR", "Carousel LinkedIn"],
    socialStack: ["YouTube", "Website", "Meta Ads"],
  },
  {
    id: uuid(),
    title: "Snackverse · Série sociale pour WaveBite",
    tagline: "12 épisodes 9:16 avec punchline à la seconde",
    category: SERVICE_CATEGORIES[3],
    year: 2025,
    duration: "00:45",
    description:
      "Production sociale verticale pilotée par IA : hooks testés via GPT CopyLab, tournage en LED volume, montage automatisé Veo 3 et packaging template pour l'équipe interne.",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    gradient: gradientPool[3],
    aiTools: ["Veo 3", "Midjourney V7", "Adobe Premiere Pro"],
    deliverables: ["Série 12x45s", "Mèmes bonus", "Scripts automatisés"],
    socialStack: ["TikTok", "Snap", "YouTube Shorts"],
  },
  {
    id: uuid(),
    title: "Orbit Lovers · Mariage futuriste en live",
    tagline: "Un oui capté comme un concert interstellaire",
    category: SERVICE_CATEGORIES[4],
    year: 2024,
    duration: "03:20",
    description:
      "Captation mariage premium : drones, steady, robot caméra et IA pour générer vœux animés. Diffusion live privée + montage highlight livré avant l'after-party.",
    thumbnail: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    gradient: gradientPool[4],
    aiTools: ["Seedance Pro", "DaVinci Resolve", "Suno AI"],
    deliverables: ["Live multi-cam", "Highlight 3min", "Stories pour les invités"],
    socialStack: ["YouTube privé", "Instagram", "AirDrop Gallery"],
  },
  {
    id: uuid(),
    title: "LogoVerse · Identité motion générée",
    tagline: "Motion design & IA qui se répondent en boucle",
    category: SERVICE_CATEGORIES[5],
    year: 2025,
    duration: "00:36",
    description:
      "Création de logo animé via Midjourney V7 puis animatic Kling 2.5. Sound design Suno AI et packaging template pour diffusion OTT et hologrammes.",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    gradient: gradientPool[0],
    aiTools: ["Midjourney V7", "Kling 2.5", "After Effects"],
    deliverables: ["Logo animé 4 formats", "Banque transitions", "Kit son identité"],
    socialStack: ["Behance", "Vimeo", "TikTok"],
  },
];

const initialPricing: PricingTier[] = [
  {
    id: uuid(),
    name: "Impulse",
    price: 4200,
    description: "Pour les start-up qui veulent frapper fort en moins de 10 jours",
    deliverables: ["Sprint créatif IA", "Shoot studio 4h", "Kit social 6 formats"],
    sla: "Delivery express 4K en 72h",
  },
  {
    id: uuid(),
    name: "Hyperdrive",
    price: 9700,
    description: "Campagne multi-canal chorégraphiée par notre pipeline intelligent",
    deliverables: ["Storyboard Midjourney V7", "Tournage bi-cam", "Montage Davinci + VFX Veo 3"],
    sla: "Pilotage complet sur 21 jours",
  },
  {
    id: uuid(),
    name: "Continuum",
    price: 18200,
    description: "Programme annuel avec cellule contenue, live et data storytelling",
    deliverables: ["Retainer production mensuelle", "Live trimestriels Seedance", "Veille trends + optimisation"],
    sla: "Équipe dédiée & dashboard 24/7",
  },
];

const initialClients: ClientAccount[] = [
  {
    id: uuid(),
    name: "Thomas Volberg",
    email: "volberg.thomas@gmail.com",
    password: "studioAdmin!42",
    company: "Studio VBG",
    industry: "Production vidéo",
    membership: "Continuum",
    avatarHue: 24,
    lastProject: "Pulse HoloBoard",
  },
  {
    id: uuid(),
    name: "Lena Photon",
    email: "lena@quantumwear.ai",
    password: "studioVBG!",
    company: "QuantumWear",
    industry: "Tech santé",
    membership: "Hyperdrive",
    avatarHue: 182,
    lastProject: "Sillage Quantique",
  },
];

const initialQuotes: QuoteRequest[] = [
  {
    id: uuid(),
    clientId: initialClients[1].id,
    clientName: initialClients[1].name,
    projectName: "Activation wearable SXSW",
    budgetRange: "12k€ - 18k€",
    deadline: "2025-03-11",
    services: ["Captation multicam", "IA scénarisation", "Pack réseaux"],
    status: "en revue",
    moodboardPrompt:
      "Imagine a slow-motion capture of biometric data turning into aurora borealis patterns inside a dome stage.",
    createdAt: new Date().toISOString(),
  },
];

const initialChats: ChatThread[] = [
  {
    quoteId: initialQuotes[0].id,
    clientName: initialClients[1].name,
    projectName: initialQuotes[0].projectName,
    messages: [
      {
        id: uuid(),
        from: "client",
        content: "On peut ajouter une version 9:16 verticale ?",
        timestamp: new Date().toISOString(),
      },
      {
        id: uuid(),
        from: "studio",
        content: "Bien sûr, on la génère via Veo 3 + montage Davinci. Je t'envoie le chiffrage dans 5 minutes.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

const StudioProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ClientAccount | null>(null);
  const [clients, setClients] = useState<ClientAccount[]>(initialClients);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolio);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(initialPricing);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(initialQuotes);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [chats, setChats] = useState<ChatThread[]>(initialChats);
  const [visualMode, setVisualMode] = useState<VisualMode>("nebula");

  useEffect(() => {
    const body = document.body;
    body.classList.remove("visual-nebula", "visual-solstice");
    body.classList.add(`visual-${visualMode}`);

    const palette = visualPalettes[visualMode];
    const root = document.documentElement;
    root.style.setProperty("--visual-accent", palette.accent);
    root.style.setProperty("--visual-accent-soft", palette.accentSoft);
    root.style.setProperty("--visual-secondary", palette.secondary);
    root.style.setProperty("--visual-tertiary", palette.tertiary);
    root.style.setProperty("--visual-accent-foreground", palette.accentForeground);
    root.style.setProperty("--visual-border", palette.border);
  }, [visualMode]);

  const cycleVisualMode = () => {
    setVisualMode((current) => (current === "nebula" ? "solstice" : "nebula"));
  };

  const register: StudioContextValue["register"] = (payload) => {
    const { email } = payload;
    const exists = clients.some((client) => client.email === email);
    if (exists) {
      return { success: false, message: "Un compte utilise déjà cet email." };
    }

    const newClient: ClientAccount = {
      ...payload,
      id: uuid(),
      avatarHue: Math.floor(Math.random() * 360),
    };

    setClients((prev) => [...prev, newClient]);
    setUser(newClient);

    return { success: true };
  };

  const login: StudioContextValue["login"] = (email, password) => {
    const found = clients.find((client) => client.email === email && client.password === password);
    if (!found) {
      return { success: false, message: "Identifiants invalides ou compte inexistant." };
    }

    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  const addPortfolioItem: StudioContextValue["addPortfolioItem"] = ({ gradient, ...payload }) => {
    const newItem: PortfolioItem = {
      ...payload,
      id: uuid(),
      gradient: gradient ?? gradientPool[Math.floor(Math.random() * gradientPool.length)],
    };

    setPortfolioItems((prev) => [newItem, ...prev]);
  };

  const updatePortfolioItem: StudioContextValue["updatePortfolioItem"] = (id, updates) => {
    setPortfolioItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removePortfolioItem: StudioContextValue["removePortfolioItem"] = (id) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePricingTier: StudioContextValue["updatePricingTier"] = (id, updates) => {
    setPricingTiers((prev) => prev.map((tier) => (tier.id === id ? { ...tier, ...updates } : tier)));
  };

  const createQuoteRequest: StudioContextValue["createQuoteRequest"] = (payload) => {
    if (!user) return null;

    const newQuote: QuoteRequest = {
      ...payload,
      id: uuid(),
      clientId: user.id,
      clientName: user.name,
      status: "nouveau",
      createdAt: new Date().toISOString(),
    };

    setQuoteRequests((prev) => [newQuote, ...prev]);
    return newQuote;
  };

  const ensureChatThread = (quoteId: string, clientName: string, projectName: string) => {
    setChats((prev) => {
      const exists = prev.some((thread) => thread.quoteId === quoteId);
      if (exists) return prev;
      return [
        ...prev,
        {
          quoteId,
          clientName,
          projectName,
          messages: [
            {
              id: uuid(),
              from: "studio",
              content: "Hello ! On ouvre le canal pour affiner ton projet.",
              timestamp: new Date().toISOString(),
            },
          ],
        },
      ];
    });
  };

  const advanceQuoteStatus: StudioContextValue["advanceQuoteStatus"] = (id, status) => {
    setQuoteRequests((prev) =>
      prev.map((quote) => {
        if (quote.id === id) {
          if (status === "validé") {
            ensureChatThread(quote.id, quote.clientName, quote.projectName);
          }
          return { ...quote, status };
        }
        return quote;
      }),
    );
  };

  const appendChatMessage: StudioContextValue["appendChatMessage"] = (quoteId, message) => {
    setChats((prev) =>
      prev.map((thread) =>
        thread.quoteId === quoteId
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  ...message,
                  id: uuid(),
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : thread,
      ),
    );
  };

  const recordContactRequest: StudioContextValue["recordContactRequest"] = (payload) => {
    const newRequest: ContactRequest = {
      ...payload,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    setContactRequests((prev) => [newRequest, ...prev]);
  };

  const value: StudioContextValue = {
    user,
    clients,
    portfolioItems,
    pricingTiers,
    quoteRequests,
    contactRequests,
    chats,
    serviceCategories: SERVICE_CATEGORIES,
    visualMode,
    palette: visualPalettes[visualMode],
    cycleVisualMode,
    register,
    login,
    logout,
    addPortfolioItem,
    updatePortfolioItem,
    removePortfolioItem,
    updatePricingTier,
    createQuoteRequest,
    advanceQuoteStatus,
    appendChatMessage,
    recordContactRequest,
  };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
};

const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio doit être utilisé dans un StudioProvider");
  }
  return context;
};

export { StudioProvider, useStudio, SERVICE_CATEGORIES };
