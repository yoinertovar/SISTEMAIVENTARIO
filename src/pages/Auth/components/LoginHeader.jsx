import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Componente de encabezado mejorado para formularios de login
 * Diseño profesional con gradientes y efectos modernos
 * 
 * @componente
 * @returns {React.Element} Encabezado de formulario de login
 */
const LoginHeader = () => {
  return (
    <div className="text-center mb-10 space-y-4">
      {/* Indicador decorativo superior */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <Sparkles className="text-cyan-400 animate-pulse" size={20} />
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>

      {/* Título con gradiente */}
      <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
        Bienvenido de nuevo
      </h2>
      
      {/* Subtítulo */}
      <p className="text-slate-400 text-base leading-relaxed max-w-md mx-auto">
        Ingresa tus credenciales para acceder al sistema
      </p>

      {/* Línea decorativa inferior */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoginHeader;