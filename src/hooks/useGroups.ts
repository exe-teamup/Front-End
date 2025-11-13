import { useEffect, useMemo } from 'react';
import { useGroupStore } from '../store/group';
import { useStudentProfile } from './useStudentProfile';
import {
  useGetJoinRequestsByStudent,
  useGetAllJoinRequests,
} from './api/useJoinRequestsApi';
import type { JoinRequestResponse } from '../types/joinRequest';

/**
 * Custom hook to retrieve all group-related information
 *
 * This hook provides:
 * - Student's own group (if they have one)
 * - List of all available groups
 * - Group join requests (when API becomes available)
 *
 * @returns Object containing group data and loading states
 */
export const useGroups = () => {
  // Use TanStack Query for profile (auto-refetch on window focus)
  const { profile, isLeader, hasGroup } = useStudentProfile();
  const {
    currentGroup,
    fetchStatus,
    fetchError,
    groups,
    listStatus,
    listError,
    fetchGroupById,
    fetchAllGroups,
  } = useGroupStore();

  // Fetch student's own group if they have a groupId and it's not already loading/loaded
  useEffect(() => {
    if (profile?.groupId && fetchStatus === 'idle') {
      fetchGroupById(profile.groupId);
    }
  }, [profile?.groupId, fetchGroupById, fetchStatus]);

  // Fetch all groups on mount only if not already loading/loaded
  useEffect(() => {
    if (listStatus === 'idle') {
      fetchAllGroups();
    }
  }, [fetchAllGroups, listStatus]);

  // isLeader and hasGroup are now computed in useStudentProfile hook

  // Calculate loading states
  const isLoadingOwnGroup = fetchStatus === 'loading';
  const isLoadingAllGroups = listStatus === 'loading';
  const isLoading = isLoadingOwnGroup || isLoadingAllGroups;

  // Calculate error states
  const ownGroupError = fetchError;
  const allGroupsError = listError;
  const hasError = !!ownGroupError || !!allGroupsError;

  const { data: studentRequests } = useGetJoinRequestsByStudent(
    profile?.userId ? String(profile.userId) : ''
  );

  const { data: allRequests } = useGetAllJoinRequests();

  const studentRequestsArray = useMemo(() => {
    if (!studentRequests) return [];
    if (Array.isArray(studentRequests)) {
      return studentRequests as JoinRequestResponse[];
    }
    if (
      studentRequests &&
      typeof studentRequests === 'object' &&
      'data' in studentRequests
    ) {
      return Array.isArray((studentRequests as { data: unknown }).data)
        ? ((studentRequests as { data: unknown[] })
            .data as JoinRequestResponse[])
        : [];
    }
    return [];
  }, [studentRequests]);

  const pendingRequestsCount = useMemo(() => {
    if (
      !Array.isArray(studentRequestsArray) ||
      studentRequestsArray.length === 0
    ) {
      return 0;
    }
    return studentRequestsArray.filter(
      (req: JoinRequestResponse) =>
        req.requestStatus === 'PENDING' && req.requestType === 'STUDENT_REQUEST'
    ).length;
  }, [studentRequestsArray]);

  const allRequestsArray = useMemo(() => {
    if (!allRequests) return [];
    if (Array.isArray(allRequests)) {
      return allRequests as JoinRequestResponse[];
    }
    return [];
  }, [allRequests]);

  const incomingRequestsCount = useMemo(() => {
    if (!hasGroup || !profile?.groupId) return 0;
    if (!Array.isArray(allRequestsArray) || allRequestsArray.length === 0) {
      return 0;
    }
    return allRequestsArray.filter(
      (req: JoinRequestResponse) =>
        req.groupId === Number(profile.groupId) &&
        req.requestStatus === 'PENDING' &&
        req.requestType === 'STUDENT_REQUEST'
    ).length;
  }, [allRequestsArray, hasGroup, profile?.groupId]);

  return {
    // Student's own group data
    myGroup: currentGroup,
    isLoadingOwnGroup,
    ownGroupError,

    // All groups data
    allGroups: groups,
    isLoadingAllGroups,
    allGroupsError,

    // Join requests data (placeholder until API is available)
    pendingRequestsCount,
    incomingRequestsCount,

    // Student status
    isLeader,
    hasGroup,

    // Combined states
    isLoading,
    hasError,

    // Utility methods for refetching data
    refetchOwnGroup: () => profile?.groupId && fetchGroupById(profile.groupId),
    refetchAllGroups: fetchAllGroups,
  };
};

/* ============================================================
 * TYPE DEFINITIONS FOR FUTURE USE
 * ============================================================
 * Add this interface when join requests API is ready:
 *
 * export interface GroupJoinRequest {
 *   requestId: string;
 *   groupId: string;
 *   groupName: string;
 *   studentId: string;
 *   studentName: string;
 *   status: 'PENDING' | 'APPROVED' | 'REJECTED';
 *   requestedAt: string;
 *   respondedAt?: string;
 * }
 *
 * Then add these to the return object:
 * - joinRequests: GroupJoinRequest[]
 * - isLoadingRequests: boolean
 * - requestsError?: string
 * - refetchJoinRequests: () => void
 * ============================================================ */
