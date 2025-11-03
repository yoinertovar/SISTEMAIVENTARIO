/**
 * CashRegisterSummary - Resumen del Cuadre de Caja
 * 
 * Componente visual que muestra el resumen completo del cuadre de caja con:
 * - Header con título, ícono y botón de acceso rápido
 * - 4 tarjetas de métricas principales con gradientes únicos:
 *   • Total Ventas (verde-teal): Muestra ingresos totales
 *   • Total Gastos (rojo-rosa): Muestra egresos totales
 *   • Efectivo (azul-cyan): Muestra dinero en efectivo
 *   • Balance (morado-fucsia): Muestra balance final
 * - Footer con última actualización y botón de acción
 * - Efectos de brillo animados en hover
 * - Íconos decorativos en cada tarjeta
 * - Integración con react-router para navegación
 * 
 * @component
 * 
 * @example
 * // Uso básico sin props (mostrará ceros hasta recibir datos)
 * <CashRegisterSummary />
 * 
 * @example
 * // Con datos personalizados
 * <CashRegisterSummary 
 *   totalVentas={2850000}
 *   totalGastos={450000}
 *   efectivo={1800000}
 *   balance={2400000}
 *   ultimoCuadre="2024-01-15 08:00 AM"
 * />
 */

import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Clock, ChevronRight, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CashRegisterSummary = ({ 
  totalVentas = 0, 
  totalGastos = 0, 
  efectivo = 0, 
  balance = 0, 
  ultimoCuadre = 'No disponible' 
}) => {
  const navigate = useNavigate();

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
    }).format(value);
  };

  /**
   * Calcula el porcentaje de efectivo sobre el total de ventas
   * @returns {number} Porcentaje de efectivo
   */
  const calcularPorcentajeEfectivo = () => {
    if (totalVentas === 0) return 0;
    return Math.round((efectivo / totalVentas) * 100);
  };

  /**
   * Determina el estado del flujo de caja
   * @returns {string} Estado del flujo
   */
  const obtenerEstadoFlujo = () => {
    if (balance > 0) return 'Flujo positivo';
    if (balance < 0) return 'Flujo negativo';
    return 'Balance neutro';
  };

  /**
   * Determina el ícono de tendencia según el balance
   * @returns {React.Element} Componente de ícono
   */
  const obtenerIconoTendencia = () => {
    if (balance > 0) return <TrendingUp size={14} />;
    if (balance < 0) return <TrendingDown size={14} />;
    return <DollarSign size={14} />;
  };

  return (
    // Contenedor principal con gradiente oscuro y efectos de brillo
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
      {/* Efectos de brillo decorativos en el fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Header con título, ícono y botón de acción */}
      <div className="relative z-10 bg-gradient-to-r from-slate-700 to-slate-800 p-8 border-b border-slate-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Sección izquierda: Ícono y título */}
          <div className="flex items-center gap-4">
            {/* Ícono de dinero con gradiente verde-teal */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg shadow-emerald-500/30">
              <DollarSign size={36} className="text-white" strokeWidth={2.5} />
            </div>
            {/* Título y descripción */}
            <div>
              <h2 className="text-3xl font-black text-white mb-1">CUADRE DE CAJA</h2>
              <p className="text-sm text-slate-300">Resumen de movimientos del día</p>
            </div>
          </div>
          
          {/* Botón de acceso rápido al detalle completo */}
          <button
            onClick={() => navigate('/worker/cuadre-caja')}
            className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-white transition-all duration-300 shadow-lg shadow-blue-500/30 hover:scale-105 group"
          >
            <span>Ver Detalle</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Contenido principal con tarjetas de métricas */}
      <div className="relative z-10 p-8">
        {/* Grid responsive de 4 tarjetas de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta 1: Total Ventas - Verde-Teal */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-6 rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300 border border-emerald-400/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-emerald-100">Total Ventas</p>
                <div className="bg-emerald-500/30 p-2 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
              </div>
              <p className="text-4xl font-black text-white mb-2">
                {formatCurrency(totalVentas)}
              </p>
              <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold">
                <TrendingUp size={14} />
                <span>Ingresos del día</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign size={80} className="text-white" />
            </div>
          </div>

          {/* Tarjeta 2: Total Gastos - Rojo-Rosa */}
          <div className="relative bg-gradient-to-br from-red-600 to-pink-600 p-6 rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300 border border-red-400/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-red-100">Total Gastos</p>
                <div className="bg-red-500/30 p-2 rounded-lg">
                  <TrendingDown className="text-white" size={20} />
                </div>
              </div>
              <p className="text-4xl font-black text-white mb-2">
                {formatCurrency(totalGastos)}
              </p>
              <div className="flex items-center gap-2 text-red-200 text-xs font-semibold">
                <TrendingDown size={14} />
                <span>Egresos del día</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingDown size={80} className="text-white" />
            </div>
          </div>

          {/* Tarjeta 3: Efectivo - Azul-Cyan */}
          <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300 border border-blue-400/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-blue-100">Efectivo</p>
                <div className="bg-blue-500/30 p-2 rounded-lg">
                  <Wallet className="text-white" size={20} />
                </div>
              </div>
              <p className="text-4xl font-black text-white mb-2">
                {formatCurrency(efectivo)}
              </p>
              <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold">
                <span>{calcularPorcentajeEfectivo()}% del total</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet size={80} className="text-white" />
            </div>
          </div>

          {/* Tarjeta 4: Balance Final - Morado-Fucsia */}
          <div className="relative bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300 border border-purple-400/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-purple-100">Balance</p>
                <div className="bg-purple-500/30 p-2 rounded-lg">
                  <DollarSign className="text-white" size={20} />
                </div>
              </div>
              <p className="text-4xl font-black text-white mb-2">
                {formatCurrency(balance)}
              </p>
              <div className="flex items-center gap-2 text-purple-200 text-xs font-semibold">
                {obtenerIconoTendencia()}
                <span>{obtenerEstadoFlujo()}</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard size={80} className="text-white" />
            </div>
          </div>
        </div>

        {/* Footer con última actualización y botón de acción */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600">
          {/* Información de última actualización */}
          <div className="flex items-center gap-3 text-slate-300">
            <div className="bg-slate-600 p-2 rounded-lg">
              <Clock size={20} className="text-slate-300" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Último cuadre realizado</p>
              <p className="text-sm font-bold text-white">{ultimoCuadre}</p>
            </div>
          </div>
          
          {/* Botón de acción para realizar nuevo cuadre */}
          <button
            onClick={() => navigate('/worker/cuadre-caja')}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30 group"
          >
            <span>Realizar cuadre de caja</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashRegisterSummary;