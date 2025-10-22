import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type { StudentProfile } from '../types/studentProfile';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type StudentProfileState = {
  status: LoadingStatus;
  profile: StudentProfile | null;
  error?: string;

  fetchProfile: () => Promise<void>;
  updateProfile: (updatedFields: Partial<StudentProfile>) => Promise<void>;
  clearProfile: () => void;
};

export const useStudentProfileStore = create<StudentProfileState>()(
  persist(
    set => ({
      status: 'idle',
      profile: null,
      error: undefined,

      fetchProfile: async () => {
        set({ status: 'loading', error: undefined });
        try {
          const response = await ApiClient.get<StudentProfile>(
            serviceConfig.ENDPOINTS.STUDENT_PROFILE
          );

          const profile: StudentProfile = response.data;

          set({
            status: 'success',
            profile,
            error: undefined,
          });
        } catch (e: unknown) {
          const message =
            e instanceof Error ? e.message : 'Failed to fetch profile';
          set({ status: 'error', profile: null, error: message });
        }
      },

      updateProfile: async (updatedFields: Partial<StudentProfile>) => {
        const currentProfile = useStudentProfileStore.getState().profile;

        if (!currentProfile) {
          set({ error: 'No profile loaded to update' });
          return;
        }

        // Optimistic update
        set(state => ({
          status: 'loading',
          profile: state.profile
            ? { ...state.profile, ...updatedFields }
            : null,
          error: undefined,
        }));

        try {
          const response = await ApiClient.put<StudentProfile>(
            serviceConfig.ENDPOINTS.UPDATE_STUDENT(currentProfile.userId),
            updatedFields
          );

          const updatedProfile: StudentProfile = response.data;

          set({
            status: 'success',
            profile: updatedProfile,
            error: undefined,
          });
        } catch (e: unknown) {
          const message =
            e instanceof Error ? e.message : 'Failed to update profile';
          // Revert to original profile on error
          set({
            status: 'error',
            profile: currentProfile,
            error: message,
          });
        }
      },

      clearProfile: () => {
        set({
          status: 'idle',
          profile: null,
          error: undefined,
        });
      },
    }),
    {
      name: 'student-profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        profile: state.profile,
        status: state.status,
        // Exclude status and error from persistence as they're transient
      }),
    }
  )
);
