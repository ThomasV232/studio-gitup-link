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
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/portfolio" element={<Navigate to="/realisations" replace />} />
              <Route path="/realisations" element={<Portfolio />} />
              <Route path="/realisations/:category" element={<Portfolio />} />
              <Route path="/process" element={<Process />} />
              <Route path="/quote" element={<QuoteBuilder />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/connexion" element={<Navigate to="/auth" replace />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/politique-confidentialite" element={<Privacy />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
