export interface Post {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'FULL' | 'CLOSED';
  currentMembers: number;
  maxMembers: number;
  requiredMajors: string[];
  instructor: string;
  currentMajors: number;
  createdAt: string;
  updatedAt: string;
  groupId: string;
  groupName: string;
  groupLeader: string;
  groupLeaderId: string;
  requestCount: number; // Number of people requesting to join
}

export interface PostPagination {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'AI Education Platform',
    description:
      'Nhóm mình có dự án phát triển ứng dụng AI cho giáo dục, học tập. Tập trung vào Machine Learning và UX design.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Digital Marketing'],
    instructor: 'Nguyễn Hồng An',
    currentMajors: 3,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    groupId: 'group-1',
    groupName: 'AI Innovators',
    groupLeader: 'Nguyễn Văn An',
    groupLeaderId: 'user-1',
    requestCount: 25,
  },
  {
    id: '2',
    title: 'E-commerce Mobile App',
    description:
      'Phát triển ứng dụng thương mại điện tử với React Native và Node.js. Tập trung vào UI/UX và backend development.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 5,
    requiredMajors: ['Software Engineering', 'Digital Design'],
    instructor: 'Trần Thị Bình',
    currentMajors: 2,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    groupId: 'group-2',
    groupName: 'Tech Solutions',
    groupLeader: 'Lê Minh Cường',
    groupLeaderId: 'user-2',
    requestCount: 18,
  },
  {
    id: '3',
    title: 'Blockchain Voting System',
    description:
      'Xây dựng hệ thống bầu cử phi tập trung sử dụng blockchain. Cần hiểu biết về cryptography và smart contracts.',
    status: 'OPEN',
    currentMembers: 5,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Cybersecurity'],
    instructor: 'Phạm Văn Đức',
    currentMajors: 4,
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z',
    groupId: 'group-3',
    groupName: 'Blockchain Pioneers',
    groupLeader: 'Hoàng Thị Em',
    groupLeaderId: 'user-3',
    requestCount: 32,
  },
  {
    id: '4',
    title: 'IoT Smart Home',
    description:
      'Phát triển hệ thống nhà thông minh với Arduino và Raspberry Pi. Tập trung vào hardware và embedded systems.',
    status: 'OPEN',
    currentMembers: 2,
    maxMembers: 4,
    requiredMajors: ['Software Engineering', 'Electronics'],
    instructor: 'Võ Thị Phương',
    currentMajors: 2,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
    groupId: 'group-4',
    groupName: 'Smart Home Lab',
    groupLeader: 'Đặng Văn Giang',
    groupLeaderId: 'user-4',
    requestCount: 12,
  },
  {
    id: '5',
    title: 'Data Analytics Dashboard',
    description:
      'Tạo dashboard phân tích dữ liệu với Python, Pandas và D3.js. Tập trung vào data visualization và machine learning.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Data Science'],
    instructor: 'Bùi Thị Hoa',
    currentMajors: 3,
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    groupId: 'group-5',
    groupName: 'Data Wizards',
    groupLeader: 'Ngô Văn Ích',
    groupLeaderId: 'user-5',
    requestCount: 28,
  },
  {
    id: '6',
    title: 'VR Learning Environment',
    description:
      'Phát triển môi trường học tập thực tế ảo với Unity và C#. Tập trung vào 3D modeling và user experience.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Digital Design'],
    instructor: 'Lý Văn Khoa',
    currentMajors: 2,
    createdAt: '2024-01-12T13:10:00Z',
    updatedAt: '2024-01-12T13:10:00Z',
    groupId: 'group-6',
    groupName: 'VR Creators',
    groupLeader: 'Trịnh Thị Lan',
    groupLeaderId: 'user-6',
    requestCount: 15,
  },
  {
    id: '7',
    title: 'Cybersecurity Framework',
    description:
      'Xây dựng framework bảo mật cho hệ thống doanh nghiệp. Tập trung vào penetration testing và security protocols.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Cybersecurity', 'Software Engineering'],
    instructor: 'Đinh Văn Minh',
    currentMajors: 3,
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-12T08:30:00Z',
    groupId: 'group-7',
    groupName: 'Security Experts',
    groupLeader: 'Phan Thị Nga',
    groupLeaderId: 'user-7',
    requestCount: 22,
  },
  {
    id: '8',
    title: 'Mobile Game Development',
    description:
      'Tạo game mobile với Flutter và Unity. Tập trung vào game design, animation và monetization strategies.',
    status: 'OPEN',
    currentMembers: 5,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Digital Design'],
    instructor: 'Vũ Văn Oanh',
    currentMajors: 3,
    createdAt: '2024-01-11T15:45:00Z',
    updatedAt: '2024-01-11T15:45:00Z',
    groupId: 'group-8',
    groupName: 'Game Studio',
    groupLeader: 'Cao Thị Phượng',
    groupLeaderId: 'user-8',
    requestCount: 35,
  },
  {
    id: '9',
    title: 'Cloud Infrastructure',
    description:
      'Xây dựng hệ thống cloud với AWS và Docker. Tập trung vào DevOps, microservices và scalability.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 5,
    requiredMajors: ['Software Engineering', 'Cloud Computing'],
    instructor: 'Lê Văn Quang',
    currentMajors: 2,
    createdAt: '2024-01-11T10:15:00Z',
    updatedAt: '2024-01-11T10:15:00Z',
    groupId: 'group-9',
    groupName: 'Cloud Masters',
    groupLeader: 'Đỗ Thị Rồng',
    groupLeaderId: 'user-9',
    requestCount: 8,
  },
  {
    id: '10',
    title: 'AR Shopping Experience',
    description:
      'Phát triển ứng dụng mua sắm thực tế tăng cường với ARKit và React Native. Tập trung vào computer vision và UX.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Digital Design'],
    instructor: 'Nguyễn Văn Sơn',
    currentMajors: 3,
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-10T12:00:00Z',
    groupId: 'group-10',
    groupName: 'AR Innovators',
    groupLeader: 'Bùi Thị Tâm',
    groupLeaderId: 'user-10',
    requestCount: 19,
  },
  {
    id: '11',
    title: 'Machine Learning Pipeline',
    description:
      'Xây dựng pipeline xử lý dữ liệu và training models với Python và TensorFlow. Tập trung vào MLOps và data engineering.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Data Science'],
    instructor: 'Trần Văn Uy',
    currentMajors: 4,
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-10T09:30:00Z',
    groupId: 'group-11',
    groupName: 'ML Engineers',
    groupLeader: 'Phạm Thị Vân',
    groupLeaderId: 'user-11',
    requestCount: 41,
  },
  {
    id: '12',
    title: 'Fintech Payment System',
    description:
      'Phát triển hệ thống thanh toán tài chính với Node.js và PostgreSQL. Tập trung vào security và compliance.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 5,
    requiredMajors: ['Software Engineering', 'Finance'],
    instructor: 'Hoàng Văn Xương',
    currentMajors: 2,
    createdAt: '2024-01-09T14:20:00Z',
    updatedAt: '2024-01-09T14:20:00Z',
    groupId: 'group-12',
    groupName: 'Fintech Solutions',
    groupLeader: 'Võ Thị Yến',
    groupLeaderId: 'user-12',
    requestCount: 14,
  },
  {
    id: '13',
    title: 'Health Monitoring App',
    description:
      'Tạo ứng dụng theo dõi sức khỏe với React Native và IoT sensors. Tập trung vào data visualization và health analytics.',
    status: 'OPEN',
    currentMembers: 4,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Healthcare'],
    instructor: 'Lý Văn Zũ',
    currentMajors: 3,
    createdAt: '2024-01-09T11:45:00Z',
    updatedAt: '2024-01-09T11:45:00Z',
    groupId: 'group-13',
    groupName: 'Health Tech',
    groupLeader: 'Đặng Thị An',
    groupLeaderId: 'user-13',
    requestCount: 26,
  },
  {
    id: '14',
    title: 'Smart City Platform',
    description:
      'Xây dựng platform quản lý thành phố thông minh với IoT và big data. Tập trung vào urban planning và sustainability.',
    status: 'OPEN',
    currentMembers: 5,
    maxMembers: 6,
    requiredMajors: ['Software Engineering', 'Urban Planning'],
    instructor: 'Trịnh Văn Bình',
    currentMajors: 4,
    createdAt: '2024-01-08T16:10:00Z',
    updatedAt: '2024-01-08T16:10:00Z',
    groupId: 'group-14',
    groupName: 'Smart City Lab',
    groupLeader: 'Phan Thị Cường',
    groupLeaderId: 'user-14',
    requestCount: 33,
  },
  {
    id: '15',
    title: 'EdTech Learning Platform',
    description:
      'Phát triển nền tảng học tập trực tuyến với React và Node.js. Tập trung vào interactive learning và assessment tools.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 5,
    requiredMajors: ['Software Engineering', 'Education'],
    instructor: 'Vũ Thị Dung',
    currentMajors: 2,
    createdAt: '2024-01-08T13:25:00Z',
    updatedAt: '2024-01-08T13:25:00Z',
    groupId: 'group-15',
    groupName: 'EdTech Pioneers',
    groupLeader: 'Cao Văn Em',
    groupLeaderId: 'user-15',
    requestCount: 17,
  },
  {
    id: '16',
    title: 'Ốp lưng điện thoại thông minh',
    description:
      'Thiết kế và phát triển ốp lưng điện thoại thông minh với các tính năng bảo vệ và thẩm mỹ.',
    status: 'OPEN',
    currentMembers: 3,
    maxMembers: 6,
    requiredMajors: ['Marketing', 'Industrial Design'],
    instructor: 'Trần Thanh Thảo',
    currentMajors: 2,
    createdAt: '2024-01-08T13:25:00Z',
    updatedAt: '2024-01-08T13:25:00Z',
    groupId: 'group-16',
    groupName: 'Smart Case Creators',
    groupLeader: 'Phạm Hồng Yến Linh',
    groupLeaderId: 'user-16',
    requestCount: 6,
  },
];

export const getPostsWithPagination = (
  page: number = 1,
  limit: number = 9
): PostPagination => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = MOCK_POSTS.slice(startIndex, endIndex);

  return {
    posts,
    currentPage: page,
    totalPages: Math.ceil(MOCK_POSTS.length / limit),
    totalPosts: MOCK_POSTS.length,
  };
};

export const getNewestPosts = (limit: number = 15): Post[] => {
  return MOCK_POSTS.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, limit);
};

export const getHotPosts = (limit: number = 10): Post[] => {
  return MOCK_POSTS.sort((a, b) => b.requestCount - a.requestCount).slice(
    0,
    limit
  );
};
