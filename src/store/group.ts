import { create } from 'zustand';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type { CreateGroupRequest, Group } from '../types/group';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type GroupState = {
  // Create group state
  createStatus: LoadingStatus;
  createError?: string;
  createdGroup?: Group;

  // Current group state (fetched by ID)
  currentGroup?: Group;
  fetchStatus: LoadingStatus;
  fetchError?: string;

  // Group list state
  groups: Group[];
  listStatus: LoadingStatus;
  listError?: string;

  // Actions
  createGroup: (data: CreateGroupRequest) => Promise<void>;
  clearCreateStatus: () => void;
  fetchGroupById: (id: string) => Promise<void>;
  clearCurrentGroup: () => void;
  fetchAllGroups: () => Promise<void>;

  // Future: Add more group-related actions here
  // updateGroup: (id: string, data: Partial<Group>) => Promise<void>;
  // etc.
};

export const useGroupStore = create<GroupState>(set => ({
  // Create group state
  createStatus: 'idle',
  createError: undefined,
  createdGroup: undefined,

  // Current group state
  currentGroup: undefined,
  fetchStatus: 'idle',
  fetchError: undefined,

  // Group list state
  groups: [],
  listStatus: 'idle',
  listError: undefined,

  // Create group action
  createGroup: async (data: CreateGroupRequest) => {
    set({ createStatus: 'loading', createError: undefined });

    try {
      const response = await ApiClient.post<Group>(
        serviceConfig.ENDPOINTS.GROUPS,
        data
      );

      const groupResponse: Group = response.data;

      set({
        createStatus: 'success',
        createdGroup: groupResponse,
        createError: undefined,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to create group';
      set({
        createStatus: 'error',
        createdGroup: undefined,
        createError: message,
      });
      throw e; // Re-throw to let component handle it
    }
  },

  clearCreateStatus: () => {
    set({
      createStatus: 'idle',
      createError: undefined,
      createdGroup: undefined,
    });
  },

  // Fetch group by ID action
  fetchGroupById: async (id: string) => {
    set({ fetchStatus: 'loading', fetchError: undefined });

    try {
      const response = await ApiClient.get<Group>(
        serviceConfig.ENDPOINTS.GROUP_BY_ID(id)
      );

      const groupData: Group = response.data;

      set({
        fetchStatus: 'success',
        currentGroup: groupData,
        fetchError: undefined,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to fetch group';
      set({
        fetchStatus: 'error',
        currentGroup: undefined,
        fetchError: message,
      });
    }
  },

  clearCurrentGroup: () => {
    set({
      currentGroup: undefined,
      fetchStatus: 'idle',
      fetchError: undefined,
    });
  },

  fetchAllGroups: async () => {
    set({ listStatus: 'loading', listError: undefined });

    try {
      const response = await ApiClient.get<Group[]>(
        serviceConfig.ENDPOINTS.GROUPS
      );

      const groupsData: Group[] = response.data;

      set({
        listStatus: 'success',
        groups: groupsData,
        listError: undefined,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to fetch groups';
      set({
        listStatus: 'error',
        groups: [],
        listError: message,
      });
    }
  },
}));
