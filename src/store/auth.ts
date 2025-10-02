import {
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { create } from 'zustand';
import { AuthTokenManager } from '../lib/axios/authToken';
import { auth, googleProvider } from '../services/firebase/config';
import type { AuthStatus, AuthUser } from '../services/firebase/types';
import type { Account } from '../types/account';

type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  account: Account | null;
  error?: string;

  initAuthListener: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(set => ({
  status: 'idle',
  user: null,
  account: null,
  error: undefined,

  initAuthListener: () => {
    let initialized = false;

    onAuthStateChanged(auth, firebaseUser => {
      if (!initialized) {
        initialized = true;
      }

      if (firebaseUser) {
        const user: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        set({ status: 'authenticated', user, error: undefined });
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
      if (idToken) {
        AuthTokenManager.setToken(idToken);
      }

      // TODO: Verify the backend result once the endpoint is ready
      /* const response = await ApiClient.post<Account>(
        serviceConfig.ENDPOINTS.LOGIN_GOOGLE,
        { idToken }
      );
      */

      const account: Account = { userId: 'FARMER 1', role: 'student' };

      // onAuthStateChanged will update to authenticated; we set early for better UX
      set({
        status: 'authenticated',
        user: result.user,
        account,
        error: undefined,
      });
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
      // Clear auth cookies/tokens
      AuthTokenManager.clearTokens();
      // onAuthStateChanged will update to unauthenticated
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Sign-out failed';
      set({ status: 'authenticated', error: message });
    }
  },
}));
