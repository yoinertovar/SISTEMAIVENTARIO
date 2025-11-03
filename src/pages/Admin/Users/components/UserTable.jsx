import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * Componente de tabla para mostrar registros de usuarios con acciones de gestión
 * Caracteriza estilos basados en roles y enmascaramiento seguro de contraseñas
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.filteredUsers - Array de usuarios pre-filtrados para mostrar
 * @param {Function} props.openUserModal - Callback para abrir modal de edición de usuario
 * @param {Function} props.deleteUser - Callback para manejar eliminación de usuario
 * @returns {React.Element} Tabla de datos de usuarios con controles de acción
 */
const UserTable = ({ filteredUsers, openUserModal, deleteUser }) => {
  return (
    <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-amber-600 to-amber-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Contraseña</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Rol</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Opciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.map((user, index) => (
              <tr 
                key={user.id} 
                className={`${
                  index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#0f1419]'
                } hover:bg-[#252b3b] transition-colors`}
              >
                <td className="px-6 py-4 text-sm font-semibold text-white">
                  {user.nombre} {user.apellidos}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-400">••••••••</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    user.rol === 'admin' 
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                      : user.rol === 'vendedor'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  }`}>
                    {user.rol}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openUserModal(user)}
                      className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                      aria-label={`Editar usuario ${user.nombre}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                      aria-label={`Eliminar usuario ${user.nombre}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;