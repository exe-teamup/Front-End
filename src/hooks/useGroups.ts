import { useEffect, useMemo } from 'react';
import { useGroupStore } from '../store/group';
import { useStudentProfileStore } from '../store/studentProfile';

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
  const { profile } = useStudentProfileStore();
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

  // Fetch student's own group if they have a groupId
  useEffect(() => {
    if (profile?.groupId) {
      fetchGroupById(profile.groupId);
    }
  }, [profile?.groupId, fetchGroupById]);

  // Fetch all groups on mount
  useEffect(() => {
    fetchAllGroups();
  }, [fetchAllGroups]);

  // Determine if student is a leader
  const isLeader = useMemo(() => {
    return profile?.leader ?? false;
  }, [profile?.leader]);

  // Determine if student has a group
  const hasGroup = useMemo(() => {
    return !!profile?.groupId;
  }, [profile?.groupId]);

  // Calculate loading states
  const isLoadingOwnGroup = fetchStatus === 'loading';
  const isLoadingAllGroups = listStatus === 'loading';
  const isLoading = isLoadingOwnGroup || isLoadingAllGroups;

  // Calculate error states
  const ownGroupError = fetchError;
  const allGroupsError = listError;
  const hasError = !!ownGroupError || !!allGroupsError;

  /* ============================================================
   * GROUP JOIN REQUESTS - UNDER DEVELOPMENT
   * ============================================================
   * When server-side API is ready, uncomment the following code:
   *
   * const [joinRequests, setJoinRequests] = useState<GroupJoinRequest[]>([]);
   * const [requestsStatus, setRequestsStatus] = useState<LoadingStatus>('idle');
   * const [requestsError, setRequestsError] = useState<string>();
   *
   * useEffect(() => {
   *   const fetchJoinRequests = async () => {
   *     setRequestsStatus('loading');
   *     try {
   *       const response = await ApiClient.get<GroupJoinRequest[]>(
   *         serviceConfig.ENDPOINTS.GROUP_JOIN_REQUESTS
   *       );
   *       setJoinRequests(response.data);
   *       setRequestsStatus('success');
   *     } catch (e) {
   *       const message = e instanceof Error ? e.message : 'Failed to fetch join requests';
   *       setRequestsError(message);
   *       setRequestsStatus('error');
   *     }
   *   };
   *
   *   fetchJoinRequests();
   * }, []);
   *
   * const pendingRequestsCount = useMemo(() => {
   *   return joinRequests.filter(req => req.status === 'PENDING').length;
   * }, [joinRequests]);
   * ============================================================ */

  // Placeholder for pending requests count until API is ready
  const pendingRequestsCount = 0;

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
