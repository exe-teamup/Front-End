import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { About } from '../pages/About';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  const routing = useRoutes([
    // Auth Routes
    {
      element: <AuthLayout />,
      children: [
        {
          path: ROUTES.AUTH.ROOT,
          element: <Login />,
        },
        // Forgot Password route can be added here
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // Public route: Home page
        {
          index: true,
          path: ROUTES.HOME,
          element: <Home />,
        },
        // Protected routes (everything else under main layout)
        {
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [{ path: 'about', element: <About /> }],
        },
        {
          path: ROUTES.PROFILE.replace(/^\//, ''),
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    // Admin Routes
    {
      path: ROUTES.ADMIN.ROOT.replace(/^\//, ''),
      element: (
        <ProtectedRoute userRole='ADMIN'>
          <MainLayout />
        </ProtectedRoute>
      ),
    },
    // Redirect unknown routes
    {
      path: '*',
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ]);

  return routing;
}
