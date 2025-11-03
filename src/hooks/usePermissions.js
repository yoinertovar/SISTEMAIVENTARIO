import { useAuth } from './useAuth';
import { 
  hasPermission, 
  hasAllPermissions, 
  hasAnyPermission 
} from '../utils/permissions';

/**
 * Custom hook para gestionar permisos basados en el rol del usuario
 * 
 * @returns {Object} Objeto con funciones de verificación de permisos:
 *   - hasPermission(permission): Verifica un permiso específico
 *   - hasAllPermissions(permissions): Verifica múltiples permisos (AND)
 *   - hasAnyPermission(permissions): Verifica al menos un permiso (OR)
 * 
 * @example
 * // Verificar un permiso individual
 * const { hasPermission } = usePermissions();
 * const canEdit = hasPermission('users.edit');
 * 
 * @example
 * // Verificar múltiples permisos (todos requeridos)
 * const { hasAllPermissions } = usePermissions();
 * const canManageUsers = hasAllPermissions(['users.read', 'users.write']);
 * 
 * @example
 * // Verificar permisos alternativos (al menos uno)
 * const { hasAnyPermission } = usePermissions();
 * const hasAccess = hasAnyPermission(['admin.access', 'moderator.access']);
 */
export const usePermissions = () => {
  const { role } = useAuth();

  return {
    hasPermission: (permission) => hasPermission(role, permission),
    hasAllPermissions: (permissions) => hasAllPermissions(role, permissions),
    hasAnyPermission: (permissions) => hasAnyPermission(role, permissions),
  };
};