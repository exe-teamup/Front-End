export const API_ENDPOINTS = {
  // Semester endpoints
  SEMESTERS: {
    BASE: '/semesters',
    BY_ID: (id: number) => `/semesters/${id}`,
    ACTIVE: '/semesters?status=ACTIVE',
  },
} as const;

export default API_ENDPOINTS;
