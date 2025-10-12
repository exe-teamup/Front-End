import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuthReady } from '../hooks/useAuthReady';
import { useAuthStore } from '../store/auth';
import type { UserRole } from '../types/account';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const location = useLocation();
  const status = useAuthStore(s => s.status);
  const account = useAuthStore(s => s.account);
  const isReady = useAuthReady();

  // Wait until Firebase auth listener reports a definitive state
  if (!isReady) {
    return <div className='p-4 text-center'>Checking authentication…</div>;
  }

  const isAuthenticated = status === 'authenticated';
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location.pathname || ROUTES.HOME }}
      />
    );
  }

  if (role && account && account.role !== role) {
    return <div className='p-4 text-center'>Access denied</div>;
  }

  return <>{children}</>;
}
