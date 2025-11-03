import React from 'react';
import { ShoppingCart } from 'lucide-react';

/**
 * Componente de cabecera para la página de ventas
 * Muestra el título y elementos decorativos
 */
const SalesHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-700 shadow-2xl">
      
      {/* Efectos de brillo decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg shadow-emerald-500/30">
            <ShoppingCart size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Gestión de Ventas</h1>
            <p className="text-slate-300">Registra y consulta tus ventas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesHeader;