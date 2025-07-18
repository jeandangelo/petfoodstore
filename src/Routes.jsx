// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// --- IMPORTACIONES CORREGIDAS SEGÚN TU ESTRUCTURA ---

// Componentes generales (asumiendo que están directamente en src/components/)
// Si ScrollToTop y ErrorBoundary están en subcarpetas (ej. components/ScrollToTop/index.jsx), ajusta la ruta.
import ScrollToTop from "./components/ScrollToTop.jsx"; // Si es directamente ScrollToTop.jsx en components
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Si es directamente ErrorBoundary.jsx en components

// Páginas (ajustadas para apuntar a los `index.jsx` dentro de las carpetas de página)
// Asegúrate que el nombre de la CARPETA coincide con la importación (ej. 'homepage' con 'homepage')
import Homepage from "./pages/homepage/index.jsx";             // APUNTA A LA CARPETA 'homepage' y su 'index.jsx'
import ShoppingCart from "./pages/shopping-cart/index.jsx";     // APUNTA A LA CARPETA 'shopping-cart' y su 'index.jsx'
import ProductDetail from "./pages/product-detail/index.jsx";   // APUNTA A LA CARPETA 'product-detail' y su 'index.jsx'
import Checkout from "./pages/checkout/index.jsx";             // APUNTA A LA CARPETA 'checkout' y su 'index.jsx'
import ProductCatalog from "./pages/product-catalog/index.jsx"; // APUNTA A LA CARPETA 'product-catalog' y su 'index.jsx'

// Para NotFound.jsx, según tu captura, está directamente en src/pages/
import NotFound from "./pages/NotFound.jsx";                   // Esta parece ser correcta tal cual la tenías, si el archivo es NotFound.jsx

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;