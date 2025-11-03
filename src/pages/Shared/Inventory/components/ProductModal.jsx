import React from "react";
import { X, AlertCircle, Receipt } from "lucide-react";

/**
 * Modal para crear o editar productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Manejador de cambios en inputs
 * @param {Function} props.handleSubmit - Manejador de envío del formulario
 * @param {Array} props.categories - Lista de categorías disponibles
 * @param {Function} props.resetForm - Función para resetear el formulario
 * @param {Object|null} props.editingProduct - Producto en edición o null si es nuevo
 * @param {Function} props.setShowCategoryModal - Función para mostrar modal de categorías
 */
const ProductModal = ({
  formData,
  handleInputChange,
  handleSubmit,
  categories,
  resetForm,
  editingProduct,
  setShowCategoryModal,
}) => {
  /**
   * Maneja el envío del formulario
   * @param {Object} e - Evento del formulario
   */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  /**
   * Calcula el precio con IVA (19%)
   * @param {number} precio - Precio sin IVA
   * @returns {number} Precio con IVA incluido
   */
  const calcularPrecioConIva = (precio) => {
    if (!precio || precio === "") return 0;
    return (parseFloat(precio) * 1.19).toFixed(0);
  };

  /**
   * Formatea números como pesos colombianos
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatearPesos = (valor) => {
    if (!valor || valor === "") return "0";
    return new Intl.NumberFormat('es-CO').format(valor);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-label={editingProduct ? "Editar Producto" : "Nuevo Producto"}
      onClick={(e) => {
        // Cerrar al hacer clic fuera del modal
        if (e.target === e.currentTarget) resetForm();
      }}
    >
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-700 animate-scale-in">
        
        {/* Header del Modal */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-white">
            {editingProduct ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
          </h2>
          <button 
            onClick={resetForm} 
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Cerrar modal"
            type="button"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          
          {/* Nota informativa */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-300">
              Los campos marcados con <span className="text-red-400 font-bold">*</span> son obligatorios
            </p>
          </div>

          {/* Nombre del producto */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Nombre del Producto <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Laptop Dell Inspiron"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              aria-label="Nombre del producto"
            />
          </div>

          {/* Código y Cantidad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Código <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="codigo"
                placeholder="Ej: LP-001"
                value={formData.codigo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                required
                aria-label="Código del producto"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Cantidad <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="cantidad"
                placeholder="0"
                value={formData.cantidad}
                onChange={handleInputChange}
                min="0"
                step="1"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                aria-label="Cantidad en stock"
              />
            </div>
          </div>

          {/* Interruptor de IVA */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Receipt className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">¿Lleva IVA?</p>
                  <p className="text-xs text-slate-400">19% automático</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="llevaIva"
                  checked={formData.llevaIva}
                  onChange={handleInputChange}
                  className="sr-only peer"
                  aria-label="Activar IVA"
                />
                <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
              </label>
            </div>
            {formData.llevaIva && (
              <div className="mt-3 pt-3 border-t border-purple-500/30">
                <p className="text-xs text-purple-300">
                  ✓ Los precios incluirán automáticamente el 19% de IVA
                </p>
              </div>
            )}
          </div>

          {/* Precios */}
          <div className="space-y-3">
            {/* Precio Unitario */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Precio Unitario {formData.llevaIva ? "(Sin IVA)" : ""} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  name="precioUnd"
                  placeholder="0"
                  value={formData.precioUnd}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full pl-8 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                  aria-label="Precio unitario"
                />
              </div>
              {formData.llevaIva && formData.precioUnd && (
                <div className="mt-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2">
                  <p className="text-xs text-slate-400">Precio con IVA (19%):</p>
                  <p className="text-lg font-bold text-emerald-400">
                    ${formatearPesos(calcularPrecioConIva(formData.precioUnd))} COP
                  </p>
                </div>
              )}
            </div>

            {/* Precio por Mayor */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Precio x Mayor {formData.llevaIva ? "(Sin IVA)" : ""} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  name="precioMayor"
                  placeholder="0"
                  value={formData.precioMayor}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full pl-8 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                  aria-label="Precio por mayor"
                />
              </div>
              {formData.llevaIva && formData.precioMayor && (
                <div className="mt-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2">
                  <p className="text-xs text-slate-400">Precio con IVA (19%):</p>
                  <p className="text-lg font-bold text-cyan-400">
                    ${formatearPesos(calcularPrecioConIva(formData.precioMayor))} COP
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Nota sobre precios */}
          {formData.precioMayor && formData.precioUnd && 
           parseFloat(formData.precioMayor) > parseFloat(formData.precioUnd) && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300">
                ⚠️ El precio por mayor suele ser menor al precio unitario
              </p>
            </div>
          )}

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Categoría <span className="text-red-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              className="w-full mb-3 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-xl transition-all font-semibold hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Agregar nueva categoría"
            >
              ➕ Agregar Nueva Categoría
            </button>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              aria-label="Seleccionar categoría"
            >
              <option value="" className="bg-slate-800">
                Seleccionar categoría
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-800 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Estado - Automático pero editable */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Estado <span className="text-slate-500 text-xs">(se actualiza automáticamente)</span>
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                formData.estado === 'disponible'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-500/20 border-red-500/50 text-red-300'
              }`}
              disabled={formData.cantidad === '' || parseInt(formData.cantidad) === 0}
              aria-label="Seleccionar estado del producto"
            >
              <option value="disponible" className="bg-slate-800">
                ✅ Disponible
              </option>
              <option value="agotado" className="bg-slate-800">
                ❌ Agotado
              </option>
            </select>
            {formData.cantidad !== '' && parseInt(formData.cantidad) === 0 && (
              <p className="text-xs text-slate-400 mt-1">
                💡 Estado automático: Agotado (cantidad = 0)
              </p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3.5 rounded-xl transition-all font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
            >
              {editingProduct ? "💾 Actualizar Producto" : "✅ Guardar Producto"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductModal;