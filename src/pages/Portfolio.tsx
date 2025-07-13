import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Download, Filter } from "lucide-react";

const Portfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Comprehensive portfolio data with 20 clients
  const portfolioData = [
    {
      id: "xyz-corporation",
      name: "XYZ Corporation",
      exposure: 45000000,
      rating: "BBB",
      pd: 2.1,
      lgd: 35.0,
      el: 330750,
      sector: "Manufacturing",
      region: "North America",
      debtToEquity: 0.65,
      currentRatio: 1.8,
      roa: 8.5,
      roe: 15.2,
      ebitdaMargin: 22.1,
      interestCoverage: 5.8,
      paymentHistory: 98.5,
      accountAge: 8.2,
      avgPaymentDays: 28,
      creditUtilization: 72,
      collateralCoverage: 1.4
    },
    {
      id: "abc-industries",
      name: "ABC Industries",
      exposure: 32000000,
      rating: "A-",
      pd: 1.5,
      lgd: 30.0,
      el: 144000,
      sector: "Technology",
      region: "North America",
      debtToEquity: 0.45,
      currentRatio: 2.1,
      roa: 12.3,
      roe: 18.7,
      ebitdaMargin: 28.5,
      interestCoverage: 8.2,
      paymentHistory: 99.2,
      accountAge: 6.5,
      avgPaymentDays: 22,
      creditUtilization: 58,
      collateralCoverage: 1.8
    },
    {
      id: "global-services",
      name: "Global Services Ltd",
      exposure: 28000000,
      rating: "BB+",
      pd: 3.8,
      lgd: 40.0,
      el: 425600,
      sector: "Services",
      region: "Europe",
      debtToEquity: 0.82,
      currentRatio: 1.5,
      roa: 6.8,
      roe: 12.4,
      ebitdaMargin: 18.3,
      interestCoverage: 4.2,
      paymentHistory: 96.8,
      accountAge: 12.3,
      avgPaymentDays: 35,
      creditUtilization: 85,
      collateralCoverage: 1.1
    },
    {
      id: "tech-innovations",
      name: "Tech Innovations Inc",
      exposure: 22000000,
      rating: "AA-",
      pd: 0.8,
      lgd: 25.0,
      el: 44000,
      sector: "Technology",
      region: "North America",
      debtToEquity: 0.35,
      currentRatio: 2.5,
      roa: 15.2,
      roe: 22.1,
      ebitdaMargin: 32.4,
      interestCoverage: 12.5,
      paymentHistory: 99.8,
      accountAge: 4.2,
      avgPaymentDays: 18,
      creditUtilization: 42,
      collateralCoverage: 2.2
    },
    {
      id: "energy-solutions",
      name: "Energy Solutions Corp",
      exposure: 38000000,
      rating: "BBB+",
      pd: 1.8,
      lgd: 32.0,
      el: 218880,
      sector: "Energy",
      region: "North America",
      debtToEquity: 0.58,
      currentRatio: 1.9,
      roa: 9.2,
      roe: 16.8,
      ebitdaMargin: 25.7,
      interestCoverage: 6.8,
      paymentHistory: 98.1,
      accountAge: 9.8,
      avgPaymentDays: 25,
      creditUtilization: 68,
      collateralCoverage: 1.6
    },
    {
      id: "retail-group",
      name: "Retail Group Holdings",
      exposure: 15000000,
      rating: "B+",
      pd: 5.2,
      lgd: 45.0,
      el: 351000,
      sector: "Retail",
      region: "Europe",
      debtToEquity: 1.05,
      currentRatio: 1.2,
      roa: 4.8,
      roe: 9.2,
      ebitdaMargin: 12.8,
      interestCoverage: 2.8,
      paymentHistory: 94.5,
      accountAge: 15.2,
      avgPaymentDays: 45,
      creditUtilization: 92,
      collateralCoverage: 0.9
    },
    {
      id: "financial-partners",
      name: "Financial Partners LLC",
      exposure: 52000000,
      rating: "A",
      pd: 1.2,
      lgd: 28.0,
      el: 174720,
      sector: "Financial",
      region: "North America",
      debtToEquity: 0.42,
      currentRatio: 2.3,
      roa: 11.5,
      roe: 19.8,
      ebitdaMargin: 35.2,
      interestCoverage: 9.5,
      paymentHistory: 99.5,
      accountAge: 7.8,
      avgPaymentDays: 20,
      creditUtilization: 55,
      collateralCoverage: 1.9
    },
    {
      id: "construction-ltd",
      name: "Construction Ltd",
      exposure: 26000000,
      rating: "BB",
      pd: 4.5,
      lgd: 42.0,
      el: 491400,
      sector: "Construction",
      region: "Asia Pacific",
      debtToEquity: 0.95,
      currentRatio: 1.4,
      roa: 5.8,
      roe: 11.2,
      ebitdaMargin: 15.6,
      interestCoverage: 3.5,
      paymentHistory: 95.2,
      accountAge: 11.5,
      avgPaymentDays: 38,
      creditUtilization: 88,
      collateralCoverage: 1.2
    },
    {
      id: "pharma-research",
      name: "Pharma Research Co",
      exposure: 41000000,
      rating: "A+",
      pd: 0.9,
      lgd: 26.0,
      el: 96174,
      sector: "Healthcare",
      region: "Europe",
      debtToEquity: 0.38,
      currentRatio: 2.8,
      roa: 14.2,
      roe: 21.5,
      ebitdaMargin: 38.9,
      interestCoverage: 11.2,
      paymentHistory: 99.7,
      accountAge: 5.8,
      avgPaymentDays: 16,
      creditUtilization: 48,
      collateralCoverage: 2.1
    },
    {
      id: "automotive-systems",
      name: "Automotive Systems Inc",
      exposure: 34000000,
      rating: "BBB-",
      pd: 2.8,
      lgd: 38.0,
      el: 361760,
      sector: "Automotive",
      region: "North America",
      debtToEquity: 0.72,
      currentRatio: 1.6,
      roa: 7.2,
      roe: 13.8,
      ebitdaMargin: 19.4,
      interestCoverage: 4.8,
      paymentHistory: 97.2,
      accountAge: 10.2,
      avgPaymentDays: 32,
      creditUtilization: 78,
      collateralCoverage: 1.3
    },
    {
      id: "logistics-express",
      name: "Logistics Express Ltd",
      exposure: 19000000,
      rating: "BB-",
      pd: 6.1,
      lgd: 48.0,
      el: 556080,
      sector: "Transportation",
      region: "Asia Pacific",
      debtToEquity: 1.12,
      currentRatio: 1.1,
      roa: 3.8,
      roe: 7.5,
      ebitdaMargin: 9.8,
      interestCoverage: 2.2,
      paymentHistory: 92.8,
      accountAge: 18.5,
      avgPaymentDays: 52,
      creditUtilization: 95,
      collateralCoverage: 0.8
    },
    {
      id: "food-beverages",
      name: "Food & Beverages Group",
      exposure: 29000000,
      rating: "A-",
      pd: 1.6,
      lgd: 31.0,
      el: 143760,
      sector: "Consumer Goods",
      region: "Europe",
      debtToEquity: 0.52,
      currentRatio: 2.0,
      roa: 10.8,
      roe: 17.2,
      ebitdaMargin: 24.8,
      interestCoverage: 7.2,
      paymentHistory: 98.8,
      accountAge: 8.8,
      avgPaymentDays: 26,
      creditUtilization: 62,
      collateralCoverage: 1.7
    },
    {
      id: "telecom-networks",
      name: "Telecom Networks PLC",
      exposure: 48000000,
      rating: "BBB+",
      pd: 1.9,
      lgd: 33.0,
      el: 301320,
      sector: "Telecommunications",
      region: "Europe",
      debtToEquity: 0.68,
      currentRatio: 1.7,
      roa: 8.8,
      roe: 15.8,
      ebitdaMargin: 28.2,
      interestCoverage: 6.2,
      paymentHistory: 98.2,
      accountAge: 12.8,
      avgPaymentDays: 28,
      creditUtilization: 71,
      collateralCoverage: 1.5
    },
    {
      id: "mining-resources",
      name: "Mining Resources Corp",
      exposure: 56000000,
      rating: "BB+",
      pd: 3.5,
      lgd: 41.0,
      el: 803600,
      sector: "Mining",
      region: "Asia Pacific",
      debtToEquity: 0.88,
      currentRatio: 1.3,
      roa: 6.2,
      roe: 11.8,
      ebitdaMargin: 16.5,
      interestCoverage: 3.8,
      paymentHistory: 96.2,
      accountAge: 14.2,
      avgPaymentDays: 42,
      creditUtilization: 82,
      collateralCoverage: 1.1
    },
    {
      id: "chemicals-specialty",
      name: "Specialty Chemicals Ltd",
      exposure: 24000000,
      rating: "A",
      pd: 1.3,
      lgd: 29.0,
      el: 90480,
      sector: "Chemicals",
      region: "North America",
      debtToEquity: 0.48,
      currentRatio: 2.2,
      roa: 12.5,
      roe: 19.2,
      ebitdaMargin: 26.8,
      interestCoverage: 8.8,
      paymentHistory: 99.1,
      accountAge: 6.2,
      avgPaymentDays: 21,
      creditUtilization: 58,
      collateralCoverage: 1.8
    },
    {
      id: "real-estate-dev",
      name: "Real Estate Developers",
      exposure: 42000000,
      rating: "B",
      pd: 7.2,
      lgd: 52.0,
      el: 1574400,
      sector: "Real Estate",
      region: "North America",
      debtToEquity: 1.35,
      currentRatio: 0.9,
      roa: 2.8,
      roe: 5.2,
      ebitdaMargin: 8.2,
      interestCoverage: 1.8,
      paymentHistory: 89.5,
      accountAge: 22.5,
      avgPaymentDays: 68,
      creditUtilization: 98,
      collateralCoverage: 0.6
    },
    {
      id: "aerospace-tech",
      name: "Aerospace Technologies",
      exposure: 36000000,
      rating: "A",
      pd: 1.1,
      lgd: 27.0,
      el: 106920,
      sector: "Aerospace",
      region: "North America",
      debtToEquity: 0.41,
      currentRatio: 2.4,
      roa: 13.8,
      roe: 20.5,
      ebitdaMargin: 31.2,
      interestCoverage: 10.5,
      paymentHistory: 99.4,
      accountAge: 8.5,
      avgPaymentDays: 19,
      creditUtilization: 52,
      collateralCoverage: 2.0
    },
    {
      id: "textiles-apparel",
      name: "Textiles & Apparel Co",
      exposure: 18000000,
      rating: "BB",
      pd: 4.8,
      lgd: 44.0,
      el: 380160,
      sector: "Consumer Goods",
      region: "Asia Pacific",
      debtToEquity: 0.98,
      currentRatio: 1.3,
      roa: 5.2,
      roe: 10.5,
      ebitdaMargin: 13.8,
      interestCoverage: 3.2,
      paymentHistory: 94.8,
      accountAge: 16.8,
      avgPaymentDays: 48,
      creditUtilization: 89,
      collateralCoverage: 1.0
    },
    {
      id: "marine-shipping",
      name: "Marine Shipping Lines",
      exposure: 31000000,
      rating: "BBB",
      pd: 2.5,
      lgd: 36.0,
      el: 279000,
      sector: "Transportation",
      region: "Europe",
      debtToEquity: 0.75,
      currentRatio: 1.5,
      roa: 7.8,
      roe: 14.2,
      ebitdaMargin: 20.5,
      interestCoverage: 5.2,
      paymentHistory: 97.5,
      accountAge: 11.2,
      avgPaymentDays: 33,
      creditUtilization: 76,
      collateralCoverage: 1.4
    },
    {
      id: "biotech-innovations",
      name: "Biotech Innovations Inc",
      exposure: 25000000,
      rating: "AA",
      pd: 0.7,
      lgd: 24.0,
      el: 42000,
      sector: "Healthcare",
      region: "North America",
      debtToEquity: 0.32,
      currentRatio: 3.1,
      roa: 16.8,
      roe: 24.2,
      ebitdaMargin: 42.5,
      interestCoverage: 15.2,
      paymentHistory: 99.9,
      accountAge: 3.5,
      avgPaymentDays: 14,
      creditUtilization: 38,
      collateralCoverage: 2.5
    }
  ];

  const filteredData = portfolioData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.rating.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingColor = (rating: string) => {
    const ratingMap: { [key: string]: string } = {
      'AAA': 'bg-green-100 text-green-800',
      'AA': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'BBB': 'bg-yellow-100 text-yellow-800',
      'BB': 'bg-orange-100 text-orange-800',
      'B': 'bg-red-100 text-red-800',
      'CCC': 'bg-red-200 text-red-900'
    };
    
    const baseRating = rating.replace(/[+-]/g, '');
    return ratingMap[baseRating] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Overview</h1>
            <p className="text-muted-foreground">Comprehensive view of all portfolio clients</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Client Portfolio ({filteredData.length} clients)</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by customer name, sector, or rating..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Exposure</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>PD %</TableHead>
                      <TableHead>LGD %</TableHead>
                      <TableHead>EL</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>D/E Ratio</TableHead>
                      <TableHead>Current Ratio</TableHead>
                      <TableHead>ROA %</TableHead>
                      <TableHead>ROE %</TableHead>
                      <TableHead>EBITDA Margin %</TableHead>
                      <TableHead>Interest Coverage</TableHead>
                      <TableHead>Payment History %</TableHead>
                      <TableHead>Account Age (yrs)</TableHead>
                      <TableHead>Avg Payment Days</TableHead>
                      <TableHead>Credit Utilization %</TableHead>
                      <TableHead>Collateral Coverage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((client) => (
                      <TableRow key={client.id} className="hover:bg-muted/50 cursor-pointer">
                        <TableCell className="font-medium">
                          <Link 
                            to={`/customer/${client.id}`}
                            className="text-primary hover:underline block"
                          >
                            {client.name}
                          </Link>
                        </TableCell>
                        <TableCell className="font-mono">{formatCurrency(client.exposure)}</TableCell>
                        <TableCell>
                          <Badge className={getRatingColor(client.rating)}>{client.rating}</Badge>
                        </TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.pd)}</TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.lgd)}</TableCell>
                        <TableCell className="font-mono">{formatCurrency(client.el)}</TableCell>
                        <TableCell>{client.sector}</TableCell>
                        <TableCell>{client.region}</TableCell>
                        <TableCell className="font-mono">{client.debtToEquity.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">{client.currentRatio.toFixed(1)}</TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.roa)}</TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.roe)}</TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.ebitdaMargin)}</TableCell>
                        <TableCell className="font-mono">{client.interestCoverage.toFixed(1)}</TableCell>
                        <TableCell className="font-mono">{formatPercentage(client.paymentHistory)}</TableCell>
                        <TableCell className="font-mono">{client.accountAge.toFixed(1)}</TableCell>
                        <TableCell className="font-mono">{client.avgPaymentDays}</TableCell>
                        <TableCell className="font-mono">{client.creditUtilization}%</TableCell>
                        <TableCell className="font-mono">{client.collateralCoverage.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;