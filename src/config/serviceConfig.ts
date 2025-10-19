export const serviceConfig = {
  BASE_URL: 'https://exe-teamup.edu.vn/api',
  ENDPOINTS: {
    LOGIN_GOOGLE: '/authentication/login-google',
    STUDENT_PROFILE: '/students/profile',
    UPDATE_STUDENT: (id: string) => `/students/${id}`,
    SEARCH_STUDENTS: '/students/search',
    GROUPS: '/groups',
  },
  TIMEOUT: 5000,
};
