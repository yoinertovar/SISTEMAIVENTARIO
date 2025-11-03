import React from 'react';
import SalesHeader from './components/SalesHeader';
import SalesSearch from './components/SalesSearch';
import SalesStats from './components/SalesStats';
import SalesCharts from './components/SalesCharts';
import RecentSales from './components/RecentSales';

/**
 * Página principal de gestión de ventas
 * Coordina todos los componentes del dashboard de ventas
 */
const SalesPage = ({ 
  dailyData = [], 
  monthlyData = [], 
  yearlyData = [], 
  salesData = [], 
  statsData = {} 
}) => {
  /**
   * Formatea números en formato colombiano
   * @param {number} value - Valor a formatear
   * @returns {string} Valor formateado en pesos colombianos
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  // Usar datos proporcionados o valores por defecto
  const dailySalesData = dailyData || [];
  const monthlySalesData = monthlyData || [];
  const yearlySalesData = yearlyData || [];
  const recentSales = salesData || [];
  
  // Datos de estadísticas con valores por defecto
  const salesStats = {
    ventasHoy: 0,
    ventasMes: 0,
    totalTransacciones: 0,
    ticketPromedio: 0,
    ...statsData
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabecera de la página */}
        <SalesHeader />
        
        {/* Barra de búsqueda */}
        <SalesSearch />
        
        {/* Layout principal: Gráficos y Ventas Recientes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sección de gráficos (2/3 del ancho en pantallas grandes) */}
          <div className="lg:col-span-2 space-y-6">
            <SalesCharts 
              dailyData={dailySalesData}
              monthlyData={monthlySalesData}
              yearlyData={yearlySalesData}
              formatCurrency={formatCurrency}
            />
          </div>

          {/* Sección de ventas recientes (1/3 del ancho en pantallas grandes) */}
          <div className="lg:col-span-1">
            <RecentSales 
              sales={recentSales}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>

        {/* Estadísticas generales */}
        <SalesStats 
          statsData={salesStats}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default SalesPage;