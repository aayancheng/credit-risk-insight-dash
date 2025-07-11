
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const CreditDistributionChart = () => {
  const data = [
    { rating: 'AAA', count: 145, percentage: 12.1, cumulative: 12.1 },
    { rating: 'AA', count: 98, percentage: 8.2, cumulative: 20.3 },
    { rating: 'A', count: 187, percentage: 15.6, cumulative: 35.9 },
    { rating: 'BBB', count: 234, percentage: 19.5, cumulative: 55.4 },
    { rating: 'BB', count: 189, percentage: 15.8, cumulative: 71.2 },
    { rating: 'B', count: 156, percentage: 13.0, cumulative: 84.2 },
    { rating: 'CCC', count: 98, percentage: 8.2, cumulative: 92.4 },
    { rating: 'Below CCC', count: 91, percentage: 7.6, cumulative: 100.0 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Credit Rating Distribution</CardTitle>
        <p className="text-sm text-gray-600">Portfolio breakdown by credit rating</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="rating" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
                label={{ value: 'Cumulative %', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'count') return [value, 'Count'];
                  if (name === 'cumulative') return [`${value}%`, 'Cumulative %'];
                  return [value, name];
                }}
                labelFormatter={(label) => `Rating: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                yAxisId="left"
                dataKey="count" 
                fill="#3b82f6" 
                radius={[2, 2, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulative" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDistributionChart;
