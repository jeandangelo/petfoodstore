import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();

  // Mock cart count - in real app this would come from context/state management
  useEffect(() => {
    const mockCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(mockCartCount));
  }, []);

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, text: 'Comida para perros', icon: 'dog' },
    { id: 2, text: 'Comida para gatos', icon: 'cat' },
    { id: 3, text: 'Juguetes para mascotas', icon: 'toy-brick' },
    { id: 4, text: 'Accesorios para perros', icon: 'heart' },
    { id: 5, text: 'Arena para gatos', icon: 'box' },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const filtered = mockSuggestions.filter(item =>
        item.text.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to product catalog with search query
      window.location.href = `/product-catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { label: 'Inicio', path: '/homepage', icon: 'home' },
    { label: 'Productos', path: '/product-catalog', icon: 'shopping-bag' },
    { label: 'Mi Cuenta', path: '/account', icon: 'user' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-soft">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="heart" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl text-primary">PetFoodStore</h1>
                <p className="font-caption text-xs text-muted-foreground -mt-1">Cuidado con amor</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors hover:bg-muted ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-muted' :'text-foreground hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Buscar productos para mascotas..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4"
                  />
                  <Icon
                    name="search"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </form>
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-soft-lg z-50">
                  {searchSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion.text);
                        setShowSuggestions(false);
                        window.location.href = `/product-catalog?search=${encodeURIComponent(suggestion.text)}`;
                      }}
                    >
                      <Icon name={suggestion.icon} size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {
                  // Toggle mobile search - in real app this would show search overlay
                  console.log('Toggle mobile search');
                }}
              >
                <Icon name="search" size={20} />
              </Button>

              {/* Cart Button */}
              <Link to="/shopping-cart">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="shopping-cart" size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-cart-bounce">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                <Icon name={isMobileMenuOpen ? "x" : "menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMobileMenu} />
          <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-background border-l border-border shadow-soft-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-heading font-semibold text-lg">Menú</h2>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <Icon name="x" size={20} />
              </Button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body transition-colors ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-muted' :'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSearchSubmit}>
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;