import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;

  // Còn trưởng bộ môn
  role?: 'student' | 'teacher' | 'admin';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // TODO: Implement authentication logic
  const isAuthenticated = false;
  const userRole = 'student';

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  if (role && userRole !== role) {
    return <div>Access denied</div>;
  }

  return <>{children}</>;
}
