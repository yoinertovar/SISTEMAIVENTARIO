import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

/**
 * Componente de tabla de datos para mostrar registros de proveedores con operaciones CRUD
 * Soporta selección de filas, edición en línea y acciones de gestión de proveedores
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.suppliers - Array de objetos proveedor a mostrar
 * @param {Function} props.openSupplierModal - Callback para abrir modal de edición de proveedor
 * @param {Function} props.deleteSupplier - Callback para manejar eliminación de proveedor
 * @param {Function} props.openInvoiceModal - Callback para abrir modal de creación de factura
 * @returns {React.Element} Tabla de datos de proveedores con controles de acción
 */
const SupplierTable = ({ suppliers, openSupplierModal, deleteSupplier, openInvoiceModal }) => (
  <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-emerald-600 to-emerald-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">RUC</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {suppliers.map((supplier, index) => (
            <tr 
              key={supplier.id} 
              className={`${
                index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#0f1419]'
              } hover:bg-[#252b3b] transition-colors`}
            >
              <td className="px-6 py-4 text-sm text-gray-300">{supplier.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-white">{supplier.name}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{supplier.ruc}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{supplier.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{supplier.email}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openSupplierModal(supplier)}
                    className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                    aria-label={`Editar proveedor ${supplier.name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteSupplier(supplier.id)}
                    className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                    aria-label={`Eliminar proveedor ${supplier.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => openInvoiceModal()}
                    className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs rounded-lg transition-all duration-300 font-semibold flex items-center space-x-1 shadow-lg"
                    aria-label="Crear nueva factura"
                  >
                    <Plus size={14} />
                    <span>Factura</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SupplierTable;