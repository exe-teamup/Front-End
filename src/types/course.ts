export interface Course {
  courseId: number;
  semesterId: number;
  lecturerId: number;
  lecturerName: string;
  courseCode: string;
  courseName: string;
  semesterCode: string;
  maxGroup: number;
  maxStudents: number;
  groupCount: number;
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
}
