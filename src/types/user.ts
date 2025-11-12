export type UserStatus = 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'PENDING';

export interface UserPublicProfile {
  courseId: number;
  userId: number;
  accountId: number;
  fullName: string;
  email: string;
  userCode: string;
  phoneNumber: string;
  bio: string;
  createdAt: string;
  isLeader: boolean;
  userStatus: UserStatus;
  groupId: number;
  groupName: string;
  majorId: number;
  majorName: string;
}
