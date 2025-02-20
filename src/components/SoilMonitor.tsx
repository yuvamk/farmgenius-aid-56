
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SoilData {
  moisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export const SoilMonitor = () => {
  const soilData: SoilData = {
    moisture: 65,
    ph: 6.5,
    nitrogen: 70,
    phosphorus: 45,
    potassium: 80,
  };

  const getStatusColor = (value: number) => {
    if (value < 30) return "bg-red-500";
    if (value < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Soil Health Monitor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Moisture</span>
              <span className="text-sm text-gray-600">{soilData.moisture}%</span>
            </div>
            <Progress value={soilData.moisture} className={getStatusColor(soilData.moisture)} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">pH Level</span>
              <span className="text-sm text-gray-600">{soilData.ph}</span>
            </div>
            <Progress value={soilData.ph * 10} className="bg-blue-500" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Nitrogen (N)</span>
              <span className="text-sm text-gray-600">{soilData.nitrogen}%</span>
            </div>
            <Progress value={soilData.nitrogen} className={getStatusColor(soilData.nitrogen)} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Phosphorus (P)</span>
              <span className="text-sm text-gray-600">{soilData.phosphorus}%</span>
            </div>
            <Progress value={soilData.phosphorus} className={getStatusColor(soilData.phosphorus)} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Potassium (K)</span>
              <span className="text-sm text-gray-600">{soilData.potassium}%</span>
            </div>
            <Progress value={soilData.potassium} className={getStatusColor(soilData.potassium)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
