import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddToCart(product);
      setIsLoading(false);
    }, 500);
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { label: 'Agotado', color: 'text-error', bgColor: 'bg-error/10' };
    } else if (product.stock <= 5) {
      return { label: 'Stock Limitado', color: 'text-warning', bgColor: 'bg-warning/10' };
    }
    return { label: 'En Stock', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const stockStatus = getStockStatus();
  const isOutOfStock = product.stock === 0;

  return (
    <Link
      to={`/product-detail?id=${product.id}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        
        {/* Stock Status Badge */}
        <div className={`absolute top-2 right-2 ${stockStatus.bgColor} ${stockStatus.color} px-2 py-1 rounded-md text-xs font-medium`}>
          {stockStatus.label}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-sm font-medium text-foreground">Ver Detalles</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          {product.category && (
            <span className="text-xs text-muted-foreground">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-body font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="star"
                  size={14}
                  className={i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-heading font-bold text-lg text-foreground">
            €{product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              €{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          variant={isOutOfStock ? "outline" : "default"}
          size="sm"
          fullWidth
          disabled={isOutOfStock}
          loading={isLoading}
          onClick={handleAddToCart}
          iconName={isOutOfStock ? "x-circle" : "shopping-cart"}
          iconPosition="left"
          className="mt-3"
        >
          {isOutOfStock ? 'No Disponible' : 'Añadir al Carrito'}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;