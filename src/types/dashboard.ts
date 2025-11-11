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
