import React from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import LogoSoftWork from '../../../assets/images/LogoSoftWork.png';

/**
 * Componente de branding mejorado para la sección izquierda del login
 * Implementa glassmorphism, animaciones suaves y efectos visuales profesionales
 * 
 * @componente
 * @returns {React.Element} Sección de branding del login
 */
const LoginBranding = () => {
  const features = [
    {
      icon: '📦',
      title: 'Inventario',
      description: 'Control total de stock',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30',
      hoverShadow: 'hover:shadow-cyan-500/50'
    },
    {
      icon: '💳',
      title: 'Créditos',
      description: 'Gestión de pagos',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30',
      hoverShadow: 'hover:shadow-blue-500/50'
    },
    {
      icon: '📊',
      title: 'Reportes',
      description: 'Análisis en tiempo real',
      gradient: 'from-indigo-500/20 to-violet-500/20',
      border: 'border-indigo-500/30',
      hoverShadow: 'hover:shadow-indigo-500/50'
    },
    {
      icon: '👥',
      title: 'Clientes',
      description: 'CRM integrado',
      gradient: 'from-violet-500/20 to-purple-500/20',
      border: 'border-violet-500/30',
      hoverShadow: 'hover:shadow-violet-500/50'
    }
  ];

  const benefits = [
    'Gestión completa de inventario',
    'Control de ventas en tiempo real',
    'Reportes y análisis detallados',
    'Interfaz intuitiva y moderna'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl p-8 lg:p-16 flex flex-col justify-center items-center text-white relative overflow-hidden border-r border-white/10">
      
      {/* Efectos de luz de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Partículas decorativas flotantes */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/3 left-20 w-2 h-2 bg-violet-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 space-y-10 w-full max-w-lg">
        
        {/* Logo con efectos profesionales */}
        <div className="text-center mb-8">
          <div className="inline-block relative group">
            {/* Resplandor animado detrás del logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse"></div>
            
            {/* Contenedor del logo con glassmorphism */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:border-cyan-400/50">
              <img
                src={LogoSoftWork}
                alt="Logo SoftWok"
                className="h-32 md:h-40 lg:h-48 w-auto drop-shadow-2xl filter group-hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-700"
              />
            </div>

            {/* Anillos decorativos */}
            <div className="absolute -inset-4 border-2 border-cyan-500/20 rounded-3xl animate-ping opacity-20"></div>
            <div className="absolute -inset-6 border-2 border-blue-500/20 rounded-3xl animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Separador elegante con animación */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          <Sparkles className="mx-4 text-cyan-400 animate-pulse" size={24} />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>

        {/* Título principal con gradiente animado */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
              Media Caja de
            </span>
            <br />
            <span className="text-white drop-shadow-lg">
              Arroz Chino
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
            Sistema empresarial integral para gestión de inventario, ventas y finanzas
          </p>
        </div>

        {/* Grid de características con cards mejoradas */}
        <div className="grid grid-cols-2 gap-4 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-xl rounded-2xl p-6 border ${feature.border} transition-all duration-500 hover:scale-105 ${feature.hoverShadow} hover:shadow-2xl cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Brillo interno al hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-2xl transition-all duration-500"></div>
              
              {/* Efecto de partículas en esquina */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              
              <div className="relative text-center space-y-2">
                <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <div className="text-white text-base font-bold">{feature.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Lista de beneficios con iconos */}
        <div className="space-y-4 mt-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 text-slate-200 group hover:translate-x-2 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                <CheckCircle2 className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" size={20} />
              </div>
              <span className="text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Badge de seguridad */}
        <div className="flex items-center justify-center gap-3 mt-12 p-4 bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl">
          <Shield className="text-green-400" size={22} />
          <span className="text-sm text-slate-300 font-medium">
            Conexión segura y encriptada
          </span>
        </div>

        {/* Línea decorativa final */}
        <div className="flex items-center justify-center gap-2 mt-8 opacity-50">
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
          <div className="w-16 h-px bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-violet-500"></div>
          <div className="w-2 h-2 rounded-full bg-violet-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginBranding;