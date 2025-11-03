import React from 'react';
import { TrendingUp, BarChart3, ShoppingCart, Calendar } from 'lucide-react';

/**
 * Componente para mostrar estadísticas de ventas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.statsData - Datos de estadísticas
 * @param {number} props.statsData.ventasHoy - Ventas del día actual
 * @param {number} props.statsData.ventasMes - Ventas del mes actual
 * @param {number} props.statsData.totalTransacciones - Total de transacciones
 * @param {number} props.statsData.ticketPromedio - Ticket promedio de ventas
 */
const SalesStats = ({ statsData }) => {
  
  /**
   * Configuración de las tarjetas de estadísticas
   */
  const stats = [
    {
      label: 'Ventas Hoy',
      value: `$${statsData.ventasHoy.toLocaleString()}`,
      icon: TrendingUp,
      gradient: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-500/30'
    },
    {
      label: 'Ventas del Mes',
      value: `$${statsData.ventasMes.toLocaleString()}`,
      icon: BarChart3,
      gradient: 'from-blue-600 to-cyan-600',
      shadow: 'shadow-blue-500/30'
    },
    {
      label: 'Total Transacciones',
      value: statsData.totalTransacciones.toString(),
      icon: ShoppingCart,
      gradient: 'from-purple-600 to-fuchsia-600',
      shadow: 'shadow-purple-500/30'
    },
    {
      label: 'Ticket Promedio',
      value: `$${statsData.ticketPromedio.toLocaleString()}`,
      icon: Calendar,
      gradient: 'from-yellow-600 to-orange-600',
      shadow: 'shadow-yellow-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`relative bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl shadow-xl ${stat.shadow} overflow-hidden group hover:scale-105 transition-transform duration-300`}
        >
          {/* Efecto de brillo */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white/90 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <stat.icon className="text-white" size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesStats;