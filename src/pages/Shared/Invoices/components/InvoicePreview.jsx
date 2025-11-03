import React, { useRef, useState } from 'react';
import { X, Download, Printer, Save, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

/**
 * Componente de previsualización de factura con formato legal colombiano
 * VERSIÓN CORREGIDA: Colores compatibles con html2pdf (sin oklch)
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');
  const [pdfError, setPdfError] = useState('');
  
  // Generar número de factura único
  const invoiceNumber = invoiceData.id || `F-${String(Date.now()).slice(-8)}`;
  
  // Formatear fecha y hora actual
  const now = new Date();
  const formattedDate = now.toLocaleDateString('es-CO');
  const formattedTime = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  /**
   * Convierte número a letras (formato colombiano)
   */
  const numeroALetras = (num) => {
    const unidades = ['CERO', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
    const decenas = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
    const decenas2 = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    
    if (num === 0) return 'CERO PESOS';
    if (num === 100) return 'CIEN PESOS';
    
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

  const convertirCentenas = (num) => {
    if (num === 0) return '';
    if (num < 10) return ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'][num];
    if (num < 20) return ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'][num - 10];
    if (num < 100) {
      const decenas = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
      const unidad = num % 10;
      return decenas[Math.floor(num / 10)] + (unidad > 0 ? ' Y ' + convertirCentenas(unidad) : '');
    }
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    const resto = num % 100;
    return (num === 100 ? 'CIEN' : centenas[Math.floor(num / 100)]) + (resto > 0 ? ' ' + convertirCentenas(resto) : '');
  };

  /**
   * Genera el código de barras simulado
   */
  const generateBarcode = () => {
    return invoiceNumber.replace(/\D/g, '').padStart(13, '0');
  };

  /**
   * Descarga la factura como PDF - VERSIÓN CORREGIDA SIN COLORES OKLCH
   */
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      setPdfProgress('Preparando documento...');
      setPdfError('');
      
      const element = invoiceRef.current;
      
      if (!element) {
        throw new Error('No se pudo encontrar el contenido de la factura');
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      
      setPdfProgress('Generando PDF (puede tomar unos segundos)...');
      
      // Validar que html2pdf esté disponible
      if (typeof html2pdf === 'undefined') {
        throw new Error('La librería html2pdf no está cargada. Instala: npm install html2pdf.js');
      }
      
      // Configuración optimizada SIN usar colores oklch
      const opt = {
        margin: [0.4, 0.4, 0.4, 0.4],
        filename: `Factura_${invoiceNumber}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.98
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy']
        }
      };
      
      setPdfProgress('Descargando archivo...');
      
      // Generar PDF
      await html2pdf()
        .set(opt)
        .from(element)
        .save();
      
      setPdfProgress('¡PDF generado exitosamente!');
      
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress('');
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      
      let errorMsg = 'Error al generar PDF: ';
      if (error.message) {
        errorMsg += error.message;
      } else {
        errorMsg += 'Error desconocido. Verifica la consola.';
      }
      
      setPdfError(errorMsg);
      setPdfProgress('');
      
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfError('');
      }, 5000);
    }
  };

  /**
   * Imprime la factura
   */
  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.error('Error al imprimir:', error);
      setPdfError('Error al abrir la ventana de impresión');
      setTimeout(() => setPdfError(''), 3000);
    }
  };

  /**
   * Guarda la factura en la base de datos con fecha ISO
   */
  const handleSave = () => {
    try {
      const fechaISO = invoiceData.fecha || new Date().toISOString().split('T')[0];
      
      const finalInvoice = {
        ...invoiceData,
        id: invoiceNumber,
        items: invoiceItems,
        subtotal,
        tax,
        discount,
        total,
        fecha: fechaISO,
        fechaFormateada: formattedDate,
        hora: formattedTime,
        totalEnLetras: numeroALetras(Math.round(total)),
        createdAt: new Date().toISOString(),
        estado: 'Pagada'
      };
      
      console.log('💾 Guardando factura:', finalInvoice);
      onSaveInvoice(finalInvoice);
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      setPdfError('Error al guardar la factura: ' + error.message);
      setTimeout(() => setPdfError(''), 3000);
    }
  };

  /**
   * Formatea valores monetarios
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
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

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Modal de carga para PDF */}
        {isGeneratingPDF && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-700 max-w-md w-full mx-4">
              <div className="text-center space-y-4">
                {pdfError ? (
                  <>
                    <AlertCircle size={48} className="text-red-400 mx-auto animate-pulse" />
                    <h3 className="text-xl font-bold text-red-400">Error</h3>
                    <p className="text-gray-300 text-sm">{pdfError}</p>
                  </>
                ) : pdfProgress.includes('exitosamente') ? (
                  <>
                    <CheckCircle size={48} className="text-green-400 mx-auto" />
                    <h3 className="text-xl font-bold text-green-400">¡Completado!</h3>
                    <p className="text-gray-300">{pdfProgress}</p>
                  </>
                ) : (
                  <>
                    <Loader size={48} className="text-purple-400 mx-auto animate-spin" />
                    <h3 className="text-xl font-bold text-white">Generando PDF</h3>
                    <p className="text-gray-300 text-sm">{pdfProgress}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Header con acciones */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl">
                <FileText size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Previsualización de Factura</h1>
                <p className="text-gray-400 text-sm">Revisa los detalles antes de guardar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isGeneratingPDF 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                }`}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span className="hidden sm:inline">Generando...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span className="hidden sm:inline">PDF</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Printer size={18} />
                <span className="hidden sm:inline">Imprimir</span>
              </button>
              
              <button
                onClick={handleSave}
                disabled={isGeneratingPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                <span>Guardar</span>
              </button>
              
              <button
                onClick={onClose}
                disabled={isGeneratingPDF}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {pdfError && !isGeneratingPDF && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center space-x-3">
            <AlertCircle size={20} />
            <span>{pdfError}</span>
          </div>
        )}

        {/* Contenedor de la factura - ESTILOS INLINE PARA COMPATIBILIDAD CON html2pdf */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
          <div ref={invoiceRef} style={{ 
            padding: '32px', 
            backgroundColor: '#ffffff', 
            color: '#000000',
            fontFamily: 'Arial, sans-serif'
          }}>
            
            {/* Encabezado */}
            <div style={{ 
              borderBottom: '4px solid #9333ea', 
              paddingBottom: '24px', 
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <h1 style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  color: '#9333ea', 
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>TU EMPRESA</h1>
                <p style={{ color: '#666666', margin: '2px 0', fontSize: '14px' }}>NIT: 900.XXX.XXX-X</p>
                <p style={{ color: '#666666', margin: '2px 0', fontSize: '14px' }}>Dirección: Calle XX #XX-XX</p>
                <p style={{ color: '#666666', margin: '2px 0', fontSize: '14px' }}>Teléfono: (XXX) XXX-XXXX</p>
                <p style={{ color: '#666666', margin: '2px 0', fontSize: '14px' }}>Ciudad, Colombia</p>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  backgroundColor: '#f3e8ff', 
                  padding: '10px 15px', 
                  borderRadius: '8px', 
                  display: 'inline-block',
                  marginBottom: '8px'
                }}>
                  <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 4px 0' }}>FACTURA DE VENTA</p>
                  <p style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#9333ea',
                    margin: '0'
                  }}>{invoiceNumber}</p>
                </div>
                <p style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>Fecha: {formattedDate}</p>
                <p style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>Hora: {formattedTime}</p>
              </div>
            </div>

            {/* Información del cliente */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '24px',
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: '#666666',
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>INFORMACIÓN DEL CLIENTE</h3>
                <p style={{ 
                  fontWeight: 'bold', 
                  fontSize: '16px',
                  margin: '4px 0'
                }}>{invoiceData.cliente || 'Cliente General'}</p>
                <p style={{ color: '#666666', fontSize: '14px', margin: '4px 0' }}>
                  <span style={{ fontWeight: '600' }}>CC/NIT:</span> {invoiceData.identificacion || 'N/A'}
                </p>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: '#666666',
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>INFORMACIÓN DE PAGO</h3>
                <p style={{ color: '#333333', fontSize: '14px', margin: '4px 0' }}>
                  <span style={{ fontWeight: '600' }}>Método:</span> {translatePaymentMethod(invoiceData.paymentMethod)}
                </p>
                <p style={{ color: '#333333', fontSize: '14px', margin: '4px 0' }}>
                  <span style={{ fontWeight: '600' }}>Vendedor:</span> {invoiceData.vendedor || 'Admin'}
                </p>
              </div>
            </div>

            {/* Tabla de productos */}
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              marginBottom: '24px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#9333ea', color: '#ffffff' }}>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>CÓDIGO</th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>DESCRIPCIÓN</th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>CANT.</th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'right',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>PRECIO</th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'right',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{item.codigo || 'N/A'}</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>{item.nombre}</td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>{item.cantidad}</td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right' }}>{formatCurrency(item.precio)}</td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: '600' }}>{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginBottom: '24px'
            }}>
              <div style={{ width: '320px' }}>
                <div style={{ 
                  backgroundColor: '#f9fafb',
                  padding: '16px',
                  borderRadius: '8px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{ color: '#333333' }}>Subtotal:</span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{ color: '#333333' }}>IVA (19%):</span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(tax)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#dc2626'
                    }}>
                      <span>Descuento:</span>
                      <span style={{ fontWeight: '600' }}>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    marginTop: '8px',
                    borderTop: '2px solid #9333ea',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#9333ea'
                  }}>
                    <span>TOTAL:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#f3e8ff',
                  borderRadius: '8px'
                }}>
                  <p style={{ 
                    fontSize: '10px', 
                    color: '#666666',
                    fontWeight: '600',
                    margin: '0 0 4px 0'
                  }}>SON:</p>
                  <p style={{ 
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#9333ea',
                    margin: '0'
                  }}>{numeroALetras(Math.round(total))}</p>
                </div>
              </div>
            </div>

            {/* Código de barras */}
            <div style={{ 
              borderTop: '1px solid #d1d5db',
              paddingTop: '24px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <svg width="250" height="60" style={{ margin: '0 auto' }}>
                  {generateBarcode().split('').map((digit, index) => (
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
                <p style={{ 
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#666666',
                  marginTop: '8px'
                }}>{generateBarcode()}</p>
              </div>
              
              <div style={{ fontSize: '10px', color: '#666666', lineHeight: '1.6' }}>
                <p style={{ fontWeight: '600', margin: '3px 0' }}>GRACIAS POR SU COMPRA</p>
                <p style={{ margin: '3px 0' }}>Régimen común - No somos grandes contribuyentes</p>
                <p style={{ margin: '3px 0' }}>Resolución DIAN No. XXXX del XX de XXXX de 20XX</p>
                <p style={{ margin: '3px 0' }}>Rango autorizado: Del F-XXXXXXXX al F-XXXXXXXX</p>
                <p style={{ color: '#dc2626', fontWeight: '600', margin: '3px 0' }}>Esta factura es válida para efectos tributarios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notas adicionales */}
        <div className="bg-[#1a1f2e] p-4 rounded-xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            <span className="text-yellow-500 font-semibold">⚠️ Importante:</span> Revisa cuidadosamente todos los datos antes de guardar la factura.
            Una vez guardada, no podrá ser modificada.
          </p>
        </div>
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          button {
            display: none !important;
          }
          .bg-\\[\\#0f1419\\], .bg-\\[\\#1a1f2e\\] {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoicePreview;