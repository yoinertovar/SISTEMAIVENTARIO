/**
 * @fileoverview Tarjeta de estadística interactiva con efectos visuales y animaciones
 * @author SoftWok
 * @version 1.0.0
 */

import React from 'react';

/**
 * Componente StatCard - Tarjeta de estadística clickeable con efectos visuales
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la tarjeta
 * @param {React.Component} props.icon - Componente de icono de Lucide React
 * @param {('blue'|'red'|'yellow'|'purple'|'green')} props.color - Color del tema de la tarjeta
 * @param {Function} props.onClick - Función a ejecutar al hacer clic en la tarjeta
 * @returns {JSX.Element} Tarjeta de estadística
 * 
 * @example
 * import { Package } from 'lucide-react';
 * 
 * <StatCard 
 *   title="INVENTARIO" 
 *   icon={Package} 
 *   color="blue" 
 *   onClick={() => navigate('/inventory')}
 * />
 */
const StatCard = ({ title, icon, color, onClick }) => {
  const IconComponent = icon;

  /**
   * Configuración de colores con gradientes y efectos de brillo
   * Cada color incluye: gradiente principal, sombra, efecto de brillo y color del icono
   */
  const colorClasses = {
    blue: {
      gradient: 'from-blue-600 to-cyan-600',
      shadow: 'shadow-blue-500/50',
      glow: 'from-blue-500/20 to-cyan-500/20',
      icon: 'text-cyan-300'
    },
    red: {
      gradient: 'from-red-600 to-pink-600',
      shadow: 'shadow-red-500/50',
      glow: 'from-red-500/20 to-pink-500/20',
      icon: 'text-pink-300'
    },
    yellow: {
      gradient: 'from-yellow-600 to-orange-600',
      shadow: 'shadow-yellow-500/50',
      glow: 'from-yellow-500/20 to-orange-500/20',
      icon: 'text-orange-300'
    },
    purple: {
      gradient: 'from-purple-600 to-pink-600',
      shadow: 'shadow-purple-500/50',
      glow: 'from-purple-500/20 to-pink-500/20',
      icon: 'text-pink-300'
    },
    green: {
      gradient: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-500/50',
      glow: 'from-emerald-500/20 to-teal-500/20',
      icon: 'text-teal-300'
    }
  };

  // Obtener la configuración de color, usar blue como fallback
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div
      onClick={onClick}
      className={`
        relative bg-gradient-to-br ${colors.gradient}
        rounded-2xl p-8 flex flex-col items-center justify-center 
        cursor-pointer transition-all duration-300 
        hover:shadow-2xl ${colors.shadow} hover:scale-105 
        min-h-[180px] overflow-hidden border border-white/10
        group
      `}
    >
      {/* Efectos de brillo decorativos en las esquinas */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>

      {/* Efecto de brillo animado que cruza la tarjeta en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Contenedor del icono con fondo translúcido */}
        {IconComponent && (
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <IconComponent
              className={`w-16 h-16 ${colors.icon} group-hover:scale-110 transition-transform duration-300`}
              strokeWidth={2}
            />
          </div>
        )}
        
        {/* Título de la tarjeta */}
        <h3 className="text-2xl font-black text-white text-center tracking-wide drop-shadow-lg">
          {title}
        </h3>

        {/* Indicador de acción que aparece en hover */}
        <div className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-bold text-white">VER MÁS →</span>
        </div>
      </div>

      {/* Borde brillante que aparece en hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-300"></div>
    </div>
  );
};

export default StatCard;