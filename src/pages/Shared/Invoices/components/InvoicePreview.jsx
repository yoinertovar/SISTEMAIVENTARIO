import React, { useRef, useState } from 'react';
import { X, Download, Printer, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

/**
 * 🎨 VISTA PREVIA PROFESIONAL DE FACTURA
 * Diseño espectacular con preview completo arriba y botones de acción abajo
 * ✅ CORREGIDO: Impresión solo muestra la factura, no toda la pantalla
 */
const InvoicePreview = ({
  invoiceData,
  invoiceItems,
  subtotal,
  tax,
  discount,
  total,
  onClose,
  onSaveInvoice
}) => {
  const invoiceRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const invoiceNumber = invoiceData.id || `F-${String(Date.now()).slice(-8)}`;
  
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(dateString);
  };

  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    
    const date = parseLocalDate(dateString);
    if (!date || isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
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

  const numeroALetras = (num) => {
    const decenas = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
    const decenas2 = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    
    if (num === 0) return 'CERO PESOS';
    if (num === 100) return 'CIEN PESOS';
    
    const convertirCentenas = (n) => {
      if (n === 0) return '';
      if (n < 10) return ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'][n];
      if (n < 20) return decenas[n - 10];
      if (n < 100) {
        const unidad = n % 10;
        return decenas2[Math.floor(n / 10)] + (unidad > 0 ? ' Y ' + convertirCentenas(unidad) : '');
      }
      const resto = n % 100;
      return (n === 100 ? 'CIEN' : centenas[Math.floor(n / 100)]) + (resto > 0 ? ' ' + convertirCentenas(resto) : '');
    };
    
    let resultado = '';
    const miles = Math.floor(num / 1000);
    const resto = num % 1000;
    
    if (miles > 0) {
      if (miles === 1) {
        resultado = 'MIL ';
      } else {
        resultado = convertirCentenas(miles) + ' MIL ';
      }
    }
    
    resultado += convertirCentenas(resto);
    return resultado.trim() + ' PESOS';
  };

  const generateBarcode = () => {
    return invoiceNumber.replace(/\D/g, '').padStart(13, '0');
  };

  /**
   * 🔥 NUEVO: Genera HTML limpio para impresión
   */
  const generatePrintableHTML = () => {
    const barcodeSVG = generateBarcode()
      .split('')
      .map((digit, index) => {
        const width = parseInt(digit) % 2 === 0 ? "3" : "2";
        return `<rect x="${index * 21}" y="0" width="${width}" height="60" fill="black"/>`;
      })
      .join('');

    const itemsRows = invoiceItems
      .map((item, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb; background-color: ${index % 2 === 0 ? '#fff' : '#f9fafb'}">
          <td style="padding: 14px; font-size: 14px; color: #666">${item.codigo || 'N/A'}</td>
          <td style="padding: 14px; font-size: 14px; font-weight: 600; color: #333">${item.nombre}</td>
          <td style="padding: 14px; font-size: 14px; text-align: center; color: #333">${item.cantidad}</td>
          <td style="padding: 14px; font-size: 14px; text-align: right; color: #333">${formatCurrency(item.precio)}</td>
          <td style="padding: 14px; font-size: 14px; text-align: right; font-weight: 700; color: #9333ea">${formatCurrency(item.subtotal)}</td>
        </tr>
      `)
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Factura ${invoiceNumber}</title>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 20px; background: white; }
            .invoice-container { max-width: 800px; margin: 0 auto; background: white; }
            @media print {
              body { padding: 0; }
              .invoice-container { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <table style="width: 100%; margin-bottom: 32px; border-bottom: 4px solid #9333ea; padding-bottom: 24px;">
              <tr>
                <td style="width: 60%; vertical-align: top;">
                  <h1 style="color: #9333ea; font-size: 36px; margin-bottom: 12px;">TU EMPRESA</h1>
                  <p style="color: #666; margin: 4px 0;">NIT: 900.XXX.XXX-X</p>
                  <p style="color: #666; margin: 4px 0;">Dirección: Calle XX #XX-XX</p>
                  <p style="color: #666; margin: 4px 0;">Teléfono: (XXX) XXX-XXXX</p>
                  <p style="color: #666; margin: 4px 0;">Ciudad, Colombia</p>
                </td>
                <td style="width: 40%; vertical-align: top; text-align: right;">
                  <div style="background: #f3e8ff; padding: 16px; border-radius: 12px; display: inline-block; margin-bottom: 12px;">
                    <p style="font-size: 13px; color: #666; margin-bottom: 4px;">FACTURA DE VENTA</p>
                    <p style="font-size: 28px; font-weight: bold; color: #9333ea;">${invoiceNumber}</p>
                  </div>
                  <p style="font-size: 14px; color: #666;">Fecha: ${formatDate(invoiceData.fecha)}</p>
                </td>
              </tr>
            </table>

            <div style="display: table; width: 100%; margin-bottom: 32px;">
              <div style="display: table-row;">
                <div style="display: table-cell; width: 50%; padding: 20px; background: #f9fafb; border-radius: 12px;">
                  <h3 style="font-size: 13px; color: #666; margin-bottom: 12px; font-weight: 700;">INFORMACIÓN DEL CLIENTE</h3>
                  <p style="font-weight: 700; font-size: 16px; color: #333; margin: 6px 0;">${invoiceData.cliente || 'Cliente General'}</p>
                  <p style="font-size: 14px; color: #666; margin: 4px 0;">CC/NIT: ${invoiceData.identificacion || 'N/A'}</p>
                </div>
                <div style="display: table-cell; width: 50%; padding: 20px; background: #f9fafb; border-radius: 12px;">
                  <h3 style="font-size: 13px; color: #666; margin-bottom: 12px; font-weight: 700;">INFORMACIÓN DE PAGO</h3>
                  <p style="font-size: 14px; color: #333; margin: 6px 0;">Método: ${translatePaymentMethod(invoiceData.paymentMethod)}</p>
                  <p style="font-size: 14px; color: #333; margin: 6px 0;">Vendedor: ${invoiceData.vendedor || 'Admin'}</p>
                </div>
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background-color: #9333ea; color: #fff;">
                  <th style="padding: 16px; text-align: left; font-size: 13px; font-weight: 700;">CÓDIGO</th>
                  <th style="padding: 16px; text-align: left; font-size: 13px; font-weight: 700;">DESCRIPCIÓN</th>
                  <th style="padding: 16px; text-align: center; font-size: 13px; font-weight: 700;">CANT.</th>
                  <th style="padding: 16px; text-align: right; font-size: 13px; font-weight: 700;">PRECIO</th>
                  <th style="padding: 16px; text-align: right; font-size: 13px; font-weight: 700;">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>

            <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
              <div style="width: 400px;">
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">
                  <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #666; font-size: 15px;">Subtotal:</span>
                    <span style="font-weight: 600; font-size: 15px; color: #333;">${formatCurrency(subtotal)}</span>
                  </div>
                  ${discount > 0 ? `
                  <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626;">
                    <span style="font-size: 15px;">Descuento:</span>
                    <span style="font-weight: 600; font-size: 15px;">-${formatCurrency(discount)}</span>
                  </div>
                  ` : ''}
                  <div style="display: flex; justify-content: space-between; padding: 16px 0; margin-top: 12px; border-top: 3px solid #9333ea;">
                    <span style="font-size: 22px; font-weight: bold; color: #9333ea;">TOTAL:</span>
                    <span style="font-size: 26px; font-weight: bold; color: #9333ea;">${formatCurrency(total)}</span>
                  </div>
                </div>
                <div style="margin-top: 16px; padding: 16px; background-color: #f3e8ff; border-radius: 12px; border: 2px solid #9333ea;">
                  <p style="font-size: 10px; color: #666; font-weight: 700; margin: 0 0 6px 0;">SON:</p>
                  <p style="font-size: 13px; font-weight: bold; color: #9333ea; margin: 0; line-height: 1.4;">${numeroALetras(Math.round(total))}</p>
                </div>
              </div>
            </div>

            <div style="border-top: 2px solid #e5e7eb; padding-top: 32px; text-align: center;">
              <div style="margin-bottom: 24px;">
                <svg width="280" height="70" style="margin: 0 auto;">
                  ${barcodeSVG}
                </svg>
                <p style="font-size: 13px; font-family: monospace; color: #666; margin: 10px 0 0 0;">${generateBarcode()}</p>
              </div>
              <div style="font-size: 11px; color: #666; line-height: 1.8;">
                <p style="font-weight: 700; margin: 4px 0; font-size: 14px; color: #333;">GRACIAS POR SU COMPRA</p>
                <p style="margin: 4px 0;">Régimen común - No somos grandes contribuyentes</p>
                <p style="margin: 4px 0;">Resolución DIAN No. XXXX del XX de XXXX de 20XX</p>
                <p style="margin: 4px 0;">Rango autorizado: Del F-XXXXXXXX al F-XXXXXXXX</p>
                <p style="color: #dc2626; font-weight: 700; margin: 8px 0 0 0; font-size: 12px;">Esta factura es válida para efectos tributarios</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  /**
   * 📥 FUNCIÓN 1: Descargar PDF (NO guarda en el sistema)
   */
  const handleDownloadPDF = async () => {
    try {
      setIsProcessing(true);
      setProcessingMessage('Preparando documento PDF...');
      setError('');
      
      const element = invoiceRef.current;
      if (!element) throw new Error('No se pudo encontrar el contenido');

      await new Promise(resolve => setTimeout(resolve, 100));
      setProcessingMessage('Generando PDF...');
      
      if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf no está cargado. Instala: npm install html2pdf.js');
      }

      const opt = {
        margin: [0.4, 0.4, 0.4, 0.4],
        filename: `Factura_${invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      setProcessingMessage('Descargando...');
      await html2pdf().set(opt).from(element).save();
      
      setShowSuccess(true);
      setProcessingMessage('¡PDF descargado! (No guardado en sistema)');
      
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(false);
        setProcessingMessage('');
      }, 2000);

    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      setError('Error al generar PDF: ' + error.message);
      setIsProcessing(false);
      setTimeout(() => setError(''), 5000);
    }
  };

  /**
   * 🖨️ FUNCIÓN 2: Guardar en sistema + Imprimir
   * ✅ CORREGIDO: Ahora solo imprime la factura, no toda la pantalla
   */
  const handleSaveAndPrint = () => {
    try {
      setIsProcessing(true);
      setProcessingMessage('Guardando factura...');
      setError('');

      // Crear objeto de factura completo
      const fullInvoice = {
        id: invoiceNumber,
        cliente: invoiceData.cliente,
        identificacion: invoiceData.identificacion,
        fecha: invoiceData.fecha,
        vendedor: invoiceData.vendedor,
        paymentMethod: invoiceData.paymentMethod,
        items: invoiceItems,
        subtotal: subtotal,
        tax: tax || 0,
        discount: discount,
        total: total,
        totalEnLetras: numeroALetras(Math.round(total)),
        estado: 'Pagada',
        createdAt: new Date().toISOString()
      };

      // Guardar en el sistema
      onSaveInvoice(fullInvoice);

      setProcessingMessage('Preparando impresión...');
      
      // 🔥 SOLUCIÓN: Crear una nueva ventana solo con la factura
      setTimeout(() => {
        const printWindow = window.open('', '', 'width=800,height=600');
        
        if (printWindow) {
          printWindow.document.write(generatePrintableHTML());
          printWindow.document.close();
          
          // Esperar a que cargue y luego imprimir
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 250);
        }

        setShowSuccess(true);
        setProcessingMessage('✅ Factura guardada e impresa');
        
        setTimeout(() => {
          setIsProcessing(false);
          setShowSuccess(false);
          setProcessingMessage('');
          onClose();
        }, 1500);
      }, 500);

    } catch (error) {
      console.error('❌ Error al guardar/imprimir:', error);
      setError('Error: ' + error.message);
      setIsProcessing(false);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-6xl my-8">
        
        {/* Indicador de Procesamiento */}
        {isProcessing && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl border border-purple-400 animate-fadeIn">
            <div className="flex items-center space-x-4">
              {!showSuccess ? (
                <>
                  <Loader className="animate-spin" size={28} />
                  <div>
                    <p className="font-bold text-lg">{processingMessage}</p>
                    <p className="text-xs text-purple-100 mt-1">Por favor espera...</p>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle size={28} />
                  <div>
                    <p className="font-bold text-lg">{processingMessage}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mensaje de Error */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl border border-red-400 animate-fadeIn">
            <div className="flex items-center space-x-4">
              <AlertCircle size={28} />
              <p className="font-bold text-lg">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-500">
          
          {/* Header del Modal */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white p-6 border-b-4 border-purple-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl">
                  <FileText size={36} />
                </div>
                <div>
                  <h2 className="text-3xl font-black">Vista Previa de Factura</h2>
                  <p className="text-purple-100 text-sm mt-1">Revisa los detalles antes de imprimir o descargar</p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <X size={28} />
              </button>
            </div>
          </div>

          {/* 📄 PREVIEW DE LA FACTURA */}
          <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-8 max-h-[60vh] overflow-y-auto">
            <div 
              ref={invoiceRef}
              className="bg-white rounded-2xl shadow-2xl p-12 max-w-4xl mx-auto border-2 border-gray-200"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {/* Header de la Factura */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '4px solid #9333ea', paddingBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <h1 style={{ color: '#9333ea', fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>TU EMPRESA</h1>
                  <p style={{ color: '#666', margin: '4px 0' }}>NIT: 900.XXX.XXX-X</p>
                  <p style={{ color: '#666', margin: '4px 0' }}>Dirección: Calle XX #XX-XX</p>
                  <p style={{ color: '#666', margin: '4px 0' }}>Teléfono: (XXX) XXX-XXXX</p>
                  <p style={{ color: '#666', margin: '4px 0' }}>Ciudad, Colombia</p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ backgroundColor: '#f3e8ff', padding: '16px', borderRadius: '12px', display: 'inline-block', marginBottom: '12px' }}>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>FACTURA DE VENTA</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#9333ea' }}>{invoiceNumber}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#666' }}>Fecha: {formatDate(invoiceData.fecha)}</p>
                </div>
              </div>

              {/* Información del Cliente y Pago */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '13px', color: '#666', marginBottom: '12px', fontWeight: '700' }}>INFORMACIÓN DEL CLIENTE</h3>
                  <p style={{ fontWeight: '700', fontSize: '16px', color: '#333', margin: '6px 0' }}>{invoiceData.cliente || 'Cliente General'}</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: '4px 0' }}>CC/NIT: {invoiceData.identificacion || 'N/A'}</p>
                </div>
                
                <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '13px', color: '#666', marginBottom: '12px', fontWeight: '700' }}>INFORMACIÓN DE PAGO</h3>
                  <p style={{ fontSize: '14px', color: '#333', margin: '6px 0' }}>Método: {translatePaymentMethod(invoiceData.paymentMethod)}</p>
                  <p style={{ fontSize: '14px', color: '#333', margin: '6px 0' }}>Vendedor: {invoiceData.vendedor || 'Admin'}</p>
                </div>
              </div>

              {/* Tabla Productos */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: '#9333ea', color: '#fff' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700' }}>CÓDIGO</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700' }}>DESCRIPCIÓN</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700' }}>CANT.</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '700' }}>PRECIO</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: '700' }}>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb' }}>
                      <td style={{ padding: '14px', fontSize: '14px', color: '#666' }}>{item.codigo || 'N/A'}</td>
                      <td style={{ padding: '14px', fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.nombre}</td>
                      <td style={{ padding: '14px', fontSize: '14px', textAlign: 'center', color: '#333' }}>{item.cantidad}</td>
                      <td style={{ padding: '14px', fontSize: '14px', textAlign: 'right', color: '#333' }}>{formatCurrency(item.precio)}</td>
                      <td style={{ padding: '14px', fontSize: '14px', textAlign: 'right', fontWeight: '700', color: '#9333ea' }}>{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totales */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '400px' }}>
                  <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ color: '#666', fontSize: '15px' }}>Subtotal:</span>
                      <span style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>{formatCurrency(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb', color: '#dc2626' }}>
                        <span style={{ fontSize: '15px' }}>Descuento:</span>
                        <span style={{ fontWeight: '600', fontSize: '15px' }}>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', marginTop: '12px', borderTop: '3px solid #9333ea' }}>
                      <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#9333ea' }}>TOTAL:</span>
                      <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#9333ea' }}>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f3e8ff', borderRadius: '12px', border: '2px solid #9333ea' }}>
                    <p style={{ fontSize: '10px', color: '#666', fontWeight: '700', margin: '0 0 6px 0' }}>SON:</p>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#9333ea', margin: '0', lineHeight: '1.4' }}>{numeroALetras(Math.round(total))}</p>
                  </div>
                </div>
              </div>

              {/* Código de Barras */}
              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '32px', textAlign: 'center' }}>
                <div style={{ marginBottom: '24px' }}>
                  <svg width="280" height="70" style={{ margin: '0 auto' }}>
                    {generateBarcode().split('').map((digit, index) => (
                      <rect key={index} x={index * 21} y="0" width={parseInt(digit) % 2 === 0 ? "3" : "2"} height="60" fill="black" />
                    ))}
                  </svg>
                  <p style={{ fontSize: '13px', fontFamily: 'monospace', color: '#666', margin: '10px 0 0 0' }}>{generateBarcode()}</p>
                </div>
                <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.8' }}>
                  <p style={{ fontWeight: '700', margin: '4px 0', fontSize: '14px', color: '#333' }}>GRACIAS POR SU COMPRA</p>
                  <p style={{ margin: '4px 0' }}>Régimen común - No somos grandes contribuyentes</p>
                  <p style={{ margin: '4px 0' }}>Resolución DIAN No. XXXX del XX de XXXX de 20XX</p>
                  <p style={{ margin: '4px 0' }}>Rango autorizado: Del F-XXXXXXXX al F-XXXXXXXX</p>
                  <p style={{ color: '#dc2626', fontWeight: '700', margin: '8px 0 0 0', fontSize: '12px' }}>Esta factura es válida para efectos tributarios</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 BOTONES DE ACCIÓN - ABAJO DEL PREVIEW */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl p-8 border-t-4 border-purple-500 shadow-2xl">
            
            {/* Mensaje Informativo */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-5 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle size={28} className="text-yellow-400 flex-shrink-0 mt-1 animate-pulse" />
                <div className="flex-1">
                  <p className="text-yellow-200 font-bold text-base mb-3">⚠️ ELIGE UNA ACCIÓN:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <p className="font-bold text-blue-300 mb-2 flex items-center">
                        <Download size={18} className="mr-2" />
                        Descargar PDF
                      </p>
                      <p className="text-blue-100 text-xs leading-relaxed">
                        Genera y descarga el archivo PDF <span className="font-bold text-yellow-300">sin guardar</span> la factura en el sistema. Ideal para cotizaciones.
                      </p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="font-bold text-purple-300 mb-2 flex items-center">
                        <Printer size={18} className="mr-2" />
                        Imprimir y Guardar
                      </p>
                      <p className="text-purple-100 text-xs leading-relaxed">
                        Guarda la factura <span className="font-bold text-yellow-300">permanentemente</span> en el sistema y abre solo la factura para imprimir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              
              {/* Botón Descargar PDF */}
              <button
                onClick={handleDownloadPDF}
                disabled={isProcessing}
                className="group relative flex items-center justify-center space-x-4 px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1"
              >
                <Download size={32} className="group-hover:animate-bounce" />
                <div className="text-left">
                  <p className="text-sm opacity-90 font-normal">Solo Descargar</p>
                  <p className="text-xl">PDF</p>
                </div>
              </button>

              {/* Botón Imprimir y Guardar */}
              <button
                onClick={handleSaveAndPrint}
                disabled={isProcessing}
                className="group relative flex items-center justify-center space-x-4 px-8 py-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1"
              >
                <Printer size={32} className="group-hover:animate-bounce" />
                <div className="text-left">
                  <p className="text-sm opacity-90 font-normal">Guardar e</p>
                  <p className="text-xl">Imprimir</p>
                </div>
              </button>
            </div>

            {/* Botón Cancelar */}
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl transition-all duration-300 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-red-500/50 transform hover:scale-105"
            >
              Cancelar y Cerrar
            </button>
          </div>

        </div>
      </div>

      {/* Estilos Adicionales */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvoicePreview;