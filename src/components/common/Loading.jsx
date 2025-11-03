/**
 * @fileoverview Componente de indicador de carga con múltiples variantes visuales
 * @author SoftWok
 * @version 1.0.0
 */

import React from 'react';

/**
 * Componente Loading - Muestra un indicador de carga personalizable
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {('sm'|'md'|'lg'|'xl')} [props.size='md'] - Tamaño del loader
 * @param {string} [props.text='Cargando...'] - Texto descriptivo
 * @param {('spinner'|'dots'|'pulse'|'bars'|'ring')} [props.variant='spinner'] - Tipo de animación
 * @param {boolean} [props.fullScreen=false] - Si debe ocupar toda la pantalla
 * @returns {JSX.Element} Componente de carga
 * 
 * @example
 * <Loading size="lg" variant="dots" text="Procesando..." />
 * <Loading fullScreen variant="spinner" />
 */
export default function Loading({ 
  size = 'md', 
  text = 'Cargando...', 
  variant = 'spinner',
  fullScreen = false 
}) {
  // Clases CSS para los diferentes tamaños del loader principal
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  // Clases CSS para los tamaños de los dots
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6'
  };

  /**
   * Variante Spinner - Círculo giratorio con gradiente
   */
  const SpinnerLoader = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full border-4 border-slate-700`}></div>
      <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-blue-500 border-r-cyan-500 animate-spin absolute top-0 left-0`}></div>
    </div>
  );

  /**
   * Variante Dots - Tres puntos animados con efecto bounce
   */
  const DotsLoader = () => (
    <div className="flex items-center gap-2">
      <div className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  /**
   * Variante Pulse - Efecto de pulso circular expansivo
   */
  const PulseLoader = () => (
    <div className="relative flex items-center justify-center">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping absolute opacity-75`}></div>
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 relative shadow-lg shadow-blue-500/50`}></div>
    </div>
  );

  /**
   * Variante Bars - Barras verticales con animación de altura
   */
  const BarsLoader = () => (
    <div className="flex items-end gap-1.5 h-10">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full animate-pulse"
          style={{
            height: '100%',
            animationDelay: `${i * 100}ms`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  );

  /**
   * Variante Ring - Anillos dobles girando en direcciones opuestas
   */
  const RingLoader = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full border-4 border-blue-500/30 animate-spin`} style={{ animationDuration: '1.5s' }}></div>
      <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-cyan-500 border-r-blue-500 animate-spin absolute top-0 left-0`} style={{ animationDuration: '1s', animationDirection: 'reverse' }}></div>
    </div>
  );

  // Mapeo de variantes a sus componentes
  const loaders = {
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
    bars: <BarsLoader />,
    ring: <RingLoader />
  };

  // Contenido principal del loader
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {loaders[variant] || loaders.spinner}
      {text && (
        <div className="text-center">
          <p className="text-slate-300 font-semibold text-sm animate-pulse">{text}</p>
        </div>
      )}
    </div>
  );

  // Si fullScreen está activado, muestra el loader sobre toda la pantalla
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

/**
 * Componente LoadingOverlay - Overlay de carga para posicionar sobre contenido
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.text='Cargando...'] - Texto descriptivo
 * @param {('spinner'|'dots'|'pulse'|'bars'|'ring')} [props.variant='spinner'] - Tipo de animación
 * @returns {JSX.Element} Overlay de carga
 * 
 * @example
 * <div className="relative">
 *   <YourContent />
 *   {isLoading && <LoadingOverlay text="Guardando..." variant="pulse" />}
 * </div>
 */
export function LoadingOverlay({ text = 'Cargando...', variant = 'spinner' }) {
  return (
    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-40 rounded-xl">
      <Loading text={text} variant={variant} size="lg" />
    </div>
  );
}