
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, CloudRain, Wind, Droplets, ThermometerSun } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CurrentWeatherProps {
  location: {
    lat: number;
    lon: number;
  };
}

export const CurrentWeather = ({ location }: CurrentWeatherProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      // Replace with actual API call to OpenWeatherMap
      return {
        temperature: 24,
        humidity: 65,
        windSpeed: 12,
        condition: "Clear",
        feelsLike: 26,
      };
    },
  });

  if (isLoading) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-primary" />
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-2xl font-bold">{data?.temperature}°C</p>
              <p className="text-sm text-muted-foreground">
                Feels like {data?.feelsLike}°C
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-2xl font-bold">{data?.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-2xl font-bold">{data?.windSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Condition</p>
              <p className="text-2xl font-bold">{data?.condition}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
