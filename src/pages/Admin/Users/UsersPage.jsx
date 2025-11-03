import React, { useState } from 'react';
import UserHeader from './components/UserHeader';
import UserStats from './components/UserStats';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';
import EmptyState from './components/EmptyState';
import UserModal from './components/UserModal';

/**
 * Página principal para la gestión integral de usuarios del sistema
 * Proporciona operaciones CRUD completas para registros de usuarios
 * Caracteriza filtrado en tiempo real, formularios modales y visualización de datos
 * 
 * @componente
 * @returns {React.Element} Página de dashboard de gestión de usuarios
 */
const UsersPage = () => {
  // Gestión de estado para entidades de datos
  const [users, setUsers] = useState([]);
  
  // Estados de visibilidad de modal
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Estados de contexto de edición
  const [editingUser, setEditingUser] = useState(null);
  
  // Estados de filtro y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  
  // Gestión de estado del formulario
  const [userForm, setUserForm] = useState({
    id: '',
    nombre: '',
    apellidos: '',
    cc: '',
    telefono: '',
    clave: '',
    rol: '',
    username: '',
    password: '',
    informacion: ''
  });

  /**
   * Maneja el envío del formulario de usuario para operaciones de crear y actualizar
   * Incluye validación de campos requeridos antes de proceder
   */
  const handleUserSubmit = () => {
    if (!userForm.nombre || !userForm.username || !userForm.password || !userForm.rol) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? userForm : u));
    } else {
      setUsers([...users, { ...userForm, id: Date.now().toString() }]);
    }
    closeUserModal();
  };

  /**
   * Abre el modal de usuario en modo crear o editar
   * @param {Object|null} user - Objeto usuario para edición, null para creación
   */
  const openUserModal = (user = null) => {
    if (user) {
      setUserForm(user);
      setEditingUser(user);
    } else {
      setUserForm({
        id: '',
        nombre: '',
        apellidos: '',
        cc: '',
        telefono: '',
        clave: '',
        rol: '',
        username: '',
        password: '',
        informacion: ''
      });
      setEditingUser(null);
    }
    setShowUserModal(true);
  };

  /**
   * Cierra el modal de usuario y reinicia el contexto de edición
   */
  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({
      id: '',
      nombre: '',
      apellidos: '',
      cc: '',
      telefono: '',
      clave: '',
      rol: '',
      username: '',
      password: '',
      informacion: ''
    });
  };

  /**
   * Elimina usuario por ID con confirmación del usuario
   * @param {string} id - Identificador único del usuario a eliminar
   */
  const deleteUser = (id) => {
    if (window.confirm('¿Desea eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  /**
   * Filtra usuarios basado en término de búsqueda y selección de rol
   * @type {Array<Object>}
   */
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.rol === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Encabezado de Página */}
        <UserHeader openUserModal={openUserModal} />
        
        {/* Dashboard de Estadísticas */}
        <UserStats users={users} />
        
        {/* Controles de Búsqueda y Filtros */}
        <UserFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
        
        {/* Tabla de Datos de Usuarios */}
        {filteredUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <UserTable 
            filteredUsers={filteredUsers}
            openUserModal={openUserModal}
            deleteUser={deleteUser}
          />
        )}

        {/* Superposiciones Modales */}
        <UserModal 
          showUserModal={showUserModal}
          closeUserModal={closeUserModal}
          editingUser={editingUser}
          userForm={userForm}
          setUserForm={setUserForm}
          handleUserSubmit={handleUserSubmit}
        />
      </div>
    </div>
  );
};

export default UsersPage;