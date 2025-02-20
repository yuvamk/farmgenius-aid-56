
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/farm-bg.jpg')] bg-cover bg-center opacity-10 bg-animate" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-white" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
          Empower Your Farming with AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Get real-time insights on crop health, weather, and market trends
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            className="min-w-[200px] group bg-primary hover:bg-primary/90 button-glow transition-transform hover:scale-105 duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="min-w-[200px] hover:bg-primary/5 hover:border-primary/20 transition-colors"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
