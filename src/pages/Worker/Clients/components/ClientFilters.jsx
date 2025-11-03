import React from 'react';
import { Search, Filter } from 'lucide-react';

/**
 * Componente de filtros y búsqueda para clientes
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Término de búsqueda actual
 * @param {Function} props.setSearchTerm - Función para actualizar búsqueda
 * @param {string} props.filterCredit - Filtro de crédito actual
 * @param {Function} props.setFilterCredit - Función para actualizar filtro
 */
const ClientFilters = ({ searchTerm, setSearchTerm, filterCredit, setFilterCredit }) => (
  <div className="px-6 py-4 bg-[#0f1419] border-b border-gray-800">
    <div className="flex flex-col sm:flex-row gap-4">
      
      {/* Campo de búsqueda */}
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, correo o dirección..."
          className="w-full pl-12 pr-4 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-500"
        />
      </div>
      
      {/* Filtro por crédito */}
      <div className="relative">
        <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
        <select
          value={filterCredit}
          onChange={(e) => setFilterCredit(e.target.value)}
          className="pl-12 pr-8 py-3 bg-[#1a1f2e] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer"
        >
          <option value="todos">Todos</option>
          <option value="con-credito">Con Crédito</option>
          <option value="sin-credito">Sin Crédito</option>
        </select>
      </div>
    </div>
  </div>
);

export default ClientFilters;