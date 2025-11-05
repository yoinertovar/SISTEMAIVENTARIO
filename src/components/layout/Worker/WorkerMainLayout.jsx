/**
 * WorkerMainLayout - Layout Principal del Trabajador
 * 
 * Componente que estructura la interfaz completa del trabajador con:
 * - Sidebar lateral colapsable con tema verde-teal
 * - Header superior fijo con identidad visual diferenciada
 * - Área de contenido principal con scroll
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido que se renderizará en el área principal
 * 
 * MEJORA SCROLL: Se optimizó el contenedor principal para scroll suave
 */

import React, { useState } from 'react';
import WorkerSidebar from './WorkerSidebar';
import WorkerHeader from './WorkerHeader';

const WorkerMainLayout = ({ children }) => {
  // Estado para controlar la apertura del sidebar en móvil
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // Contenedor principal de toda la aplicación del trabajador
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Sidebar lateral con menú de navegación y tema verde-teal */}
      <WorkerSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Contenedor principal con header y contenido */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header superior fijo que permanece visible al hacer scroll */}
        <header
          className="sticky top-0 z-50 shadow flex-shrink-0"
          style={{
            backgroundColor: "var(--color-header)",
            color: "white",
          }}
        >
          <WorkerHeader setIsMobileOpen={setIsMobileOpen} />
        </header>

        {/* Área de contenido principal con scroll independiente */}
        <main
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          style={{ 
            backgroundColor: "var(--color-surface)",
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerMainLayout;