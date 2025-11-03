import React from 'react';
import { FileX, Plus, Search } from 'lucide-react';

/**
 * Componente que muestra un estado vacío cuando no hay facturas
 */
const InvoiceEmptyState = () => {
  return (
    <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 p-12">
      <div className="text-center max-w-md mx-auto">
        {/* Icono principal */}
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl"></div>
            <div className="relative p-6 bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-full border border-purple-500/50">
              <FileX size={64} className="text-purple-400" />
            </div>
          </div>
        </div>

        {/* Título y descripción */}
        <h3 className="text-2xl font-bold text-white mb-3">
          No hay facturas disponibles
        </h3>
        <p className="text-gray-400 mb-8">
          No se encontraron facturas que coincidan con tu búsqueda o aún no has creado ninguna factura.
        </p>

        {/* Sugerencias */}
        <div className="bg-[#0f1419] rounded-xl p-6 border border-gray-800">
          <h4 className="text-white font-semibold mb-4 flex items-center justify-center space-x-2">
            <span>💡</span>
            <span>Sugerencias</span>
          </h4>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <Plus size={20} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Crea tu primera factura</p>
                <p className="text-gray-500 text-xs mt-1">
                  Haz clic en el botón "Nueva Factura" para comenzar
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Search size={20} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Ajusta los filtros</p>
                <p className="text-gray-500 text-xs mt-1">
                  Modifica los criterios de búsqueda o las fechas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas de ejemplo */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 text-xs font-medium mb-1">Total</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 p-4 rounded-lg border border-emerald-500/30">
            <p className="text-emerald-300 text-xs font-medium mb-1">Pagadas</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-600/20 to-amber-700/20 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 text-xs font-medium mb-1">Pendientes</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEmptyState;
