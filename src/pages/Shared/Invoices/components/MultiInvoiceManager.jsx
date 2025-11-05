import React, { useState } from 'react';
import { X, Minus, Maximize2, Plus } from 'lucide-react';
import InvoiceForm from './InvoiceForm';

/**
 * Gestor de múltiples facturas con sistema de pestañas
 * Permite abrir, minimizar y cerrar múltiples facturas simultáneamente
 */
const MultiInvoiceManager = ({
  onSaveInvoice,
  onCancel
}) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [nextTabId, setNextTabId] = useState(1);

  /**
   * Obtiene la fecha actual en formato YYYY-MM-DD
   */
  const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Crea un estado inicial de factura vacía
   */
  const createInitialInvoiceState = () => ({
    invoiceItems: [{ codigo: '', nombre: '', precio: '', cantidad: '', subtotal: 0 }],
    discount: 0,
    invoiceData: {
      cliente: '',
      fecha: getLocalDate(),
      vendedor: 'Admin',
      identificacion: '',
      paymentMethod: 'efectivo',
      paymentType: 'efectivo'
    },
    paymentMethod: 'efectivo',
    paymentType: 'efectivo'
  });

  /**
   * Crea una nueva pestaña de factura
   */
  const createNewTab = () => {
    const newTab = {
      id: nextTabId,
      name: `Factura #${nextTabId}`,
      isMinimized: false,
      state: createInitialInvoiceState()
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
    setNextTabId(prev => prev + 1);
  };

  /**
   * Cierra una pestaña específica
   */
  const closeTab = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    
    // Preguntar confirmación si hay datos en la factura
    const hasData = tab.state.invoiceData.cliente || 
                    tab.state.invoiceItems.some(item => item.nombre);
    
    if (hasData) {
      if (!window.confirm('¿Estás seguro de cerrar esta factura? Se perderán los datos no guardados.')) {
        return;
      }
    }

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    
    // Si se cierra la pestaña activa, activar otra
    if (activeTab === tabId) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      } else {
        setActiveTab(null);
      }
    }
  };

  /**
   * Minimiza/maximiza una pestaña
   */
  const toggleMinimize = (tabId) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, isMinimized: !tab.isMinimized }
        : tab
    ));

    // Si se minimiza la pestaña activa, desactivarla
    if (activeTab === tabId) {
      const tab = tabs.find(t => t.id === tabId);
      if (!tab.isMinimized) {
        setActiveTab(null);
      }
    }
  };

  /**
   * Activa una pestaña específica
   */
  const activateTab = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab && tab.isMinimized) {
      toggleMinimize(tabId);
    }
    setActiveTab(tabId);
  };

  /**
   * Actualiza el estado de una pestaña específica
   */
  const updateTabState = (tabId, updates) => {
    setTabs(prev => prev.map(tab =>
      tab.id === tabId
        ? { ...tab, state: { ...tab.state, ...updates } }
        : tab
    ));
  };

  /**
   * Maneja el guardado de una factura
   */
  const handleSaveInvoice = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    const { state } = tab;
    
    // Validaciones
    if (!state.invoiceData.cliente || state.invoiceData.cliente.trim() === '') {
      alert('Debe ingresar el nombre del cliente');
      return;
    }

    const validItems = state.invoiceItems.filter(item => 
      item.nombre && item.nombre.trim() !== '' && 
      item.precio && parseFloat(item.precio) > 0 && 
      item.cantidad && parseFloat(item.cantidad) > 0
    );

    if (validItems.length === 0) {
      alert('Debe agregar al menos un item válido');
      return;
    }

    // Calcular totales
    const subtotal = validItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const discountAmount = parseFloat(state.discount) || 0;
    const total = Math.max(0, subtotal - discountAmount);

    // Crear objeto de factura
    const invoiceToSave = {
      ...state.invoiceData,
      items: validItems,
      subtotal,
      discount: discountAmount,
      tax: 0,
      total,
      paymentMethod: state.paymentMethod
    };

    // Llamar al callback de guardar
    onSaveInvoice(invoiceToSave);

    // Cerrar la pestaña después de guardar
    closeTab(tabId);
  };

  /**
   * Renderiza una pestaña de factura
   */
  const renderTab = (tab) => {
    const isActive = activeTab === tab.id && !tab.isMinimized;

    if (!isActive) return null;

    const { state } = tab;
    const subtotal = state.invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const total = Math.max(0, subtotal - (parseFloat(state.discount) || 0));

    return (
      <div key={tab.id} className="min-h-screen">
        <InvoiceForm
          invoiceItems={state.invoiceItems}
          paymentMethod={state.paymentMethod}
          onAddItem={() => {
            const newItems = [...state.invoiceItems, { 
              codigo: '', 
              nombre: '', 
              precio: '', 
              cantidad: '', 
              subtotal: 0 
            }];
            updateTabState(tab.id, { invoiceItems: newItems });
          }}
          onRemoveItem={(index) => {
            if (state.invoiceItems.length > 1) {
              const newItems = state.invoiceItems.filter((_, i) => i !== index);
              updateTabState(tab.id, { invoiceItems: newItems });
            }
          }}
          onUpdateItem={(index, field, value) => {
            const newItems = [...state.invoiceItems];
            newItems[index][field] = value;
            
            if (field === 'precio' || field === 'cantidad') {
              const precio = parseFloat(newItems[index].precio) || 0;
              const cantidad = parseFloat(newItems[index].cantidad) || 0;
              newItems[index].subtotal = precio * cantidad;
            }
            
            updateTabState(tab.id, { invoiceItems: newItems });
          }}
          onPaymentMethodChange={(method) => {
            updateTabState(tab.id, { 
              paymentMethod: method,
              paymentType: method
            });
          }}
          onSaveAndInvoice={() => handleSaveInvoice(tab.id)}
          onCancel={() => closeTab(tab.id)}
          subtotal={subtotal}
          discount={state.discount}
          onDiscountChange={(value) => {
            updateTabState(tab.id, { discount: value });
          }}
          total={total}
          invoiceData={state.invoiceData}
          onInvoiceDataChange={(data) => {
            updateTabState(tab.id, { invoiceData: data });
          }}
        />
      </div>
    );
  };

  // Si no hay pestañas, mostrar botón para crear nueva
  if (tabs.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-6">
        <div className="text-center">
          <button
            onClick={createNewTab}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/50 font-semibold text-lg"
          >
            <Plus size={24} />
            <span>Nueva Factura</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419]">
      {/* Barra de pestañas */}
      <div className="sticky top-0 z-50 bg-[#1a1f2e] border-b border-gray-800 shadow-lg">
        <div className="flex items-center overflow-x-auto p-2 space-x-2">
          {/* Pestañas existentes */}
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer flex-shrink-0 ${
                activeTab === tab.id && !tab.isMinimized
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : tab.isMinimized
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => activateTab(tab.id)}
            >
              <span className="font-semibold text-sm whitespace-nowrap">
                {tab.state.invoiceData.cliente || tab.name}
              </span>
              
              <div className="flex items-center space-x-1">
                {/* Botón minimizar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize(tab.id);
                  }}
                  className="p-1 hover:bg-white/20 rounded transition-all"
                  title={tab.isMinimized ? "Maximizar" : "Minimizar"}
                >
                  {tab.isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
                </button>
                
                {/* Botón cerrar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="p-1 hover:bg-red-500/50 rounded transition-all"
                  title="Cerrar"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Botón nueva pestaña */}
          <button
            onClick={createNewTab}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 flex-shrink-0"
            title="Nueva factura"
          >
            <Plus size={16} />
            <span className="text-sm font-semibold">Nueva</span>
          </button>

          {/* Botón cerrar todo */}
          {tabs.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('¿Cerrar todas las facturas abiertas?')) {
                  setTabs([]);
                  setActiveTab(null);
                  if (onCancel) onCancel();
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 flex-shrink-0"
              title="Cerrar todas las facturas"
            >
              <X size={16} />
              <span className="text-sm font-semibold">Cerrar Todo</span>
            </button>
          )}
        </div>
      </div>

      {/* Contenido de la pestaña activa */}
      <div>
        {tabs.map(tab => renderTab(tab))}
      </div>

      {/* Mensaje cuando todas están minimizadas */}
      {activeTab === null && tabs.some(t => t.isMinimized) && (
        <div className="flex items-center justify-center min-h-[80vh] text-gray-400">
          <div className="text-center">
            <p className="text-lg mb-2">📋 Todas las facturas están minimizadas</p>
            <p className="text-sm">Haz clic en una pestaña para maximizarla</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiInvoiceManager;