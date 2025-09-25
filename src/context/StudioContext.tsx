import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { v4 as uuid } from "uuid";

export type VisualMode = "nebula" | "solstice";

type Palette = {
  accent: string;
  accentForeground: string;
  secondary: string;
  tertiary: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  company: string;
  industry: string;
  membership: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

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
  aiTools: string[];
  deliverables: string[];
  socialStack: string[];
};

type PricingTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  sla: string;
};

type ContactRequest = {
  id: string;
  name: string;
  email: string;
  projectSpark: string;
  urgency: "hier" | "cette-semaine" | "quand-c-est-parfait";
  createdAt: string;
};

type QuoteRequestStatus = "nouveau" | "en revue" | "validé" | "refusé";

type QuoteRequest = {
  id: string;
  projectName: string;
  clientName: string;
  clientEmail: string;
  budgetRange: string;
  deadline: string;
  services: string[];
  moodboardPrompt: string;
  status: QuoteRequestStatus;
  createdAt: string;
};

type ChatMessage = {
  id: string;
  from: "client" | "studio";
  content: string;
  timestamp: string;
};

type ChatThread = {
  quoteId: string;
  clientName: string;
  projectName: string;
  messages: ChatMessage[];
};

type StudioUser = {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  membership: string;
  role: "admin" | "client";
};

type StudioUserInternal = StudioUser & { password: string };

type AuthResponse = {
  success: boolean;
  message?: string;
};

type StudioContextValue = {
  user: StudioUser | null;
  clients: StudioUser[];
  portfolioItems: PortfolioItem[];
  pricingTiers: PricingTier[];
  quoteRequests: QuoteRequest[];
  contactRequests: ContactRequest[];
  chats: ChatThread[];
  serviceCategories: string[];
  visualMode: VisualMode;
  palette: Palette;
  homepageVideoUrl: string;
  defaultHomepageVideoUrl: string;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  createQuoteRequest: (payload: {
    projectName: string;
    budgetRange: string;
    deadline: string;
    services: string[];
    moodboardPrompt: string;
  }) => QuoteRequest | null;
  recordContactRequest: (payload: {
    name: string;
    email: string;
    projectSpark: string;
    urgency: "hier" | "cette-semaine" | "quand-c-est-parfait";
  }) => ContactRequest;
  addPortfolioItem: (payload: Omit<PortfolioItem, "id">) => PortfolioItem;
  updatePortfolioItem: (id: string, updates: Partial<Omit<PortfolioItem, "id">>) => void;
  removePortfolioItem: (id: string) => void;
  updatePricingTier: (id: string, updates: Partial<Pick<PricingTier, "price" | "description" | "sla">>) => void;
  advanceQuoteStatus: (id: string, status: QuoteRequestStatus) => void;
  appendChatMessage: (quoteId: string, message: Omit<ChatMessage, "id" | "timestamp">) => void;
  cycleVisualMode: () => void;
  updateHomepageVideoUrl: (url: string) => void;
};

const paletteMap: Record<VisualMode, Palette> = {
  nebula: {
    accent: "188 86% 64%",
    accentForeground: "190 100% 92%",
    secondary: "315 86% 66%",
    tertiary: "251 96% 72%",
  },
  solstice: {
    accent: "34 97% 62%",
    accentForeground: "35 100% 92%",
    secondary: "296 76% 72%",
    tertiary: "208 88% 70%",
  },
};

const defaultHomepageVideoUrl =
  "https://cdn.coverr.co/videos/coverr-neon-lights-on-a-street-at-night-3242/1080p.mp4";

const baseCategories = [
  "Brand Content",
  "Produit",
  "Événementiel",
  "Social",
  "Corporate",
];

const initialPortfolio: PortfolioItem[] = [
  {
    id: "nebula-brand-film",
    title: "Nébula Brand Film",
    tagline: "Une immersion futuriste pour repositionner la marque dans l'univers IA.",
    category: "Brand Content",
    year: 2024,
    duration: "01:20",
    description:
      "Narration orchestrée autour d'un script génératif, motion design volumétrique et tournage hybride plateau / décors virtuels.",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    aiTools: ["Midjourney V7", "Seedance Pro", "Suno AI", "DaVinci Resolve"],
    deliverables: ["Film 16:9", "Cut 9:16", "Teaser 6s", "Storyboard IA"],
    socialStack: ["YouTube", "LinkedIn", "Instagram"],
  },
  {
    id: "product-hologram-launch",
    title: "Lancement produit holographique",
    tagline: "Un reveal spectaculaire combinant captation XR et surcouche générative.",
    category: "Produit",
    year: 2025,
    duration: "00:52",
    description:
      "Pipeline temps réel Kling 2.5 pour projeter le produit dans des environnements holographiques et synchroniser les assets social media.",
    thumbnail:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    aiTools: ["Kling 2.5", "Veo 3", "Adobe Video Sensei"],
    deliverables: ["Reveal 4K", "Pack Stories", "Kit presse", "Template motion"],
    socialStack: ["TikTok", "Instagram", "Meta Ads"],
  },
  {
    id: "summit-after-movie",
    title: "Aftermovie Summit 2025",
    tagline: "Une synthèse sensorielle d'un événement international sur trois jours.",
    category: "Événementiel",
    year: 2025,
    duration: "02:10",
    description:
      "Captation multicam, traitement audio IA et montage collaboratif Veo 3 pour livrer un aftermovie dans la nuit suivant la clôture.",
    thumbnail:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    aiTools: ["Seedance Pro", "Suno AI", "LypSync V2"],
    deliverables: ["Aftermovie 16:9", "Capsules 9:16", "Galerie photo IA"],
    socialStack: ["YouTube", "LinkedIn", "Event Replay"],
  },
];

const initialUsers: StudioUserInternal[] = [
  {
    id: uuid(),
    name: "Thomas Volberg",
    email: "volberg.thomas@gmail.com",
    company: "Studio VBG",
    industry: "Agence vidéo",
    membership: "Hyperdrive",
    role: "admin",
    password: "studio-admin",
  },
  {
    id: uuid(),
    name: "Lena Duarte",
    email: "lena.duarte@supersonic.fr",
    company: "Supersonic Mobility",
    industry: "Mobilité",
    membership: "Hyperdrive",
    role: "client",
    password: "lenaduarte",
  },
  {
    id: uuid(),
    name: "Malik Aït-Kaci",
    email: "malik@newhorizons.ai",
    company: "New Horizons AI",
    industry: "Tech IA",
    membership: "Warp",
    role: "client",
    password: "malikwarp",
  },
];

const initialPricingTiers: PricingTier[] = [
  {
    id: "impulsion",
    name: "Impulsion",
    price: 4800,
    description: "Mini-série social media sur 2 semaines, équipe légère + IA générative.",
    sla: "Kick-off sous 5 jours ouvrés",
  },
  {
    id: "hyperdrive",
    name: "Hyperdrive",
    price: 9600,
    description: "Campagne complète multi-formats avec direction artistique et plateau XR.",
    sla: "Lancement sous 72h",
  },
  {
    id: "constellation",
    name: "Constellation",
    price: 16800,
    description: "Programme annuel : production continue, diffusion multicanale et reporting IA.",
    sla: "Cellule dédiée et astreinte 24/7",
  },
];

const initialQuoteRequests: QuoteRequest[] = [
  {
    id: uuid(),
    projectName: "Motion série onboarding",
    clientName: "Lena Duarte",
    clientEmail: "lena.duarte@supersonic.fr",
    budgetRange: "18 000 €",
    deadline: new Date().toISOString().slice(0, 10),
    services: ["Captation multicam", "Pack réseaux sociaux"],
    moodboardPrompt:
      "Créer une saga onboarding très rythmée pour accueillir les nouvelles recrues dans nos hubs européens.",
    status: "en revue",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    projectName: "Live produit Q3",
    clientName: "Malik Aït-Kaci",
    clientEmail: "malik@newhorizons.ai",
    budgetRange: "25 000 €",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 10),
    services: ["Diffusion live", "Scénarisation assistée par IA", "Contenus verticaux 9:16"],
    moodboardPrompt:
      "Showcase interactif avec plateau XR, avatars génératifs et intégration de démonstrations produits en temps réel.",
    status: "nouveau",
    createdAt: new Date().toISOString(),
  },
];

const initialContactRequests: ContactRequest[] = [
  {
    id: uuid(),
    name: "Élodie Marchand",
    email: "elodie@horizonmedia.fr",
    projectSpark: "Besoin d'une campagne vidéo pour lancer une plateforme B2B en septembre.",
    urgency: "cette-semaine",
    createdAt: new Date().toISOString(),
  },
];

const initialChats: ChatThread[] = initialQuoteRequests.map((quote) => ({
  quoteId: quote.id,
  clientName: quote.clientName,
  projectName: quote.projectName,
  messages: [
    {
      id: uuid(),
      from: "client",
      content: quote.moodboardPrompt,
      timestamp: new Date().toISOString(),
    },
    {
      id: uuid(),
      from: "studio",
      content:
        "Merci ! Nous analysons le brief et revenons vers vous avec un storyboard et une proposition budgétaire détaillée.",
      timestamp: new Date().toISOString(),
    },
  ],
}));

const StudioContext = createContext<StudioContextValue | null>(null);

const toPublicUser = (user: StudioUserInternal): StudioUser => {
  const { password, ...publicProfile } = user;
  return publicProfile;
};

export const StudioProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<StudioUserInternal[]>(initialUsers);
  const [user, setUser] = useState<StudioUser | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolio);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(initialPricingTiers);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(initialQuoteRequests);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(initialContactRequests);
  const [chats, setChats] = useState<ChatThread[]>(initialChats);
  const [visualMode, setVisualMode] = useState<VisualMode>("nebula");
  const [homepageVideoUrl, setHomepageVideoUrl] = useState<string>(defaultHomepageVideoUrl);

  const clients = useMemo(
    () => users.filter((profile) => profile.role === "client").map(toPublicUser),
    [users],
  );

  const serviceCategories = useMemo(() => {
    const categories = new Set(baseCategories);
    portfolioItems.forEach((item) => categories.add(item.category));
    return Array.from(categories);
  }, [portfolioItems]);

  useEffect(() => {
    document.body.classList.remove("visual-nebula", "visual-solstice");
    document.body.classList.add(`visual-${visualMode}`);
    return () => {
      document.body.classList.remove(`visual-${visualMode}`);
    };
  }, [visualMode]);

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      const normalizedEmail = payload.email.trim().toLowerCase();
      const exists = users.some((profile) => profile.email.toLowerCase() === normalizedEmail);
      if (exists) {
        return { success: false, message: "Un compte existe déjà avec cet email." };
      }

      const newUser: StudioUserInternal = {
        id: uuid(),
        name: payload.name.trim(),
        email: normalizedEmail,
        company: payload.company.trim(),
        industry: payload.industry.trim(),
        membership: payload.membership,
        role: "client",
        password: payload.password.trim(),
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(toPublicUser(newUser));

      return {
        success: true,
        message: "Compte créé avec succès. Bienvenue dans l'espace Studio VBG !",
      };
    },
    [users],
  );

  const login = useCallback(async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const profile = users.find(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === normalizedPassword,
    );

    if (!profile) {
      return { success: false, message: "Identifiants incorrects." };
    }

    setUser(toPublicUser(profile));
    return { success: true };
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addPortfolioItem = useCallback((payload: Omit<PortfolioItem, "id">) => {
    const item: PortfolioItem = { ...payload, id: uuid() };
    setPortfolioItems((prev) => [item, ...prev]);
    return item;
  }, []);

  const updatePortfolioItem = useCallback((id: string, updates: Partial<Omit<PortfolioItem, "id">>) => {
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates, id: item.id } : item)),
    );
  }, []);

  const removePortfolioItem = useCallback((id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updatePricingTier = useCallback(
    (id: string, updates: Partial<Pick<PricingTier, "price" | "description" | "sla">>) => {
      setPricingTiers((prev) =>
        prev.map((tier) => (tier.id === id ? { ...tier, ...updates, id: tier.id } : tier)),
      );
    },
    [],
  );

  const createQuoteRequest = useCallback(
    (payload: {
      projectName: string;
      budgetRange: string;
      deadline: string;
      services: string[];
      moodboardPrompt: string;
    }): QuoteRequest | null => {
      if (!user) {
        return null;
      }

      const quote: QuoteRequest = {
        id: uuid(),
        projectName: payload.projectName,
        clientName: user.name,
        clientEmail: user.email,
        budgetRange: payload.budgetRange,
        deadline: payload.deadline,
        services: payload.services,
        moodboardPrompt: payload.moodboardPrompt,
        status: "nouveau",
        createdAt: new Date().toISOString(),
      };

      setQuoteRequests((prev) => [quote, ...prev]);
      setChats((prev) => [
        ...prev,
        {
          quoteId: quote.id,
          clientName: quote.clientName,
          projectName: quote.projectName,
          messages: [
            {
              id: uuid(),
              from: "client",
              content: payload.moodboardPrompt,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      ]);

      return quote;
    },
    [user],
  );

  const advanceQuoteStatus = useCallback((id: string, status: QuoteRequestStatus) => {
    setQuoteRequests((prev) => prev.map((quote) => (quote.id === id ? { ...quote, status } : quote)));
  }, []);

  const appendChatMessage = useCallback(
    (quoteId: string, message: Omit<ChatMessage, "id" | "timestamp">) => {
      setChats((prev) =>
        prev.map((thread) =>
          thread.quoteId === quoteId
            ? {
                ...thread,
                messages: [
                  ...thread.messages,
                  {
                    id: uuid(),
                    from: message.from,
                    content: message.content,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : thread,
        ),
      );
    },
    [],
  );

  const recordContactRequest = useCallback(
    (payload: {
      name: string;
      email: string;
      projectSpark: string;
      urgency: "hier" | "cette-semaine" | "quand-c-est-parfait";
    }): ContactRequest => {
      const request: ContactRequest = {
        id: uuid(),
        name: payload.name,
        email: payload.email,
        projectSpark: payload.projectSpark,
        urgency: payload.urgency,
        createdAt: new Date().toISOString(),
      };

      setContactRequests((prev) => [request, ...prev]);
      return request;
    },
    [],
  );

  const cycleVisualMode = useCallback(() => {
    setVisualMode((prev) => (prev === "nebula" ? "solstice" : "nebula"));
  }, []);

  const updateHomepageVideoUrl = useCallback((url: string) => {
    setHomepageVideoUrl(url.trim());
  }, []);

  const value = useMemo<StudioContextValue>(
    () => ({
      user,
      clients,
      portfolioItems,
      pricingTiers,
      quoteRequests,
      contactRequests,
      chats,
      serviceCategories,
      visualMode,
      palette: paletteMap[visualMode],
      homepageVideoUrl,
      defaultHomepageVideoUrl,
      register,
      login: (email, password) => login({ email, password }),
      logout,
      createQuoteRequest,
      recordContactRequest,
      addPortfolioItem,
      updatePortfolioItem,
      removePortfolioItem,
      updatePricingTier,
      advanceQuoteStatus,
      appendChatMessage,
      cycleVisualMode,
      updateHomepageVideoUrl,
    }),
    [
      user,
      clients,
      portfolioItems,
      pricingTiers,
      quoteRequests,
      contactRequests,
      chats,
      serviceCategories,
      visualMode,
      homepageVideoUrl,
      register,
      login,
      logout,
      createQuoteRequest,
      recordContactRequest,
      addPortfolioItem,
      updatePortfolioItem,
      removePortfolioItem,
      updatePricingTier,
      advanceQuoteStatus,
      appendChatMessage,
      cycleVisualMode,
      updateHomepageVideoUrl,
    ],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
};

export const useStudio = (): StudioContextValue => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio doit être utilisé dans un StudioProvider");
  }
  return context;
};
