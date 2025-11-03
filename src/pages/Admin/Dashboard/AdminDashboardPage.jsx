import React from 'react';
import StatCard from '../../../components/dashboard/StatCard';
import ChartCard from '../../../components/dashboard/ChartCard';
import { Package, CreditCard, Users, FileText, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Página Principal del Panel de Administración
 * 
 * Componente que representa el dashboard principal para usuarios administrativos.
 * Proporciona acceso rápido a los diferentes módulos del sistema y visualización
 * de métricas clave mediante una interfaz organizada en secciones.
 * 
 * @component
 * @returns {JSX.Element} Componente del panel de administración
 */
const AdminDashboardPage = () => {
  /**
   * Hook de React Router para la navegación programática entre rutas
   */
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ===== SECCIÓN DE MÓDULOS PRINCIPALES ===== */}
      <section>
        {/* Encabezado de la sección */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
          <h2 className="text-xl font-bold text-white">Módulos Principales</h2>
        </div>
        
        {/* Grid de tarjetas de módulos principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de Inventario */}
          <StatCard 
            title="INVENTARIO" 
            icon={Package} 
            color="blue"
            onClick={() => navigate('/admin/inventario')}
          />
          
          {/* Tarjeta de Crédito */}
          <StatCard 
            title="CREDITO" 
            icon={CreditCard} 
            color="red"
            onClick={() => navigate('/admin/credito')}
          />
          
          {/* Tarjeta de Usuarios */}
          <StatCard 
            title="USUARIOS" 
            icon={Users} 
            color="yellow"
            onClick={() => navigate('/admin/usuarios')}
          />
        </div>
      </section>

      {/* ===== SECCIÓN DE GESTIÓN OPERATIVA ===== */}
      <section>
        {/* Encabezado de la sección */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
          <h2 className="text-xl font-bold text-white">Gestión Operativa</h2>
        </div>
        
        {/* Grid de tarjetas de gestión operativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta de Facturación */}
          <StatCard 
            title="FACTURA" 
            icon={FileText} 
            color="purple"
            onClick={() => navigate('/admin/facturas')}
          />
          
          {/* Tarjeta de Proveedores */}
          <StatCard 
            title="PROVEEDORES" 
            icon={Truck} 
            color="green"
            onClick={() => navigate('/admin/proveedores')}
          />
        </div>
      </section>

      {/* ===== SECCIÓN DE ESTADÍSTICAS Y REPORTES ===== */}
      <section>
        {/* Encabezado de la sección */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
          <h2 className="text-xl font-bold text-white">Estadísticas de Ventas</h2>
        </div>
        
        {/* Componente de gráfico de estadísticas */}
        <ChartCard />
      </section>
    </div>
  );
};

export default AdminDashboardPage;