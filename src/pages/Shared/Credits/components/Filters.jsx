import React from "react";
import { Search, Filter } from "lucide-react";

/**
 * Componente de filtros y búsqueda para la gestión de créditos
 * Proporciona búsqueda por texto y filtros avanzados por estado y fecha
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Término actual de búsqueda
 * @param {Function} props.setSearchTerm - Setter para el término de búsqueda
 * @param {boolean} props.showFilters - Estado de visibilidad de filtros avanzados
 * @param {Function} props.setShowFilters - Setter para mostrar/ocultar filtros
 * @param {string} props.filterStatus - Filtro actual por estado
 * @param {Function} props.setFilterStatus - Setter para filtro de estado
 * @param {string} props.filterDate - Filtro actual por fecha
 * @param {Function} props.setFilterDate - Setter para filtro de fecha
 * @returns {React.Element} Componente de filtros y búsqueda
 */
const Filters = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filterStatus,
  setFilterStatus,
  filterDate,
  setFilterDate,
}) => (
  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4">
    
    {/* Barra de Búsqueda y Botón de Filtros */}
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o identificación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl transition-all text-white font-semibold hover:scale-105"
      >
        <Filter size={20} />
        <span>Filtros</span>
      </button>
    </div>

    {/* Filtros Avanzados */}
    {showFilters && (
      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-700">
        
        {/* Filtro por Estado */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-300">Estado:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          >
            <option value="todos" className="bg-slate-800">Todos</option>
            <option value="activo" className="bg-slate-800">Activo</option>
            <option value="pagado" className="bg-slate-800">Pagado</option>
            <option value="vencido" className="bg-slate-800">Vencido</option>
          </select>
        </div>

        {/* Filtro por Fecha */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-300">Fecha:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Botón para Limpiar Filtros */}
        <button
          onClick={() => {
            setFilterStatus("todos");
            setFilterDate("");
            setSearchTerm("");
          }}
          className="px-5 py-2.5 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl transition-all font-semibold hover:scale-105"
        >
          Limpiar filtros
        </button>
      </div>
    )}
  </div>
);

export default Filters;