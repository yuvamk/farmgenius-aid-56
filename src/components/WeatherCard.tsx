
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Droplet, Sun, Wind } from "lucide-react";

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export const WeatherCard = ({ temperature, humidity, windSpeed, condition }: WeatherCardProps) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="h-6 w-6 text-primary" />;
      case "sunny":
        return <Sun className="h-6 w-6 text-primary" />;
      default:
        return <CloudRain className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Current Weather</CardTitle>
        {getWeatherIcon()}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium capitalize">{condition}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
