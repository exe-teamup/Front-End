import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  createMutationUploadFilesHook,
  updateMutationHook,
  deleteMutationHook,
} from '../queryFactory';

const BASE_URL = '/majors';

/**
 * Get all majors
 * GET /api/majors
 */
export const useGetAllMajors = createQueryHook('majors', BASE_URL);

/**
 * Get majors by parent ID
 * GET /api/majors/parent/{id}
 */
export const useGetMajorsByParent = createQueryWithPathParamHook(
  'majors-by-parent',
  `${BASE_URL}/parent`
);

/**
 * Get majors by level
 * GET /api/majors/level/{level}
 */
export const useGetMajorsByLevel = createQueryWithPathParamHook(
  'majors-by-level',
  `${BASE_URL}/level`
);

/**
 * Create new major
 * POST /api/majors
 */
export const useCreateMajor = createMutationHook('majors', BASE_URL);

/**
 * Update major by ID
 * PUT /api/majors/{id}
 */
export const useUpdateMajor = updateMutationHook('majors', BASE_URL);

/**
 * Delete major by ID
 * DELETE /api/majors/{id}
 */
export const useDeleteMajor = deleteMutationHook('majors', BASE_URL);

/**
 * Import majors from file
 * POST /api/majors/import
 */
export const useImportMajors = createMutationUploadFilesHook(
  'majors',
  `${BASE_URL}/import`
);
