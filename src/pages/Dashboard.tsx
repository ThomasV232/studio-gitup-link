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

  const activeChat = useMemo(() => chats.find((chat) => chat.quoteId === selectedChatId), [chats, selectedChatId]);

  if (!user) {
    return null;
  }

  const handleAddProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPortfolioItem({
      title: newProject.title,
      tagline: newProject.tagline,
      category: newProject.category || "Création",
      year: Number(newProject.year),
      duration: newProject.duration,
      description: newProject.description,
      thumbnail:
        newProject.thumbnail || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
      aiTools: newProject.aiTools.split(",").map((item) => item.trim()).filter(Boolean),
      deliverables: newProject.deliverables.split(",").map((item) => item.trim()).filter(Boolean),
      socialStack: newProject.socialStack.split(",").map((item) => item.trim()).filter(Boolean),
    });
    setNewProject({
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
  };

  const handleSendMessage = () => {
    if (!activeChat || !chatInput.trim()) return;
    appendChatMessage(activeChat.quoteId, { from: "studio", content: chatInput.trim() });
    setChatInput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24">
        <header className="rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-[0_20px_120px_rgba(14,165,233,0.2)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                Dashboard Studio VBG
              </span>
              <h1 className="text-5xl font-black leading-tight">Bienvenue {user.name.split(" ")[0]}</h1>
              <p className="text-lg text-slate-200/80">
                Gérez vos projets, suivez vos devis, ajustez vos tarifs et discutez avec nos équipes. Tout est synchronisé avec notre pipeline IA.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 text-sm text-slate-200/80">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Stat instantané</p>
              <p className="mt-3 text-white">{portfolioItems.length} projets en cours · {quoteRequests.length} devis · {contactRequests.length} demandes rapides</p>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(56,189,248,0.18)]">
              <h2 className="text-2xl font-bold">Ajouter un projet au portfolio</h2>
              <p className="mt-2 text-sm text-slate-200/70">Ajoutez, modifiez, supprimez librement les projets visibles côté vitrine.</p>
              <form className="mt-6 grid gap-4" onSubmit={handleAddProject}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={newProject.title}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Titre"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    required
                    value={newProject.tagline}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, tagline: event.target.value }))}
                    placeholder="Tagline"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-4">
                  <input
                    value={newProject.category}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, category: event.target.value }))}
                    placeholder="Catégorie"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    value={newProject.year}
                    type="number"
                    onChange={(event) => setNewProject((prev) => ({ ...prev, year: Number(event.target.value) }))}
                    placeholder="Année"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    value={newProject.duration}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, duration: event.target.value }))}
                    placeholder="Durée"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    value={newProject.thumbnail}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, thumbnail: event.target.value }))}
                    placeholder="URL thumbnail"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <textarea
                  value={newProject.description}
                  onChange={(event) => setNewProject((prev) => ({ ...prev, description: event.target.value }))}
                  rows={3}
                  placeholder="Description punchy"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    value={newProject.aiTools}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, aiTools: event.target.value }))}
                    placeholder="IA tools (séparés par virgule)"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    value={newProject.deliverables}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, deliverables: event.target.value }))}
                    placeholder="Livrables"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    value={newProject.socialStack}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, socialStack: event.target.value }))}
                    placeholder="Stack social"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start rounded-full border border-cyan-200/40 bg-cyan-500/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                >
                  Ajouter au portfolio
                </button>
              </form>
              <div className="mt-6 grid gap-4 text-sm text-slate-200/70 sm:grid-cols-2">
                {portfolioItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                      <span>{item.category}</span>
                      <button
                        type="button"
                        onClick={() => removePortfolioItem(item.id)}
                        className="text-rose-300 hover:text-rose-200"
                      >
                        Supprimer
                      </button>
                    </div>
                    <p className="mt-2 font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-200/60">{item.tagline}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_20px_100px_rgba(236,72,153,0.18)]">
              <h2 className="text-2xl font-bold">Gestion des tarifs</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {pricingTiers.map((tier) => (
                  <div key={tier.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">{tier.name}</p>
                    <input
                      type="number"
                      className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      value={tier.price}
                      onChange={(event) => updatePricingTier(tier.id, { price: Number(event.target.value) })}
                    />
                    <p className="mt-2 text-xs text-slate-200/60">{tier.description}</p>
                    <p className="mt-2 text-xs text-slate-200/60">{tier.sla}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(56,189,248,0.15)]">
              <h2 className="text-2xl font-bold">Comptes clients</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-200/70">
                {clients.map((client) => (
                  <div key={client.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-xs text-slate-200/60">{client.email}</p>
                      </div>
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                        {client.membership}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/60">{client.company} · {client.industry}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(236,72,153,0.15)]">
              <h2 className="text-2xl font-bold">Demandes de devis</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-200/70">
                {quoteRequests.map((quote) => (
                  <div key={quote.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{quote.projectName}</p>
                        <p className="text-xs text-slate-200/60">{quote.clientName} · {quote.budgetRange}</p>
                      </div>
                      <select
                        value={quote.status}
                        onChange={(event) => advanceQuoteStatus(quote.id, event.target.value as typeof quote.status)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en revue">En revue</option>
                        <option value="validé">Validé</option>
                        <option value="refusé">Refusé</option>
                      </select>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/60">Deadline : {quote.deadline}</p>
                    <p className="mt-2 text-xs text-slate-200/60">Services : {quote.services.join(", ")}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedChatId(quote.id)}
                      className="mt-3 rounded-full border border-cyan-200/40 bg-cyan-500/20 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white"
                    >
                      Ouvrir le chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(34,211,238,0.18)]">
              <h2 className="text-2xl font-bold">Chat style SMS</h2>
              <div className="mt-4 flex gap-4">
                <div className="w-1/3 space-y-2 text-xs text-slate-200/70">
                  {chats.map((thread) => (
                    <button
                      key={thread.quoteId}
                      type="button"
                      onClick={() => setSelectedChatId(thread.quoteId)}
                      className={`w-full rounded-2xl border px-3 py-2 text-left ${
                        thread.quoteId === selectedChatId ? "border-cyan-300 bg-white/20" : "border-white/10 bg-white/5"
                      }`}
                    >
                      <p className="font-semibold text-white">{thread.clientName}</p>
                      <p className="text-[0.65rem] text-slate-200/60">{thread.projectName}</p>
                    </button>
                  ))}
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  {activeChat ? (
                    <div className="flex h-full flex-col">
                      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                        {activeChat.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                              message.from === "studio"
                                ? "ml-auto bg-cyan-500/20 text-cyan-100"
                                : "bg-white/10 text-slate-100"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-200/50">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <input
                          value={chatInput}
                          onChange={(event) => setChatInput(event.target.value)}
                          placeholder="Répondre avec panache"
                          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleSendMessage}
                          className="rounded-full border border-cyan-200/40 bg-cyan-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                        >
                          Envoyer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-200/70">Aucun chat sélectionné.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
