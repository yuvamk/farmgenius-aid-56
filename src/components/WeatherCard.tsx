
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Droplet, Sun, Wind } from "lucide-react";
import { useState } from "react";

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

const forecast = [
  { day: "Today", temp: 24, condition: "sunny" },
  { day: "Tomorrow", temp: 22, condition: "cloudy" },
  { day: "Wed", temp: 19, condition: "rain" },
  { day: "Thu", temp: 21, condition: "sunny" },
  { day: "Fri", temp: 23, condition: "sunny" },
  { day: "Sat", temp: 20, condition: "cloudy" },
  { day: "Sun", temp: 18, condition: "rain" },
];

export const WeatherCard = ({ temperature, humidity, windSpeed, condition }: WeatherCardProps) => {
  const [showForecast, setShowForecast] = useState(false);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="h-6 w-6 text-primary" />;
      case "sunny":
        return <Sun className="h-6 w-6 text-primary" />;
      case "cloudy":
        return <Wind className="h-6 w-6 text-primary" />;
      default:
        return <CloudRain className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Current Weather</CardTitle>
        {getWeatherIcon(condition)}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
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

        <button 
          onClick={() => setShowForecast(!showForecast)}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {showForecast ? "Hide" : "Show"} 7-day forecast
        </button>

        {showForecast && (
          <div className="mt-4 grid grid-cols-7 gap-2">
            {forecast.map((day, index) => (
              <div 
                key={day.day}
                className="text-center animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                {getWeatherIcon(day.condition)}
                <div className="text-sm font-medium mt-1">{day.temp}°</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
