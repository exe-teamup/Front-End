export type UserRole = 'STUDENT' | 'LECTURER' | 'ADMIN';

export interface Account {
  accountId: string;
  role: UserRole;
  // Extend with more fields from backend when available
}

export interface LoginGoogleRequest {
  idToken: string;
}

export type LoginGoogleResponse = Account;
