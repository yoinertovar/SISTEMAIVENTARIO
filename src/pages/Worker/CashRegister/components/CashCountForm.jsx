import React from 'react';
import { DollarSign } from 'lucide-react';

/**
 * Componente para el conteo de efectivo por denominaciones en pesos colombianos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.onInputChange - Función para manejar cambios en inputs
 */
const CashCountForm = ({ formData, onInputChange }) => {
  /**
   * Tipos de billetes y monedas para el conteo en COP
   */
  const billTypes = [
    { label: 'Billetes $100.000', field: 'billetes100000', value: 100000 },
    { label: 'Billetes $50.000', field: 'billetes50000', value: 50000 },
    { label: 'Billetes $20.000', field: 'billetes20000', value: 20000 },
    { label: 'Billetes $10.000', field: 'billetes10000', value: 10000 },
    { label: 'Billetes $5.000', field: 'billetes5000', value: 5000 },
    { label: 'Billetes $2.000', field: 'billetes2000', value: 2000 },
    { label: 'Billetes $1.000', field: 'billetes1000', value: 1000 },
    { label: 'Monedas $500', field: 'monedas500', value: 500 },
    { label: 'Monedas $200', field: 'monedas200', value: 200 },
    { label: 'Monedas $100', field: 'monedas100', value: 100 },
    { label: 'Monedas $50', field: 'monedas50', value: 50 },
  ];

  /**
   * Calcula el total de efectivo sumando todas las denominaciones
   * @returns {number} Total calculado de efectivo
   */
  const calculateTotalEfectivo = () => {
    let total = 0;
    
    // Sumar billetes y monedas por denominación
    billTypes.forEach(item => {
      const cantidad = formData[item.field] || 0;
      total += cantidad * item.value;
    });
    
    // Sumar otras monedas
    total += parseInt(formData.otrasMonedas) || 0;
    
    return total;
  };

  /**
   * Formatea números en formato colombiano
   * @param {number} value - Valor a formatear
   * @returns {string} Valor formateado en pesos colombianos
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalEfectivo = calculateTotalEfectivo();

  return (
    <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
      {/* Header del formulario */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg">
          <DollarSign className="text-white" size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">Conteo de Efectivo</h2>
      </div>
      
      {/* Lista de denominaciones */}
      <div className="space-y-4">
        {billTypes.map((item) => {
          const cantidad = formData[item.field] || 0;
          const subtotal = cantidad * item.value;
          
          return (
            <div key={item.field} className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <label className="text-sm font-medium text-gray-300">{item.label}</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => onInputChange(item.field, parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center transition-all"
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-emerald-400 w-28 text-right">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Campo para otras monedas */}
        <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg border border-gray-800">
          <label className="text-sm font-medium text-gray-300">Otras Monedas</label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              step="50"
              value={formData.otrasMonedas || 0}
              onChange={(e) => onInputChange('otrasMonedas', parseInt(e.target.value) || 0)}
              className="w-32 px-3 py-2 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right transition-all"
              placeholder="0"
            />
            <span className="text-sm font-semibold text-emerald-400 w-28 text-right">
              {formatCurrency(formData.otrasMonedas || 0)}
            </span>
          </div>
        </div>

        {/* Total de efectivo */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-lg border border-emerald-500/30">
            <span className="font-bold text-white text-lg">Total Efectivo:</span>
            <span className="text-2xl font-bold text-emerald-400">
              {formatCurrency(totalEfectivo)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashCountForm;