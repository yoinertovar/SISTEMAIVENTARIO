import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Página 404 - Recurso no encontrado
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
function NotFoundPage() {
  const navigate = useNavigate();

  /**
   * Maneja la navegación de vuelta a la página de inicio
   * Redirige al login como página principal
   */
  const handleGoHome = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      
      {/* Código de error */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      
      {/* Mensaje descriptivo */}
      <p className="text-xl text-gray-700 mb-6">
        Lo sentimos, la página que buscas no existe.
      </p>
      
      {/* Botón de acción */}
      <button
        onClick={handleGoHome}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default NotFoundPage;