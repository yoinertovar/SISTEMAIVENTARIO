import React, { useState } from 'react';
import { DollarSign, Plus, Search, CheckCircle } from 'lucide-react';

// Componentes de gastos
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import ExpenseStats from './components/ExpenseStats';
import ExpenseEmptyState from './components/ExpenseEmptyState';

/**
 * Página principal de gestión de gastos
 * 
 * Funcionalidades:
 * - Crear, editar y eliminar gastos
 * - Visualizar estadísticas de gastos
 * - Buscar y filtrar gastos
 * - Gestión del estado de pagos
 */
const ExpensesPage = () => {
  // Estados de la interfaz
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estados de datos
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreGasto: '',
    descripcion: '',
    monto: '',
    fechaGasto: new Date().toISOString().split('T')[0],
    estadoPago: 'Pendiente',
    metodoPago: ''
  });

  /**
   * Manejador de cambios en los campos del formulario
   * @param {Object} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Guarda un nuevo gasto en la lista
   */
  const handleSaveExpense = () => {
    // Validación básica de campos requeridos
    if (!formData.nombreGasto || !formData.monto || !formData.fechaGasto) {
      alert('Por favor complete los campos requeridos: Nombre, Monto y Fecha');
      return;
    }

    const newExpense = {
      id: String(expenses.length + 1).padStart(3, '0'),
      ...formData,
      categoria: 'General'
    };
    
    setExpenses([...expenses, newExpense]);
    setShowNewExpense(false);
    setSuccessMessage('¡Gasto creado correctamente!');
    setShowSuccess(true);
    resetForm();
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  /**
   * Prepara el formulario para editar un gasto existente
   * @param {Object} expense - Gasto a editar
   */
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setFormData({
      nombreGasto: expense.nombreGasto,
      descripcion: expense.descripcion,
      monto: expense.monto,
      fechaGasto: expense.fechaGasto,
      estadoPago: expense.estadoPago,
      metodoPago: expense.metodoPago
    });
    setShowEditExpense(true);
  };

  /**
   * Actualiza un gasto existente en la lista
   */
  const handleUpdateExpense = () => {
    // Validación básica de campos requeridos
    if (!formData.nombreGasto || !formData.monto || !formData.fechaGasto) {
      alert('Por favor complete los campos requeridos: Nombre, Monto y Fecha');
      return;
    }

    const updatedExpenses = expenses.map(exp => 
      exp.id === editingExpense.id 
        ? { ...exp, ...formData }
        : exp
    );
    
    setExpenses(updatedExpenses);
    setShowEditExpense(false);
    setEditingExpense(null);
    setSuccessMessage('¡Gasto actualizado correctamente!');
    setShowSuccess(true);
    resetForm();

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  /**
   * Elimina un gasto de la lista
   * @param {string} id - ID del gasto a eliminar
   */
  const handleDeleteExpense = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este gasto?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
      setSuccessMessage('¡Gasto eliminado correctamente!');
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  /**
   * Cancela la operación actual y resetea el formulario
   */
  const handleCancel = () => {
    setShowNewExpense(false);
    setShowEditExpense(false);
    setEditingExpense(null);
    resetForm();
  };

  /**
   * Resetea el formulario a sus valores iniciales
   */
  const resetForm = () => {
    setFormData({
      nombreGasto: '',
      descripcion: '',
      monto: '',
      fechaGasto: new Date().toISOString().split('T')[0],
      estadoPago: 'Pendiente',
      metodoPago: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Notificación de éxito */}
        {showSuccess && (
          <div 
            className="fixed top-4 right-4 bg-[#1a1f2e] p-5 rounded-xl shadow-2xl border-2 border-emerald-500 z-50 animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-emerald-400" size={32} aria-hidden="true" />
              <div>
                <p className="font-bold text-white">{successMessage}</p>
                <p className="text-sm text-gray-400">La operación se realizó exitosamente</p>
              </div>
            </div>
          </div>
        )}

        {/* Modales de formulario */}
        {showEditExpense && (
          <ExpenseForm
            mode="edit"
            formData={formData}
            onInputChange={handleInputChange}
            onSave={handleUpdateExpense}
            onCancel={handleCancel}
          />
        )}

        {showNewExpense && (
          <ExpenseForm
            mode="create"
            formData={formData}
            onInputChange={handleInputChange}
            onSave={handleSaveExpense}
            onCancel={handleCancel}
          />
        )}

        {/* Header de la página */}
        <header className="bg-[#1a1f2e] p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg">
                <DollarSign size={32} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gestión de Gastos</h1>
                <p className="text-gray-400 text-sm">Controla todos los gastos del negocio</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewExpense(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/50 font-medium"
              aria-label="Crear nuevo gasto"
            >
              <Plus size={20} aria-hidden="true" />
              <span>Nuevo Gasto</span>
            </button>
          </div>
        </header>

        {/* Estadísticas de gastos */}
        <ExpenseStats expenses={expenses} />

        {/* Búsqueda de gastos */}
        <section className="bg-[#1a1f2e] p-4 rounded-xl shadow-xl border border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
                size={20} 
                aria-hidden="true" 
              />
              <input
                type="text"
                placeholder="Buscar gastos..."
                className="w-full pl-10 pr-4 py-3 bg-[#0f1419] text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none placeholder-gray-500 transition-all"
                aria-label="Buscar gastos"
              />
            </div>
          </div>
        </section>

        {/* Tabla de gastos o estado vacío */}
        <section aria-live="polite">
          {expenses.length > 0 ? (
            <ExpenseTable
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          ) : (
            <ExpenseEmptyState />
          )}
        </section>
      </div>
    </div>
  );
};

export default ExpensesPage;