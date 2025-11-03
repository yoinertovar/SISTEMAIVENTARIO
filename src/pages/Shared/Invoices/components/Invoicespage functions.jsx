// =====================================================
// FUNCIONES ADICIONALES PARA InvoicesPage.jsx
// =====================================================
// Agrega estas funciones dentro de tu componente InvoicesPage

import html2pdf from 'html2pdf.js';

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
 * Genera el contenido HTML para imprimir una factura
 * @param {Object} invoice - Datos de la factura
 * @returns {string} HTML formateado para impresión
 */
const generatePrintableInvoiceHTML = (invoice) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  /**
   * CORREGIDO: Formatea fecha usando fecha local
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

  // Generar SVG del código de barras
  const barcodeSVG = generateBarcode(invoice.id)
    .split('')
    .map((digit, index) => {
      const width = parseInt(digit) % 2 === 0 ? "3" : "2";
      return `<rect x="${index * 19}" y="0" width="${width}" height="50" fill="black"/>`;
    })
    .join('');

  // Generar filas de items
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
              
              <div class="total-row">
                <span>IVA (19%):</span>
                <strong>${formatCurrency(invoice.tax)}</strong>
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

              ${
                invoice.totalEnLetras
                  ? `
              <div class="total-in-words">
                <p>SON:</p>
                <p>${invoice.totalEnLetras}</p>
              </div>
              `
                  : ''
              }
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
 * Maneja la impresión rápida de una factura desde la lista
 * @param {Object} invoice - Datos de la factura a imprimir
 */
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

/**
 * Maneja la exportación rápida a PDF de una factura desde la lista
 * @param {Object} invoice - Datos de la factura a exportar
 */
const handleQuickExportPDF = (invoice) => {
  // Crear un elemento temporal con el contenido HTML
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

// =====================================================
// INSTRUCCIONES DE USO
// =====================================================

/*
1. Importa html2pdf.js en tu archivo InvoicesPage.jsx:
   import html2pdf from 'html2pdf.js';

2. Copia las tres funciones anteriores dentro de tu componente InvoicesPage
   (después de las funciones existentes como calculateSubtotal, etc.)

3. Modifica el componente InvoiceList en el render para pasarle las nuevas funciones:

   <InvoiceList
     invoices={getFilteredInvoices()}
     onInvoiceSelect={setSelectedInvoice}
     getEstadoColor={getEstadoColor}
     onPrintInvoice={handleQuickPrint}
     onExportPDF={handleQuickExportPDF}
   />

4. ¡Listo! Ahora cada factura en la lista tendrá botones de impresión y PDF
   que aparecen al hacer hover sobre la tarjeta.
*/

export { generatePrintableInvoiceHTML, handleQuickPrint, handleQuickExportPDF };