import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CustomerDataService } from '@/services/customerData';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbName = (segment: string, index: number) => {
    if (segment === 'portfolio') return 'Portfolio';
    if (segment === 'compare') return 'Compare';
    if (segment === 'customer' && pathSegments[index + 1]) {
      const customer = CustomerDataService.getCustomerById(pathSegments[index + 1]);
      return customer ? customer.name : 'Customer';
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const getBreadcrumbPath = (index: number) => {
    return '/' + pathSegments.slice(0, index + 1).join('/');
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="ml-1">Dashboard</span>
      </Link>
      
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const path = getBreadcrumbPath(index);
        const name = getBreadcrumbName(segment, index);
        
        return (
          <div key={segment + index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{name}</span>
            ) : (
              <Link 
                to={path} 
                className="hover:text-foreground transition-colors"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};