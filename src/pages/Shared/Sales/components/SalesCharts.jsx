import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Componente para mostrar gráficos de ventas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.dailyData - Datos de ventas diarias
 * @param {Array} props.monthlyData - Datos de ventas mensuales
 * @param {Array} props.yearlyData - Datos de ventas anuales
 */
const SalesCharts = ({ dailyData, monthlyData, yearlyData }) => {
  
  /**
   * Configuración común para los tooltips de los gráficos
   */
  const tooltipStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#fff',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  };

  return (
    <div className="space-y-6">
      
      {/* Gráfico de Ventas Diarias */}
      <div className="bg-slate-800 border border-slate-700 text-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">VENTAS DIARIAS</h2>
        <div className="bg-slate-700/50 rounded-xl p-4 h-64 border border-slate-600">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="ventas" fill="url(#gradientBar)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos de Ventas Mensuales y Anuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gráfico de Ventas del Mes */}
        <div className="bg-slate-800 border border-slate-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-white">VENTAS DEL MES</h2>
          <div className="bg-slate-700/50 rounded-xl p-4 h-64 border border-slate-600">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="ventas" fill="url(#gradientBlue)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Ventas Anuales */}
        <div className="bg-slate-800 border border-slate-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-white">VENTAS ANUALES</h2>
          <div className="bg-slate-700/50 rounded-xl p-4 h-64 border border-slate-600">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7, fill: '#06b6d4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;