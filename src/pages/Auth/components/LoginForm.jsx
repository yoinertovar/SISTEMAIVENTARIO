import React from 'react';
import { LogIn, Lock, Mail, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import QuickLogin from './QuickLogin';

/**
 * Componente de formulario de inicio de sesión mejorado
 * Diseño profesional con glassmorphism, animaciones y validación visual
 * 
 * @componente
 * @param {Object} props - Propiedades del componente
 * @param {string} props.email - Valor actual del campo email
 * @param {Function} props.setEmail - Setter para el campo email
 * @param {string} props.password - Valor actual del campo contraseña
 * @param {Function} props.setPassword - Setter para el campo contraseña
 * @param {string} props.error - Mensaje de error a mostrar
 * @param {boolean} props.loading - Estado de carga del formulario
 * @param {Function} props.handleSubmit - Manejador de envío del formulario
 * @param {Function} props.handleQuickLogin - Manejador para acceso rápido
 * @param {boolean} props.showPassword - Estado de visibilidad de contraseña
 * @param {Function} props.setShowPassword - Setter para visibilidad de contraseña
 * @returns {React.Element} Formulario de inicio de sesión profesional
 */
const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  loading, 
  handleSubmit,
  handleQuickLogin,
  showPassword = false,
  setShowPassword
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Campo de Email con efectos mejorados */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2 transition-colors duration-300 group-hover:text-cyan-400">
          <Mail size={16} className="text-cyan-400" />
          Correo Electrónico
        </label>
        <div className="relative">
          {/* Resplandor al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Campo de entrada */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="relative w-full px-5 py-4 bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-500 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="tu@correo.com"
            disabled={loading}
            autoComplete="email"
          />

          {/* Indicador de focus */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-focus-within:w-full"></div>
        </div>
      </div>

      {/* Campo de Contraseña con efectos mejorados */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2 transition-colors duration-300 group-hover:text-cyan-400">
          <Lock size={16} className="text-cyan-400" />
          Contraseña
        </label>
        <div className="relative">
          {/* Resplandor al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Campo de entrada */}
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative w-full px-5 py-4 pr-12 bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-500 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="••••••••"
            disabled={loading}
            autoComplete="current-password"
          />
          
          {/* Botón toggle de visibilidad */}
          {password && setShowPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-all duration-300 p-1 rounded-lg hover:bg-slate-700/50 active:scale-95"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {/* Indicador de focus */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-focus-within:w-full"></div>
        </div>

        {/* Indicador de fortaleza de contraseña (opcional) */}
        {password && password.length > 0 && (
          <div className="mt-2 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  password.length > i * 2 + 1
                    ? password.length < 6
                      ? 'bg-red-500'
                      : password.length < 8
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                    : 'bg-slate-700'
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Mensaje de Error mejorado */}
      {error && (
        <div className="relative overflow-hidden rounded-xl animate-shake">
          {/* Resplandor de error */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20 blur-xl"></div>
          
          {/* Contenedor del mensaje */}
          <div className="relative flex items-start gap-3 p-4 bg-red-950/50 backdrop-blur-xl border-2 border-red-500/50 rounded-xl">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm text-red-300 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Botón de Inicio de Sesión con efectos premium */}
      <button
        type="submit"
        disabled={loading || !email || !password}
        className="relative w-full group mt-8 disabled:cursor-not-allowed"
      >
        {/* Resplandor animado de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse group-disabled:opacity-30"></div>
        
        {/* Botón principal */}
        <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl transform group-hover:scale-[1.02] group-active:scale-[0.98] disabled:opacity-50 disabled:scale-100 overflow-hidden">
          
          {/* Efecto de shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {/* Contenido del botón */}
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span className="text-lg relative z-10">Iniciando sesión...</span>
            </>
          ) : (
            <>
              <LogIn size={22} className="relative z-10" />
              <span className="text-lg relative z-10">Iniciar Sesión</span>
              <ArrowRight 
                size={20} 
                className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
              />
            </>
          )}
        </div>
      </button>

      {/* Componente de Acceso Rápido */}
      <QuickLogin handleQuickLogin={handleQuickLogin} loading={loading} />

      {/* Enlaces adicionales */}
      <div className="text-center space-y-3 mt-6">
        {/* Enlace de Recuperación mejorado */}
        <a 
          href="#" 
          className="text-sm text-slate-400 hover:text-cyan-400 transition-all duration-300 inline-flex items-center gap-2 group"
        >
          <span>¿Olvidaste tu contraseña?</span>
          <ArrowRight 
            size={14} 
            className="transform group-hover:translate-x-1 transition-transform duration-300" 
          />
        </a>

        {/* Separador */}
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="h-px w-12 bg-slate-700"></div>
          <span className="text-xs text-slate-600">o</span>
          <div className="h-px w-12 bg-slate-700"></div>
        </div>

        {/* Link de registro (opcional) */}
        <p className="text-sm text-slate-500">
          ¿No tienes una cuenta?{' '}
          <a 
            href="#" 
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline"
          >
            Contacta al administrador
          </a>
        </p>
      </div>
    </form>
  );
};

// Animación de shake para errores
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

export default LoginForm;