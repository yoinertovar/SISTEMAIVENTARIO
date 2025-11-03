import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WorkerMainLayout from '../components/layout/Worker/WorkerMainLayout';

// Páginas específicas del trabajador
import WorkerDashboardPage from '../pages/Worker/Dashboard/WorkerDashboardPage';
import CashRegisterClosingPage from '../pages/Worker/CashRegister/CashRegisterClosingPage';
import ClientsPage from '../pages/Worker/Clients/ClientsPage';
import ReturnsPage from '../pages/Worker/Returns/ReturnsPage';

// Páginas compartidas
import InventoryPage from '../pages/Shared/Inventory/InventoryPage';
import CreditsPage from '../pages/Shared/Credits/CreditsPage';
import InvoicesPage from '../pages/Shared/Invoices/InvoicesPage';
import ExpensesPage from '../pages/Shared/Expenses/ExpensesPage';

/**
 * Componente de Rutas del Trabajador
 * 
 * @returns {JSX.Element} Configuración de rutas para usuarios con rol 'worker'
 * 
 * @description
 * Define todas las rutas accesibles para trabajadores:
 * - Dashboard principal
 * - Gestión de inventario
 * - Control de créditos
 * - Facturación
 * - Gestión de gastos
 * - Cuadre de caja
 * - Administración de clientes
 * - Procesamiento de devoluciones
 */
const WorkerRoutes = () => {
  return (
    <WorkerMainLayout>
      <Routes>
        {/* Ruta principal del dashboard */}
        <Route path="dashboard" element={<WorkerDashboardPage />} />
        
        {/* Rutas de gestión */}
        <Route path="inventario" element={<InventoryPage />} />
        <Route path="credito" element={<CreditsPage />} />
        <Route path="facturas" element={<InvoicesPage />} />
        <Route path="gastos" element={<ExpensesPage />} />
        
        {/* Rutas operativas */}
        <Route path="cuadre-caja" element={<CashRegisterClosingPage />} />
        <Route path="clientes" element={<ClientsPage />} />
        <Route path="devoluciones" element={<ReturnsPage />} />
        
        {/* Ruta comodín - redirige al dashboard */}
        <Route path="*" element={<Navigate to="/worker/dashboard" replace />} />
      </Routes>
    </WorkerMainLayout>
  );
};

export default WorkerRoutes;