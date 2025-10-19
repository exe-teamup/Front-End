import { useStudentProfileStore } from '../store/studentProfile';
// TODO: Import other profile stores when implemented
// import { useLecturerProfileStore } from '../store/lecturerProfile';
// import { useAdminProfileStore } from '../store/adminProfile';

/**
 * Clears all auth-related stores on sign-out
 * This ensures no stale data remains after logout
 */
export const clearAuthStores = () => {
  // Clear student profile store
  const { clearProfile: clearStudentProfile } =
    useStudentProfileStore.getState();
  clearStudentProfile();

  // TODO: Add other profile store cleanups when implemented
  // const { clearProfile: clearLecturerProfile } = useLecturerProfileStore.getState();
  // clearLecturerProfile();

  // TODO: Clear any other auth-related stores (groups, notifications, etc.)
  // const { clearGroups } = useGroupStore.getState();
  // clearGroups();
};
