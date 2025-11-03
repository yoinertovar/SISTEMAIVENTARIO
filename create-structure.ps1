# ========================================
# Script PowerShell para crear estructura del proyecto React
# Autor: ChatGPT
# Uso: Ejecutar dentro de la carpeta raíz del proyecto (inventory-frontend)
# ========================================

# Ruta base
$basePath = "src"

Write-Host "`n🚀 Iniciando creación de estructura en: $PWD`n"

# Verificar que la carpeta src exista
if (-not (Test-Path $basePath)) {
    Write-Host "❌ No se encontró la carpeta 'src'. Asegúrate de ejecutar este script desde la raíz del proyecto."
    exit
}

# ===============================
# Carpetas principales
# ===============================
$folders = @(
    "$basePath/assets/images",
    "$basePath/components/common",
    "$basePath/components/layout/Admin",
    "$basePath/components/layout/Worker",
    "$basePath/components/dashboard",
    "$basePath/components/workerDashboard",
    "$basePath/components/tables",
    "$basePath/pages/Auth",
    "$basePath/pages/Admin/Dashboard",
    "$basePath/pages/Admin/Users",
    "$basePath/pages/Admin/Suppliers",
    "$basePath/pages/Shared/Inventory",
    "$basePath/pages/Shared/Credits",
    "$basePath/pages/Shared/Sales",
    "$basePath/pages/Shared/Invoices",
    "$basePath/pages/Shared/Expenses",
    "$basePath/pages/Shared/History",
    "$basePath/pages/Worker/Dashboard",
    "$basePath/pages/Worker/CashRegister",
    "$basePath/pages/Worker/Clients",
    "$basePath/pages/Worker/Returns",
    "$basePath/routes",
    "$basePath/context",
    "$basePath/hooks",
    "$basePath/services",
    "$basePath/utils",
    "$basePath/styles"
)

# Crear carpetas
foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Force -Path $folder | Out-Null
        Write-Host "📁 Creada carpeta: $folder"
    } else {
        Write-Host "⚠️ Carpeta ya existe: $folder"
    }
}

# ===============================
# Archivos base
# ===============================
$files = @(
    "$basePath/components/common/Button.jsx",
    "$basePath/components/common/Modal.jsx",
    "$basePath/components/common/Loading.jsx",
    "$basePath/components/layout/Admin/AdminMainLayout.jsx",
    "$basePath/components/layout/Admin/AdminSidebar.jsx",
    "$basePath/components/layout/Admin/AdminHeader.jsx",
    "$basePath/components/layout/Worker/WorkerMainLayout.jsx",
    "$basePath/components/layout/Worker/WorkerSidebar.jsx",
    "$basePath/components/layout/Worker/WorkerHeader.jsx",
    "$basePath/components/dashboard/StatCard.jsx",
    "$basePath/components/dashboard/ChartCard.jsx",
    "$basePath/components/workerDashboard/WorkerDashboardCard.jsx",
    "$basePath/components/workerDashboard/CashRegisterSummary.jsx",
    "$basePath/components/tables/GenericTable.jsx",
    "$basePath/pages/Auth/LoginPage.jsx",
    "$basePath/pages/Admin/Dashboard/AdminDashboardPage.jsx",
    "$basePath/pages/Admin/Users/UsersPage.jsx",
    "$basePath/pages/Admin/Suppliers/SuppliersPage.jsx",
    "$basePath/pages/Shared/Inventory/InventoryPage.jsx",
    "$basePath/pages/Shared/Credits/CreditsPage.jsx",
    "$basePath/pages/Shared/Sales/SalesPage.jsx",
    "$basePath/pages/Shared/Invoices/InvoicesPage.jsx",
    "$basePath/pages/Shared/Expenses/ExpensesPage.jsx",
    "$basePath/pages/Shared/History/HistoryPage.jsx",
    "$basePath/pages/Shared/History/HistoryDashboard.jsx",
    "$basePath/pages/Shared/History/SalesHistory.jsx",
    "$basePath/pages/Shared/History/ExpensesHistory.jsx",
    "$basePath/pages/Shared/History/CreditsHistory.jsx",
    "$basePath/pages/Shared/History/InvoicesHistory.jsx",
    "$basePath/pages/Shared/History/AllMovementsHistory.jsx",
    "$basePath/pages/Worker/Dashboard/WorkerDashboardPage.jsx",
    "$basePath/pages/Worker/CashRegister/CashRegisterClosingPage.jsx",
    "$basePath/pages/Worker/Clients/ClientsPage.jsx",
    "$basePath/pages/Worker/Returns/ReturnsPage.jsx",
    "$basePath/routes/AppRoutes.jsx",
    "$basePath/routes/AdminRoutes.jsx",
    "$basePath/routes/WorkerRoutes.jsx",
    "$basePath/routes/PrivateRoute.jsx",
    "$basePath/context/AuthContext.jsx",
    "$basePath/hooks/useAuth.js",
    "$basePath/hooks/usePermissions.js",
    "$basePath/services/api.js",
    "$basePath/services/authService.js",
    "$basePath/utils/constants.js",
    "$basePath/utils/permissions.js",
    "$basePath/styles/index.css"
)

# Crear archivos
foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Force -Path $file | Out-Null
        Write-Host "📄 Creado archivo: $file"
    } else {
        Write-Host "⚠️ Archivo ya existe: $file"
    }
}

Write-Host "`n✅ Estructura completa creada exitosamente.`n"
