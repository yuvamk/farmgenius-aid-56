
import { WeatherCard } from "@/components/WeatherCard";
import { CropOverview } from "@/components/CropOverview";
import { MarketPrices } from "@/components/MarketPrices";
import { CropHealth } from "@/components/CropHealth";
import { SoilMonitor } from "@/components/SoilMonitor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  // Sample data - in a real app, this would come from an API
  const weatherData = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: "sunny",
  };

  const cropData = {
    cropName: "Wheat",
    status: "healthy" as const,
    plantedDate: "2024-01-15",
    expectedHarvest: "2024-06-15",
  };

  const marketPrices = {
    prices: [
      { commodity: "Wheat", price: 320, trend: "up" as const, change: 2.5 },
      { commodity: "Corn", price: 180, trend: "down" as const, change: 1.2 },
      { commodity: "Soybeans", price: 420, trend: "up" as const, change: 3.1 },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard {...weatherData} />
          <CropOverview {...cropData} />
          <MarketPrices {...marketPrices} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CropHealth />
          <SoilMonitor />
        </div>
      </div>

      <SustainabilitySection />
      <Footer />
    </div>
  );
};

export default Index;
