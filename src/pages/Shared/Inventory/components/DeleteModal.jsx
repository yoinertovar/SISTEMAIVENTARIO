import React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Modal de confirmación para eliminar productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.confirmDelete - Función para confirmar eliminación
 * @param {Function} props.setShowDeleteModal - Función para cerrar el modal
 * @param {string} props.productName - Nombre del producto a eliminar
 */
const DeleteModal = ({ confirmDelete, setShowDeleteModal, productName }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-label="Confirmar eliminación"
      onClick={(e) => {
        // Cerrar al hacer clic fuera del modal
        if (e.target === e.currentTarget) setShowDeleteModal(false);
      }}
    >
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-700 animate-scale-in">
        
        {/* Icono de advertencia */}
        <div className="mb-4 flex justify-center">
          <div 
            className="bg-gradient-to-br from-red-600 to-pink-600 p-4 rounded-full shadow-lg shadow-red-500/30 animate-pulse-slow"
            aria-hidden="true"
          >
            <AlertTriangle size={32} className="text-white" />
          </div>
        </div>

        {/* Contenido del mensaje */}
        <h3 className="text-2xl font-bold text-white mb-2">
          ⚠️ Confirmar Eliminación
        </h3>
        
        {productName && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
            <p className="text-sm text-slate-400 mb-1">Estás a punto de eliminar:</p>
            <p className="text-lg font-bold text-red-400">"{productName}"</p>
          </div>
        )}
        
        <p className="text-slate-400 mb-6">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={confirmDelete}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-red-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/30"
            aria-label="Confirmar eliminación"
          >
            🗑️ Sí, Eliminar
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
            aria-label="Cancelar eliminación"
          >
            ✖️ No, Cancelar
          </button>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DeleteModal;