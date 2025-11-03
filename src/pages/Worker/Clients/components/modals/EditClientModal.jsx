import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

/**
 * Modal para editar un cliente existente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.client - Cliente a editar
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSave - Función para guardar los cambios
 */
const EditClientModal = ({ client, onClose, onSave }) => {
  // Estado del formulario con datos del cliente
  const [form, setForm] = useState(client);

  /**
   * Maneja el guardado de los cambios del cliente
   */
  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-800">
        
        {/* Header del modal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Edit2 className="w-8 h-8" /> 
            Editar Cliente
          </h2>
          <p className="text-blue-100 mt-1">Modifica los datos del cliente</p>
        </div>

        {/* Formulario de edición */}
        <div className="p-8 space-y-5">
          {['nombre', 'correo', 'direccion', 'credito'].map((field) => (
            <div key={field}>
              <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                {field === 'nombre' ? 'Nombre' : 
                 field === 'correo' ? 'Correo' : 
                 field === 'direccion' ? 'Dirección' : 'Crédito'}
              </label>
              <input
                type={field === 'credito' ? 'number' : field === 'correo' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) =>
                  setForm({ 
                    ...form, 
                    [field]: field === 'credito' ? parseFloat(e.target.value) || 0 : e.target.value 
                  })
                }
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                step={field === 'credito' ? '0.01' : undefined}
                min={field === 'credito' ? '0' : undefined}
              />
            </div>
          ))}

          {/* Botones de acción */}
          <div className="flex gap-4 mt-8">
            <button 
              onClick={handleSave} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Guardar Cambios
            </button>
            <button 
              onClick={onClose} 
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-4 rounded-xl font-bold transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClientModal;