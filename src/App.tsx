/**
 * App Root
 * 
 * Handles routing, auth state, dark mode, and Vercel Analytics.
 *
 * Customization:
 *  - To skip Google login during dev, hardcode a user object
 */
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeleteData from "./pages/DeleteData";
import { DonationPage } from "@/components/DonationPage";

const queryClient = new QueryClient();

const SUBDOMAIN_PATHS: Record<string, string> = {
  home:    '/',
  login:   '/login',
  app:     '/app',
  builder: '/app?tab=builder',
  outfits: '/app?tab=outfits',
  donate:  '/donate',
  terms:   '/terms',
  privacy: '/privacy',
  delete:  '/delete',
};

function getSubdomain(): string {
  const parts = window.location.hostname.split('.');
  if (parts.length >= 3 && parts[0] !== 'www') return parts[0];
  return 'home';
}

/** Reads the subdomain on mount and sends React Router to the right page */
function SubdomainRedirector() {
  const navigate = useNavigate();
  useEffect(() => {
    const subdomain = getSubdomain();
    const target = SUBDOMAIN_PATHS[subdomain];
    if (target && target !== '/') {
      const current = window.location.pathname + window.location.search;
      if (!current.startsWith(target.split('?')[0])) {
        navigate(target, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

const App = () => {
  const { user, loading, signIn, signOut } = useGoogleAuth();
  const { darkMode, setDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SubdomainRedirector />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home user={user} onSignIn={signIn} onSignOut={signOut} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/delete" element={<DeleteData />} />

            {/* Auth routes */}
            <Route path="/login" element={
              loading ? null : (
                !user ? (
                  <Login
                    onSignIn={signIn}
                    loading={loading}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    user={user}
                  />
                ) : (
                  <Navigate to="/app" replace />
                )
              )
            } />

            {/* Protected app route */}
            <Route path="/app" element={
              loading ? null : (
                user ? (
                  <Index
                    user={user}
                    onSignOut={signOut}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              )
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
