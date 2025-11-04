export type StudentStatus = 'ELIGIBLE' | 'NOT_ELIGIBLE';

export interface Student {
  courseId: string;
  userId: string;
  accountId: string;
  fullName: string;
  email: string;
  userCode: string;
  phoneNumber?: string;
  bio?: string;
  createdAt?: string;
  isLeader?: boolean;
  userStatus: StudentStatus;
  groupId?: string;
  groupName?: string;
  majorId?: string;
  majorName?: string;
}
