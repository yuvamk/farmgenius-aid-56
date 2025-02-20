
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface HealthAlert {
  type: "warning" | "error" | "info";
  message: string;
  recommendation: string;
}

export const CropHealth = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([
    {
      type: "warning",
      message: "Possible nutrient deficiency detected",
      recommendation: "Consider applying nitrogen-rich fertilizer",
    },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeCropHealth();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCropHealth = () => {
    setIsAnalyzing(true);
    // Here we would integrate with AI model for analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Crop Health Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </Button>
          <Button variant="outline" className="flex-1">
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
        </div>

        {selectedImage && (
          <div className="relative rounded-lg overflow-hidden">
            <img src={selectedImage} alt="Crop" className="w-full h-48 object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white">Analyzing...</div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          {healthAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === "error" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Health Alert</AlertTitle>
              <AlertDescription>
                <p>{alert.message}</p>
                <p className="text-sm mt-1 font-medium">{alert.recommendation}</p>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
