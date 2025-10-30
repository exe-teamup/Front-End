import { serviceConfig } from '@/config/serviceConfig';
import { ApiClient } from '@/lib/axios/apiClient';
import type { Major } from '@/types/major';
import { create } from 'zustand';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

interface MajorState {
  majors: Major[];
  status: LoadingStatus;
  error?: string;

  // Actions
  fetchMajors: () => Promise<void>;
  clearError: () => void;
}

export const useMajorStore = create<MajorState>(set => ({
  majors: [],
  status: 'idle',
  error: undefined,

  fetchMajors: async () => {
    set({ status: 'loading', error: undefined });
    try {
      const response = await ApiClient.get<Major[]>(
        serviceConfig.ENDPOINTS.MAJORS
      );
      set({
        majors: response.data,
        status: 'success',
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch majors';
      set({
        status: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  clearError: () => set({ error: undefined, status: 'idle' }),
}));
