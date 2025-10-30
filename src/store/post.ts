import { create } from 'zustand';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type {
  CreateGroupPostRequest,
  CreateUserPostRequest,
  GroupPost,
} from '../types/post';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type PostState = {
  // Posts list state
  posts: GroupPost[];
  listStatus: LoadingStatus;
  listError?: string;

  // Create group post state
  createStatus: LoadingStatus;
  createError?: string;

  // Create user post state
  createUserPostStatus: LoadingStatus;
  createUserPostError?: string;

  // Actions
  fetchAllPosts: () => Promise<void>;
  createGroupPost: (data: CreateGroupPostRequest) => Promise<GroupPost>;
  createUserPost: (data: CreateUserPostRequest) => Promise<GroupPost>;
  clearPosts: () => void;
  clearCreateStatus: () => void;
  clearCreateUserPostStatus: () => void;

  // Future: Add more post-related actions here
  // fetchPostById: (id: string) => Promise<void>;
  // updatePost: (id: string, data: Partial<GroupPost>) => Promise<void>;
  // deletePost: (id: string) => Promise<void>;
  // etc.
};

export const usePostStore = create<PostState>(set => ({
  // Posts list state
  posts: [],
  listStatus: 'idle',
  listError: undefined,

  // Create group post state
  createStatus: 'idle',
  createError: undefined,

  // Create user post state
  createUserPostStatus: 'idle',
  createUserPostError: undefined,

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

  // Create group post action
  createGroupPost: async (data: CreateGroupPostRequest) => {
    set({ createStatus: 'loading', createError: undefined });

    try {
      const response = await ApiClient.post<GroupPost>(
        serviceConfig.ENDPOINTS.GROUP_POSTS,
        data
      );

      const newPost = response.data;

      // Add the new post to the list
      set(state => ({
        createStatus: 'success',
        posts: [newPost, ...state.posts],
        createError: undefined,
      }));

      return newPost;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to create post';
      set({
        createStatus: 'error',
        createError: message,
      });
      throw e;
    }
  },

  // Create user post action
  createUserPost: async (data: CreateUserPostRequest) => {
    set({ createUserPostStatus: 'loading', createUserPostError: undefined });

    try {
      const response = await ApiClient.post<GroupPost>(
        serviceConfig.ENDPOINTS.USER_POSTS,
        data
      );

      const newPost = response.data;

      // Add the new post to the list
      set(state => ({
        createUserPostStatus: 'success',
        posts: [newPost, ...state.posts],
        createUserPostError: undefined,
      }));

      return newPost;
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'Failed to create user post';
      set({
        createUserPostStatus: 'error',
        createUserPostError: message,
      });
      throw e;
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

  // Clear create status
  clearCreateStatus: () => {
    set({
      createStatus: 'idle',
      createError: undefined,
    });
  },

  // Clear create user post status
  clearCreateUserPostStatus: () => {
    set({
      createUserPostStatus: 'idle',
      createUserPostError: undefined,
    });
  },
}));
