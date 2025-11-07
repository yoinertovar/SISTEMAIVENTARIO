import React from "react";
import { User, TrendingUp, DollarSign, AlertCircle } from "lucide-react";

/**
 * Componente de vista de estadísticas por cliente
 * Muestra resumen agrupado de créditos por cliente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.credits - Lista de todos los créditos
 * @param {Function} props.onSelectClient - Callback cuando se selecciona un cliente
 */
const ClientStatsView = ({ credits, onSelectClient }) => {
  
  // Agrupar créditos por cliente usando clave compuesta
  const clientStats = credits.reduce((acc, credit) => {
    // Usar combinación de nombre + apellido + ID para identificar únicamente a cada cliente
    const clientKey = `${credit.clientName}_${credit.clientLastName}_${credit.idNumber}`.toLowerCase();
    
    if (!acc[clientKey]) {
      acc[clientKey] = {
        clientName: credit.clientName,
        clientLastName: credit.clientLastName,
        idNumber: credit.idNumber,
        phone: credit.phone,
        totalCredit: 0,
        totalPaid: 0,
        activeCredits: 0,
        credits: []
      };
    }
    
    const creditAmount = parseFloat(credit.totalAmount) || 0;
    
    // Asegurar que payments sea un array
    const payments = Array.isArray(credit.payments) ? credit.payments : [];
    const paidAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    
    acc[clientKey].totalCredit += creditAmount;
    acc[clientKey].totalPaid += paidAmount;
    acc[clientKey].credits.push(credit);
    
    if (credit.status === 'activo' || credit.status === 'vencido') {
      acc[clientKey].activeCredits++;
    }
    
    return acc;
  }, {});

  const clientsArray = Object.values(clientStats);

  if (clientsArray.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-16 border border-slate-700 text-center shadow-xl">
        <User size={64} className="mx-auto text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No hay clientes con créditos</h3>
        <p className="text-slate-400">Comienza registrando créditos para ver las estadísticas por cliente</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Resumen por Cliente</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientsArray.map((client) => {
          const remainingBalance = client.totalCredit - client.totalPaid;
          const paymentProgress = (client.totalPaid / client.totalCredit) * 100;
          
          return (
            <div
              key={client.idNumber}
              onClick={() => onSelectClient(client)}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-red-500/50 transition-all cursor-pointer group"
            >
              {/* Header del Cliente */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {client.clientName} {client.clientLastName}
                    </h4>
                    <p className="text-sm text-slate-400 font-mono">{client.idNumber}</p>
                  </div>
                </div>
                {client.activeCredits > 0 && (
                  <div className="bg-red-500/20 px-2 py-1 rounded-full">
                    <span className="text-red-400 text-xs font-bold">
                      {client.activeCredits} activo{client.activeCredits > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Estadísticas */}
              <div className="space-y-3">
                {/* Total Crédito */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <TrendingUp size={16} />
                    Total Crédito
                  </span>
                  <span className="text-white font-bold">
                    ${client.totalCredit.toLocaleString()}
                  </span>
                </div>

                {/* Total Abonado */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <DollarSign size={16} />
                    Total Abonado
                  </span>
                  <span className="text-emerald-400 font-bold">
                    ${client.totalPaid.toLocaleString()}
                  </span>
                </div>

                {/* Saldo Pendiente */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    Saldo Pendiente
                  </span>
                  <span className="text-red-400 font-bold">
                    ${remainingBalance.toLocaleString()}
                  </span>
                </div>

                {/* Barra de Progreso */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progreso de pago</span>
                    <span>{paymentProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(paymentProgress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-400 text-center">
                  {client.credits.length} crédito{client.credits.length > 1 ? 's' : ''} registrado{client.credits.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientStatsView;