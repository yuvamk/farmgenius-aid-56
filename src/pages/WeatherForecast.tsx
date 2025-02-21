
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WeatherMap } from "@/components/weather/WeatherMap";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { WeatherForecast } from "@/components/weather/WeatherForecast";
import { WeatherAlerts } from "@/components/weather/WeatherAlerts";
import { AlertTriangle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoadingAnimation } from "@/components/ui/loading-animation";

interface Location {
  lat: number;
  lon: number;
  name: string;
}

const WeatherForecastPage = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Request location permission and get coordinates
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Here you would typically make an API call to get the location name
            // from the coordinates using a geocoding service
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              name: "Your Location", // Replace with actual location name
            });
          } catch (error) {
            console.error("Error getting location:", error);
            toast({
              title: "Location Error",
              description: "Unable to determine your location. Please enter it manually.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access or enter your location manually.",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Weather Forecast</h1>
              {location && (
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location.name}</span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Location Update",
                  description: "Location manually updated.",
                });
              }}
            >
              Update Location
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingAnimation type="spinner" size="lg" text="Loading weather data..." />
            </div>
          ) : location ? (
            <div className="space-y-8">
              <WeatherMap location={location} />
              
              <div className="grid gap-8 md:grid-cols-2">
                <CurrentWeather location={location} />
                <WeatherAlerts location={location} />
              </div>
              
              <WeatherForecast location={location} />
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Location Required</AlertTitle>
              <AlertDescription>
                Please enable location access or enter your location manually to view weather forecasts.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WeatherForecastPage;
