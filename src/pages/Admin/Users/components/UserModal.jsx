import React from 'react';
import { X } from 'lucide-react';

/**
 * Componente modal para operaciones de creación y edición de usuarios
 * Proporciona un formulario completo de gestión de usuarios con campos listos para validación
 * Soporta tanto modo crear como editar con renderizado condicional
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.showUserModal - Controla la visibilidad del modal
 * @param {Function} props.closeUserModal - Callback para cerrar el modal
 * @param {Object|null} props.editingUser - Objeto usuario cuando se edita, null para creación
 * @param {Object} props.userForm - Estado actual del formulario
 * @param {Function} props.setUserForm - Setter del estado del formulario
 * @param {Function} props.handleUserSubmit - Manejador de envío del formulario
 * @returns {React.Element} Interfaz modal de gestión de usuarios
 */
const UserModal = ({ 
  showUserModal, 
  closeUserModal, 
  editingUser, 
  userForm, 
  setUserForm, 
  handleUserSubmit 
}) => {
  if (!showUserModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        
        {/* Encabezado del Modal */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-5 rounded-t-xl flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold">
            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button 
            onClick={closeUserModal} 
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
            aria-label="Cerrar modal de usuario"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario de Usuario */}
        <div className="p-6 space-y-5">
          
          {/* Sección de Información Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Nombre
              </label>
              <input
                type="text"
                value={userForm.nombre}
                onChange={(e) => setUserForm({...userForm, nombre: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Apellidos
              </label>
              <input
                type="text"
                value={userForm.apellidos}
                onChange={(e) => setUserForm({...userForm, apellidos: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
                placeholder="Apellidos"
              />
            </div>
          </div>

          {/* Campo de Identificación */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              CC o Identificación
            </label>
            <input
              type="text"
              value={userForm.cc}
              onChange={(e) => setUserForm({...userForm, cc: e.target.value})}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="Número de identificación"
            />
          </div>

          {/* Información de Contacto */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              Teléfono
            </label>
            <input
              type="tel"
              value={userForm.telefono}
              onChange={(e) => setUserForm({...userForm, telefono: e.target.value})}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="Teléfono"
            />
          </div>

          {/* Selección de Rol */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              Rol - Seleccionar Privilegios
            </label>
            <select
              value={userForm.rol}
              onChange={(e) => setUserForm({...userForm, rol: e.target.value})}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
            </select>
          </div>

          {/* Sección de Credenciales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Usuario
              </label>
              <input
                type="text"
                value={userForm.username}
                onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Contraseña
              </label>
              <input
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder-gray-500"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {/* Información Adicional */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
              Información Detallada
            </label>
            <textarea
              value={userForm.informacion}
              onChange={(e) => setUserForm({...userForm, informacion: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all placeholder-gray-500"
              placeholder="Información adicional del usuario..."
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleUserSubmit}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
            >
              Guardar
            </button>
            <button
              onClick={closeUserModal}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;