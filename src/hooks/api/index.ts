/**
 * Central export file for all API hooks
 * Import and use these hooks throughout the application for consistent API calls
 *
 * Example usage:
 * ```typescript
 * import { useGetAllUsers, useCreateGroup } from '@/hooks/api';
 *
 * function MyComponent() {
 *   const { data: users, isLoading } = useGetAllUsers();
 *   const { mutate: createGroup } = useCreateGroup();
 *
 *   return <div>...</div>
 * }
 * ```
 */

// User API hooks
export * from './useUsersApi';

// Group API hooks
export * from './useGroupsApi';

// Post API hooks
export * from './usePostsApi';

// Join Request API hooks
export * from './useJoinRequestsApi';

// Course API hooks
export * from './useCoursesApi';

// Major API hooks
export * from './useMajorsApi';
