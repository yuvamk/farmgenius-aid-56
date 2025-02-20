
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "./ui/button";

interface PriceData {
  commodity: string;
  price: number;
  trend: "up" | "down" | "stable";
  change: number;
}

interface MarketPricesProps {
  prices: PriceData[];
}

// Sample data for the chart
const chartData = [
  { name: 'Jan', Wheat: 300, Corn: 170, Soybeans: 400 },
  { name: 'Feb', Wheat: 310, Corn: 175, Soybeans: 410 },
  { name: 'Mar', Wheat: 320, Corn: 180, Soybeans: 420 },
  { name: 'Apr', Wheat: 350, Corn: 190, Soybeans: 450 },
  { name: 'May', Wheat: 340, Corn: 185, Soybeans: 440 },
  // Predicted values
  { name: 'Jun', Wheat: 360, Corn: 195, Soybeans: 460, predicted: true },
  { name: 'Jul', Wheat: 380, Corn: 200, Soybeans: 480, predicted: true },
];

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}
              {entry.payload.predicted && ' (Predicted)'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Market Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Prices */}
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

          {/* Price Chart */}
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="Wheat" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Corn" 
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Soybeans" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sell Suggestions */}
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 animate-pulse">
            <div className="flex items-center gap-2 text-green-700">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Sell Suggestion</span>
            </div>
            <p className="mt-2 text-sm text-green-600">
              Optimal selling time for Wheat approaching. Prices predicted to peak in July.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
