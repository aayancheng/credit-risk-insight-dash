
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CustomerDataService } from "@/services/customerData";

const TopExposuresTable = () => {
  const [sortField, setSortField] = useState('exposure');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Get top 5 customers by exposure from CustomerDataService
  const allCustomers = CustomerDataService.getAllCustomers();
  const data = allCustomers
    .sort((a, b) => b.exposure - a.exposure)
    .slice(0, 5)
    .map(customer => ({
      customer: customer.name,
      customerId: customer.id,
      exposure: customer.exposure,
      rating: customer.rating,
      pd: customer.pd,
      lgd: customer.lgd,
      expectedLoss: customer.expectedLoss,
      sector: customer.sector,
      region: customer.region
    }));

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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-lg">Top Exposures</CardTitle>
            <p className="text-sm text-gray-600">Highest risk customers by exposure amount</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="hidden sm:inline text-gray-400">Sort to reprioritize reviews</span>
            <Button variant="outline" size="sm" className="h-9">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('customer')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Customer
                    {getSortIcon('customer')}
                  </Button>
                </th>
                <th className="text-right py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('exposure')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Exposure
                    {getSortIcon('exposure')}
                  </Button>
                </th>
                <th className="text-center py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('rating')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Rating
                    {getSortIcon('rating')}
                  </Button>
                </th>
                <th className="text-right py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('pd')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    PD
                    {getSortIcon('pd')}
                  </Button>
                </th>
                <th className="text-right py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('lgd')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    LGD
                    {getSortIcon('lgd')}
                  </Button>
                </th>
                <th className="text-right py-3 px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSort('expectedLoss')}
                    className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Expected Loss
                    {getSortIcon('expectedLoss')}
                  </Button>
                </th>
                <th className="text-left py-3 px-2">
                  <span className="font-semibold text-gray-700">Sector</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedData.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <Link to={`/customer/${row.customerId}`} className="block hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900 hover:text-blue-600">{row.customer}</div>
                      <div className="text-sm text-gray-500">{row.region}</div>
                    </Link>
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    {formatCurrency(row.exposure)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Badge className={`${getRatingColor(row.rating)} px-3 py-1 text-xs font-semibold`}>
                      {row.rating}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    {formatPercentage(row.pd)}
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    {formatPercentage(row.lgd)}
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-red-600">
                    {formatCurrency(row.expectedLoss)}
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-sm text-gray-600">{row.sector}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopExposuresTable;
