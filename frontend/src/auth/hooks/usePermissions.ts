import { useRole } from "./useRole";
import { AppModule } from "../permissions/modules";
import { MODULE_ACCESS, CRUD_PERMISSIONS } from "../permissions/permissions";
import type { PermissionAction } from "../permissions/permissions";

export const usePermissions = () => {
  const { role } = useRole();

  // Check if current role has access to specific module
  const canAccessModule = (module: AppModule): boolean => {
    if (!role) return false;
    const allowedModules = MODULE_ACCESS[role];
    return allowedModules ? allowedModules.includes(module) : false;
  };

  // Check if current role has a specific granular CRUD permission
  const hasPermission = (permission: PermissionAction): boolean => {
    if (!role) return false;
    const allowedRoles = CRUD_PERMISSIONS[permission];
    return allowedRoles ? allowedRoles.includes(role) : false;
  };

  // Maps Module + action to exact PermissionAction
  const canCreate = (module: AppModule): boolean => {
    switch (module) {
      case AppModule.USERS:
        return hasPermission("users.create");
      case AppModule.TRAMITES:
        return hasPermission("tramites.create");
      case AppModule.DOCUMENTS:
        return hasPermission("documents.upload");
      case AppModule.HR:
        return hasPermission("rrhh.create");
      case AppModule.CVS:
        return hasPermission("cvs.upload");
      default:
        return false;
    }
  };

  const canEdit = (module: AppModule): boolean => {
    switch (module) {
      case AppModule.USERS:
        return hasPermission("users.edit");
      case AppModule.TRAMITES:
        return hasPermission("tramites.edit");
      case AppModule.HR:
        return hasPermission("rrhh.edit");
      default:
        return false;
    }
  };

  const canDelete = (module: AppModule): boolean => {
    switch (module) {
      case AppModule.USERS:
        return hasPermission("users.delete");
      case AppModule.TRAMITES:
        return hasPermission("tramites.delete");
      case AppModule.DOCUMENTS:
        return hasPermission("documents.delete");
      case AppModule.HR:
        return hasPermission("rrhh.delete");
      case AppModule.CVS:
        return hasPermission("cvs.delete");
      default:
        return false;
    }
  };

  const canView = (module: AppModule): boolean => {
    // If they can access the module, they can view it
    return canAccessModule(module);
  };

  return {
    canAccessModule,
    hasPermission,
    canCreate,
    canEdit,
    canDelete,
    canView,
  };
};
