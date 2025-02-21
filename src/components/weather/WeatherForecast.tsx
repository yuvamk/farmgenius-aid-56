
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, CloudDrizzle, CloudRain, Sun, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface WeatherForecastProps {
  location: {
    lat: number;
    lon: number;
  };
}

interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  precipitation: number;
}

export const WeatherForecast = ({ location }: WeatherForecastProps) => {
  const { data: forecast } = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      // Replace with actual API call to OpenWeatherMap
      return Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        temperature: {
          min: Math.round(15 + Math.random() * 5),
          max: Math.round(25 + Math.random() * 5),
        },
        condition: ["Clear", "Rain", "Cloudy"][Math.floor(Math.random() * 3)],
        precipitation: Math.round(Math.random() * 100),
      }));
    },
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="h-8 w-8 text-primary" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-primary" />;
      case "drizzle":
        return <CloudDrizzle className="h-8 w-8 text-primary" />;
      default:
        return <Sun className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full pb-4">
          <div className="flex gap-6 min-w-max">
            {forecast?.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium">{day.date}</span>
                {getWeatherIcon(day.condition)}
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium">
                    {day.temperature.max}° / {day.temperature.min}°
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {day.condition}
                  </div>
                  {day.precipitation > 60 && (
                    <div className="flex items-center gap-1 text-yellow-600 mt-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs">High precipitation</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
