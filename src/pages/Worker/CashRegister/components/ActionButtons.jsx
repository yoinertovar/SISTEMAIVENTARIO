import React from 'react';
import { Save, Printer } from 'lucide-react';

/**
 * Componente de botones de acción para el cuadre de caja
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSave - Función para guardar el cuadre
 * @param {Function} props.onPrint - Función para imprimir el reporte
 */
const ActionButtons = ({ onSave, onPrint }) => {
  return (
    <div className="space-y-3">
      
      {/* Botón Guardar */}
      <button
        type="submit"
        onClick={onSave}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
      >
        <Save size={24} />
        <span>Guardar Cuadre</span>
      </button>
      
      {/* Botón Imprimir */}
      <button
        type="button"
        onClick={onPrint}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
      >
        <Printer size={24} />
        <span>Imprimir Reporte</span>
      </button>
    </div>
  );
};

export default ActionButtons;