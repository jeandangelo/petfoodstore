import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderConfirmation = ({ orderData, onOrderComplete }) => {
  const orderNumber = `PFS-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  useEffect(() => {
    // Clear cart and complete order
    if (onOrderComplete) {
      onOrderComplete();
    }
    
    // Clear cart from localStorage
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', '0');
  }, [onOrderComplete]);

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="flex items-center justify-center w-20 h-20 bg-success text-success-foreground rounded-full mx-auto mb-4 animate-cart-bounce">
          <Icon name="check-circle" size={40} />
        </div>
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
          ¡Pedido Confirmado!
        </h1>
        <p className="text-lg text-muted-foreground">
          Gracias por tu compra en PetFoodStore
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
              <Icon name="package" size={20} className="mr-2 text-primary" />
              Detalles del Pedido
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número de pedido:</span>
                <span className="font-mono font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha:</span>
                <span>{formatDate(new Date())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-semibold text-primary">€{orderData.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de pago:</span>
                <span className="capitalize">{orderData.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
              <Icon name="truck" size={20} className="mr-2 text-primary" />
              Información de Envío
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Dirección de envío:</p>
                <p className="font-medium">
                  {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                </p>
                <p>{orderData.shippingAddress.address}</p>
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.zipCode}
                </p>
                <p>{orderData.shippingAddress.country}</p>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Entrega estimada:</span>
                <span className="font-medium">{formatDate(estimatedDelivery)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/30 rounded-lg p-6 mb-8">
        <h3 className="font-heading font-semibold text-lg mb-4">¿Qué sigue?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mb-3">
              <Icon name="mail" size={20} />
            </div>
            <h4 className="font-medium mb-1">Confirmación por Email</h4>
            <p className="text-muted-foreground">
              Recibirás un email con los detalles de tu pedido
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mb-3">
              <Icon name="package-2" size={20} />
            </div>
            <h4 className="font-medium mb-1">Preparación</h4>
            <p className="text-muted-foreground">
              Prepararemos tu pedido con el máximo cuidado
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mb-3">
              <Icon name="truck" size={20} />
            </div>
            <h4 className="font-medium mb-1">Envío</h4>
            <p className="text-muted-foreground">
              Te enviaremos el código de seguimiento
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/homepage">
          <Button variant="outline" className="w-full sm:w-auto">
            Volver al Inicio
          </Button>
        </Link>
        <Link to="/product-catalog">
          <Button variant="default" className="w-full sm:w-auto">
            Seguir Comprando
          </Button>
        </Link>
      </div>

      {/* Contact Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          ¿Tienes alguna pregunta sobre tu pedido?
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <a
            href="mailto:pedidos@petfoodstore.com"
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="mail" size={16} />
            <span>pedidos@petfoodstore.com</span>
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="tel:+34900123456"
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="phone" size={16} />
            <span>900 123 456</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;