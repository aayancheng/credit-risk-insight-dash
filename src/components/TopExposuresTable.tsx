
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { useState } from "react";

const TopExposuresTable = () => {
  const [sortField, setSortField] = useState('exposure');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const data = [
    {
      customer: 'XYZ Corporation',
      exposure: 4000000,
      rating: 'BBB',
      pd: 1.2,
      lgd: 40,
      expectedLoss: 19200,
      sector: 'Technology',
      region: 'North America'
    },
    {
      customer: 'ABC Industries Ltd',
      exposure: 2500000,
      rating: 'A',
      pd: 0.8,
      lgd: 35,
      expectedLoss: 7000,
      sector: 'Manufacturing',
      region: 'Europe'
    },
    {
      customer: 'Global Services Inc',
      exposure: 1800000,
      rating: 'BB',
      pd: 2.1,
      lgd: 45,
      expectedLoss: 17010,
      sector: 'Services',
      region: 'Asia Pacific'
    },
    {
      customer: 'Tech Solutions Ltd',
      exposure: 1500000,
      rating: 'BBB',
      pd: 1.5,
      lgd: 40,
      expectedLoss: 9000,
      sector: 'Technology',
      region: 'North America'
    },
    {
      customer: 'Energy Corp',
      exposure: 1200000,
      rating: 'B',
      pd: 3.2,
      lgd: 50,
      expectedLoss: 19200,
      sector: 'Energy',
      region: 'North America'
    },
    {
      customer: 'Manufacturing Co',
      exposure: 1000000,
      rating: 'A',
      pd: 0.9,
      lgd: 35,
      expectedLoss: 3150,
      sector: 'Manufacturing',
      region: 'Europe'
    }
  ];

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Top Exposures</CardTitle>
            <p className="text-sm text-gray-600">Highest risk customers by exposure amount</p>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
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
            <tbody>
              {sortedData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2">
                    <div className="font-medium text-gray-900">{row.customer}</div>
                    <div className="text-sm text-gray-500">{row.region}</div>
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    {formatCurrency(row.exposure)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Badge className={getRatingColor(row.rating)}>
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
