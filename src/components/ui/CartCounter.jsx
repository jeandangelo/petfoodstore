import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const CartCounter = ({ count = 0, showAnimation = true, size = 'default' }) => {
  const [animateCount, setAnimateCount] = useState(false);
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    if (count !== displayCount && showAnimation) {
      setAnimateCount(true);
      const timer = setTimeout(() => {
        setDisplayCount(count);
        setAnimateCount(false);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setDisplayCount(count);
    }
  }, [count, displayCount, showAnimation]);

  // Size variants
  const sizeClasses = {
    sm: {
      badge: 'w-4 h-4 text-xs',
      icon: 16,
      position: '-top-1 -right-1'
    },
    default: {
      badge: 'w-5 h-5 text-xs',
      icon: 20,
      position: '-top-1 -right-1'
    },
    lg: {
      badge: 'w-6 h-6 text-sm',
      icon: 24,
      position: '-top-2 -right-2'
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.default;

  if (displayCount === 0) {
    return (
      <div className="relative">
        <Icon name="shopping-cart" size={currentSize.icon} />
      </div>
    );
  }

  return (
    <div className="relative">
      <Icon name="shopping-cart" size={currentSize.icon} />
      <span
        className={`
          absolute ${currentSize.position} 
          bg-accent text-accent-foreground 
          font-bold rounded-full 
          flex items-center justify-center
          ${currentSize.badge}
          ${animateCount ? 'animate-cart-bounce' : ''}
          transition-all duration-200 ease-out
        `}
      >
        {displayCount > 99 ? '99+' : displayCount}
      </span>
    </div>
  );
};

export default CartCounter;