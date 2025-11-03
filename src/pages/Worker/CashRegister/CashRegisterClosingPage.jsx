import React, { useState } from 'react';
import CashRegisterHeader from './components/CashRegisterHeader';
import CashCountForm from './components/CashCountForm';
import ElectronicPaymentsForm from './components/ElectronicPaymentsForm';
import CashSummary from './components/CashSummary';
import SystemComparison from './components/SystemComparison';
import ActionButtons from './components/ActionButtons';

/**
 * Página principal para el cierre y cuadre de caja
 * Coordina todos los componentes del proceso de cierre de caja
 */
const CashRegisterClosingPage = () => {
  // Estado para los datos del formulario de cuadre de caja
  const [formData, setFormData] = useState({
    // Efectivo - denominaciones de billetes colombianos
    billetes100000: 0,
    billetes50000: 0,
    billetes20000: 0,
    billetes10000: 0,
    billetes5000: 0,
    billetes2000: 0,
    billetes1000: 0,
    monedas500: 0,
    monedas200: 0,
    monedas100: 0,
    monedas50: 0,
    otrasMonedas: 0,
    
    // Pagos electrónicos
    tarjetaDebito: 0,
    tarjetaCredito: 0,
    transferencias: 0,
    
    // Gastos y observaciones
    totalGastos: 0,
    observaciones: ''
  });

  /**
   * Formatea números en formato colombiano
   * @param {number} value - Valor a formatear
   * @returns {string} Valor formateado en pesos colombianos
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  /**
   * Calcula el total de efectivo basado en las denominaciones ingresadas
   * @returns {number} Total de efectivo contado
   */
  const totalEfectivo = (
    (formData.billetes100000 * 100000) +
    (formData.billetes50000 * 50000) +
    (formData.billetes20000 * 20000) +
    (formData.billetes10000 * 10000) +
    (formData.billetes5000 * 5000) +
    (formData.billetes2000 * 2000) +
    (formData.billetes1000 * 1000) +
    (formData.monedas500 * 500) +
    (formData.monedas200 * 200) +
    (formData.monedas100 * 100) +
    (formData.monedas50 * 50) +
    formData.otrasMonedas
  );

  /**
   * Calcula el total de pagos electrónicos
   * @returns {number} Total de tarjetas y transferencias
   */
  const totalTarjetas = (
    formData.tarjetaDebito +
    formData.tarjetaCredito +
    formData.transferencias
  );

  // Totales calculados
  const totalVentas = totalEfectivo + totalTarjetas;
  const balanceFinal = totalVentas - formData.totalGastos;

  /**
   * Datos del sistema (en una aplicación real vendrían del backend)
   * @type {Object}
   */
  const sistemaData = {
    ventasEsperadas: 2850000,
    gastosRegistrados: 450000
  };

  // Diferencia entre el sistema y el conteo físico
  const diferencia = totalVentas - sistemaData.ventasEsperadas;

  /**
   * Maneja los cambios en los campos numéricos del formulario
   * @param {string} field - Campo del formulario a actualizar
   * @param {string} value - Nuevo valor del campo
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  /**
   * Maneja los cambios en los campos de texto del formulario
   * @param {string} field - Campo del formulario a actualizar
   * @param {string} value - Nuevo valor del campo
   */
  const handleTextChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Maneja el envío del formulario de cuadre de caja
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí iría la lógica para guardar en la base de datos
    console.log('Datos del cuadre:', {
      formData,
      totalEfectivo,
      totalTarjetas,
      totalVentas,
      balanceFinal,
      diferencia
    });
    
    // Mostrar resumen del cuadre
    const mensaje = `
      📊 RESUMEN DEL CUADRE DE CAJA
      
      💵 Efectivo contado: ${formatCurrency(totalEfectivo)}
      💳 Pagos electrónicos: ${formatCurrency(totalTarjetas)}
      📈 Total ventas: ${formatCurrency(totalVentas)}
      💰 Gastos: ${formatCurrency(formData.totalGastos)}
      ⚖️ Balance final: ${formatCurrency(balanceFinal)}
      🔍 Diferencia: ${formatCurrency(diferencia)}
      
      Estado: ${diferencia === 0 ? '✅ CUADRADO' : '⚠️ CON DIFERENCIA'}
    `;
    
    alert(mensaje);
  };

  /**
   * Maneja la generación del reporte para imprimir
   */
  const handlePrint = () => {
    // En una aplicación real, aquí iría la lógica para generar el PDF
    console.log('Generando reporte de cierre de caja...');
    
    const reporteData = {
      fecha: new Date().toLocaleDateString('es-CO'),
      efectivo: formatCurrency(totalEfectivo),
      electronicos: formatCurrency(totalTarjetas),
      totalVentas: formatCurrency(totalVentas),
      gastos: formatCurrency(formData.totalGastos),
      balance: formatCurrency(balanceFinal),
      diferencia: formatCurrency(diferencia),
      observaciones: formData.observaciones || 'Ninguna'
    };
    
    console.log('Reporte generado:', reporteData);
    alert('📄 Generando reporte para imprimir...');
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cabecera del cuadre de caja */}
        <CashRegisterHeader />
        
        {/* Formulario principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columna 1: Conteo de Efectivo */}
            <CashCountForm 
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* Columna 2: Pagos Electrónicos y Observaciones */}
            <ElectronicPaymentsForm
              formData={formData}
              onInputChange={handleInputChange}
              onTextChange={handleTextChange}
              totalTarjetas={totalTarjetas}
              formatCurrency={formatCurrency}
            />

            {/* Columna 3: Resumen, Comparación y Acciones */}
            <div className="space-y-6">
              
              {/* Resumen Financiero */}
              <CashSummary 
                totalVentas={totalVentas}
                totalGastos={formData.totalGastos}
                balanceFinal={balanceFinal}
                formatCurrency={formatCurrency}
              />

              {/* Comparación con Sistema */}
              <SystemComparison 
                sistemaData={sistemaData}
                totalVentas={totalVentas}
                diferencia={diferencia}
                formatCurrency={formatCurrency}
              />

              {/* Botones de Acción */}
              <ActionButtons 
                onSave={handleSubmit}
                onPrint={handlePrint}
                diferencia={diferencia}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashRegisterClosingPage;