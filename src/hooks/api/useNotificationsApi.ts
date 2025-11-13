import { createQueryHook } from '../queryFactory';
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
 * PUT /api/account-notifications/check/{id}
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, number>({
    mutationFn: (accountNotificationId: number) =>
      ApiClient.put(`${BASE_URL}/check/${accountNotificationId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};

/**
 * Mark multiple notifications as read
 * PUT /api/account-notifications/check
 * Body: [accountNotificationId1, accountNotificationId2, ...]
 */
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<{ message: string }>, number[]>({
    mutationFn: (accountNotificationIds: number[]) =>
      ApiClient.put(`${BASE_URL}/check`, accountNotificationIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });
};
