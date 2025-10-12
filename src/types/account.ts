export type UserRole = 'student' | 'lecturer' | 'admin';

export interface Account {
  userId: string;
  role: UserRole;
  // Extend with more fields from backend when available
}

export interface LoginGoogleRequest {
  idToken: string;
}

export type LoginGoogleResponse = Account;
