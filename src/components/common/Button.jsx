/**
 * @fileoverview Componente Button reutilizable con múltiples variantes y tamaños
 * @author SoftWok
 * @version 1.0.0
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Componente Button - Botón personalizable con estados de carga, iconos y variantes
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'outline'|'ghost'|'link')} [props.variant='primary'] - Variante visual del botón
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.loading=false] - Estado de carga
 * @param {boolean} [props.disabled=false] - Estado deshabilitado
 * @param {boolean} [props.fullWidth=false] - Ancho completo
 * @param {React.Component} [props.icon] - Icono de Lucide React
 * @param {('left'|'right')} [props.iconPosition='left'] - Posición del icono
 * @param {Function} [props.onClick] - Función al hacer clic
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @returns {JSX.Element} Componente botón
 * 
 * @example
 * <Button variant="primary" icon={Save} onClick={handleSave}>
 *   Guardar
 * </Button>
 * 
 * <Button variant="danger" loading={isDeleting} size="sm">
 *   Eliminar
 * </Button>
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  // Variantes de colores y estilos
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-slate-600 shadow-lg',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40',
    info: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40',
    outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white shadow-md',
    ghost: 'bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white',
    link: 'text-blue-500 hover:text-blue-400 underline-offset-4 hover:underline'
  };

  // Tamaños disponibles
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Tamaños de iconos según el tamaño del botón
  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };

  // Deshabilitar si está en loading o disabled
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-semibold rounded-xl
        transition-all duration-300
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
        relative overflow-hidden
        group
        ${className}
      `}
      {...props}
    >
      {/* Efecto de brillo animado en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

      {/* Contenido del botón */}
      <span className="relative flex items-center justify-center gap-2">
        {/* Spinner de carga */}
        {loading && (
          <Loader2 size={iconSizes[size]} className="animate-spin" />
        )}
        
        {/* Icono a la izquierda */}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon size={iconSizes[size]} />
        )}
        
        {/* Texto del botón */}
        {children}
        
        {/* Icono a la derecha */}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon size={iconSizes[size]} />
        )}
      </span>
    </button>
  );
}

/**
 * Botón con variante Primary predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}

/**
 * Botón con variante Secondary predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />;
}

/**
 * Botón con variante Success predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function SuccessButton(props) {
  return <Button variant="success" {...props} />;
}

/**
 * Botón con variante Danger predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function DangerButton(props) {
  return <Button variant="danger" {...props} />;
}

/**
 * Botón con variante Outline predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function OutlineButton(props) {
  return <Button variant="outline" {...props} />;
}

/**
 * Botón con variante Ghost predefinida
 * @param {Object} props - Propiedades del componente Button
 */
export function GhostButton(props) {
  return <Button variant="ghost" {...props} />;
}