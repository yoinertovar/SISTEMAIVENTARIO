import axios from 'axios';
import { API_URL } from '../utils/constants';

const API_AUTH = `${API_URL}/auth`;

// Configurar axios para incluir token en todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH}/login`, {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    // Guardar token y datos del usuario
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Obtener usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

// Verificar token (llamar al backend para validar)
export const verifyToken = async () => {
  try {
    const response = await axios.get(`${API_AUTH}/verify`);
    return response.data;
  } catch (error) {
    logout();
    return null;
  }
};

// Cambiar contraseña
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_AUTH}/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al cambiar contraseña';
  }
};

// Recuperar contraseña
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_AUTH}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al recuperar contraseña';
  }
};