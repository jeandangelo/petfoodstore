import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterPanel from './components/FilterPanel';
import SortAndFilter from './components/SortAndFilter';
import ProductGrid from './components/ProductGrid';
import SearchSuggestions from './components/SearchSuggestions';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';


const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    brands: [],
    availability: []
  });

  // Sort state
  const [sortBy, setSortBy] = useState('popularity');

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Royal Canin Adult Perro Adulto 15kg",
      brand: "Royal Canin",
      category: "Perros",
      price: 89.99,
      originalPrice: 99.99,
      discount: 10,
      stock: 25,
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg",
      features: ["Adulto", "15kg", "Premium"]
    },
    {
      id: 2,
      name: "Hill\'s Science Diet Gato Adulto Pollo 7kg",
      brand: "Hill\'s",
      category: "Gatos",
      price: 67.50,
      stock: 12,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg",
      features: ["Adulto", "Pollo", "7kg"]
    },
    {
      id: 3,
      name: "Purina Pro Plan Cachorro Razas Grandes 15kg",
      brand: "Purina",
      category: "Perros",
      price: 75.99,
      stock: 8,
      rating: 4.7,
      reviewCount: 234,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      features: ["Cachorro", "Razas Grandes", "15kg"]
    },
    {
      id: 4,
      name: "Whiskas Adulto Pescado y Verduras 1.5kg",
      brand: "Whiskas",
      category: "Gatos",
      price: 12.99,
      stock: 45,
      rating: 4.3,
      reviewCount: 67,
      image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
      features: ["Adulto", "Pescado", "1.5kg"]
    },
    {
      id: 5,
      name: "Pedigree Adulto Carne y Verduras 20kg",
      brand: "Pedigree",
      category: "Perros",
      price: 45.99,
      stock: 0,
      rating: 4.2,
      reviewCount: 123,
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
      features: ["Adulto", "Carne", "20kg"]
    },
    {
      id: 6,
      name: "Iams Kitten Pollo y Leche 3kg",
      brand: "Iams",
      category: "Gatos",
      price: 28.99,
      stock: 18,
      rating: 4.5,
      reviewCount: 45,
      image: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg",
      features: ["Kitten", "Pollo", "3kg"]
    },
    {
      id: 7,
      name: "Comida para Aves Tropicales Premium 2kg",
      brand: "Versele-Laga",
      category: "Aves",
      price: 19.99,
      stock: 22,
      rating: 4.4,
      reviewCount: 34,
      image: "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg",
      features: ["Tropical", "Premium", "2kg"]
    },
    {
      id: 8,
      name: "Alimento para Peces Goldfish 500g",
      brand: "Tetra",
      category: "Peces",
      price: 8.99,
      stock: 67,
      rating: 4.1,
      reviewCount: 28,
      image: "https://images.pexels.com/photos/1123999/pexels-photo-1123999.jpeg",
      features: ["Goldfish", "Escamas", "500g"]
    },
    {
      id: 9,
      name: "Heno Premium para Conejos 1kg",
      brand: "Oxbow",
      category: "Mamíferos Pequeños",
      price: 15.99,
      stock: 31,
      rating: 4.6,
      reviewCount: 52,
      image: "https://images.pexels.com/photos/1462634/pexels-photo-1462634.jpeg",
      features: ["Heno", "Premium", "1kg"]
    },
    {
      id: 10,
      name: "Royal Canin Perro Senior 12kg",
      brand: "Royal Canin",
      category: "Perros",
      price: 92.99,
      stock: 14,
      rating: 4.9,
      reviewCount: 187,
      image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
      features: ["Senior", "12kg", "Premium"]
    },
    {
      id: 11,
      name: "Hill\'s Prescription Diet Gato Renal 4kg",
      brand: "Hill\'s",
      category: "Gatos",
      price: 78.99,
      stock: 6,
      rating: 4.8,
      reviewCount: 94,
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg",
      features: ["Prescription", "Renal", "4kg"]
    },
    {
      id: 12,
      name: "Purina Fancy Feast Gato Adulto Variedad 24x85g",
      brand: "Purina",
      category: "Gatos",
      price: 34.99,
      stock: 28,
      rating: 4.4,
      reviewCount: 156,
      image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
      features: ["Adulto", "Variedad", "24 latas"]
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, text: "Comida para perros", icon: "dog", category: "Perros", resultCount: 156 },
    { id: 2, text: "Comida para gatos", icon: "cat", category: "Gatos", resultCount: 142 },
    { id: 3, text: "Royal Canin", icon: "package", category: "Marcas", resultCount: 89 },
    { id: 4, text: "Cachorro", icon: "heart", category: "Edad", resultCount: 67 },
    { id: 5, text: "Comida húmeda", icon: "droplets", category: "Tipo", resultCount: 45 },
    { id: 6, text: "Hill\'s Science Diet", icon: "package", category: "Marcas", resultCount: 76 },
    { id: 7, text: "Alimento premium", icon: "star", category: "Calidad", resultCount: 234 },
    { id: 8, text: "Pienso sin cereales", icon: "wheat-off", category: "Especial", resultCount: 38 }
  ];

  // Filter and sort products
  const getFilteredProducts = useCallback(() => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => {
        const categoryMap = {
          'dogs': 'Perros',
          'cats': 'Gatos',
          'birds': 'Aves',
          'fish': 'Peces',
          'small-mammals': 'Mamíferos Pequeños'
        };
        return filters.categories.some(cat => categoryMap[cat] === product.category);
      });
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return filters.priceRanges.some(range => {
          switch (range) {
            case 'under-20': return product.price < 20;
            case '20-50': return product.price >= 20 && product.price <= 50;
            case '50-100': return product.price >= 50 && product.price <= 100;
            case '100-200': return product.price >= 100 && product.price <= 200;
            case 'over-200': return product.price > 200;
            default: return true;
          }
        });
      });
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => {
        const brandMap = {
          'royal-canin': 'Royal Canin',
          'hills': "Hill\'s",
          'purina': 'Purina',
          'whiskas': 'Whiskas',
          'pedigree': 'Pedigree',
          'iams': 'Iams'
        };
        return filters.brands.some(brand => brandMap[brand] === product.brand);
      });
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        return filters.availability.some(avail => {
          switch (avail) {
            case 'in-stock': return product.stock > 5;
            case 'low-stock': return product.stock > 0 && product.stock <= 5;
            case 'pre-order': return product.stock === 0;
            default: return true;
          }
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popularity
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Update filtered products when dependencies change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredProducts(getFilteredProducts());
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [getFilteredProducts]);

  // Load cart count
  useEffect(() => {
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(savedCartCount));
  }, []);

  // Handle search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length >= 1);
    
    // Update URL params
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSearchParams({ search: suggestion.text });
  };

  // Handle filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType, filterId) => {
    const newFilters = { ...filters };
    newFilters[filterType] = newFilters[filterType].filter(id => id !== filterId);
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      priceRanges: [],
      brands: [],
      availability: []
    });
    setSearchQuery('');
    setSearchParams({});
  };

  // Handle sort
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    const newCartCount = cartCount + 1;
    setCartCount(newCartCount);
    localStorage.setItem('cartCount', newCartCount.toString());
    
    // Show success feedback (in real app, this would be a toast notification)
    console.log(`Added ${product.name} to cart`);
  };

  // Pagination
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Get search suggestions
  const getSearchSuggestions = () => {
    if (searchQuery.length < 1) {
      return mockSuggestions.slice(0, 6);
    }
    
    return mockSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/homepage', icon: 'home' },
    { label: 'Productos', path: '/product-catalog', icon: 'shopping-bag' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Encuentra la mejor alimentación y cuidado para tu mascota
          </p>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6 relative">
          <form onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              placeholder="Buscar productos para mascotas..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </form>
          
          <SearchSuggestions
            suggestions={getSearchSuggestions()}
            isVisible={showSuggestions}
            onSuggestionClick={handleSuggestionClick}
            searchQuery={searchQuery}
          />
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block">
            <FilterPanel
              isOpen={true}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearAllFilters}
              isMobile={false}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort and Filter Controls */}
            <SortAndFilter
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onToggleFilters={() => setIsFilterPanelOpen(true)}
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAllFilters={handleClearAllFilters}
              totalResults={filteredProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {/* Product Grid */}
            <div className="mt-6">
              <ProductGrid
                products={paginatedProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  iconName="chevron-left"
                  iconPosition="left"
                >
                  Anterior
                </Button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  iconName="chevron-right"
                  iconPosition="right"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearAllFilters}
        isMobile={true}
      />
    </div>
  );
};

export default ProductCatalog;