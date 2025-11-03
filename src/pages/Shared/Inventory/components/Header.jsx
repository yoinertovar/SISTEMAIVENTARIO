import React from "react";
import { Package, Plus } from "lucide-react";

/**
 * Encabezado de la página de gestión de inventario
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onAdd - Función para agregar nuevo producto
 */
const Header = ({ onAdd }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-700 shadow-2xl">
      {/* Efectos de brillo decorativos */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" 
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
        {/* Información del título */}
        <div className="flex items-center gap-4">
          <div 
            className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30"
            aria-hidden="true"
          >
            <Package size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Gestión de Inventario
            </h1>
            <p className="text-slate-300">Administra tus productos y stock</p>
          </div>
        </div>
        
        {/* Botón de acción principal */}
        <button
          onClick={onAdd}
          className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          aria-label="Agregar nuevo producto"
        >
          <Plus 
            size={20} 
            className="group-hover:rotate-90 transition-transform duration-300" 
            aria-hidden="true" 
          />
          <span>Nuevo Producto</span>
        </button>
      </div>
    </div>
  );
};

export default Header;