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

// --- Données initiales ---
const initialPortfolio: PortfolioItem[] = [
  {
    id: uuid(),
    title: "Pulse HoloBoard · Lancement corporate QuantumLoop",
    tagline: "Accompagnement de 12 000 collaborateurs avec un dispositif immersif",
    category: SERVICE_CATEGORIES[0],
    year: 2025,
    duration: "01:32",
    description:
      "Film d'entreprise réalisé sur plateau robotisé avec incrustations temps réel Kling 2.5. Script co-écrit avec notre IA rédactionnelle pour rendre accessible la transformation digitale et déclinaisons dédiées aux équipes internes.",
    thumbnail: "https://images.unsplash.com/photo-1522199992901-41860af3a7f3?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=s6zR2T9vn2c",
    gradient: gradientPool[0],
    aiTools: ["Midjourney V7", "Kling 2.5", "DaVinci Resolve"],
    deliverables: ["Film principal 16:9", "Version onboarding 9:16", "Kit de présentation interne"],
    socialStack: ["Intranet", "LinkedIn", "YouTube"],
  },
];

const initialPricing: PricingTier[] = [
  {
    id: uuid(),
    name: "Impulse",
    price: 4200,
    description: "Idéal pour un lancement ou un événement clé avec délais courts",
    deliverables: ["Sprint créatif IA", "Tournage studio 4h", "Kit social 6 formats"],
    sla: "Livraison 4K sous 72 heures",
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
];

const initialQuotes: QuoteRequest[] = [
  {
    id: uuid(),
    clientId: initialClients[0].id,
    clientName: initialClients[0].name,
    projectName: "Activation wearable SXSW",
    budgetRange: "12k€ - 18k€",
    deadline: "2025-03-11",
    services: ["Captation multicam", "Scénarisation assistée par IA", "Pack réseaux sociaux"],
    status: "en revue",
    moodboardPrompt:
      "Imagine a slow-motion capture of biometric data turning into aurora borealis patterns inside a dome stage.",
    createdAt: new Date().toISOString(),
  },
];

const initialChats: ChatThread[] = [
  {
    quoteId: initialQuotes[0].id,
    clientName: initialClients[0].name,
    projectName: initialQuotes[0].projectName,
    messages: [
      {
        id: uuid(),
        from: "client",
        content: "On peut ajouter une version 9:16 verticale ?",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

// --- Provider ---
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
    const exists = clients.some((client) => client.email === payload.email);
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
    const found = clients.find((c) => c.email === email && c.password === password);
    if (!found) return { success: false, message: "Identifiants invalides ou compte inexistant." };
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

  const advanceQuoteStatus: StudioContextValue["advanceQuoteStatus"] = (id, status) => {
    setQuoteRequests((prev) =>
      prev.map((quote) => (quote.id === id ? { ...quote, status } : quote)),
    );
  };

  const appendChatMessage: StudioContextValue["appendChatMessage"] = (quoteId, message) => {
    setChats((prev) =>
      prev.map((thread) =>
        thread.quoteId === quoteId
          ? {
              ...thread,
              messages: [...thread.messages, { ...message, id: uuid(), timestamp: new Date().toISOString() }],
            }
          : thread,
      ),
    );
  };

  const recordContactRequest: StudioContextValue["recordContactRequest"] = (payload) => {
    const newRequest: ContactRequest = { ...payload, id: uuid(), createdAt: new Date().toISOString() };
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
  if (!context) throw new Error("useStudio doit être utilisé dans un StudioProvider");
  return context;
};

export { StudioProvider, useStudio, SERVICE_CATEGORIES };
