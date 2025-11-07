import React from "react";
import { CreditCard, User, Edit2, Trash2, DollarSign } from "lucide-react";

/**
 * Componente de tabla para mostrar registros de créditos
 * Proporciona visualización de datos con acciones de edición, eliminación y abono
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.credits - Lista de créditos a mostrar
 * @param {Function} props.onEdit - Callback para editar un crédito
 * @param {Function} props.onDelete - Callback para eliminar un crédito
 * @param {Function} props.onPayment - Callback para registrar un abono
 * @returns {React.Element} Tabla de créditos con acciones
 */
const CreditsTable = ({ credits, onEdit, onDelete, onPayment }) => {
  
  // Estado Vacío - Sin Créditos Registrados
  if (credits.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-16 border border-slate-700 text-center shadow-xl">
        <CreditCard size={64} className="mx-auto text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No hay créditos registrados</h3>
        <p className="text-slate-400">Comienza registrando un nuevo crédito</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          
          {/* Encabezado de la Tabla */}
          <thead className="bg-slate-700/50 border-b border-slate-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Identificación</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Monto Total</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Abonado</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Saldo</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          
          {/* Cuerpo de la Tabla */}
          <tbody className="divide-y divide-slate-700">
            {credits.map((credit) => {
              // Calcular totales de pagos
              const totalAmount = parseFloat(credit.totalAmount) || 0;
              const totalPaid = credit.payments 
                ? credit.payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
                : 0;
              const remainingBalance = totalAmount - totalPaid;
              const paymentProgress = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;

              return (
                <tr
                  key={credit.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  
                  {/* Información del Cliente */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {credit.clientName} {credit.clientLastName}
                      </div>
                    </div>
                  </td>
                  
                  {/* Número de Identificación */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-mono">
                    {credit.idNumber}
                  </td>
                  
                  {/* Teléfono */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {credit.phone}
                  </td>
                  
                  {/* Monto Total del Crédito */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-white">
                      ${totalAmount.toLocaleString()}
                    </div>
                  </td>

                  {/* Total Abonado */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-emerald-400">
                      ${totalPaid.toLocaleString()}
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(paymentProgress, 100)}%` }}
                      />
                    </div>
                  </td>

                  {/* Saldo Pendiente */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${remainingBalance > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      ${remainingBalance.toLocaleString()}
                    </div>
                  </td>
                  
                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {credit.date}
                  </td>
                  
                  {/* Estado del Crédito */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        credit.status === "activo"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : credit.status === "pagado"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}
                    </span>
                  </td>
                  
                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {/* Botón de Abonar */}
                      {remainingBalance > 0 && credit.status !== 'pagado' && (
                        <button
                          onClick={() => onPayment(credit)}
                          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all hover:scale-110"
                          title="Registrar Abono"
                        >
                          <DollarSign size={16} />
                        </button>
                      )}
                      
                      {/* Botón de Editar */}
                      <button
                        onClick={() => onEdit(credit)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-110"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      
                      {/* Botón de Eliminar */}
                      <button
                        onClick={() => onDelete(credit)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all hover:scale-110"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditsTable;