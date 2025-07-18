// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// --- IMPORTACIÓN CORREGIDA ---
import Button from "../components/ui/Button.jsx"; // Sube un nivel (..) para salir de 'pages', luego entra a 'components/ui/'
import Icon from "../components/AppIcon.jsx"; // Asumo que AppIcon también está en components/, ajusta si no es así.

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</p>
      <p className="text-gray-600 mb-8">Lo sentimos, la página que buscas no existe.</p>
      {/* Asegúrate de que el componente Button reciba las props correctas si tiene estilos personalizados o variantes */}
      <Button onClick={handleGoHome} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Volver al inicio
      </Button>
      {/* Si tienes un componente Icon y necesitas usarlo */}
      {/* <Icon name="home" className="text-blue-500 text-4xl mt-4" /> */}
    </div>
  );
};

export default NotFound;