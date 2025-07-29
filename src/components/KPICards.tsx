
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle } from "lucide-react";

const KPICards = () => {
  const kpis = [
    {
      title: "Total Exposure",
      value: "$50,200,000",
      change: "+5.4%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Number of Customers",
      value: "1,200",
      change: "+12",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Average Rating",
      value: "BBB",
      change: "Stable",
      trend: "neutral",
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Total Expected Loss",
      value: "$950,000",
      change: "-5.1%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </div>
                  <div className={`flex items-center text-sm ${getTrendColor(kpi.trend)}`}>
                    {getTrendIcon(kpi.trend)}
                    <span className="ml-1">{kpi.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPICards;
