// Mock data cho tất cả các trang Moderator

// ============= HELPER FUNCTIONS =============
const randomFromArray = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const firstNames = [
  'Nguyễn',
  'Trần',
  'Lê',
  'Phạm',
  'Hoàng',
  'Huỳnh',
  'Phan',
  'Vũ',
  'Võ',
  'Đặng',
];
const middleNames = [
  'Văn',
  'Thị',
  'Đức',
  'Minh',
  'Thanh',
  'Hữu',
  'Quốc',
  'Bảo',
  'Anh',
  'Thu',
];
const lastNames = [
  'An',
  'Bình',
  'Cường',
  'Dũng',
  'Em',
  'Giang',
  'Hùng',
  'Khánh',
  'Linh',
  'Mai',
  'Nam',
  'Phương',
  'Quân',
  'Sơn',
  'Tâm',
  'Uyên',
  'Vân',
  'Xuân',
  'Yến',
  'Zung',
];

const generateRandomName = () => {
  return `${randomFromArray(firstNames)} ${randomFromArray(middleNames)} ${randomFromArray(lastNames)}`;
};

// ============= KỲ HỌC (SEMESTER) =============
export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'finished';
}

const generateSemesters = (): Semester[] => {
  const semesters: Semester[] = [];
  const seasons = ['Spring', 'Summer', 'Fall'];
  const years = [2023, 2024, 2025, 2026];

  years.forEach(year => {
    seasons.forEach((season, idx) => {
      const startMonth = idx * 4 + 1;
      const endMonth = startMonth + 3;
      const status =
        year < 2025
          ? 'finished'
          : year === 2025 && idx < 2
            ? 'finished'
            : year === 2025 && idx === 2
              ? 'active'
              : 'upcoming';

      semesters.push({
        id: `${year}-${season}`,
        name: `${season} ${year}`,
        startDate: `${year}-${String(startMonth).padStart(2, '0')}-01`,
        endDate: `${year}-${String(endMonth).padStart(2, '0')}-30`,
        status,
      });
    });
  });

  return semesters;
};

export const mockSemesters = generateSemesters();

// ============= TEMPLATE NHÓM =============
export interface GroupTemplate {
  id: string;
  semester: string;
  minMembers: number;
  maxMembers: number;
  minMajors: number;
  maxLecturers: number;
}

const generateGroupTemplates = (): GroupTemplate[] => {
  return mockSemesters.map((sem, idx) => ({
    id: String(idx + 1),
    semester: sem.name,
    minMembers: 3 + Math.floor(Math.random() * 2), // 3-4
    maxMembers: 5 + Math.floor(Math.random() * 2), // 5-6
    minMajors: 2,
    maxLecturers: 2 + Math.floor(Math.random() * 2), // 2-3
  }));
};

export const mockGroupTemplates = generateGroupTemplates();

// ============= GIẢNG VIÊN (LECTURER) =============
export interface Lecturer {
  id: string;
  name: string;
  email: string;
  quota: number;
  currentGroups: number;
}

const generateLecturers = (count: number = 50): Lecturer[] => {
  const lecturers: Lecturer[] = [];

  for (let i = 1; i <= count; i++) {
    const name = `GV ${generateRandomName()}`;
    const email = `gv${i}@fpt.edu.vn`;
    const quota = 4 + Math.floor(Math.random() * 8); // 4-11
    const currentGroups = Math.floor(Math.random() * (quota + 2)); // 0 đến quota+1 (có thể vượt quota)

    lecturers.push({
      id: String(i),
      name,
      email,
      quota,
      currentGroups,
    });
  }

  return lecturers;
};

export const mockLecturers = generateLecturers(50);

// ============= SINH VIÊN (STUDENT) =============
export interface Student {
  id: string;
  name: string;
  mssv: string;
  class: string;
  major: string;
  group?: string;
}

const generateStudents = (count: number = 100): Student[] => {
  const students: Student[] = [];
  const majors = ['SE', 'AI', 'IS', 'IA', 'GD', 'MC'];
  const classes = [
    'SE1841',
    'SE1842',
    'SE1843',
    'AI1801',
    'AI1802',
    'IS1701',
    'IS1702',
    'IA1601',
    'GD1501',
    'MC1401',
  ];
  const groups = [
    'AI Healthcare (4/6)',
    'E-Commerce Mobile (5/6)',
    'Smart City IoT (3/6)',
    'Blockchain Wallet (6/6)',
    'AR Education (4/6)',
  ];

  for (let i = 1; i <= count; i++) {
    const name = generateRandomName();
    const mssv = `SE${String(184000 + i).padStart(6, '0')}`;
    const classCode = randomFromArray(classes);
    const major = randomFromArray(majors);
    const hasGroup = Math.random() > 0.3; // 70% có nhóm

    students.push({
      id: String(i),
      name,
      mssv,
      class: classCode,
      major,
      group: hasGroup ? randomFromArray(groups) : undefined,
    });
  }

  return students;
};

const allStudents = generateStudents(100);
export const mockStudentsWithGroup = allStudents.filter(s => s.group);
export const mockStudentsWithoutGroup = allStudents.filter(s => !s.group);

// ============= LỚP HỌC (COURSE) =============
export interface Course {
  id: string;
  name: string;
  semester: string;
  lecturer: string;
  studentCount: number;
}

const generateCourses = (count: number = 60): Course[] => {
  const courses: Course[] = [];
  const courseNames = [
    'EXE101',
    'SWP391',
    'SWR302',
    'MAS201',
    'PRN231',
    'IOT102',
  ];

  for (let i = 1; i <= count; i++) {
    const courseName = randomFromArray(courseNames);
    const semester = randomFromArray(mockSemesters).name;
    const classNum = Math.floor(i / 10) + 1;
    const lecturer = randomFromArray(mockLecturers).name;
    const studentCount = 20 + Math.floor(Math.random() * 15); // 20-34

    courses.push({
      id: String(i),
      name: `${courseName}_${semester.replace(' ', '')}_C${classNum}`,
      semester,
      lecturer,
      studentCount,
    });
  }

  return courses;
};

export const mockCourses = generateCourses(60);

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

const generateGroups = (count: number = 80): Group[] => {
  const groups: Group[] = [];
  const groupTopics = [
    'AI Healthcare Platform',
    'E-Commerce Mobile App',
    'Smart City IoT System',
    'Blockchain Wallet',
    'AR Education Tool',
    'Food Delivery App',
    'Travel Booking Platform',
    'Online Learning System',
    'Fitness Tracking App',
    'Social Media Analytics',
    'Real Estate Management',
    'Hotel Booking System',
    'Inventory Management',
    'HR Management System',
    'Customer Support Bot',
  ];

  const majors = ['SE', 'AI', 'IS', 'IA', 'GD'];

  for (let i = 1; i <= count; i++) {
    const topic = randomFromArray(groupTopics);
    const leaderName = generateRandomName();
    const memberCount = 3 + Math.floor(Math.random() * 4); // 3-6
    const maxMembers = 6;
    const numMajors = 2 + Math.floor(Math.random() * 2); // 2-3
    const selectedMajors = majors.slice(0, numMajors);
    const semester = randomFromArray(mockSemesters).name;

    const statusRand = Math.random();
    const status =
      statusRand > 0.7 ? 'pending' : statusRand > 0.4 ? 'active' : 'finished';

    const hasLecturer = status === 'active' || status === 'finished';
    const lecturer = hasLecturer
      ? randomFromArray(mockLecturers).name
      : undefined;
    const registeredLecturers =
      status === 'pending' ? Math.floor(Math.random() * 4) : 0;

    groups.push({
      id: String(i),
      name: topic,
      leader: leaderName,
      leaderEmail: `${leaderName.toLowerCase().replace(/\s+/g, '')}@fpt.edu.vn`,
      members: `${memberCount}/${maxMembers}`,
      majors: selectedMajors,
      status,
      lecturer,
      registeredLecturers,
      semester,
      courses: [topic],
    });
  }

  return groups;
};

export const mockGroups = generateGroups(80);

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

const generateLecturerWorkload = (): LecturerWorkload[] => {
  return mockLecturers.map(l => {
    const available = l.quota - l.currentGroups;
    const status: LecturerWorkload['status'] =
      l.currentGroups >= l.quota
        ? 'full'
        : available <= 1
          ? 'limited'
          : 'available';

    return {
      id: l.id,
      name: l.name,
      email: l.email,
      quota: l.quota,
      current: l.currentGroups,
      available: Math.max(0, available),
      status,
    };
  });
};

export const mockLecturerWorkload = generateLecturerWorkload();

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
  totalGroups: mockGroups.length,
  pendingAssignment: mockGroups.filter(g => g.status === 'pending').length,
  assigned: mockGroups.filter(g => g.status === 'active').length,
  activeLecturers: mockLecturers.length,
  totalStudents: mockStudentsWithGroup.length + mockStudentsWithoutGroup.length,
  studentsWithoutGroup: mockStudentsWithoutGroup.length,
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
    message: `Phân công ${mockLecturers[0].name} cho nhóm ${mockGroups[0].name}`,
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
    message: `Phân công ${mockLecturers[1].name} cho nhóm ${mockGroups[1].name}`,
    time: '2 giờ trước',
  },
  {
    id: '4',
    type: 'registration',
    message: `Nhóm ${mockGroups[2].name} đăng ký GV thành công`,
    time: '3 giờ trước',
  },
  {
    id: '5',
    type: 'creation',
    message: `Tạo mới học kỳ ${mockSemesters[mockSemesters.length - 1].name}`,
    time: '1 ngày trước',
  },
];

// ============= AVAILABLE GROUPS FOR GOD MODE =============
export const mockAvailableGroups = mockGroups.slice(0, 3).map(g => ({
  id: g.id,
  name: `${g.name} (${g.members})`,
  members: parseInt(g.members.split('/')[0]),
  max: parseInt(g.members.split('/')[1]),
}));
