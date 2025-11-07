import React from "react";
import { X, Calendar, DollarSign, FileText, CreditCard, ArrowLeft } from "lucide-react";

/**
 * Vista detallada de un cliente específico
 * Muestra todos los créditos y el historial de pagos del cliente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.clientData - Datos agregados del cliente
 * @param {Function} props.onClose - Callback para cerrar la vista
 * @param {Function} props.onPayment - Callback para abrir modal de pago
 */
const ClientDetailView = ({ clientData, onClose, onPayment }) => {
  if (!clientData) return null;

  // Obtener todos los pagos de todos los créditos del cliente
  const allPayments = clientData.credits.flatMap(credit => 
    (credit.payments || []).map(payment => ({
      ...payment,
      creditId: credit.id,
      creditDate: credit.date
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-6xl my-8 border border-slate-700">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-700 bg-gradient-to-r from-slate-700 to-slate-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all"
              >
                <ArrowLeft size={24} className="text-white" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {clientData.clientName} {clientData.clientLastName}
                </h2>
                <div className="flex gap-4 mt-1 text-sm text-slate-400">
                  <span>ID: {clientData.idNumber}</span>
                  <span>Tel: {clientData.phone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Resumen General */}
        <div className="px-6 py-6 bg-slate-700/30 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase mb-2">Total en Créditos</p>
              <p className="text-3xl font-bold text-white">
                ${clientData.totalCredit.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase mb-2">Total Abonado</p>
              <p className="text-3xl font-bold text-emerald-400">
                ${clientData.totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase mb-2">Saldo Pendiente</p>
              <p className="text-3xl font-bold text-red-400">
                ${(clientData.totalCredit - clientData.totalPaid).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase mb-2">Créditos Activos</p>
              <p className="text-3xl font-bold text-blue-400">
                {clientData.activeCredits}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
          
          {/* Créditos del Cliente */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Créditos Registrados
            </h3>
            <div className="space-y-3">
              {clientData.credits.map(credit => {
                const totalPaid = credit.payments 
                  ? credit.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0)
                  : 0;
                const remaining = parseFloat(credit.totalAmount) - totalPaid;
                const progress = (totalPaid / parseFloat(credit.totalAmount)) * 100;

                return (
                  <div
                    key={credit.id}
                    className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-semibold">
                          Crédito #{credit.id}
                        </p>
                        <p className="text-slate-400 text-sm">{credit.date}</p>
                      </div>
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
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Monto total:</span>
                        <span className="text-white font-bold">
                          ${parseFloat(credit.totalAmount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Abonado:</span>
                        <span className="text-emerald-400 font-bold">
                          ${totalPaid.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Pendiente:</span>
                        <span className="text-red-400 font-bold">
                          ${remaining.toLocaleString()}
                        </span>
                      </div>

                      {/* Barra de Progreso */}
                      <div className="pt-2">
                        <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1 text-right">
                          {progress.toFixed(1)}%
                        </p>
                      </div>

                      {/* Botón de Abonar */}
                      {credit.status !== 'pagado' && remaining > 0 && (
                        <button
                          onClick={() => onPayment(credit)}
                          className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all font-semibold text-sm"
                        >
                          Registrar Abono
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historial de Pagos */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Historial de Pagos
            </h3>
            
            {allPayments.length === 0 ? (
              <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600 text-center">
                <DollarSign size={48} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400">No hay pagos registrados</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allPayments.map(payment => (
                  <div
                    key={payment.id}
                    className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg">
                          <DollarSign size={20} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-emerald-400 font-bold text-lg">
                            ${parseFloat(payment.amount).toLocaleString()}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {payment.date} • {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                    {payment.notes && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <p className="text-slate-400 text-sm flex items-start gap-2">
                          <FileText size={14} className="mt-0.5 flex-shrink-0" />
                          <span>{payment.notes}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailView;