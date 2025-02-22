
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/lib/supabase";

const FarmSettings = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    weatherAlerts: true,
    marketPriceAlerts: true,
    irrigationSchedule: "06:00",
    harvestDate: "",
    soilMoistureThreshold: "30",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('farm_settings')
        .upsert({
          user_id: user?.id,
          ...settings,
        });

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: "Your farm settings have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Farm Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Enable Notifications</label>
                      <p className="text-sm text-muted-foreground">
                        Receive general notifications about your farm
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, notifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Weather Alerts</label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about important weather changes
                      </p>
                    </div>
                    <Switch
                      checked={settings.weatherAlerts}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, weatherAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Market Price Alerts</label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about market price changes
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketPriceAlerts}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, marketPriceAlerts: checked })
                      }
                    />
                  </div>
                </div>

                {/* Schedule Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Irrigation Schedule
                      </label>
                      <Input
                        type="time"
                        value={settings.irrigationSchedule}
                        onChange={(e) =>
                          setSettings({ ...settings, irrigationSchedule: e.target.value })
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Expected Harvest Date
                      </label>
                      <Input
                        type="date"
                        value={settings.harvestDate}
                        onChange={(e) =>
                          setSettings({ ...settings, harvestDate: e.target.value })
                        }
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Monitoring Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Monitoring Settings</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Soil Moisture Threshold (%)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.soilMoistureThreshold}
                      onChange={(e) =>
                        setSettings({ ...settings, soilMoistureThreshold: e.target.value })
                      }
                      disabled={isLoading}
                    />
                    <p className="text-sm text-muted-foreground">
                      Alert when soil moisture falls below this percentage
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmSettings;
