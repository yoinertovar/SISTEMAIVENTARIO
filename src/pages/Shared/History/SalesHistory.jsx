import React, { useState } from 'react';
import { Clock, Search, Filter, Calendar, ChevronDown, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Componente de historial de ventas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.setHistoryView - Función para cambiar la vista
 * @param {Array} props.salesData - Datos de ventas (opcional)
 * @param {Array} props.chartData - Datos para gráficos (opcional)
 */
const SalesHistory = ({ setHistoryView, salesData = [], chartData = [] }) => {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [movementFilter, setMovementFilter] = useState('todos');

  // Usar datos proporcionados o array vacío
  const salesHistory = salesData || [];
  const salesChartData = chartData || [];

  // Cálculos de totales
  const totalVendido = salesHistory.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalDevuelto = salesHistory.reduce((sum, sale) => sum + (sale.devuelto || 0), 0);

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
   * Filtra las ventas basándose en los criterios de búsqueda
   * @returns {Array} Ventas filtradas
   */
  const filteredSales = salesHistory.filter(sale => {
    const matchesSearch = searchTerm === '' || 
      sale.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.fecha?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateFrom || sale.fecha >= dateFrom) && 
                       (!dateTo || sale.fecha <= dateTo);
    
    const matchesMovement = movementFilter === 'todos' || 
                           sale.tipo === movementFilter;
    
    return matchesSearch && matchesDate && matchesMovement;
  });

  return (
    <div className="space-y-6">
      {/* Botón de navegación */}
      <button
        onClick={() => setHistoryView('dashboard')}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        aria-label="Volver al menú principal de historial"
      >
        <ArrowLeft size={20} aria-hidden="true" />
        <span className="font-semibold">Volver al menú de historial</span>
      </button>

      {/* Contenedor principal */}
      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        {/* Título */}
        <h1 
          className="text-3xl font-bold text-center mb-6 text-blue-400"
          style={{ textShadow: '0 0 20px rgba(96, 165, 250, 0.5)' }}
        >
          HISTORIAL DE VENTAS
        </h1>
        
        {/* Sección de Filtros */}
        <section aria-label="Filtros de búsqueda">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Búsqueda por texto */}
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
                size={20} 
                aria-hidden="true" 
              />
              <input
                type="text"
                placeholder="Buscar por ID o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                aria-label="Buscar en ventas"
              />
            </div>

            {/* Filtro por fecha */}
            <div>
              <label className="block text-sm mb-2 text-gray-400 font-medium">
                Rango de Fechas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Fecha desde"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Fecha hasta"
                />
              </div>
            </div>

            {/* Filtro por tipo de movimiento */}
            <div>
              <label className="block text-sm mb-2 text-gray-400 font-medium">
                Tipo de Movimiento
              </label>
              <div className="relative">
                <select
                  value={movementFilter}
                  onChange={(e) => setMovementFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  aria-label="Filtrar por tipo de movimiento"
                >
                  <option value="todos">Todos los movimientos</option>
                  <option value="ventas">Solo ventas</option>
                  <option value="devoluciones">Solo devoluciones</option>
                </select>
                <ChevronDown 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" 
                  size={20} 
                  aria-hidden="true" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabla de ventas */}
        <section aria-label="Lista de ventas">
          <div className="bg-[#0f1419] rounded-xl overflow-hidden border border-gray-800">
            {filteredSales.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">
                      ID Venta
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">
                      Fecha
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">
                      Cantidad
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">
                      Total
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">
                      Devuelto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale, index) => (
                    <tr 
                      key={sale.id || index} 
                      className={`${
                        index % 2 === 0 ? 'bg-[#0f1419]' : 'bg-[#1a1f2e]'
                      } hover:bg-[#252b3b] transition-colors border-b border-gray-800`}
                    >
                      <td className="py-4 px-4 text-white font-semibold">{sale.id || 'N/A'}</td>
                      <td className="py-4 px-4 text-gray-300">{sale.fecha || 'Sin fecha'}</td>
                      <td className="py-4 px-4 text-gray-300">{sale.cantidad || 0}</td>
                      <td className="py-4 px-4 text-blue-400 font-bold">
                        {formatCurrency(sale.total || 0)}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {formatCurrency(sale.devuelto || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-gray-800/50 rounded-2xl mb-4">
                  <Search size={48} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg font-semibold mb-2">
                  {salesHistory.length === 0 ? 'No hay ventas registradas' : 'No se encontraron resultados'}
                </p>
                <p className="text-gray-500 text-sm">
                  {salesHistory.length === 0 
                    ? 'Las ventas aparecerán aquí una vez que se realicen transacciones' 
                    : 'Intenta ajustar los filtros de búsqueda'
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Sección inferior: Gráfico y Totales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas por mes */}
        <section 
          className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800"
          aria-label="Gráfico de ventas por mes"
        >
          <h3 className="text-lg font-bold text-white mb-4">Ventas por Mes</h3>
          <div className="h-64">
            {salesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesChartData}>
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
                    formatter={(value) => [formatCurrency(value), 'Ventas']}
                  />
                  <Bar 
                    dataKey="ventas" 
                    fill="#3B82F6" 
                    radius={[8, 8, 0, 0]} 
                    name="Ventas"
                  />
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
        </section>

        {/* Panel de totales */}
        <section 
          className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800 flex items-center justify-around"
          aria-label="Resumen de totales"
        >
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
              Total Vendido
            </p>
            <p className="text-4xl font-bold text-emerald-400">
              {formatCurrency(totalVendido)}
            </p>
          </div>
          <div className="w-px h-20 bg-gray-700" aria-hidden="true"></div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
              Total Devuelto
            </p>
            <p className="text-4xl font-bold text-red-400">
              {formatCurrency(totalDevuelto)}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SalesHistory;