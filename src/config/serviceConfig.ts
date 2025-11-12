export const serviceConfig = {
  BASE_URL: 'https://exe-teamup.edu.vn/api',
  ENDPOINTS: {
    LOGIN_GOOGLE: '/authentication/login-google',
    LOGOUT: '/authentication/logout',
    STUDENT_PROFILE: '/users/profile',
    UPDATE_STUDENT: (id: string) => `/students/${id}`,
    SEARCH_STUDENTS: '/users/search',
    GROUPS: '/groups',
    GROUP_BY_ID: (id: string) => `/groups/${id}`,
    GROUP_TEMPLATES: '/group-templates',
    POSTS: '/posts',
    GROUP_POSTS: '/posts/group-post',
    USER_POSTS: '/posts/user-post',
    MAJORS: '/majors',
    JOIN_REQUESTS: '/join-requests',
  },
  TIMEOUT: 5000,
};
