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
    IMPORT: '/courses/import',
  },
} as const;

export default API_ENDPOINTS;
