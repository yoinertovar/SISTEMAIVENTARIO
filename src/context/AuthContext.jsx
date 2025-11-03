/**
 * AuthContext - Contexto de Autenticación Global
 * 
 * Proveedor de contexto que maneja todo el estado y lógica de autenticación de la aplicación.
 * 
 * Proporciona:
 * - Estado del usuario actual (user, role, isAuthenticated, loading)
 * - Funciones de autenticación (login, logout)
 * - Funciones de verificación de roles (isAdmin, isWorker)
 * - Actualización de datos del usuario (updateUser)
 * - Verificación automática de token al cargar la app
 * - Persistencia de sesión mediante localStorage
 * 
 * @module AuthContext
 * 
 * @example
 * // Uso en App.jsx o index.jsx
 * import { AuthProvider } from './context/AuthContext';
 * 
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * @example
 * // Consumir el contexto en un componente
 * import { useAuth } from '../hooks/useAuth';
 * 
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   // ... usar las funciones y estado
 * }
 */

import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser, verifyToken } from '../services/authService';
import { ROLES } from '../utils/constants';

/**
 * Contexto de autenticación
 * Almacena el estado global de autenticación y las funciones relacionadas
 * 
 * @type {React.Context}
 */
export const AuthContext = createContext();

/**
 * AuthProvider - Proveedor del Contexto de Autenticación
 * 
 * Componente que envuelve la aplicación y proporciona el contexto de autenticación
 * a todos los componentes hijos.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * 
 * @returns {JSX.Element} Proveedor del contexto con todos los componentes hijos
 * 
 * @example
 * <AuthProvider>
 *   <Router>
 *     <Routes />
 *   </Router>
 * </AuthProvider>
 */
export const AuthProvider = ({ children }) => {
  // ==================== ESTADOS ====================
  
  /**
   * Usuario actual autenticado
   * Contiene información del usuario: id, name, email, role, etc.
   * @type {Object|null}
   */
  const [user, setUser] = useState(null);
  
  /**
   * Rol del usuario actual
   * Puede ser: ROLES.ADMIN o ROLES.WORKER
   * @type {string|null}
   */
  const [role, setRole] = useState(null);
  
  /**
   * Estado de autenticación
   * Indica si hay un usuario actualmente autenticado
   * @type {boolean}
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  /**
   * Estado de carga
   * Indica si se está verificando la autenticación inicial
   * Útil para mostrar loaders mientras se verifica el token
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  // ==================== EFECTOS ====================
  
  /**
   * Efecto de verificación de autenticación al cargar la aplicación
   * 
   * Se ejecuta una sola vez al montar el componente.
   * Verifica si existe un usuario en localStorage y valida su token con el backend.
   * 
   * Flujo:
   * 1. Obtiene el usuario del localStorage
   * 2. Si existe usuario, verifica su token con el backend
   * 3. Si el token es válido, restaura la sesión
   * 4. Si el token es inválido, limpia la sesión
   * 5. Marca loading como false para permitir el renderizado
   */
  useEffect(() => {
    const checkAuth = async () => {
      // Obtener usuario almacenado en localStorage
      const currentUser = getCurrentUser();
      
      if (currentUser) {
        // Verificar token con el backend para asegurar que sigue siendo válido
        const verified = await verifyToken();
        
        if (verified) {
          // Token válido - restaurar sesión
          setUser(currentUser);
          setRole(currentUser.role);
          setIsAuthenticated(true);
        } else {
          // Token inválido - limpiar sesión
          logoutService();
          setUser(null);
          setRole(null);
          setIsAuthenticated(false);
        }
      }
      
      // Finalizar carga inicial
      setLoading(false);
    };

    checkAuth();
  }, []); // Array vacío = se ejecuta solo una vez al montar

  // ==================== FUNCIONES DE AUTENTICACIÓN ====================

  /**
   * Función de inicio de sesión
   * 
   * Autentica al usuario con email y contraseña.
   * Si es exitoso, actualiza el estado global y guarda la sesión.
   * 
   * @async
   * @function login
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Objeto con success (boolean) y error (si existe)
   * 
   * @example
   * const { success, error } = await login('admin@example.com', 'password123');
   * if (success) {
   *   navigate('/dashboard');
   * } else {
   *   showError(error.message);
   * }
   */
  const login = async (email, password) => {
    try {
      // Llamar al servicio de login que interactúa con la API
      const { user: userData } = await loginService(email, password);
      
      // Actualizar estado global con los datos del usuario
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      // Si falla, retornar el error para que el componente lo maneje
      return { success: false, error };
    }
  };

  /**
   * Función de cierre de sesión
   * 
   * Limpia toda la información de autenticación y elimina el token del localStorage.
   * Restablece el estado a los valores iniciales (no autenticado).
   * 
   * @function logout
   * 
   * @example
   * logout();
   * navigate('/login');
   */
  const logout = () => {
    // Llamar al servicio de logout que limpia localStorage
    logoutService();
    
    // Resetear todos los estados a valores iniciales
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  // ==================== FUNCIONES DE VERIFICACIÓN DE ROLES ====================

  /**
   * Verifica si el usuario actual es administrador
   * 
   * @function isAdmin
   * @returns {boolean} true si el usuario es administrador, false en caso contrario
   * 
   * @example
   * if (isAdmin()) {
   *   // Mostrar opciones de administrador
   * }
   */
  const isAdmin = () => {
    return role === ROLES.ADMIN;
  };

  /**
   * Verifica si el usuario actual es trabajador
   * 
   * @function isWorker
   * @returns {boolean} true si el usuario es trabajador, false en caso contrario
   * 
   * @example
   * if (isWorker()) {
   *   // Mostrar opciones de trabajador
   * }
   */
  const isWorker = () => {
    return role === ROLES.WORKER;
  };

  // ==================== FUNCIONES DE ACTUALIZACIÓN ====================

  /**
   * Actualiza los datos del usuario en el contexto y localStorage
   * 
   * Útil cuando el usuario actualiza su perfil, nombre, email, etc.
   * Mantiene sincronizado el estado global con el localStorage.
   * 
   * @function updateUser
   * @param {Object} userData - Nuevos datos del usuario a actualizar
   * 
   * @example
   * updateUser({
   *   ...user,
   *   name: 'Nuevo Nombre',
   *   email: 'nuevo@email.com'
   * });
   */
  const updateUser = (userData) => {
    // Actualizar estado del contexto
    setUser(userData);
    
    // Sincronizar con localStorage para persistencia
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // ==================== VALOR DEL CONTEXTO ====================

  /**
   * Valor que será proporcionado a todos los componentes consumidores
   * Contiene todo el estado y funciones de autenticación
   */
  const value = {
    // Estado
    user,                    // Datos del usuario actual
    role,                    // Rol del usuario (ADMIN o WORKER)
    isAuthenticated,         // Si está autenticado
    loading,                 // Si está cargando la verificación inicial
    
    // Funciones de autenticación
    login,                   // Iniciar sesión
    logout,                  // Cerrar sesión
    
    // Funciones de verificación
    isAdmin,                 // Verificar si es admin
    isWorker,                // Verificar si es worker
    
    // Funciones de actualización
    updateUser              // Actualizar datos del usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};