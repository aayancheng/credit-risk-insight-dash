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

  // Filter out customer ID segments to show clean breadcrumbs
  const filteredSegments = pathSegments.filter((segment, index) => {
    // Skip customer ID if previous segment is 'customer'
    if (index > 0 && pathSegments[index - 1] === 'customer') {
      return false;
    }
    return true;
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="ml-1">Dashboard</span>
      </Link>
      
      {filteredSegments.map((segment, filteredIndex) => {
        const isLast = filteredIndex === filteredSegments.length - 1;
        const originalIndex = pathSegments.indexOf(segment);
        const path = getBreadcrumbPath(originalIndex);
        
        let name = getBreadcrumbName(segment, originalIndex);
        
        // If this is a customer page, show the customer name instead of 'customer'
        if (segment === 'customer' && pathSegments[originalIndex + 1]) {
          const customer = CustomerDataService.getCustomerById(pathSegments[originalIndex + 1]);
          name = customer ? customer.name : 'Customer';
        }
        
        return (
          <div key={segment + filteredIndex} className="flex items-center space-x-2">
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