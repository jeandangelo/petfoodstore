import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const MobileMenu = ({ isOpen, onClose, searchQuery, onSearchChange, onSearchSubmit }) => {
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { 
      label: 'Inicio', 
      path: '/homepage', 
      icon: 'home',
      description: 'Página principal con ofertas'
    },
    { 
      label: 'Productos', 
      path: '/product-catalog', 
      icon: 'shopping-bag',
      description: 'Explorar productos para mascotas'
    },
    { 
      label: 'Carrito', 
      path: '/shopping-cart', 
      icon: 'shopping-cart',
      description: 'Ver productos seleccionados'
    },
    { 
      label: 'Mi Cuenta', 
      path: '/account', 
      icon: 'user',
      description: 'Perfil y configuración'
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-soft-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="heart" size={16} color="white" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base">PetFoodStore</h2>
              <p className="font-caption text-xs text-muted-foreground -mt-1">Menú</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="x" size={20} />
          </Button>
        </div>
        
        {/* Search Section */}
        <div className="p-4 border-b border-border">
          <form onSubmit={onSearchSubmit} className="space-y-2">
            <Input
              type="search"
              placeholder="Buscar productos para mascotas..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full"
            />
            <Button 
              type="submit" 
              variant="outline" 
              size="sm" 
              className="w-full"
              iconName="search"
              iconPosition="left"
            >
              Buscar
            </Button>
          </form>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg 
                text-base font-body transition-all duration-200
                hover:bg-muted hover:scale-[1.02]
                ${isActiveRoute(item.path)
                  ? 'text-primary bg-muted border border-primary/20' :'text-foreground hover:text-primary'
                }
              `}
            >
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${isActiveRoute(item.path) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={item.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground font-caption">
                  {item.description}
                </div>
              </div>
              {isActiveRoute(item.path) && (
                <Icon name="chevron-right" size={16} className="text-primary" />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-caption">
              © 2025 PetFoodStore
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              Cuidado con amor para tu mascota
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;