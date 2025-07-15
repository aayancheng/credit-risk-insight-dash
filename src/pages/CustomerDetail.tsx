import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { CustomerDataService } from '@/services/customerData';
import { Breadcrumb } from '@/components/Breadcrumb';

const CustomerDetail = () => {
  const { customerId } = useParams();
  
  const customer = CustomerDataService.getCustomerById(customerId || '');
  const sectorAverages = customer ? CustomerDataService.getSectorAverages(customer.sector) : null;

  if (!customer) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Customer not found</h2>
            <p className="text-muted-foreground">The requested customer could not be found.</p>
            <Link to="/" className="mt-4 inline-block">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
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

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  // Mock time series data
  const exposureHistory = [
    { month: 'Jan', exposure: 3200000, pd: 1.0 },
    { month: 'Feb', exposure: 3400000, pd: 1.1 },
    { month: 'Mar', exposure: 3600000, pd: 1.1 },
    { month: 'Apr', exposure: 3800000, pd: 1.2 },
    { month: 'May', exposure: 3900000, pd: 1.2 },
    { month: 'Jun', exposure: 4000000, pd: 1.2 }
  ];

  const paymentHistory = [
    { month: 'Jan', onTime: 95, late: 5 },
    { month: 'Feb', onTime: 98, late: 2 },
    { month: 'Mar', onTime: 92, late: 8 },
    { month: 'Apr', onTime: 96, late: 4 },
    { month: 'May', onTime: 99, late: 1 },
    { month: 'Jun', onTime: 97, late: 3 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold">{customer.name}</h1>
              <p className="text-muted-foreground">{customer.sector} • {customer.region}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getRatingColor(customer.rating)}>
              {customer.rating}
            </Badge>
            <Link to={`/compare?customer1=${customer.id}&customer2=abc-industries`}>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </Link>
          </div>
        </div>

        {/* Portfolio Context */}
        {sectorAverages && (
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">#{customer.portfolioRank}</div>
                  <div className="text-sm text-muted-foreground">Portfolio Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">#{customer.sectorRank}</div>
                  <div className="text-sm text-muted-foreground">Sector Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {((customer.exposure / 50000000) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Portfolio Share</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${customer.pd < sectorAverages.pd ? 'text-green-600' : 'text-red-600'}`}>
                    {customer.pd < sectorAverages.pd ? 'Below' : 'Above'}
                  </div>
                  <div className="text-sm text-muted-foreground">Sector PD Average</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(customer.exposure)}</div>
              <p className="text-xs text-gray-500">
                {((customer.exposure / customer.limit) * 100).toFixed(1)}% of limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Probability of Default</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.pd.toFixed(1)}%</div>
              <p className="text-xs text-gray-500">12-month horizon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Expected Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(customer.expectedLoss)}</div>
              <p className="text-xs text-gray-500">Annual estimate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Limit Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.utilization}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${customer.utilization >= 90 ? 'bg-red-500' : customer.utilization >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${customer.utilization}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Exposure & PD Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={exposureHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="exposure" fill="#3b82f6" opacity={0.7} />
                  <Line yAxisId="right" type="monotone" dataKey="pd" stroke="#ef4444" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={paymentHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Financial Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Metrics</CardTitle>
            <p className="text-sm text-gray-600">Key financial ratios and performance indicators</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{customer.financialMetrics.currentRatio}</div>
                <div className="text-sm text-gray-500">Current Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{customer.financialMetrics.debtToEquity}</div>
                <div className="text-sm text-gray-500">Debt to Equity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{customer.financialMetrics.returnOnEquity}%</div>
                <div className="text-sm text-gray-500">Return on Equity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{customer.financialMetrics.interestCoverage}x</div>
                <div className="text-sm text-gray-500">Interest Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Credit Review Completed</div>
                  <div className="text-sm text-gray-500">Annual credit review completed</div>
                </div>
                <Badge variant="outline">Completed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Limit Utilization Alert</div>
                  <div className="text-sm text-gray-500">Utilization reached {customer.utilization}%</div>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800">Warning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetail;