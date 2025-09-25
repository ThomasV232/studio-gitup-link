/* eslint-disable react-refresh/only-export-components */
import { FormEvent, useMemo, useState, useCallback } from "react";
import { useStudio } from "@/context/StudioContext";

const ADMIN_EMAIL = "volberg.thomas@gmail.com";

type PortfolioDraft = {
  title: string;
  tagline: string;
  category: string;
  year: number;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  aiTools: string;
  deliverables: string;
  socialStack: string;
};

const getDefaultProject = (categories: readonly string[]): PortfolioDraft => ({
  title: "",
  tagline: "",
  category: categories[0] ?? "Entreprise",
  year: new Date().getFullYear(),
  duration: "00:45",
  description: "",
  thumbnail: "",
  videoUrl: "",
  aiTools: "",
  deliverables: "",
  socialStack: "",
});

const Dashboard = () => {
  const {
    user,
    clients,
    portfolioItems,
    pricingTiers,
    quoteRequests,
    contactRequests,
    chats,
    serviceCategories,
    addPortfolioItem,
    updatePortfolioItem,
    removePortfolioItem,
    updatePricingTier,
    advanceQuoteStatus,
    appendChatMessage,
  } = useStudio();

  const [newProject, setNewProject] = useState<PortfolioDraft>(() =>
    getDefaultProject(serviceCategories)
  );
  const [chatInput, setChatInput] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(
    () => chats[0]?.quoteId ?? ""
  );
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isImportingMetadata, setIsImportingMetadata] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<
    (PortfolioDraft & { id: string }) | null
  >(null);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.quoteId === selectedChatId),
    [chats, selectedChatId]
  );
  const isAdmin = user?.email === ADMIN_EMAIL;

  const resetNewProject = () => {
    setNewProject(getDefaultProject(serviceCategories));
    setYoutubeUrl("");
    setMetadataError(null);
  };

  const extractYoutubeId = useCallback((url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    return match?.[1] ?? null;
  }, []);

  const handleImportMetadata = useCallback(async () => {
    if (!youtubeUrl.trim()) {
      setMetadataError("Ajoutez un lien YouTube pour importer un projet.");
      return;
    }

    const id = extractYoutubeId(youtubeUrl.trim());
    if (!id) {
      setMetadataError(
        "Le lien YouTube n'est pas reconnu. Essayez avec l'URL complète."
      );
      return;
    }

    setIsImportingMetadata(true);
    setMetadataError(null);

    const canonicalUrl = youtubeUrl.includes("http")
      ? youtubeUrl.trim()
      : `https://www.youtube.com/watch?v=${id}`;

    try {
      const oEmbedResponse = await fetch(
        `https://noembed.com/embed?url=${encodeURIComponent(canonicalUrl)}`
      );
      if (!oEmbedResponse.ok) {
        throw new Error("Impossible de récupérer les informations depuis YouTube.");
      }
      const oEmbedData = await oEmbedResponse.json();

      let description = "";
      try {
        const pageResponse = await fetch(
          `https://r.jina.ai/https://www.youtube.com/watch?v=${id}`
        );
        if (pageResponse.ok) {
          const raw = await pageResponse.text();
          const match = raw.match(/"shortDescription":"(.*?)"/);
          if (match?.[1]) {
            description = match[1]
              .replace(/\\n/g, "\n")
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'");
          }
        }
      } catch {
        // fallback ignoré si non dispo
      }

      const taglineCandidate = description
        .split(/\n|\./)
        .map((line) => line.trim())
        .find((line) => line.length > 0);

      setNewProject((prev) => ({
        ...prev,
        title: oEmbedData.title ?? prev.title,
        tagline: taglineCandidate ?? prev.tagline,
        description: description || prev.description,
        thumbnail: oEmbedData.thumbnail_url ?? prev.thumbnail,
        videoUrl: canonicalUrl,
      }));
    } catch (error) {
      setMetadataError(
        error instanceof Error
          ? error.message
          : "Import impossible. Essayez manuellement."
      );
    } finally {
      setIsImportingMetadata(false);
    }
  }, [extractYoutubeId, youtubeUrl]);

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <div className="max-w-lg space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">
            Accès restreint
          </p>
          <h1 className="text-4xl font-black leading-tight">
            Ce tableau de bord est réservé à l'équipe Studio VBG.
          </h1>
          <p className="text-lg text-slate-200/80">
            Connectez-vous avec le compte administrateur pour gérer le
            portfolio, les devis et les échanges clients.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* … Ton JSX complet ici (header, ajout projet, édition, tarifs, devis, chat, etc.) */}
    </div>
  );
};

export default Dashboard;
