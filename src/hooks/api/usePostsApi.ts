import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  updateMutationHook,
  deleteMutationHook,
} from '../queryFactory';

const BASE_URL = '/posts';

/**
 * Get all posts
 * GET /api/posts
 */
export const useGetAllPosts = createQueryHook('posts', BASE_URL);

/**
 * Get all group posts (groups recruiting members)
 * GET /api/posts/group-post
 */
export const useGetGroupPosts = createQueryHook(
  'group-posts',
  `${BASE_URL}/group-post`
);

/**
 * Get post by ID
 * GET /api/posts/{postId}
 */
export const useGetPostById = createQueryWithPathParamHook('post', BASE_URL);

/**
 * Get posts by group ID
 * GET /api/posts/group/{groupId}
 */
export const useGetPostsByGroup = createQueryWithPathParamHook(
  'posts-by-group',
  `${BASE_URL}/group`
);

/**
 * Create user post (student looking for group)
 * POST /api/posts/user-post
 */
export const useCreateUserPost = createMutationHook(
  'posts',
  `${BASE_URL}/user-post`
);

/**
 * Create group post (group recruiting members)
 * POST /api/posts/group-post
 */
export const useCreateGroupPost = createMutationHook(
  'posts',
  `${BASE_URL}/group-post`
);

/**
 * Update post by ID
 * PUT /api/posts/{id}
 */
export const useUpdatePost = updateMutationHook('posts', BASE_URL);

/**
 * Delete post by ID
 * DELETE /api/posts/{id}
 */
export const useDeletePost = deleteMutationHook('posts', BASE_URL);
