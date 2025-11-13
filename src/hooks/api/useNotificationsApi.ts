import { createQueryHook, createMutationHook } from '../queryFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import { AxiosError } from 'axios';

const BASE_URL = '/account-notifications';

/**
 * Get my notifications
 * GET /api/account-notifications/my-notifications
 */
export const useGetMyNotifications = createQueryHook(
  'my-notifications',
  `${BASE_URL}/my-notifications`
);

/**
 * Mark notification as read
 * PUT /api/account-notifications/{id}/mark-as-read
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, number>({
    mutationFn: (accountNotificationId: number) =>
      ApiClient.put(`${BASE_URL}/${accountNotificationId}/mark-as-read`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};

/**
 * Mark all notifications as read
 * PUT /api/account-notifications/mark-all-as-read
 */
export const useMarkAllNotificationsAsRead = createMutationHook(
  'my-notifications',
  `${BASE_URL}/mark-all-as-read`
);
