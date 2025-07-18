import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartSummary = ({ 
  subtotal, 
  shipping, 
  total, 
  itemCount, 
  onProceedToCheckout,
  isProcessing = false 
}) => {
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
      <h2 className="font-heading font-bold text-xl text-foreground mb-4">
        Resumen del pedido
      </h2>

      {/* Order Summary Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-body text-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
          </span>
          <span className="font-body font-semibold text-foreground">
            €{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-body text-foreground">Envío</span>
          <span className="font-body font-semibold text-foreground">
            {hasFreeShipping ? (
              <span className="text-success">Gratis</span>
            ) : (
              `€${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {!hasFreeShipping && remainingForFreeShipping > 0 && (
          <div className="bg-muted rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="truck" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                ¡Envío gratis desde €{freeShippingThreshold}!
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Te faltan €{remainingForFreeShipping.toFixed(2)} para envío gratuito
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {hasFreeShipping && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Icon name="check-circle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                ¡Tienes envío gratuito!
              </span>
            </div>
          </div>
        )}

        <hr className="border-border" />

        <div className="flex justify-between items-center">
          <span className="font-heading font-bold text-lg text-foreground">
            Total
          </span>
          <span className="font-heading font-bold text-xl text-primary">
            €{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onProceedToCheckout}
          disabled={isProcessing}
          loading={isProcessing}
          iconName="credit-card"
          iconPosition="left"
        >
          Proceder al pago
        </Button>

        <Link to="/product-catalog">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="arrow-left"
            iconPosition="left"
          >
            Continuar comprando
          </Button>
        </Link>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Icon name="shield-check" size={16} className="text-success" />
          <span className="font-caption">Compra 100% segura</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;