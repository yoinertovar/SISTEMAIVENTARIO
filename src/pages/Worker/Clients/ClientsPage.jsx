import React, { useState } from 'react';
import { Users, Download, UserPlus } from 'lucide-react';
import { useClients } from './hooks/useClients';
import ClientStats from './components/ClientStats';
import ClientFilters from './components/ClientFilters';
import ClientTable from './components/ClientTable';
import AddClientModal from './components/modals/AddClientModal';
import EditClientModal from './components/modals/EditClientModal';
import DeleteClientModal from './components/modals/DeleteClientModal';

/**
 * Página principal de gestión de clientes
 * Coordina todos los componentes del sistema de gestión de clientes
 */
const ClientsPage = () => {
  // Hook personalizado para la gestión de clientes
  const {
    clients, 
    filteredClients, 
    selectedClient, 
    setSelectedClient,
    addClient, 
    editClient, 
    deleteClient,
    searchTerm, 
    setSearchTerm, 
    filterCredit, 
    setFilterCredit, 
    totalCredito
  } = useClients([]); // Estado inicial vacío

  // Estados para controlar la visibilidad de los modales
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /**
   * Exporta la lista de clientes filtrados a un archivo CSV
   */
  const exportToCSV = () => {
    // Verificar si hay clientes para exportar
    if (filteredClients.length === 0) {
      alert('No hay clientes para exportar');
      return;
    }

    const headers = ['Nombre', 'Correo', 'Dirección', 'Crédito'];
    const csvContent = [
      headers.join(','),
      ...filteredClients.map(client => 
        `"${client.nombre}","${client.correo}","${client.direccion}",${client.credito}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Estadísticas de clientes */}
        <ClientStats clients={clients} totalCredito={totalCredito} />

        {/* Contenedor principal de la tabla */}
        <div className="bg-[#1a1f2e] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Header de la página */}
          <div className="bg-[#1a1f2e] px-6 py-6 border-b border-gray-800 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-3 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
                <p className="text-gray-400 text-sm mt-1">Administra la información de tus clientes</p>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex gap-3">
              <button 
                onClick={exportToCSV} 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <Download className="w-5 h-5" /> 
                Exportar
              </button>
              <button 
                onClick={() => setShowAdd(true)} 
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
              >
                <UserPlus className="w-5 h-5" /> 
                Nuevo Cliente
              </button>
            </div>
          </div>

          {/* Filtros y tabla */}
          <ClientFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filterCredit={filterCredit} 
            setFilterCredit={setFilterCredit} 
          />
          <ClientTable 
            clients={filteredClients} 
            setSelectedClient={setSelectedClient} 
            setShowEdit={setShowEdit} 
            setShowDelete={setShowDelete} 
          />
        </div>

        {/* Modales */}
        {showAdd && (
          <AddClientModal 
            onClose={() => setShowAdd(false)} 
            onSave={addClient} 
          />
        )}
        
        {showEdit && selectedClient && (
          <EditClientModal 
            client={selectedClient} 
            onClose={() => setShowEdit(false)} 
            onSave={editClient} 
          />
        )}
        
        {showDelete && selectedClient && (
          <DeleteClientModal 
            client={selectedClient} 
            onClose={() => setShowDelete(false)} 
            onDelete={deleteClient} 
          />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;