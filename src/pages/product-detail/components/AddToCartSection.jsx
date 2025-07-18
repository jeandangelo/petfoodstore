import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import QuantitySelector from './QuantitySelector';

const AddToCartSection = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock === 0) return;

    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onAddToCart?.(product, quantity);
    
    setIsAdding(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const totalPrice = product.price * quantity;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
      {/* Quantity Selector */}
      <QuantitySelector
        min={1}
        max={Math.min(product.stock, 99)}
        initialQuantity={quantity}
        onQuantityChange={setQuantity}
        disabled={isOutOfStock}
      />

      {/* Price Summary */}
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-muted-foreground">Total:</span>
        <span className="font-heading font-bold text-xl text-primary">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Stock Warning */}
      {isLowStock && (
        <div className="flex items-center space-x-2 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <Icon name="alert-triangle" size={16} className="text-warning" />
          <span className="font-caption text-sm text-warning">
            ¡Solo quedan {product.stock} unidades!
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        variant={isOutOfStock ? "outline" : "default"}
        size="lg"
        fullWidth
        disabled={isOutOfStock}
        loading={isAdding}
        onClick={handleAddToCart}
        iconName={isOutOfStock ? "x-circle" : "shopping-cart"}
        iconPosition="left"
        className="h-12"
      >
        {isOutOfStock 
          ? "Producto agotado" 
          : isAdding 
            ? "Agregando..." 
            : "Agregar al carrito"
        }
      </Button>

      {/* Success Message */}
      {showSuccess && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-md animate-gentle-pulse">
          <Icon name="check-circle" size={18} className="text-success" />
          <span className="font-body text-sm text-success font-medium">
            ¡Producto agregado al carrito!
          </span>
        </div>
      )}

      {/* Additional Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="heart"
          iconPosition="left"
          className="text-xs"
        >
          Favoritos
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="share-2"
          iconPosition="left"
          className="text-xs"
        >
          Compartir
        </Button>
      </div>
    </div>
  );
};

export default AddToCartSection;