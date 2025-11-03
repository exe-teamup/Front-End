import { useEffect, useMemo } from 'react';
import { usePostStore } from '../store/post';

type PostViewTab = 'ALL' | 'RECRUIT' | 'LOOKING';

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
 * @param tab - Optional tab filter to fetch specific post types
 * @returns Object containing posts data, filtered views, and loading states
 */
export const usePosts = (tab?: PostViewTab) => {
  const {
    posts,
    listStatus,
    listError,
    fetchAllPosts,
    fetchPostById,
    updatePost,
    deletePost,
    updateStatus,
    updateError,
    deleteStatus,
    deleteError,
    clearUpdateStatus,
    clearDeleteStatus,
  } = usePostStore();

  // Fetch all posts once on mount only if not already loading/loaded
  useEffect(() => {
    if (listStatus === 'idle') {
      fetchAllPosts();
    }
  }, [fetchAllPosts, listStatus]);

  // Filter active posts only (exclude trashed/deleted)
  const activePosts = useMemo(() => {
    let filtered = posts.filter(post => post.postStatus === 'ACTIVE');

    // Filter by tab/postType if tab is specified
    if (tab === 'RECRUIT') {
      filtered = filtered.filter(post => post.postType === 'GROUP_POST');
    } else if (tab === 'LOOKING') {
      filtered = filtered.filter(post => post.postType === 'USER_POST');
    }

    return filtered;
  }, [posts, tab]);

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

  // Update/Delete operation states
  const isUpdating = updateStatus === 'loading';
  const isDeleting = deleteStatus === 'loading';

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

    // CRUD operations
    fetchPostById,
    updatePost,
    deletePost,

    // Update/Delete states
    isUpdating,
    updateError,
    clearUpdateStatus,
    isDeleting,
    deleteError,
    clearDeleteStatus,
  };
};

/* ============================================================
 * FUTURE ENHANCEMENTS
 * ============================================================
 * Add requestCount to GroupPost interface when available:
 * export interface GroupPost {
 *   // ... existing fields
 *   requestCount?: number; // For hot posts ranking
 * }
 * ============================================================ */
