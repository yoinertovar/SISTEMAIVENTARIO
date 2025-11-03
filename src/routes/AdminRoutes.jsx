import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminMainLayout from '../components/layout/Admin/AdminMainLayout';

// Páginas específicas del administrador
import AdminDashboardPage from '../pages/Admin/Dashboard/AdminDashboardPage';
import UsersPage from '../pages/Admin/Users/UsersPage';
import SuppliersPage from '../pages/Admin/Suppliers/SuppliersPage';

// Páginas compartidas
import SalesPage from '../pages/Shared/Sales/SalesPage';
import HistoryPage from '../pages/Shared/History/HistoryPage';
import InventoryPage from '../pages/Shared/Inventory/InventoryPage';
import CreditsPage from '../pages/Shared/Credits/CreditsPage';
import InvoicesPage from '../pages/Shared/Invoices/InvoicesPage';
import ExpensesPage from '../pages/Shared/Expenses/ExpensesPage';

/**
 * Componente de Rutas del Administrador
 * 
 * @returns {JSX.Element} Configuración de rutas para usuarios con rol 'admin'
 * 
 * @description
 * Define todas las rutas accesibles para administradores:
 * - Dashboard administrativo
 * - Gestión completa del sistema
 * - Administración de usuarios y proveedores
 * - Reportes y historiales
 * - Funcionalidades compartidas con workers
 */
const AdminRoutes = () => {
  return (
    <AdminMainLayout>
      <Routes>
        {/* Ruta principal del dashboard */}
        <Route path="dashboard" element={<AdminDashboardPage />} />
        
        {/* Rutas de gestión del negocio */}
        <Route path="inventario" element={<InventoryPage />} />
        <Route path="credito" element={<CreditsPage />} />
        <Route path="ventas" element={<SalesPage />} />
        <Route path="facturas" element={<InvoicesPage />} />
        <Route path="gastos" element={<ExpensesPage />} />
        
        {/* Rutas administrativas */}
        <Route path="historial" element={<HistoryPage />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="proveedores" element={<SuppliersPage />} />
        
        {/* Ruta comodín - redirige al dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminMainLayout>
  );
};

export default AdminRoutes;