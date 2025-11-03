import React from 'react';
import { CreditCard, FileText, AlertCircle } from 'lucide-react';

/**
 * Componente para registrar pagos electrónicos, gastos y observaciones
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.onInputChange - Función para cambios en inputs numéricos
 * @param {Function} props.onTextChange - Función para cambios en campos de texto
 * @param {number} props.totalTarjetas - Total calculado de pagos electrónicos
 * @param {Function} props.formatCurrency - Función para formatear moneda colombiana
 */
const ElectronicPaymentsForm = ({ 
  formData, 
  onInputChange, 
  onTextChange, 
  totalTarjetas,
  formatCurrency 
}) => {
  return (
    <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
      
      {/* Header del formulario */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
          <CreditCard className="text-white" size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">Pagos Electrónicos</h2>
      </div>
      
      {/* Campos del formulario */}
      <div className="space-y-4">
        
        {/* Tarjeta de débito */}
        <div className="p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tarjeta de Débito
          </label>
          <input
            type="number"
            min="0"
            step="100"
            value={formData.tarjetaDebito || 0}
            onChange={(e) => onInputChange('tarjetaDebito', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0"
          />
          {formData.tarjetaDebito > 0 && (
            <p className="text-xs text-blue-400 mt-1">
              {formatCurrency(formData.tarjetaDebito)}
            </p>
          )}
        </div>

        {/* Tarjeta de crédito */}
        <div className="p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tarjeta de Crédito
          </label>
          <input
            type="number"
            min="0"
            step="100"
            value={formData.tarjetaCredito || 0}
            onChange={(e) => onInputChange('tarjetaCredito', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0"
          />
          {formData.tarjetaCredito > 0 && (
            <p className="text-xs text-blue-400 mt-1">
              {formatCurrency(formData.tarjetaCredito)}
            </p>
          )}
        </div>

        {/* Transferencias */}
        <div className="p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transferencias Bancarias
          </label>
          <input
            type="number"
            min="0"
            step="100"
            value={formData.transferencias || 0}
            onChange={(e) => onInputChange('transferencias', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0"
          />
          {formData.transferencias > 0 && (
            <p className="text-xs text-blue-400 mt-1">
              {formatCurrency(formData.transferencias)}
            </p>
          )}
        </div>

        {/* Total de pagos electrónicos */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-lg border border-blue-500/30">
            <span className="font-bold text-white text-lg">Total Pagos Electrónicos:</span>
            <span className="text-2xl font-bold text-blue-400">
              {formatCurrency(totalTarjetas)}
            </span>
          </div>
        </div>

        {/* Gastos del día */}
        <div className="pt-4">
          <div className="p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="text-red-400" size={18} />
              <label className="block text-sm font-medium text-gray-300">
                Total Gastos del Día
              </label>
            </div>
            <input
              type="number"
              min="0"
              step="100"
              value={formData.totalGastos || 0}
              onChange={(e) => onInputChange('totalGastos', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="0"
            />
            {formData.totalGastos > 0 && (
              <p className="text-xs text-red-400 mt-1">
                {formatCurrency(formData.totalGastos)}
              </p>
            )}
          </div>
        </div>

        {/* Observaciones */}
        <div className="pt-4">
          <div className="p-3 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="text-gray-400" size={18} />
              <label className="block text-sm font-medium text-gray-300">
                Observaciones y Notas
              </label>
            </div>
            <textarea
              value={formData.observaciones || ''}
              onChange={(e) => onTextChange('observaciones', e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
              rows="3"
              placeholder="Anotaciones importantes sobre el cierre, gastos extraordinarios, incidencias..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.observaciones ? formData.observaciones.length : 0}/500 caracteres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicPaymentsForm;