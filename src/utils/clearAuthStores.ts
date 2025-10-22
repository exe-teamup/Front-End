import { useGroupStore } from '../store/group';
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

  // Clear group store
  const { clearCurrentGroup, clearCreateStatus } = useGroupStore.getState();
  clearCurrentGroup();
  clearCreateStatus();

  // TODO: Add other profile store cleanups when implemented
  // const { clearProfile: clearLecturerProfile } = useLecturerProfileStore.getState();
  // clearLecturerProfile();

  // TODO: Clear any other auth-related stores (notifications, etc.)
};
