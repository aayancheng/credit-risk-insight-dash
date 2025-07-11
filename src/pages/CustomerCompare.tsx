import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart } from 'recharts';

const CustomerCompare = () => {
  const [searchParams] = useSearchParams();
  const customer1Id = searchParams.get('customer1') || 'xyz-corporation';
  const customer2Id = searchParams.get('customer2') || 'abc-industries';
  
  // Mock data - would come from API
  const customerData = {
    'xyz-corporation': {
      name: 'XYZ Corporation',
      exposure: 4000000,
      rating: 'BBB',
      pd: 1.2,
      lgd: 40,
      expectedLoss: 19200,
      sector: 'Technology',
      region: 'North America',
      utilization: 75,
      limit: 5000000,
      financialMetrics: {
        currentRatio: 2.1,
        debtToEquity: 0.45,
        returnOnEquity: 12.5,
        interestCoverage: 4.2,
        profitMargin: 8.5,
        assetTurnover: 1.2
      }
    },
    'abc-industries': {
      name: 'ABC Industries Ltd',
      exposure: 2500000,
      rating: 'A',
      pd: 0.8,
      lgd: 35,
      expectedLoss: 7000,
      sector: 'Manufacturing',
      region: 'Europe',
      utilization: 60,
      limit: 3000000,
      financialMetrics: {
        currentRatio: 2.8,
        debtToEquity: 0.32,
        returnOnEquity: 15.2,
        interestCoverage: 6.1,
        profitMargin: 12.1,
        assetTurnover: 1.5
      }
    },
    'global-services': {
      name: 'Global Services Inc',
      exposure: 1800000,
      rating: 'BB',
      pd: 2.1,
      lgd: 45,
      expectedLoss: 17010,
      sector: 'Services',
      region: 'Asia Pacific',
      utilization: 85,
      limit: 2200000,
      financialMetrics: {
        currentRatio: 1.8,
        debtToEquity: 0.65,
        returnOnEquity: 8.9,
        interestCoverage: 2.8,
        profitMargin: 6.2,
        assetTurnover: 1.1
      }
    }
  };

  const customer1 = customerData[customer1Id as keyof typeof customerData];
  const customer2 = customerData[customer2Id as keyof typeof customerData];

  if (!customer1 || !customer2) {
    return <div className="p-6">One or both customers not found</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingColor = (rating: string) => {
    const colors: { [key: string]: string } = {
      'AAA': 'bg-green-100 text-green-800',
      'AA': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'BBB': 'bg-yellow-100 text-yellow-800',
      'BB': 'bg-orange-100 text-orange-800',
      'B': 'bg-red-100 text-red-800',
      'CCC': 'bg-red-100 text-red-800'
    };
    return colors[rating] || 'bg-gray-100 text-gray-800';
  };

  // Normalize financial metrics for radar chart (scale 0-100)
  const radarData = [
    {
      metric: 'Current Ratio',
      customer1: Math.min(customer1.financialMetrics.currentRatio * 25, 100),
      customer2: Math.min(customer2.financialMetrics.currentRatio * 25, 100)
    },
    {
      metric: 'ROE',
      customer1: Math.min(customer1.financialMetrics.returnOnEquity * 4, 100),
      customer2: Math.min(customer2.financialMetrics.returnOnEquity * 4, 100)
    },
    {
      metric: 'Interest Coverage',
      customer1: Math.min(customer1.financialMetrics.interestCoverage * 15, 100),
      customer2: Math.min(customer2.financialMetrics.interestCoverage * 15, 100)
    },
    {
      metric: 'Profit Margin',
      customer1: Math.min(customer1.financialMetrics.profitMargin * 6, 100),
      customer2: Math.min(customer2.financialMetrics.profitMargin * 6, 100)
    },
    {
      metric: 'Asset Turnover',
      customer1: Math.min(customer1.financialMetrics.assetTurnover * 50, 100),
      customer2: Math.min(customer2.financialMetrics.assetTurnover * 50, 100)
    }
  ];

  const comparisonData = [
    {
      metric: 'Exposure',
      customer1: customer1.exposure / 1000000,
      customer2: customer2.exposure / 1000000
    },
    {
      metric: 'PD (%)',
      customer1: customer1.pd,
      customer2: customer2.pd
    },
    {
      metric: 'Expected Loss',
      customer1: customer1.expectedLoss / 1000,
      customer2: customer2.expectedLoss / 1000
    },
    {
      metric: 'Utilization (%)',
      customer1: customer1.utilization,
      customer2: customer2.utilization
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Comparison</h1>
              <p className="text-gray-600">Side-by-side analysis</p>
            </div>
          </div>
        </div>

        {/* Customer Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{customer1.name}</CardTitle>
                  <p className="text-gray-600">{customer1.sector} • {customer1.region}</p>
                </div>
                <Badge className={getRatingColor(customer1.rating)}>
                  {customer1.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Exposure</div>
                  <div className="text-lg font-semibold">{formatCurrency(customer1.exposure)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">PD</div>
                  <div className="text-lg font-semibold">{customer1.pd}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Utilization</div>
                  <div className="text-lg font-semibold">{customer1.utilization}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Expected Loss</div>
                  <div className="text-lg font-semibold text-red-600">{formatCurrency(customer1.expectedLoss)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{customer2.name}</CardTitle>
                  <p className="text-gray-600">{customer2.sector} • {customer2.region}</p>
                </div>
                <Badge className={getRatingColor(customer2.rating)}>
                  {customer2.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Exposure</div>
                  <div className="text-lg font-semibold">{formatCurrency(customer2.exposure)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">PD</div>
                  <div className="text-lg font-semibold">{customer2.pd}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Utilization</div>
                  <div className="text-lg font-semibold">{customer2.utilization}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Expected Loss</div>
                  <div className="text-lg font-semibold text-red-600">{formatCurrency(customer2.expectedLoss)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Metrics Comparison</CardTitle>
              <p className="text-sm text-gray-600">Normalized performance radar</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name={customer1.name}
                    dataKey="customer1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name={customer2.name}
                    dataKey="customer2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics Comparison</CardTitle>
              <p className="text-sm text-gray-600">Key risk indicators</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customer1" fill="#3b82f6" name={customer1.name} />
                  <Bar dataKey="customer2" fill="#ef4444" name={customer2.name} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Financial Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Metrics Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Metric</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">{customer1.name}</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">{customer2.name}</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Better</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">Current Ratio</td>
                    <td className="py-3 px-2 text-center">{customer1.financialMetrics.currentRatio}</td>
                    <td className="py-3 px-2 text-center">{customer2.financialMetrics.currentRatio}</td>
                    <td className="py-3 px-2 text-center">
                      {customer1.financialMetrics.currentRatio > customer2.financialMetrics.currentRatio ? 
                        <TrendingUp className="h-4 w-4 text-blue-600 mx-auto" /> : 
                        <TrendingUp className="h-4 w-4 text-red-600 mx-auto" />}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">Debt to Equity</td>
                    <td className="py-3 px-2 text-center">{customer1.financialMetrics.debtToEquity}</td>
                    <td className="py-3 px-2 text-center">{customer2.financialMetrics.debtToEquity}</td>
                    <td className="py-3 px-2 text-center">
                      {customer1.financialMetrics.debtToEquity < customer2.financialMetrics.debtToEquity ? 
                        <TrendingUp className="h-4 w-4 text-blue-600 mx-auto" /> : 
                        <TrendingUp className="h-4 w-4 text-red-600 mx-auto" />}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">Return on Equity</td>
                    <td className="py-3 px-2 text-center">{customer1.financialMetrics.returnOnEquity}%</td>
                    <td className="py-3 px-2 text-center">{customer2.financialMetrics.returnOnEquity}%</td>
                    <td className="py-3 px-2 text-center">
                      {customer1.financialMetrics.returnOnEquity > customer2.financialMetrics.returnOnEquity ? 
                        <TrendingUp className="h-4 w-4 text-blue-600 mx-auto" /> : 
                        <TrendingUp className="h-4 w-4 text-red-600 mx-auto" />}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">Interest Coverage</td>
                    <td className="py-3 px-2 text-center">{customer1.financialMetrics.interestCoverage}x</td>
                    <td className="py-3 px-2 text-center">{customer2.financialMetrics.interestCoverage}x</td>
                    <td className="py-3 px-2 text-center">
                      {customer1.financialMetrics.interestCoverage > customer2.financialMetrics.interestCoverage ? 
                        <TrendingUp className="h-4 w-4 text-blue-600 mx-auto" /> : 
                        <TrendingUp className="h-4 w-4 text-red-600 mx-auto" />}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerCompare;