export const API_ENDPOINTS = {
  // Semester endpoints
  SEMESTERS: {
    BASE: '/semesters',
    BY_ID: (id: number) => `/semesters/${id}`,
    ACTIVE: '/semesters?status=ACTIVE',
  },

  LECTURERS: {
    BASE: '/lecturers',
    BY_ID: (id: number) => `/lecturers/${id}`,
  },

  COURSES: {
    BASE: '/courses',
    BY_ID: (id: number) => `/courses/${id}`,
    BY_SEMESTER: (semesterId: number) => `/courses/semester/${semesterId}`,
    BY_LECTURER: (lecturerId: number) => `/courses/lecturer/${lecturerId}`,
    IMPORT: '/courses/import',
  },

  STUDENTS: {
    BASE: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    IMPORT: '/users/import',
    IMPORT_NOT_ELIGIBLE: '/users/import-not-eligible',
  },

  DASHBOARD: {
    STATS: '/dashboard/stats',
  },
} as const;

export default API_ENDPOINTS;
