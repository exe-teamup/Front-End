import type { UserRole } from './account';

export interface AuthResponse {
  accountId: string;
  role: UserRole;
  accessToken: string;
  // Extend with more fields from backend when available
}
