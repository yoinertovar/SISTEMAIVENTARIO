import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook para acceder al contexto de autenticación
 * 
 * @returns {Object} Contexto de autenticación que incluye:
 *   - user: Información del usuario autenticado
 *   - role: Rol del usuario para permisos
 *   - login: Función para iniciar sesión
 *   - logout: Función para cerrar sesión
 *   - isAuthenticated: Estado de autenticación
 * 
 * @throws {Error} Si se usa fuera de un AuthProvider
 * 
 * @example
 * const { user, login, logout } = useAuth();
 * 
 * @example
 * // Uso con autenticación
 * const handleLogin = async (credentials) => {
 *   try {
 *     await login(credentials);
 *   } catch (error) {
 *     console.error('Error de autenticación:', error);
 *   }
 * };
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
};