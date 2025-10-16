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
import { ProtectedRoute } from './ProtectedRoute';
import { CreateTeam } from '@/pages/posts/CreateTeam';
import { Groups } from '@/pages/Groups';
import { GroupDetail } from '@/pages/GroupDetail';
import { PreHome } from '@/pages/prehome/PreHome';
import ChooseMajor from '@/pages/prehome/ChooseMajor';
import ChooseInterests from '@/pages/prehome/ChooseInterests';
import SuggestGroups from '@/pages/prehome/SuggestGroups';
import PostsView from '@/pages/PostsView';
import MyGroupsTab from '@/components/groups/MyGroupsTab';

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
      element: <MainLayout />,
      children: [
        // Public route: Home page
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
        },
        {
          path: '/groups/my',
          element: <Groups />,
        },
        {
          path: '/groups/request',
          element: <Groups />,
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
            {
              path: ROUTES.PROFILE.GROUPS,
              element: <MyGroupsTab />,
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
      element: <PostsLayout />,
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

export default AppRoutes;
