import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      id: 1,
      icon: 'tag',
      text: 'Ofertas exclusivas y descuentos especiales'
    },
    {
      id: 2,
      icon: 'bell',
      text: 'Notificaciones de nuevos productos'
    },
    {
      id: 3,
      icon: 'heart',
      text: 'Consejos de cuidado para mascotas'
    },
    {
      id: 4,
      icon: 'gift',
      text: 'Regalos sorpresa en fechas especiales'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-center text-white">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check-circle" size={32} color="white" />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-4">
              ¡Gracias por suscribirte!
            </h2>
            <p className="font-body text-white/90 mb-6">
              Te hemos enviado un email de confirmación. Pronto recibirás nuestras mejores ofertas y consejos para el cuidado de tu mascota.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Suscribir otro email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Side */}
          <div className="p-8 lg:p-12 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="mail" size={24} />
              <span className="font-caption text-sm font-medium opacity-90">
                Newsletter
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Mantente al día con PetFoodStore
            </h2>
            
            <p className="font-body text-white/90 mb-6 leading-relaxed">
              Suscríbete a nuestro newsletter y recibe las mejores ofertas, consejos de expertos y novedades para el cuidado de tu mascota directamente en tu email.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} size={14} color="white" />
                  </div>
                  <span className="font-body text-sm text-white/90">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isLoading}
                fullWidth
                iconName="send"
                iconPosition="right"
                className="bg-white text-primary hover:bg-white/90"
              >
                {isLoading ? 'Suscribiendo...' : 'Suscribirme gratis'}
              </Button>
            </form>

            <p className="font-caption text-xs text-white/70 mt-4">
              Al suscribirte aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.
            </p>
          </div>

          {/* Visual Side */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="heart" size={64} color="white" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  Únete a nuestra familia
                </h3>
                <p className="font-body text-white/80">
                  Más de 10,000 dueños de mascotas ya confían en nosotros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;