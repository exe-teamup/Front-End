import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import { serviceConfig } from '@/config/serviceConfig';
import type {
  GroupPost,
  PostType,
  CreateGroupPostRequest,
  CreateUserPostRequest,
} from '@/types/post';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters?: { postType?: PostType }) =>
    [...postKeys.lists(), filters] as const,
  detail: (id: string) => [...postKeys.all, 'detail', id] as const,
};

/**
 * Fetch posts with optional postType filter
 * API endpoints:
 * - GROUP_POST: /api/posts/group-post
 * - USER_POST: /api/posts
 * - ALL: /api/posts
 *
 * @param postType - Optional filter: 'GROUP_POST' | 'USER_POST'
 * @returns Array of posts
 */
async function fetchPosts(postType?: PostType): Promise<GroupPost[]> {
  let endpoint = serviceConfig.ENDPOINTS.POSTS;

  if (postType === 'GROUP_POST') {
    endpoint = serviceConfig.ENDPOINTS.GROUP_POSTS;
    const response = await ApiClient.get<GroupPost[]>(endpoint);
    return response.data;
  }

  const response = await ApiClient.get<GroupPost[]>(endpoint);
  const allPosts = response.data;

  if (postType === 'USER_POST') {
    return allPosts.filter(post => post.postType === 'USER_POST');
  }

  return allPosts;
}

/**
 * Hook to fetch posts with optional postType filter
 * Auto-syncs when mutations occur via invalidateQueries
 */
export function usePostsQuery(postType?: PostType) {
  return useQuery({
    queryKey: postKeys.list({ postType }),
    queryFn: () => fetchPosts(postType),
  });
}

/**
 * Hook to create a group post
 * Automatically invalidates and refetches posts after creation
 */
export function useCreateGroupPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGroupPostRequest) => {
      const response = await ApiClient.post<GroupPost>(
        serviceConfig.ENDPOINTS.GROUP_POSTS,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function useCreateUserPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserPostRequest) => {
      const response = await ApiClient.post<GroupPost>(
        serviceConfig.ENDPOINTS.USER_POSTS,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function useRefreshPosts(postType?: PostType) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: postKeys.list({ postType }),
    });
  };
}

export function useJoinRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      studentId: number;
      groupId: number;
      requestType: 'GROUP_INVITATION' | 'STUDENT_REQUEST';
    }) => {
      const response = await ApiClient.post(
        serviceConfig.ENDPOINTS.JOIN_REQUESTS,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all join-requests queries
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      // Invalidate all join-requests-by-student queries (for all students)
      queryClient.invalidateQueries({
        queryKey: ['join-requests-by-student'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
}
