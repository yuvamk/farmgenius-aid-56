
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceData {
  commodity: string;
  price: number;
  trend: "up" | "down" | "stable";
  change: number;
}

interface MarketPricesProps {
  prices: PriceData[];
}

export const MarketPrices = ({ prices }: MarketPricesProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Market Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prices.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0"
            >
              <span className="text-sm font-medium">{item.commodity}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">${item.price}/kg</span>
                {getTrendIcon(item.trend)}
                <span
                  className={`text-xs ${
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
