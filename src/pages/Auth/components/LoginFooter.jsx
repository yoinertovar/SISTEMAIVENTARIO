import React from 'react';
import { Heart, Shield } from 'lucide-react';

/**
 * Componente de pie de página mejorado para formularios de login
 * Diseño profesional con efectos sutiles y información adicional
 * 
 * @componente
 * @returns {React.Element} Pie de página del login
 */
const LoginFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-12 space-y-6">
      {/* Separador decorativo */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="flex gap-1.5">
          <div className="w-1 h-1 rounded-full bg-slate-700 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-1 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      {/* Información de copyright */}
      <div className="text-center space-y-3">
        <p className="text-slate-500 text-sm flex items-center justify-center gap-2 flex-wrap">
          <span>© {currentYear} SoftWok</span>
          <span className="text-slate-700">•</span>
          <span>Todos los derechos reservados</span>
        </p>

        {/* Hecho con amor */}
        <p className="text-slate-600 text-xs flex items-center justify-center gap-1.5">
          <span>Hecho con</span>
          <Heart className="text-red-500 animate-pulse" size={12} fill="currentColor" />
          <span>en Colombia</span>
        </p>
      </div>

      {/* Links adicionales */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <a 
          href="#" 
          className="text-slate-600 hover:text-cyan-400 transition-colors duration-300 hover:underline"
        >
          Términos de Servicio
        </a>
        <span className="text-slate-800">|</span>
        <a 
          href="#" 
          className="text-slate-600 hover:text-cyan-400 transition-colors duration-300 hover:underline"
        >
          Política de Privacidad
        </a>
        <span className="text-slate-800">|</span>
        <a 
          href="#" 
          className="text-slate-600 hover:text-cyan-400 transition-colors duration-300 hover:underline flex items-center gap-1"
        >
          <Shield size={12} />
          <span>Seguridad</span>
        </a>
      </div>

      {/* Versión del sistema (opcional) */}
      <div className="text-center">
        <span className="text-slate-700 text-xs font-mono">v2.0.1</span>
      </div>

      {/* Badges de confianza (opcional) */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/30 rounded-full border border-slate-700/50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate-500 text-xs">Sistema Activo</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/30 rounded-full border border-slate-700/50">
          <Shield className="text-blue-400" size={12} />
          <span className="text-slate-500 text-xs">SSL Seguro</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;