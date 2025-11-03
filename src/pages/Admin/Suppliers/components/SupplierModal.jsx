import React from 'react';
import { X } from 'lucide-react';

/**
 * Diálogo modal para crear o editar registros de proveedores
 * Proporciona interfaz de formulario para gestión de datos de proveedores incluyendo campos listos para validación
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.closeModal - Callback para cerrar el diálogo modal
 * @param {Object} props.supplierForm - Objeto de estado actual del formulario
 * @param {Function} props.setSupplierForm - Actualizador de estado para modificaciones del formulario
 * @param {Function} props.handleSupplierSubmit - Manejador de envío del formulario
 * @param {Object|null} props.editingSupplier - Objeto proveedor en modo edición, null para creación
 * @returns {React.Element} Componente modal con formulario de proveedor
 */
const SupplierModal = ({
  closeModal,
  supplierForm,
  setSupplierForm,
  handleSupplierSubmit,
  editingSupplier
}) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-[#1a1f2e] rounded-xl shadow-2xl max-w-md w-full border border-gray-800">
      {/* Encabezado del Modal */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-5 rounded-t-xl flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {editingSupplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </h2>
        <button 
          onClick={closeModal} 
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>
      </div>

      {/* Campos del Formulario */}
      <div className="p-6 space-y-4">
        {[
          { field: 'id', label: 'ID del Proveedor', type: 'text' },
          { field: 'name', label: 'Nombre o Razón Social', type: 'text' },
          { field: 'ruc', label: 'RUC / NIT / RFC / CUIT', type: 'text' },
          { field: 'address', label: 'Dirección', type: 'text' },
          { field: 'phone', label: 'Teléfono', type: 'tel' },
          { field: 'email', label: 'Correo Electrónico', type: 'email' }
        ].map(({ field, label, type }) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              {label}
            </label>
            <input
              type={type}
              value={supplierForm[field]}
              onChange={(e) => setSupplierForm({ 
                ...supplierForm, 
                [field]: e.target.value 
              })}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-500"
            />
          </div>
        ))}

        {/* Botones de Acción */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleSupplierSubmit}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
          >
            {editingSupplier ? 'Actualizar' : 'Guardar'}
          </button>
          <button
            onClick={closeModal}
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SupplierModal;