import React, { useState } from "react";
import { X, DollarSign, Calendar, FileText } from "lucide-react";

/**
 * Modal para registrar abonos/pagos a créditos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.credit - Crédito al que se hará el abono
 * @param {Function} props.onPayment - Callback para procesar el pago
 * @param {Function} props.onClose - Callback para cerrar el modal
 */
const PaymentModal = ({ credit, onPayment, onClose }) => {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    paymentMethod: "efectivo"
  });

  // Calcular valores del crédito
  const totalCredit = parseFloat(credit.totalAmount) || 0;
  const totalPaid = credit.payments 
    ? credit.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0) 
    : 0;
  const remainingBalance = totalCredit - totalPaid;

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const amount = parseFloat(paymentData.amount);
    
    // Validaciones
    if (!amount || amount <= 0) {
      alert("Por favor ingrese un monto válido");
      return;
    }

    if (amount > remainingBalance) {
      alert(`El monto no puede ser mayor al saldo pendiente ($${remainingBalance.toLocaleString()})`);
      return;
    }

    // Crear objeto de pago
    const payment = {
      id: Date.now(),
      amount: amount,
      date: paymentData.date,
      notes: paymentData.notes,
      paymentMethod: paymentData.paymentMethod,
      timestamp: new Date().toISOString()
    };

    onPayment(payment);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-700">
        
        {/* Header del Modal */}
        <div className="px-6 py-5 border-b border-slate-700 bg-gradient-to-r from-emerald-700 to-teal-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Registrar Abono</h2>
              <p className="text-emerald-200 text-sm mt-1">
                {credit.clientName} {credit.clientLastName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Resumen del Crédito */}
        <div className="px-6 py-5 bg-slate-700/30 border-b border-slate-700">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Total Crédito</p>
              <p className="text-2xl font-bold text-white">
                ${totalCredit.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Total Abonado</p>
              <p className="text-2xl font-bold text-emerald-400">
                ${totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase mb-1">Saldo Pendiente</p>
              <p className="text-2xl font-bold text-red-400">
                ${remainingBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="p-6 space-y-4">
          
          {/* Monto del Abono */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-slate-300 mb-2">
              Monto del Abono *
            </label>
            <div className="relative">
              <DollarSign 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" 
                size={20} 
              />
              <input
                type="number"
                id="amount"
                name="amount"
                value={paymentData.amount}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0.00"
                required
                min="0"
                max={remainingBalance}
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Fecha del Pago */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-slate-300 mb-2">
                Fecha del Pago *
              </label>
              <div className="relative">
                <Calendar 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" 
                  size={20} 
                />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={paymentData.date}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Método de Pago */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-semibold text-slate-300 mb-2">
                Método de Pago *
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="cheque">Cheque</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-slate-300 mb-2">
              Notas / Comentarios
            </label>
            <div className="relative">
              <FileText 
                className="absolute left-4 top-4 text-slate-400" 
                size={20} 
              />
              <textarea
                id="notes"
                name="notes"
                value={paymentData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                placeholder="Información adicional sobre el pago..."
              />
            </div>
          </div>

          {/* Botones acceso rápido */}
          <div className="flex gap-2 flex-wrap">
            <p className="text-sm text-slate-400 w-full mb-1">Montos rápidos:</p>
            {[10000, 20000, 50000, 100000].map(amount => (
              <button
                key={amount}
                onClick={() => setPaymentData({...paymentData, amount: amount.toString()})}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-sm font-semibold"
              >
                ${amount.toLocaleString()}
              </button>
            ))}
            <button
              onClick={() => setPaymentData({...paymentData, amount: remainingBalance.toString()})}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all text-sm font-semibold"
            >
              Pago Total (${remainingBalance.toLocaleString()})
            </button>
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-4 bg-slate-700/50 border-t border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-emerald-500/30 hover:scale-105"
          >
            Registrar Abono
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;