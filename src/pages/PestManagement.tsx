
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bug, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const PestManagement = () => {
  const { data: pests } = useQuery({
    queryKey: ["pests"],
    queryFn: async () => {
      // Replace with actual API call
      return [
        {
          id: 1,
          name: "Aphids",
          description: "Small sap-sucking insects that can cause significant damage to crops.",
          likelihood: "high",
          severity: "moderate",
          prevention: [
            "Use natural predators like ladybugs",
            "Apply neem oil spray",
            "Maintain proper plant spacing",
          ],
        },
        // Add more pest data
      ];
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Pest Management</h1>
              <p className="mt-2 text-muted-foreground">
                Identify and manage crop pests with AI-powered predictions and prevention strategies.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pests..."
                className="pl-10"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pests?.map((pest) => (
                <Card key={pest.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bug className="h-5 w-5 text-primary" />
                      {pest.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={pest.likelihood === "high" ? "destructive" : "secondary"}>
                        {pest.likelihood} risk
                      </Badge>
                      <Badge variant="outline">{pest.severity} severity</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {pest.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Prevention Methods
                      </h4>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        {pest.prevention.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PestManagement;
