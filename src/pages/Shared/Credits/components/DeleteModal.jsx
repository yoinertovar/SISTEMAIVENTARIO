import React from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Modal de confirmación para eliminación de registros
 * Proporciona una interfaz de confirmación con advertencia visual
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.confirmDelete - Función para confirmar la eliminación
 * @param {Function} props.setShowDeleteConfirm - Función para ocultar el modal
 * @param {Function} props.setCreditToDelete - Función para limpiar el crédito a eliminar
 * @returns {React.Element} Modal de confirmación de eliminación
 */
const DeleteModal = ({
  confirmDelete,
  setShowDeleteConfirm,
  setCreditToDelete,
}) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 text-center border border-slate-700">
      
      {/* Icono de Advertencia */}
      <div className="mb-4 flex justify-center">
        <div className="bg-gradient-to-br from-red-600 to-pink-600 p-4 rounded-full shadow-lg shadow-red-500/30">
          <AlertTriangle size={32} className="text-white" />
        </div>
      </div>

      {/* Contenido del Modal */}
      <h3 className="text-2xl font-bold text-white mb-2">Confirmar eliminación</h3>
      <p className="text-slate-400 mb-6">
        ¿Estás seguro de que deseas eliminar este crédito? Esta acción no se puede deshacer.
      </p>

      {/* Botones de Acción */}
      <div className="flex justify-center gap-3">
        <button
          onClick={confirmDelete}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-red-500/30 hover:scale-105"
        >
          Eliminar
        </button>
        <button
          onClick={() => {
            setShowDeleteConfirm(false);
            setCreditToDelete(null);
          }}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold hover:scale-105"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;