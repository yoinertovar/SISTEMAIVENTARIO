export const APP_NAME = 'Sistema de Inventario';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Roles
export const ROLES = {
  ADMIN: 'admin',
  WORKER: 'worker'
};

// Rutas
export const ROUTES = {
  // Auth
  LOGIN: '/login',
  
  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/usuarios',
  ADMIN_SUPPLIERS: '/admin/proveedores',
  ADMIN_SALES: '/admin/ventas',
  ADMIN_HISTORY: '/admin/historial',
  
  // Worker
  WORKER_DASHBOARD: '/worker/dashboard',
  WORKER_CASH_REGISTER: '/worker/cuadre-caja',
  WORKER_CLIENTS: '/worker/clientes',
  WORKER_RETURNS: '/worker/devoluciones',
  
  // Shared
  INVENTORY: '/inventario',
  CREDITS: '/credito',
  INVOICES: '/facturas',
  EXPENSES: '/gastos',
};

// Colores para tarjetas
export const COLORS = {
  blue: 'bg-blue-300 hover:bg-blue-400',
  red: 'bg-red-300 hover:bg-red-400',
  yellow: 'bg-yellow-200 hover:bg-yellow-300',
  purple: 'bg-purple-300 hover:bg-purple-400',
  green: 'bg-green-300 hover:bg-green-400',
  orange: 'bg-orange-300 hover:bg-orange-400',
  cyan: 'bg-cyan-300 hover:bg-cyan-400',
};

// Sidebar items por rol
export const SIDEBAR_ITEMS = {
  admin: [
    { id: 'inicio', label: 'INICIO', path: ROUTES.ADMIN_DASHBOARD },
    { id: 'inventario', label: 'INVENTARIO', path: ROUTES.INVENTORY },
    { id: 'credito', label: 'CREDITO', path: ROUTES.CREDITS },
    { id: 'ventas', label: 'VENTAS', path: ROUTES.ADMIN_SALES },
    { id: 'facturas', label: 'FACTURAS', path: ROUTES.INVOICES },
    { id: 'gastos', label: 'GASTOS', path: ROUTES.EXPENSES },
    { id: 'historial', label: 'HISTORIAL', path: ROUTES.ADMIN_HISTORY },
  ],
  worker: [
    { id: 'inicio', label: 'INICIO', path: ROUTES.WORKER_DASHBOARD },
    { id: 'inventario', label: 'INVENTARIO', path: ROUTES.INVENTORY },
    { id: 'credito', label: 'CREDITO', path: ROUTES.CREDITS },
    { id: 'facturas', label: 'FACTURAS', path: ROUTES.INVOICES },
    { id: 'gastos', label: 'GASTOS', path: ROUTES.EXPENSES },
  ]
};