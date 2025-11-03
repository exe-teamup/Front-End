import { create } from 'zustand';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import type {
  CreateGroupPostRequest,
  CreateUserPostRequest,
  GroupPost,
  UpdatePostRequest,
} from '../types/post';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type PostState = {
  // Posts list state
  posts: GroupPost[];
  listStatus: LoadingStatus;
  listError?: string;

  // Single post state
  currentPost: GroupPost | null;
  currentPostStatus: LoadingStatus;
  currentPostError?: string;

  // Create group post state
  createStatus: LoadingStatus;
  createError?: string;

  // Create user post state
  createUserPostStatus: LoadingStatus;
  createUserPostError?: string;

  // Update post state
  updateStatus: LoadingStatus;
  updateError?: string;

  // Delete post state
  deleteStatus: LoadingStatus;
  deleteError?: string;

  // Actions
  fetchAllPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<GroupPost>;
  createGroupPost: (data: CreateGroupPostRequest) => Promise<GroupPost>;
  createUserPost: (data: CreateUserPostRequest) => Promise<GroupPost>;
  updatePost: (id: string, data: UpdatePostRequest) => Promise<GroupPost>;
  deletePost: (id: string) => Promise<void>;
  clearPosts: () => void;
  clearCurrentPost: () => void;
  clearCreateStatus: () => void;
  clearCreateUserPostStatus: () => void;
  clearUpdateStatus: () => void;
  clearDeleteStatus: () => void;
};

export const usePostStore = create<PostState>(set => ({
  // Posts list state
  posts: [],
  listStatus: 'idle',
  listError: undefined,

  // Single post state
  currentPost: null,
  currentPostStatus: 'idle',
  currentPostError: undefined,

  // Create group post state
  createStatus: 'idle',
  createError: undefined,

  // Create user post state
  createUserPostStatus: 'idle',
  createUserPostError: undefined,

  // Update post state
  updateStatus: 'idle',
  updateError: undefined,

  // Delete post state
  deleteStatus: 'idle',
  deleteError: undefined,

  // Fetch all posts action
  fetchAllPosts: async () => {
    set({ listStatus: 'loading', listError: undefined });

    try {
      const response = await ApiClient.get<GroupPost[]>(
        serviceConfig.ENDPOINTS.POSTS
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

  // Fetch post by ID action
  fetchPostById: async (id: string) => {
    set({ currentPostStatus: 'loading', currentPostError: undefined });

    try {
      const response = await ApiClient.get<GroupPost>(
        serviceConfig.ENDPOINTS.POST_BY_ID(id)
      );

      const postData = response.data;

      set({
        currentPostStatus: 'success',
        currentPost: postData,
        currentPostError: undefined,
      });

      return postData;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to fetch post';
      set({
        currentPostStatus: 'error',
        currentPost: null,
        currentPostError: message,
      });
      throw e;
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

  // Update post action
  updatePost: async (id: string, data: UpdatePostRequest) => {
    set({ updateStatus: 'loading', updateError: undefined });

    try {
      const response = await ApiClient.put<GroupPost>(
        serviceConfig.ENDPOINTS.POST_BY_ID(id),
        data
      );

      const updatedPost = response.data;

      // Update the post in the list and current post if it matches
      set(state => ({
        updateStatus: 'success',
        posts: state.posts.map(post =>
          post.postId === id ? updatedPost : post
        ),
        currentPost:
          state.currentPost?.postId === id ? updatedPost : state.currentPost,
        updateError: undefined,
      }));

      return updatedPost;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to update post';
      set({
        updateStatus: 'error',
        updateError: message,
      });
      throw e;
    }
  },

  // Delete post action
  deletePost: async (id: string) => {
    set({ deleteStatus: 'loading', deleteError: undefined });

    try {
      await ApiClient.delete(serviceConfig.ENDPOINTS.POST_BY_ID(id));

      // Remove the post from the list and clear current post if it matches
      set(state => ({
        deleteStatus: 'success',
        posts: state.posts.filter(post => post.postId !== id),
        currentPost:
          state.currentPost?.postId === id ? null : state.currentPost,
        deleteError: undefined,
      }));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to delete post';
      set({
        deleteStatus: 'error',
        deleteError: message,
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

  // Clear current post
  clearCurrentPost: () => {
    set({
      currentPost: null,
      currentPostStatus: 'idle',
      currentPostError: undefined,
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

  // Clear update status
  clearUpdateStatus: () => {
    set({
      updateStatus: 'idle',
      updateError: undefined,
    });
  },

  // Clear delete status
  clearDeleteStatus: () => {
    set({
      deleteStatus: 'idle',
      deleteError: undefined,
    });
  },
}));
