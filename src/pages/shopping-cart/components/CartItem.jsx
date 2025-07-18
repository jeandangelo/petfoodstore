import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, isUpdating }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      alert(`Solo hay ${item.stock} unidades disponibles`);
      return;
    }
    
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    setShowRemoveConfirm(false);
    onRemove(item.id);
  };

  const lineTotal = item.price * quantity;
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${isOutOfStock ? 'opacity-60' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product-detail?id=${item.id}`} className="block">
            <div className="w-full sm:w-24 h-24 bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <Link 
                to={`/product-detail?id=${item.id}`}
                className="font-body font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
              >
                {item.name}
              </Link>
              
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground font-caption">
                  {item.brand}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground font-caption">
                  {item.size}
                </span>
              </div>

              {/* Stock Status */}
              {isOutOfStock && (
                <div className="flex items-center gap-1 mt-2">
                  <Icon name="alert-circle" size={16} className="text-error" />
                  <span className="text-sm text-error font-medium">Sin stock</span>
                </div>
              )}
              
              {isLowStock && !isOutOfStock && (
                <div className="flex items-center gap-1 mt-2">
                  <Icon name="alert-triangle" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">
                    Solo quedan {item.stock} unidades
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-heading font-bold text-lg text-foreground">
                €{item.price.toFixed(2)}
              </div>
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="text-sm text-muted-foreground line-through">
                  €{item.originalPrice.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Cantidad:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isUpdating || isOutOfStock}
                >
                  <Icon name="minus" size={16} />
                </Button>
                
                <div className="flex items-center justify-center w-12 h-8 text-sm font-medium border-x border-border">
                  {isUpdating ? (
                    <Icon name="loader-2" size={16} className="animate-spin" />
                  ) : (
                    quantity
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= item.stock || isUpdating || isOutOfStock}
                >
                  <Icon name="plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Line Total and Remove */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="font-heading font-bold text-lg text-primary">
                €{lineTotal.toFixed(2)}
              </div>
              
              {!showRemoveConfirm ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveConfirm(true)}
                  className="text-error hover:text-error hover:bg-error/10"
                  iconName="trash-2"
                  iconPosition="left"
                >
                  Eliminar
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRemoveConfirm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                    iconName="trash-2"
                  >
                    Confirmar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;