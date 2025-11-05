/**
 * AdminSidebar - Barra Lateral de Navegación del Administrador
 * 
 * Sidebar espectacular con diseño moderno que incluye:
 * - Menú de navegación con 9 opciones
 * - Logo corporativo grande y centrado
 * - Efectos visuales de hover y activo
 * - Animaciones de brillo y transición
 * - Responsive con overlay en móvil
 * - Scrollbar personalizado con gradiente
 * - Footer con branding
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isMobileOpen - Estado de apertura del sidebar en móvil
 * @param {Function} props.setIsMobileOpen - Función para controlar el estado del sidebar
 * 
 * CAMBIO RESPONSIVE: Solo se agregó useEffect para prevenir scroll del body en móvil
 */

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, CreditCard, ShoppingCart, FileText, DollarSign, Clock, Users, Truck, X } from 'lucide-react';

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Configuración del menú de navegación
   * Cada item incluye: id único, label visible, ícono y ruta
   */
  const menuItems = [
    { id: 'dashboard', label: 'INICIO', icon: Home, path: '/admin/dashboard' },
    { id: 'inventario', label: 'INVENTARIO', icon: Package, path: '/admin/inventario' },
    { id: 'credito', label: 'CREDITO', icon: CreditCard, path: '/admin/credito' },
    { id: 'ventas', label: 'VENTAS', icon: ShoppingCart, path: '/admin/ventas' },
    { id: 'facturas', label: 'FACTURAS', icon: FileText, path: '/admin/facturas' },
    { id: 'gastos', label: 'GASTOS', icon: DollarSign, path: '/admin/gastos' },
    { id: 'historial', label: 'HISTORIAL', icon: Clock, path: '/admin/historial' },
    { id: 'usuarios', label: 'USUARIOS', icon: Users, path: '/admin/usuarios' },
    { id: 'proveedores', label: 'PROVEEDORES', icon: Truck, path: '/admin/proveedores' },
  ];

  /**
   * AGREGADO: Previene el scroll del body cuando el sidebar está abierto en móvil
   */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  /**
   * Maneja el click en un item del menú
   * Navega a la ruta y cierra el sidebar en móvil
   */
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  /**
   * Verifica si una ruta está actualmente activa
   */
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay semi-transparente con blur para móvil */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar principal con gradiente oscuro profesional */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col shadow-2xl
        transform transition-transform duration-300 ease-in-out border-r border-slate-700
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sección del Logo - Diseño espectacular con efectos de brillo */}
        <div className="relative px-4 py-6 bg-gradient-to-br from-slate-700 to-slate-800 border-b border-slate-600 overflow-hidden">
          {/* Efectos de brillo decorativos en la esquina */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-center">
            {/* Logo corporativo grande centrado */}
            <div className="w-full flex items-center justify-center px-2">
              <img  
                src="/LogoSoftWork.png"
                alt="Logo SoftWork"
                className="w-full h-auto max-h-32 object-contain drop-shadow-2xl"
                style={{ maxWidth: '220px' }}
              />
            </div>
            {/* Botón de cierre para móvil - posicionado absolutamente */}
            <button 
              className="lg:hidden absolute top-2 right-2 text-white hover:bg-slate-700 p-2 rounded-xl transition-all duration-300 hover:scale-110 z-10"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Menú de navegación con efectos profesionales */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.path)}
                  className={`
                    relative w-full px-4 py-3.5 rounded-xl
                    flex items-center gap-4
                    font-bold text-sm tracking-wide
                    transition-all duration-300 overflow-hidden
                    group
                    ${active
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105'
                    }
                  `}
                >
                  {/* Efecto de brillo deslizante en hover (solo para items no activos) */}
                  {!active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                  
                  {/* Contenedor del ícono con fondo circular */}
                  <div className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                    ${active 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-slate-600/50 group-hover:bg-slate-600'
                    }
                  `}>
                    <Icon size={20} className={active ? 'text-white' : 'text-slate-300 group-hover:text-white'} />
                  </div>
                  
                  {/* Etiqueta del menú */}
                  <span className="relative">{item.label}</span>
                  
                  {/* Indicador de estado activo (punto animado) */}
                  {active && (
                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer con branding y gradiente espectacular */}
        <div className="p-4 border-t border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-3.5 rounded-xl font-black text-sm shadow-lg shadow-blue-500/30 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            {/* Efecto de brillo animado que cruza el footer en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative">SOFTWOK</span>
          </div>
        </div>
      </aside>

      {/* Estilos personalizados para scrollbar con gradiente azul-cyan */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;