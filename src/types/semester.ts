export type semesterStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED';

export interface Semester {
  semesterId: number;
  semesterCode: string;
  semesterName?: string;
  startDate: string;
  endDate: string;
  semesterStatus: semesterStatus;
}
