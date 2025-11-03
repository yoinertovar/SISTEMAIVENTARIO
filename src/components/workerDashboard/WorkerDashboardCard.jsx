/**
 * WorkerDashboardCard - Tarjeta Interactiva del Dashboard del Trabajador
 * 
 * Componente de tarjeta espectacular con efectos visuales avanzados que incluye:
 * - 7 esquemas de color predefinidos (blue, red, green, yellow, purple, orange, cyan)
 * - Efectos de brillo en el fondo con gradientes
 * - Animación de brillo deslizante en hover
 * - Icono animado con rotación y escala en hover
 * - Indicador de "ACCEDER" que aparece en hover
 * - Brillos decorativos en las esquinas
 * - Bordes con transparencia que se intensifican en hover
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título principal de la tarjeta
 * @param {React.Component} props.icon - Componente de ícono de lucide-react
 * @param {string} props.color - Color del tema: 'blue', 'red', 'green', 'yellow', 'purple', 'orange', 'cyan'
 * @param {string} [props.description] - Descripción opcional debajo del título
 * @param {Function} props.onClick - Función ejecutada al hacer click en la tarjeta
 * 
 * @example
 * // Uso básico con ícono y color
 * <WorkerDashboardCard
 *   title="Facturas"
 *   icon={FileText}
 *   color="blue"
 *   description="Crear y gestionar facturas"
 *   onClick={() => navigate('/worker/facturas')}
 * />
 * 
 * @example
 * // Todos los colores disponibles
 * <WorkerDashboardCard color="blue" ... />    // Azul-Cyan
 * <WorkerDashboardCard color="red" ... />     // Rojo-Rosa
 * <WorkerDashboardCard color="green" ... />   // Verde-Teal
 * <WorkerDashboardCard color="yellow" ... />  // Amarillo-Naranja
 * <WorkerDashboardCard color="purple" ... />  // Morado-Fucsia
 * <WorkerDashboardCard color="orange" ... />  // Naranja-Ámbar
 * <WorkerDashboardCard color="cyan" ... />    // Cyan-Azul
 */

import React from 'react';

const WorkerDashboardCard = ({ title, icon: Icon, color, description, onClick }) => {
  
  /**
   * Configuración de esquemas de color
   * Cada color tiene: gradiente principal, sombra, brillo de fondo, y color de ícono
   */
  const colorClasses = {
    blue: {
      gradient: 'from-blue-600 to-cyan-600',
      shadow: 'shadow-blue-500/50',
      glow: 'from-blue-500/30 to-cyan-500/30',
      icon: 'text-cyan-200'
    },
    red: {
      gradient: 'from-red-600 to-pink-600',
      shadow: 'shadow-red-500/50',
      glow: 'from-red-500/30 to-pink-500/30',
      icon: 'text-pink-200'
    },
    green: {
      gradient: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-500/50',
      glow: 'from-emerald-500/30 to-teal-500/30',
      icon: 'text-teal-200'
    },
    yellow: {
      gradient: 'from-yellow-600 to-orange-600',
      shadow: 'shadow-yellow-500/50',
      glow: 'from-yellow-500/30 to-orange-500/30',
      icon: 'text-orange-200'
    },
    purple: {
      gradient: 'from-purple-600 to-fuchsia-600',
      shadow: 'shadow-purple-500/50',
      glow: 'from-purple-500/30 to-fuchsia-500/30',
      icon: 'text-fuchsia-200'
    },
    orange: {
      gradient: 'from-orange-600 to-amber-600',
      shadow: 'shadow-orange-500/50',
      glow: 'from-orange-500/30 to-amber-500/30',
      icon: 'text-amber-200'
    },
    cyan: {
      gradient: 'from-cyan-600 to-blue-600',
      shadow: 'shadow-cyan-500/50',
      glow: 'from-cyan-500/30 to-blue-500/30',
      icon: 'text-blue-200'
    },
  };

  // Obtener el esquema de color seleccionado o usar blue por defecto
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <button
      onClick={onClick}
      className={`
        relative bg-gradient-to-br ${colors.gradient}
        text-white p-8 rounded-2xl shadow-xl ${colors.shadow}
        transition-all duration-300 transform 
        hover:scale-105 hover:shadow-2xl
        flex flex-col items-center justify-center 
        space-y-4 min-h-[220px] w-full
        border border-white/10 hover:border-white/30
        overflow-hidden group
      `}
    >
      {/* Efectos de brillo en el fondo - esquina superior derecha */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Efectos de brillo en el fondo - esquina inferior izquierda */}
      <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

      {/* Efecto de brillo deslizante que cruza la tarjeta en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

      {/* Contenido principal de la tarjeta */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Ícono con fondo glassmorphism y animación de escala/rotación */}
        {Icon && (
          <div className="bg-white/15 backdrop-blur-md p-5 rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Icon size={64} className={`${colors.icon} drop-shadow-2xl`} strokeWidth={2} />
          </div>
        )}
        
        {/* Sección de texto */}
        <div className="text-center space-y-2">
          {/* Título principal con sombra */}
          <h3 className="text-2xl font-black tracking-wide drop-shadow-lg">
            {title}
          </h3>
          {/* Descripción opcional */}
          {description && (
            <p className="text-sm opacity-90 font-medium px-4">
              {description}
            </p>
          )}
        </div>

        {/* Indicador de hover "ACCEDER" que aparece al pasar el mouse */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-xs font-bold">ACCEDER →</span>
          </div>
        </div>
      </div>

      {/* Brillos decorativos en las esquinas */}
      {/* Esquina superior derecha */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-40 group-hover:opacity-70 transition-opacity"></div>
      {/* Esquina inferior izquierda */}
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
    </button>
  );
};

export default WorkerDashboardCard;