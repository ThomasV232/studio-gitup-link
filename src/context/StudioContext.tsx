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

// --- initialPortfolio, initialPricing, initialClients, initialQuotes, initialChats ---
// (je n’ai pas modifié les données, juste nettoyé les conflits pour garder cohérence)

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
    title: "Sillage Quantique · Teaser wearable QuantumWear",
    tagline: "Quand ton poignet prédit l'avenir (et ton style)",
    category: SERVICE_CATEGORIES[1],
    year: 2025,
    duration: "00:47",
    description:
      "Spot produit hybride alliant captation macro 8K et simulation particules Houdini. Montage rythmé sur soundtrack Murph générative pour incarner la fusion tech-émotion.",
    thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gradient: gradientPool[1],
    aiTools: ["Houdini", "Murph AI", "After Effects"],
    deliverables: ["Spot 16:9 premium", "Cut mobile 9:16", "Variations CTA e-commerce"],
    socialStack: ["Instagram", "TikTok", "Site web"],
  },
  {
    id: uuid(),
    title: "Nexus Immersif · Showroom virtuel Spatial House",
    tagline: "Visiter 40 appartements depuis son canapé (en VR)",
    category: SERVICE_CATEGORIES[2],
    year: 2024,
    duration: "02:15",
    description:
      "Parcours immersif métaverse avec scans LiDAR photogrammétriques. Interface Unity customisée et narration IA Claude personnalisée par profil acquéreur.",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    gradient: gradientPool[2],
    aiTools: ["Unity 3D", "Claude AI", "Gaussian Splatting"],
    deliverables: ["App VR Oculus", "Version web 360°", "Dashboard analytics vendeur"],
    socialStack: ["LinkedIn", "YouTube", "Site web"],
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

// --- StudioProvider + useStudio (inchangé, sauf intégration de serviceCategories) ---

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
    const updateCSSVariables = () => {
      const root = document.documentElement;
      const palette = visualPalettes[visualMode];
      
      root.style.setProperty("--accent", palette.accent);
      root.style.setProperty("--accent-soft", palette.accentSoft);
      root.style.setProperty("--secondary", palette.secondary);
      root.style.setProperty("--tertiary", palette.tertiary);
      root.style.setProperty("--accent-foreground", palette.accentForeground);
      root.style.setProperty("--border", palette.border);
    };

    updateCSSVariables();
  }, [visualMode]);

  const cycleVisualMode = () => {
    setVisualMode(prev => prev === "nebula" ? "solstice" : "nebula");
  };

  const register = (payload: Omit<ClientAccount, "id" | "avatarHue">) => {
    const existingClient = clients.find(c => c.email === payload.email);
    if (existingClient) {
      return { success: false, message: "Un compte avec cet email existe déjà" };
    }

    const newClient: ClientAccount = {
      ...payload,
      id: uuid(),
      avatarHue: Math.floor(Math.random() * 360),
    };

    setClients(prev => [...prev, newClient]);
    setUser(newClient);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const client = clients.find(c => c.email === email && c.password === password);
    if (!client) {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }

    setUser(client);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const addPortfolioItem = (payload: Omit<PortfolioItem, "id" | "gradient"> & { gradient?: string }) => {
    const newItem: PortfolioItem = {
      ...payload,
      id: uuid(),
      gradient: payload.gradient || gradientPool[Math.floor(Math.random() * gradientPool.length)],
      videoUrl: payload.videoUrl || "",
    };

    setPortfolioItems(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const updatePricingTier = (id: string, updates: Partial<PricingTier>) => {
    setPricingTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, ...updates } : tier
    ));
  };

  const createQuoteRequest = (payload: Omit<QuoteRequest, "id" | "status" | "createdAt" | "clientId" | "clientName">) => {
    if (!user) return null;

    const newQuote: QuoteRequest = {
      ...payload,
      id: uuid(),
      clientId: user.id,
      clientName: user.name,
      status: "nouveau",
      createdAt: new Date().toISOString(),
    };

    setQuoteRequests(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const advanceQuoteStatus = (id: string, status: QuoteRequest["status"]) => {
    setQuoteRequests(prev => prev.map(quote => 
      quote.id === id ? { ...quote, status } : quote
    ));
  };

  const appendChatMessage = (quoteId: string, message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: uuid(),
      timestamp: new Date().toISOString(),
    };

    setChats(prev => {
      const existingChat = prev.find(chat => chat.quoteId === quoteId);
      if (existingChat) {
        return prev.map(chat => 
          chat.quoteId === quoteId 
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        );
      } else {
        const quote = quoteRequests.find(q => q.id === quoteId);
        if (quote) {
          const newChat: ChatThread = {
            quoteId,
            clientName: quote.clientName,
            projectName: quote.projectName,
            messages: [newMessage],
          };
          return [...prev, newChat];
        }
        return prev;
      }
    });
  };

  const recordContactRequest = (payload: Omit<ContactRequest, "id" | "createdAt">) => {
    const newRequest: ContactRequest = {
      ...payload,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    setContactRequests(prev => [newRequest, ...prev]);
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
