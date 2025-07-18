import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Brand and Category */}
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-muted rounded-full w-16"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        
        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-muted rounded w-8"></div>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        
        {/* Features */}
        <div className="flex space-x-1">
          <div className="h-5 bg-muted rounded-full w-16"></div>
          <div className="h-5 bg-muted rounded-full w-20"></div>
        </div>
        
        {/* Button */}
        <div className="h-8 bg-muted rounded w-full mt-3"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;