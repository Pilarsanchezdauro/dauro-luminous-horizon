import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isStaff, roles } = useAuth();

  console.log('ProtectedRoute - User:', user?.email, 'Roles:', roles, 'isStaff:', isStaff, 'Loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isStaff) {
    console.log('ProtectedRoute - User is not staff, redirecting to /');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
