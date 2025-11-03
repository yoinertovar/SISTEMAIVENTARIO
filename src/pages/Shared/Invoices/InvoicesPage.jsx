import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceStats from './components/InvoiceStats';
import InvoiceEmptyState from './components/InvoiceEmptyState';
import { FileText, Plus, Search, Download, AlertCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

/**
 * Página principal de gestión de facturas
 * SIN IVA - CON DESCUENTO - PESOS COLOMBIANOS
 */
const InvoicesPage = () => {
  // ==================== FUNCIÓN AUXILIAR PARA FECHA LOCAL ====================
  /**
   * Obtiene la fecha actual en formato YYYY-MM-DD en la zona horaria local
   * Evita problemas de conversión a UTC que pueden cambiar la fecha
   */
  const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // ==================== ESTADOS DE NAVEGACIÓN ====================
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ==================== ESTADO DE ITEMS DE FACTURA ====================
  const [invoiceItems, setInvoiceItems] = useState([
    { codigo: '', nombre: '', precio: '', cantidad: '', subtotal: 0 }
  ]);

  // ==================== ESTADO DE DESCUENTO ====================
  const [discount, setDiscount] = useState(0);

  // ==================== DATOS BÁSICOS DE FACTURA ====================
  const [invoiceData, setInvoiceData] = useState({
    cliente: '',
    fecha: getLocalDate(),
    vendedor: 'Admin',
    identificacion: '',
    paymentMethod: 'efectivo',
    paymentType: 'efectivo'
  });

  // ==================== ESTADOS DE PAGO ====================
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [paymentType, setPaymentType] = useState('efectivo');

  // ==================== ESTADO DE FACTURAS Y ERRORES ====================
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // ==================== EFECTOS ====================
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
    console.log('💾 Facturas guardadas en localStorage:', invoices.length);
  }, [invoices]);

  useEffect(() => {
    setInvoiceData(prev => ({
      ...prev,
      paymentMethod: paymentMethod,
      paymentType: paymentType
    }));
  }, [paymentMethod, paymentType]);

  // ==================== FUNCIONES DE GESTIÓN DE ITEMS ====================
  const addItem = () => {
    setInvoiceItems([...invoiceItems, { 
      codigo: '', 
      nombre: '', 
      precio: '', 
      cantidad: '', 
      subtotal: 0 
    }]);
  };

  const removeItem = (index) => {
    if (invoiceItems.length > 1) {
      const newItems = invoiceItems.filter((_, i) => i !== index);
      setInvoiceItems(newItems);
    } else {
      setError('Debe haber al menos un item en la factura');
      setTimeout(() => setError(null), 3000);
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = value;
    
    if (field === 'precio' || field === 'cantidad') {
      const precio = parseFloat(newItems[index].precio) || 0;
      const cantidad = parseFloat(newItems[index].cantidad) || 0;
      newItems[index].subtotal = precio * cantidad;
    }
    
    setInvoiceItems(newItems);
  };

  // ==================== FUNCIONES DE CÁLCULO ====================
  const calculateSubtotal = () => 
    invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);

  const calculateDiscount = () => parseFloat(discount) || 0;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount();
    return Math.max(0, subtotal - discountAmount); // No puede ser negativo
  };

  // ==================== FUNCIONES DE GESTIÓN DE FACTURAS ====================
  const handleSaveAndInvoice = () => {
    if (!invoiceData.cliente || invoiceData.cliente.trim() === '') {
      setError('Debe ingresar el nombre del cliente');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const validItems = invoiceItems.filter(item => 
      item.nombre && item.nombre.trim() !== '' && 
      item.precio && parseFloat(item.precio) > 0 && 
      item.cantidad && parseFloat(item.cantidad) > 0
    );

    if (validItems.length === 0) {
      setError('Debe agregar al menos un item válido');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setInvoiceItems(validItems);
    setInvoiceData(prev => ({
      ...prev,
      paymentMethod: paymentMethod,
      paymentType: paymentType
    }));

    setTimeout(() => {
      setShowNewInvoice(false);
      setShowPreview(true);
    }, 0);
  };

  const handleSaveInvoiceToDatabase = (invoiceData) => {
    try {
      const newInvoice = {
        ...invoiceData,
        id: invoiceData.id || `F-${String(Date.now()).slice(-8)}`,
        createdAt: new Date().toISOString(),
        fecha: invoiceData.fecha ? invoiceData.fecha.split('T')[0] : getLocalDate(),
        estado: 'Pagada',
        discount: calculateDiscount() // Guardar el descuento
      };

      setInvoices(prev => [newInvoice, ...prev]);
      resetForm();
      
      console.log('✅ Factura guardada:', newInvoice);
      return newInvoice;
    } catch (err) {
      setError('Error al guardar la factura: ' + err.message);
      console.error(err);
      return null;
    }
  };

  const resetForm = () => {
    setInvoiceItems([{ codigo: '', nombre: '', precio: '', cantidad: '', subtotal: 0 }]);
    setDiscount(0); // Resetear descuento
    setInvoiceData({
      cliente: '',
      fecha: getLocalDate(),
      vendedor: 'Admin',
      identificacion: '',
      paymentMethod: 'efectivo',
      paymentType: 'efectivo'
    });
    setPaymentMethod('efectivo');
    setPaymentType('efectivo');
    setShowPreview(false);
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowNewInvoice(false);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pagada':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Pendiente':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'Anulada':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  // ==================== FUNCIONES DE FILTRADO ====================
  const getFilteredInvoices = () => {
    return invoices.filter(invoice => {
      const matchesSearch = 
        invoice.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.includes(searchTerm);
      
      let invoiceDateStr = invoice.fecha;
      if (invoiceDateStr && !invoiceDateStr.includes('-')) {
        invoiceDateStr = invoice.createdAt;
      }
      
      const invoiceDate = new Date(invoiceDateStr);
      const from = filterDateFrom ? new Date(filterDateFrom + 'T00:00:00') : null;
      const to = filterDateTo ? new Date(filterDateTo + 'T23:59:59') : null;
      
      const isValidDate = !isNaN(invoiceDate.getTime());
      if (!isValidDate) {
        console.warn('Fecha inválida en factura:', invoice);
        return matchesSearch;
      }

      const matchesDateRange = 
        (!from || invoiceDate >= from) && 
        (!to || invoiceDate <= to);

      return matchesSearch && matchesDateRange;
    });
  };

  // ==================== FUNCIONES DE IMPRESIÓN ====================
  const generatePrintableInvoiceHTML = (invoice) => {
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value);
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    };

    const translatePaymentMethod = (method) => {
      const translations = {
        'efectivo': 'Efectivo',
        'tarjeta': 'Tarjeta',
        'transferencia': 'Transferencia',
        'credito': 'Crédito'
      };
      return translations[method] || method;
    };

    const generateBarcode = (invoiceId) => {
      return invoiceId.replace(/\D/g, '').padStart(13, '0');
    };

    const barcodeSVG = generateBarcode(invoice.id)
      .split('')
      .map((digit, index) => {
        const width = parseInt(digit) % 2 === 0 ? "3" : "2";
        return `<rect x="${index * 19}" y="0" width="${width}" height="50" fill="black"/>`;
      })
      .join('');

    const itemsRows = (invoice.items || [])
      .map(
        (item) => `
        <tr>
          <td>${item.codigo || 'N/A'}</td>
          <td><strong>${item.nombre}</strong></td>
          <td style="text-align: center">${item.cantidad}</td>
          <td style="text-align: right">${formatCurrency(item.precio)}</td>
          <td style="text-align: right"><strong>${formatCurrency(item.subtotal)}</strong></td>
        </tr>
      `
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Factura ${invoice.id}</title>
          <meta charset="utf-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background: white;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 30px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: start;
              border-bottom: 4px solid #9333ea;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .company-info h1 {
              color: #9333ea;
              font-size: 32px;
              margin-bottom: 10px;
            }
            .company-info p {
              color: #666;
              margin: 2px 0;
            }
            .invoice-info {
              text-align: right;
            }
            .invoice-number {
              background: #f3e8ff;
              padding: 10px 15px;
              border-radius: 8px;
              display: inline-block;
              margin-bottom: 10px;
            }
            .invoice-number p:first-child {
              font-size: 12px;
              color: #666;
            }
            .invoice-number p:last-child {
              font-size: 24px;
              font-weight: bold;
              color: #9333ea;
            }
            .client-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              background: #f9fafb;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .client-section h3 {
              font-size: 12px;
              color: #666;
              margin-bottom: 10px;
              font-weight: 600;
            }
            .client-section p {
              margin: 5px 0;
              font-size: 14px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items-table thead {
              background: #9333ea;
              color: white;
            }
            .items-table th,
            .items-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #e5e7eb;
            }
            .items-table th {
              font-size: 12px;
              font-weight: 600;
            }
            .items-table td {
              font-size: 14px;
            }
            .items-table tbody tr:hover {
              background: #f9fafb;
            }
            .totals-section {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 20px;
            }
            .totals {
              width: 350px;
              background: #f9fafb;
              padding: 15px;
              border-radius: 8px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .total-row:last-child {
              border-top: 2px solid #9333ea;
              border-bottom: none;
              margin-top: 8px;
              padding-top: 12px;
            }
            .total-row.final {
              font-size: 20px;
              font-weight: bold;
              color: #9333ea;
            }
            .barcode-section {
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
              margin-top: 20px;
            }
            .barcode {
              margin: 10px auto 20px;
            }
            .footer-info {
              font-size: 10px;
              color: #666;
              line-height: 1.6;
            }
            .footer-info p {
              margin: 3px 0;
            }
            .footer-info .important {
              color: #dc2626;
              font-weight: 600;
            }
            @media print {
              body {
                padding: 0;
              }
              .invoice-container {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="company-info">
                <h1>TU EMPRESA</h1>
                <p>NIT: 900.XXX.XXX-X</p>
                <p>Dirección: Calle XX #XX-XX</p>
                <p>Teléfono: (XXX) XXX-XXXX</p>
                <p>Ciudad, Colombia</p>
              </div>
              
              <div class="invoice-info">
                <div class="invoice-number">
                  <p>FACTURA DE VENTA</p>
                  <p>${invoice.id}</p>
                </div>
                <p>Fecha: ${formatDate(invoice.fecha || invoice.createdAt)}</p>
                ${invoice.hora ? `<p>Hora: ${invoice.hora}</p>` : ''}
              </div>
            </div>

            <div class="client-section">
              <div>
                <h3>INFORMACIÓN DEL CLIENTE</h3>
                <p><strong>${invoice.cliente || 'Cliente General'}</strong></p>
                <p>CC/NIT: ${invoice.identificacion || 'N/A'}</p>
              </div>
              
              <div>
                <h3>INFORMACIÓN DE PAGO</h3>
                <p>Método: ${translatePaymentMethod(invoice.paymentMethod)}</p>
                <p>Vendedor: ${invoice.vendedor || 'Admin'}</p>
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>DESCRIPCIÓN</th>
                  <th style="text-align: center">CANT.</th>
                  <th style="text-align: right">PRECIO</th>
                  <th style="text-align: right">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="totals">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <strong>${formatCurrency(invoice.subtotal)}</strong>
                </div>
                
                ${
                  invoice.discount > 0
                    ? `
                <div class="total-row">
                  <span>Descuento:</span>
                  <strong style="color: #dc2626">-${formatCurrency(invoice.discount)}</strong>
                </div>
                `
                    : ''
                }
                
                <div class="total-row final">
                  <span>TOTAL:</span>
                  <span>${formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>

            <div class="barcode-section">
              <div class="barcode">
                <svg width="250" height="60">
                  ${barcodeSVG}
                </svg>
                <p style="font-family: monospace; font-size: 12px; margin-top: 5px">
                  ${generateBarcode(invoice.id)}
                </p>
              </div>
              
              <div class="footer-info">
                <p><strong>GRACIAS POR SU COMPRA</strong></p>
                <p>Régimen común - No somos grandes contribuyentes</p>
                <p>Resolución DIAN No. XXXX del XX de XXXX de 20XX</p>
                <p>Rango autorizado: Del F-XXXXXXXX al F-XXXXXXXX</p>
                <p class="important">Esta factura es válida para efectos tributarios</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleQuickPrint = (invoice) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    
    if (printWindow) {
      printWindow.document.write(generatePrintableInvoiceHTML(invoice));
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleQuickExportPDF = async (invoice) => {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generatePrintableInvoiceHTML(invoice);
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      const invoiceContent = tempDiv.querySelector('.invoice-container');
      
      if (invoiceContent) {
        const opt = {
          margin: 0.5,
          filename: `Factura_${invoice.id}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        await html2pdf()
          .set(opt)
          .from(invoiceContent)
          .save();
        
        document.body.removeChild(tempDiv);
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setError('Error al generar el PDF');
      setTimeout(() => setError(null), 3000);
    }
  };

  // ==================== RENDERIZADO ====================
  if (showPreview) {
    return (
      <InvoicePreview
        invoiceData={invoiceData}
        invoiceItems={invoiceItems}
        subtotal={calculateSubtotal()}
        discount={calculateDiscount()}
        total={calculateTotal()}
        onClose={() => {
          setShowPreview(false);
          setShowNewInvoice(false);
        }}
        onSaveInvoice={handleSaveInvoiceToDatabase}
      />
    );
  }

  if (showNewInvoice) {
    return (
      <InvoiceForm
        invoiceItems={invoiceItems}
        paymentMethod={paymentMethod}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
        onPaymentMethodChange={setPaymentMethod}
        onSaveAndInvoice={handleSaveAndInvoice}
        onCancel={handleCancel}
        subtotal={calculateSubtotal()}
        discount={discount}
        onDiscountChange={setDiscount}
        total={calculateTotal()}
        invoiceData={invoiceData}
        onInvoiceDataChange={setInvoiceData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Mensajes de Error y Éxito */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center space-x-3">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}


        {/* Header */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg">
                <FileText size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gestión de Facturas</h1>
                <p className="text-gray-400 text-sm">Genera, administra e imprime facturas profesionales</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewInvoice(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-medium"
            >
              <Plus size={20} />
              <span>Nueva Factura</span>
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <InvoiceStats invoices={invoices} />

        {/* Búsqueda y filtros */}
        <div className="bg-[#1a1f2e] p-4 rounded-xl shadow-xl border border-gray-800 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Buscar por cliente o número de factura..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-500 transition-all"
              />
            </div>
            <button className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-300 shadow-lg">
              <Download size={20} />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="bg-[#0f1419] text-gray-300 px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all text-sm"
              placeholder="Desde"
            />
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="bg-[#0f1419] text-gray-300 px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all text-sm"
              placeholder="Hasta"
            />
          </div>
        </div>

        {/* Lista y Detalle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {getFilteredInvoices().length > 0 ? (
              <InvoiceList
                invoices={getFilteredInvoices()}
                onInvoiceSelect={setSelectedInvoice}
                getEstadoColor={getEstadoColor}
                onPrintInvoice={handleQuickPrint}
                onExportPDF={handleQuickExportPDF}
              />
            ) : (
              <InvoiceEmptyState />
            )}
          </div>

          <div className="lg:col-span-1">
            <InvoiceDetail
              selectedInvoice={selectedInvoice}
              getEstadoColor={getEstadoColor}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            Total de facturas: <span className="font-bold text-white">{invoices.length}</span> | 
            Facturas mostradas: <span className="font-bold text-white">{getFilteredInvoices().length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;