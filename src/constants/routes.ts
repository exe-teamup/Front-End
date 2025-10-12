export const ROUTES = {
  // Root paths
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',

  // Profile Routes (My Profile)
  PROFILE: {
    ROOT: '/profile',
    SETTINGS: '/profile/settings',
    ACCOUNT: '/profile/account',
    POSTS: '/profile/posts',
    GROUPS: '/profile/groups',
    WALL: '/profile/wall',
  },

  // User Routes (Other Users)
  USER: {
    WALL: '/user/:username',
    POSTS: '/user/:username/posts',
    GROUPS: '/user/:username/groups',
  },

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
