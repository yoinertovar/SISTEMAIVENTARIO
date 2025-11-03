import React, { useState, useEffect } from "react";

// Componentes de la aplicación
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductsTable from "./components/ProductsTable";
import ProductModal from "./components/ProductModal";
import CategoryModal from "./components/CategoryModal";
import DeleteModal from "./components/DeleteModal";
import { CheckCircle, AlertCircle, X } from "lucide-react";

/**
 * Página principal de gestión de inventario
 * 
 * Funcionalidades:
 * - Crear, editar y eliminar productos
 * - Gestionar categorías de productos
 * - Filtrar y buscar productos
 * - Control de stock y estados de productos
 * - Cálculo automático de IVA (19%)
 * - Persistencia de datos con localStorage
 * - Validaciones robustas
 * - Notificaciones visuales
 */
const InventoryPage = () => {
  // ==================== ESTADOS DE DATOS ====================
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('inventory_products');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('inventory_categories');
    return saved ? JSON.parse(saved) : ['Electrónica', 'Alimentos', 'Ropa', 'Hogar'];
  });

  // ==================== ESTADOS DE LA INTERFAZ ====================
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // ==================== ESTADOS DE GESTIÓN TEMPORAL ====================
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // ==================== ESTADOS DE FILTROS ====================
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterState, setFilterState] = useState("");

  // ==================== ESTADO PARA NUEVA CATEGORÍA ====================
  const [newCategory, setNewCategory] = useState("");

  // ==================== ESTADOS DE NOTIFICACIONES ====================
  const [notification, setNotification] = useState({
    show: false,
    type: '', // 'success' | 'error' | 'warning'
    message: ''
  });

  // ==================== ESTADO DEL FORMULARIO ====================
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    cantidad: "",
    precioUnd: "",
    precioMayor: "",
    categoria: "",
    estado: "disponible",
    llevaIva: false, // Nuevo campo para indicar si lleva IVA
  });

  // ==================== EFECTOS ====================
  
  // Persistir productos en localStorage
  useEffect(() => {
    localStorage.setItem('inventory_products', JSON.stringify(products));
  }, [products]);

  // Persistir categorías en localStorage
  useEffect(() => {
    localStorage.setItem('inventory_categories', JSON.stringify(categories));
  }, [categories]);

  // Auto-cerrar notificaciones después de 5 segundos
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // ==================== FUNCIONES DE NOTIFICACIONES ====================
  
  /**
   * Muestra una notificación al usuario
   * @param {string} type - Tipo de notificación ('success', 'error', 'warning')
   * @param {string} message - Mensaje a mostrar
   */
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  /**
   * Cierra la notificación actual
   */
  const closeNotification = () => {
    setNotification({ show: false, type: '', message: '' });
  };

  // ==================== FUNCIONES DE VALIDACIÓN ====================
  
  /**
   * Valida que un código no esté duplicado
   * @param {string} codigo - Código a validar
   * @param {number|null} excludeId - ID del producto a excluir (al editar)
   * @returns {boolean} True si el código es válido
   */
  const isCodigoUnique = (codigo, excludeId = null) => {
    return !products.some(product => 
      product.codigo.toLowerCase() === codigo.toLowerCase() && 
      product.id !== excludeId
    );
  };

  /**
   * Determina el estado basado en la cantidad
   * @param {number} cantidad - Cantidad en stock
   * @returns {string} Estado del producto
   */
  const determineEstado = (cantidad) => {
    return parseInt(cantidad) > 0 ? 'disponible' : 'agotado';
  };

  /**
   * Valida los datos del formulario
   * @returns {Object} { isValid: boolean, errors: string[] }
   */
  const validateFormData = () => {
    const errors = [];

    // Validar campos requeridos
    if (!formData.nombre.trim()) errors.push('El nombre es obligatorio');
    if (!formData.codigo.trim()) errors.push('El código es obligatorio');
    if (!formData.cantidad) errors.push('La cantidad es obligatoria');
    if (!formData.precioUnd) errors.push('El precio unitario es obligatorio');
    if (!formData.precioMayor) errors.push('El precio por mayor es obligatorio');
    if (!formData.categoria) errors.push('La categoría es obligatoria');

    // Validar valores numéricos
    if (parseFloat(formData.cantidad) < 0) errors.push('La cantidad no puede ser negativa');
    if (parseFloat(formData.precioUnd) <= 0) errors.push('El precio unitario debe ser mayor a 0');
    if (parseFloat(formData.precioMayor) <= 0) errors.push('El precio por mayor debe ser mayor a 0');

    // Validar lógica de precios
    if (parseFloat(formData.precioMayor) > parseFloat(formData.precioUnd)) {
      errors.push('El precio por mayor debe ser menor o igual al precio unitario');
    }

    // Validar código único
    if (!isCodigoUnique(formData.codigo, editingProduct?.id)) {
      errors.push('Ya existe un producto con este código');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // ==================== FUNCIONES DE GESTIÓN ====================
  
  /**
   * Manejador de cambios en los campos del formulario
   * @param {Object} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = type === 'checkbox' ? checked : value;
    
    // Procesamiento especial para cantidad
    if (name === 'cantidad') {
      processedValue = value;
      // Actualizar estado automáticamente según cantidad
      const newEstado = determineEstado(value);
      setFormData(prevData => ({ 
        ...prevData, 
        [name]: processedValue,
        estado: newEstado
      }));
      return;
    }
    
    setFormData(prevData => ({ 
      ...prevData, 
      [name]: processedValue 
    }));
  };

  /**
   * Valida y envía el formulario de producto
   */
  const handleSubmit = () => {
    // Validar formulario
    const validation = validateFormData();
    
    if (!validation.isValid) {
      showNotification('error', validation.errors.join('. '));
      return;
    }

    // Preparar datos del producto
    const productData = {
      ...formData,
      cantidad: parseInt(formData.cantidad),
      precioUnd: parseFloat(formData.precioUnd).toFixed(2),
      precioMayor: parseFloat(formData.precioMayor).toFixed(2),
      estado: determineEstado(formData.cantidad),
      updatedAt: new Date().toISOString()
    };

    if (editingProduct) {
      // Actualizar producto existente
      setProducts(products.map(product =>
        product.id === editingProduct.id 
          ? { ...productData, id: product.id, createdAt: product.createdAt } 
          : product
      ));
      showNotification('success', `Producto "${formData.nombre}" actualizado exitosamente`);
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...productData,
        id: Date.now() + Math.random(), // ID único
        createdAt: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
      showNotification('success', `Producto "${formData.nombre}" agregado exitosamente`);
    }
    
    resetForm();
  };

  /**
   * Resetea el formulario a sus valores iniciales
   */
  const resetForm = () => {
    setFormData({
      nombre: "",
      codigo: "",
      cantidad: "",
      precioUnd: "",
      precioMayor: "",
      categoria: "",
      estado: "disponible",
      llevaIva: false,
    });
    setShowModal(false);
    setEditingProduct(null);
  };

  /**
   * Prepara el formulario para editar un producto
   * @param {Object} product - Producto a editar
   */
  const handleEdit = (product) => {
    setFormData({
      ...product,
      llevaIva: product.llevaIva || false
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  /**
   * Prepara la eliminación de un producto
   * @param {Object} product - Producto a eliminar
   */
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  /**
   * Confirma y ejecuta la eliminación del producto
   */
  const confirmDelete = () => {
    const productName = productToDelete.nombre;
    setProducts(products.filter(product => product.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
    showNotification('success', `Producto "${productName}" eliminado exitosamente`);
  };

  /**
   * Agrega una nueva categoría a la lista
   */
  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    
    if (!trimmedCategory) {
      showNotification('error', 'Por favor ingrese un nombre para la categoría');
      return;
    }
    
    // Validar duplicados (case-insensitive)
    if (categories.some(cat => cat.toLowerCase() === trimmedCategory.toLowerCase())) {
      showNotification('error', 'Esta categoría ya existe');
      return;
    }

    setCategories([...categories, trimmedCategory]);
    setFormData(prevData => ({ ...prevData, categoria: trimmedCategory }));
    setNewCategory("");
    setShowCategoryModal(false);
    showNotification('success', `Categoría "${trimmedCategory}" agregada exitosamente`);
  };

  // ==================== FUNCIONES DE FILTRADO ====================
  
  /**
   * Filtra los productos según los criterios de búsqueda
   * @returns {Array} Productos filtrados
   */
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "" || product.categoria === filterCategory;

    const matchesState =
      filterState === "" || product.estado === filterState;

    return matchesSearch && matchesCategory && matchesState;
  });

  // ==================== RENDERIZADO ====================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Notificación */}
        {notification.show && (
          <div 
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-sm animate-slide-in ${
              notification.type === 'success' 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : notification.type === 'error'
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-amber-500/20 border-amber-500/50 text-amber-400'
            }`}
            role="alert"
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={closeNotification}
              className="ml-2 hover:opacity-70 transition-opacity"
              aria-label="Cerrar notificación"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header de la página */}
        <Header onAdd={() => setShowModal(true)} />

        {/* Componente de filtros */}
        <Filters
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterState={filterState}
          setFilterState={setFilterState}
        />

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Total Productos</p>
            <p className="text-2xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Disponibles</p>
            <p className="text-2xl font-bold text-emerald-400">
              {products.filter(p => p.estado === 'disponible').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Agotados</p>
            <p className="text-2xl font-bold text-red-400">
              {products.filter(p => p.estado === 'agotado').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Categorías</p>
            <p className="text-2xl font-bold text-blue-400">{categories.length}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <ProductsTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Modal de creación/edición de productos */}
        {showModal && (
          <ProductModal
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            categories={categories}
            resetForm={resetForm}
            editingProduct={editingProduct}
            setShowCategoryModal={setShowCategoryModal}
          />
        )}

        {/* Modal para agregar categorías */}
        {showCategoryModal && (
          <CategoryModal
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleAddCategory={handleAddCategory}
            setShowCategoryModal={setShowCategoryModal}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        {showDeleteModal && (
          <DeleteModal
            confirmDelete={confirmDelete}
            setShowDeleteModal={setShowDeleteModal}
            productName={productToDelete?.nombre}
          />
        )}
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InventoryPage;