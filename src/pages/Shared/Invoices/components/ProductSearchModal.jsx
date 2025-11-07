import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingCart, Package } from 'lucide-react';

/**
 * Modal de búsqueda de productos
 * Permite buscar productos cuando no se sabe el código
 */
const ProductSearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔥 PRODUCTOS DE EJEMPLO - Reemplaza esto con tu API o localStorage
  const [allProducts] = useState([
    { codigo: 'P001', nombre: 'Laptop HP 15', precio: 1500000 },
    { codigo: 'P002', nombre: 'Mouse Logitech', precio: 50000 },
    { codigo: 'P003', nombre: 'Teclado Mecánico', precio: 150000 },
    { codigo: 'P004', nombre: 'Monitor Samsung 24"', precio: 800000 },
    { codigo: 'P005', nombre: 'Impresora Epson', precio: 600000 },
    { codigo: 'P006', nombre: 'Cable HDMI', precio: 25000 },
    { codigo: 'P007', nombre: 'Webcam Logitech', precio: 180000 },
    { codigo: 'P008', nombre: 'Audífonos Sony', precio: 120000 },
    { codigo: 'P009', nombre: 'Disco Duro 1TB', precio: 200000 },
    { codigo: 'P010', nombre: 'Memoria RAM 8GB', precio: 150000 },
    { codigo: 'P011', nombre: 'Procesador Intel i5', precio: 800000 },
    { codigo: 'P012', nombre: 'Tarjeta Gráfica GTX', precio: 1200000 },
    { codigo: 'P013', nombre: 'SSD 500GB', precio: 250000 },
    { codigo: 'P014', nombre: 'Fuente de Poder 600W', precio: 180000 },
    { codigo: 'P015', nombre: 'Case Gaming RGB', precio: 200000 }
  ]);

  /**
   * Filtra productos en tiempo real
   */
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  /**
   * Formatea valores monetarios
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  /**
   * Maneja la selección de un producto
   */
  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    setSearchTerm('');
    onClose();
  };

  /**
   * Maneja el evento de presionar Enter
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredProducts.length === 1) {
      handleSelectProduct(filteredProducts[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1f2e] rounded-2xl shadow-2xl border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Package size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Buscar Producto</h2>
                <p className="text-purple-100 text-sm">Encuentra y selecciona un producto</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="p-6 border-b border-gray-800">
          <div className="relative">
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por nombre o código del producto..."
              autoFocus
              className="w-full pl-12 pr-4 py-4 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500 text-lg"
            />
          </div>
          
          {searchTerm && (
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </span>
              {filteredProducts.length === 1 && (
                <span className="text-purple-400 animate-pulse">
                  ✨ Presiona Enter para seleccionar
                </span>
              )}
            </div>
          )}
        </div>

        {/* Lista de productos */}
        <div className="overflow-y-auto max-h-[500px]">
          {filteredProducts.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.codigo}
                  onClick={() => handleSelectProduct(product)}
                  className="bg-[#0f1419] hover:bg-purple-600/20 border border-gray-800 hover:border-purple-500 rounded-xl p-4 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-3 bg-purple-600/20 group-hover:bg-purple-600/40 rounded-xl transition-colors">
                        <ShoppingCart size={24} className="text-purple-400" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">
                          {product.nombre}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Código: <span className="text-purple-400 font-mono">{product.codigo}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-xl">
                        {formatCurrency(product.precio)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Precio unitario
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-block p-6 bg-gray-800/50 rounded-full mb-4">
                <Search size={48} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-400">
                Intenta con otro término de búsqueda
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0f1419] p-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            💡 Tip: Escribe el nombre o código del producto para buscarlo rápidamente
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchModal;