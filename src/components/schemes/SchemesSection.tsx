
import { useState } from "react";
import { SchemeCard } from "./SchemeCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API call
const fetchSchemes = async () => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Agricultural Scheme ${i + 1}`,
    description: "This scheme provides financial assistance to farmers for adopting modern farming techniques.",
    eligibility: [
      "Small and marginal farmers",
      "Land holding less than 2 hectares",
      "Income below ₹1,00,000 per annum",
    ],
    icon: "/placeholder.svg", // Replace with actual icon
    type: ["Subsidy", "Loan", "Training"][i % 3],
    region: ["National", "State", "District"][i % 3],
    pdfUrl: "#",
    learnMoreUrl: "#",
  }));
};

const schemeTypes = ["All", "Subsidy", "Loan", "Training", "Insurance"];
const regions = ["All", "National", "State", "District"];

export const SchemesSection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: schemes = [], isLoading } = useQuery({
    queryKey: ["schemes", selectedType, selectedRegion],
    queryFn: fetchSchemes,
  });

  const handleNotificationToggle = () => {
    toast({
      title: "Notifications Enabled",
      description: "You will receive updates about new government schemes",
    });
  };

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || scheme.type === selectedType;
    const matchesRegion =
      selectedRegion === "All" || scheme.region === selectedRegion;
    return matchesSearch && matchesType && matchesRegion;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Government Schemes for Farmers</h2>
        <Button
          variant="outline"
          className="hidden sm:flex items-center gap-2"
          onClick={handleNotificationToggle}
        >
          <Bell className="h-4 w-4" />
          Get Notifications
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <ScrollArea className="w-full sm:w-auto">
          <div className="flex gap-2 pb-2">
            <div className="flex gap-2">
              {schemeTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 ml-4">
              {regions.map((region) => (
                <Badge
                  key={region}
                  variant={selectedRegion === region ? "secondary" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} {...scheme} />
        ))}
      </div>
    </section>
  );
};
