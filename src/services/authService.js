/**
 * Servicio de Autenticación - Mock (Sin Backend)
 * 
 * @description
 * Simula un servicio de autenticación completo con usuarios mock para desarrollo.
 * Maneja login, logout, verificación de tokens y gestión de sesiones en localStorage.
 * 
 * @module services/authService
 */

// =============================================
// DATOS MOCK - USUARIOS DE PRUEBA
// =============================================

/**
 * @constant {Array} MOCK_USERS
 * @description Lista de usuarios de prueba para desarrollo
 * @type {Array<Object>}
 * @property {number} id - ID único del usuario
 * @property {string} name - Nombre completo del usuario
 * @property {string} email - Correo electrónico (también funciona como usuario)
 * @property {string} password - Contraseña en texto plano (solo para desarrollo)
 * @property {string} role - Rol del usuario ('admin' o 'worker')
 */
const MOCK_USERS = [
  {
    id: 1,
    name: 'Administrador Principal',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Trabajador General',
    email: 'worker@example.com',
    password: 'worker123',
    role: 'worker'
  }
];

// =============================================
// CONSTANTES DE ALMACENAMIENTO
// =============================================

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// =============================================
// FUNCIONES PRINCIPALES
// =============================================

/**
 * Simula el proceso de login de usuario
 * 
 * @async
 * @function login
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Promesa que resuelve con token y datos del usuario
 * @throws {string} Error con mensaje descriptivo si las credenciales son incorrectas
 * 
 * @example
 * try {
 *   const { token, user } = await login('admin@example.com', 'admin123');
 *   console.log('Login exitoso:', user.name);
 * } catch (error) {
 *   console.error('Error en login:', error);
 * }
 */
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    // Simula delay de red
    setTimeout(() => {
      const user = MOCK_USERS.find(u => 
        u.email === email && u.password === password
      );
      
      if (user) {
        // Generar token mock
        const token = `mock-token-${user.role}-${Date.now()}`;
        
        // Preparar datos del usuario (sin password)
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        
        // Guardar en localStorage
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        console.log(`✅ Login exitoso: ${user.name} (${user.role})`);
        resolve({ token, user: userData });
      } else {
        console.error('❌ Login fallido: Credenciales incorrectas');
        reject('Credenciales incorrectas. Verifique su email y contraseña.');
      }
    }, 500); // Simula delay de red de 500ms
  });
};

/**
 * Cierra la sesión del usuario actual
 * 
 * @function logout
 * @description
 * - Elimina token y datos de usuario del localStorage
 * - Limpía completamente la sesión
 * 
 * @example
 * logout();
 * // Redirigir al usuario a la página de login
 */
export const logout = () => {
  const user = getCurrentUser();
  if (user) {
    console.log(`👋 Sesión cerrada: ${user.name}`);
  }
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Verifica si existe un usuario autenticado
 * 
 * @function isAuthenticated
 * @returns {boolean} true si existe un token válido, false en caso contrario
 * 
 * @example
 * if (isAuthenticated()) {
 *   // Usuario está logueado
 * } else {
 *   // Redirigir a login
 * }
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token; // Convierte a booleano
};

/**
 * Obtiene los datos del usuario actualmente autenticado
 * 
 * @function getCurrentUser
 * @returns {Object|null} Datos del usuario o null si no hay sesión activa
 * 
 * @example
 * const user = getCurrentUser();
 * if (user) {
 *   console.log(`Bienvenido ${user.name}`);
 * }
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  
  if (!userStr) {
    return null;
  }
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('❌ Error parseando datos de usuario:', error);
    // Limpiar datos corruptos
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

/**
 * Verifica la validez del token (simulado)
 * 
 * @async
 * @function verifyToken
 * @returns {Promise<Object|null>} Promesa que resuelve con los datos del usuario o null
 * 
 * @description
 * En un entorno real, aquí se haría una petición al backend para validar el token.
 * En esta versión mock, simplemente devuelve el usuario del localStorage.
 * 
 * @example
 * const user = await verifyToken();
 * if (!user) {
 *   // Token inválido, redirigir a login
 * }
 */
export const verifyToken = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getCurrentUser();
      
      if (user && isAuthenticated()) {
        console.log(`✅ Token verificado: ${user.name}`);
        resolve(user);
      } else {
        console.log('❌ Token inválido o expirado');
        resolve(null);
      }
    }, 100); // Simula verificación rápida
  });
};

/**
 * Obtiene el token de autenticación actual
 * 
 * @function getToken
 * @returns {string|null} Token actual o null si no existe
 * 
 * @example
 * const token = getToken();
 * if (token) {
 *   // Usar token para API calls
 * }
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Verifica si el usuario actual tiene un rol específico
 * 
 * @function hasRole
 * @param {string} role - Rol a verificar ('admin' o 'worker')
 * @returns {boolean} true si el usuario tiene el rol, false en caso contrario
 * 
 * @example
 * if (hasRole('admin')) {
 *   // Mostrar funcionalidades de admin
 * }
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user ? user.role === role : false;
};

// =============================================
// EXPORTACIÓN POR DEFECTO (OPCIONAL)
// =============================================

/**
 * @namespace authService
 * @description Servicio completo de autenticación para la aplicación
 */
export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  verifyToken,
  getToken,
  hasRole
};