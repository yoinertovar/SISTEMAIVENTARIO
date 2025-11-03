import React from 'react';
import { Users, Plus } from 'lucide-react';

/**
 * Componente de encabezado para la página de gestión de usuarios
 * Proporciona título, descripción y acción principal de creación
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.openUserModal - Callback para abrir modal de nuevo usuario
 * @returns {React.Element} Encabezado de página de gestión de usuarios
 */
const UserHeader = ({ openUserModal }) => {
  return (
    <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl shadow-lg">
            <Users size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
            <p className="text-gray-400 text-sm">Administra usuarios y permisos</p>
          </div>
        </div>
        <button 
          onClick={() => openUserModal()}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/50 font-medium"
          aria-label="Agregar nuevo usuario"
        >
          <Plus size={20} />
          <span>Nuevo Usuario</span>
        </button>
      </div>
    </div>
  );
};

export default UserHeader;