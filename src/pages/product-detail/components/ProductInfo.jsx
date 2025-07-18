import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock > 10) return { text: 'En stock', color: 'text-success', icon: 'check-circle' };
    if (stock > 0) return { text: `Solo ${stock} disponibles`, color: 'text-warning', icon: 'alert-circle' };
    return { text: 'Agotado', color: 'text-error', icon: 'x-circle' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
          {product.name}
        </h1>
        <p className="font-body text-muted-foreground">
          {product.brand} • {product.category}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-2">
        <span className="font-heading font-bold text-3xl text-primary">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="font-body text-lg text-muted-foreground line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-medium">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon name={stockStatus.icon} size={18} className={stockStatus.color} />
        <span className={`font-body text-sm font-medium ${stockStatus.color}`}>
          {stockStatus.text}
        </span>
      </div>

      {/* Product Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-lg">Características principales</h3>
          <ul className="space-y-1">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 font-body text-sm">
                <Icon name="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Short Description */}
      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-lg">Descripción</h3>
        <p className="font-body text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-caption"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;