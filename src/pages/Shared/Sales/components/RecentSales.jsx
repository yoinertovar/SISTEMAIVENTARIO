import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * Componente para mostrar ventas recientes
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.sales - Lista de ventas recientes
 */
const RecentSales = ({ sales }) => {
  
  /**
   * Obtiene las clases CSS para el badge de estado de la venta
   * @param {string} estado - Estado de la venta
   * @returns {string} Clases CSS correspondientes al estado
   */
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completada':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'Cancelada':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  /**
   * Calcula el total de ventas del día
   * @returns {number} Total de ventas del día
   */
  const calculateTotalDia = () => {
    return sales
      .filter(sale => sale.estado === 'Completada')
      .reduce((total, sale) => total + sale.total, 0);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 sticky top-6">
      <h2 className="text-xl font-bold mb-4 text-white">Ventas Recientes</h2>
      
      {/* Lista de ventas recientes */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {sales.map((sale) => (
          <div 
            key={sale.id}
            className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all cursor-pointer border border-slate-600 hover:border-slate-500 hover:scale-105 duration-300"
          >
            {/* Header de la venta */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-white">#{sale.id}</p>
                <p className="text-sm text-slate-400">{sale.cliente}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${getEstadoColor(sale.estado)}`}>
                {sale.estado}
              </span>
            </div>
            
            {/* Detalles de la venta */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-600">
              <div className="text-sm text-slate-400 flex items-center gap-1">
                <Calendar size={14} />
                {sale.fecha}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{sale.productos} productos</p>
                <p className="font-bold text-emerald-400">${sale.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total del día */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-300">Total del día</span>
          <span className="text-2xl font-black text-white">${calculateTotalDia().toLocaleString()}</span>
        </div>
      </div>

      {/* Estilos personalizados para el scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default RecentSales;