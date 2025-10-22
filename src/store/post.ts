import { create } from 'zustand';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type { GroupPost } from '../types/post';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type PostState = {
  // Posts list state
  posts: GroupPost[];
  listStatus: LoadingStatus;
  listError?: string;

  // Actions
  fetchAllPosts: () => Promise<void>;
  clearPosts: () => void;

  // Future: Add more post-related actions here
  // fetchPostById: (id: string) => Promise<void>;
  // createPost: (data: CreatePostRequest) => Promise<void>;
  // updatePost: (id: string, data: Partial<GroupPost>) => Promise<void>;
  // deletePost: (id: string) => Promise<void>;
  // etc.
};

export const usePostStore = create<PostState>(set => ({
  // Posts list state
  posts: [],
  listStatus: 'idle',
  listError: undefined,

  // Fetch all posts action
  fetchAllPosts: async () => {
    set({ listStatus: 'loading', listError: undefined });

    try {
      const response = await ApiClient.get<GroupPost[]>(
        serviceConfig.ENDPOINTS.GROUP_POSTS
      );

      const postsData: GroupPost[] = response.data;

      set({
        listStatus: 'success',
        posts: postsData,
        listError: undefined,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to fetch posts';
      set({
        listStatus: 'error',
        posts: [],
        listError: message,
      });
    }
  },

  // Clear posts action
  clearPosts: () => {
    set({
      posts: [],
      listStatus: 'idle',
      listError: undefined,
    });
  },
}));
