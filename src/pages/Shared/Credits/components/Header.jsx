import React from "react";
import { CreditCard, Plus } from "lucide-react";

/**
 * Encabezado de la página de gestión de créditos
 * Proporciona título, descripción y acción principal de creación
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onAdd - Callback para abrir modal de nuevo crédito
 * @returns {React.Element} Encabezado de la página de créditos
 */
const Header = ({ onAdd }) => (
  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-700 shadow-2xl">
    
    {/* Efectos Visuales de Fondo */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-full blur-3xl"></div>
    
    {/* Contenido Principal */}
    <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
      
      {/* Información de Título */}
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-red-600 to-pink-600 p-4 rounded-2xl shadow-lg shadow-red-500/30">
          <CreditCard size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Gestión de Créditos</h1>
          <p className="text-slate-300">Control de créditos y pagos</p>
        </div>
      </div>

      {/* Botón de Acción Principal */}
      <button
        onClick={onAdd}
        className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 hover:scale-105 group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        <span>Nuevo Crédito</span>
      </button>
    </div>
  </div>
);

export default Header;