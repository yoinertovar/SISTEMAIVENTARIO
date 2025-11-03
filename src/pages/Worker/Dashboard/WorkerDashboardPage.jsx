import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerDashboardCard from '../../../components/workerDashboard/WorkerDashboardCard';
import CashRegisterSummary from '../../../components/workerDashboard/CashRegisterSummary';
import { FileText, Package, CreditCard, DollarSign, RotateCcw, Users } from 'lucide-react';

/**
 * Dashboard principal para trabajadores
 * Proporciona acceso rápido a todas las operaciones del sistema
 */
const WorkerDashboardPage = () => {
  const navigate = useNavigate();

  /**
   * Configuración de las tarjetas de operaciones principales
   */
  const mainOperations = [
    {
      title: 'FACTURAR',
      icon: FileText,
      color: 'green',
      description: 'Crear nueva factura',
      path: '/worker/facturas'
    },
    {
      title: 'INVENTARIO',
      icon: Package,
      color: 'blue',
      description: 'Consultar productos',
      path: '/worker/inventario'
    },
    {
      title: 'CRÉDITO',
      icon: CreditCard,
      color: 'red',
      description: 'Gestionar créditos',
      path: '/worker/credito'
    }
  ];

  /**
   * Configuración de las tarjetas de gestión adicional
   */
  const additionalOperations = [
    {
      title: 'GASTOS',
      icon: DollarSign,
      color: 'yellow',
      description: 'Registrar gastos',
      path: '/worker/gastos'
    },
    {
      title: 'DEVOLUCIÓN',
      icon: RotateCcw,
      color: 'purple',
      description: 'Procesar devoluciones',
      path: '/worker/devoluciones'
    },
    {
      title: 'CLIENTES',
      icon: Users,
      color: 'orange',
      description: 'Gestionar clientes',
      path: '/worker/clientes'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Sección de Operaciones Principales */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
            <h2 className="text-xl font-bold text-white">Operaciones Principales</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainOperations.map((operation, index) => (
              <WorkerDashboardCard 
                key={index}
                title={operation.title} 
                icon={operation.icon} 
                color={operation.color}
                description={operation.description}
                onClick={() => navigate(operation.path)}
              />
            ))}
          </div>
        </div>

        {/* Sección de Gestión Adicional */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
            <h2 className="text-xl font-bold text-white">Gestión Adicional</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalOperations.map((operation, index) => (
              <WorkerDashboardCard 
                key={index}
                title={operation.title} 
                icon={operation.icon} 
                color={operation.color}
                description={operation.description}
                onClick={() => navigate(operation.path)}
              />
            ))}
          </div>
        </div>

        {/* Sección de Cuadre de Caja */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            <h2 className="text-xl font-bold text-white">Cuadre de Caja del Día</h2>
          </div>
          <CashRegisterSummary />
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboardPage;