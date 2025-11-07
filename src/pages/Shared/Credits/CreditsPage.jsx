import React, { useState } from "react";

// Componentes de la aplicación
import Header from "./components/Header";
import Filters from "./components/Filters";
import CreditsTable from "./components/CreditsTable";
import CreditModal from "./components/CreditModal";
import DeleteModal from "./components/DeleteModal";
import SuccessAlert from "./components/SuccessAlert";
import PaymentModal from "./components/PaymentModal";
import ClientStatsView from "./components/ClientStatsView";
import ClientDetailView from "./components/ClientDetailView";

/**
 * Página principal de gestión de créditos
 * 
 * Funcionalidades:
 * - Crear, editar y eliminar créditos
 * - Registrar abonos/pagos a créditos
 * - Filtrar y buscar créditos
 * - Ver estadísticas por cliente
 * - Gestión del estado de los créditos
 */
const CreditsPage = () => {
  // Estados principales
  const [credits, setCredits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Este crédito fue creado correctamente");
  const [editingCredit, setEditingCredit] = useState(null);
  const [creditToDelete, setCreditToDelete] = useState(null);
  
  // Estados de vista
  const [viewMode, setViewMode] = useState("table"); // "table" o "clients"
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Estados de modal de pago
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [creditForPayment, setCreditForPayment] = useState(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDate, setFilterDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    clientName: "",
    clientLastName: "",
    idNumber: "",
    phone: "",
    address: "",
    totalAmount: "",
    detailedInfo: "",
  });

  /**
   * Manejador de cambios en los campos del formulario
   * @param {Object} e - Evento del input
   */
  const handleInputChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  /**
   * Resetea el formulario a sus valores iniciales
   */
  const resetForm = () => {
    setFormData({
      clientName: "",
      clientLastName: "",
      idNumber: "",
      phone: "",
      address: "",
      totalAmount: "",
      detailedInfo: "",
    });
    setEditingCredit(null);
  };

  /**
   * Valida y envía el formulario de crédito
   */
  const handleSubmit = () => {
    // Validación de campos requeridos
    const requiredFields = [
      'clientName', 
      'clientLastName', 
      'idNumber', 
      'phone', 
      'address', 
      'totalAmount'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    // Validación de identificación única
    // Permitir: Mismo nombre + mismo ID (múltiples créditos del mismo cliente)
    // NO Permitir: Diferente nombre + mismo ID (clientes diferentes con mismo ID)
    const existingClientWithSameId = credits.find(credit => 
      credit.idNumber === formData.idNumber &&
      (!editingCredit || credit.id !== editingCredit.id) // Excluir el crédito que se está editando
    );

    if (existingClientWithSameId) {
      const isSameClient = 
        existingClientWithSameId.clientName.toLowerCase() === formData.clientName.toLowerCase() &&
        existingClientWithSameId.clientLastName.toLowerCase() === formData.clientLastName.toLowerCase();
      
      if (!isSameClient) {
        alert(
          `⚠️ Error de Validación\n\n` +
          `Ya existe un cliente diferente con esta identificación:\n\n` +
          `Cliente existente: ${existingClientWithSameId.clientName} ${existingClientWithSameId.clientLastName}\n` +
          `ID: ${existingClientWithSameId.idNumber}\n\n` +
          `No se pueden registrar clientes diferentes con la misma identificación.`
        );
        return;
      }
      // Si es el mismo cliente (mismo nombre + apellido + ID), permitir crear el crédito
    }

    if (editingCredit) {
      // Actualizar crédito existente
      setCredits(
        credits.map((credit) =>
          credit.id === editingCredit.id
            ? {
                ...formData,
                id: editingCredit.id,
                date: editingCredit.date,
                status: editingCredit.status,
                payments: editingCredit.payments || [],
              }
            : credit
        )
      );
      setSuccessMessage("El crédito fue actualizado correctamente");
    } else {
      // Crear nuevo crédito
      const newCredit = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        status: "activo",
        payments: [],
      };
      setCredits([...credits, newCredit]);
      setSuccessMessage("Este crédito fue creado correctamente");
    }

    // Cerrar modal y mostrar confirmación
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  /**
   * Prepara el formulario para editar un crédito
   * @param {Object} credit - Crédito a editar
   */
  const handleEdit = (credit) => {
    setEditingCredit(credit);
    setFormData({
      clientName: credit.clientName,
      clientLastName: credit.clientLastName,
      idNumber: credit.idNumber,
      phone: credit.phone,
      address: credit.address,
      totalAmount: credit.totalAmount,
      detailedInfo: credit.detailedInfo || "",
    });
    setShowModal(true);
  };

  /**
   * Prepara la eliminación de un crédito
   * @param {Object} credit - Crédito a eliminar
   */
  const handleDelete = (credit) => {
    setCreditToDelete(credit);
    setShowDeleteConfirm(true);
  };

  /**
   * Confirma y ejecuta la eliminación del crédito
   */
  const confirmDelete = () => {
    setCredits(credits.filter((credit) => credit.id !== creditToDelete.id));
    setShowDeleteConfirm(false);
    setCreditToDelete(null);
  };

  /**
   * Abre el modal de pago para un crédito específico
   * @param {Object} credit - Crédito al que se le hará el abono
   */
  const handleOpenPaymentModal = (credit) => {
    setCreditForPayment(credit);
    setShowPaymentModal(true);
  };

  /**
   * Procesa un nuevo pago/abono
   * @param {Object} payment - Datos del pago
   */
  const handlePayment = (payment) => {
    setCredits(credits.map(credit => {
      if (credit.id === creditForPayment.id) {
        const updatedPayments = [...(credit.payments || []), payment];
        const totalPaid = updatedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
        const totalAmount = parseFloat(credit.totalAmount);
        
        // Actualizar estado del crédito si está completamente pagado
        const newStatus = totalPaid >= totalAmount ? 'pagado' : credit.status;
        
        return {
          ...credit,
          payments: updatedPayments,
          status: newStatus
        };
      }
      return credit;
    }));

    // Cerrar modal y mostrar confirmación
    setShowPaymentModal(false);
    setCreditForPayment(null);
    setSuccessMessage("El abono fue registrado correctamente");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  /**
   * Filtra los créditos según los criterios de búsqueda
   * También normaliza los créditos asegurando que todos tengan el array payments
   */
  const filteredCredits = credits
    .map(credit => ({
      ...credit,
      payments: Array.isArray(credit.payments) ? credit.payments : []
    }))
    .filter((credit) => {
      const matchesSearch =
        credit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.clientLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.idNumber.includes(searchTerm);

      const matchesStatus =
        filterStatus === "todos" || credit.status === filterStatus;

      const matchesDate = !filterDate || credit.date === filterDate;

      return matchesSearch && matchesStatus && matchesDate;
    });

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <Header 
        onAdd={() => { 
          resetForm(); 
          setShowModal(true); 
        }} 
      />

      {/* Alerta de éxito */}
      {showSuccess && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500 text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg shadow-emerald-500/30 animate-fade-in">
          <div className="bg-white/20 p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">¡Éxito!</p>
            <p className="text-sm text-emerald-100">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Selector de vista */}
      <div className="flex gap-4 bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <button
          onClick={() => {
            setViewMode("table");
            setSelectedClient(null);
          }}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
            viewMode === "table"
              ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Vista de Tabla
        </button>
        <button
          onClick={() => setViewMode("clients")}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
            viewMode === "clients"
              ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Vista por Cliente
        </button>
      </div>

      {/* Vista condicional */}
      {viewMode === "table" ? (
        <>
          {/* Componente de filtros */}
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />

          {/* Tabla de créditos */}
          <CreditsTable
            credits={filteredCredits}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPayment={handleOpenPaymentModal}
          />
        </>
      ) : (
        <>
          {/* Vista por cliente */}
          <ClientStatsView
            credits={filteredCredits}
            onSelectClient={setSelectedClient}
          />
        </>
      )}

      {/* Modal de creación/edición */}
      {showModal && (
        <CreditModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          setShowModal={setShowModal}
          editingCredit={editingCredit}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <DeleteModal
          confirmDelete={confirmDelete}
          setShowDeleteConfirm={setShowDeleteConfirm}
          setCreditToDelete={setCreditToDelete}
        />
      )}

      {/* Modal de registro de pago */}
      {showPaymentModal && creditForPayment && (
        <PaymentModal
          credit={creditForPayment}
          onPayment={handlePayment}
          onClose={() => {
            setShowPaymentModal(false);
            setCreditForPayment(null);
          }}
        />
      )}

      {/* Vista detallada de cliente */}
      {selectedClient && (
        <ClientDetailView
          clientData={selectedClient}
          onClose={() => setSelectedClient(null)}
          onPayment={handleOpenPaymentModal}
        />
      )}
    </div>
  );
};

export default CreditsPage;