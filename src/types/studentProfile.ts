import type { StudentStatus } from './student';

export interface StudentProfile {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  createdAt?: string;
  studentStatus?: StudentStatus;
  groupId?: string;
  leader?: boolean;
}
