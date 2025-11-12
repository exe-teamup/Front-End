import { GroupDetail } from '@/pages/GroupDetail';
import { Groups } from '@/pages/Groups';
import { CreateTeam } from '@/pages/posts/CreateTeam';
import PostsView from '@/pages/PostsView';
import ChooseInterests from '@/pages/prehome/ChooseInterests';
import ChooseMajor from '@/pages/prehome/ChooseMajor';
import { PreHome } from '@/pages/prehome/PreHome';
import SuggestGroups from '@/pages/prehome/SuggestGroups';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthLayout } from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import { PostsLayout } from '../layouts/PostsLayout';
import { About } from '../pages/About';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { AccountSetting } from '../pages/profile/AccountSetting';
import { UserProfile } from '../pages/UserProfile';
import AdminRoute from './AdminRoute';
import ModeratorRoute from './ModeratorRoutes';
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
        {
          path: '/hot-setup/',
          element: <PreHome />,
        },
        {
          path: '/hot-setup/choose-major',
          element: <ChooseMajor />,
        },
        {
          path: '/hot-setup/choose-interests',
          element: <ChooseInterests />,
        },
        {
          path: '/hot-setup/group-suggestions',
          element: <SuggestGroups />,
        },
        // Forgot Password route can be added here
      ],
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: '/posts/create-post',
          element: <CreateTeam />,
        },
        {
          path: '/groups',
          element: <Groups />,
          children: [
            { index: true, path: '/groups/my' },
            { index: false, path: '/groups/all' },
            { index: false, path: '/groups/request' },
            { index: false, path: '/groups/my/requests' },
          ],
        },
        {
          path: '/groups/:groupId',
          element: <GroupDetail />,
        },
        {
          path: '/posts',
          element: <PostsView />,
        },
        // Public route for demo: profile
        {
          path: ROUTES.PROFILE.ROOT,
          children: [
            {
              index: true,
              element: <AccountSetting />,
            },
          ],
        },
        // User profile routes
        {
          path: 'exe/:username',
          element: <UserProfile />,
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
          path: ROUTES.PROFILE.ROOT,
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    // Posts-only layout without footer
    {
      path: '/posts',
      element: (
        <ProtectedRoute>
          <PostsLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <PostsView />,
        },
        {
          path: 'recruit',
          element: <PostsView />,
        },
        {
          path: 'looking',
          element: <PostsView />,
        },
      ],
    },
    // Admin Routes
    AdminRoute,

    // Moderator Routes
    ModeratorRoute,

    // Redirect unknown routes
    {
      path: '*',
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ]);

  return routing;
}

export default AppRoutes;
