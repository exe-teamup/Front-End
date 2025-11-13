import { useGetUserProfile } from './api/useUsersApi';
import type { StudentProfile } from '@/types/studentProfile';

export function useStudentProfile() {
  const { data, isLoading, error, refetch } = useGetUserProfile({
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 20 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });

  const profile = data as StudentProfile | undefined;

  // Derived values
  const isLeader = profile?.leader ?? false;
  const hasGroup = !!profile?.groupId;

  return {
    profile,
    isLoading,
    error,
    refetch,
    isLeader,
    hasGroup,
  };
}
