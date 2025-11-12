import {
  createQueryHook,
  createQueryWithPathParamHook,
  createMutationHook,
  deleteMutationHook,
} from '../queryFactory';
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
export const useCreateJoinRequest = createMutationHook(
  'join-requests',
  BASE_URL
);

/**
 * Handle join request (approve/reject)
 * PATCH /api/join-requests/handle-request/{id}
 */
export const useHandleJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    { id: string; action: 'APPROVED' | 'REJECTED' }
  >({
    mutationFn: ({ id, action }) =>
      ApiClient.patch(`${BASE_URL}/handle-request/${id}`, { action }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['join-requests'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

/**
 * Delete join request by ID
 * DELETE /api/join-requests/{id}
 */
export const useDeleteJoinRequest = deleteMutationHook(
  'join-requests',
  BASE_URL
);
