import React from "react";
import { X } from "lucide-react";

/**
 * Modal para crear o editar créditos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Manejador de cambios en inputs
 * @param {Function} props.handleSubmit - Manejador de envío del formulario
 * @param {Function} props.resetForm - Función para resetear el formulario
 * @param {Function} props.setShowModal - Función para mostrar/ocultar modal
 * @param {Object|null} props.editingCredit - Crédito en edición o null si es nuevo
 */
const CreditModal = ({
  formData,
  handleInputChange,
  handleSubmit,
  resetForm,
  setShowModal,
  editingCredit,
}) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
      {/* Header del Modal */}
      <div className="px-6 py-5 border-b border-slate-700 bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {editingCredit ? "Editar Crédito" : "Nuevo Crédito"}
          </h2>
          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo: Nombre */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-semibold text-slate-300 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo: Apellido */}
          <div>
            <label htmlFor="clientLastName" className="block text-sm font-semibold text-slate-300 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              id="clientLastName"
              name="clientLastName"
              value={formData.clientLastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo: Cédula/Identificación */}
          <div>
            <label htmlFor="idNumber" className="block text-sm font-semibold text-slate-300 mb-2">
              Cédula / Identificación *
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo: Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
              Teléfono *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo: Dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-slate-300 mb-2">
              Dirección *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo: Monto Total */}
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-semibold text-slate-300 mb-2">
              Monto Total *
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Campo: Detalles */}
        <div>
          <label htmlFor="detailedInfo" className="block text-sm font-semibold text-slate-300 mb-2">
            Detalles
          </label>
          <textarea
            id="detailedInfo"
            name="detailedInfo"
            value={formData.detailedInfo}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="Información adicional del crédito..."
          />
        </div>
      </div>

      {/* Footer del Modal */}
      <div className="px-6 py-4 bg-slate-700/50 border-t border-slate-700 flex justify-end gap-3">
        <button
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold hover:scale-105"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-red-500/30 hover:scale-105"
        >
          {editingCredit ? "Guardar cambios" : "Crear crédito"}
        </button>
      </div>
    </div>
  </div>
);

export default CreditModal;