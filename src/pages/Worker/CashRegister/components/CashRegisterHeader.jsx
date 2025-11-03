import React from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de cabecera para el cuadre de caja
 * Muestra información del turno y fecha actual
 */
const CashRegisterHeader = () => {
  const navigate = useNavigate();

  /**
   * Formatea la fecha actual en español
   */
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  /**
   * Maneja el retroceso a la página anterior
   */
  const handleGoBack = () => {
    navigate(-1); // Retrocede a la página anterior en el historial
  };

  return (
    <div className="bg-gradient-to-r from-[#1a1f2e] to-[#0f1419] p-6 rounded-xl shadow-xl border border-gray-800">
      <div className="flex items-center justify-between">
        
        {/* Lado izquierdo - Botón retroceso e información */}
        <div className="flex items-center space-x-4">
          {/* Botón de retroceso */}
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/50"
            aria-label="Volver atrás"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Icono e información principal */}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg shadow-lg">
              <Calculator size={40} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CUADRE DE CAJA</h1>
              <p className="text-gray-400 mt-1">Fecha: {currentDate}</p>
            </div>
          </div>
        </div>
        
        {/* Lado derecho - Información del turno */}
        <div className="text-right">
          <p className="text-sm text-gray-400">Turno Actual</p>
          <p className="text-2xl font-bold text-white">08:00 - 20:00</p>
          <div className="flex items-center justify-end space-x-2 mt-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-400 font-medium">Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashRegisterHeader;