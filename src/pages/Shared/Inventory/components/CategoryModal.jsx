import React from "react";
import { X, Tag } from "lucide-react";

/**
 * Modal para agregar nuevas categorías
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.newCategory - Nombre de la nueva categoría
 * @param {Function} props.setNewCategory - Función para actualizar nombre de categoría
 * @param {Function} props.handleAddCategory - Función para agregar categoría
 * @param {Function} props.setShowCategoryModal - Función para mostrar/ocultar modal
 */
const CategoryModal = ({ 
  newCategory, 
  setNewCategory, 
  handleAddCategory, 
  setShowCategoryModal 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-label="Agregar nueva categoría"
    >
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-700">
        
        {/* Header del Modal */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg"
              aria-hidden="true"
            >
              <Tag size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Nueva Categoría</h3>
          </div>
          <button 
            onClick={() => setShowCategoryModal(false)} 
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Cerrar modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Campo de entrada */}
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all mb-4"
          aria-label="Nombre de la categoría"
          required
        />

        {/* Botón de guardar */}
        <button
          onClick={handleAddCategory}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl transition-all font-bold shadow-lg shadow-purple-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
          aria-label="Guardar categoría"
        >
          Guardar Categoría
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;