import React from 'react';
import { X } from 'lucide-react';

/**
 * Formulario para crear o editar gastos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.mode - Modo del formulario ('edit' o 'create')
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.onInputChange - Manejador de cambios en inputs
 * @param {Function} props.onSave - Manejador de guardado
 * @param {Function} props.onCancel - Manejador de cancelación
 */
const ExpenseForm = ({ mode, formData, onInputChange, onSave, onCancel }) => {
  const isEdit = mode === 'edit';
  const title = isEdit ? 'EDITAR GASTO' : 'NUEVO GASTO';
  const saveButtonText = isEdit ? 'ACTUALIZAR GASTO' : 'GUARDAR GASTO';
  
  const saveButtonClass = isEdit 
    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-emerald-500/50' 
    : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-orange-500/50';

  /**
   * Formatea números como pesos colombianos
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatearPesos = (valor) => {
    if (!valor || valor === "") return "0";
    return new Intl.NumberFormat('es-CO').format(valor);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] rounded-xl shadow-2xl max-w-md w-full border border-gray-800 animate-fade-in">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-5 rounded-t-xl flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onCancel} 
            className="hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
            aria-label="Cerrar formulario"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cuerpo del Formulario */}
        <div className="p-6 space-y-5">
          {/* Campo: Nombre del Gasto */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              Nombre del Gasto
            </label>
            <input
              type="text"
              name="nombreGasto"
              value={formData.nombreGasto}
              onChange={onInputChange}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="Ingrese el nombre del gasto"
              required
            />
          </div>

          {/* Campo: Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={onInputChange}
              rows="3"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all placeholder-gray-500"
              placeholder="Descripción del gasto"
            />
          </div>

          {/* Campos: Monto y Fecha */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Monto (COP)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  name="monto"
                  value={formData.monto}
                  onChange={onInputChange}
                  className="w-full pl-8 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="0"
                  min="0"
                  step="1"
                  required
                />
              </div>
              {formData.monto && (
                <p className="text-xs text-gray-400 mt-1">
                  ${formatearPesos(formData.monto)} COP
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Fecha del Gasto
              </label>
              <input
                type="date"
                name="fechaGasto"
                value={formData.fechaGasto}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Campos: Estado y Método de Pago */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Estado de Pago
              </label>
              <select
                name="estadoPago"
                value={formData.estadoPago}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Método de Pago
              </label>
              <select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Seleccionar</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Nequi">Nequi</option>
                <option value="Daviplata">Daviplata</option>
              </select>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSave}
              className={`flex-1 ${saveButtonClass} text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg`}
            >
              {saveButtonText}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;