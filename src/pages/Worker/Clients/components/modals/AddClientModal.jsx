import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

/**
 * Modal para agregar un nuevo cliente
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSave - Función para guardar el nuevo cliente
 */
const AddClientModal = ({ onClose, onSave }) => {
  // Estado del formulario
  const [form, setForm] = useState({ 
    nombre: '', 
    correo: '', 
    direccion: '', 
    credito: 0 
  });

  /**
   * Maneja el guardado del nuevo cliente
   * Valida que los campos obligatorios estén completos
   */
  const handleSave = () => {
    if (form.nombre && form.correo && form.direccion) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-800">
        
        {/* Header del modal */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <UserPlus className="w-8 h-8" /> 
            Agregar Nuevo Cliente
          </h2>
          <p className="text-orange-100 mt-1">Ingresa los datos del cliente</p>
        </div>

        {/* Formulario */}
        <div className="p-8 space-y-5">
          {[
            { field: 'nombre', label: 'Nombre Completo', type: 'text' },
            { field: 'correo', label: 'Correo Electrónico', type: 'email' },
            { field: 'direccion', label: 'Dirección', type: 'text' }
          ].map(({ field, label, type }) => (
            <div key={field}>
              <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                {label}
              </label>
              <input
                type={type}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500"
                placeholder={`Ingrese ${label.toLowerCase()}`}
              />
            </div>
          ))}

          {/* Campo de crédito */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
              Crédito Inicial
            </label>
            <input
              type="number"
              value={form.credito}
              onChange={(e) => setForm({ ...form, credito: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500"
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 mt-8">
            <button 
              onClick={handleSave} 
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            >
              Guardar Cliente
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

export default AddClientModal;