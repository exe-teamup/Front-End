import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  updateMutationHook,
  deleteMutationHook,
} from '../queryFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import { AxiosError } from 'axios';

const BASE_URL = '/groups';

/**
 * Get group by ID
 * GET /api/groups/{id}
 */
export const useGetGroupById = createQueryWithPathParamHook('group', BASE_URL);

/**
 * Get all groups
 * GET /api/groups
 */
export const useGetAllGroups = createQueryHook('groups', BASE_URL);

/**
 * Get groups by course ID
 * GET /api/groups/{id}/course
 */
export const useGetGroupsByCourse = (courseId?: string, options?: unknown) => {
  return createQueryHook(
    'groups-by-course',
    `${BASE_URL}/${courseId}/course`
  )(options);
};

/**
 * Get groups by lecturer ID
 * GET /api/groups/lecturer/{id}
 */
export const useGetGroupsByLecturer = createQueryWithPathParamHook(
  'groups-by-lecturer',
  `${BASE_URL}/lecturer`
);

/**
 * Filter groups
 * GET /api/groups/filter
 */
export const useFilterGroups = createQueryHook(
  'groups-filter',
  `${BASE_URL}/filter`
);

/**
 * Create new group
 * POST /api/groups
 */
export const useCreateGroup = createMutationHook('groups', BASE_URL);

/**
 * Update group by ID
 * PUT /api/groups/{id}
 */
export const useUpdateGroup = updateMutationHook('groups', BASE_URL);

/**
 * Delete group by ID
 * DELETE /api/groups/{id}
 */
export const useDeleteGroup = deleteMutationHook('groups', BASE_URL);

/**
 * Transfer group leadership
 * PUT /api/groups/{id}/transfer-leader
 */
export const useTransferLeader = (groupId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    { newLeaderId: string }
  >({
    mutationFn: (data: { newLeaderId: string }) =>
      ApiClient.put(`${BASE_URL}/${groupId}/transfer-leader`, data),
    onSuccess: () => {
      // TanStack Query will auto-refetch user-profile with refetchOnWindowFocus
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};

/**
 * Kick member from group
 * PUT /api/groups/{id}/kick/{memberId}
 */
export const useKickMember = (groupId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, string>({
    mutationFn: (memberId: string) =>
      ApiClient.put(`${BASE_URL}/${groupId}/kick/${memberId}`, {}),
    onSuccess: () => {
      // Invalidate user profile (kicked user's groupId changes)
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};

/**
 * Leave group
 * PUT /api/groups/leave
 */
export const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ApiClient.put(`${BASE_URL}/leave`, {}),
    onSuccess: () => {
      // TanStack Query will auto-refetch invalidated queries
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};

/**
 * Add member to group
 * POST /api/groups/{id}/add-member/{memberId}
 */
export const useAddMember = (groupId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, string>({
    mutationFn: (memberId: string) =>
      ApiClient.post(`${BASE_URL}/${groupId}/add-member/${memberId}`, {}),
    onSuccess: () => {
      // Invalidate user profile (new member's groupId changes)
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};
