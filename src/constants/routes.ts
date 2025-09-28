export const ROUTES = {
  // Root paths
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // Admin Routes
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
  },

  // Auth Routes
  AUTH: {
    ROOT: '/login',
  },
} as const;
