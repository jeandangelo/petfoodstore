import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProgressIndicator from './components/ProgressIndicator';
import ShippingForm from './components/ShippingForm';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import Icon from '../../components/AppIcon';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form data states
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    instructions: ''
  });

  const [deliveryOption, setDeliveryOption] = useState('express');
  
  const [paymentData, setPaymentData] = useState({
    method: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    acceptTerms: false
  });

  const [orderData, setOrderData] = useState(null);

  // Load cart items on component mount
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          if (items.length === 0) {
            // Redirect to cart if empty
            navigate('/shopping-cart');
            return;
          }
          setCartItems(items);
        } else {
          // Redirect to cart if no items
          navigate('/shopping-cart');
          return;
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        // Use mock data if localStorage fails
        setCartItems(mockCartItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, [navigate]);

  // Mock cart items for development
  const mockCartItems = [
    {
      id: 1,
      name: "Royal Canin Adult Maxi",
      brand: "Royal Canin",
      price: 45.99,
      quantity: 2,
      size: "15kg",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Hill\'s Science Diet Kitten",
      brand: "Hill\'s",
      price: 32.50,
      quantity: 1,
      size: "7kg",
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop"
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryOptions = {
    standard: { name: 'Envío Estándar', price: 4.99 },
    express: { name: 'Envío Express', price: 9.99 },
    premium: { name: 'Envío Premium', price: 15.99 }
  };
  const deliveryPrice = deliveryOptions[deliveryOption]?.price || 0;
  const tax = subtotal * 0.21;
  const total = subtotal + deliveryPrice + tax;

  // Step navigation handlers
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOrderComplete = () => {
    const finalOrderData = {
      orderNumber: `PFS-${Date.now().toString().slice(-8)}`,
      shippingAddress: shippingData,
      deliveryOption,
      paymentMethod: paymentData.method,
      items: cartItems,
      subtotal,
      deliveryPrice,
      tax,
      total,
      orderDate: new Date()
    };
    
    setOrderData(finalOrderData);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom breadcrumb for checkout
  const checkoutBreadcrumb = [
    { label: 'Inicio', path: '/homepage', icon: 'home' },
    { label: 'Carrito', path: '/shopping-cart', icon: 'shopping-cart' },
    { label: 'Finalizar Compra', path: '/checkout', icon: 'credit-card' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        <Breadcrumb customItems={checkoutBreadcrumb} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
            Finalizar Compra
          </h1>
          <p className="text-muted-foreground">
            Completa tu pedido de forma rápida y segura
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Main Content */}
        {currentStep === 3 ? (
          // Order Confirmation
          <OrderConfirmation 
            orderData={orderData} 
            onOrderComplete={() => {
              // Clear cart
              localStorage.removeItem('cartItems');
              localStorage.setItem('cartCount', '0');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <>
                  <ShippingForm
                    onNext={handleNextStep}
                    shippingData={shippingData}
                    onShippingChange={setShippingData}
                  />
                  
                  {/* Delivery Options */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <DeliveryOptions
                      selectedOption={deliveryOption}
                      onOptionChange={setDeliveryOption}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <PaymentForm
                  onNext={handleOrderComplete}
                  onBack={handlePreviousStep}
                  paymentData={paymentData}
                  onPaymentChange={setPaymentData}
                />
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                deliveryOption={deliveryOption}
                isSticky={true}
              />
            </div>
          </div>
        )}

        {/* Mobile Order Summary for Step 1 & 2 */}
        {currentStep < 3 && (
          <div className="lg:hidden mt-8">
            <OrderSummary
              cartItems={cartItems}
              deliveryOption={deliveryOption}
              isSticky={false}
            />
          </div>
        )}

        {/* Security Footer */}
        {currentStep < 3 && (
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="shield-check" size={20} className="text-success" />
                <span className="text-sm font-medium">Compra 100% Segura</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="lock" size={20} className="text-success" />
                <span className="text-sm font-medium">Datos Protegidos SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="truck" size={20} className="text-success" />
                <span className="text-sm font-medium">Envío Garantizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="rotate-ccw" size={20} className="text-success" />
                <span className="text-sm font-medium">Devolución Fácil</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;