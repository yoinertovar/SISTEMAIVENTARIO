import { ROLES } from './constants';

// Definición de permisos
export const PERMISSIONS = {
  // Dashboard
  VIEW_ADMIN_DASHBOARD: [ROLES.ADMIN],
  VIEW_WORKER_DASHBOARD: [ROLES.WORKER],
  
  // Inventario
  VIEW_INVENTORY: [ROLES.ADMIN, ROLES.WORKER],
  EDIT_INVENTORY: [ROLES.ADMIN],
  DELETE_INVENTORY: [ROLES.ADMIN],
  
  // Créditos
  VIEW_CREDITS: [ROLES.ADMIN, ROLES.WORKER],
  CREATE_CREDIT: [ROLES.ADMIN, ROLES.WORKER],
  EDIT_CREDIT: [ROLES.ADMIN],
  DELETE_CREDIT: [ROLES.ADMIN],
  
  // Ventas
  VIEW_SALES: [ROLES.ADMIN],
  CREATE_SALE: [ROLES.ADMIN, ROLES.WORKER],
  
  // Facturas
  VIEW_INVOICES: [ROLES.ADMIN, ROLES.WORKER],
  CREATE_INVOICE: [ROLES.ADMIN, ROLES.WORKER],
  DELETE_INVOICE: [ROLES.ADMIN],
  
  // Gastos
  VIEW_EXPENSES: [ROLES.ADMIN, ROLES.WORKER],
  CREATE_EXPENSE: [ROLES.ADMIN, ROLES.WORKER],
  EDIT_EXPENSE: [ROLES.ADMIN],
  DELETE_EXPENSE: [ROLES.ADMIN],
  
  // Historial
  VIEW_HISTORY: [ROLES.ADMIN],
  
  // Usuarios
  MANAGE_USERS: [ROLES.ADMIN],
  
  // Proveedores
  MANAGE_SUPPLIERS: [ROLES.ADMIN],
  
  // Cuadre de Caja
  CASH_REGISTER: [ROLES.WORKER],
  
  // Clientes
  MANAGE_CLIENTS: [ROLES.WORKER],
  
  // Devoluciones
  MANAGE_RETURNS: [ROLES.WORKER],
};

// Función para verificar permisos
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  
  const allowedRoles = PERMISSIONS[permission];
  if (!allowedRoles) return false;
  
  return allowedRoles.includes(userRole);
};

// Función para verificar múltiples permisos (AND)
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Función para verificar múltiples permisos (OR)
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};