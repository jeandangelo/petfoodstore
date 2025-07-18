import React from 'react';
import Icon from '../../../components/AppIcon';

const CartHeader = ({ itemCount, totalItems }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name="shopping-cart" size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Carrito de compras
          </h1>
          <p className="font-body text-muted-foreground">
            {itemCount === 0 
              ? "No hay productos en tu carrito"
              : `${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} (${totalItems} ${totalItems === 1 ? 'unidad' : 'unidades'})`
            }
          </p>
        </div>
      </div>

      {itemCount > 0 && (
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="info" size={16} />
          <span className="font-caption">
            Los precios incluyen IVA
          </span>
        </div>
      )}
    </div>
  );
};

export default CartHeader;