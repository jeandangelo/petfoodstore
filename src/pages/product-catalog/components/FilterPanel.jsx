import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    brands: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    { id: 'dogs', label: 'Perros', count: 156, icon: 'dog' },
    { id: 'cats', label: 'Gatos', count: 142, icon: 'cat' },
    { id: 'birds', label: 'Aves', count: 89, icon: 'bird' },
    { id: 'fish', label: 'Peces', count: 67, icon: 'fish' },
    { id: 'small-mammals', label: 'Mamíferos Pequeños', count: 45, icon: 'rabbit' }
  ];

  const priceRanges = [
    { id: 'under-20', label: 'Menos de €20', min: 0, max: 20 },
    { id: '20-50', label: '€20 - €50', min: 20, max: 50 },
    { id: '50-100', label: '€50 - €100', min: 50, max: 100 },
    { id: '100-200', label: '€100 - €200', min: 100, max: 200 },
    { id: 'over-200', label: 'Más de €200', min: 200, max: 999999 }
  ];

  const brands = [
    { id: 'royal-canin', label: 'Royal Canin', count: 89 },
    { id: 'hills', label: "Hill\'s", count: 76 },
    { id: 'purina', label: 'Purina', count: 65 },
    { id: 'whiskas', label: 'Whiskas', count: 54 },
    { id: 'pedigree', label: 'Pedigree', count: 43 },
    { id: 'iams', label: 'Iams', count: 38 }
  ];

  const availabilityOptions = [
    { id: 'in-stock', label: 'En Stock', count: 387 },
    { id: 'low-stock', label: 'Stock Limitado', count: 45 },
    { id: 'pre-order', label: 'Pre-orden', count: 23 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (rangeId, checked) => {
    const newPriceRanges = checked
      ? [...filters.priceRanges, rangeId]
      : filters.priceRanges.filter(id => id !== rangeId);
    onFilterChange({ ...filters, priceRanges: newPriceRanges });
  };

  const handleBrandChange = (brandId, checked) => {
    const newBrands = checked
      ? [...filters.brands, brandId]
      : filters.brands.filter(id => id !== brandId);
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleAvailabilityChange = (availabilityId, checked) => {
    const newAvailability = checked
      ? [...filters.availability, availabilityId]
      : filters.availability.filter(id => id !== availabilityId);
    onFilterChange({ ...filters, availability: newAvailability });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children, count }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted transition-colors"
      >
        <div className="flex items-center space-x-2">
          <span className="font-body font-medium text-foreground">{title}</span>
          {count && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
        <Icon 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const filterContent = (
    <div className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-lg text-foreground">Filtros</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpiar
          </Button>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="x" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Categories */}
        <FilterSection
          title="Categorías"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
          count={filters.categories.length}
        >
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                checked={filters.categories.includes(category.id)}
                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              />
              <div className="flex items-center space-x-2 flex-1">
                <Icon name={category.icon} size={16} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">{category.label}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            </div>
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Rango de Precio"
          isExpanded={expandedSections.priceRange}
          onToggle={() => toggleSection('priceRange')}
          count={filters.priceRanges.length}
        >
          {priceRanges.map(range => (
            <div key={range.id} className="flex items-center space-x-3">
              <Checkbox
                checked={filters.priceRanges.includes(range.id)}
                onChange={(e) => handlePriceRangeChange(range.id, e.target.checked)}
              />
              <span className="font-body text-sm text-foreground">{range.label}</span>
            </div>
          ))}
        </FilterSection>

        {/* Brands */}
        <FilterSection
          title="Marcas"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
          count={filters.brands.length}
        >
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center space-x-3">
              <Checkbox
                checked={filters.brands.includes(brand.id)}
                onChange={(e) => handleBrandChange(brand.id, e.target.checked)}
              />
              <div className="flex items-center justify-between flex-1">
                <span className="font-body text-sm text-foreground">{brand.label}</span>
                <span className="text-xs text-muted-foreground">({brand.count})</span>
              </div>
            </div>
          ))}
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Disponibilidad"
          isExpanded={expandedSections.availability}
          onToggle={() => toggleSection('availability')}
          count={filters.availability.length}
        >
          {availabilityOptions.map(option => (
            <div key={option.id} className="flex items-center space-x-3">
              <Checkbox
                checked={filters.availability.includes(option.id)}
                onChange={(e) => handleAvailabilityChange(option.id, e.target.checked)}
              />
              <div className="flex items-center justify-between flex-1">
                <span className="font-body text-sm text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground">({option.count})</span>
              </div>
            </div>
          ))}
        </FilterSection>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
            iconName="check"
            iconPosition="left"
          >
            Aplicar Filtros
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-soft-lg">
              {filterContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-background border-r border-border shadow-soft">
      {filterContent}
    </div>
  );
};

export default FilterPanel;