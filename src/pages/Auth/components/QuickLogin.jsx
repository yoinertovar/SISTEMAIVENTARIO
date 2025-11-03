import React from 'react';
import { UserCog, Wrench } from 'lucide-react';

/**
 * Componente de acceso rápido mejorado para desarrollo
 * Diseño profesional con glassmorphism y animaciones suaves
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.handleQuickLogin - Manejador para llenar credenciales
 * @param {boolean} props.loading - Estado de carga
 * @returns {React.Element} Botones de acceso rápido
 */
const QuickLogin = ({ handleQuickLogin, loading = false }) => {
  return (
    <div className="space-y-6">
      {/* Separador elegante */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/50"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-slate-900 text-slate-400 text-sm font-medium flex items-center gap-2">
            <Wrench size={14} className="text-slate-500" />
            Acceso rápido (Desarrollo)
          </span>
        </div>
      </div>

      {/* Botones de acceso rápido */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Botón Admin con efectos mejorados */}
        <button
          type="button"
          onClick={() => handleQuickLogin('admin')}
          disabled={loading}
          className="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-purple-800/40 to-purple-900/30 backdrop-blur-xl hover:from-purple-800/60 hover:via-purple-700/60 hover:to-purple-800/50 border-2 border-purple-500/40 hover:border-purple-400/70 text-purple-200 font-semibold py-4 px-5 rounded-xl transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl"
        >
          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/30 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Contenido del botón */}
          <div className="relative flex items-center justify-center gap-2">
            <div className="p-1.5 bg-purple-500/30 rounded-lg group-hover:bg-purple-400/40 transition-colors duration-300">
              <UserCog size={18} className="text-purple-200" />
            </div>
            <span className="text-base">Admin</span>
          </div>

          {/* Partícula decorativa */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
        </button>

        {/* Botón Trabajador con efectos mejorados */}
        <button
          type="button"
          onClick={() => handleQuickLogin('worker')}
          disabled={loading}
          className="group relative overflow-hidden bg-gradient-to-br from-teal-900/40 via-teal-800/40 to-teal-900/30 backdrop-blur-xl hover:from-teal-800/60 hover:via-teal-700/60 hover:to-teal-800/50 border-2 border-teal-500/40 hover:border-teal-400/70 text-teal-200 font-semibold py-4 px-5 rounded-xl transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-500/50 hover:shadow-2xl"
        >
          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-400/30 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Contenido del botón */}
          <div className="relative flex items-center justify-center gap-2">
            <div className="p-1.5 bg-teal-500/30 rounded-lg group-hover:bg-teal-400/40 transition-colors duration-300">
              <Wrench size={18} className="text-teal-200" />
            </div>
            <span className="text-base">Trabajador</span>
          </div>

          {/* Partícula decorativa */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
        </button>
      </div>

      {/* Nota informativa */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Solo para entorno de desarrollo
        </p>
      </div>
    </div>
  );
};

export default QuickLogin;