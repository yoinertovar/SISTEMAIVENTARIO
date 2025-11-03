import React from 'react';
import { Trash2 } from 'lucide-react';

/**
 * Modal de confirmación para eliminar un cliente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.client - Cliente a eliminar
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onDelete - Función para eliminar el cliente
 */
const DeleteClientModal = ({ client, onClose, onDelete }) => {
  /**
   * Maneja la eliminación del cliente
   */
  const handleDelete = () => {
    onDelete(client.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden text-center p-8 border border-gray-800">
        
        {/* Icono de advertencia */}
        <div className="inline-flex p-4 bg-red-500/20 rounded-2xl mb-4">
          <Trash2 className="w-16 h-16 text-red-400" />
        </div>
        
        {/* Mensaje de confirmación */}
        <h2 className="text-2xl font-bold text-white mb-2">¿Eliminar Cliente?</h2>
        <p className="text-gray-400 mb-6">
          Estás a punto de eliminar a <span className="font-semibold text-white">{client.nombre}</span>.
        </p>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <button 
            onClick={handleDelete} 
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          >
            Eliminar
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl font-bold transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;