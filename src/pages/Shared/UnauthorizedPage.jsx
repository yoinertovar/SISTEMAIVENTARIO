import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Página 403 - Acceso no autorizado
 * Se muestra cuando el usuario no tiene permisos para acceder a un recurso
 */
function UnauthorizedPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  /**
   * Maneja la navegación a la página principal
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * Maneja el cierre de sesión del usuario
   * Limpia la autenticación y redirige al login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      
      {/* Título de error */}
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
      
      {/* Mensaje descriptivo */}
      <p className="text-lg text-gray-700 mb-6">
        No tienes permisos para ver esta página.
      </p>
      
      {/* Botones de acción */}
      <div className="space-x-4">
        <button
          onClick={handleGoHome}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150"
        >
          Ir al Inicio
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-150"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;