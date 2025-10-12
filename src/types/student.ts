export type StudentStatus = 'ELIGIBLE' | 'NOT_ELIGIBLE';

export interface Student {
  studentId: string;
  fullName: string;
  email: string;
  studentCode: string;
  phoneNumber?: string;
  bio?: string;
  createdAt: string;
  groupId?: string;
  groupName?: string;
  majorId?: string;
  majorName?: string;
  isLeader?: boolean;
  studentStatus?: StudentStatus;
}
