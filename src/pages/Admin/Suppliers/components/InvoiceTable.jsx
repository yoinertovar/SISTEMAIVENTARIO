import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * Componente de tabla de datos para mostrar registros de facturas de compra
 * Muestra detalles de facturas con relaciones de proveedores y seguimiento de estado de pago
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.invoices - Array de objetos factura a mostrar
 * @param {Array<Object>} props.suppliers - Lista de proveedores para resolución de relaciones
 * @param {Function} props.openInvoiceModal - Callback para abrir modal de edición de factura
 * @param {Function} props.deleteInvoice - Callback para manejar eliminación de factura
 * @returns {React.Element} Tabla de datos de facturas con controles de gestión
 */
const InvoiceTable = ({ invoices, suppliers, openInvoiceModal, deleteInvoice }) => (
  <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
    {/* Encabezado de la Tabla */}
    <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
      <h2 className="text-lg font-bold text-white">Facturas de Compra</h2>
    </div>
    
    {/* Tabla de Datos */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#0f1419] border-b border-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              ID Factura
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Número
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Proveedor
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Monto
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {invoices.map((invoice, index) => {
            const supplier = suppliers.find(s => s.id === invoice.supplierId);
            return (
              <tr 
                key={invoice.id} 
                className={`${
                  index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#0f1419]'
                } hover:bg-[#252b3b] transition-colors`}
              >
                <td className="px-6 py-4 text-sm text-white font-semibold">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {supplier?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {invoice.issueDate}
                </td>
                <td className="px-6 py-4 text-sm text-emerald-400 font-bold">
                  ${invoice.totalAmount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    invoice.paymentStatus === 'pagada'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {invoice.paymentStatus === 'pagada' ? 'Pagada' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openInvoiceModal(invoice)}
                      className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                      aria-label={`Editar factura ${invoice.invoiceNumber}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteInvoice(invoice.id)}
                      className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                      aria-label={`Eliminar factura ${invoice.invoiceNumber}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default InvoiceTable;