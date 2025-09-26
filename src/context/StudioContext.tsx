/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabaseClient";

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
  company: string;
  industry: string;
  membership: "Impulse" | "Hyperdrive" | "Continuum";
  avatarHue: number;
  lastProject?: string;
};

type StoredClientAccount = ClientAccount & { password?: string };

export type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
  company: string;
  industry: string;
  membership: ClientAccount["membership"];
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
  register: (payload: RegistrationPayload) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateAccount: (
    updates: Partial<Omit<ClientAccount, "id">> & { lastProject?: string | null }
  ) => Promise<{ success: boolean; message?: string }>;
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

const isBrowser = typeof window !== "undefined";

const storageKeys = {
  user: "studio.vbg.user",
  clients: "studio.vbg.clients",
  portfolio: "studio.vbg.portfolio",
  pricing: "studio.vbg.pricing",
  quotes: "studio.vbg.quotes",
  contacts: "studio.vbg.contacts",
  chats: "studio.vbg.chats",
  visualMode: "studio.vbg.visual-mode",
} as const;

const readStorage = <T,>(key: string, fallback: T): T => {
  if (!isBrowser) return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Impossible de lire le stockage local pour ${key}`, error);
    return fallback;
  }
};

const writeStorage = (key: string, value: unknown) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Impossible d'écrire dans le stockage local pour ${key}`, error);
  }
};

const removeStorage = (key: string) => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
};

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
  {
    id: uuid(),
    title: "Aftermovie NeoSolar · Festival IA & lumière",
    tagline: "Aftermovie immersif pour un festival dédié à l'innovation lumineuse",
    category: SERVICE_CATEGORIES[1],
    year: 2024,
    duration: "02:08",
    description:
      "Captation événementielle associant drones FPV, Seedance Pro pour anticiper les mouvements de foule et montage synchronisé Suno AI. Objectif : donner envie de s'inscrire dès l'ouverture de la prochaine édition.",
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
    tagline: "Visite premium d'un penthouse avec narration IA",
    category: SERVICE_CATEGORIES[2],
    year: 2025,
    duration: "01:05",
    description:
      "Visite immersive en drone FPV avec overlays data générés par Kling 2.5 et voix off Suno IA. Chaque pièce est présentée comme un chapitre et l'appel à l'action est piloté via QR code interactif.",
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
    tagline: "Série verticale de 12 épisodes conçue pour la conversion",
    category: SERVICE_CATEGORIES[3],
    year: 2025,
    duration: "00:45",
    description:
      "Production sociale verticale pilotée par IA : scripts testés via GPT CopyLab, tournage en LED volume, montage automatisé Veo 3 et templates livrés aux équipes internes.",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    gradient: gradientPool[3],
    aiTools: ["Veo 3", "Midjourney V7", "Adobe Premiere Pro"],
    deliverables: ["Série 12x45s", "Capsules additionnelles", "Scripts automatisés"],
    socialStack: ["TikTok", "Snap", "YouTube Shorts"],
  },
  {
    id: uuid(),
    title: "Orbit Lovers · Mariage futuriste en live",
    tagline: "Cérémonie captée en direct avec diffusion privée",
    category: SERVICE_CATEGORIES[4],
    year: 2024,
    duration: "03:20",
    description:
      "Captation mariage premium : drones, steadycam, robot caméra et IA pour générer les vœux animés. Diffusion live privée et montage highlight livré avant la fin de la réception.",
    thumbnail: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?q=80&w=1200",
    videoUrl: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    gradient: gradientPool[4],
    aiTools: ["Seedance Pro", "DaVinci Resolve", "Suno AI"],
    deliverables: ["Live multi-cam", "Highlight 3min", "Stories pour les invités"],
    socialStack: ["YouTube privé", "Instagram", "Galerie partagée"],
  },
  {
    id: uuid(),
    title: "LogoVerse · Identité motion générée",
    tagline: "Création d'identité motion design propulsée par l'IA",
    category: SERVICE_CATEGORIES[5],
    year: 2025,
    duration: "00:36",
    description:
      "Création de logo animé via Midjourney V7 puis animatic Kling 2.5. Sound design Suno AI et packaging template pour diffusion OTT et dispositifs immersifs.",
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
    description: "Idéal pour un lancement ou un événement clé avec délais courts",
    deliverables: ["Sprint créatif IA", "Tournage studio 4h", "Kit social 6 formats"],
    sla: "Livraison 4K sous 72 heures",
  },
  {
    id: uuid(),
    name: "Hyperdrive",
    price: 9700,
    description: "Campagne multi-canal pilotée par notre pipeline intelligent",
    deliverables: ["Storyboard Midjourney V7", "Tournage bi-cam", "Montage Davinci + VFX Veo 3"],
    sla: "Pilotage complet sur 21 jours",
  },
  {
    id: uuid(),
    name: "Continuum",
    price: 18200,
    description: "Programme annuel incluant production continue, live et data storytelling",
    deliverables: ["Retainer production mensuelle", "Lives trimestriels Seedance", "Veille tendances et optimisation"],
    sla: "Équipe dédiée et dashboard 24/7",
  },
];

const initialClients: ClientAccount[] = [
  {
    id: uuid(),
    name: "Thomas Volberg",
    email: "volberg.thomas@gmail.com",
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
    company: "QuantumWear",
    industry: "Tech santé",
    membership: "Hyperdrive",
    avatarHue: 182,
    lastProject: "Sillage Quantique",
  },
];

const ensureAdminClient = (list: ClientAccount[]): ClientAccount[] => {
  const adminEmail = initialClients[0].email;
  const hasAdmin = list.some((client) => client.email === adminEmail);
  return hasAdmin ? list : [initialClients[0], ...list];
};

const loadInitialClients = () => {
  const stored = readStorage<StoredClientAccount[]>(storageKeys.clients, initialClients);
  const sanitized = stored.map(({ password: _password, ...client }) => ({
    ...client,
    avatarHue: typeof client.avatarHue === "number" ? client.avatarHue : Math.floor(Math.random() * 360),
  }));
  return ensureAdminClient(sanitized);
};
const loadInitialPortfolio = () => readStorage<PortfolioItem[]>(storageKeys.portfolio, initialPortfolio);
const loadInitialPricing = () => readStorage<PricingTier[]>(storageKeys.pricing, initialPricing);
const loadInitialQuotes = () => readStorage<QuoteRequest[]>(storageKeys.quotes, initialQuotes);
const loadInitialContacts = () => readStorage<ContactRequest[]>(storageKeys.contacts, []);
const loadInitialChats = () => readStorage<ChatThread[]>(storageKeys.chats, initialChats);
const loadInitialVisualMode = () => readStorage<VisualMode>(storageKeys.visualMode, "nebula");
const loadInitialUser = () => {
  const storedUser = readStorage<(ClientAccount & { password?: string }) | null>(storageKeys.user, null);
  if (!storedUser) return null;
  const { password: _password, ...safeUser } = storedUser;
  const candidates = loadInitialClients();
  return candidates.find((client) => client.email === safeUser.email) ?? safeUser;
};

const initialQuotes: QuoteRequest[] = [
  {
    id: uuid(),
    clientId: initialClients[1].id,
    clientName: initialClients[1].name,
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
  const supabase = getSupabaseClient();
  const [user, setUser] = useState<ClientAccount | null>(loadInitialUser);
  const [clients, setClients] = useState<ClientAccount[]>(loadInitialClients);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(loadInitialPortfolio);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(loadInitialPricing);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(loadInitialQuotes);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(loadInitialContacts);
  const [chats, setChats] = useState<ChatThread[]>(loadInitialChats);
  const [visualMode, setVisualMode] = useState<VisualMode>(loadInitialVisualMode);

  const syncClientFromSupabase = useCallback(
    (supabaseUser: User): ClientAccount => {
      const metadata = (supabaseUser.user_metadata ?? {}) as Partial<
        RegistrationPayload & { avatarHue?: number; lastProject?: string }
      >;

      const nextClient: ClientAccount = {
        id: supabaseUser.id,
        name: metadata.name ?? supabaseUser.email ?? "Compte Studio VBG",
        email: supabaseUser.email ?? "",
        company: metadata.company ?? "",
        industry: metadata.industry ?? "",
        membership: (metadata.membership as ClientAccount["membership"]) ?? "Hyperdrive",
        avatarHue:
          typeof metadata.avatarHue === "number"
            ? metadata.avatarHue
            : Math.floor(Math.random() * 360),
        lastProject: metadata.lastProject,
      };

      setClients((prev) => {
        const exists = prev.some((client) => client.email === nextClient.email);
        const updated = exists
          ? prev.map((client) => (client.email === nextClient.email ? { ...client, ...nextClient } : client))
          : [...prev, nextClient];
        return ensureAdminClient(updated);
      });

      return nextClient;
    },
    [setClients],
  );

  const projectClientUpdate = useCallback(
    (nextClient: ClientAccount) => {
      setUser(nextClient);
      setClients((prev) => {
        const exists = prev.some((client) => client.id === nextClient.id);
        const updated = exists
          ? prev.map((client) => (client.id === nextClient.id ? nextClient : client))
          : [...prev, nextClient];
        return ensureAdminClient(updated);
      });
      setQuoteRequests((prev) =>
        prev.map((quote) =>
          quote.clientId === nextClient.id ? { ...quote, clientName: nextClient.name } : quote,
        ),
      );
      setChats((prev) =>
        prev.map((thread) => {
          const relatedQuote = quoteRequests.find((quote) => quote.id === thread.quoteId);
          if (relatedQuote?.clientId === nextClient.id) {
            return { ...thread, clientName: nextClient.name };
          }
          return thread;
        }),
      );
    },
    [quoteRequests],
  );

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        const sessionUser = data.session?.user;
        if (sessionUser) {
          const nextClient = syncClientFromSupabase(sessionUser);
          setUser(nextClient);
        }
      })
      .catch((error) => {
        console.error("Impossible de récupérer la session Supabase", error);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      const sessionUser = session?.user;
      if (sessionUser) {
        const nextClient = syncClientFromSupabase(sessionUser);
        setUser(nextClient);
      } else {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase, syncClientFromSupabase]);

  useEffect(() => {
    if (user && visualMode !== "nebula") {
      setVisualMode("nebula");
    }
  }, [user, visualMode]);

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

    writeStorage(storageKeys.visualMode, visualMode);
  }, [visualMode]);

  useEffect(() => {
    writeStorage(storageKeys.clients, clients);
  }, [clients]);

  useEffect(() => {
    if (user) {
      writeStorage(storageKeys.user, user);
    } else {
      removeStorage(storageKeys.user);
    }
  }, [user]);

  useEffect(() => {
    writeStorage(storageKeys.portfolio, portfolioItems);
  }, [portfolioItems]);

  useEffect(() => {
    writeStorage(storageKeys.pricing, pricingTiers);
  }, [pricingTiers]);

  useEffect(() => {
    writeStorage(storageKeys.quotes, quoteRequests);
  }, [quoteRequests]);

  useEffect(() => {
    writeStorage(storageKeys.contacts, contactRequests);
  }, [contactRequests]);

  useEffect(() => {
    writeStorage(storageKeys.chats, chats);
  }, [chats]);

  const cycleVisualMode = () => {
    setVisualMode((current) => (current === "nebula" ? "solstice" : "nebula"));
  };

  const register: StudioContextValue["register"] = async (payload) => {
    const { password, ...profile } = payload;
    const avatarHue = Math.floor(Math.random() * 360);

    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        message: "Supabase n'est pas configuré. Ajoutez les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: profile.email,
        password,
        options: {
          data: {
            ...profile,
            avatarHue,
          },
          emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth` : undefined,
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        const syncedClient = syncClientFromSupabase(data.user);
        if (data.session) {
          setUser(syncedClient);
        }
      }

      if (!data.session) {
        return {
          success: true,
          message:
            "Compte créé. Confirmez votre adresse email pour accéder au tableau de bord.",
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Erreur d'inscription Supabase", error);
      return {
        success: false,
        message: "Une erreur inattendue est survenue lors de l'inscription.",
      };
    }
  };

  const login: StudioContextValue["login"] = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        message: "Supabase n'est pas configuré. Impossible de se connecter.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        const syncedClient = syncClientFromSupabase(data.user);
        setUser(syncedClient);
      }

      return { success: true };
    } catch (error) {
      console.error("Erreur de connexion Supabase", error);
      return {
        success: false,
        message: "Impossible de se connecter pour le moment.",
      };
    }
  };

  const requestPasswordReset: StudioContextValue["requestPasswordReset"] = async (email) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        message: "Supabase n'est pas configuré. Impossible d'envoyer un lien de réinitialisation.",
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/auth?mode=login` : undefined,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message:
          "Si cette adresse est associée à un compte, un email de réinitialisation vient de vous être envoyé.",
      };
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation Supabase", error);
      return {
        success: false,
        message: "Impossible d'envoyer un lien de réinitialisation pour le moment.",
      };
    }
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch((error) => {
        console.error("Erreur lors de la déconnexion Supabase", error);
      });
    }
    setUser(null);
  };

  const updateAccount: StudioContextValue["updateAccount"] = async (updates) => {
    if (!user) {
      return {
        success: false,
        message: "Vous devez être connecté pour modifier votre profil.",
      };
    }

    const nextLastProject =
      updates.lastProject === undefined
        ? user.lastProject
        : updates.lastProject === null || updates.lastProject === ""
          ? undefined
          : updates.lastProject;

    const nextSnapshot: ClientAccount = {
      ...user,
      ...updates,
      lastProject: nextLastProject,
    };

    if (!isSupabaseConfigured) {
      projectClientUpdate(nextSnapshot);
      return {
        success: true,
        message: "Profil mis à jour (mode démo). Activez Supabase pour synchroniser dans le cloud.",
      };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        ...(updates.email && updates.email !== user.email ? { email: updates.email } : {}),
        data: {
          name: nextSnapshot.name,
          company: nextSnapshot.company,
          industry: nextSnapshot.industry,
          membership: nextSnapshot.membership,
          avatarHue: nextSnapshot.avatarHue,
          lastProject:
            updates.lastProject === undefined
              ? user.lastProject ?? null
              : updates.lastProject === null || updates.lastProject === ""
                ? null
                : updates.lastProject,
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        const syncedClient = syncClientFromSupabase(data.user);
        projectClientUpdate({ ...syncedClient });
      } else {
        projectClientUpdate(nextSnapshot);
      }

      return {
        success: true,
        message: "Profil mis à jour.",
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil Supabase", error);
      return {
        success: false,
        message: "Impossible de mettre à jour votre profil pour le moment.",
      };
    }
  };

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
              content: "Bonjour, nous ouvrons ce canal pour préciser votre projet.",
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
    requestPasswordReset,
    logout,
    updateAccount,
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
