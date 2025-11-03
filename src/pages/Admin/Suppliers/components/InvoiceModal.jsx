import React from 'react';
import { X } from 'lucide-react';

/**
 * Interfaz modal para creación y gestión de facturas de compra
 * Maneja entrada de datos de facturas con asociación a proveedores y estado de pago
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.closeModal - Callback para cerrar modal de factura
 * @param {Object} props.invoiceForm - Estado actual del formulario de factura
 * @param {Function} props.setInvoiceForm - Actualizador de estado del formulario de factura
 * @param {Function} props.handleInvoiceSubmit - Manejador de envío de factura
 * @param {Object|null} props.editingInvoice - Objeto factura al editar, null para creación
 * @param {Array<Object>} props.suppliers - Proveedores disponibles para asociación
 * @returns {React.Element} Componente modal de gestión de facturas
 */
const InvoiceModal = ({
  closeModal,
  invoiceForm,
  setInvoiceForm,
  handleInvoiceSubmit,
  editingInvoice,
  suppliers
}) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-[#1a1f2e] rounded-xl shadow-2xl max-w-md w-full border border-gray-800">
      {/* Encabezado del Modal */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-xl flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {editingInvoice ? 'Editar Factura' : 'Nueva Factura de Compra'}
        </h2>
        <button 
          onClick={closeModal} 
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
          aria-label="Cerrar modal de factura"
        >
          <X size={24} />
        </button>
      </div>

      {/* Formulario de Factura */}
      <div className="p-6 space-y-4">
        {[
          { field: 'id', label: 'ID de Factura/Compra', type: 'text' },
          { field: 'invoiceNumber', label: 'Número de Factura', type: 'text' },
          { field: 'supplierId', label: 'ID del Proveedor', type: 'select' },
          { field: 'issueDate', label: 'Fecha de Emisión', type: 'date' },
          { field: 'totalAmount', label: 'Monto Total', type: 'number' },
          { field: 'paymentStatus', label: 'Estado de Pago', type: 'select' }
        ].map(({ field, label, type }) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              {label}
            </label>
            {type === 'select' ? (
              <select
                value={invoiceForm[field]}
                onChange={(e) => setInvoiceForm({ 
                  ...invoiceForm, 
                  [field]: e.target.value 
                })}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {field === 'supplierId' ? (
                  <>
                    <option value="">Seleccionar proveedor</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value="">Seleccionar estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="pagada">Pagada</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={type}
                step={type === 'number' ? "0.01" : undefined}
                value={invoiceForm[field]}
                onChange={(e) => setInvoiceForm({ 
                  ...invoiceForm, 
                  [field]: e.target.value 
                })}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
              />
            )}
          </div>
        ))}

        {/* Acciones del Formulario */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleInvoiceSubmit}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
          >
            {editingInvoice ? 'Actualizar' : 'Guardar'}
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

export default InvoiceModal;