import React, { useState } from "react";
import { Package, Edit, Trash2, ChevronDown, ChevronUp, Receipt } from "lucide-react";

/**
 * Componente de tabla para mostrar productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.products - Lista de productos a mostrar
 * @param {Function} props.onEdit - Función para editar producto
 * @param {Function} props.onDelete - Función para eliminar producto
 */
const ProductsTable = ({ products, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  /**
   * Maneja el ordenamiento de columnas
   * @param {string} field - Campo por el cual ordenar
   */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  /**
   * Ordena los productos según el campo y dirección seleccionados
   * @returns {Array} Productos ordenados
   */
  const sortedProducts = () => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Conversión especial para números
      if (sortField === 'cantidad' || sortField === 'precioUnd' || sortField === 'precioMayor') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      // Conversión para strings
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  /**
   * Calcula el precio con IVA (19%)
   * @param {number} precio - Precio sin IVA
   * @returns {number} Precio con IVA incluido
   */
  const calcularPrecioConIva = (precio) => {
    return (parseFloat(precio) * 1.19).toFixed(0);
  };

  /**
   * Formatea números como pesos colombianos
   * @param {number} valor - Valor a formatear
   * @returns {string} Valor formateado
   */
  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CO').format(valor);
  };

  /**
   * Renderiza el icono de ordenamiento
   * @param {string} field - Campo de la columna
   */
  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="inline ml-1" /> : 
      <ChevronDown size={16} className="inline ml-1" />;
  };

  // Estado vacío
  if (products.length === 0) {
    return (
      <div 
        className="bg-slate-800 rounded-2xl p-16 border border-slate-700 text-center shadow-xl"
        role="status"
        aria-label="No hay productos registrados"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-700/50 rounded-full mb-4">
          <Package size={48} className="text-slate-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          No hay productos registrados
        </h3>
        <p className="text-slate-400 mb-4">
          Comienza agregando tu primer producto al inventario
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-slate-500">
          <span>💡</span>
          <span>Usa el botón "Nuevo Producto" para comenzar</span>
        </div>
      </div>
    );
  }

  const displayProducts = sortedProducts();

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
      
      {/* Info bar */}
      <div className="bg-slate-700/30 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
        <p className="text-sm text-slate-400">
          Mostrando <span className="font-bold text-white">{displayProducts.length}</span> producto{displayProducts.length !== 1 ? 's' : ''}
        </p>
        {sortField && (
          <button
            onClick={() => {
              setSortField(null);
              setSortDirection('asc');
            }}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Limpiar ordenamiento ✖️
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" aria-label="Lista de productos">
          <thead className="bg-slate-700/50 border-b border-slate-600">
            <tr>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('nombre')}
              >
                Producto <SortIcon field="nombre" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('categoria')}
              >
                Categoría <SortIcon field="categoria" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('cantidad')}
              >
                Stock <SortIcon field="cantidad" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('precioUnd')}
              >
                Precio UND <SortIcon field="precioUnd" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('precioMayor')}
              >
                Precio x Mayor <SortIcon field="precioMayor" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('estado')}
              >
                Estado <SortIcon field="estado" />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => handleSort('codigo')}
              >
                Código <SortIcon field="codigo" />
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-slate-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {displayProducts.map((product) => (
              <tr 
                key={product.id} 
                className="hover:bg-slate-700/30 transition-colors group"
              >
                {/* Información del producto */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Package size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        {product.nombre}
                        {product.llevaIva && (
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                            title="Producto con IVA incluido"
                          >
                            <Receipt size={12} />
                            IVA
                          </span>
                        )}
                      </div>
                      {product.updatedAt && (
                        <div className="text-xs text-slate-500">
                          Actualizado: {new Date(product.updatedAt).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-semibold border border-purple-500/30">
                    {product.categoria}
                  </span>
                </td>
                
                {/* Stock con indicador visual */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${
                      parseInt(product.cantidad) === 0 ? 'text-red-400' :
                      parseInt(product.cantidad) < 10 ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}>
                      {product.cantidad}
                    </span>
                    {parseInt(product.cantidad) < 10 && parseInt(product.cantidad) > 0 && (
                      <span className="text-xs text-amber-400" title="Stock bajo">
                        ⚠️
                      </span>
                    )}
                  </div>
                </td>
                
                {/* Precio Unitario */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-emerald-400 font-semibold">
                      ${formatearPesos(product.precioUnd)}
                    </div>
                    {product.llevaIva && (
                      <div className="text-xs text-slate-400">
                        + IVA: ${formatearPesos(calcularPrecioConIva(product.precioUnd))}
                      </div>
                    )}
                  </div>
                </td>
                
                {/* Precio por Mayor */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-cyan-400 font-semibold">
                      ${formatearPesos(product.precioMayor)}
                    </div>
                    {product.llevaIva && (
                      <div className="text-xs text-slate-400">
                        + IVA: ${formatearPesos(calcularPrecioConIva(product.precioMayor))}
                      </div>
                    )}
                  </div>
                </td>
                
                {/* Estado del producto */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                      product.estado === "disponible"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                    aria-label={`Estado: ${product.estado}`}
                  >
                    <span>{product.estado === "disponible" ? "✅" : "❌"}</span>
                    <span className="capitalize">{product.estado}</span>
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-slate-400 bg-slate-700/50 px-2 py-1 rounded border border-slate-600">
                    {product.codigo}
                  </code>
                </td>
                
                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Editar producto ${product.nombre}`}
                      title="Editar"
                    >
                      <Edit size={16} aria-hidden="true" />
                    </button>
                    <button 
                      onClick={() => onDelete(product)} 
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Eliminar producto ${product.nombre}`}
                      title="Eliminar"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con info adicional */}
      <div className="bg-slate-700/30 px-6 py-3 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          💡 Haz clic en los encabezados de columna para ordenar • Los precios están en Pesos Colombianos (COP)
        </p>
      </div>
    </div>
  );
};

export default ProductsTable;