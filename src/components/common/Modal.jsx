/**
 * @fileoverview Componente Modal reutilizable con múltiples variantes y funcionalidades
 * @author SoftWok
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Componente Modal - Modal personalizable con variantes, tamaños y animaciones
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado de apertura del modal
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} [props.title] - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {React.ReactNode} [props.footer] - Contenido del footer
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [props.size='md'] - Tamaño del modal
 * @param {('default'|'success'|'error'|'warning'|'info')} [props.variant='default'] - Variante visual
 * @param {boolean} [props.showCloseButton=true] - Mostrar botón de cerrar
 * @param {boolean} [props.closeOnOverlayClick=true] - Cerrar al hacer clic en el overlay
 * @param {boolean} [props.closeOnEscape=true] - Cerrar con tecla Escape
 * @returns {JSX.Element|null} Componente modal o null si está cerrado
 * 
 * @example
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={handleClose} 
 *   title="Título del Modal" 
 *   variant="success"
 * >
 *   <p>Contenido del modal</p>
 * </Modal>
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) {
  /**
   * Effect: Cerrar modal con tecla Escape
   */
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  /**
   * Effect: Prevenir scroll del body cuando el modal está abierto
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // No renderizar si el modal está cerrado
  if (!isOpen) return null;

  // Configuración de tamaños disponibles
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]'
  };

  // Configuración de variantes con iconos y colores
  const variants = {
    default: {
      icon: null,
      gradient: 'from-slate-700 to-slate-800',
      iconBg: 'from-blue-600 to-cyan-600',
      iconColor: 'text-white'
    },
    success: {
      icon: CheckCircle,
      gradient: 'from-slate-700 to-slate-800',
      iconBg: 'from-emerald-600 to-teal-600',
      iconColor: 'text-white'
    },
    error: {
      icon: AlertCircle,
      gradient: 'from-slate-700 to-slate-800',
      iconBg: 'from-red-600 to-pink-600',
      iconColor: 'text-white'
    },
    warning: {
      icon: AlertTriangle,
      gradient: 'from-slate-700 to-slate-800',
      iconBg: 'from-yellow-600 to-orange-600',
      iconColor: 'text-white'
    },
    info: {
      icon: Info,
      gradient: 'from-slate-700 to-slate-800',
      iconBg: 'from-cyan-600 to-blue-600',
      iconColor: 'text-white'
    }
  };

  const currentVariant = variants[variant] || variants.default;
  const IconComponent = currentVariant.icon;

  /**
   * Maneja el clic en el overlay
   * Solo cierra si closeOnOverlayClick está habilitado
   */
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay con efecto blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleOverlayClick}
      ></div>

      {/* Contenedor del Modal */}
      <div
        className={`
          relative ${sizes[size]} w-full
          bg-gradient-to-br from-slate-800 to-slate-900
          rounded-2xl shadow-2xl
          border border-slate-700
          overflow-hidden
          animate-scale-in
          max-h-[90vh] flex flex-col
        `}
      >
        {/* Efectos decorativos de brillo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header del Modal */}
        {(title || IconComponent) && (
          <div className={`relative z-10 bg-gradient-to-r ${currentVariant.gradient} px-6 py-5 border-b border-slate-700`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Icono según la variante */}
                {IconComponent && (
                  <div className={`bg-gradient-to-br ${currentVariant.iconBg} p-3 rounded-xl shadow-lg`}>
                    <IconComponent size={24} className={currentVariant.iconColor} />
                  </div>
                )}
                {/* Título del modal */}
                {title && (
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                )}
              </div>

              {/* Botón de cerrar */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cuerpo del Modal con scroll */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          {children}
        </div>

        {/* Footer del Modal */}
        {footer && (
          <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm px-6 py-4 border-t border-slate-700">
            {footer}
          </div>
        )}
      </div>

      {/* Estilos CSS para animaciones y scrollbar personalizado */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
      `}</style>
    </div>
  );
}

/**
 * Componente ConfirmModal - Modal de confirmación predefinido
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado de apertura del modal
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onConfirm - Función a ejecutar al confirmar
 * @param {string} [props.title='¿Estás seguro?'] - Título del modal
 * @param {string} props.message - Mensaje de confirmación
 * @param {string} [props.confirmText='Confirmar'] - Texto del botón de confirmar
 * @param {string} [props.cancelText='Cancelar'] - Texto del botón de cancelar
 * @param {('default'|'success'|'error'|'warning'|'info')} [props.variant='warning'] - Variante visual
 * @param {boolean} [props.loading=false] - Estado de carga
 * @returns {JSX.Element} Modal de confirmación
 * 
 * @example
 * <ConfirmModal
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleDelete}
 *   message="Esta acción no se puede deshacer"
 *   variant="error"
 * />
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning',
  loading = false
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3">
          {/* Botón Cancelar */}
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {cancelText}
          </button>
          {/* Botón Confirmar */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="text-slate-300 text-base leading-relaxed">{message}</p>
    </Modal>
  );
}