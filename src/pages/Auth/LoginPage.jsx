import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, Lock, Mail, AlertCircle, Eye, EyeOff, Shield, Sparkles } from 'lucide-react';
import LogoSoftWork from '../../assets/images/LogoSoftWork.png';

/**
 * Página de inicio de sesión mejorada con diseño profesional
 * Implementa glassmorphism, animaciones suaves y mejor jerarquía visual
 * 
 * CAMBIOS RESPONSIVE:
 * - Logo visible en móvil (CORREGIDO)
 * - Tonos rosados reemplazados por azul-indigo
 * - Diseño completamente adaptativo
 * 
 * @componente
 * @returns {React.Element} Página completa de inicio de sesión profesional
 */
const LoginPage = () => {
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Efecto para manejar estilos globales durante la sesión de login
   */
  React.useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100%';
      root.style.width = '100%';
      root.style.padding = '0';
      root.style.margin = '0';
      root.style.maxWidth = 'none';
    }
    document.body.style.overflow = 'hidden';

    return () => {
      const root = document.getElementById('root');
      if (root) {
        root.style.height = '';
        root.style.width = '';
        root.style.padding = '';
        root.style.margin = '';
        root.style.maxWidth = '';
      }
      document.body.style.overflow = '';
    };
  }, []);

  /**
   * Maneja el envío del formulario de inicio de sesión
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Rellena automáticamente credenciales para desarrollo
   */
  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      setEmail('admin@example.com');
      setPassword('admin123');
    } else {
      setEmail('worker@example.com');
      setPassword('worker123');
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'auto'
      }}
      className="flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 relative"
    >
      {/* Efectos de fondo decorativos mejorados - SIN TONOS ROSADOS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes de luz con blur - SOLO AZUL-CYAN */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid de fondo sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Contenedor Principal con glassmorphism */}
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl relative z-10 backdrop-blur-sm border border-white/10">
        
        {/* Sección Izquierda - Branding Mejorado (OCULTO EN MÓVIL) */}
        <div className="hidden lg:flex bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl p-8 lg:p-16 flex-col justify-center items-center text-white relative overflow-hidden border-r border-white/10">
          
          {/* Efectos de luz mejorados */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          
          {/* Partículas decorativas */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10 space-y-10 w-full max-w-lg">
            
            {/* Logo mejorado con glassmorphism */}
            <div className="text-center mb-8">
              <div className="inline-block relative group">
                {/* Resplandor detrás del logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                
                {/* Contenedor del logo con glassmorphism */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/50">
                  <img
                    src={LogoSoftWork}
                    alt="Logo SoftWork"
                    className="h-32 md:h-40 lg:h-48 w-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Separador elegante con animación */}
            <div className="flex items-center justify-center my-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
              <Sparkles className="mx-4 text-cyan-400 animate-pulse" size={24} />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
            </div>

            {/* Título y Descripción mejorados - SIN TONOS ROSADOS */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  SIS. DE INVENTARIO Y VENTAS
                </span>
              </h1>
              
              <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
                Sistema empresarial integral para gestión de inventario, ventas y finanzas
              </p>
            </div>

            {/* Badge de seguridad */}
            <div className="flex items-center justify-center gap-3 mt-12 text-slate-400">
              <Shield className="text-green-400" size={20} />
              <span className="text-sm">Conexión segura y encriptada</span>
            </div>
          </div>
        </div>

        {/* Sección Derecha - Formulario Mejorado */}
        <div className="bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 lg:p-16 flex flex-col justify-center relative">
          
          {/* Resplandor de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="w-full max-w-md mx-auto relative z-10">
            
            {/* LOGO MÓVIL - OPTIMIZADO PARA PANTALLAS PEQUEÑAS (visible solo en móvil) */}
            <div className="lg:hidden text-center mb-4">
              <div className="inline-block relative group max-w-[200px] mx-auto">
                {/* Resplandor detrás del logo - más sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-30"></div>
                
                {/* Contenedor del logo con glassmorphism - más compacto */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/20 shadow-xl">
                  {/* Logo con restricciones de tamaño */}
                  <img
                    src={LogoSoftWork}
                    alt="Logo SoftWork"
                    className="w-full h-auto drop-shadow-xl mx-auto"
                    style={{ 
                      maxWidth: '180px',
                      maxHeight: '80px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Error al cargar el logo:', e);
                    }}
                  />
                </div>
              </div>
              
              {/* Título móvil - más compacto */}
              <h1 className="text-lg sm:text-xl font-bold mt-3 mb-1 leading-tight px-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  SIS. DE INVENTARIO Y VENTAS
                </span>
              </h1>
              
              <p className="text-slate-400 text-xs">
                Sistema empresarial integral
              </p>
            </div>

            {/* Encabezado del Formulario */}
            <div className="mb-4 sm:mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                Bienvenido de nuevo
              </h2>
              <p className="text-slate-400 text-xs">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              
              {/* Campo de Email mejorado */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-cyan-400" />
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative w-full px-4 py-3 bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300 shadow-lg text-sm"
                    placeholder="tu@correo.com"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Campo de Contraseña mejorado */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Lock size={16} className="text-cyan-400" />
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative w-full px-4 py-3 bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300 shadow-lg pr-12 text-sm"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Mensaje de Error mejorado - SIN TONO ROSADO */}
              {error && (
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl"></div>
                  <div className="relative flex items-start gap-3 p-3 bg-red-950/50 backdrop-blur-xl border-2 border-red-500/50 rounded-xl">
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-red-300 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              {/* Botón de Inicio de Sesión mejorado */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full group mt-4 sm:mt-5"
              >
                {/* Resplandor animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                
                {/* Botón principal */}
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl transform group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>Iniciar Sesión</span>
                      <svg 
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </div>
              </button>

              {/* Acceso Rápido mejorado - SIN TONO ROSADO */}
              <div className="mt-4 sm:mt-6">
                <div className="relative my-3 sm:my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-slate-900 text-slate-400 text-xs font-medium">
                      Acceso rápido (Desarrollo)
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Botón Admin - CAMBIADO A AZUL-INDIGO */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    disabled={loading}
                    className="group relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-blue-800/40 backdrop-blur-xl hover:from-indigo-800/60 hover:to-blue-700/60 border-2 border-indigo-500/40 hover:border-indigo-400/60 text-indigo-200 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/50 text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-400/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center justify-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg">👨‍💼</span>
                      <span>Admin</span>
                    </div>
                  </button>

                  {/* Botón Trabajador */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('worker')}
                    disabled={loading}
                    className="group relative overflow-hidden bg-gradient-to-br from-teal-900/40 to-teal-800/40 backdrop-blur-xl hover:from-teal-800/60 hover:to-teal-700/60 border-2 border-teal-500/40 hover:border-teal-400/60 text-teal-200 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-500/50 text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-400/20 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center justify-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg">👷</span>
                      <span>Trabajador</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Link de recuperación */}
              <div className="text-center mt-4">
                <a 
                  href="#" 
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span>¿Olvidaste tu contraseña?</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </form>

            {/* Pie de Página mejorado */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800">
              <p className="text-slate-500 text-xs text-center flex flex-col sm:flex-row items-center justify-center gap-1">
                <span>© 2025 SoftWork.</span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span>Todos los derechos reservados</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;