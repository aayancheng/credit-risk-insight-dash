
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, AlertTriangle, Settings, Home, FileText, TrendingUp, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', icon: Home, href: '/', current: location.pathname === '/' },
    { name: 'Portfolio', icon: BarChart3, href: '/portfolio', current: location.pathname === '/portfolio' },
    { name: 'Customers', icon: Users, href: '#', current: false },
    { name: 'Compare', icon: TrendingUp, href: '/compare', current: location.pathname === '/compare' },
    { name: 'Alerts', icon: AlertTriangle, href: '#', current: false },
    { name: 'Reports', icon: FileText, href: '#', current: false },
    { name: 'Settings', icon: Settings, href: '#', current: false },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          {isOpen ? (
            <h2 className="text-xl font-bold">CreditAnalytics</h2>
          ) : (
            <BarChart3 className="h-8 w-8" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left text-white hover:bg-slate-800",
                  !isOpen && "justify-center px-2",
                  item.current && "bg-slate-800"
                )}
                asChild
              >
                <Link to={item.href}>
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-800 p-4">
          <div className={cn("flex items-center", !isOpen && "justify-center")}>
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-400">Credit Analyst</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
