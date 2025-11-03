import React from 'react';
import { TrendingUp, DollarSign, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

/**
 * Componente que muestra estadísticas y métricas de las facturas
 */
const InvoiceStats = ({ invoices }) => {
  
  /**
   * Calcula estadísticas de las facturas
   */
  const calculateStats = () => {
    const total = invoices.length;
    const pagadas = invoices.filter(inv => inv.estado === 'Pagada').length;
    const pendientes = invoices.filter(inv => inv.estado === 'Pendiente').length;
    const anuladas = invoices.filter(inv => inv.estado === 'Anulada').length;
    
    const totalVentas = invoices
      .filter(inv => inv.estado === 'Pagada')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);
    
    const ventasPendientes = invoices
      .filter(inv => inv.estado === 'Pendiente')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);
    
    return {
      total,
      pagadas,
      pendientes,
      anuladas,
      totalVentas,
      ventasPendientes
    };
  };

  const stats = calculateStats();

  /**
   * Formatea valores monetarios
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  /**
   * Calcula el porcentaje
   */
  const getPercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total de Facturas */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-xl border border-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <FileText size={28} className="text-white" />
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm font-medium">Total</p>
            <p className="text-white text-3xl font-bold">{stats.total}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-blue-100">
          <TrendingUp size={16} />
          <span className="text-sm">Facturas generadas</span>
        </div>
      </div>

      {/* Facturas Pagadas */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-xl border border-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <CheckCircle size={28} className="text-white" />
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm font-medium">Pagadas</p>
            <p className="text-white text-3xl font-bold">{stats.pagadas}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-emerald-100">
          <span className="text-sm">Completadas</span>
          <span className="text-sm font-semibold">{getPercentage(stats.pagadas, stats.total)}%</span>
        </div>
      </div>

      {/* Facturas Pendientes */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 rounded-xl shadow-xl border border-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Clock size={28} className="text-white" />
          </div>
          <div className="text-right">
            <p className="text-amber-100 text-sm font-medium">Pendientes</p>
            <p className="text-white text-3xl font-bold">{stats.pendientes}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-amber-100">
          <span className="text-sm">Por cobrar</span>
          <span className="text-sm font-semibold">{getPercentage(stats.pendientes, stats.total)}%</span>
        </div>
      </div>

      {/* Total de Ventas */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-xl border border-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <DollarSign size={28} className="text-white" />
          </div>
          <div className="text-right">
            <p className="text-purple-100 text-sm font-medium">Ventas</p>
            <p className="text-white text-2xl font-bold">{formatCurrency(stats.totalVentas)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-purple-100">
          <TrendingUp size={16} />
          <span className="text-sm">Total recaudado</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStats;
