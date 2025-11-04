import { useAuthStore } from '@/store/auth';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Dashboard } from '@/pages/Moderator/Dashboard';
import { WorkloadGiangVien } from '@/pages/Moderator/WorkloadGiangVien';
import { GroupOverviewManagement } from '@/pages/Moderator/GroupOverviewManagement';
import { SemesterManagement } from '@/pages/Moderator/SemesterManagement';
import { TemplateManagement } from '@/pages/Moderator/TemplateManagement';
import { LecturerManagement } from '@/pages/Moderator/LecturerManagement';
import { StudentManagement } from '@/pages/Moderator/StudentManagement';
import { CourseManagement } from '@/pages/Moderator/CourseManagement';

const { user } = useAuthStore.getState();

const userInfo = {
  email: user?.email || '',
  displayName: user?.displayName || '',
  photoURL: '/images/avatar.jpg',
};

const ModeratorRoute = {
  path: ROUTES.MODERATOR.ROOT,
  element: (
    <ProtectedRoute userRole='MODERATOR'>
      <DashboardLayout userRole='MODERATOR' user={userInfo} />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: 'workload',
      element: <WorkloadGiangVien />,
    },
    {
      path: 'groups',
      element: <GroupOverviewManagement />,
    },
    {
      path: 'semesters',
      element: <SemesterManagement />,
    },
    {
      path: 'templates',
      element: <TemplateManagement />,
    },
    {
      path: 'lecturers',
      element: <LecturerManagement />,
    },
    {
      path: 'students',
      element: <StudentManagement />,
    },
    {
      path: 'courses',
      element: <CourseManagement />,
    },
  ],
};

export default ModeratorRoute;
