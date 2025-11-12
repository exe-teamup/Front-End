import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  createMutationUploadFilesHook,
  updateMutationHook,
  deleteMutationHook,
  createSearchQueryHook,
} from '../queryFactory';

const BASE_URL = '/users';

/**
 * Get user by ID
 * GET /api/users/{id}
 */
export const useGetUserById = createQueryWithPathParamHook('user', BASE_URL);

/**
 * Get all users
 * GET /api/users
 */
export const useGetAllUsers = createQueryHook('users', BASE_URL);

/**
 * Get users without group
 * GET /api/users/without-group
 */
export const useGetUsersWithoutGroup = createQueryHook(
  'users-without-group',
  `${BASE_URL}/without-group`
);

/**
 * Search users
 * GET /api/users/search
 */
export const useSearchUsers = createSearchQueryHook(
  'users-search',
  `${BASE_URL}/search`
);

/**
 * Get current user profile
 * GET /api/users/profile
 */
export const useGetUserProfile = createQueryHook(
  'user-profile',
  `${BASE_URL}/profile`
);

/**
 * Get users with pagination
 * GET /api/users/page
 */
export const useGetUsersPaginated = createQueryHook(
  'users-page',
  `${BASE_URL}/page`
);

/**
 * Get users by course ID
 * GET /api/users/course/{id}
 */
export const useGetUsersByCourse = createQueryWithPathParamHook(
  'users-by-course',
  `${BASE_URL}/course`
);

/**
 * Update user by ID
 * PUT /api/users/{id}
 */
export const useUpdateUser = updateMutationHook('users', BASE_URL);

/**
 * Delete user by ID
 * DELETE /api/users/{id}
 */
export const useDeleteUser = deleteMutationHook('users', BASE_URL);

/**
 * Move user to different course
 * PUT /api/users/move-course
 */
export const useMoveCourse = createMutationHook(
  'users',
  `${BASE_URL}/move-course`
);

/**
 * Swap course between users
 * POST /api/users/swap-course
 */
export const useSwapCourse = createMutationHook(
  'users',
  `${BASE_URL}/swap-course`
);

/**
 * Import users from file
 * POST /api/users/import
 */
export const useImportUsers = createMutationUploadFilesHook(
  'users',
  `${BASE_URL}/import`
);

/**
 * Import not eligible users from file
 * POST /api/users/import-not-eligible
 */
export const useImportNotEligibleUsers = createMutationUploadFilesHook(
  'users',
  `${BASE_URL}/import-not-eligible`
);
