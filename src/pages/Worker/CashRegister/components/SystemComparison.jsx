import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Componente para comparar ventas del sistema vs conteo físico
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.sistemaData - Datos del sistema
 * @param {number} props.sistemaData.ventasEsperadas - Ventas registradas en el sistema
 * @param {number} props.totalVentas - Total de ventas contadas físicamente
 * @param {number} props.diferencia - Diferencia entre sistema y conteo físico
 * @param {Function} props.formatCurrency - Función para formatear moneda
 */
const SystemComparison = ({ sistemaData, totalVentas, diferencia, formatCurrency }) => {
  /**
   * Determina si el cuadre está balanceado
   */
  const isBalanced = Math.abs(diferencia) < 100; // Tolerancia de $100 COP

  return (
    <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
      
      {/* Título del componente */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
          <CheckCircle className="text-white" size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">Comparación con Sistema</h2>
      </div>
      
      {/* Comparación de datos */}
      <div className="space-y-4">
        
        {/* Ventas del sistema */}
        <div className="flex justify-between items-center p-4 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <span className="text-sm font-medium text-gray-300">Ventas del Sistema:</span>
          <span className="font-bold text-blue-400 text-lg">
            {formatCurrency(sistemaData.ventasEsperadas)}
          </span>
        </div>
        
        {/* Ventas contadas */}
        <div className="flex justify-between items-center p-4 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <span className="text-sm font-medium text-gray-300">Ventas Contadas:</span>
          <span className="font-bold text-emerald-400 text-lg">
            {formatCurrency(totalVentas)}
          </span>
        </div>
        
        {/* Diferencia */}
        <div className={`flex justify-between items-center p-4 rounded-lg border ${
          isBalanced 
            ? 'bg-emerald-600/20 border-emerald-500/30' 
            : 'bg-red-600/20 border-red-500/30'
        } transition-all duration-300`}>
          <span className="text-sm font-bold text-white">Diferencia:</span>
          <div className="flex items-center space-x-3">
            {isBalanced ? (
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-emerald-400" size={20} />
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                  CUADRADO
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-red-400" size={20} />
                <span className="text-xs font-medium text-red-400 bg-red-500/20 px-2 py-1 rounded-full">
                  CON DIFERENCIA
                </span>
              </div>
            )}
            <span className={`font-bold text-lg ${
              isBalanced ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {formatCurrency(Math.abs(diferencia))}
            </span>
          </div>
        </div>

        {/* Indicador de estado */}
        <div className={`p-3 rounded-lg text-center ${
          isBalanced 
            ? 'bg-gradient-to-r from-emerald-600/30 to-emerald-700/30 border border-emerald-500/50' 
            : 'bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/50'
        }`}>
          <p className={`text-sm font-semibold ${
            isBalanced ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {isBalanced 
              ? '✅ El cuadre de caja está balanceado' 
              : '⚠️ Revisar el conteo de efectivo'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemComparison;