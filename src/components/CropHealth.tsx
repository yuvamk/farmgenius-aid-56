
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { analyzeImage } from "@/utils/imageAnalysis";
import { useToast } from "@/hooks/use-toast";

interface HealthAlert {
  type: "warning" | "error" | "info";
  message: string;
  recommendation: string;
  confidence?: number;
}

export const CropHealth = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageUrl = reader.result as string;
          setSelectedImage(imageUrl);
          await analyzeCropHealth(imageUrl);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeCropHealth = async (imageUrl: string) => {
    setIsAnalyzing(true);
    try {
      const results = await analyzeImage(imageUrl);
      setHealthAlerts(results);
      toast({
        title: "Analysis Complete",
        description: "Your crop has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error analyzing crop health:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Here you would implement the camera capture UI
      // For now, we'll just show a toast
      toast({
        title: "Camera Access",
        description: "Camera capture feature coming soon!",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Crop Health Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <label className="flex items-center justify-center gap-2 cursor-pointer w-full">
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
          <Button variant="outline" className="flex-1" onClick={handleCameraCapture}>
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
        </div>

        {selectedImage && (
          <div className="relative rounded-lg overflow-hidden">
            <img src={selectedImage} alt="Crop" className="w-full h-48 object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white">Analyzing crop health...</div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          {healthAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.type === "error" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                <span>Health Alert</span>
                {alert.confidence && (
                  <Badge variant="secondary">
                    {Math.round(alert.confidence * 100)}% confidence
                  </Badge>
                )}
              </AlertTitle>
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
