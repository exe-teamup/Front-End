import { useAuthStore } from '@/store/auth';
import { SemesterManagement } from '../pages/admin/SemesterManagement';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { LecturersManagement } from '../pages/admin/LecturersManagement';
import { StudentsManagement } from '../pages/admin/StudentsManagement';
import { ModeratorsManagement } from '../pages/admin/ModeratorsManagement';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const { user } = useAuthStore.getState();

const userInfo = {
  email: user?.email || '',
  displayName: user?.displayName || '',
  photoURL: '/images/avatar.jpg',
};

const AdminRoute = {
  path: ROUTES.ADMIN.ROOT,
  element: (
    <ProtectedRoute userRole='ADMIN'>
      <DashboardLayout userRole='ADMIN' user={userInfo} />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: 'courses',
      element: <SemesterManagement />,
    },
    {
      path: 'lecturers',
      element: <LecturersManagement />,
    },
    {
      path: 'students',
      element: <StudentsManagement />,
    },
    {
      path: 'moderator',
      element: <ModeratorsManagement />,
    },
  ],
};

export default AdminRoute;
