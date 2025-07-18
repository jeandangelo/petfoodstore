import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'dogs',
      name: 'Perros',
      description: 'Alimento y cuidado para perros',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'dog',
      productCount: 156,
      color: 'bg-primary',
      link: '/product-catalog?category=dogs'
    },
    {
      id: 'cats',
      name: 'Gatos',
      description: 'Nutrición especializada para felinos',
      image: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'cat',
      productCount: 124,
      color: 'bg-secondary',
      link: '/product-catalog?category=cats'
    },
    {
      id: 'birds',
      name: 'Aves',
      description: 'Semillas y alimento para aves',
      image: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'bird',
      productCount: 89,
      color: 'bg-accent',
      link: '/product-catalog?category=birds'
    },
    {
      id: 'fish',
      name: 'Peces',
      description: 'Alimento y accesorios acuáticos',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'fish',
      productCount: 67,
      color: 'bg-success',
      link: '/product-catalog?category=fish'
    },
    {
      id: 'small-pets',
      name: 'Mascotas Pequeñas',
      description: 'Conejos, hámsters y más',
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'rabbit',
      productCount: 45,
      color: 'bg-warning',
      link: '/product-catalog?category=small-pets'
    },
    {
      id: 'accessories',
      name: 'Accesorios',
      description: 'Juguetes, correas y más',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      icon: 'toy-brick',
      productCount: 203,
      color: 'bg-primary',
      link: '/product-catalog?category=accessories'
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
            Categorías
          </h2>
          <p className="font-body text-muted-foreground">
            Encuentra productos específicos para tu mascota
          </p>
        </div>
        <Link 
          to="/product-catalog"
          className="hidden md:flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="font-body font-medium">Ver todo</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="flex-shrink-0 w-32 group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 group-hover:scale-105">
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${category.color}/80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name={category.icon} size={32} color="white" />
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <h3 className="font-body font-semibold text-sm text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    {category.productCount} productos
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group hover-lift"
          >
            <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 bg-card">
              <div className="aspect-[4/3] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 ${category.color}/70 group-hover:${category.color}/60 transition-colors duration-300`} />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name={category.icon} size={24} color="white" />
                  </div>
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium">
                      {category.productCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="font-body text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-sm text-muted-foreground">
                    {category.productCount} productos disponibles
                  </span>
                  <Icon 
                    name="arrow-right" 
                    size={16} 
                    className="text-primary group-hover:translate-x-1 transition-transform" 
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="md:hidden mt-6 text-center">
        <Link 
          to="/product-catalog"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-body font-medium"
        >
          <span>Ver todas las categorías</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;