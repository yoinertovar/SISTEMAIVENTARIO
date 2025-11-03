import React, { useState } from 'react';
import SupplierStats from './components/SupplierStats';
import FiltersBar from './components/FiltersBar';
import SupplierTable from './components/SupplierTable';
import InvoiceTable from './components/InvoiceTable';
import SupplierModal from './components/SupplierModal';
import InvoiceModal from './components/InvoiceModal';
import EmptyState from './components/EmptyState';
import { Truck, Plus } from 'lucide-react';

/**
 * Página principal de gestión de proveedores y facturas de compra
 * Proporciona operaciones CRUD completas para registros de proveedores y facturas asociadas
 * Características: filtrado en tiempo real, formularios modales y visualización de datos
 * 
 * @componente
 * @returns {React.Element} Página del dashboard de gestión de proveedores
 */
const SuppliersPage = () => {
  // Gestión de estado para entidades de datos
  const [suppliers, setSuppliers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Estados de visibilidad de modales
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Estados de contexto de edición
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Gestión de estado de formularios
  const [supplierForm, setSupplierForm] = useState({
    id: '',
    name: '',
    ruc: '',
    address: '',
    phone: '',
    email: '',
  });

  const [invoiceForm, setInvoiceForm] = useState({
    id: '',
    invoiceNumber: '',
    supplierId: '',
    issueDate: '',
    totalAmount: '',
    paymentStatus: '',
  });

  // Estados de filtro y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');

  /**
   * Abre el modal de proveedor en modo crear o editar
   * @param {Object|null} supplier - Objeto proveedor para editar, null para creación
   */
  const openSupplierModal = (supplier = null) => {
    setEditingSupplier(supplier);
    if (supplier) {
      setSupplierForm(supplier);
    } else {
      setSupplierForm({
        id: '',
        name: '',
        ruc: '',
        address: '',
        phone: '',
        email: '',
      });
    }
    setSupplierModalOpen(true);
  };

  /**
   * Cierra el modal de proveedor y reinicia el contexto de edición
   */
  const closeSupplierModal = () => {
    setSupplierModalOpen(false);
    setEditingSupplier(null);
  };

  /**
   * Maneja el envío del formulario de proveedor para operaciones de crear y actualizar
   */
  const handleSupplierSubmit = () => {
    if (editingSupplier) {
      setSuppliers(
        suppliers.map((s) =>
          s.id === editingSupplier.id ? supplierForm : s
        )
      );
    } else {
      setSuppliers([...suppliers, supplierForm]);
    }
    closeSupplierModal();
  };

  /**
   * Elimina proveedor por ID y se propaga a facturas relacionadas
   * @param {string} id - Identificador único del proveedor a eliminar
   */
  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  /**
   * Abre el modal de factura en modo crear o editar
   * @param {Object|null} invoice - Objeto factura para editar, null para creación
   */
  const openInvoiceModal = (invoice = null) => {
    setEditingInvoice(invoice);
    if (invoice) {
      setInvoiceForm(invoice);
    } else {
      setInvoiceForm({
        id: '',
        invoiceNumber: '',
        supplierId: '',
        issueDate: '',
        totalAmount: '',
        paymentStatus: '',
      });
    }
    setInvoiceModalOpen(true);
  };

  /**
   * Cierra el modal de factura y reinicia el contexto de edición
   */
  const closeInvoiceModal = () => {
    setInvoiceModalOpen(false);
    setEditingInvoice(null);
  };

  /**
   * Maneja el envío del formulario de factura para operaciones de crear y actualizar
   */
  const handleInvoiceSubmit = () => {
    if (editingInvoice) {
      setInvoices(
        invoices.map((i) =>
          i.id === editingInvoice.id ? invoiceForm : i
        )
      );
    } else {
      setInvoices([...invoices, invoiceForm]);
    }
    closeInvoiceModal();
  };

  /**
   * Elimina factura por ID
   * @param {string} id - Identificador único de la factura a eliminar
   */
  const deleteInvoice = (id) => {
    setInvoices(invoices.filter((i) => i.id !== id));
  };

  /**
   * Filtra proveedores basándose en término de búsqueda que coincide con nombre de proveedor
   * @type {Array<Object>}
   */
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Filtra facturas basándose en selección de proveedor y criterios de fecha
   * @type {Array<Object>}
   */
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSupplier = supplierFilter
      ? invoice.supplierId === supplierFilter
      : true;
    const matchesDate = dateFilter
      ? invoice.issueDate === dateFilter
      : true;
    return matchesSupplier && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Sección de Encabezado de Página */}
        <div className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl shadow-lg">
                <Truck size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Gestión de Proveedores
                </h1>
                <p className="text-gray-400 text-sm">
                  Administra proveedores y facturas de compra
                </p>
              </div>
            </div>
            <button
              onClick={() => openSupplierModal()}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 font-medium"
              aria-label="Agregar nuevo proveedor"
            >
              <Plus size={20} />
              <span>Nuevo Proveedor</span>
            </button>
          </div>
        </div>

        {/* Dashboard de Estadísticas */}
        <SupplierStats
          suppliers={suppliers}
          activeSuppliers={suppliers.length}
          pendingOrders={invoices.filter(i => i.paymentStatus === 'pendiente').length}
        />

        {/* Controles de Búsqueda y Filtrado */}
        <FiltersBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          supplierFilter={supplierFilter}
          setSupplierFilter={setSupplierFilter}
          suppliers={suppliers}
        />

        {/* Tabla de Datos de Proveedores */}
        {suppliers.length > 0 ? (
          <SupplierTable
            suppliers={filteredSuppliers}
            openSupplierModal={openSupplierModal}
            deleteSupplier={deleteSupplier}
            openInvoiceModal={openInvoiceModal}
          />
        ) : (
          <EmptyState />
        )}

        {/* Tabla de Datos de Facturas */}
        {invoices.length > 0 && (
          <InvoiceTable
            invoices={filteredInvoices}
            suppliers={suppliers}
            openInvoiceModal={openInvoiceModal}
            deleteInvoice={deleteInvoice}
          />
        )}

        {/* Superposiciones Modales */}
        {supplierModalOpen && (
          <SupplierModal
            closeModal={closeSupplierModal}
            supplierForm={supplierForm}
            setSupplierForm={setSupplierForm}
            handleSupplierSubmit={handleSupplierSubmit}
            editingSupplier={editingSupplier}
          />
        )}

        {invoiceModalOpen && (
          <InvoiceModal
            closeModal={closeInvoiceModal}
            invoiceForm={invoiceForm}
            setInvoiceForm={setInvoiceForm}
            handleInvoiceSubmit={handleInvoiceSubmit}
            editingInvoice={editingInvoice}
            suppliers={suppliers}
          />
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;