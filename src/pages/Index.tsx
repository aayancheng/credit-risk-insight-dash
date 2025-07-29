
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, Minus, Menu } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import DashboardSidebar from "@/components/DashboardSidebar";
import KPICards from "@/components/KPICards";
import CreditDistributionChart from "@/components/CreditDistributionChart";
import RiskHeatmap from "@/components/RiskHeatmap";
import TopExposuresTable from "@/components/TopExposuresTable";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Credit Analytics GPT</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Live Data
              </Badge>
              <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* KPI Cards */}
          <KPICards />

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Credit Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="AAA">AAA</SelectItem>
                    <SelectItem value="AA">AA</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="BBB">BBB</SelectItem>
                    <SelectItem value="BB">BB</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="CCC">CCC</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                    <SelectItem value="latin-america">Latin America</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CreditDistributionChart />
            <RiskHeatmap />
          </div>

          {/* Top Exposures Table */}
          <TopExposuresTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
