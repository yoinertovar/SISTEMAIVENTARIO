import React from "react";
import { Search } from "lucide-react";

/**
 * Componente de filtros y búsqueda para productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {string} props.searchTerm - Término de búsqueda actual
 * @param {Function} props.setSearchTerm - Función para actualizar término de búsqueda
 * @param {string} props.filterCategory - Categoría filtrada actual
 * @param {Function} props.setFilterCategory - Función para actualizar filtro de categoría
 * @param {string} props.filterState - Estado filtrado actual
 * @param {Function} props.setFilterState - Función para actualizar filtro de estado
 */
const Filters = ({
  categories,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterState,
  setFilterState,
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Campo de búsqueda */}
        <div className="flex-1 relative">
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" 
            size={20} 
            aria-hidden="true" 
          />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            aria-label="Buscar productos"
          />
        </div>

        {/* Filtro por categoría */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          aria-label="Filtrar por categoría"
        >
          <option value="" className="bg-slate-800">
            Todas las categorías
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-800 text-white">
              {cat}
            </option>
          ))}
        </select>

        {/* Filtro por estado */}
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          aria-label="Filtrar por estado"
        >
          <option value="" className="bg-slate-800">
            Todos los estados
          </option>
          <option value="disponible" className="bg-slate-800">
            Disponible
          </option>
          <option value="agotado" className="bg-slate-800">
            Agotado
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;