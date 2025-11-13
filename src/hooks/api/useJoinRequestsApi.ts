import { createQueryHook, createQueryWithPathParamHook } from '../queryFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import { AxiosError } from 'axios';

const BASE_URL = '/join-requests';

/**
 * Get all join requests
 * GET /api/join-requests
 */
export const useGetAllJoinRequests = createQueryHook('join-requests', BASE_URL);

/**
 * Get join request by ID
 * GET /api/join-requests/{id}
 */
export const useGetJoinRequestById = createQueryWithPathParamHook(
  'join-request',
  BASE_URL
);

/**
 * Get join requests by student ID
 * GET /api/join-requests/find-by-student/{id}
 */
export const useGetJoinRequestsByStudent = createQueryWithPathParamHook(
  'join-requests-by-student',
  `${BASE_URL}/find-by-student`
);

/**
 * Create join request
 * POST /api/join-requests
 */
export const useCreateJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    {
      studentId: number;
      groupId: number;
      requestType: 'GROUP_INVITATION' | 'STUDENT_REQUEST';
    }
  >({
    mutationFn: data => ApiClient.post(BASE_URL, data),
    onSuccess: () => {
      // TanStack Query auto-refetches invalidated queries
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({
        queryKey: ['join-requests-by-student'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

/**
 * Handle join request (approve/reject)
 * PATCH /api/join-requests/handle-request/{id}
 */
export const useHandleJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    {
      id: string;
      requestStatus: 'PENDING' | 'APPROVED' | 'DENIED' | 'WITHDRAWN';
      denyReason?: string;
    }
  >({
    mutationFn: async ({ id, requestStatus, denyReason }) => {
      const requestBody: { requestStatus: string; denyReason: string | null } =
        {
          requestStatus,
          denyReason:
            requestStatus === 'DENIED' && denyReason ? denyReason : null,
        };

      return ApiClient.patch(`${BASE_URL}/handle-request/${id}`, requestBody, {
        timeout: 15000,
      });
    },
    onSuccess: () => {
      // TanStack Query auto-refetches invalidated queries
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({
        queryKey: ['join-requests-by-student'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

/**
 * Delete join request by ID
 * DELETE /api/join-requests/{id}
 */
export const useDeleteJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, string>({
    mutationFn: (id: string) => ApiClient.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      // TanStack Query auto-refetches invalidated queries
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({
        queryKey: ['join-requests-by-student'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};
