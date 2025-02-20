
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

interface CropOverviewProps {
  cropName: string;
  status: "healthy" | "attention" | "critical";
  plantedDate: string;
  expectedHarvest: string;
}

export const CropOverview = ({
  cropName,
  status,
  plantedDate,
  expectedHarvest,
}: CropOverviewProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "attention":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{cropName}</CardTitle>
        <Leaf className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <Badge variant="secondary" className={getStatusColor()}>
              {status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Planted</p>
              <p className="text-sm font-medium">{plantedDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Harvest</p>
              <p className="text-sm font-medium">{expectedHarvest}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
