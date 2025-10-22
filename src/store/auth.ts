import {
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { serviceConfig } from '../config/serviceConfig';
import { ApiClient } from '../lib/axios';
import { AuthTokenManager } from '../lib/axios/authToken';
import { auth, googleProvider } from '../services/firebase/config';
import type { AuthStatus, AuthUser } from '../services/firebase/types';
import type { AuthResponse } from '../types/auth';
import { clearAuthStores } from '../utils/clearAuthStores';
import { useStudentProfileStore } from './studentProfile';

type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  account: AuthResponse | null;
  error?: string;

  initAuthListener: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      status: 'idle',
      user: null,
      account: null,
      error: undefined,

      initAuthListener: () => {
        let initialized = false;

        onAuthStateChanged(auth, async firebaseUser => {
          if (!initialized) {
            initialized = true;
          }

          if (firebaseUser) {
            try {
              const idToken = await firebaseUser.getIdToken(true);
              if (!idToken) {
                throw new Error('Failed to retrieve ID token');
              }
              const user: AuthUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              };
              set({ status: 'authenticated', user, error: undefined });
            } catch (error) {
              console.error('Error fetching ID token:', error);
              AuthTokenManager.clearTokens();
              set({
                status: 'unauthenticated',
                user: null,
                account: null,
                error: undefined,
              });
            }
          } else {
            set({
              status: 'unauthenticated',
              user: null,
              account: null,
              error: undefined,
            });
          }
        });
      },

      signInWithGoogle: async () => {
        set({ status: 'loading', error: undefined });
        try {
          const result = await signInWithPopup(auth, googleProvider);

          // Retrieve Firebase ID token
          const idToken = await result.user.getIdToken(true);

          // Store token into cookies for axios to attach automatically
          if (!idToken) {
            throw new Error('Failed to retrieve ID token');
          }

          const response = await ApiClient.post<AuthResponse>(
            serviceConfig.ENDPOINTS.LOGIN_GOOGLE,
            { idToken }
          );

          const account: AuthResponse = response.data;

          AuthTokenManager.setToken(account.accessToken);

          // onAuthStateChanged will update to authenticated; we set early for better UX
          set({
            status: 'authenticated',
            user: result.user,
            account,
            error: undefined,
          });

          // Fetch profile based on user role
          if (account.role === 'STUDENT') {
            const { fetchProfile } = useStudentProfileStore.getState();
            await fetchProfile();
          }
          // TODO: Add profile fetch for other roles (LECTURER, ADMIN, MODERATOR)
          // else if (account.role === 'LECTURER') {
          //   const { fetchProfile } = useLecturerProfileStore.getState();
          //   await fetchProfile();
          // }
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'Sign-in failed';
          set({ status: 'unauthenticated', error: message });
        }
      },

      signOut: async () => {
        set({ status: 'loading', error: undefined });
        try {
          await fbSignOut(auth).then(() => {
            set({
              status: 'unauthenticated',
              user: null,
              account: null,
              error: undefined,
            });
          });

          // Clear auth cookies/tokens and related stores
          AuthTokenManager.clearTokens();
          clearAuthStores();

          // onAuthStateChanged will update to unauthenticated
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'Sign-out failed';
          set({ status: 'authenticated', error: message });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: state => ({
        status: state.status,
        user: state.user,
        account: state.account,
        // Exclude error from persistence as it's transient
      }),
    }
  )
);
