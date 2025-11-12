import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  createMutationUploadFilesHook,
  updateMutationHook,
  deleteMutationHook,
} from '../queryFactory';

const BASE_URL = '/courses';

/**
 * Get course by ID
 * GET /api/courses/{id}
 */
export const useGetCourseById = createQueryWithPathParamHook(
  'course',
  BASE_URL
);

/**
 * Get all courses
 * GET /api/courses
 */
export const useGetAllCourses = createQueryHook('courses', BASE_URL);

/**
 * Get courses by semester ID
 * GET /api/courses/semester/{id}
 */
export const useGetCoursesBySemester = createQueryWithPathParamHook(
  'courses-by-semester',
  `${BASE_URL}/semester`
);

/**
 * Get courses by lecturer ID
 * GET /api/courses/lecturer/{id}
 */
export const useGetCoursesByLecturer = createQueryWithPathParamHook(
  'courses-by-lecturer',
  `${BASE_URL}/lecturer`
);

/**
 * Create new course
 * POST /api/courses
 */
export const useCreateCourse = createMutationHook('courses', BASE_URL);

/**
 * Update course by ID
 * PUT /api/courses/{id}
 */
export const useUpdateCourse = updateMutationHook('courses', BASE_URL);

/**
 * Delete course by ID
 * DELETE /api/courses/{id}
 */
export const useDeleteCourse = deleteMutationHook('courses', BASE_URL);

/**
 * Import courses from file
 * POST /api/courses/import
 */
export const useImportCourses = createMutationUploadFilesHook(
  'courses',
  `${BASE_URL}/import`
);
