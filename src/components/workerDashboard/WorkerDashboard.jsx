/**
 * WorkerDashboard - Dashboard Principal del Trabajador
 * 
 * Componente principal que muestra el panel de control del trabajador con:
 * - Tarjetas de acceso rápido a funcionalidades
 * - Resumen del cuadre de caja
 * - Métricas visuales del día
 * 
 * @component
 * 
 * @example
 * // Uso en las rutas del trabajador
 * <Route path="/worker/dashboard" element={<WorkerDashboard />} />
 */

import React from "react";
import WorkerDashboardCard from "./WorkerDashboardCard";
import CashRegisterSummary from "./CashRegisterSummary";

function WorkerDashboard() {
  return (
    <div className="worker-dashboard-container">
      {/* Título del dashboard */}
      <h2>Dashboard del Trabajador</h2>
      
      {/* Tarjeta de resumen de ventas del día */}
      <WorkerDashboardCard 
        title="Ventas del Día" 
        value="$1200" 
      />
      
      {/* Componente de resumen del cuadre de caja con métricas detalladas */}
      <CashRegisterSummary 
        totalSales={1200} 
        totalExpenses={50} 
      />
      
      {/* Espacio para otros componentes o lógica específica del dashboard del trabajador */}
    </div>
  );
}

export default WorkerDashboard;