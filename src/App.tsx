import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

// Reset scroll to top on every route change (react-router does not do this).
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Root layout shared by every route. The router is provided by vite-react-ssg
// (BrowserRouter on the client, static routing during prerender), so this only
// supplies app-wide providers and renders the active route via <Outlet />.
const App = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.opacity = "1";
      root.style.transition = "opacity 0.45s ease-out";
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CustomCursor />
          <ScrollToTop />
          <Outlet />
        </TooltipProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
};

export default App;
