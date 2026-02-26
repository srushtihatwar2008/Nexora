import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HarvestAdvice from "./pages/HarvestAdvice";
import BestMarket from "./pages/BestMarket";
import SpoilageRisk from "./pages/SpoilageRisk";
import WeatherAlert from "./pages/WeatherAlert";
import VoiceMode from "./pages/VoiceMode";
import ProfileSetup from "./pages/ProfileSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/harvest" element={<HarvestAdvice />} />
          <Route path="/market" element={<BestMarket />} />
          <Route path="/spoilage" element={<SpoilageRisk />} />
          <Route path="/weather" element={<WeatherAlert />} />
          <Route path="/voice" element={<VoiceMode />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
