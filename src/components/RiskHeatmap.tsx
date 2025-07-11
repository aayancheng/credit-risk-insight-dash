
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RiskHeatmap = () => {
  const ratings = ['AAA', 'AA', 'A', 'BBB', 'BB'];
  const exposureBands = ['> $5M', '$2-5M', '$1-2M', '$500K-1M', '< $500K'];
  
  // Mock data for heatmap - each cell represents count of customers
  const heatmapData = [
    [5, 12, 23, 45, 78],
    [8, 18, 34, 67, 89],
    [12, 25, 48, 89, 134],
    [18, 34, 67, 123, 189],
    [25, 45, 78, 156, 234]
  ];

  const getIntensity = (value: number) => {
    const max = Math.max(...heatmapData.flat());
    const intensity = value / max;
    
    if (intensity > 0.8) return 'bg-red-500';
    if (intensity > 0.6) return 'bg-red-400';
    if (intensity > 0.4) return 'bg-orange-400';
    if (intensity > 0.2) return 'bg-yellow-400';
    if (intensity > 0.1) return 'bg-green-400';
    return 'bg-green-200';
  };

  const getTextColor = (value: number) => {
    const max = Math.max(...heatmapData.flat());
    const intensity = value / max;
    return intensity > 0.4 ? 'text-white' : 'text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Risk Heatmap</CardTitle>
        <p className="text-sm text-gray-600">Exposure vs Credit Rating matrix</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Header row */}
          <div className="grid grid-cols-6 gap-1">
            <div className="p-2 text-xs font-medium text-gray-600">Rating / Exposure</div>
            {exposureBands.map((band, index) => (
              <div key={index} className="p-2 text-xs font-medium text-gray-600 text-center">
                {band}
              </div>
            ))}
          </div>
          
          {/* Data rows */}
          {ratings.map((rating, ratingIndex) => (
            <div key={rating} className="grid grid-cols-6 gap-1">
              <div className="p-2 text-xs font-medium text-gray-600 flex items-center">
                {rating}
              </div>
              {heatmapData[ratingIndex].map((value, exposureIndex) => (
                <div
                  key={exposureIndex}
                  className={`p-2 text-xs font-medium text-center rounded transition-colors hover:opacity-80 cursor-pointer ${getIntensity(value)} ${getTextColor(value)}`}
                  title={`${rating} rating, ${exposureBands[exposureIndex]}: ${value} customers`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
          <span>Low Risk</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <div className="w-4 h-4 bg-red-500 rounded"></div>
          </div>
          <span>High Risk</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;
