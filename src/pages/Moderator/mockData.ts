// Mock data cho tất cả các trang Moderator

// ============= KỲ HỌC (SEMESTER) =============
export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'finished';
}

export const mockSemesters: Semester[] = [
  {
    id: '1',
    name: 'Fall 2025',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Summer 2025',
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    status: 'active',
  },
  {
    id: '3',
    name: 'Spring 2025',
    startDate: '2025-01-01',
    endDate: '2025-04-30',
    status: 'finished',
  },
];

// ============= TEMPLATE NHÓM =============
export interface GroupTemplate {
  id: string;
  semester: string;
  minMembers: number;
  maxMembers: number;
  minMajors: number;
  maxLecturers: number;
}

export const mockGroupTemplates: GroupTemplate[] = [
  {
    id: '1',
    semester: 'Fall 2025',
    minMembers: 4,
    maxMembers: 6,
    minMajors: 2,
    maxLecturers: 3,
  },
  {
    id: '2',
    semester: 'Summer 2025',
    minMembers: 3,
    maxMembers: 6,
    minMajors: 2,
    maxLecturers: 3,
  },
];

// ============= GIẢNG VIÊN (LECTURER) =============
export interface Lecturer {
  id: string;
  name: string;
  email: string;
  quota: number;
  currentGroups: number;
}

export const mockLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'GV Nguyễn Văn A',
    email: 'nguyenvana@fpt.edu.vn',
    quota: 2,
    currentGroups: 2,
  },
  {
    id: '2',
    name: 'GV Trần Thị B',
    email: 'tranthib@fpt.edu.vn',
    quota: 1,
    currentGroups: 1,
  },
  {
    id: '3',
    name: 'GV Trần Thị B',
    email: 'tranthib2@fpt.edu.vn',
    quota: 8,
    currentGroups: 6,
  },
  {
    id: '4',
    name: 'GV Nguyễn Văn A',
    email: 'nguyenvana2@fpt.edu.vn',
    quota: 11,
    currentGroups: 4,
  },
];

// ============= SINH VIÊN (STUDENT) =============
export interface Student {
  id: string;
  name: string;
  mssv: string;
  class: string;
  major: string;
  group?: string;
}

export const mockStudentsWithGroup: Student[] = [
  {
    id: '1',
    name: 'MSSV',
    mssv: '1',
    class: '1',
    major: 'SE',
    group: 'AI Healthcare (4/6)',
  },
  {
    id: '2',
    name: 'MSSV',
    mssv: '4',
    class: '2',
    major: 'AI',
    group: 'AI Healthcare (4/6)',
  },
];

export const mockStudentsWithoutGroup: Student[] = [
  {
    id: '3',
    name: 'MSSV',
    mssv: '05 0000',
    class: '1',
    major: 'SE',
  },
  {
    id: '4',
    name: 'MSSV',
    mssv: '05 0000',
    class: '3',
    major: 'AI',
  },
];

// ============= LỚP HỌC (COURSE) =============
export interface Course {
  id: string;
  name: string;
  semester: string;
  lecturer: string;
  studentCount: number;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'EXE101_Fall2025_C1',
    semester: 'Fall 2025',
    lecturer: 'GV Nguyễn Văn A',
    studentCount: 30,
  },
  {
    id: '2',
    name: 'EXE101_Fall2025_C2',
    semester: 'Fall 2025',
    lecturer: 'GV Trần Thị B',
    studentCount: 30,
  },
  {
    id: '3',
    name: 'MAS201_Summer2025_C1',
    semester: 'Summer 2025',
    lecturer: 'GV Lê Văn C',
    studentCount: 25,
  },
];

// ============= NHÓM (GROUP) =============
export interface Group {
  id: string;
  name: string;
  leader: string;
  leaderEmail: string;
  members: string;
  majors: string[];
  status: 'pending' | 'active' | 'finished';
  lecturer?: string;
  registeredLecturers: number;
  semester: string;
  courses: string[];
}

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'GV Nguyễn Văn A',
    leader: 'Trưởng nhóm: Nguyễn A / 8 thành viên',
    leaderEmail: 'nguyenvana@fpt.edu.vn',
    members: '4/6',
    majors: ['SE', 'AI', 'IS'],
    status: 'pending',
    registeredLecturers: 3,
    semester: 'Fall 2025',
    courses: ['AI Healthcare', 'E-Commerce Mobile'],
  },
  {
    id: '2',
    name: 'GV Nguyễn Văn A',
    leader: 'nguyenvana@fpt.edu.vn',
    leaderEmail: 'tranthib@fpt.edu.vn',
    members: '4/6',
    majors: ['SE', 'AI'],
    status: 'active',
    lecturer: 'GV Nguyễn Văn A',
    registeredLecturers: 0,
    semester: 'Summer 2025',
    courses: ['Smart City IoT'],
  },
  {
    id: '3',
    name: 'GV-Commerce Mobile App',
    leader: 'Phạm Thị D',
    leaderEmail: 'phamthid@fpt.edu.vn',
    members: '5/6',
    majors: ['SE', 'IS'],
    status: 'active',
    registeredLecturers: 2,
    semester: 'Summer 2025',
    courses: [],
  },
];

// ============= WORKLOAD GIẢNG VIÊN =============
export interface LecturerWorkload {
  id: string;
  name: string;
  email: string;
  quota: number;
  current: number;
  available: number;
  status: 'available' | 'limited' | 'full';
}

export const mockLecturerWorkload: LecturerWorkload[] = [
  {
    id: '1',
    name: 'GV Nguyễn Văn A',
    email: 'nguyenvana@fpt.edu.vn',
    quota: 6,
    current: 2,
    available: 4,
    status: 'available',
  },
  {
    id: '2',
    name: 'GV Trần Thị B',
    email: 'tranthib@fpt.edu.vn',
    quota: 5,
    current: 4,
    available: 1,
    status: 'limited',
  },
  {
    id: '3',
    name: 'GV Lê Văn C',
    email: 'levanc@fpt.edu.vn',
    quota: 4,
    current: 4,
    available: 0,
    status: 'full',
  },
  {
    id: '4',
    name: 'GV Phạm Thị D',
    email: 'phamthid@fpt.edu.vn',
    quota: 8,
    current: 3,
    available: 5,
    status: 'available',
  },
  {
    id: '5',
    name: 'GV Hoàng Văn E',
    email: 'hoangvane@fpt.edu.vn',
    quota: 6,
    current: 5,
    available: 1,
    status: 'limited',
  },
];

// ============= DASHBOARD STATS =============
export interface DashboardStats {
  totalGroups: number;
  pendingAssignment: number;
  assigned: number;
  activeLecturers: number;
  totalStudents: number;
  studentsWithoutGroup: number;
}

export const mockDashboardStats: DashboardStats = {
  totalGroups: 48,
  pendingAssignment: 12,
  assigned: 36,
  activeLecturers: 8,
  totalStudents: 250,
  studentsWithoutGroup: 15,
};

// ============= RECENT ACTIVITIES =============
export interface Activity {
  id: string;
  type: 'assignment' | 'update' | 'registration' | 'creation';
  message: string;
  time: string;
}

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'assignment',
    message: 'Phân công GV Nguyễn Văn A cho nhóm AI Healthcare',
    time: '10 phút trước',
  },
  {
    id: '2',
    type: 'update',
    message: 'Cập nhật số nhóm tối đa/lớp: 6',
    time: '1 giờ trước',
  },
  {
    id: '3',
    type: 'assignment',
    message: 'Phân công GV Trần Thị B cho nhóm Smart City',
    time: '2 giờ trước',
  },
  {
    id: '4',
    type: 'registration',
    message: 'Nhóm E-Commerce Platform đăng ký GV thành công',
    time: '3 giờ trước',
  },
  {
    id: '5',
    type: 'creation',
    message: 'Tạo mới học kỳ Fall 2025',
    time: '1 ngày trước',
  },
];

// ============= AVAILABLE GROUPS FOR GOD MODE =============
export const mockAvailableGroups = [
  { id: '1', name: 'AI Healthcare (4/6)', members: 4, max: 6 },
  { id: '2', name: 'E-Commerce Mobile (5/6)', members: 5, max: 6 },
  { id: '3', name: 'Smart City IoT (3/6)', members: 3, max: 6 },
];
