import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: 'shield-check',
      title: 'Productos Certificados',
      description: 'Todos nuestros productos están certificados por veterinarios y cumplen con los más altos estándares de calidad.',
      color: 'text-success'
    },
    {
      id: 2,
      icon: 'truck',
      title: 'Envío Gratuito',
      description: 'Envío gratuito en pedidos superiores a €50. Entrega rápida y segura en toda España.',
      color: 'text-primary'
    },
    {
      id: 3,
      icon: 'heart-handshake',
      title: 'Garantía de Satisfacción',
      description: 'Si no estás satisfecho con tu compra, te devolvemos el dinero sin preguntas.',
      color: 'text-accent'
    },
    {
      id: 4,
      icon: 'phone',
      title: 'Soporte 24/7',
      description: 'Nuestro equipo de expertos está disponible para ayudarte en cualquier momento.',
      color: 'text-secondary'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      location: 'Madrid',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: `Mi perro Max nunca había estado tan saludable. Los productos de PetFoodStore son de excelente calidad y el servicio al cliente es excepcional.`,
      petName: 'Max',
      petType: 'Golden Retriever'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      location: 'Barcelona',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: `Compro aquí desde hace 2 años. La calidad es consistente y los precios son muy competitivos. Mi gata Luna está encantada con su comida.`,
      petName: 'Luna',
      petType: 'Gato Persa'
    },
    {
      id: 3,
      name: 'Ana Martín',
      location: 'Valencia',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: `El envío es súper rápido y el empaque es perfecto. Recomiendo PetFoodStore a todos los dueños de mascotas que buscan calidad.`,
      petName: 'Rocky',
      petType: 'Bulldog Francés'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Certificado Veterinario',
      image: 'https://images.pexels.com/photos/6235/certificate.jpg?auto=compress&cs=tinysrgb&w=120&h=80&fit=crop',
      description: 'Productos aprobados por veterinarios'
    },
    {
      id: 2,
      name: 'ISO 9001',
      image: 'https://images.pexels.com/photos/6235/certificate.jpg?auto=compress&cs=tinysrgb&w=120&h=80&fit=crop',
      description: 'Calidad certificada internacionalmente'
    },
    {
      id: 3,
      name: 'Organic Certified',
      image: 'https://images.pexels.com/photos/6235/certificate.jpg?auto=compress&cs=tinysrgb&w=120&h=80&fit=crop',
      description: 'Productos orgánicos certificados'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="star"
        size={14}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="mb-12">
      {/* Trust Features */}
      <div className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
          ¿Por qué elegir PetFoodStore?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature) => (
            <div
              key={feature.id}
              className="text-center p-6 bg-card rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 hover-lift"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 ${feature.color}`}>
                <Icon name={feature.icon} size={32} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
          Lo que dicen nuestros clientes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 hover-lift"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <blockquote className="font-body text-foreground mb-4 leading-relaxed">
                "{testimonial.comment}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-body font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                  <p className="font-caption text-xs text-primary">
                    Dueño de {testimonial.petName} ({testimonial.petType})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-muted rounded-lg p-6 md:p-8">
        <h3 className="font-heading font-semibold text-xl text-foreground text-center mb-6">
          Nuestras Certificaciones
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-20 h-14 bg-white rounded-lg shadow-soft flex items-center justify-center overflow-hidden group-hover:shadow-soft-lg transition-shadow">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="text-center">
                <p className="font-caption text-xs font-medium text-foreground">
                  {cert.name}
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;