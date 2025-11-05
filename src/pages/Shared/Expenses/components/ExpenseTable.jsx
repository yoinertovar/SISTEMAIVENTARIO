import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * Tabla de visualización de gastos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.expenses - Lista de gastos a mostrar
 * @param {Function} props.onEdit - Función para editar gasto
 * @param {Function} props.onDelete - Función para eliminar gasto
 */
const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  /**
   * Formatea números como pesos colombianos
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-600 to-orange-700">
            <tr>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                ID del Gasto
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Nombre del Gasto
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Descripción
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Categoría
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Fecha del Gasto
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Monto
              </th>
              <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Estado
              </th>
              <th className="text-center py-4 px-4 font-semibold text-white text-sm uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr 
                key={expense.id}
                className={`${
                  index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#0f1419]'
                } hover:bg-[#252b3b] transition-colors border-b border-gray-800`}
              >
                <td className="py-4 px-4 text-gray-300 font-medium">
                  {expense.id}
                </td>
                <td className="py-4 px-4 text-white font-semibold">
                  {expense.nombreGasto}
                </td>
                <td className="py-4 px-4 text-gray-400">
                  {expense.descripcion}
                </td>
                <td className="py-4 px-4 text-gray-400">
                  {expense.categoria}
                </td>
                <td className="py-4 px-4 text-gray-400">
                  {expense.fechaGasto}
                </td>
                <td className="py-4 px-4 text-orange-400 font-bold">
                  {formatearPesos(parseFloat(expense.monto))}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    expense.estadoPago === 'Pagado' 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {expense.estadoPago}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                      title="Editar gasto"
                      aria-label={`Editar gasto ${expense.nombreGasto}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                      title="Eliminar gasto"
                      aria-label={`Eliminar gasto ${expense.nombreGasto}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;