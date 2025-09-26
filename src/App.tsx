import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Playground from "./pages/Playground";
import Portfolio from "./pages/Portfolio";
import Process from "./pages/Process";
import QuoteBuilder from "./pages/QuoteBuilder";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";

import { StudioProvider } from "./context/StudioContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HeaderRoot } from "./components/header/HeaderRoot";
import { SiteFooter } from "./components/footer/SiteFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StudioProvider>
        <BrowserRouter>
          <HeaderRoot />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            {/* Playground */}
            <Route path="/playground" element={<Playground />} />
            {/* Portfolio (alias SEO) */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/realisations" element={<Portfolio />} />
            <Route path="/realisations/:category" element={<Portfolio />} />
            {/* Process & Quote */}
            <Route path="/process" element={<Process />} />
            <Route path="/quote" element={<QuoteBuilder />} />
            {/* À propos & Contact */}
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Auth (alias SEO) */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/connexion" element={<Auth />} />
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
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SiteFooter />
        </BrowserRouter>
      </StudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

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
          <SiteFooter />
        </BrowserRouter>
      </StudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
