import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchSuggestions = ({ 
  suggestions, 
  isVisible, 
  onSuggestionClick, 
  searchQuery 
}) => {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-soft-lg z-50 max-h-80 overflow-y-auto">
      {/* Popular Searches Header */}
      {searchQuery.length < 2 && (
        <div className="px-4 py-2 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Búsquedas Populares
          </span>
        </div>
      )}
      
      {/* Suggestions List */}
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion.type}-${suggestion.id}-${index}`}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors focus:bg-muted focus:outline-none"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <Icon 
                name={suggestion.icon || 'search'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="font-body text-sm text-foreground">
                {highlightMatch(suggestion.text, searchQuery)}
              </div>
              
              {suggestion.category && (
                <div className="text-xs text-muted-foreground mt-1">
                  en {suggestion.category}
                </div>
              )}
              
              {suggestion.resultCount && (
                <div className="text-xs text-muted-foreground mt-1">
                  {suggestion.resultCount} productos
                </div>
              )}
            </div>
            
            {/* Arrow */}
            <div className="flex-shrink-0">
              <Icon 
                name="arrow-up-left" 
                size={14} 
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </div>
          </button>
        ))}
      </div>
      
      {/* Footer */}
      {searchQuery.length >= 2 && (
        <div className="px-4 py-2 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Presiona Enter para buscar "{searchQuery}"</span>
            <div className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">↵</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;