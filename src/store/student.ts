import { create } from 'zustand';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type { Student } from '../types/student';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type StudentSearchState = {
  // Search-related state
  searchResults: Student[];
  searchStatus: LoadingStatus;
  searchError?: string;

  // Search actions
  searchStudents: (keyword: string) => Promise<void>;
  clearSearchResults: () => void;

  // Future: Add more student-related actions here
  // fetchStudentById: (id: string) => Promise<void>;
  // updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  // etc.
};

export const useStudentStore = create<StudentSearchState>(set => ({
  // Search state
  searchResults: [],
  searchStatus: 'idle',
  searchError: undefined,

  // Search actions
  searchStudents: async (keyword: string) => {
    // Don't search if keyword is empty or too short
    if (!keyword || keyword.trim().length < 2) {
      set({ searchResults: [], searchStatus: 'idle', searchError: undefined });
      return;
    }

    set({ searchStatus: 'loading', searchError: undefined });

    try {
      const response = await ApiClient.get<Student[]>(
        serviceConfig.ENDPOINTS.SEARCH_STUDENTS,
        { keyword: keyword.trim() }
      );

      const students: Student[] = response.data;

      set({
        searchStatus: 'success',
        searchResults: students,
        searchError: undefined,
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'Failed to search students';
      set({
        searchStatus: 'error',
        searchResults: [],
        searchError: message,
      });
    }
  },

  clearSearchResults: () => {
    set({
      searchResults: [],
      searchStatus: 'idle',
      searchError: undefined,
    });
  },
}));
