export interface RecentActivity {
  id?: number;
  title?: string;
  description?: string;
  timestamp?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  relatedEntity?: string;
  relatedEntityId?: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalLecturers: number;
  activeSemesters: number;
  totalCourses: number;
  groupsCreatedToday: number;
  newPostsToday: number;
  pendingJoinRequests: number;
  recentActivity: RecentActivity[];
}

export interface LecturerWorkloadDetail {
  lecturerId: number;
  lecturerName: string;
  email: string;
  currentLoad: number;
  quota: number;
  percentage: number;
  status: string;
}

export interface WorkloadData {
  totalLecturers: number;
  lecturersWithSlot: number;
  lecturersAlmostFull: number;
  lecturersFull: number;
  lecturerDetails: LecturerWorkloadDetail[];
}
