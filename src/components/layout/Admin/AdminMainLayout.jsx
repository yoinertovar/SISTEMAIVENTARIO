/**
 * AdminMainLayout - Layout Principal del Administrador
 * 
 * Componente que estructura la interfaz completa del administrador con:
 * - Sidebar lateral colapsable
 * - Header superior fijo
 * - Área de contenido principal con scroll
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido que se renderizará en el área principal
 * 
 * @example
 * // Uso en las rutas del administrador
 * <AdminMainLayout>
 *   <AdminDashboardPage />
 * </AdminMainLayout>
 */

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminMainLayout = ({ children }) => {
  // Estado para controlar la apertura del sidebar en móvil
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // Contenedor principal de toda la aplicación
    <div
      className="flex min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Sidebar lateral con menú de navegación */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Contenedor principal con header y contenido */}
      <div className="flex-1 flex flex-col">
        {/* Header superior fijo que permanece visible al hacer scroll */}
        <header
          className="sticky top-0 z-50 shadow"
          style={{
            backgroundColor: "var(--color-header)",
            color: "white",
          }}
        >
          <AdminHeader setIsMobileOpen={setIsMobileOpen} />
        </header>

        {/* Área de contenido principal con scroll independiente */}
        <main
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminMainLayout;