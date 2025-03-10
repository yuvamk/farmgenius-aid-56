
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import WeatherForecast from "./pages/WeatherForecast";
import CropDisease from "./pages/CropDisease";
import PestManagement from "./pages/PestManagement";
import MarketPrices from "./pages/MarketPrices";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import FarmSettings from "./pages/FarmSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weather-forecast" element={<WeatherForecast />} />
            <Route path="/crop-disease" element={<CropDisease />} />
            <Route path="/pest-management" element={<PestManagement />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/farm-settings" element={<FarmSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
