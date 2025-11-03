import React, { useState } from 'react';
import { CreditCard, Search, ArrowLeft, Eye, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CreditsHistory = ({ setHistoryView, creditsData = [], chartData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Usar datos proporcionados o array vacío
  const creditsHistory = creditsData || [];
  const creditsChartData = chartData || [];

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
    }).format(value || 0);
  };

  /**
   * Filtra los créditos basándose en los criterios de búsqueda
   * @returns {Array} Créditos filtrados
   */
  const filteredCredits = creditsHistory.filter(credit => {
    const matchesSearch = searchTerm === '' || 
      credit.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      credit.id?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'todos' || 
                         credit.estado?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Cálculos de estadísticas
  const totalCreditos = creditsHistory.reduce((sum, c) => sum + (c.monto || 0), 0);
  const totalPagado = creditsHistory.reduce((sum, c) => sum + (c.pagado || 0), 0);
  const totalPendiente = creditsHistory.reduce((sum, c) => sum + (c.pendiente || 0), 0);
  const creditosActivos = creditsHistory.filter(c => c.estado === 'Activo').length;

  /**
   * Datos para el gráfico de pastel
   * @returns {Array} Datos formateados para el gráfico
   */
  const getPieData = () => {
    if (totalCreditos === 0) return [];
    
    return [
      { 
        name: 'Pagado', 
        value: totalPagado, 
        color: '#10B981' 
      },
      { 
        name: 'Pendiente', 
        value: totalPendiente, 
        color: '#EF4444' 
      }
    ];
  };

  const pieData = getPieData();

  /**
   * Maneja la acción de ver detalles del crédito
   * @param {Object} credit - Crédito a visualizar
   */
  const handleViewCredit = (credit) => {
    console.log('Ver crédito:', credit);
    // Aquí iría la lógica para mostrar el detalle del crédito
  };

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => setHistoryView('dashboard')}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-amber-500"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Volver al menú de historial</span>
      </button>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 rounded-xl shadow-xl text-white border border-amber-500/30">
          <div className="flex items-center justify-between mb-2">
            <CreditCard size={32} className="opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Créditos</p>
          <p className="text-3xl font-bold">{formatCurrency(totalCreditos)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-xl text-white border border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle size={32} className="opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Pagado</p>
          <p className="text-3xl font-bold">{formatCurrency(totalPagado)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-xl text-white border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle size={32} className="opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Pendiente</p>
          <p className="text-3xl font-bold">{formatCurrency(totalPendiente)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-xl text-white border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} className="opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Créditos Activos</p>
          <p className="text-3xl font-bold">{creditosActivos}</p>
        </div>
      </div>

      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#FBBF24', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
          HISTORIAL DE CRÉDITOS
        </h1>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar por cliente o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="pagado">Pagados</option>
              <option value="vencido">Vencidos</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-[#0f1419] rounded-xl overflow-hidden border border-gray-800">
          {filteredCredits.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-600 to-amber-700">
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Cliente</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Monto Total</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Pagado</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Pendiente</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Estado</th>
                  <th className="text-center py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCredits.map((credit, index) => (
                  <tr key={credit.id || index} className={`${index % 2 === 0 ? 'bg-[#0f1419]' : 'bg-[#1a1f2e]'} hover:bg-[#252b3b] transition-colors border-b border-gray-800`}>
                    <td className="py-4 px-4 font-medium text-white">{credit.id || 'N/A'}</td>
                    <td className="py-4 px-4 font-medium text-white">{credit.cliente || 'Cliente no especificado'}</td>
                    <td className="py-4 px-4 text-gray-300">{credit.fecha || 'Sin fecha'}</td>
                    <td className="py-4 px-4 font-semibold text-white">{formatCurrency(credit.monto)}</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">{formatCurrency(credit.pagado)}</td>
                    <td className="py-4 px-4 text-red-400 font-semibold">{formatCurrency(credit.pendiente)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        credit.estado === 'Pagado' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : credit.estado === 'Vencido'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        {credit.estado || 'Sin estado'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleViewCredit(credit)}
                        className="p-2 hover:bg-amber-500/20 rounded-lg transition-colors"
                        title="Ver detalles del crédito"
                      >
                        <Eye size={18} className="text-amber-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-gray-800/50 rounded-2xl mb-4">
                <CreditCard size={48} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-semibold mb-2">
                {creditsHistory.length === 0 ? 'No hay créditos registrados' : 'No se encontraron resultados'}
              </p>
              <p className="text-gray-500 text-sm">
                {creditsHistory.length === 0 
                  ? 'Los créditos aparecerán aquí una vez que se otorguen' 
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico de distribución */}
      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Distribución de Pagos</h3>
        <div className="h-64">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [formatCurrency(value), 'Monto']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex p-3 bg-gray-800/50 rounded-xl mb-3">
                  <PieChart size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm">
                  No hay datos para mostrar el gráfico
                </p>
              </div>
            </div>
          )}
        </div>
        {totalCreditos > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <p className="text-sm text-emerald-400 mb-1">Porcentaje Pagado</p>
              <p className="text-2xl font-bold text-emerald-400">
                {((totalPagado / totalCreditos) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-sm text-red-400 mb-1">Porcentaje Pendiente</p>
              <p className="text-2xl font-bold text-red-400">
                {((totalPendiente / totalCreditos) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditsHistory;