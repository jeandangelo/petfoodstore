import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, currentProductId }) => {
  const filteredProducts = products.filter(product => product.id !== currentProductId);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (filteredProducts.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-foreground">
          Productos relacionados
        </h2>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm" iconName="arrow-right" iconPosition="right">
            Ver todos
          </Button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.slice(0, 8).map((product) => (
          <Link
            key={product.id}
            to={`/product-detail?id=${product.id}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft-lg transition-all duration-200 hover-lift"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Discount Badge */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}

              {/* Stock Status */}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-error text-error-foreground px-3 py-1 rounded text-sm font-medium">
                    Agotado
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <div>
                <h3 className="font-body font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-caption text-xs text-muted-foreground">
                  {product.brand}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={12}
                      className={i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="font-caption text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-caption text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;