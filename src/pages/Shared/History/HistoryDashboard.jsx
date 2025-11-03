import React from 'react';
import { ShoppingCart, DollarSign, CreditCard, TrendingUp, FileText, Package } from 'lucide-react';

/**
 * Componente de tarjeta para el dashboard de historial
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la tarjeta
 * @param {React.Component} props.icon - Componente de icono
 * @param {string} props.color - Color de la tarjeta
 * @param {Function} props.onClick - Manejador de clic
 * @param {string} props.description - Descripción de la tarjeta
 */
const HistoryCard = ({ title, icon: Icon, color, onClick, description }) => {
  // Mapeo de clases de color para Tailwind CSS
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-500/30 hover:shadow-blue-500/50',
    red: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-red-500/30 hover:shadow-red-500/50',
    green: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 border-emerald-500/30 hover:shadow-emerald-500/50',
    yellow: 'from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-amber-500/30 hover:shadow-amber-500/50',
    purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-purple-500/30 hover:shadow-purple-500/50',
    orange: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 border-orange-500/30 hover:shadow-orange-500/50',
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} text-white p-8 rounded-xl shadow-xl 
        transition-all duration-300 transform hover:scale-105
        flex flex-col items-center justify-center space-y-4 min-h-[220px]
        border focus:outline-none focus:ring-4 focus:ring-white/30`}
      aria-label={`Ver ${title.toLowerCase()}`}
    >
      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
        <Icon size={56} className="opacity-90" aria-hidden="true" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </button>
  );
};

/**
 * Dashboard principal de selección de historiales
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.setHistoryView - Función para cambiar la vista
 * @param {Object} props.statsData - Datos de estadísticas (opcional)
 */
const HistoryDashboard = ({ setHistoryView, statsData = {} }) => {
  // Configuración de tipos de historial disponibles
  const historyTypes = [
    {
      id: 'ventas',
      title: 'HISTORIAL DE VENTAS',
      icon: ShoppingCart,
      color: 'blue',
      description: 'Ver todas las ventas realizadas'
    },
    {
      id: 'gastos',
      title: 'HISTORIAL DE GASTOS',
      icon: DollarSign,
      color: 'red',
      description: 'Ver todos los gastos registrados'
    },
    {
      id: 'creditos',
      title: 'HISTORIAL DE CRÉDITOS',
      icon: CreditCard,
      color: 'yellow',
      description: 'Ver créditos otorgados y pagos'
    },
    {
      id: 'compras',
      title: 'HISTORIAL DE COMPRAS',
      icon: Package,
      color: 'green',
      description: 'Ver compras a proveedores'
    },
    {
      id: 'facturas',
      title: 'HISTORIAL DE FACTURAS',
      icon: FileText,
      color: 'purple',
      description: 'Ver facturas generadas'
    },
    {
      id: 'movimientos',
      title: 'TODOS LOS MOVIMIENTOS',
      icon: TrendingUp,
      color: 'orange',
      description: 'Ver todos los movimientos'
    },
  ];

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

  // Datos de estadísticas con valores por defecto
  const {
    totalVentasHoy = 0,
    gastosDelMes = 0,
    creditosPendientes = 0,
    movimientosHoy = 0
  } = statsData;

  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <header 
        className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-8 rounded-xl shadow-2xl text-center border border-gray-700"
        role="banner"
      >
        <h1 className="text-4xl font-bold text-white mb-3">HISTORIAL</h1>
        <p className="text-gray-300 text-lg">Selecciona el tipo de historial que deseas consultar</p>
      </header>

      {/* Grid de Tarjetas de Historial */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="navigation"
        aria-label="Tipos de historial disponibles"
      >
        {historyTypes.map((type) => (
          <HistoryCard
            key={type.id}
            title={type.title}
            icon={type.icon}
            color={type.color}
            description={type.description}
            onClick={() => setHistoryView(type.id)}
          />
        ))}
      </section>

      {/* Estadísticas Rápidas */}
      <section 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
        aria-label="Estadísticas rápidas"
      >
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Total Ventas Hoy</p>
          <p className="text-3xl font-bold text-blue-400">
            {formatCurrency(totalVentasHoy)}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Gastos del Mes</p>
          <p className="text-3xl font-bold text-red-400">
            {formatCurrency(gastosDelMes)}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Créditos Pendientes</p>
          <p className="text-3xl font-bold text-amber-400">
            {formatCurrency(creditosPendientes)}
          </p>
        </div>
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Movimientos Hoy</p>
          <p className="text-3xl font-bold text-emerald-400">
            {movimientosHoy}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HistoryDashboard;