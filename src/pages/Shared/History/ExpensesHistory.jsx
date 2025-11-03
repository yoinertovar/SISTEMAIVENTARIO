import React, { useState } from 'react';
import { DollarSign, Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpensesHistory = ({ setHistoryView, expensesData = [], chartData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Usar datos proporcionados o array vacío
  const expensesHistory = expensesData || [];
  const expensesChartData = chartData || [];

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
   * Filtra los gastos basándose en los criterios de búsqueda
   * @returns {Array} Gastos filtrados
   */
  const filteredExpenses = expensesHistory.filter(expense => {
    const matchesSearch = searchTerm === '' || 
      expense.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      expense.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.categoria?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateFrom || expense.fecha >= dateFrom) && 
                       (!dateTo || expense.fecha <= dateTo);
    
    const matchesCategory = categoryFilter === 'todos' || 
                           expense.categoria?.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesDate && matchesCategory;
  });

  // Cálculos de estadísticas
  const totalGastado = expensesHistory.reduce((sum, expense) => sum + (expense.monto || 0), 0);
  const gastoPromedio = expensesHistory.length > 0 ? totalGastado / expensesHistory.length : 0;
  
  /**
   * Encuentra la categoría con más gastos
   * @returns {string} Categoría principal
   */
  const getCategoriaPrincipal = () => {
    if (expensesHistory.length === 0) return 'Sin datos';
    
    const categorias = {};
    expensesHistory.forEach(expense => {
      const categoria = expense.categoria || 'Sin categoría';
      categorias[categoria] = (categorias[categoria] || 0) + (expense.monto || 0);
    });
    
    return Object.keys(categorias).reduce((a, b) => 
      categorias[a] > categorias[b] ? a : b, 'Sin datos'
    );
  };

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => setHistoryView('dashboard')}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-orange-500"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Volver al menú de historial</span>
      </button>

      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#FB923C', textShadow: '0 0 20px rgba(251, 146, 60, 0.5)' }}>
          HISTORIAL DE GASTOS
        </h1>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar por ID, descripción o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400 font-medium">Rango de Fechas</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400 font-medium">Categoría</label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
              >
                <option value="todos">Todas las categorías</option>
                <option value="servicios">Servicios</option>
                <option value="compras">Compras</option>
                <option value="salarios">Salarios</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="otros">Otros</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-[#0f1419] rounded-xl overflow-hidden border border-gray-800">
          {filteredExpenses.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-orange-700">
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Categoría</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Descripción</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Monto</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr 
                    key={expense.id || index} 
                    className={`${index % 2 === 0 ? 'bg-[#0f1419]' : 'bg-[#1a1f2e]'} hover:bg-[#252b3b] transition-colors border-b border-gray-800`}
                  >
                    <td className="py-4 px-4 text-white font-semibold">{expense.id || 'N/A'}</td>
                    <td className="py-4 px-4 text-gray-300">{expense.fecha || 'Sin fecha'}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg text-xs font-medium">
                        {expense.categoria || 'Sin categoría'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{expense.descripcion || 'Sin descripción'}</td>
                    <td className="py-4 px-4 text-red-400 font-bold">
                      -{formatCurrency(expense.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-gray-800/50 rounded-2xl mb-4">
                <DollarSign size={48} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-semibold mb-2">
                {expensesHistory.length === 0 ? 'No hay gastos registrados' : 'No se encontraron resultados'}
              </p>
              <p className="text-gray-500 text-sm">
                {expensesHistory.length === 0 
                  ? 'Los gastos aparecerán aquí una vez que se registren' 
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico y Total */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Gastos por Mes</h3>
          <div className="h-64">
            {expensesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesChartData}>
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
                    formatter={(value) => [formatCurrency(value), 'Gastos']}
                  />
                  <Bar dataKey="gastos" fill="#FB923C" radius={[8, 8, 0, 0]} />
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

        {/* Total Gastado */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-xl shadow-xl flex items-center justify-center border border-orange-500/30">
          <div className="text-center text-white">
            <DollarSign size={48} className="mx-auto mb-4 opacity-80" />
            <p className="text-lg mb-2 opacity-90 font-medium">TOTAL GASTADO</p>
            <p className="text-5xl font-bold">{formatCurrency(totalGastado)}</p>
            <p className="text-sm mt-3 opacity-75">En el período seleccionado</p>
          </div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-orange-500">
          <p className="text-gray-400 text-sm mb-1">Gasto Promedio</p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(gastoPromedio)}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-blue-500">
          <p className="text-gray-400 text-sm mb-1">Total de Gastos</p>
          <p className="text-2xl font-bold text-white">{expensesHistory.length}</p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-purple-500">
          <p className="text-gray-400 text-sm mb-1">Categoría Principal</p>
          <p className="text-2xl font-bold text-white">{getCategoriaPrincipal()}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesHistory;