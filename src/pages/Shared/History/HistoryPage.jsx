import React, { useState } from 'react';

// Componentes de historial
import HistoryDashboard from './HistoryDashboard';
import SalesHistory from './SalesHistory';
import ExpensesHistory from './ExpensesHistory';
import CreditsHistory from './CreditsHistory';
import InvoicesHistory from './InvoicesHistory';
import AllMovementsHistory from './AllMovementsHistory';

/**
 * Página principal de gestión de historiales
 * 
 * Funcionalidades:
 * - Navegación entre diferentes tipos de historial
 * - Vista unificada de todos los movimientos del negocio
 * - Dashboard con estadísticas rápidas
 */
const HistoryPage = () => {
  const [historyView, setHistoryView] = useState('dashboard');

  /**
   * Renderiza la vista actual basada en el estado historyView
   * @returns {JSX.Element} Componente de la vista actual
   */
  const renderView = () => {
    switch(historyView) {
      case 'dashboard':
        return <HistoryDashboard setHistoryView={setHistoryView} />;
      case 'ventas':
        return <SalesHistory setHistoryView={setHistoryView} />;
      case 'gastos':
        return <ExpensesHistory setHistoryView={setHistoryView} />;
      case 'creditos':
        return <CreditsHistory setHistoryView={setHistoryView} />;
      case 'facturas':
        return <InvoicesHistory setHistoryView={setHistoryView} />;
      case 'movimientos':
        return <AllMovementsHistory setHistoryView={setHistoryView} />;
      case 'compras':
        return (
          <div 
            className="bg-[#1a1f2e] p-10 rounded-xl shadow-xl border border-gray-800 text-center"
            role="region"
            aria-label="Historial de Compras - Próximamente"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Historial de Compras</h2>
            <p className="text-gray-400 mb-6">Próximamente...</p>
            <button 
              onClick={() => setHistoryView('dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-300 shadow-lg font-medium"
              aria-label="Volver al dashboard principal"
            >
              Volver
            </button>
          </div>
        );
      default:
        return <HistoryDashboard setHistoryView={setHistoryView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      {renderView()}
    </div>
  );
};

export default HistoryPage;