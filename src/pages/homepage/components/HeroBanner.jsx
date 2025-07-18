import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const bannerSlides = [
    {
      id: 1,
      title: "Alimentación Premium para tu Mascota",
      subtitle: "Descubre nuestra selección de alimentos naturales y nutritivos",
      description: "Productos certificados por veterinarios con ingredientes de la más alta calidad",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      ctaText: "Ver Productos",
      ctaLink: "/product-catalog",
      discount: "20% OFF",
      bgGradient: "from-primary/90 to-secondary/90"
    },
    {
      id: 2,
      title: "Cuidado Completo para Perros",
      subtitle: "Todo lo que necesita tu mejor amigo",
      description: "Desde cachorros hasta adultos mayores, tenemos la nutrición perfecta",
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      ctaText: "Explorar",
      ctaLink: "/product-catalog?category=dogs",
      discount: "Envío Gratis",
      bgGradient: "from-accent/90 to-primary/90"
    },
    {
      id: 3,
      title: "Nutrición Especializada para Gatos",
      subtitle: "Sabores irresistibles y nutrición balanceada",
      description: "Fórmulas especiales para cada etapa de vida de tu felino",
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      ctaText: "Descubrir",
      ctaLink: "/product-catalog?category=cats",
      discount: "Nuevo",
      bgGradient: "from-secondary/90 to-accent/90"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, bannerSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-soft-lg mb-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentBanner.image}
          alt={currentBanner.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.bgGradient}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl text-white">
            {/* Discount Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-bold mb-4">
              <Icon name="tag" size={16} className="mr-2" />
              {currentBanner.discount}
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
              {currentBanner.title}
            </h1>

            {/* Subtitle */}
            <h2 className="font-body text-lg md:text-xl lg:text-2xl mb-4 opacity-90">
              {currentBanner.subtitle}
            </h2>

            {/* Description */}
            <p className="font-body text-base md:text-lg mb-6 opacity-80 max-w-lg">
              {currentBanner.description}
            </p>

            {/* CTA Button */}
            <Link to={currentBanner.ctaLink}>
              <Button 
                variant="default" 
                size="lg"
                iconName="arrow-right"
                iconPosition="right"
                className="bg-white text-primary hover:bg-white/90 shadow-soft"
              >
                {currentBanner.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Slide anterior"
      >
        <Icon name="chevron-left" size={24} color="white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Siguiente slide"
      >
        <Icon name="chevron-right" size={24} color="white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label={isAutoPlaying ? "Pausar reproducción automática" : "Reanudar reproducción automática"}
        >
          <Icon 
            name={isAutoPlaying ? "pause" : "play"} 
            size={16} 
            color="white" 
          />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;