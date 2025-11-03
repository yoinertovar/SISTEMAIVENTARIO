import React from 'react';
import { Search, Filter } from 'lucide-react';

/**
 * Componente de filtrado interactivo para exploración de datos de proveedores
 * Proporciona funcionalidad de búsqueda y opciones de filtros avanzados expandibles
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Valor actual de la consulta de búsqueda
 * @param {Function} props.setSearchTerm - Actualizador de estado del término de búsqueda
 * @param {boolean} props.showFilters - Estado de visibilidad de filtros avanzados
 * @param {Function} props.setShowFilters - Alternador de visibilidad de filtros
 * @param {string} props.dateFilter - Valor del filtro de fecha seleccionado
 * @param {Function} props.setDateFilter - Actualizador de estado del filtro de fecha
 * @param {string} props.supplierFilter - Valor del filtro de proveedor seleccionado
 * @param {Function} props.setSupplierFilter - Actualizador de estado del filtro de proveedor
 * @param {Array<Object>} props.suppliers - Lista de proveedores para opciones de filtro
 * @returns {React.Element} Componente de control de búsqueda y filtrado
 */
const FiltersBar = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  dateFilter,
  setDateFilter,
  supplierFilter,
  setSupplierFilter,
  suppliers
}) => (
  <div className="bg-[#1a1f2e] p-4 rounded-xl shadow-xl border border-gray-800">
    <div className="flex items-center space-x-4">
      {/* Entrada de Búsqueda */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Buscar proveedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none placeholder-gray-500 transition-all"
        />
      </div>
      
      {/* Alternador de Filtros */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg font-medium"
      >
        <Filter size={20} />
        <span>Filtros</span>
      </button>
    </div>

    {/* Sección de Filtros Avanzados */}
    {showFilters && (
      <div className="mt-4 p-4 bg-[#0f1419] rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
            Filtrar por fecha
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
            Filtrar por proveedor
          </label>
          <select
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          >
            <option value="">Todos los proveedores</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    )}
  </div>
);

export default FiltersBar;