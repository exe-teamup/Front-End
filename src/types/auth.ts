import type { UserRole } from './account';

export interface AuthResponse {
  accountId: string;
  role: UserRole;
  // Extend with more fields from backend when available
}
