export type UserRole = 'STUDENT' | 'LECTURER' | 'ADMIN' | 'MODERATOR';
export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';

export interface Account {
  accountId: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  accountStatus: AccountStatus;
}
