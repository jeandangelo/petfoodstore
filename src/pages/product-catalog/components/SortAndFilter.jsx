import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SortAndFilter = ({ 
  sortBy, 
  onSortChange, 
  onToggleFilters, 
  activeFilters, 
  onRemoveFilter,
  onClearAllFilters,
  totalResults,
  currentPage,
  totalPages
}) => {
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'popularity', label: 'Más Popular' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'newest', label: 'Más Recientes' },
    { value: 'rating', label: 'Mejor Valorados' },
    { value: 'name', label: 'Nombre A-Z' }
  ];

  const getActiveFilterCount = () => {
    return activeFilters.categories.length + 
           activeFilters.priceRanges.length + 
           activeFilters.brands.length + 
           activeFilters.availability.length;
  };

  const getFilterLabel = (type, id) => {
    const filterLabels = {
      categories: {
        'dogs': 'Perros',
        'cats': 'Gatos', 
        'birds': 'Aves',
        'fish': 'Peces',
        'small-mammals': 'Mamíferos Pequeños'
      },
      priceRanges: {
        'under-20': 'Menos de €20',
        '20-50': '€20 - €50',
        '50-100': '€50 - €100',
        '100-200': '€100 - €200',
        'over-200': 'Más de €200'
      },
      brands: {
        'royal-canin': 'Royal Canin',
        'hills': "Hill\'s",
        'purina': 'Purina',
        'whiskas': 'Whiskas',
        'pedigree': 'Pedigree',
        'iams': 'Iams'
      },
      availability: {
        'in-stock': 'En Stock',
        'low-stock': 'Stock Limitado',
        'pre-order': 'Pre-orden'
      }
    };
    
    return filterLabels[type]?.[id] || id;
  };

  const getAllActiveFilterChips = () => {
    const chips = [];
    
    activeFilters.categories.forEach(id => {
      chips.push({ type: 'categories', id, label: getFilterLabel('categories', id) });
    });
    
    activeFilters.priceRanges.forEach(id => {
      chips.push({ type: 'priceRanges', id, label: getFilterLabel('priceRanges', id) });
    });
    
    activeFilters.brands.forEach(id => {
      chips.push({ type: 'brands', id, label: getFilterLabel('brands', id) });
    });
    
    activeFilters.availability.forEach(id => {
      chips.push({ type: 'availability', id, label: getFilterLabel('availability', id) });
    });
    
    return chips;
  };

  const activeFilterChips = getAllActiveFilterChips();
  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Side - Results Count and Filter Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onToggleFilters}
            iconName="filter"
            iconPosition="left"
            className="lg:hidden"
          >
            Filtros
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{totalResults.toLocaleString()}</span> productos encontrados
            {totalPages > 1 && (
              <span className="ml-2">
                (Página {currentPage} de {totalPages})
              </span>
            )}
          </div>
        </div>

        {/* Right Side - Sort and View Controls */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="min-w-[200px]">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Ordenar por..."
            />
          </div>

          {/* View Mode Toggle - Desktop Only */}
          <div className="hidden md:flex items-center border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Icon name="grid-3x3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Icon name="list" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground">Filtros activos:</span>
          
          {activeFilterChips.map((chip, index) => (
            <div
              key={`${chip.type}-${chip.id}-${index}`}
              className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              <span>{chip.label}</span>
              <button
                onClick={() => onRemoveFilter(chip.type, chip.id)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <Icon name="x" size={14} />
              </button>
            </div>
          ))}
          
          {activeFilterChips.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Limpiar todo
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SortAndFilter;