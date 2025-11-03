/**
 * AdminHeader - Header Superior del Administrador
 * 
 * Componente de encabezado profesional con diseño moderno que incluye:
 * - Botón de menú móvil para abrir/cerrar sidebar
 * - Saludo personalizado con el nombre del usuario
 * - Badge distintivo de ADMIN con animación
 * - Indicadores de estado con efectos de neón
 * - Notificaciones con contador de alertas
 * - Menú desplegable de perfil con opciones
 * - Efectos visuales y animaciones profesionales
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.setIsMobileOpen - Función para controlar apertura del sidebar en móvil
 * 
 * @example
 * <AdminHeader setIsMobileOpen={setMobileOpen} />
 */

import React, { useState } from 'react';
import { Bell, Settings, LogOut, User, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  /**
   * Maneja el cierre de sesión del usuario
   * Ejecuta logout y redirige al login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-xl">
      {/* Sección izquierda: Menú móvil y título con saludo personalizado */}
      <div className="flex items-center space-x-4">
        {/* Botón hamburguesa para abrir sidebar en móvil */}
        <button 
          className="lg:hidden text-white hover:bg-slate-700 p-2 rounded-xl transition-all duration-300 hover:scale-105"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Título con efectos y saludo personalizado */}
        <div className="flex items-center gap-3">
          {/* Línea vertical decorativa con gradiente azul-cyan */}
          <div className="hidden sm:block w-1 h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
          <h1 className="text-base sm:text-lg font-bold tracking-wide">
            <span className="text-slate-300">BIENVENIDO</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {user?.name?.toUpperCase() || 'ADMINISTRADOR'}
            </span>
          </h1>
        </div>
      </div>

      {/* Sección derecha: Acciones y perfil del usuario */}
      <div className="flex items-center space-x-4">
        {/* Badge distintivo de ADMIN con animación de pulso */}
        <span className="hidden sm:inline text-xs px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold shadow-lg shadow-yellow-500/30 animate-pulse">
          ADMIN
        </span>

        {/* Indicadores de estado con efectos de neón y animaciones */}
        <div className="hidden md:flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600">
          {/* Indicador verde activo con doble animación (pulso y ping) */}
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
          </div>
          {/* Indicador rojo estático */}
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
        </div>
        
        {/* Botón de notificaciones con contador de alertas */}
        <button className="relative p-2.5 hover:bg-slate-700 rounded-xl transition-all duration-300 text-slate-300 hover:text-white hover:scale-110 group">
          <Bell size={22} />
          {/* Badge numérico con gradiente rojo-rosa y efecto de escala en hover */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
            3
          </span>
        </button>

        {/* Menú de perfil con dropdown */}
        <div className="relative">
          {/* Botón del perfil con avatar y flecha */}
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-xl transition-all duration-300 group"
          >
            <span className="hidden sm:inline text-sm font-bold text-slate-300 group-hover:text-white">PERFIL</span>
            {/* Avatar con gradiente azul-cyan y efecto de escala */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            {/* Flecha que rota cuando el menú está abierto */}
            <ChevronDown size={18} className={`hidden sm:block text-slate-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown del perfil con efectos espectaculares */}
          {showProfileMenu && (
            <>
              {/* Overlay invisible para cerrar el menú al hacer click fuera */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              {/* Contenedor del menú desplegable */}
              <div className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-2xl shadow-2xl py-3 z-50 border border-slate-700 overflow-hidden">
                {/* Efecto de brillo decorativo en la esquina superior */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
                
                {/* Sección de información del usuario */}
                <div className="relative px-4 py-4 border-b border-slate-700 bg-gradient-to-r from-slate-700/50 to-slate-800/50">
                  <div className="flex items-center gap-3">
                    {/* Avatar del usuario con gradiente morado-rosa */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <User size={24} />
                    </div>
                    {/* Datos del usuario */}
                    <div>
                      <p className="text-sm font-bold text-white">{user?.name || 'Administrador'}</p>
                      <p className="text-xs text-slate-400">{user?.email || 'admin@example.com'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Opciones del menú con efectos hover */}
                <div className="relative py-2">
                  {/* Opción de Configuración */}
                  <button className="w-full px-4 py-3 text-left hover:bg-slate-700/50 flex items-center gap-3 transition-all duration-300 group">
                    <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Settings size={18} className="text-slate-300 group-hover:text-white" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white font-medium">Configuración</span>
                  </button>
                  
                  {/* Opción de Mi Perfil */}
                  <button className="w-full px-4 py-3 text-left hover:bg-slate-700/50 flex items-center gap-3 transition-all duration-300 group">
                    <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <User size={18} className="text-slate-300 group-hover:text-white" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white font-medium">Mi Perfil</span>
                  </button>
                  
                  {/* Separador decorativo con gradiente */}
                  <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                  
                  {/* Opción de Cerrar Sesión con efecto especial en rojo */}
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-red-500/10 flex items-center gap-3 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
                      <LogOut size={18} className="text-red-400 group-hover:text-white" />
                    </div>
                    <span className="text-red-400 group-hover:text-red-300 font-bold">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;