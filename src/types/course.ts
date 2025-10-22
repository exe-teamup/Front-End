export interface Course {
  courseId: string;
  semesterId: string;
  lecturerId?: string;
  courseName?: string;
  courseCode?: string;
  maxGroup?: number;
  groupCount?: number;
}
