import React from 'react';
import { DollarSign, TrendingDown, CreditCard } from 'lucide-react';

/**
 * Componente de estadísticas de gastos
 * Muestra resumen de gastos del mes, pendientes y totales
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.expenses - Lista de gastos
 */
const ExpenseStats = ({ expenses }) => {
  /**
   * Formatea números como pesos colombianos
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  /**
   * Calcula los totales de gastos
   * @returns {Object} Objeto con totales calculados
   */
  const calculateTotals = () => {
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.monto || 0), 0);
    
    const pending = expenses
      .filter(exp => exp.estadoPago === 'Pendiente')
      .reduce((sum, exp) => sum + parseFloat(exp.monto || 0), 0);
    
    const thisMonth = expenses
      .filter(exp => {
        const expDate = new Date(exp.fechaGasto);
        const now = new Date();
        return expDate.getMonth() === now.getMonth() && 
               expDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, exp) => sum + parseFloat(exp.monto || 0), 0);
    
    return { total, pending, thisMonth };
  };

  const totals = calculateTotals();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tarjeta: Gastos del Mes */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-5 rounded-xl shadow-xl border border-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium mb-1">Gastos del Mes</p>
            <p className="text-3xl font-bold text-white">{formatearPesos(totals.thisMonth)}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <TrendingDown className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Tarjeta: Gastos Pendientes */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 p-5 rounded-xl shadow-xl border border-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium mb-1">Gastos Pendientes</p>
            <p className="text-3xl font-bold text-white">{formatearPesos(totals.pending)}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <CreditCard className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Tarjeta: Total Gastos */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-xl shadow-xl border border-gray-600/30 hover:shadow-gray-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">Total Gastos</p>
            <p className="text-3xl font-bold text-white">{formatearPesos(totals.total)}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <DollarSign className="text-white" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;