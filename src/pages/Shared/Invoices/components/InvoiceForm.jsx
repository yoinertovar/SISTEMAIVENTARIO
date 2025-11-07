import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, ShoppingCart, User, Calendar, CreditCard, Percent, Search, CheckCircle, AlertCircle, Package } from 'lucide-react';

/**
 * Modal de búsqueda de productos integrado
 */
const ProductSearchModalIntegrado = ({ isOpen, onClose, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔥 PRODUCTOS DE EJEMPLO - Reemplaza con tu lista
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    setSearchTerm('');
    onClose();
  };

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

        <div className="bg-[#0f1419] p-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            💡 Tip: Escribe el nombre o código del producto para buscarlo rápidamente
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Formulario para crear y editar facturas
 * SIN IVA - CON DESCUENTO - PESOS COLOMBIANOS
 * ✨ NUEVO: Con búsqueda de productos mediante lupita
 * 🔥 MEJORADO: Búsqueda automática al escribir código y presionar Enter
 * 📦 SIN DEPENDENCIAS EXTERNAS - Todo integrado en un solo archivo
 */
const InvoiceForm = ({
  invoiceItems,
  paymentMethod,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onPaymentMethodChange,
  onSaveAndInvoice,
  onCancel,
  subtotal,
  discount,
  onDiscountChange,
  total,
  invoiceData,
  onInvoiceDataChange
}) => {
  
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // 🔥 LISTA DE PRODUCTOS
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

  const findProductByCode = (codigo) => {
    if (!codigo || codigo.trim() === '') return null;
    
    const exactMatch = allProducts.find(
      p => p.codigo.toLowerCase() === codigo.toLowerCase()
    );
    
    if (exactMatch) return exactMatch;
    
    const partialMatch = allProducts.find(
      p => p.codigo.toLowerCase().includes(codigo.toLowerCase())
    );
    
    return partialMatch;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleOpenSearch = (index) => {
    setCurrentItemIndex(index);
    setIsSearchModalOpen(true);
  };

  const handleSelectProduct = (product) => {
    if (currentItemIndex !== null) {
      applyProductToItem(currentItemIndex, product);
    }
  };

  const applyProductToItem = (index, product) => {
    onUpdateItem(index, 'codigo', product.codigo);
    onUpdateItem(index, 'nombre', product.nombre);
    onUpdateItem(index, 'precio', product.precio.toString());
    
    const currentItem = invoiceItems[index];
    const cantidad = currentItem.cantidad && currentItem.cantidad !== '0' 
      ? parseFloat(currentItem.cantidad) 
      : 1;
    
    if (!currentItem.cantidad || currentItem.cantidad === '0') {
      onUpdateItem(index, 'cantidad', '1');
    }
    
    const subtotalItem = product.precio * cantidad;
    onUpdateItem(index, 'subtotal', subtotalItem);
    
    showNotification('success', `✓ Producto "${product.nombre}" agregado`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleKeyDown = (e, index, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const currentItem = invoiceItems[index];
      
      if (field === 'codigo' && currentItem.codigo && currentItem.codigo.trim() !== '') {
        const product = findProductByCode(currentItem.codigo);
        
        if (product) {
          applyProductToItem(index, product);
          
          setTimeout(() => {
            const cantidadInput = document.querySelector(
              `input[data-item-index="${index}"][data-field="cantidad"]`
            );
            if (cantidadInput) {
              cantidadInput.focus();
              cantidadInput.select();
            }
          }, 100);
          return;
        } else {
          showNotification('error', `✗ Código "${currentItem.codigo}" no encontrado. Abriendo búsqueda...`);
          setTimeout(() => {
            handleOpenSearch(index);
          }, 1000);
          return;
        }
      }
      
      const isItemComplete = 
        currentItem.nombre && 
        currentItem.nombre.trim() !== '' &&
        currentItem.precio && 
        parseFloat(currentItem.precio) > 0 &&
        currentItem.cantidad && 
        parseFloat(currentItem.cantidad) > 0;

      if (index === invoiceItems.length - 1 && isItemComplete) {
        onAddItem();
        setTimeout(() => {
          const newItemIndex = invoiceItems.length;
          const firstInput = document.querySelector(`input[data-item-index="${newItemIndex}"][data-field="codigo"]`);
          if (firstInput) {
            firstInput.focus();
          }
        }, 100);
      } else {
        moveToNextField(index, field);
      }
    }
  };

  const moveToNextField = (index, currentField) => {
    const fieldOrder = ['codigo', 'nombre', 'precio', 'cantidad'];
    const currentFieldIndex = fieldOrder.indexOf(currentField);
    
    if (currentFieldIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentFieldIndex + 1];
      const nextInput = document.querySelector(
        `input[data-item-index="${index}"][data-field="${nextField}"]`
      );
      if (nextInput) {
        nextInput.focus();
      }
    } else if (index < invoiceItems.length - 1) {
      const nextInput = document.querySelector(
        `input[data-item-index="${index + 1}"][data-field="codigo"]`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {notification.show && (
          <div className="fixed top-6 right-6 z-50 animate-fadeIn">
            <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl border-2 ${
              notification.type === 'success' 
                ? 'bg-emerald-600 border-emerald-400' 
                : 'bg-red-600 border-red-400'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle size={24} className="text-white" />
              ) : (
                <AlertCircle size={24} className="text-white" />
              )}
              <span className="text-white font-semibold">{notification.message}</span>
            </div>
          </div>
        )}

        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl">
                <ShoppingCart size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Nueva Factura</h1>
                <p className="text-gray-400 text-sm">Completa los datos para generar la factura</p>
              </div>
            </div>
            
            <button
              onClick={onCancel}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Información del Cliente</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Cliente *</label>
              <input
                type="text"
                value={invoiceData.cliente}
                onChange={(e) => onInvoiceDataChange({ ...invoiceData, cliente: e.target.value })}
                placeholder="Nombre del cliente"
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Identificación</label>
              <input
                type="text"
                value={invoiceData.identificacion}
                onChange={(e) => onInvoiceDataChange({ ...invoiceData, identificacion: e.target.value })}
                placeholder="CC o NIT"
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Fecha</label>
              <input
                type="date"
                value={invoiceData.fecha}
                onChange={(e) => onInvoiceDataChange({ ...invoiceData, fecha: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Vendedor</label>
              <input
                type="text"
                value={invoiceData.vendedor}
                onChange={(e) => onInvoiceDataChange({ ...invoiceData, vendedor: e.target.value })}
                placeholder="Nombre del vendedor"
                className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Método de Pago</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'efectivo', label: 'Efectivo', icon: '💵' },
              { value: 'tarjeta', label: 'Tarjeta', icon: '💳' },
              { value: 'transferencia', label: 'Transferencia', icon: '🏦' },
              { value: 'credito', label: 'Crédito', icon: '📄' }
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => onPaymentMethodChange(method.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                  paymentMethod === method.value
                    ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/50'
                    : 'bg-[#0f1419] border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-3xl">{method.icon}</span>
                <span className={`font-semibold ${
                  paymentMethod === method.value ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="text-purple-400" size={24} />
              <div>
                <h2 className="text-xl font-bold text-white">Productos/Servicios</h2>
                <p className="text-gray-400 text-sm mt-1">
                  💡 <strong>Escribe el código y presiona Enter</strong> para completar automáticamente
                </p>
              </div>
            </div>
            <button 
              onClick={onAddItem}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 font-semibold"
            >
              <Plus size={20} />
              <span>Agregar Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-400 font-semibold text-sm">Código</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-semibold text-sm">Descripción *</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-semibold text-sm">Precio *</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-semibold text-sm">Cantidad *</th>
                  <th className="py-3 px-4 text-right text-gray-400 font-semibold text-sm">Subtotal</th>
                  <th className="py-3 px-4 text-center text-gray-400 font-semibold text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={item.codigo}
                          onChange={(e) => onUpdateItem(index, 'codigo', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index, 'codigo')}
                          placeholder="Cód."
                          data-item-index={index}
                          data-field="codigo"
                          className="w-full px-3 py-2 bg-[#0f1419] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none text-sm"
                        />
                        <button
                          onClick={() => handleOpenSearch(index)}
                          className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex-shrink-0"
                          title="Buscar producto"
                          type="button"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.nombre}
                        onChange={(e) => onUpdateItem(index, 'nombre', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'nombre')}
                        placeholder="Descripción del producto"
                        data-item-index={index}
                        data-field="nombre"
                        className="w-full px-3 py-2 bg-[#0f1419] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none text-sm"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.precio}
                        onChange={(e) => onUpdateItem(index, 'precio', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'precio')}
                        placeholder="0"
                        data-item-index={index}
                        data-field="precio"
                        className="w-full px-3 py-2 bg-[#0f1419] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none text-sm"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => onUpdateItem(index, 'cantidad', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index, 'cantidad')}
                        placeholder="0"
                        data-item-index={index}
                        data-field="cantidad"
                        className="w-full px-3 py-2 bg-[#0f1419] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none text-sm"
                        min="0"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-white font-semibold">{formatCurrency(item.subtotal || 0)}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                        title="Eliminar item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Notas Adicionales</h3>
            <textarea
              placeholder="Agrega notas o comentarios adicionales sobre la factura..."
              rows="6"
              className="w-full px-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500 resize-none"
            />
          </div>

          <div className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3a] p-6 rounded-xl shadow-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Resumen de Factura</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-semibold text-lg">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-amber-600/20 rounded-lg">
                    <Percent size={20} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-400 text-sm font-semibold mb-1">
                      Descuento (Opcional)
                    </label>
                    <p className="text-xs text-gray-500">Ingresa el monto a descontar</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => onDiscountChange(e.target.value)}
                    placeholder="0"
                    min="0"
                    max={subtotal}
                    step="1000"
                    className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-amber-600/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none text-lg font-semibold"
                  />
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-xs text-amber-400">
                    ✓ Aplicando descuento de {formatCurrency(discount)}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center py-3 bg-purple-600/20 rounded-lg px-4 mt-4">
                <span className="text-purple-300 font-bold text-xl">TOTAL:</span>
                <span className="text-white font-bold text-2xl">{formatCurrency(total)}</span>
              </div>

              <div className="text-xs text-gray-500 text-center mt-2">
                💡 Los precios están en Pesos Colombianos (COP)
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={onSaveAndInvoice}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/50 font-semibold"
              >
                <Save size={20} />
                <span>Generar Factura</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductSearchModalIntegrado
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvoiceForm;