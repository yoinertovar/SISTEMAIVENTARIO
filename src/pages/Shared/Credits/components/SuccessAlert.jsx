import React from "react";
import { CheckCircle } from "lucide-react";

/**
 * Componente de alerta de éxito para operaciones completadas
 * Proporciona retroalimentación visual positiva al usuario
 * 
 * @componente
 * @returns {React.Element} Alerta de éxito con icono y mensaje
 */
const SuccessAlert = () => (
  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500 text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg shadow-emerald-500/30 animate-fade-in">
    
    {/* Icono de Confirmación */}
    <div className="bg-white/20 p-2 rounded-lg">
      <CheckCircle size={24} />
    </div>
    
    {/* Mensaje de Éxito */}
    <div>
      <p className="font-bold text-lg">¡Éxito!</p>
      <p className="text-sm text-emerald-100">Este crédito fue creado correctamente</p>
    </div>
  </div>
);

export default SuccessAlert;