
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RiskHeatmap = () => {
  const ratings = ["AAA", "AA", "A", "BBB", "BB"];
  const exposureBands = ["> $5M", "$2-5M", "$1-2M", "$500K-1M", "< $500K"];

  // Mock data for heatmap - each cell represents count of customers
  const heatmapData = [
    [5, 12, 23, 45, 78],
    [8, 18, 34, 67, 89],
    [12, 25, 48, 89, 134],
    [18, 34, 67, 123, 189],
    [25, 45, 78, 156, 234],
  ];

  const maxValue = Math.max(...heatmapData.flat());

  const getCellStyle = (value: number) => {
    const intensity = value / maxValue;
    const hue = 155 - intensity * 120;
    const saturation = 75 + intensity * 10;
    const lightness = 55 - intensity * 20;

    return {
      background: `linear-gradient(135deg, hsla(${hue}, ${saturation}%, ${lightness}%, 0.95), hsla(${hue - 10}, ${saturation}%, ${lightness - 8}%, 0.95))`,
      color: intensity > 0.45 ? "#f8fafc" : "#0f172a",
      boxShadow: intensity > 0.35 ? "inset 0 0 0 1px rgba(15, 23, 42, 0.1)" : "inset 0 0 0 1px rgba(15, 23, 42, 0.04)",
    };
  };

  const getSummary = () => {
    const highestRowIndex = heatmapData.reduce((highestIndex, row, index, arr) => {
      const rowTotal = row.reduce((sum, value) => sum + value, 0);
      const highestTotal = arr[highestIndex].reduce((sum, value) => sum + value, 0);
      return rowTotal > highestTotal ? index : highestIndex;
    }, 0);

    const highestSegment = heatmapData.reduce(
      (best, row, ratingIndex) => {
        let currentBest = best;
        row.forEach((value, bandIndex) => {
          if (value > currentBest.value) {
            currentBest = { value, ratingIndex, bandIndex };
          }
        });
        return currentBest;
      },
      { value: Number.NEGATIVE_INFINITY, ratingIndex: 0, bandIndex: 0 }
    );

    return `Largest customer volume is concentrated in ${ratings[highestRowIndex]} with the ${exposureBands[highestSegment.bandIndex]} band peaking at ${highestSegment.value} customers.`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Risk Heatmap</CardTitle>
        <p className="text-sm text-gray-600">Exposure vs credit rating matrix with intensity-driven insights</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 shadow-inner">
          <div className="grid grid-cols-[120px_repeat(5,_minmax(0,_1fr))] divide-x divide-slate-200/70 text-xs font-medium uppercase tracking-wide text-slate-500">
            <div className="bg-white/80 px-3 py-3 text-left">Rating / Exposure</div>
            {exposureBands.map((band) => (
              <div key={band} className="bg-white/60 px-3 py-3 text-center">
                {band}
              </div>
            ))}
          </div>
          <div className="divide-y divide-slate-200/70 text-sm">
            {ratings.map((rating, ratingIndex) => (
              <div key={rating} className="grid grid-cols-[120px_repeat(5,_minmax(0,_1fr))]">
                <div className="flex items-center bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {rating}
                </div>
                {heatmapData[ratingIndex].map((value, exposureIndex) => (
                  <button
                    type="button"
                    key={`${rating}-${exposureIndex}`}
                    className="flex min-h-[48px] items-center justify-center px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/20"
                    style={getCellStyle(value)}
                    title={`${rating} rating, ${exposureBands[exposureIndex]}: ${value} customers`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wide text-slate-400">Legend</span>
            <div className="flex items-center gap-1">
              {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((intensity) => {
                const style = getCellStyle(maxValue * intensity);
                return <span key={intensity} className="h-3 w-6 rounded-full" style={{ background: style.background }} />;
              })}
            </div>
            <span>Low risk → High risk</span>
          </div>
          <p className="text-xs text-slate-600">{getSummary()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;
