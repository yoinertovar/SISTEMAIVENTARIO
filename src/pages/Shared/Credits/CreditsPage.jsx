import React, { useState } from "react";

// Componentes de la aplicación
import Header from "./components/Header";
import Filters from "./components/Filters";
import CreditsTable from "./components/CreditsTable";
import CreditModal from "./components/CreditModal";
import DeleteModal from "./components/DeleteModal";
import SuccessAlert from "./components/SuccessAlert";

/**
 * Página principal de gestión de créditos
 * 
 * Funcionalidades:
 * - Crear, editar y eliminar créditos
 * - Filtrar y buscar créditos
 * - Gestión del estado de los créditos
 */
const CreditsPage = () => {
  // Estados principales
  const [credits, setCredits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingCredit, setEditingCredit] = useState(null);
  const [creditToDelete, setCreditToDelete] = useState(null);
  
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
              }
            : credit
        )
      );
    } else {
      // Crear nuevo crédito
      const newCredit = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        status: "activo",
      };
      setCredits([...credits, newCredit]);
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
   * Filtra los créditos según los criterios de búsqueda
   */
  const filteredCredits = credits.filter((credit) => {
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
      {showSuccess && <SuccessAlert />}

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
      />

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
    </div>
  );
};

export default CreditsPage;