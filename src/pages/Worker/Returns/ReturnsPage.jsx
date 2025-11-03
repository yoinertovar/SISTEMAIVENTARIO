import React from 'react';
import { ArrowLeft, RotateCcw, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de gestión de devoluciones
 * Permite a los trabajadores procesar y gestionar devoluciones de productos
 */
export default function ReturnsPage() {
  const navigate = useNavigate();

  /**
   * Maneja el regreso al dashboard del trabajador
   */
  const handleBackToDashboard = () => {
    navigate('/worker/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header de la página */}
        <div className="bg-[#1a1f2e] rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToDashboard}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <RotateCcw className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Gestión de Devoluciones</h1>
                    <p className="text-purple-100 mt-1">Procesa y gestiona devoluciones de productos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por número de factura, producto o cliente..."
                className="w-full pl-12 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <select className="pl-12 pr-8 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer">
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contenido principal - Estado vacío */}
        <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800">
          <div className="text-center py-16">
            <div className="inline-flex p-6 bg-gray-800/50 rounded-2xl mb-6">
              <RotateCcw className="w-24 h-24 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Módulo de Devoluciones</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Esta sección está preparada para gestionar todas las devoluciones de productos. 
              Próximamente podrás procesar reembolsos y cambios de productos.
            </p>
          </div>
        </div>

        {/* Información de funcionalidades futuras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white">
            <h4 className="font-bold mb-2">Procesar Devoluciones</h4>
            <p className="text-blue-100 text-sm">
              Gestiona solicitudes de devolución y procesa reembolsos
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-xl text-white">
            <h4 className="font-bold mb-2">Historial Completo</h4>
            <p className="text-emerald-100 text-sm">
              Accede al historial completo de todas las devoluciones procesadas
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl text-white">
            <h4 className="font-bold mb-2">Gestión de Stock</h4>
            <p className="text-purple-100 text-sm">
              Actualización automática del inventario al procesar devoluciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}