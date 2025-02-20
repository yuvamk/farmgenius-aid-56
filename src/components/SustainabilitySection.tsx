
import { Leaf, Recycle, Sun, Droplet } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";

const sustainabilityTips = [
  {
    icon: <Leaf />,
    title: "Organic Farming",
    description: "Implement natural farming practices to maintain soil health and biodiversity",
  },
  {
    icon: <Recycle />,
    title: "Crop Rotation",
    description: "Rotate crops to improve soil nutrients and prevent pest buildup",
  },
  {
    icon: <Sun />,
    title: "Solar Power",
    description: "Utilize solar energy for irrigation and farm operations",
  },
  {
    icon: <Droplet />,
    title: "Water Conservation",
    description: "Implement drip irrigation and rainwater harvesting techniques",
  },
];

export const SustainabilitySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="sustainability" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainable Farming</h2>
          <p className="text-lg text-gray-600">Eco-friendly practices for better farming</p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory">
            {sustainabilityTips.map((tip, index) => (
              <Card
                key={index}
                className={`flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center
                  transition-all duration-300 hover:shadow-lg
                  ${activeIndex === index ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {tip.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {sustainabilityTips.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${activeIndex === index ? 'bg-primary w-4' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
