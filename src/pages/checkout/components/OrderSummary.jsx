import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, deliveryOption, isSticky = false }) => {
  const deliveryOptions = {
    standard: { name: 'Envío Estándar', price: 4.99 },
    express: { name: 'Envío Express', price: 9.99 },
    premium: { name: 'Envío Premium', price: 15.99 }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryPrice = deliveryOptions[deliveryOption]?.price || 0;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + deliveryPrice + tax;

  const containerClasses = isSticky 
    ? "sticky top-24 bg-card rounded-lg border border-border p-6 shadow-soft"
    : "bg-card rounded-lg border border-border p-6";

  return (
    <div className={containerClasses}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
          <Icon name="shopping-bag" size={16} />
        </div>
        <h2 className="font-heading font-semibold text-xl">Resumen del Pedido</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 py-3 border-b border-border last:border-b-0">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
              <p className="text-xs text-muted-foreground">{item.size}</p>
            </div>
            
            <div className="text-right">
              <p className="font-body font-semibold text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)} c/u</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Option */}
      {deliveryOption && (
        <div className="border-t border-border pt-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="truck" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body">{deliveryOptions[deliveryOption]?.name}</span>
            </div>
            <span className="text-sm font-body">
              {deliveryPrice === 0 ? 'Gratis' : `€${deliveryPrice.toFixed(2)}`}
            </span>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({cartItems.length} productos)</span>
          <span className="font-body">€{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-body">
            {deliveryPrice === 0 ? 'Gratis' : `€${deliveryPrice.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">IVA (21%)</span>
          <span className="font-body">€{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-heading font-semibold text-lg">Total</span>
            <span className="font-heading font-bold text-xl text-primary">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Savings Badge */}
      {subtotal >= 50 && deliveryPrice > 0 && (
        <div className="mt-4 bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="gift" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              ¡Envío gratis en pedidos superiores a €50!
            </span>
          </div>
        </div>
      )}

      {/* Security Note */}
      <div className="mt-6 bg-muted/30 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="shield-check" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Compra Segura</p>
            <p>Tus datos están protegidos con encriptación SSL de 256 bits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;