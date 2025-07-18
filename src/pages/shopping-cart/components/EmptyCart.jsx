import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const popularCategories = [
    {
      name: "Comida para Perros",
      icon: "dog",
      link: "/product-catalog?category=dogs",
      description: "Alimento premium para tu mejor amigo"
    },
    {
      name: "Comida para Gatos",
      icon: "cat",
      link: "/product-catalog?category=cats", 
      description: "Nutrición completa para felinos"
    },
    {
      name: "Juguetes",
      icon: "toy-brick",
      link: "/product-catalog?category=toys",
      description: "Diversión garantizada para mascotas"
    },
    {
      name: "Accesorios",
      icon: "heart",
      link: "/product-catalog?category=accessories",
      description: "Todo lo que necesita tu mascota"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Empty Cart Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <Icon name="shopping-cart" size={48} className="text-muted-foreground" />
        </div>
      </div>

      {/* Empty State Message */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-foreground mb-3">
          Tu carrito está vacío
        </h1>
        <p className="font-body text-muted-foreground text-lg mb-6">
          ¡Descubre nuestros productos premium para mascotas y llena tu carrito con amor!
        </p>
        
        <Link to="/product-catalog">
          <Button
            variant="default"
            size="lg"
            iconName="shopping-bag"
            iconPosition="left"
            className="mb-8"
          >
            Explorar productos
          </Button>
        </Link>
      </div>

      {/* Popular Categories */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
          Categorías populares
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularCategories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon name={category.icon} size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <div className="font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </div>
                <div className="text-sm text-muted-foreground font-caption">
                  {category.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="truck" size={24} className="text-success" />
            </div>
          </div>
          <h3 className="font-body font-semibold text-foreground mb-1">
            Envío gratis
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            En pedidos superiores a €50
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="shield-check" size={24} className="text-primary" />
            </div>
          </div>
          <h3 className="font-body font-semibold text-foreground mb-1">
            Calidad garantizada
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Productos premium certificados
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="headphones" size={24} className="text-accent" />
            </div>
          </div>
          <h3 className="font-body font-semibold text-foreground mb-1">
            Soporte 24/7
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Atención al cliente siempre disponible
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;