
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CloudLightning, Thermometer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface WeatherAlertsProps {
  location: {
    lat: number;
    lon: number;
  };
}

interface WeatherAlert {
  type: string;
  severity: "warning" | "severe" | "moderate";
  title: string;
  description: string;
  icon: typeof AlertTriangle;
}

export const WeatherAlerts = ({ location }: WeatherAlertsProps) => {
  const { data: alerts } = useQuery({
    queryKey: ["weatherAlerts", location],
    queryFn: async () => {
      // Replace with actual API call
      return [
        {
          type: "storm",
          severity: "severe" as const,
          title: "Thunderstorm Warning",
          description: "Severe thunderstorm expected in your area within 24 hours.",
          icon: CloudLightning,
        },
        {
          type: "heat",
          severity: "warning" as const,
          title: "Heat Advisory",
          description: "High temperatures may affect crop growth. Consider additional irrigation.",
          icon: Thermometer,
        },
      ];
    },
  });

  const getSeverityColor = (severity: WeatherAlert["severity"]) => {
    switch (severity) {
      case "severe":
        return "bg-destructive/10 text-destructive dark:bg-destructive/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20";
      default:
        return "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts?.length ? (
          alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <Alert key={index} className={getSeverityColor(alert.severity)}>
                <Icon className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground">No active weather alerts</p>
        )}
      </CardContent>
    </Card>
  );
};
