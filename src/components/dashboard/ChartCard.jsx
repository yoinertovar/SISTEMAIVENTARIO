/**
 * @fileoverview Tarjeta de gráfico de barras interactivo para visualización de estadísticas
 * @author SoftWok
 * @version 1.1.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, ArrowUp } from 'lucide-react';

/**
 * Componente ChartCard - Tarjeta con gráfico de barras animado
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<{label: string, value: number, color: string}>} props.data - Array de datos para el gráfico
 * @returns {JSX.Element} Tarjeta con gráfico de barras
 * 
 * @example
 * const salesData = [
 *   { label: 'Ene', value: 1200, color: 'bg-gradient-to-t from-blue-600 to-cyan-600' },
 *   { label: 'Feb', value: 1800, color: 'bg-gradient-to-t from-emerald-600 to-teal-600' }
 * ];
 * 
 * <ChartCard data={salesData} />
 */
const ChartCard = ({ data: customData }) => {
  // Hook de navegación de React Router
  const navigate = useNavigate();

  // Usar datos proporcionados o array vacío como fallback
  const data = customData || [];

  // Calcular el valor máximo para normalizar las alturas de las barras
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 100;
  
  // Calcular estadísticas de resumen
  const totalSales = data.reduce((sum, item) => sum + item.value, 0);
  const avgSales = data.length > 0 ? (totalSales / data.length).toFixed(0) : 0;

  /**
   * Maneja el clic en el botón "Ver detalles"
   * Navega a la página de ventas
   */
  const handleViewDetails = () => {
    navigate('/admin/ventas');
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
      {/* Efectos de brillo decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

      {/* Header con título y estadísticas rápidas */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        {/* Sección de título con icono */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
            <BarChart3 className="text-white" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Estadísticas de Ventas
            </h3>
            <p className="text-sm text-slate-400">Últimos 6 meses</p>
          </div>
        </div>
        
        {/* Panel de estadísticas rápidas */}
        <div className="flex items-center gap-6 bg-slate-700/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-600">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Total</p>
            <p className="text-xl font-bold text-white">${totalSales}</p>
          </div>
          <div className="w-px h-10 bg-slate-600"></div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Promedio</p>
            <p className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ${avgSales}
            </p>
          </div>
        </div>
      </div>
      
      {/* Contenedor del gráfico de barras */}
      <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        {data.length > 0 ? (
          <div className="flex items-end justify-around h-56 md:h-64 gap-3">
            {data.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 max-w-[100px] group">
                {/* Tooltip que aparece al hacer hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mb-3 transform group-hover:scale-110">
                  <div className="bg-slate-900 px-3 py-2 rounded-lg shadow-xl border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Ventas</p>
                    <p className="text-sm font-bold text-white">${item.value}</p>
                  </div>
                </div>
                
                {/* Contenedor de la barra con altura fija */}
                <div className="w-full relative" style={{ height: '180px' }}>
                  {/* Barra animada con altura proporcional al valor */}
                  <div 
                    className={`w-full ${item.color} rounded-t-xl transition-all duration-700 absolute bottom-0 shadow-lg group-hover:shadow-2xl cursor-pointer overflow-hidden group`}
                    style={{ 
                      height: `${(item.value / maxValue) * 100}%`,
                      minHeight: '30px'
                    }}
                  >
                    {/* Efecto de brillo que se desliza verticalmente en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000"></div>
                    
                    {/* Valor que aparece dentro de la barra en hover */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        ${item.value}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Etiqueta del mes/periodo */}
                <span className="text-sm font-bold text-slate-300 mt-4 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          // Estado vacío cuando no hay datos
          <div className="h-56 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No hay datos disponibles</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer con indicador de tendencia y botón de acción */}
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Indicador de tendencia positiva */}
        <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/30">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-400">Tendencia Positiva</p>
            <p className="text-xs text-emerald-300">+12% vs mes anterior</p>
          </div>
        </div>
        
        {/* Botón para ver más detalles - Ahora con navegación al módulo de ventas */}
        <button 
          onClick={handleViewDetails}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 group"
        >
          <span>Ver detalles</span>
          <ArrowUp className="w-4 h-4 rotate-90 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ChartCard;