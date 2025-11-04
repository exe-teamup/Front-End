import { useEffect, useMemo } from 'react';
import { usePostStore } from '../store/post';

/**
 * Custom hook to retrieve and manage post-related data
 *
 * This hook provides:
 * - All posts from the API
 * - Filtered/sorted posts for different sections (hot posts, latest posts, etc.)
 * - Loading and error states
 *
 * Use cases:
 * - Home page sections (LatestPostSection, PostSection)
 * - Posts listing pages
 * - Post search/filter functionality
 *
 * @returns Object containing posts data, filtered views, and loading states
 */
export const usePosts = () => {
  const { posts, listStatus, listError, fetchAllPosts } = usePostStore();

  // Fetch all posts on mount only if not already loading/loaded
  useEffect(() => {
    if (listStatus === 'idle') {
      fetchAllPosts();
    }
  }, [fetchAllPosts, listStatus]);

  // Filter active posts only (exclude trashed/deleted)
  const activePosts = useMemo(() => {
    return posts.filter(post => post.postStatus === 'ACTIVE');
  }, [posts]);

  // Get latest posts sorted by creation date (newest first)
  const latestPosts = useMemo(() => {
    return [...activePosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [activePosts]);

  /* ============================================================
   * HOT POSTS - UNDER DEVELOPMENT
   * ============================================================
   * When server provides request count or popularity metric,
   * uncomment and implement this section:
   *
   * const hotPosts = useMemo(() => {
   *   return [...activePosts]
   *     .filter(post => (post.requestCount ?? 0) > 0)
   *     .sort((a, b) => (b.requestCount ?? 0) - (a.requestCount ?? 0));
   * }, [activePosts]);
   *
   * For now, we'll use latest posts as a placeholder for hot posts
   * ============================================================ */

  // Placeholder: Use latest posts as hot posts until API provides popularity data
  const hotPosts = latestPosts;

  // Calculate loading state
  const isLoading = listStatus === 'loading';
  const isSuccess = listStatus === 'success';
  const isError = listStatus === 'error';

  /* ============================================================
   * FUTURE ACTIONS - UNDER DEVELOPMENT
   * ============================================================
   * When additional post APIs become available, add these methods:
   *
   * const createPost = async (data: CreatePostRequest) => {
   *   await postStore.createPost(data);
   * };
   *
   * const updatePost = async (id: string, data: Partial<GroupPost>) => {
   *   await postStore.updatePost(id, data);
   * };
   *
   * const deletePost = async (id: string) => {
   *   await postStore.deletePost(id);
   * };
   *
   * const fetchPostById = async (id: string) => {
   *   await postStore.fetchPostById(id);
   * };
   *
   * Then add these to the return object below
   * ============================================================ */

  return {
    // All posts data
    allPosts: posts,
    activePosts,

    // Filtered/sorted views
    latestPosts,
    hotPosts, // Currently same as latestPosts until API provides popularity data

    // Loading states
    isLoading,
    isSuccess,
    isError,
    error: listError,

    // Utility methods
    refetch: fetchAllPosts,

    /* ============================================================
     * FUTURE METHODS - UNDER DEVELOPMENT
     * ============================================================
     * Uncomment when APIs are ready:
     *
     * // CRUD operations
     * createPost,
     * updatePost,
     * deletePost,
     * fetchPostById,
     * ============================================================ */
  };
};

/* ============================================================
 * TYPE DEFINITIONS FOR FUTURE USE
 * ============================================================
 * Add these interfaces when create/update APIs are ready:
 *
 * export interface CreatePostRequest {
 *   title: string;
 *   postDetail?: string;
 *   groupId: string;
 *   postMajors?: {
 *     majorCode: string;
 *     quantity: number;
 *   }[];
 * }
 *
 * export interface UpdatePostRequest {
 *   title?: string;
 *   postDetail?: string;
 *   postStatus?: PostStatus;
 *   postMajors?: {
 *     majorCode: string;
 *     quantity: number;
 *   }[];
 * }
 *
 * Add requestCount to GroupPost interface when available:
 * export interface GroupPost {
 *   // ... existing fields
 *   requestCount?: number; // For hot posts ranking
 * }
 * ============================================================ */
