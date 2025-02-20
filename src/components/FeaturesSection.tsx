
import { Leaf, CloudSun, Bug, BarChart, Droplet, LineChart } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Crop Health Monitor",
    description: "Real-time monitoring of crop health using advanced AI analysis",
  },
  {
    icon: <CloudSun className="h-8 w-8 text-primary" />,
    title: "Weather Prediction",
    description: "Accurate weather forecasts to plan your farming activities",
  },
  {
    icon: <Bug className="h-8 w-8 text-primary" />,
    title: "Pest Management",
    description: "Early detection and prevention of pest infestations",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Market Analysis",
    description: "Real-time market prices and trend predictions",
  },
  {
    icon: <Droplet className="h-8 w-8 text-primary" />,
    title: "Smart Irrigation",
    description: "Optimize water usage with AI-powered irrigation scheduling",
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: "Yield Optimization",
    description: "Data-driven insights to maximize your crop yield",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600">Empowering farmers with smart technology</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-block group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
