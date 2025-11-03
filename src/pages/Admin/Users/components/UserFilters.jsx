import React from 'react';
import { Search, Filter } from 'lucide-react';

/**
 * Componente de filtrado interactivo para exploración de datos de usuarios
 * Proporciona funcionalidad de búsqueda y opciones de filtro avanzado expandibles
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Valor actual de consulta de búsqueda
 * @param {Function} props.setSearchTerm - Setter de estado del término de búsqueda
 * @param {boolean} props.showFilters - Estado de visibilidad de filtros avanzados
 * @param {Function} props.setShowFilters - Alternador de visibilidad de filtros
 * @param {string} props.roleFilter - Valor de filtro de rol seleccionado
 * @param {Function} props.setRoleFilter - Setter de estado de filtro de rol
 * @returns {React.Element} Componente de control de búsqueda y filtrado
 */
const UserFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters, 
  roleFilter, 
  setRoleFilter 
}) => {
  return (
    <div className="bg-[#1a1f2e] p-4 rounded-xl shadow-xl border border-gray-800">
      <div className="flex items-center space-x-4">
        
        {/* Entrada de Búsqueda */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none placeholder-gray-500 transition-all"
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
        <div className="mt-4 p-4 bg-[#0f1419] rounded-xl border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
              Filtrar por rol
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
              <option value="almacenista">Almacenista</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;