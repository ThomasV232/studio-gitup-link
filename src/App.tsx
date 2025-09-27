import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { StudioProvider } from "./context/StudioContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HeaderRoot } from "./components/header/HeaderRoot";
import { SiteFooter } from "./components/footer/SiteFooter";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Playground = lazy(() => import("./pages/Playground"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Process = lazy(() => import("./pages/Process"));
const QuoteBuilder = lazy(() => import("./pages/QuoteBuilder"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-slate-200">
    <div className="flex flex-col items-center gap-3">
      <span className="inline-flex h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-white/10 border-t-white" />
      <p className="text-sm uppercase tracking-[0.4em] text-white/60">Chargement</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StudioProvider>
        <BrowserRouter>
          <HeaderRoot />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Services */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />

              {/* Playground */}
              <Route path="/playground" element={<Playground />} />

              {/* Portfolio + alias SEO */}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:category" element={<Portfolio />} />
              <Route path="/realisations" element={<Navigate to="/portfolio" replace />} />
              <Route path="/realisations/:category" element={<Portfolio />} />

              {/* Process & Devis */}
              <Route path="/process" element={<Process />} />
              <Route path="/quote" element={<QuoteBuilder />} />

              {/* À propos & Contact */}
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />

              {/* Auth + alias */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/connexion" element={<Navigate to="/auth" replace />} />

              {/* Légal */}
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/politique-confidentialite" element={<Privacy />} />

              {/* Dashboard protégé */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <SiteFooter />
        </BrowserRouter>
      </StudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
