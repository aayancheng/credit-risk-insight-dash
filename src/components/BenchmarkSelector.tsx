import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerDataService } from "@/services/customerData";
import { Building2, TrendingUp, MapPin, Users } from 'lucide-react';

interface BenchmarkSelectorProps {
  selectedCustomer: string;
  onBenchmarkSelect: (benchmarkId: string, benchmarkType: string) => void;
  selectedBenchmarks: string[];
}

export const BenchmarkSelector = ({ selectedCustomer, onBenchmarkSelect, selectedBenchmarks }: BenchmarkSelectorProps) => {
  const [activeTab, setActiveTab] = useState('sectors');
  const benchmarkOptions = CustomerDataService.getBenchmarkOptions();

  const renderBenchmarkGroup = (benchmarks: any[], icon: React.ReactNode, type: string) => (
    <div className="space-y-3">
      {benchmarks.map((benchmark) => (
        <Card 
          key={benchmark.id} 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedBenchmarks.includes(benchmark.id) ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onBenchmarkSelect(benchmark.id, benchmark.type)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {icon}
                <div>
                  <div className="font-medium">{benchmark.name}</div>
                  <div className="text-sm text-muted-foreground">{benchmark.value}</div>
                </div>
              </div>
              {selectedBenchmarks.includes(benchmark.id) && (
                <Badge variant="secondary">Selected</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Select Benchmarks</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose up to 3 benchmarks to compare against {selectedCustomer}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
          </TabsList>

          <TabsContent value="sectors" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Building2 className="h-4 w-4" />
              <span>Compare against industry sector averages</span>
            </div>
            {renderBenchmarkGroup(
              benchmarkOptions.sectors, 
              <Building2 className="h-5 w-5 text-blue-500" />, 
              'sector'
            )}
          </TabsContent>

          <TabsContent value="ratings" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Compare against rating peer groups</span>
            </div>
            {renderBenchmarkGroup(
              benchmarkOptions.ratings, 
              <TrendingUp className="h-5 w-5 text-green-500" />, 
              'rating'
            )}
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>Compare against regional averages</span>
            </div>
            {renderBenchmarkGroup(
              benchmarkOptions.regions, 
              <MapPin className="h-5 w-5 text-purple-500" />, 
              'region'
            )}
          </TabsContent>

          <TabsContent value="top" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Users className="h-4 w-4" />
              <span>Compare against top performing customers</span>
            </div>
            {renderBenchmarkGroup(
              benchmarkOptions.topPerformers, 
              <Users className="h-5 w-5 text-orange-500" />, 
              'customer'
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">Quick Actions</div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const customer = CustomerDataService.getCustomerById(selectedCustomer);
                if (customer) {
                  onBenchmarkSelect(`sector-${customer.sector.toLowerCase().replace(/\s+/g, '-')}`, 'sector');
                }
              }}
            >
              Add Sector Average
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const customer = CustomerDataService.getCustomerById(selectedCustomer);
                if (customer) {
                  onBenchmarkSelect(`rating-${customer.rating.toLowerCase()}`, 'rating');
                }
              }}
            >
              Add Rating Peers
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};