
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Menu, TrendingUp, ShieldCheck, Users, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import KPICards from "@/components/KPICards";
import CreditDistributionChart from "@/components/CreditDistributionChart";
import RiskHeatmap from "@/components/RiskHeatmap";
import TopExposuresTable from "@/components/TopExposuresTable";
import TopClientsSpotlight from "@/components/TopClientsSpotlight";
import { CustomerDataService } from "@/services/customerData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  type HighlightMetric = {
    title: string;
    value: string;
    caption: string;
    icon: LucideIcon;
    accent: string;
  };

  const heroHighlights = useMemo<HighlightMetric[]>(() => {
    const customers = CustomerDataService.getAllCustomers();
    const totalExposure = customers.reduce((sum, customer) => sum + customer.exposure, 0);
    const watchlist = customers.filter((customer) => customer.rating === "BB" || customer.rating === "B" || customer.rating === "CCC");
    return [
      {
        title: "Exposure QoQ",
        value: "+8.2%",
        caption: "Growth in managed exposure",
        icon: TrendingUp,
        accent: "from-emerald-400/70 to-emerald-300/60",
      },
      {
        title: "Watchlist clients",
        value: watchlist.length.toLocaleString(),
        caption: "Require targeted review",
        icon: ShieldCheck,
        accent: "from-amber-400/70 to-orange-400/60",
      },
      {
        title: "Active portfolios",
        value: `${customers.length.toLocaleString()} / ${Math.round(totalExposure / 1_000_000).toLocaleString()}M`,
        caption: "Customers • Exposure managed",
        icon: Users,
        accent: "from-blue-400/70 to-sky-400/60",
      },
    ];
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
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
        <main className="space-y-6 px-4 py-6 sm:p-6">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_60%)]" aria-hidden="true" />
            <div className="absolute inset-y-0 -left-10 w-1/3 bg-[radial-gradient(circle,_rgba(94,234,212,0.15),_transparent_70%)] blur-3xl" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-5">
                  <Badge className="w-fit bg-white/10 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                    Intelligent portfolio oversight
                  </Badge>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                      Confidence in every credit decision
                    </h2>
                    <p className="text-base text-slate-200 sm:text-lg">
                      Surface the riskiest exposures instantly, compare portfolios, and collaborate on proactive action plans without leaving the dashboard.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-white/90"
                    >
                      <Link to="/portfolio" className="flex items-center gap-2">
                        Explore portfolio
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      Live risk briefing
                    </Button>
                    <span className="text-xs text-slate-300">
                      Updated moments ago · Collaboration ready
                    </span>
                  </div>
                </div>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-sm">
                  {heroHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-4 backdrop-blur"
                      >
                        <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${item.accent} p-2 text-slate-900/90`}
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-slate-300">{item.title}</p>
                          <p className="text-2xl font-semibold">{item.value}</p>
                          <p className="text-xs text-slate-400">{item.caption}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <KPICards />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Top clients spotlight</h3>
                <p className="text-sm text-gray-600">Stay ahead of concentrations with quick access to your largest exposures.</p>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="#top-exposures">View full table</Link>
              </Button>
            </div>
            <TopClientsSpotlight />
          </section>

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

          {/* Analytics Layout */}
          <div className="grid gap-6 2xl:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]" id="top-exposures">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
                <CreditDistributionChart />
                <RiskHeatmap />
              </div>
            </div>
            <div className="space-y-6">
              <TopExposuresTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
