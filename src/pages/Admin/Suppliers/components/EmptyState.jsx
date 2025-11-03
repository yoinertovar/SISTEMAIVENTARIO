import React from 'react';
import { Truck } from 'lucide-react';

/**
 * Componente de estado vacío mostrado cuando no existen registros de proveedores
 * Proporciona retroalimentación visual y guía para población inicial de datos
 * 
 * @componente
 * @returns {React.Element} Componente de marcador de posición de estado vacío
 */
const EmptyState = () => (
  <div className="bg-[#1a1f2e] p-10 rounded-xl shadow-xl border border-gray-800">
    <div className="text-center py-16">
      <div className="inline-flex p-6 bg-gray-800/50 rounded-2xl mb-6">
        <Truck size={72} className="text-gray-600" />
      </div>
      <p className="text-gray-300 text-xl font-semibold mb-2">
        No hay proveedores registrados
      </p>
      <p className="text-gray-500 text-base">
        Comienza agregando un nuevo proveedor
      </p>
    </div>
  </div>
);

export default EmptyState;