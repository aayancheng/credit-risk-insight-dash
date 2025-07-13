import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';

const CustomerDetail = () => {
  const { customerId } = useParams();
  
  // Mock data - would come from API based on customerId - expanded to include all 20 customers
  const customerData = {
    'xyz-corporation': {
      name: 'XYZ Corporation', exposure: 45000000, rating: 'BBB', pd: 2.1, lgd: 35.0, expectedLoss: 330750, sector: 'Manufacturing', region: 'North America', utilization: 72, limit: 62500000, lastReview: '2025-06-15', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.8, debtToEquity: 0.65, returnOnEquity: 15.2, interestCoverage: 5.8 }
    },
    'abc-industries': {
      name: 'ABC Industries', exposure: 32000000, rating: 'A-', pd: 1.5, lgd: 30.0, expectedLoss: 144000, sector: 'Technology', region: 'North America', utilization: 58, limit: 55172413, lastReview: '2025-05-20', ratingTrend: 0,
      financialMetrics: { currentRatio: 2.1, debtToEquity: 0.45, returnOnEquity: 18.7, interestCoverage: 8.2 }
    },
    'global-services': {
      name: 'Global Services Ltd', exposure: 28000000, rating: 'BB+', pd: 3.8, lgd: 40.0, expectedLoss: 425600, sector: 'Services', region: 'Europe', utilization: 85, limit: 32941176, lastReview: '2025-07-01', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.5, debtToEquity: 0.82, returnOnEquity: 12.4, interestCoverage: 4.2 }
    },
    'tech-innovations': {
      name: 'Tech Innovations Inc', exposure: 22000000, rating: 'AA-', pd: 0.8, lgd: 25.0, expectedLoss: 44000, sector: 'Technology', region: 'North America', utilization: 42, limit: 52380952, lastReview: '2025-04-10', ratingTrend: 1,
      financialMetrics: { currentRatio: 2.5, debtToEquity: 0.35, returnOnEquity: 22.1, interestCoverage: 12.5 }
    },
    'energy-solutions': {
      name: 'Energy Solutions Corp', exposure: 38000000, rating: 'BBB+', pd: 1.8, lgd: 32.0, expectedLoss: 218880, sector: 'Energy', region: 'North America', utilization: 68, limit: 55882352, lastReview: '2025-06-28', ratingTrend: 0,
      financialMetrics: { currentRatio: 1.9, debtToEquity: 0.58, returnOnEquity: 16.8, interestCoverage: 6.8 }
    },
    'retail-group': {
      name: 'Retail Group Holdings', exposure: 15000000, rating: 'B+', pd: 5.2, lgd: 45.0, expectedLoss: 351000, sector: 'Retail', region: 'Europe', utilization: 92, limit: 16304347, lastReview: '2025-03-15', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.2, debtToEquity: 1.05, returnOnEquity: 9.2, interestCoverage: 2.8 }
    },
    'financial-partners': {
      name: 'Financial Partners LLC', exposure: 52000000, rating: 'A', pd: 1.2, lgd: 28.0, expectedLoss: 174720, sector: 'Financial', region: 'North America', utilization: 55, limit: 94545454, lastReview: '2025-05-12', ratingTrend: 0,
      financialMetrics: { currentRatio: 2.3, debtToEquity: 0.42, returnOnEquity: 19.8, interestCoverage: 9.5 }
    },
    'construction-ltd': {
      name: 'Construction Ltd', exposure: 26000000, rating: 'BB', pd: 4.5, lgd: 42.0, expectedLoss: 491400, sector: 'Construction', region: 'Asia Pacific', utilization: 88, limit: 29545454, lastReview: '2025-04-20', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.4, debtToEquity: 0.95, returnOnEquity: 11.2, interestCoverage: 3.5 }
    },
    'pharma-research': {
      name: 'Pharma Research Co', exposure: 41000000, rating: 'A+', pd: 0.9, lgd: 26.0, expectedLoss: 96174, sector: 'Healthcare', region: 'Europe', utilization: 48, limit: 85416666, lastReview: '2025-06-05', ratingTrend: 1,
      financialMetrics: { currentRatio: 2.8, debtToEquity: 0.38, returnOnEquity: 21.5, interestCoverage: 11.2 }
    },
    'automotive-systems': {
      name: 'Automotive Systems Inc', exposure: 34000000, rating: 'BBB-', pd: 2.8, lgd: 38.0, expectedLoss: 361760, sector: 'Automotive', region: 'North America', utilization: 78, limit: 43589743, lastReview: '2025-03-28', ratingTrend: 0,
      financialMetrics: { currentRatio: 1.6, debtToEquity: 0.72, returnOnEquity: 13.8, interestCoverage: 4.8 }
    },
    'logistics-express': {
      name: 'Logistics Express Ltd', exposure: 19000000, rating: 'BB-', pd: 6.1, lgd: 48.0, expectedLoss: 556080, sector: 'Transportation', region: 'Asia Pacific', utilization: 95, limit: 20000000, lastReview: '2025-02-14', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.1, debtToEquity: 1.12, returnOnEquity: 7.5, interestCoverage: 2.2 }
    },
    'food-beverages': {
      name: 'Food & Beverages Group', exposure: 29000000, rating: 'A-', pd: 1.6, lgd: 31.0, expectedLoss: 143760, sector: 'Consumer Goods', region: 'Europe', utilization: 62, limit: 46774193, lastReview: '2025-05-30', ratingTrend: 0,
      financialMetrics: { currentRatio: 2.0, debtToEquity: 0.52, returnOnEquity: 17.2, interestCoverage: 7.2 }
    },
    'telecom-networks': {
      name: 'Telecom Networks PLC', exposure: 48000000, rating: 'BBB+', pd: 1.9, lgd: 33.0, expectedLoss: 301320, sector: 'Telecommunications', region: 'Europe', utilization: 71, limit: 67605633, lastReview: '2025-04-18', ratingTrend: 0,
      financialMetrics: { currentRatio: 1.7, debtToEquity: 0.68, returnOnEquity: 15.8, interestCoverage: 6.2 }
    },
    'mining-resources': {
      name: 'Mining Resources Corp', exposure: 56000000, rating: 'BB+', pd: 3.5, lgd: 41.0, expectedLoss: 803600, sector: 'Mining', region: 'Asia Pacific', utilization: 82, limit: 68292682, lastReview: '2025-06-22', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.3, debtToEquity: 0.88, returnOnEquity: 11.8, interestCoverage: 3.8 }
    },
    'chemicals-specialty': {
      name: 'Specialty Chemicals Ltd', exposure: 24000000, rating: 'A', pd: 1.3, lgd: 29.0, expectedLoss: 90480, sector: 'Chemicals', region: 'North America', utilization: 58, limit: 41379310, lastReview: '2025-05-08', ratingTrend: 0,
      financialMetrics: { currentRatio: 2.2, debtToEquity: 0.48, returnOnEquity: 19.2, interestCoverage: 8.8 }
    },
    'real-estate-dev': {
      name: 'Real Estate Developers', exposure: 42000000, rating: 'B', pd: 7.2, lgd: 52.0, expectedLoss: 1574400, sector: 'Real Estate', region: 'North America', utilization: 98, limit: 42857142, lastReview: '2025-01-25', ratingTrend: -1,
      financialMetrics: { currentRatio: 0.9, debtToEquity: 1.35, returnOnEquity: 5.2, interestCoverage: 1.8 }
    },
    'aerospace-tech': {
      name: 'Aerospace Technologies', exposure: 36000000, rating: 'A', pd: 1.1, lgd: 27.0, expectedLoss: 106920, sector: 'Aerospace', region: 'North America', utilization: 52, limit: 69230769, lastReview: '2025-04-30', ratingTrend: 1,
      financialMetrics: { currentRatio: 2.4, debtToEquity: 0.41, returnOnEquity: 20.5, interestCoverage: 10.5 }
    },
    'textiles-apparel': {
      name: 'Textiles & Apparel Co', exposure: 18000000, rating: 'BB', pd: 4.8, lgd: 44.0, expectedLoss: 380160, sector: 'Consumer Goods', region: 'Asia Pacific', utilization: 89, limit: 20224719, lastReview: '2025-03-10', ratingTrend: -1,
      financialMetrics: { currentRatio: 1.3, debtToEquity: 0.98, returnOnEquity: 10.5, interestCoverage: 3.2 }
    },
    'marine-shipping': {
      name: 'Marine Shipping Lines', exposure: 31000000, rating: 'BBB', pd: 2.5, lgd: 36.0, expectedLoss: 279000, sector: 'Transportation', region: 'Europe', utilization: 76, limit: 40789473, lastReview: '2025-06-12', ratingTrend: 0,
      financialMetrics: { currentRatio: 1.5, debtToEquity: 0.75, returnOnEquity: 14.2, interestCoverage: 5.2 }
    },
    'biotech-innovations': {
      name: 'Biotech Innovations Inc', exposure: 25000000, rating: 'AA', pd: 0.7, lgd: 24.0, expectedLoss: 42000, sector: 'Healthcare', region: 'North America', utilization: 38, limit: 65789473, lastReview: '2025-05-15', ratingTrend: 1,
      financialMetrics: { currentRatio: 3.1, debtToEquity: 0.32, returnOnEquity: 24.2, interestCoverage: 15.2 }
    }
  };

  const customer = customerData[customerId as keyof typeof customerData];

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
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
    return <span className="h-4 w-4 text-gray-400">→</span>;
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
              <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
              <p className="text-gray-600">{customer.sector} • {customer.region}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to={`/compare?customer1=${customerId}&customer2=abc-industries`}>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </Link>
            <Badge className={getRatingColor(customer.rating)}>
              {customer.rating}
            </Badge>
            {getTrendIcon(customer.ratingTrend)}
          </div>
        </div>

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
                  <div className="text-sm text-gray-500">Last reviewed on {customer.lastReview}</div>
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