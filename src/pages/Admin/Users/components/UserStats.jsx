import React from 'react';
import { Users, UserCheck, Shield } from 'lucide-react';

/**
 * Componente de dashboard de estadísticas que muestra métricas de usuarios y distribución de roles
 * Proporciona una visión general visual de la base de usuarios con tarjetas gradientes e iconos
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.users - Array de objetos de usuario para cálculo de métricas
 * @returns {React.Element} Componente de dashboard de estadísticas de usuarios
 */
const UserStats = ({ users }) => {
  // Calcular métricas basadas en los datos de usuarios
  const activeUsers = users.length;
  const adminUsers = users.filter(u => u.rol === 'admin').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Tarjeta de Total de Usuarios */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-5 rounded-xl shadow-xl border border-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium mb-1">Total Usuarios</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Tarjeta de Usuarios Activos */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-5 rounded-xl shadow-xl border border-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Usuarios Activos</p>
            <p className="text-3xl font-bold text-white">{activeUsers}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <UserCheck className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Tarjeta de Administradores */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-xl shadow-xl border border-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Administradores</p>
            <p className="text-3xl font-bold text-white">{adminUsers}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Shield className="text-white" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;