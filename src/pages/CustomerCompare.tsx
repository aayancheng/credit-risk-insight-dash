import { useState } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart } from 'recharts';
import { CustomerDataService } from '@/services/customerData';
import { BenchmarkSelector } from '@/components/BenchmarkSelector';
import { Breadcrumb } from '@/components/Breadcrumb';

const CustomerCompare = () => {
  const [searchParams] = useSearchParams();
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<string[]>([]);
  const [showBenchmarkSelector, setShowBenchmarkSelector] = useState(false);
  
  const customer1Id = searchParams.get('customer1') || 'xyz-corporation';
  const customer2Id = searchParams.get('customer2') || 'abc-industries';
  
  const customer1 = CustomerDataService.getCustomerById(customer1Id);
  const customer2 = CustomerDataService.getCustomerById(customer2Id);
  
  const handleBenchmarkSelect = (benchmarkId: string, benchmarkType: string) => {
    if (selectedBenchmarks.includes(benchmarkId)) {
      setSelectedBenchmarks(prev => prev.filter(id => id !== benchmarkId));
    } else if (selectedBenchmarks.length < 3) {
      setSelectedBenchmarks(prev => [...prev, benchmarkId]);
    }
  };

  const removeBenchmark = (benchmarkId: string) => {
    setSelectedBenchmarks(prev => prev.filter(id => id !== benchmarkId));
  };

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold">Customer Comparison</h1>
              <p className="text-muted-foreground">Advanced benchmarking and analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowBenchmarkSelector(!showBenchmarkSelector)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Benchmarks
            </Button>
          </div>
        </div>

        {/* Selected Benchmarks */}
        {selectedBenchmarks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedBenchmarks.map((benchmarkId) => (
                  <Badge key={benchmarkId} variant="secondary" className="flex items-center space-x-1">
                    <span>{benchmarkId}</span>
                    <button onClick={() => removeBenchmark(benchmarkId)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benchmark Selector */}
        {showBenchmarkSelector && (
          <BenchmarkSelector
            selectedCustomer={customer1?.name || ''}
            onBenchmarkSelect={handleBenchmarkSelect}
            selectedBenchmarks={selectedBenchmarks}
          />
        )}

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