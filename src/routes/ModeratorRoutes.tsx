import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import ModeratorLayout from '../layouts/ModeratorLayout';

// Lazy load all Moderator pages for code splitting
const Dashboard = lazy(() => import('../pages/Moderator/Dashboard'));
const WorkloadGiangVien = lazy(
  () => import('../pages/Moderator/WorkloadGiangVien')
);
const GroupOverviewManagement = lazy(
  () => import('../pages/Moderator/GroupOverviewManagement')
);
const SemesterManagement = lazy(
  () => import('../pages/Moderator/SemesterManagement')
);
const TemplateManagement = lazy(
  () => import('../pages/Moderator/TemplateManagement')
);
const LecturerManagement = lazy(
  () => import('../pages/Moderator/LecturerManagement')
);
const StudentManagement = lazy(
  () => import('../pages/Moderator/StudentManagement')
);
const CourseManagement = lazy(
  () => import('../pages/Moderator/CourseManagement')
);

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    }}
  >
    <Spin size='large' tip='Đang tải...' />
  </div>
);

const ModeratorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ModeratorLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='workload'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <WorkloadGiangVien />
            </Suspense>
          }
        />
        <Route
          path='groups'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <GroupOverviewManagement />
            </Suspense>
          }
        />
        <Route
          path='semesters'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SemesterManagement />
            </Suspense>
          }
        />
        <Route
          path='templates'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TemplateManagement />
            </Suspense>
          }
        />
        <Route
          path='lecturers'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LecturerManagement />
            </Suspense>
          }
        />
        <Route
          path='students'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <StudentManagement />
            </Suspense>
          }
        />
        <Route
          path='courses'
          element={
            <Suspense fallback={<LoadingFallback />}>
              <CourseManagement />
            </Suspense>
          }
        />
        <Route path='*' element={<Navigate to='/moderator' replace />} />
      </Route>
    </Routes>
  );
};

export default ModeratorRoutes;
