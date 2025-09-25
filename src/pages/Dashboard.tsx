import { FormEvent, useMemo, useState } from "react";
import { useStudio } from "@/context/StudioContext";

const Dashboard = () => {
  const {
    user,
    clients,
    portfolioItems,
    pricingTiers,
    quoteRequests,
    contactRequests,
    chats,
    addPortfolioItem,
    removePortfolioItem,
    updatePricingTier,
    advanceQuoteStatus,
    appendChatMessage,
  } = useStudio();

  const [newProject, setNewProject] = useState({
    title: "",
    tagline: "",
    category: "",
    year: new Date().getFullYear(),
    duration: "00:45",
    description: "",
    thumbnail: "",
    aiTools: "",
    deliverables: "",
    socialStack: "",
  });
  const [chatInput, setChatInput] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(() => chats[0]?.quoteId ?? "");

  const activeChat = useMemo(
    () => chats.find((chat) => chat.quoteId === selectedChatId),
    [chats, selectedChatId]
  );

  if (!user) return null;

  const handleAddProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPortfolioItem({
      title: newProject.title,
      tagline: newProject.tagline,
      category: newProject
