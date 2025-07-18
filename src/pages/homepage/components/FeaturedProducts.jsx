import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const [cartItems, setCartItems] = useState({});

  const featuredProducts = [
    {
      id: 1,
      name: "Royal Canin Adult Perro Grande",
      brand: "Royal Canin",
      price: 89.99,
      originalPrice: 109.99,
      discount: 18,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "dogs",
      inStock: true,
      isNew: false,
      isBestseller: true,
      description: "Alimento completo y balanceado para perros adultos de razas grandes"
    },
    {
      id: 2,
      name: "Whiskas Adulto Salmón",
      brand: "Whiskas",
      price: 24.99,
      originalPrice: null,
      discount: 0,
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
      category: "cats",
      inStock: true,
      isNew: true,
      isBestseller: false,
      description: "Alimento húmedo para gatos adultos con delicioso sabor a salmón"
    },
    {
      id: 3,
      name: "Hill\'s Science Diet Cachorro",
      brand: "Hill\'s",
      price: 67.50,
      originalPrice: 75.00,
      discount: 10,
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 156,
      category: "dogs",
      inStock: true,
      isNew: false,
      isBestseller: true,
      description: "Nutrición científicamente formulada para cachorros en crecimiento"
    },
    {
      id: 4,
      name: "Purina Pro Plan Gato Esterilizado",
      brand: "Purina",
      price: 45.99,
      originalPrice: 52.99,
      discount: 13,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 298,
      category: "cats",
      inStock: true,
      isNew: false,
      isBestseller: false,
      description: "Fórmula especial para gatos esterilizados con control de peso"
    },
    {
      id: 5,
      name: "Eukanuba Adult Small Breed",
      brand: "Eukanuba",
      price: 34.99,
      originalPrice: null,
      discount: 0,
      image: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 87,
      category: "dogs",
      inStock: false,
      isNew: true,
      isBestseller: false,
      description: "Alimento premium para perros adultos de razas pequeñas"
    },
    {
      id: 6,
      name: "Felix Sensations Pollo",
      brand: "Felix",
      price: 18.99,
      originalPrice: 21.99,
      discount: 14,
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 145,
      category: "cats",
      inStock: true,
      isNew: false,
      isBestseller: false,
      description: "Deliciosas gelatinas con trozos de pollo para gatos exigentes"
    }
  ];

  const handleAddToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    // Update cart count in localStorage
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    localStorage.setItem('cartCount', (currentCount + 1).toString());

    // Trigger cart counter animation
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
            Productos Destacados
          </h2>
          <p className="font-body text-muted-foreground">
            Los favoritos de nuestros clientes y sus mascotas
          </p>
        </div>
        <Link 
          to="/product-catalog"
          className="hidden md:flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="font-body font-medium">Ver todos</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group hover-lift"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Link to={`/product-detail?id=${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product.discount > 0 && (
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded">
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2 py-1 bg-success text-success-foreground text-xs font-bold rounded">
                    Nuevo
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-3 py-1 bg-error text-error-foreground text-sm font-bold rounded">
                    Agotado
                  </span>
                </div>
              )}

              {/* Quick Add Button - Desktop */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                  className="w-8 h-8 shadow-soft"
                >
                  <Icon name="plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4">
              {/* Brand */}
              <p className="font-caption text-xs text-muted-foreground mb-1">
                {product.brand}
              </p>

              {/* Product Name */}
              <Link to={`/product-detail?id=${product.id}`}>
                <h3 className="font-body font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="font-caption text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-heading font-bold text-lg text-foreground">
                  €{product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-sm text-muted-foreground line-through">
                    €{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button - Mobile */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                  fullWidth
                  iconName="shopping-cart"
                  iconPosition="left"
                >
                  {cartItems[product.id] ? `En carrito (${cartItems[product.id]})` : 'Agregar'}
                </Button>
              </div>

              {/* Desktop Add to Cart */}
              <div className="hidden md:block">
                <Button
                  variant={cartItems[product.id] ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                  fullWidth
                  iconName={cartItems[product.id] ? "check" : "shopping-cart"}
                  iconPosition="left"
                >
                  {cartItems[product.id] ? `Agregado (${cartItems[product.id]})` : 'Agregar al carrito'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="md:hidden mt-6 text-center">
        <Link 
          to="/product-catalog"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-body font-medium"
        >
          <span>Ver todos los productos</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;