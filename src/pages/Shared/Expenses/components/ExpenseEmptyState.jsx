import React from 'react';
import { DollarSign } from 'lucide-react';

/**
 * Componente para estado vacío cuando no hay gastos
 * 
 * @returns {JSX.Element} Componente de estado vacío
 */
const ExpenseEmptyState = () => {
  return (
    <div className="bg-[#1a1f2e] p-10 rounded-xl shadow-xl border border-gray-800">
      <div className="text-center py-16">
        <div className="inline-flex p-6 bg-gray-800/50 rounded-2xl mb-6">
          <DollarSign size={72} className="text-gray-600" />
        </div>
        <p className="text-gray-300 text-xl font-semibold mb-2">
          No hay gastos registrados
        </p>
        <p className="text-gray-500 text-base">
          Comienza registrando un nuevo gasto
        </p>
      </div>
    </div>
  );
};

export default ExpenseEmptyState;