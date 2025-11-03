import React from 'react';
import { FileText, Calendar, User, DollarSign, Printer, Download, Eye } from 'lucide-react';

/**
 * Componente que muestra la lista de facturas en tarjetas
 * Incluye botones de acción rápida para cada factura
 */
const InvoiceList = ({ invoices, onInvoiceSelect, getEstadoColor, onPrintInvoice, onExportPDF }) => {
  
  /**
   * Formatea valores monetarios
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  /**
   * CORREGIDO: Convierte una fecha en formato YYYY-MM-DD a fecha local
   * Evita problemas de zona horaria UTC que cambian el día
   */
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    
    // Si es solo una fecha (YYYY-MM-DD), crear como fecha local
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    
    // Si incluye hora, usar normalmente
    return new Date(dateString);
  };

  /**
   * CORREGIDO: Formatea fecha
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = parseLocalDate(dateString);
    if (!date || isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  /**
   * Maneja el clic en un botón de acción
   * Previene la propagación para no seleccionar la factura
   */
  const handleActionClick = (e, action, invoice) => {
    e.stopPropagation();
    action(invoice);
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Lista de Facturas</h2>
        <p className="text-gray-400 text-sm">Haz clic en una factura para ver más detalles o usa las acciones rápidas</p>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-6 border-b border-gray-800 hover:bg-[#0f1419] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              {/* Información principal - Clickeable para ver detalles */}
              <div 
                onClick={() => onInvoiceSelect(invoice)}
                className="flex items-start space-x-4 flex-1 cursor-pointer"
              >
                <div className="p-3 bg-purple-600/20 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                  <FileText size={24} className="text-purple-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-bold text-lg">{invoice.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(invoice.estado)}`}>
                      {invoice.estado}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <User size={14} />
                      <span>{invoice.cliente}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={14} />
                      <span>{formatDate(invoice.fecha || invoice.createdAt)}</span>
                    </div>
                  </div>
                  
                  {invoice.identificacion && (
                    <div className="mt-1 text-xs text-gray-500">
                      CC/NIT: {invoice.identificacion}
                    </div>
                  )}
                </div>
              </div>

              {/* Total y botones de acción */}
              <div className="text-right ml-4 space-y-3">
                {/* Total */}
                <div>
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    <DollarSign size={16} className="text-green-400" />
                    <span className="text-white font-bold text-xl">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {invoice.items?.length || 0} item{(invoice.items?.length || 0) !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Botones de acción rápida */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleActionClick(e, onInvoiceSelect, invoice)}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                    title="Ver detalles"
                  >
                    <Eye size={16} />
                  </button>
                  
                  {onPrintInvoice && (
                    <button
                      onClick={(e) => handleActionClick(e, onPrintInvoice, invoice)}
                      className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                      title="Imprimir"
                    >
                      <Printer size={16} />
                    </button>
                  )}
                  
                  {onExportPDF && (
                    <button
                      onClick={(e) => handleActionClick(e, onExportPDF, invoice)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                      title="Exportar PDF"
                    >
                      <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;