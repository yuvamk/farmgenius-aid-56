
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketPrices as MarketPricesSection } from "@/components/MarketPrices";

const MarketPrices = () => {
  const marketPrices = {
    prices: [
      { commodity: "Wheat", price: 320, trend: "up" as const, change: 2.5 },
      { commodity: "Corn", price: 180, trend: "down" as const, change: 1.2 },
      { commodity: "Soybeans", price: 420, trend: "up" as const, change: 3.1 },
      { commodity: "Rice", price: 280, trend: "up" as const, change: 1.8 },
      { commodity: "Cotton", price: 150, trend: "down" as const, change: 0.9 },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Market Prices</h1>
              <p className="mt-2 text-muted-foreground">
                Stay updated with real-time crop prices and market trends
              </p>
            </div>
            <MarketPricesSection {...marketPrices} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketPrices;
