import React, { useState } from 'react';
import { FileText, Search, ArrowLeft, Download, Eye, Printer, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InvoicesHistory = ({ setHistoryView, invoicesData = [], chartData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Usar datos proporcionados o array vacío
  const invoicesHistory = invoicesData || [];
  const invoicesChartData = chartData || [];

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

  /**
   * Filtra las facturas basándose en los criterios de búsqueda
   * @returns {Array} Facturas filtradas
   */
  const filteredInvoices = invoicesHistory.filter(invoice => {
    const matchesSearch = searchTerm === '' || 
      invoice.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.venta?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateFrom || invoice.fecha >= dateFrom) && 
                       (!dateTo || invoice.fecha <= dateTo);
    
    const matchesStatus = statusFilter === 'todos' || 
                         invoice.estado?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Cálculos de estadísticas
  const totalFacturado = invoicesHistory.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalIVA = invoicesHistory.reduce((sum, inv) => sum + (inv.iva || 0), 0);
  const facturasPagadas = invoicesHistory.filter(inv => inv.estado === 'Pagada').length;
  const facturasPendientes = invoicesHistory.filter(inv => inv.estado === 'Pendiente').length;

  /**
   * Obtiene las clases CSS para el badge de estado
   * @param {string} estado - Estado de la factura
   * @returns {string} Clases CSS correspondientes al estado
   */
  const getStatusColor = (estado) => {
    switch(estado) {
      case 'Pagada':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Pendiente':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Cancelada':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  /**
   * Maneja la acción de ver factura
   * @param {Object} invoice - Factura a visualizar
   */
  const handleViewInvoice = (invoice) => {
    console.log('Ver factura:', invoice);
    // Aquí iría la lógica para mostrar el detalle de la factura
  };

  /**
   * Maneja la acción de descargar PDF
   * @param {Object} invoice - Factura a descargar
   */
  const handleDownloadPDF = (invoice) => {
    console.log('Descargar PDF:', invoice);
    // Aquí iría la lógica para generar y descargar el PDF
  };

  /**
   * Maneja la acción de imprimir factura
   * @param {Object} invoice - Factura a imprimir
   */
  const handlePrintInvoice = (invoice) => {
    console.log('Imprimir factura:', invoice);
    // Aquí iría la lógica para imprimir la factura
  };

  /**
   * Maneja el envío de factura por email
   * @param {Object} invoice - Factura a enviar
   */
  const handleEmailInvoice = (invoice) => {
    console.log('Enviar email:', invoice);
    // Aquí iría la lógica para enviar la factura por email
  };

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => setHistoryView('dashboard')}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-purple-500"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Volver al menú de historial</span>
      </button>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-xl text-white border border-purple-500/30">
          <FileText size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Facturado</p>
          <p className="text-3xl font-bold">{formatCurrency(totalFacturado)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-xl text-white border border-blue-500/30">
          <FileText size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total IVA</p>
          <p className="text-3xl font-bold">{formatCurrency(totalIVA)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-xl text-white border border-emerald-500/30">
          <FileText size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Facturas Pagadas</p>
          <p className="text-3xl font-bold">{facturasPagadas}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 rounded-xl shadow-xl text-white border border-amber-500/30">
          <FileText size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Facturas Pendientes</p>
          <p className="text-3xl font-bold">{facturasPendientes}</p>
        </div>
      </div>

      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#A855F7', textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
          HISTORIAL DE FACTURAS
        </h1>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar factura o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Desde"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Hasta"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="pagada">Pagadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-[#0f1419] rounded-xl overflow-hidden border border-gray-800">
          {filteredInvoices.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Factura</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Cliente</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">ID Venta</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Subtotal</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">IVA (19%)</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Total</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Estado</th>
                  <th className="text-center py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <tr 
                    key={invoice.id || index} 
                    className={`${index % 2 === 0 ? 'bg-[#0f1419]' : 'bg-[#1a1f2e]'} hover:bg-[#252b3b] transition-colors border-b border-gray-800`}
                  >
                    <td className="py-4 px-4 font-semibold text-purple-400">{invoice.id || 'N/A'}</td>
                    <td className="py-4 px-4 text-white">{invoice.cliente || 'Cliente no especificado'}</td>
                    <td className="py-4 px-4 text-gray-300">{invoice.fecha || 'Sin fecha'}</td>
                    <td className="py-4 px-4 text-gray-300">{invoice.venta || 'N/A'}</td>
                    <td className="py-4 px-4 text-gray-300">{formatCurrency(invoice.subtotal || 0)}</td>
                    <td className="py-4 px-4 text-gray-300">{formatCurrency(invoice.iva || 0)}</td>
                    <td className="py-4 px-4 font-bold text-white">{formatCurrency(invoice.total || 0)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(invoice.estado)}`}>
                        {invoice.estado || 'Sin estado'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleViewInvoice(invoice)}
                          className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                          title="Ver factura"
                        >
                          <Eye size={18} className="text-purple-400" />
                        </button>
                        <button 
                          onClick={() => handleDownloadPDF(invoice)}
                          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Descargar PDF"
                        >
                          <Download size={18} className="text-blue-400" />
                        </button>
                        <button 
                          onClick={() => handlePrintInvoice(invoice)}
                          className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                          title="Imprimir"
                        >
                          <Printer size={18} className="text-emerald-400" />
                        </button>
                        <button 
                          onClick={() => handleEmailInvoice(invoice)}
                          className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors"
                          title="Enviar por email"
                        >
                          <Mail size={18} className="text-orange-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-gray-800/50 rounded-2xl mb-4">
                <FileText size={48} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-semibold mb-2">
                {invoicesHistory.length === 0 ? 'No hay facturas registradas' : 'No se encontraron resultados'}
              </p>
              <p className="text-gray-500 text-sm">
                {invoicesHistory.length === 0 
                  ? 'Las facturas aparecerán aquí una vez que se generen' 
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Facturas Generadas por Mes</h3>
        <div className="h-64">
          {invoicesChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={invoicesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [value, 'Facturas']}
                />
                <Bar dataKey="facturas" fill="#A855F7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex p-3 bg-gray-800/50 rounded-xl mb-3">
                  <BarChart size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm">
                  No hay datos para mostrar el gráfico
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesHistory;