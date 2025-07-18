import React from 'react';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import TrustSignals from './components/TrustSignals';
import NewsletterSignup from './components/NewsletterSignup';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Hero Banner Section */}
        <HeroBanner />
        
        {/* Category Navigation */}
        <CategoryGrid />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Trust Signals & Testimonials */}
        <TrustSignals />
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-16">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <span className="text-white font-bold text-lg">🐾</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary">PetFoodStore</h3>
                  <p className="font-caption text-xs text-muted-foreground -mt-1">Cuidado con amor</p>
                </div>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Tu tienda de confianza para la alimentación y cuidado de mascotas. Productos de calidad premium para el bienestar de tus compañeros peludos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="/homepage" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a></li>
                <li><a href="/product-catalog" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Productos</a></li>
                <li><a href="/shopping-cart" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Carrito</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Categorías</h4>
              <ul className="space-y-2">
                <li><a href="/product-catalog?category=dogs" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Perros</a></li>
                <li><a href="/product-catalog?category=cats" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Gatos</a></li>
                <li><a href="/product-catalog?category=birds" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Aves</a></li>
                <li><a href="/product-catalog?category=fish" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Peces</a></li>
                <li><a href="/product-catalog?category=accessories" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Accesorios</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-primary mt-1">📍</span>
                  <p className="font-body text-sm text-muted-foreground">
                    Calle Principal 123<br />
                    28001 Madrid, España
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">📞</span>
                  <p className="font-body text-sm text-muted-foreground">+34 900 123 456</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✉️</span>
                  <p className="font-body text-sm text-muted-foreground">info@petfoodstore.es</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">🕒</span>
                  <p className="font-body text-sm text-muted-foreground">Lun-Vie: 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-caption text-sm text-muted-foreground">
              © {new Date().getFullYear()} PetFoodStore. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="font-caption text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="font-caption text-sm text-muted-foreground hover:text-primary transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="font-caption text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;