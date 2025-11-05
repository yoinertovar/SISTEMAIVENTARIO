import React, { useState, useEffect } from 'react';
import MultiInvoiceManager from './components/MultiInvoiceManager';
import InvoicePreview from './components/InvoicePreview';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceStats from './components/InvoiceStats';
import InvoiceEmptyState from './components/InvoiceEmptyState';
import { FileText, Plus, Search, Download, AlertCircle, CheckCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

/**
 * Página principal de gestión de facturas
 * CON SISTEMA DE MÚLTIPLES FACTURAS - SIN IVA - CON DESCUENTO - PESOS COLOMBIANOS
 */
const InvoicesPage = () => {
  // ==================== FUNCIÓN AUXILIAR PARA FECHA LOCAL ====================
  const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // ==================== ESTADOS DE NAVEGACIÓN ====================
  const [showMultiInvoice, setShowMultiInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ==================== ESTADO DE FACTURAS Y FILTROS ====================
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // ==================== EFECTOS ====================
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
    console.log('💾 Facturas guardadas en localStorage:', invoices.length);
  }, [invoices]);

  // ==================== FUNCIÓN PARA GUARDAR FACTURA ====================
  /**
   * Guarda una nueva factura en la base de datos (localStorage)
   * También se llama automáticamente al imprimir/exportar
   */
  const handleSaveInvoiceToDatabase = (invoiceData, options = {}) => {
    try {
      const newInvoice = {
        ...invoiceData,
        id: invoiceData.id || `F-${String(Date.now()).slice(-8)}`,
        createdAt: new Date().toISOString(),
        fecha: invoiceData.fecha ? invoiceData.fecha.split('T')[0] : getLocalDate(),
        estado: 'Pagada'
      };

      // Verificar si la factura ya existe (al imprimir/exportar)
      const existingIndex = invoices.findIndex(inv => inv.id === newInvoice.id);
      
      if (existingIndex >= 0) {
        // Actualizar factura existente
        setInvoices(prev => prev.map((inv, idx) => 
          idx === existingIndex ? newInvoice : inv
        ));
        
        if (!options.silent) {
          setSuccess('Factura actualizada correctamente');
          setTimeout(() => setSuccess(null), 3000);
        }
      } else {
        // Agregar nueva factura
        setInvoices(prev => [newInvoice, ...prev]);
        
        if (!options.silent) {
          setSuccess('Factura guardada correctamente');
          setTimeout(() => setSuccess(null), 3000);
        }
      }

      console.log('✅ Factura guardada:', newInvoice);
      return newInvoice;
    } catch (err) {
      setError('Error al guardar la factura: ' + err.message);
      console.error(err);
      setTimeout(() => setError(null), 3000);
      return null;
    }
  };

  // ==================== FUNCIÓN PARA ELIMINAR FACTURA ====================
  /**
   * Elimina una factura de la lista
   */
  const handleDeleteInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    
    // Si la factura eliminada estaba seleccionada, limpiar la selección
    if (selectedInvoice && selectedInvoice.id === invoiceId) {
      setSelectedInvoice(null);
    }

    setSuccess('Factura eliminada correctamente');
    setTimeout(() => setSuccess(null), 3000);
    
    console.log('🗑️ Factura eliminada:', invoiceId);
  };

  // ==================== FUNCIONES DE FILTRADO ====================
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

  // ==================== FUNCIONES DE IMPRESIÓN Y PDF ====================
  /**
   * Convierte una fecha en formato YYYY-MM-DD a fecha local
   */
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    
    return new Date(dateString);
  };

  /**
   * Genera el contenido HTML para imprimir una factura
   */
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
      const date = parseLocalDate(dateString);
      if (!date || isNaN(date.getTime())) return 'N/A';
      
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
        'credito': 'Crédito',
        'nequi': 'Nequi',
        'daviplata': 'Daviplata'
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

  /**
   * Maneja la impresión rápida de una factura
   * MEJORA: Guarda la factura automáticamente si no existe
   */
  const handleQuickPrint = (invoice) => {
    // Guardar automáticamente si la factura no está en la lista
    const exists = invoices.some(inv => inv.id === invoice.id);
    if (!exists) {
      handleSaveInvoiceToDatabase(invoice, { silent: true });
    }

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

  /**
   * Maneja la exportación rápida a PDF de una factura
   * MEJORA: Guarda la factura automáticamente si no existe
   */
  const handleQuickExportPDF = (invoice) => {
    // Guardar automáticamente si la factura no está en la lista
    const exists = invoices.some(inv => inv.id === invoice.id);
    if (!exists) {
      handleSaveInvoiceToDatabase(invoice, { silent: true });
    }

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
      
      html2pdf()
        .set(opt)
        .from(invoiceContent)
        .save()
        .then(() => {
          document.body.removeChild(tempDiv);
        })
        .catch((error) => {
          console.error('Error al generar PDF:', error);
          document.body.removeChild(tempDiv);
        });
    }
  };

  // ==================== RENDERIZADO ====================
  if (showMultiInvoice) {
    return (
      <MultiInvoiceManager
        onSaveInvoice={(invoiceData) => {
          handleSaveInvoiceToDatabase(invoiceData);
          setShowMultiInvoice(false);
        }}
        onCancel={() => setShowMultiInvoice(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Mensajes de Error y Éxito */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center space-x-3 animate-fade-in">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-6 py-4 rounded-xl flex items-center space-x-3 animate-fade-in">
            <CheckCircle size={20} />
            <span>{success}</span>
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
                <p className="text-gray-400 text-sm">Genera, administra e imprime facturas profesionales con múltiples pestañas</p>
              </div>
            </div>
            <button 
              onClick={() => setShowMultiInvoice(true)}
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
                onDeleteInvoice={handleDeleteInvoice}
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

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvoicesPage;