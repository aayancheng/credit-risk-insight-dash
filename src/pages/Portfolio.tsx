import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { CustomerDataService } from '@/services/customerData';

const Portfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use the centralized CustomerDataService so portfolio uses the canonical data
  const portfolioData = CustomerDataService.getAllCustomers().map((c) => ({
    id: c.id,
    name: c.name,
    exposure: c.exposure,
    rating: c.rating,
    pd: c.pd,
    lgd: c.lgd,
    el: c.expectedLoss,
    sector: c.sector,
    region: c.region,
    // Map nested financial/behavioral fields with sensible fallbacks for the table
    debtToEquity: c.financialMetrics?.debtToEquity ?? 0,
    currentRatio: c.financialMetrics?.currentRatio ?? 0,
    roa: c.financialMetrics?.returnOnEquity ?? 0, // reuse ROE as proxy if ROA not available
    roe: c.financialMetrics?.returnOnEquity ?? 0,
    ebitdaMargin: c.financialMetrics?.profitMargin ?? 0,
    interestCoverage: c.financialMetrics?.interestCoverage ?? 0,
    paymentHistory: c.behavioralFeatures?.paymentHistory ?? 100,
    accountAge: c.behavioralFeatures?.accountAge ?? 0,
    avgPaymentDays: 30, // placeholder default
    creditUtilization: c.behavioralFeatures?.creditUtilization ?? c.utilization ?? 0,
    collateralCoverage: 1.0
  }));

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

  const handleRowDoubleClick = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

  const handleRowClick = (customerId: string) => {
    setSelectedRow(customerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, customerId: string) => {
    if (e.key === 'Enter') {
      navigate(`/customer/${customerId}`);
    }
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
                      <TableRow 
                        key={client.id} 
                        className={`hover:bg-muted/50 cursor-pointer transition-colors duration-150 ${
                          selectedRow === client.id ? 'bg-muted border-l-4 border-primary' : ''
                        }`}
                        onDoubleClick={() => handleRowDoubleClick(client.id)}
                        onClick={() => handleRowClick(client.id)}
                        onKeyDown={(e) => handleKeyDown(e, client.id)}
                        tabIndex={0}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-between">
                            <Link 
                              to={`/customer/${client.id}`}
                              className="text-primary hover:underline block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {client.name}
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="ml-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/customer/${client.id}`);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
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
