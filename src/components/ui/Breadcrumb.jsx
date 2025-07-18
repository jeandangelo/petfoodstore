import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  // Route mapping for breadcrumb generation
  const routeMap = {
    '/homepage': { label: 'Inicio', icon: 'home' },
    '/product-catalog': { label: 'Productos', icon: 'shopping-bag' },
    '/product-detail': { label: 'Detalle del Producto', icon: 'package' },
    '/shopping-cart': { label: 'Carrito', icon: 'shopping-cart' },
    '/checkout': { label: 'Finalizar Compra', icon: 'credit-card' },
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Inicio', path: '/homepage', icon: 'home' }];
    
    // Don't show breadcrumbs on homepage
    if (location.pathname === '/homepage') return [];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
        });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();
  
  // Don't render if no breadcrumbs or only home
  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;
          
          return (
            <li key={item.path || index} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="chevron-right" 
                  size={16} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              
              {isLast ? (
                <span className="flex items-center space-x-1 text-foreground font-medium">
                  <Icon name={item.icon} size={16} className="text-primary" />
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors hover:bg-muted px-2 py-1 rounded-md"
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;