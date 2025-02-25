
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, CloudDrizzle, CloudRain, Sun, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
  const { data: forecast, isError } = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: JSON.stringify(location)
      });

      if (error) throw error;

      // Process the 7-day forecast data
      return data.forecast.list
        .filter((_: any, index: number) => index % 8 === 0) // Get one reading per day
        .slice(0, 7) // Get 7 days
        .map((day: any) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          temperature: {
            min: Math.round(day.main.temp_min),
            max: Math.round(day.main.temp_max),
          },
          condition: day.weather[0].main,
          precipitation: Math.round(day.pop * 100), // Probability of precipitation
        }));
    },
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="h-8 w-8 text-primary" />;
      case "clouds":
        return <Cloud className="h-8 w-8 text-primary" />;
      case "drizzle":
        return <CloudDrizzle className="h-8 w-8 text-primary" />;
      default:
        return <Sun className="h-8 w-8 text-primary" />;
    }
  };

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Unable to load weather forecast data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full pb-4">
          <div className="flex gap-6 min-w-max">
            {forecast?.map((day: ForecastDay, index: number) => (
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
