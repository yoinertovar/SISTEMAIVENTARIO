import React, { useState } from 'react';
import { TrendingUp, Search, ArrowLeft, Filter, ChevronDown, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AllMovementsHistory = ({ setHistoryView, movementsData = [], chartData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');

  // Usar datos proporcionados o array vacío
  const movementsHistory = movementsData || [];
  const movementsChartData = chartData || [];

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
    }).format(Math.abs(value || 0));
  };

  /**
   * Filtra los movimientos basándose en los criterios de búsqueda
   * @returns {Array} Movimientos filtrados
   */
  const filteredMovements = movementsHistory.filter(movement => {
    const matchesSearch = searchTerm === '' || 
      movement.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      movement.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.referencia?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateFrom || movement.fecha >= dateFrom) && 
                       (!dateTo || movement.fecha <= dateTo);
    
    const matchesType = typeFilter === 'todos' || 
                       movement.categoria?.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesDate && matchesType;
  });

  // Cálculos de estadísticas
  const totalIngresos = movementsHistory.filter(m => m.monto > 0).reduce((sum, m) => sum + (m.monto || 0), 0);
  const totalEgresos = Math.abs(movementsHistory.filter(m => m.monto < 0).reduce((sum, m) => sum + (m.monto || 0), 0));
  const balance = totalIngresos - totalEgresos;
  const totalMovimientos = movementsHistory.length;

  /**
   * Obtiene las clases CSS para el badge de tipo
   * @param {string} tipo - Tipo de movimiento
   * @returns {string} Clases CSS correspondientes al tipo
   */
  const getTipoColor = (tipo) => {
    switch(tipo) {
      case 'Venta':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Gasto':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Crédito':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Pago':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Compra':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Factura':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  /**
   * Calcula estadísticas del día actual
   * @returns {Object} Estadísticas del día
   */
  const getEstadisticasDelDia = () => {
    const hoy = new Date().toLocaleDateString('es-CO');
    const movimientosHoy = movementsHistory.filter(m => m.fecha === hoy);
    
    const ingresosHoy = movimientosHoy.filter(m => m.monto > 0).reduce((sum, m) => sum + (m.monto || 0), 0);
    const egresosHoy = Math.abs(movimientosHoy.filter(m => m.monto < 0).reduce((sum, m) => sum + (m.monto || 0), 0));
    const balanceHoy = ingresosHoy - egresosHoy;

    return {
      ingresosHoy,
      egresosHoy,
      balanceHoy
    };
  };

  const { ingresosHoy, egresosHoy, balanceHoy } = getEstadisticasDelDia();

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => setHistoryView('dashboard')}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-orange-500"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Volver al menú de historial</span>
      </button>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-xl text-white border border-emerald-500/30">
          <ArrowUpCircle size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Ingresos</p>
          <p className="text-3xl font-bold">{formatCurrency(totalIngresos)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-xl text-white border border-red-500/30">
          <ArrowDownCircle size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Egresos</p>
          <p className="text-3xl font-bold">{formatCurrency(totalEgresos)}</p>
        </div>
        <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-600 to-blue-700' : 'from-orange-600 to-orange-700'} p-6 rounded-xl shadow-xl text-white border ${balance >= 0 ? 'border-blue-500/30' : 'border-orange-500/30'}`}>
          <TrendingUp size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Balance General</p>
          <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-xl text-white border border-purple-500/30">
          <Filter size={32} className="mb-2 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Movimientos</p>
          <p className="text-3xl font-bold">{totalMovimientos}</p>
        </div>
      </div>

      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#FB923C', textShadow: '0 0 20px rgba(251, 146, 60, 0.5)' }}>
          TODOS LOS MOVIMIENTOS
        </h1>
        
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar por descripción, ID o referencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Desde"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Hasta"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
            >
              <option value="todos">Todos los tipos</option>
              <option value="ingreso">Ingresos</option>
              <option value="egreso">Egresos</option>
              <option value="crédito">Créditos</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-[#0f1419] rounded-xl overflow-hidden border border-gray-800">
          {filteredMovements.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-red-600">
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Tipo</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Descripción</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Hora</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Monto</th>
                  <th className="text-left py-4 px-4 font-semibold text-white uppercase tracking-wider text-sm">Referencia</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement, index) => (
                  <tr 
                    key={movement.id || index} 
                    className={`${index % 2 === 0 ? 'bg-[#0f1419]' : 'bg-[#1a1f2e]'} hover:bg-[#252b3b] transition-colors border-b border-gray-800`}
                  >
                    <td className="py-4 px-4 font-medium text-white">{movement.id || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTipoColor(movement.tipo)}`}>
                        {movement.tipo || 'Sin tipo'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{movement.descripcion || 'Sin descripción'}</td>
                    <td className="py-4 px-4 text-gray-300">{movement.fecha || 'Sin fecha'}</td>
                    <td className="py-4 px-4 text-gray-300">{movement.hora || 'Sin hora'}</td>
                    <td className={`py-4 px-4 font-bold ${(movement.monto || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {(movement.monto || 0) >= 0 ? '+' : '-'}{formatCurrency(movement.monto)}
                    </td>
                    <td className="py-4 px-4 text-gray-300">{movement.referencia || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-gray-800/50 rounded-2xl mb-4">
                <TrendingUp size={48} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-semibold mb-2">
                {movementsHistory.length === 0 ? 'No hay movimientos registrados' : 'No se encontraron resultados'}
              </p>
              <p className="text-gray-500 text-sm">
                {movementsHistory.length === 0 
                  ? 'Los movimientos aparecerán aquí una vez que se realicen transacciones' 
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico de Ingresos vs Egresos */}
      <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Ingresos vs Egresos</h3>
        <div className="h-80">
          {movementsChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movementsChartData}>
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
                  formatter={(value) => [formatCurrency(value), 'Monto']}
                />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={3} name="Ingresos" />
                <Line type="monotone" dataKey="egresos" stroke="#EF4444" strokeWidth={3} name="Egresos" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex p-3 bg-gray-800/50 rounded-xl mb-3">
                  <LineChart size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm">
                  No hay datos para mostrar el gráfico
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resumen por categoría */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-emerald-500">
          <p className="text-gray-400 text-sm mb-2">Ingresos del Día</p>
          <p className="text-3xl font-bold text-emerald-400">
            {formatCurrency(ingresosHoy)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {movementsHistory.length > 0 ? 'Movimientos del día actual' : 'Sin movimientos hoy'}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-red-500">
          <p className="text-gray-400 text-sm mb-2">Egresos del Día</p>
          <p className="text-3xl font-bold text-red-400">
            {formatCurrency(egresosHoy)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {movementsHistory.length > 0 ? 'Movimientos del día actual' : 'Sin movimientos hoy'}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border-l-4 border-blue-500">
          <p className="text-gray-400 text-sm mb-2">Balance del Día</p>
          <p className="text-3xl font-bold text-blue-400">
            {formatCurrency(balanceHoy)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {balanceHoy >= 0 ? 'Flujo positivo' : 'Flujo negativo'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllMovementsHistory;