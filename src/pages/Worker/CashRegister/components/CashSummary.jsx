import React from 'react';

/**
 * Componente de resumen financiero del cuadre de caja
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number} props.totalVentas - Total de ventas del día
 * @param {number} props.totalGastos - Total de gastos del día
 * @param {number} props.balanceFinal - Balance final calculado
 */
const CashSummary = ({ totalVentas, totalGastos, balanceFinal }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
      
      {/* Título del resumen */}
      <h2 className="text-xl font-bold mb-4">Resumen Total</h2>
      
      {/* Detalles financieros */}
      <div className="space-y-3">
        
        {/* Total de ventas */}
        <div className="flex justify-between items-center">
          <span>Total Ventas:</span>
          <span className="text-2xl font-bold">${totalVentas.toFixed(2)}</span>
        </div>
        
        {/* Total de gastos */}
        <div className="flex justify-between items-center">
          <span>Total Gastos:</span>
          <span className="text-xl font-bold">-${totalGastos.toFixed(2)}</span>
        </div>
        
        {/* Balance final */}
        <div className="pt-3 border-t border-white/30">
          <div className="flex justify-between items-center">
            <span className="text-lg">Balance Final:</span>
            <span className="text-3xl font-bold">${balanceFinal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashSummary;