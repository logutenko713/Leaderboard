import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Permission } from '../types/auth';

interface PermissionRouteProps {
  permission: Permission;
  children: ReactNode;
}

export function PermissionRoute({ permission, children }: PermissionRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.permissions.includes(permission)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}