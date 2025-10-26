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
    STUDENTS: '/admin/students',
    LECTURERS: '/admin/lecturers',
    // MODERATOR: '/admin/moderator',
    SEMESTERS: '/admin/semesters',
    CLASSES: '/admin/classes',
    SETTINGS: '/admin/settings',
  },

  MODERATOR: {
    ROOT: '/moderator',
    DASHBOARD: '/moderator/dashboard',
  },

  // Auth Routes
  AUTH: {
    ROOT: '/login',
  },
} as const;
