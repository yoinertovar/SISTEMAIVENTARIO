import React from 'react';
import { Truck, Phone, Mail } from 'lucide-react';

/**
 * Componente de estadísticas del dashboard que muestra métricas clave de proveedores
 * Visualiza total de proveedores, conteo activo y órdenes pendientes con tarjetas degradadas
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.suppliers - Lista completa de objetos proveedor
 * @param {number} props.activeSuppliers - Conteo de proveedores con estado activo
 * @param {number} props.pendingOrders - Número de órdenes de compra pendientes de cumplimiento
 * @returns {React.Element} Componente de dashboard de estadísticas
 */
const SupplierStats = ({ suppliers, activeSuppliers, pendingOrders }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Tarjeta de Proveedores Totales */}
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-5 rounded-xl shadow-xl border border-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-emerald-100 text-sm font-medium mb-1">Total Proveedores</p>
          <p className="text-3xl font-bold text-white">{suppliers.length}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Truck className="text-white" size={28} />
        </div>
      </div>
    </div>

    {/* Tarjeta de Proveedores Activos */}
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-xl shadow-xl border border-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium mb-1">Proveedores Activos</p>
          <p className="text-3xl font-bold text-white">{activeSuppliers}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Phone className="text-white" size={28} />
        </div>
      </div>
    </div>

    {/* Tarjeta de Órdenes Pendientes */}
    <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-5 rounded-xl shadow-xl border border-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-100 text-sm font-medium mb-1">Órdenes Pendientes</p>
          <p className="text-3xl font-bold text-white">{pendingOrders}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Mail className="text-white" size={28} />
        </div>
      </div>
    </div>
  </div>
);

export default SupplierStats;