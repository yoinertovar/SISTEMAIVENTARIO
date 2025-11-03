import React, { useState } from 'react';
import WorkerSidebar from './WorkerSidebar';
import WorkerHeader from './WorkerHeader';

import WorkerDashboardPage from '../../../pages/Worker/Dashboard/WorkerDashboardPage';
import CashRegisterClosingPage from '../../../pages/Worker/CashRegister/CashRegisterClosingPage';
import ClientsPage from '../../../pages/Worker/Clients/ClientsPage';
import ReturnsPage from '../../../pages/Worker/Returns/ReturnsPage';

import SalesPage from '../../../pages/Shared/Sales/SalesPage';
import InvoicesPage from '../../../pages/Shared/Invoices/InvoicesPage';
import ExpensesPage from '../../../pages/Shared/Expenses/ExpensesPage';
import HistoryPage from '../../../pages/Shared/History/HistoryPage';

const WorkerMainLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <WorkerDashboardPage />;
      case 'ventas':
        return <SalesPage />;
      case 'facturas':
        return <InvoicesPage />;
      case 'gastos':
        return <ExpensesPage />;
      case 'historial':
        return <HistoryPage />;
      case 'caja':
        return <CashRegisterClosingPage />;
      case 'clientes':
        return <ClientsPage />;
      case 'devoluciones':
        return <ReturnsPage />;
      default:
        return <WorkerDashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden font-sans">
      <WorkerSidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <WorkerHeader setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 overflow-auto p-5 bg-gray-800 text-gray-100">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default WorkerMainLayout;
