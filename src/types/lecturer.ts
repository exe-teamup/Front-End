import type { AccountStatus } from './account';

export type LecturerStatus = 'ACTIVE' | 'INACTIVE' | 'RETIRED';

export interface Lecturer {
  lecturerId: string;
  lecturerName: string;
  lecturerStatus: LecturerStatus;
  accountId: string;
  accountStatus: AccountStatus;
}
