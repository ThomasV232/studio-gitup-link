--- a/Dashboard.tsx
+++ b/Dashboard.tsx
@@ -1,4 +1,3 @@
-<<<<<<< codex/create-futuristic-videographer-website-f21lxn
 import { FormEvent, useMemo, useState, useCallback, useEffect } from "react";
 import { Link } from "react-router-dom";
 import { useStudio } from "@/context/StudioContext";
 import type { QuoteRequest } from "@/context/StudioContext";
@@
 const getTimeValue = (value: string) => {
   const date = new Date(value);
   return Number.isNaN(date.getTime()) ? 0 : date.getTime();
 };
-
-=======
-import { FormEvent, useMemo, useState, useCallback } from "react";
-import { useStudio } from "@/context/StudioContext";
-
-const ADMIN_EMAIL = "volberg.thomas@gmail.com";
-
->>>>>>> main
 type PortfolioDraft = {
   title: string;
   tagline: string;
@@
   } = useStudio();
 
-<<<<<<< codex/create-futuristic-videographer-website-f21lxn
   const isAdmin = user?.email === ADMIN_EMAIL;
 
   const userId = user?.id ?? null;
@@
   const handleClientSendMessage = (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     if (!clientActiveChat || !clientChatInput.trim()) return;
     appendChatMessage(clientActiveChat.quoteId, { from: "client", content: clientChatInput.trim() });
     setClientChatInput("");
   };
-=======
-    const [newProject, setNewProject] = useState<PortfolioDraft>(() => getDefaultProject(serviceCategories));
-    const [chatInput, setChatInput] = useState("");
-    const [selectedChatId, setSelectedChatId] = useState(() => chats[0]?.quoteId ?? "");
-    const [youtubeUrl, setYoutubeUrl] = useState("");
-    const [isImportingMetadata, setIsImportingMetadata] = useState(false);
-    const [metadataError, setMetadataError] = useState<string | null>(null);
-    const [editDraft, setEditDraft] = useState<(PortfolioDraft & { id: string }) | null>(null);
-
-  const activeChat = useMemo(() => chats.find((chat) => chat.quoteId === selectedChatId), [chats, selectedChatId]);
-  const isAdmin = user?.email === ADMIN_EMAIL;
->>>>>>> main
 
   const resetNewProject = () => {
     setNewProject(getDefaultProject(serviceCategories));
     setYoutubeUrl("");
     setMetadataError(null);
@@
   if (!user) {
     return null;
   }
 
   if (!isAdmin) {
-<<<<<<< codex/create-futuristic-videographer-website-f21lxn
     const hasQuotes = myQuotes.length > 0;
     const statusSequence = STATUS_STEPS.map((step) => step.key);
     const timelineIndex = selectedClientQuote
       ? selectedClientQuote.status === "refusé"
         ? statusSequence.indexOf("en revue")
         : statusSequence.indexOf(selectedClientQuote.status as QuoteStep)
       : -1;
@@
           </section>
-=======
-    return (
-      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
-        <div className="max-w-lg space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-12">
-          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70 visual-accent-text">Accès restreint</p>
-          <h1 className="text-4xl font-black leading-tight">Ce tableau de bord est réservé à l'équipe Studio VBG.</h1>
-          <p className="text-lg text-slate-200/80">
-            Connectez-vous avec le compte administrateur pour gérer le portfolio, les devis et les échanges clients.
-          </p>
->>>>>>> main
         </div>
       </div>
     );
   }
