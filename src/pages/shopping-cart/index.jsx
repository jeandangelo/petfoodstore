import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import Icon from '../../components/AppIcon';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data - in real app this would come from context/state management
  const mockCartItems = [
    {
      id: 1,
      name: "Royal Canin Adult Maxi - Alimento seco para perros adultos de razas grandes",
      brand: "Royal Canin",
      price: 45.99,
      originalPrice: 52.99,
      quantity: 2,
      stock: 15,
      size: "15kg",
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "dogs"
    },
    {
      id: 2,
      name: "Hill\'s Science Diet Kitten - Comida húmeda para gatitos",
      brand: "Hill\'s",
      price: 28.50,
      quantity: 1,
      stock: 8,
      size: "12 latas x 85g",
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "cats"
    },
    {
      id: 3,
      name: "Kong Classic - Juguete resistente para perros medianos",
      brand: "Kong",
      price: 12.99,
      quantity: 1,
      stock: 3,
      size: "Mediano",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "toys"
    },
    {
      id: 4,
      name: "Whiskas Adult Pescado - Alimento completo para gatos adultos",
      brand: "Whiskas",
      price: 18.75,
      quantity: 3,
      stock: 0, // Out of stock item
      size: "3kg",
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "cats"
    }
  ];

  // Load cart data on component mount
  useEffect(() => {
    const loadCartData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In real app, this would fetch from localStorage or API
      const savedCart = localStorage.getItem('petstore_cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setCartItems(mockCartItems);
        }
      } else {
        setCartItems(mockCartItems);
      }
      
      setIsLoading(false);
    };

    loadCartData();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('petstore_cart', JSON.stringify(cartItems));
      // Update cart count in header
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cartCount', totalItems.toString());
    } else {
      localStorage.removeItem('petstore_cart');
      localStorage.setItem('cartCount', '0');
    }
  }, [cartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleRemoveItem = async (itemId) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleProceedToCheckout = async () => {
    setIsProcessing(true);
    
    // Check for out of stock items
    const outOfStockItems = cartItems.filter(item => item.stock === 0);
    if (outOfStockItems.length > 0) {
      alert(`Los siguientes productos no están disponibles: ${outOfStockItems.map(item => item.name).join(', ')}`);
      setIsProcessing(false);
      return;
    }
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsProcessing(false);
    navigate('/checkout');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 50;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 5.99;
  const total = subtotal + shipping;
  const itemCount = cartItems.length;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Icon name="loader-2" size={48} className="animate-spin text-primary mx-auto mb-4" />
              <p className="font-body text-muted-foreground">Cargando carrito...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <Breadcrumb />
        
        <CartHeader itemCount={itemCount} totalItems={totalItems} />

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    isUpdating={updatingItems.has(item.id)}
                  />
                ))}
              </div>

              {/* Mobile Cart Summary */}
              <div className="lg:hidden mt-8">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  itemCount={itemCount}
                  onProceedToCheckout={handleProceedToCheckout}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* Desktop Cart Summary */}
            <div className="hidden lg:block">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                itemCount={itemCount}
                onProceedToCheckout={handleProceedToCheckout}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        )}

        {/* Additional Information */}
        {cartItems.length > 0 && (
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Información importante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Icon name="truck" size={16} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Envío</div>
                  <div className="text-muted-foreground font-caption">
                    Entrega en 24-48h. Envío gratis desde €50.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="rotate-ccw" size={16} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Devoluciones</div>
                  <div className="text-muted-foreground font-caption">
                    30 días para devolver productos sin abrir.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="shield-check" size={16} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Garantía</div>
                  <div className="text-muted-foreground font-caption">
                    Productos originales con garantía del fabricante.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="headphones" size={16} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Soporte</div>
                  <div className="text-muted-foreground font-caption">
                    Atención al cliente 24/7 para resolver dudas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;