import { useRoutes, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { Login } from '../pages/auth/Login';
import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { ROUTES } from '../constants/routes';

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
      // Set protected routes with MainLayout later
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },

    // Redirect unknown routes
    {
      path: '*',
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ]);

  return routing;
}
