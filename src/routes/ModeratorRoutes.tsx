import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  ModeratorHomepage,
  GroupOverview,
  LecturerWorkload,
  AcademicSettings,
  AuditLog,
} from '../pages/Moderator';

const ModeratorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<ModeratorHomepage />} />
      <Route path='/groups' element={<GroupOverview />} />
      <Route path='/lecturers' element={<LecturerWorkload />} />
      <Route path='/settings' element={<AcademicSettings />} />
      <Route path='/audit' element={<AuditLog />} />
      <Route path='*' element={<Navigate to='/moderator' replace />} />
    </Routes>
  );
};

export default ModeratorRoutes;
