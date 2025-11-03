import React from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';

/**
 * Componente de tabla para mostrar la lista de clientes
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.clients - Lista de clientes a mostrar
 * @param {Function} props.setSelectedClient - Función para seleccionar cliente
 * @param {Function} props.setShowEdit - Función para mostrar modal de edición
 * @param {Function} props.setShowDelete - Función para mostrar modal de eliminación
 */
const ClientTable = ({ clients, setSelectedClient, setShowEdit, setShowDelete }) => {
  // Estado vacío - mostrar mensaje cuando no hay clientes
  if (clients.length === 0) {
    return (
      <div className="text-center py-16 bg-[#1a1f2e]">
        <div className="inline-flex p-6 bg-gray-800/50 rounded-2xl mb-6">
          <Users className="w-24 h-24 text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-2">No se encontraron clientes</h3>
        <p className="text-gray-500">Intenta con otros criterios de búsqueda o agrega uno nuevo.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1a1f2e] rounded-b-xl">
      <div className="overflow-x-auto border border-gray-800 rounded-xl shadow-xl">
        <table className="w-full">
          
          {/* Encabezado de la tabla */}
          <thead className="bg-gradient-to-r from-orange-600 to-orange-700">
            <tr>
              {['Nombre', 'Correo', 'Dirección', 'Crédito', 'Acciones'].map((header) => (
                <th key={header} className="py-4 px-6 text-left font-bold text-white text-sm uppercase tracking-wide">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Cuerpo de la tabla */}
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className={`border-t border-gray-800 hover:bg-[#252b3b] transition-colors ${
                  index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#0f1419]'
                }`}
              >
                {/* Nombre */}
                <td className="py-4 px-6 text-white font-semibold">{client.nombre}</td>
                
                {/* Correo */}
                <td className="py-4 px-6 text-gray-300">{client.correo}</td>
                
                {/* Dirección */}
                <td className="py-4 px-6 text-gray-300">{client.direccion}</td>
                
                {/* Crédito */}
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-semibold text-sm border ${
                      client.credito > 0
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}
                  >
                    ${client.credito.toFixed(2)}
                  </span>
                </td>
                
                {/* Acciones */}
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    {/* Botón Editar */}
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowEdit(true);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2.5 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                      title="Editar cliente"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    
                    {/* Botón Eliminar */}
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowDelete(true);
                      }}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-2.5 rounded-lg shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                      title="Eliminar cliente"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default ClientTable;