import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import AddToCartSection from './components/AddToCartSection';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const productId = searchParams.get('id') || '1';

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'Royal Canin Adult Perros Medianos',
      brand: 'Royal Canin',
      category: 'Perros',
      price: 45.99,
      originalPrice: 52.99,
      stock: 15,
      rating: 4.5,
      reviewCount: 128,
      images: [
        'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop'
      ],
      shortDescription: 'Alimento completo y equilibrado especialmente formulado para perros adultos de razas medianas (11-25 kg) de 1 a 7 años.',
      fullDescription: `Royal Canin Medium Adult es un alimento completo y equilibrado especialmente formulado para satisfacer las necesidades nutricionales específicas de perros adultos de razas medianas (11-25 kg) de 1 a 7 años de edad.

Esta fórmula contiene un complejo de antioxidantes que ayuda a mantener la vitalidad del perro adulto. Los nutrientes específicos, incluyendo EPA y DHA, contribuyen al mantenimiento de una piel sana y un pelaje brillante.

El tamaño, forma y textura del croqueta están especialmente adaptados para perros de razas medianas, facilitando la prensión y estimulando la masticación.`,
      features: [
        'Fórmula específica para razas medianas',
        'Complejo de antioxidantes',
        'Mantiene piel y pelaje saludables',
        'Croqueta adaptada al tamaño del perro',
        'Digestibilidad óptima'
      ],
      tags: ['Premium', 'Adulto', 'Razas Medianas', 'Antioxidantes'],
      specifications: {
        'Peso neto': '15 kg',
        'Edad recomendada': '1-7 años',
        'Tamaño de raza': 'Mediana (11-25 kg)',
        'Formato': 'Croquetas secas',
        'Origen': 'Francia'
      },
      ingredients: 'Harina de aves de corral, arroz, harina de maíz, grasa animal, pulpa de remolacha, minerales, aceite de pescado, aceite de soja, fructo-oligosacáridos, hidrolizado de proteínas animales, aceite de borraja, extracto de caléndula (fuente de luteína).',
      nutritionalInfo: {
        'Proteína': '25%',
        'Grasa': '14%',
        'Fibra': '1.3%',
        'Cenizas': '5.1%',
        'Humedad': '9.5%'
      },
      feedingGuide: 'La cantidad diaria recomendada debe dividirse en 2 comidas. Las cantidades indicadas son orientativas y pueden variar según la actividad, edad, raza y condiciones ambientales. El perro debe tener siempre agua fresca disponible.',
      feedingChart: [
        { weight: '11 kg', amount: '185 g' },
        { weight: '15 kg', amount: '230 g' },
        { weight: '20 kg', amount: '275 g' },
        { weight: '25 kg', amount: '315 g' }
      ],
      ratingBreakdown: {
        5: 78,
        4: 32,
        3: 12,
        2: 4,
        1: 2
      },
      reviews: [
        {
          author: 'María González',
          rating: 5,
          date: '15 Jul 2025',
          comment: 'Excelente producto. Mi perro lo adora y ha mejorado mucho su pelaje desde que empezamos a usarlo. Muy recomendable para razas medianas.'
        },
        {
          author: 'Carlos Ruiz',
          rating: 4,
          date: '10 Jul 2025',
          comment: 'Buena calidad, aunque el precio es un poco elevado. Mi golden retriever está muy bien con este alimento.'
        },
        {
          author: 'Ana Martín',
          rating: 5,
          date: '5 Jul 2025',
          comment: 'Llevamos años usando Royal Canin y siempre nos ha dado excelentes resultados. La digestión de nuestro perro es perfecta.'
        }
      ]
    },
    {
      id: '2',
      name: 'Hill\'s Science Diet Gatos Adultos',
      brand: 'Hill\'s',
      category: 'Gatos',
      price: 38.50,
      stock: 8,
      rating: 4.3,
      reviewCount: 95,
      images: [
        'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop'
      ],
      shortDescription: 'Nutrición científicamente formulada para gatos adultos de 1-6 años.',
      fullDescription: 'Hill\'s Science Diet Adult es una nutrición científicamente formulada para gatos adultos.',
      features: ['Nutrición científica', 'Antioxidantes naturales', 'Digestión saludable'],
      tags: ['Científico', 'Adulto', 'Digestión'],
      specifications: {
        'Peso neto': '10 kg',
        'Edad recomendada': '1-6 años',
        'Formato': 'Croquetas secas'
      },
      ingredients: 'Pollo, arroz integral, harina de pollo, grasa de pollo.',
      nutritionalInfo: {
        'Proteína': '32%',
        'Grasa': '20%',
        'Fibra': '1.5%'
      },
      feedingGuide: 'Dividir la cantidad diaria en 2-3 comidas.',
      feedingChart: [
        { weight: '3 kg', amount: '45 g' },
        { weight: '5 kg', amount: '65 g' }
      ],
      ratingBreakdown: { 5: 45, 4: 30, 3: 15, 2: 3, 1: 2 },
      reviews: [
        {
          author: 'Laura Pérez',
          rating: 4,
          date: '12 Jul 2025',
          comment: 'Buen producto para gatos adultos. Mi gato está sano y activo.'
        }
      ]
    },
    {
      id: '3',
      name: 'Purina Pro Plan Cachorros',
      brand: 'Purina',
      category: 'Perros',
      price: 42.75,
      stock: 12,
      rating: 4.6,
      reviewCount: 156,
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop'
      ],
      shortDescription: 'Alimento premium para cachorros en crecimiento.',
      fullDescription: 'Purina Pro Plan Puppy es un alimento premium diseñado específicamente para cachorros.',
      features: ['Rico en proteínas', 'DHA para desarrollo cerebral', 'Sistema inmune'],
      tags: ['Premium', 'Cachorros', 'Crecimiento'],
      specifications: {
        'Peso neto': '12 kg',
        'Edad recomendada': '2-12 meses'
      },
      ingredients: 'Pollo, arroz, harina de pollo, grasa de pollo.',
      nutritionalInfo: {
        'Proteína': '28%',
        'Grasa': '17%'
      },
      feedingGuide: 'Alimentar 3-4 veces al día según la edad.',
      feedingChart: [
        { weight: '5 kg', amount: '120 g' },
        { weight: '10 kg', amount: '180 g' }
      ],
      ratingBreakdown: { 5: 89, 4: 45, 3: 15, 2: 5, 1: 2 },
      reviews: []
    }
  ];

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundProduct = mockProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(mockProducts.filter(p => p.category === foundProduct.category));
      }
      
      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    // Load cart count from localStorage
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(savedCartCount));
  }, []);

  const handleAddToCart = (product, quantity) => {
    // Simulate adding to cart
    const newCartCount = cartCount + quantity;
    setCartCount(newCartCount);
    localStorage.setItem('cartCount', newCartCount.toString());
    
    // Save cart items (simplified)
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
  };

  const handleBackToProducts = () => {
    navigate('/product-catalog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="font-body text-muted-foreground">Cargando producto...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="text-center space-y-4">
            <Icon name="package-x" size={64} className="text-muted-foreground mx-auto" />
            <h1 className="font-heading font-bold text-2xl text-foreground">
              Producto no encontrado
            </h1>
            <p className="font-body text-muted-foreground">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={handleBackToProducts} iconName="arrow-left" iconPosition="left">
              Volver a productos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Inicio', path: '/homepage', icon: 'home' },
    { label: 'Productos', path: '/product-catalog', icon: 'shopping-bag' },
    { label: product.name, path: `/product-detail?id=${product.id}`, icon: 'package' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Back Button - Mobile */}
        <div className="mb-6 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToProducts}
            iconName="arrow-left"
            iconPosition="left"
          >
            Volver
          </Button>
        </div>

        {/* Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Information & Purchase */}
          <div className="space-y-6">
            <ProductInfo product={product} />
            <AddToCartSection product={product} onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} currentProductId={product.id} />
      </main>
    </div>
  );
};

export default ProductDetail;