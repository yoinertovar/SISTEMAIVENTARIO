import React, { useRef, useState } from 'react';
import { FileText, User, Calendar, CreditCard, Package, DollarSign, Printer, Download, Loader } from 'lucide-react';
import html2pdf from 'html2pdf.js';

/**
 * Componente que muestra los detalles completos de una factura seleccionada
 * Incluye opciones para reimprimir y exportar como PDF con indicador de progreso
 */
const InvoiceDetail = ({ selectedInvoice, getEstadoColor }) => {
  const printableRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');
  
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
   * CORREGIDO: Convierte una fecha en formato YYYY-MM-DD a fecha local
   * Evita problemas de zona horaria UTC que cambian el día
   */
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    
    // Si es solo una fecha (YYYY-MM-DD), crear como fecha local
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    
    // Si incluye hora, usar normalmente
    return new Date(dateString);
  };

  /**
   * CORREGIDO: Formatea solo la fecha
   */
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

  /**
   * Traduce método de pago
   */
  const translatePaymentMethod = (method) => {
    const translations = {
      'efectivo': 'Efectivo',
      'tarjeta': 'Tarjeta',
      'transferencia': 'Transferencia',
      'credito': 'Crédito'
    };
    return translations[method] || method;
  };

  /**
   * Genera el código de barras simulado
   */
  const generateBarcode = (invoiceId) => {
    return invoiceId.replace(/\D/g, '').padStart(13, '0');
  };

  /**
   * Maneja la impresión de la factura
   */
  const handlePrint = () => {
    if (!selectedInvoice) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    const printContent = printableRef.current;
    
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura ${selectedInvoice.id}</title>
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
              .total-in-words {
                background: #f3e8ff;
                padding: 10px;
                border-radius: 8px;
                margin-top: 10px;
              }
              .total-in-words p:first-child {
                font-size: 10px;
                color: #666;
                margin-bottom: 3px;
              }
              .total-in-words p:last-child {
                font-size: 12px;
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
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  /**
   * Maneja la exportación a PDF
   */
  const handleExportPDF = async () => {
    if (!selectedInvoice || !printableRef.current) return;

    try {
      setIsGeneratingPDF(true);
      setPdfProgress('Preparando documento...');

      const element = printableRef.current;
      const opt = {
        margin: 0.5,
        filename: `Factura_${selectedInvoice.id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      setPdfProgress('Generando PDF...');
      await html2pdf().set(opt).from(element).save();
      
      setPdfProgress('¡PDF generado exitosamente!');
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress('');
      }, 2000);

    } catch (error) {
      console.error('Error al generar PDF:', error);
      setPdfProgress('Error al generar el PDF');
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress('');
      }, 3000);
    }
  };

  if (!selectedInvoice) {
    return (
      <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 p-8 h-full">
        <div className="text-center text-gray-500">
          <FileText size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg">Selecciona una factura para ver sus detalles</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-800 overflow-hidden">
        {/* Header con botones de acción */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-900/30 to-purple-800/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600/30 rounded-lg">
                <FileText size={24} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Detalles de Factura</h2>
                <p className="text-sm text-gray-400">{selectedInvoice.id}</p>
              </div>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getEstadoColor(selectedInvoice.estado)}`}>
              {selectedInvoice.estado}
            </span>
          </div>

          {/* Botones de Acción */}
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              disabled={isGeneratingPDF}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer size={18} />
              <span>Imprimir</span>
            </button>
            
            <button
              onClick={handleExportPDF}
              disabled={isGeneratingPDF}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Exportar PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Indicador de progreso */}
          {pdfProgress && (
            <div className="mt-3 text-center text-sm text-purple-300">
              {pdfProgress}
            </div>
          )}
        </div>

        {/* Contenido de la factura */}
        <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {/* Cliente */}
          <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-2 mb-3">
              <User size={18} className="text-purple-400" />
              <h3 className="text-white font-semibold">Cliente</h3>
            </div>
            <p className="text-white font-bold text-lg mb-2">{selectedInvoice.cliente}</p>
            {selectedInvoice.identificacion && (
              <p className="text-gray-400 text-sm">CC/NIT: {selectedInvoice.identificacion}</p>
            )}
          </div>

          {/* Información General */}
          <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar size={18} className="text-purple-400" />
              <h3 className="text-white font-semibold">Información</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Fecha:</span>
                <span className="text-white font-medium">{formatDate(selectedInvoice.fecha || selectedInvoice.createdAt)}</span>
              </div>
              {selectedInvoice.hora && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Hora:</span>
                  <span className="text-white font-medium">{selectedInvoice.hora}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Vendedor:</span>
                <span className="text-white font-medium">{selectedInvoice.vendedor || 'Admin'}</span>
              </div>
            </div>
          </div>

          {/* Método de Pago */}
          <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-2 mb-3">
              <CreditCard size={18} className="text-purple-400" />
              <h3 className="text-white font-semibold">Método de Pago</h3>
            </div>
            <p className="text-white font-medium">
              {translatePaymentMethod(selectedInvoice.paymentMethod || selectedInvoice.paymentType)}
            </p>
          </div>

          {/* Productos */}
          {selectedInvoice.items && selectedInvoice.items.length > 0 && (
            <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-800">
              <div className="flex items-center space-x-2 mb-3">
                <Package size={18} className="text-purple-400" />
                <h3 className="text-white font-semibold">Productos</h3>
              </div>
              <div className="space-y-2">
                {selectedInvoice.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start py-2 border-b border-gray-800 last:border-0">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.nombre}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {item.cantidad} x {formatCurrency(item.precio)}
                        {item.codigo && ` • Cód: ${item.codigo}`}
                      </p>
                    </div>
                    <span className="text-white font-semibold ml-2">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totales */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 p-4 rounded-xl border border-purple-700/50">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign size={18} className="text-purple-300" />
              <h3 className="text-white font-semibold">Resumen</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white font-medium">{formatCurrency(selectedInvoice.subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">IVA (19%):</span>
                <span className="text-white font-medium">{formatCurrency(selectedInvoice.tax)}</span>
              </div>
              
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Descuento:</span>
                  <span className="text-red-400 font-medium">-{formatCurrency(selectedInvoice.discount)}</span>
                </div>
              )}
              
              <div className="pt-2 border-t border-purple-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-purple-200 font-bold text-lg">TOTAL:</span>
                  <span className="text-white font-bold text-2xl">{formatCurrency(selectedInvoice.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total en letras */}
          {selectedInvoice.totalEnLetras && (
            <div className="bg-[#0f1419] p-4 rounded-xl border border-gray-800">
              <p className="text-xs text-gray-500 mb-1">SON:</p>
              <p className="text-white font-semibold text-sm">{selectedInvoice.totalEnLetras}</p>
            </div>
          )}
        </div>

        {/* Contenido oculto para impresión/PDF */}
        <div style={{ display: 'none' }}>
          <div ref={printableRef} className="invoice-container">
            {/* Encabezado de la empresa */}
            <div className="header">
              <div className="company-info">
                <h1>TU EMPRESA</h1>
                <p>NIT: 900.XXX.XXX-X</p>
                <p>Dirección: Calle XX #XX-XX</p>
                <p>Teléfono: (XXX) XXX-XXXX</p>
                <p>Ciudad, Colombia</p>
              </div>
              
              <div className="invoice-info">
                <div className="invoice-number">
                  <p>FACTURA DE VENTA</p>
                  <p>{selectedInvoice.id}</p>
                </div>
                <p>Fecha: {formatDate(selectedInvoice.fecha || selectedInvoice.createdAt)}</p>
                {selectedInvoice.hora && <p>Hora: {selectedInvoice.hora}</p>}
              </div>
            </div>

            {/* Información del cliente y pago */}
            <div className="client-section">
              <div>
                <h3>INFORMACIÓN DEL CLIENTE</h3>
                <p><strong>{selectedInvoice.cliente || 'Cliente General'}</strong></p>
                <p>CC/NIT: {selectedInvoice.identificacion || 'N/A'}</p>
              </div>
              
              <div>
                <h3>INFORMACIÓN DE PAGO</h3>
                <p>Método: {translatePaymentMethod(selectedInvoice.paymentMethod)}</p>
                <p>Vendedor: {selectedInvoice.vendedor || 'Admin'}</p>
              </div>
            </div>

            {/* Tabla de productos */}
            {selectedInvoice.items && selectedInvoice.items.length > 0 && (
              <table className="items-table">
                <thead>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>DESCRIPCIÓN</th>
                    <th style={{ textAlign: 'center' }}>CANT.</th>
                    <th style={{ textAlign: 'right' }}>PRECIO</th>
                    <th style={{ textAlign: 'right' }}>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.codigo || 'N/A'}</td>
                      <td><strong>{item.nombre}</strong></td>
                      <td style={{ textAlign: 'center' }}>{item.cantidad}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(item.precio)}</td>
                      <td style={{ textAlign: 'right' }}><strong>{formatCurrency(item.subtotal)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Totales */}
            <div className="totals-section">
              <div className="totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <strong>{formatCurrency(selectedInvoice.subtotal)}</strong>
                </div>
                
                <div className="total-row">
                  <span>IVA (19%):</span>
                  <strong>{formatCurrency(selectedInvoice.tax)}</strong>
                </div>
                
                {selectedInvoice.discount > 0 && (
                  <div className="total-row">
                    <span>Descuento:</span>
                    <strong style={{ color: '#dc2626' }}>-{formatCurrency(selectedInvoice.discount)}</strong>
                  </div>
                )}
                
                <div className="total-row final">
                  <span>TOTAL:</span>
                  <span>{formatCurrency(selectedInvoice.total)}</span>
                </div>

                {selectedInvoice.totalEnLetras && (
                  <div className="total-in-words">
                    <p>SON:</p>
                    <p>{selectedInvoice.totalEnLetras}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Código de barras y footer */}
            <div className="barcode-section">
              <div className="barcode">
                <svg width="250" height="60">
                  {generateBarcode(selectedInvoice.id).split('').map((digit, index) => (
                    <rect
                      key={index}
                      x={index * 19}
                      y="0"
                      width={parseInt(digit) % 2 === 0 ? "3" : "2"}
                      height="50"
                      fill="black"
                    />
                  ))}
                </svg>
                <p style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '5px' }}>
                  {generateBarcode(selectedInvoice.id)}
                </p>
              </div>
              
              <div className="footer-info">
                <p><strong>GRACIAS POR SU COMPRA</strong></p>
                <p>Régimen común - No somos grandes contribuyentes</p>
                <p>Resolución DIAN No. XXXX del XX de XXXX de 20XX</p>
                <p>Rango autorizado: Del F-XXXXXXXX al F-XXXXXXXX</p>
                <p className="important">Esta factura es válida para efectos tributarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetail;