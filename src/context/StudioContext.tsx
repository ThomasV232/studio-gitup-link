/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
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

type StudioContextValue = {
  user: ClientAccount | null;
  clients: ClientAccount[];
  portfolioItems: PortfolioItem[];
  pricingTiers: PricingTier[];
  quoteRequests: QuoteRequest[];
  contactRequests: ContactRequest[];
  chats: ChatThread[];
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

const initialPortfolio: PortfolioItem[] = [
  {
    id: uuid(),
    title: "Sillage Quantique pour OuraSense",
    tagline: "Une chorégraphie de particules pour lancer un wearable de demain",
    category: "Lancement produit",
    year: 2025,
    duration: "01:12",
    description:
      "Campagne hybride live-action x IA générative mixant captations volumétriques, danse kinétique et set virtuel sous Kling 2.5. Déploiement 360° en 48h sur TikTok, YT Shorts et DOOH holographiques.",
    thumbnail:
      "https://images.unsplash.com/photo-1661961110671-75fd3f52d44c?q=80&w=1200",
    gradient: gradientPool[0],
    aiTools: ["Kling 2.5", "Seedance Pro", "Midjourney V7"],
    deliverables: ["Hero film", "9 déclinaisons sociales", "Toolkit AR"],
    socialStack: ["TikTok Pulse", "YouTube Shorts", "Volumetric DOOH"],
  },
  {
    id: uuid(),
    title: "Campagne Hyperlapse pour Luma Skies",
    tagline: "Un voyage comique dans un cloud gaming atmosphérique",
    category: "Brand content",
    year: 2025,
    duration: "02:04",
    description:
      "Direction artistique futuriste mêlant props tangibles et matte painting génératif. Mixage spatial Suno AI + sound design analogique pour un rendu flamboyant.",
    thumbnail:
      "https://images.unsplash.com/photo-1640622650674-6d8c98f8e909?q=80&w=1200",
    gradient: gradientPool[1],
    aiTools: ["Midjourney V7", "Veo 3", "Suno AI"],
    deliverables: ["Film manifesto", "Bumpers Twitch", "Loop Spotify Canvas"],
    socialStack: ["Instagram Reels", "Twitch", "Spotify Canvas"],
  },
  {
    id: uuid(),
    title: "XR Comedy Roast pour Qonto Quantum",
    tagline: "La finance qui se moque d'elle-même en réalité mixte",
    category: "Event hybride",
    year: 2024,
    duration: "00:58",
    description:
      "Plateau XR avec avatars lip-sync LypSync V2 et scénar impro générée par GPT-Vizz. Live multi-cam Davinci Resolve + macros Atem Scriptées.",
    thumbnail:
      "https://images.unsplash.com/photo-1529257414771-1960a42fd38f?q=80&w=1200",
    gradient: gradientPool[2],
    aiTools: ["LypSync V2", "Seedance Pro", "DaVinci Resolve"],
    deliverables: ["Live replay", "Clips snackable", "Pack memes internes"],
    socialStack: ["LinkedIn", "YouTube Live", "Internal Workplace"],
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
    clientId: initialClients[0].id,
    clientName: initialClients[0].name,
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
    clientName: initialClients[0].name,
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

export { StudioProvider, useStudio };
