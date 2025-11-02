
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area,
  Legend,
  LabelList,
  ReferenceLine,
} from "recharts";

const CreditDistributionChart = () => {
  const data = [
    { rating: "AAA", count: 145, percentage: 12.1, cumulative: 12.1 },
    { rating: "AA", count: 98, percentage: 8.2, cumulative: 20.3 },
    { rating: "A", count: 187, percentage: 15.6, cumulative: 35.9 },
    { rating: "BBB", count: 234, percentage: 19.5, cumulative: 55.4 },
    { rating: "BB", count: 189, percentage: 15.8, cumulative: 71.2 },
    { rating: "B", count: 156, percentage: 13.0, cumulative: 84.2 },
    { rating: "CCC", count: 98, percentage: 8.2, cumulative: 92.4 },
    { rating: "Below CCC", count: 91, percentage: 7.6, cumulative: 100.0 },
  ];

  const avgCount = Math.round(
    data.reduce((total, current) => total + current.count, 0) / data.length
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Credit Rating Distribution</CardTitle>
        <p className="text-sm text-gray-600">Visualise concentration by rating and cumulative share</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 24, right: 24, left: 16, bottom: 8 }}>
              <defs>
                <linearGradient id="ratingDistribution" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="ratingArea" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis
                dataKey="rating"
                tick={{ fontSize: 12, fill: "#4b5563" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: "#4b5563" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                label={{ value: "Count", angle: -90, position: "insideLeft", fill: "#6b7280" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "#4b5563" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                label={{ value: "Cumulative %", angle: 90, position: "insideRight", fill: "#6b7280" }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "count") return [value, "Customers"];
                  if (name === "percentage") return [`${value}%`, "Portfolio Share"];
                  if (name === "cumulative") return [`${value}%`, "Cumulative"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Rating: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 40px -24px rgba(15, 23, 42, 0.45)",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <ReferenceLine yAxisId="left" y={avgCount} stroke="#94a3b8" strokeDasharray="6 6" label={{ value: `Avg ${avgCount}`, position: "insideTopRight", fill: "#64748b" }} />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                fill="url(#ratingArea)"
                stroke="#10b981"
                strokeWidth={2}
                name="Portfolio share"
                dot={{ r: 3, fill: "#10b981" }}
              />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="url(#ratingDistribution)"
                radius={[8, 8, 0, 0]}
                name="Customers"
              >
                <LabelList dataKey="count" position="top" fill="#1f2937" formatter={(value: number) => value.toLocaleString()} />
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulative"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                name="Cumulative"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDistributionChart;
