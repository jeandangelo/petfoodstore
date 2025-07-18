import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuantitySelector = ({ min = 1, max = 99, initialQuantity = 1, onQuantityChange, disabled = false }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    onQuantityChange?.(clampedValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="font-body text-sm text-muted-foreground">Cantidad:</span>
      <div className="flex items-center border border-border rounded-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none border-0"
          onClick={handleDecrease}
          disabled={disabled || quantity <= min}
        >
          <Icon name="minus" size={16} />
        </Button>
        
        <input
          type="number"
          min={min}
          max={max}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-16 h-10 text-center border-0 border-l border-r border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none border-0"
          onClick={handleIncrease}
          disabled={disabled || quantity >= max}
        >
          <Icon name="plus" size={16} />
        </Button>
      </div>
      
      {max < 99 && (
        <span className="font-caption text-xs text-muted-foreground">
          Máx: {max}
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;