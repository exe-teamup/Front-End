export const serviceConfig = {
  BASE_URL: 'https://exe-teamup.edu.vn/api',
  ENDPOINTS: {
    LOGIN_GOOGLE: '/authentication/login-google',
    LOGOUT: '/authentication/logout',
    STUDENT_PROFILE: '/students/profile',
    UPDATE_STUDENT: (id: string) => `/students/${id}`,
    SEARCH_STUDENTS: '/students/search',
    GROUPS: '/groups',
    GROUP_BY_ID: (id: string) => `/groups/${id}`,
    POSTS: '/posts',
    GROUP_POSTS: '/posts/group-post',
  },
  TIMEOUT: 5000,
};
