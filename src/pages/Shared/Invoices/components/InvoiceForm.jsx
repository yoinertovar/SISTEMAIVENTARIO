import React from 'react';
import { Plus, Trash2, Save, X, ShoppingCart, User, Calendar, CreditCard, Percent } from 'lucide-react';

/**
 * Formulario para crear y editar facturas
 * SIN IVA - CON DESCUENTO - PESOS COLOMBIANOS
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
  
  /**
   * Formatea valores monetarios en pesos colombianos
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  /**
   * Maneja el evento de presionar Enter en los campos del item
   */
  const handleKeyDown = (e, index, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const currentItem = invoiceItems[index];
      
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
        
        {/* Header */}
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

        {/* Información del Cliente */}
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

        {/* Método de Pago */}
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
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  paymentMethod === method.value
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-[#0f1419] border-gray-700 text-gray-400 hover:border-purple-500'
                }`}
              >
                <div className="text-2xl mb-2">{method.icon}</div>
                <div className="font-semibold">{method.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Items de la Factura */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Productos/Servicios</h2>
              <p className="text-gray-400 text-xs mt-1">
                💡 Presiona <kbd className="px-2 py-1 bg-purple-600/20 rounded text-purple-300 text-xs">Enter</kbd> para agregar un nuevo producto automáticamente
              </p>
            </div>
            <button
              onClick={onAddItem}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-300 shadow-lg"
            >
              <Plus size={18} />
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

        {/* Resumen y Totales */}
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
              {/* Subtotal */}
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-semibold text-lg">{formatCurrency(subtotal)}</span>
              </div>
              
              {/* Campo de Descuento */}
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
              
              {/* Total Final */}
              <div className="flex justify-between items-center py-3 bg-purple-600/20 rounded-lg px-4 mt-4">
                <span className="text-purple-300 font-bold text-xl">TOTAL:</span>
                <span className="text-white font-bold text-2xl">{formatCurrency(total)}</span>
              </div>

              {/* Información adicional */}
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
    </div>
  );
};

export default InvoiceForm;