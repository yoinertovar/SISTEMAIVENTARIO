import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/common/Loading';

/**
 * Componente de Ruta Privada
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos a renderizar
 * @param {Array} props.allowedRoles - Roles permitidos para acceder a la ruta
 * @returns {JSX.Element} Componente de ruta privada o redirección
 * 
 * @description
 * - Verifica autenticación del usuario
 * - Controla acceso basado en roles
 * - Muestra loading durante la verificación
 * - Redirige a login si no está autenticado
 * - Redirige al dashboard correspondiente si el rol no tiene acceso
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();

  // Estado de carga - mostrar spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading size="lg" text="Verificando acceso..." />
      </div>
    );
  }

  // Usuario no autenticado - redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado pero sin permisos de rol - redirigir al dashboard correspondiente
  if (allowedRoles && !allowedRoles.includes(role)) {
    const dashboardPath = role === 'admin' ? '/admin/dashboard' : '/worker/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // Usuario autenticado y con permisos - renderizar contenido
  return children;
};

export default PrivateRoute;