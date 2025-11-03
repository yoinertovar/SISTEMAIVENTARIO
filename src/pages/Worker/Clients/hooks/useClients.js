import { useState, useMemo } from 'react';

/**
 * Hook personalizado para la gestión de clientes
 * Proporciona estado y operaciones CRUD para la gestión de clientes
 * 
 * @param {Array} initialClients - Lista inicial de clientes (opcional)
 * @returns {Object} Objeto con estado y funciones para gestionar clientes
 */
export const useClients = (initialClients = []) => {
  // Estado para la lista de clientes
  const [clients, setClients] = useState(initialClients);
  
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para el filtro de crédito
  const [filterCredit, setFilterCredit] = useState('todos');
  
  // Estado para el cliente seleccionado
  const [selectedClient, setSelectedClient] = useState(null);

  /**
   * Agrega un nuevo cliente a la lista
   * @param {Object} newClient - Nuevo cliente a agregar
   * @param {string} newClient.nombre - Nombre del cliente
   * @param {string} newClient.correo - Correo del cliente
   * @param {string} newClient.direccion - Dirección del cliente
   * @param {number} newClient.credito - Crédito del cliente
   */
  const addClient = (newClient) => {
    const clientWithId = {
      ...newClient,
      id: Date.now() // ID temporal (en producción usaría UUID o ID de base de datos)
    };
    setClients(prevClients => [...prevClients, clientWithId]);
  };

  /**
   * Edita un cliente existente
   * @param {Object} updatedClient - Cliente con los datos actualizados
   * @param {number} updatedClient.id - ID del cliente a editar
   */
  const editClient = (updatedClient) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  /**
   * Elimina un cliente de la lista
   * @param {number} id - ID del cliente a eliminar
   */
  const deleteClient = (id) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
  };

  /**
   * Filtra y busca clientes basado en el término de búsqueda y filtro de crédito
   * Utiliza useMemo para optimizar el rendimiento
   */
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Filtro por término de búsqueda
      const matchesSearch = 
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.direccion.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por estado de crédito
      const matchesFilter =
        filterCredit === 'todos' ||
        (filterCredit === 'con-credito' && client.credito > 0) ||
        (filterCredit === 'sin-credito' && client.credito === 0);

      return matchesSearch && matchesFilter;
    });
  }, [clients, searchTerm, filterCredit]);

  /**
   * Calcula el total de crédito otorgado a todos los clientes
   */
  const totalCredito = useMemo(() => 
    clients.reduce((sum, client) => sum + client.credito, 0),
    [clients]
  );

  // Retornar el estado y las funciones
  return {
    // Estado completo
    clients,
    
    // Estado filtrado
    filteredClients,
    
    // Cliente seleccionado
    selectedClient,
    setSelectedClient,
    
    // Operaciones CRUD
    addClient,
    editClient,
    deleteClient,
    
    // Búsqueda y filtros
    searchTerm,
    setSearchTerm,
    filterCredit,
    setFilterCredit,
    
    // Métricas
    totalCredito,
  };
};