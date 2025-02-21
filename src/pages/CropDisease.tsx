
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CropHealth } from "@/components/CropHealth";
import { Separator } from "@/components/ui/separator";

const CropDisease = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Crop Disease Detection</h1>
            <p className="text-muted-foreground">
              Upload images of your crops for AI-powered disease detection and get instant treatment recommendations.
            </p>
            <Separator />
            <CropHealth />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CropDisease;
