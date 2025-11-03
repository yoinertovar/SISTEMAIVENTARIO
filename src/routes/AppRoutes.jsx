import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import AdminRoutes from './AdminRoutes';
import WorkerRoutes from './WorkerRoutes';
import LoginPage from '../pages/Auth/LoginPage';
import Loading from '../components/common/Loading';
import { ROLES } from '../utils/constants';

/**
 * Componente Principal de Rutas de la Aplicación
 * 
 * @returns {JSX.Element} Configuración completa de enrutamiento de la app
 * 
 * @description
 * Maneja toda la lógica de routing de la aplicación:
 * - Control de autenticación global
 * - Redirecciones basadas en roles
 * - Protección de rutas privadas
 * - Gestión de estado de carga
 * - Manejo de rutas no encontradas (404)
 */
const AppRoutes = () => {
  const { isAuthenticated, role, loading } = useAuth();

  // Mostrar estado de carga durante la verificación de autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading size="lg" text="Inicializando aplicación..." />
      </div>
    );
  }

  return (
    <Routes>
      {/* Ruta de Login - redirige si ya está autenticado */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={role === ROLES.ADMIN ? '/admin/dashboard' : '/worker/dashboard'} replace />
          ) : (
            <LoginPage />
          )
        } 
      />

      {/* Rutas Protegidas de Administrador */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminRoutes />
          </PrivateRoute>
        }
      />

      {/* Rutas Protegidas de Trabajador */}
      <Route
        path="/worker/*"
        element={
          <PrivateRoute allowedRoles={[ROLES.WORKER]}>
            <WorkerRoutes />
          </PrivateRoute>
        }
      />

      {/* Ruta Raíz - Redirección Inteligente */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={role === ROLES.ADMIN ? '/admin/dashboard' : '/worker/dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Manejo de Rutas No Encontradas (404) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;