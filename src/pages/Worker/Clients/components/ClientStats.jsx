import React from 'react';
import { Users, CreditCard, DollarSign } from 'lucide-react';

/**
 * Componente de estadísticas de clientes
 * Muestra métricas clave sobre los clientes
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.clients - Lista de clientes
 * @param {number} props.totalCredito - Total de crédito otorgado
 */
const ClientStats = ({ clients, totalCredito }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    
    {/* Total de Clientes */}
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl border border-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-blue-100 uppercase tracking-wide">Total Clientes</p>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Users className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-4xl font-bold text-white mt-2">{clients.length}</p>
    </div>
    
    {/* Clientes con Crédito */}
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 shadow-xl border border-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-emerald-100 uppercase tracking-wide">Con Crédito</p>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-4xl font-bold text-white mt-2">
        {clients.filter(c => c.credito > 0).length}
      </p>
    </div>
    
    {/* Crédito Total */}
    <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-xl border border-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-orange-100 uppercase tracking-wide">Crédito Total</p>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-4xl font-bold text-white mt-2">${totalCredito.toFixed(2)}</p>
    </div>
  </div>
);

export default ClientStats;