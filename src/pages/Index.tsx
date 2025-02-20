
import { WeatherCard } from "@/components/WeatherCard";
import { CropOverview } from "@/components/CropOverview";
import { MarketPrices } from "@/components/MarketPrices";

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
    <div className="min-h-screen bg-gradient-to-b from
-gray-50 to-white p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FarmGenius</h1>
          <p className="text-gray-600">Your AI-Powered Farming Assistant</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard {...weatherData} />
          <CropOverview {...cropData} />
          <MarketPrices {...marketPrices} />
        </div>
      </div>
    </div>
  );
};

export default Index;
