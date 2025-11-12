export interface Group {
  id: string;
  name: string;
  avatar?: string;
  banner?: string;
  memberCount: number;
  maxMembers: number;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  members: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'LEADER' | 'MEMBER';
  }[];
  tags: string[];
  createdAt: string;
  status: 'ACTIVE' | 'FULL' | 'CLOSED';
}

export interface GroupRequest {
  id: string;
  groupId: string;
  groupName: string;
  groupAvatar?: string;
  groupLeader: string;
  memberCount: number;
  maxMembers: number;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface IncomingRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  majorName: string;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface UserGroupStatus {
  isLeader: boolean;
  hasGroup: boolean;
  currentGroup?: Group;
  pendingRequests: GroupRequest[];
  incomingRequests: IncomingRequest[];
}

export const MOCK_GROUPS: Group[] = [
  {
    id: 'group-1',
    name: 'AI & Machine Learning Research',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 4,
    maxMembers: 6,
    leaderId: 'user-1',
    leaderName: 'Nguyễn Văn An',
    leaderEmail: 'nguyenvanan@fpt.edu.vn',
    members: [
      {
        id: 'user-1',
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-2',
        name: 'Trần Thị Bình',
        email: 'tranthibinh@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-3',
        name: 'Lê Văn Cường',
        email: 'levancuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-4',
        name: 'Phạm Thị Dung',
        email: 'phamthidung@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['AI', 'Machine Learning', 'Research', 'Python'],
    createdAt: '2024-01-15T10:00:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-2',
    name: 'Web Development Team',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 5,
    maxMembers: 6,
    leaderId: 'user-5',
    leaderName: 'Hoàng Văn Em',
    leaderEmail: 'hoangvanem@fpt.edu.vn',
    members: [
      {
        id: 'user-5',
        name: 'Hoàng Văn Em',
        email: 'hoangvanem@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-6',
        name: 'Vũ Thị Phương',
        email: 'vuthiphuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-7',
        name: 'Đặng Văn Giang',
        email: 'dangvangiang@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-8',
        name: 'Bùi Thị Hoa',
        email: 'buithihoa@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-9',
        name: 'Nguyễn Minh Tuấn',
        email: 'nguyenminhtuan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['Web Development', 'React', 'Node.js', 'JavaScript'],
    createdAt: '2024-01-20T14:30:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-3',
    name: 'Data Science & Analytics',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 3,
    maxMembers: 4,
    leaderId: 'user-10',
    leaderName: 'Lê Thị Mai',
    leaderEmail: 'lethimai@fpt.edu.vn',
    members: [
      {
        id: 'user-10',
        name: 'Lê Thị Mai',
        email: 'lethimai@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-11',
        name: 'Phạm Văn Nam',
        email: 'phamvannam@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-12',
        name: 'Trần Thị Lan',
        email: 'tranthilan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['Data Science', 'Analytics', 'Python', 'R', 'Statistics'],
    createdAt: '2024-02-01T09:15:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-4',
    name: 'Mobile App Development',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 6,
    maxMembers: 6,
    leaderId: 'user-13',
    leaderName: 'Nguyễn Văn Đức',
    leaderEmail: 'nguyenvanduc@fpt.edu.vn',
    members: [
      {
        id: 'user-13',
        name: 'Nguyễn Văn Đức',
        email: 'nguyenvanduc@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-14',
        name: 'Lê Thị Hương',
        email: 'lethihuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-15',
        name: 'Phạm Văn Tùng',
        email: 'phamvantung@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-16',
        name: 'Trần Thị Hoa',
        email: 'tranthihoa@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-17',
        name: 'Hoàng Văn Long',
        email: 'hoangvanlong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-18',
        name: 'Vũ Thị Linh',
        email: 'vuthilinh@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android'],
    createdAt: '2024-02-10T16:45:00Z',
    status: 'FULL',
  },
  {
    id: 'group-5',
    name: 'Cybersecurity Research',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 4,
    maxMembers: 5,
    leaderId: 'user-19',
    leaderName: 'Nguyễn Văn Bảo',
    leaderEmail: 'nguyenvanbao@fpt.edu.vn',
    members: [
      {
        id: 'user-19',
        name: 'Nguyễn Văn Bảo',
        email: 'nguyenvanbao@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-20',
        name: 'Trần Thị Hương',
        email: 'tranthihuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-21',
        name: 'Lê Văn Minh',
        email: 'levanminh@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-22',
        name: 'Phạm Thị Lan',
        email: 'phamthilan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: [
      'Cybersecurity',
      'Network Security',
      'Ethical Hacking',
      'Information Security',
    ],
    createdAt: '2024-02-15T11:20:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-6',
    name: 'Game Development Studio',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 3,
    maxMembers: 6,
    leaderId: 'user-23',
    leaderName: 'Trần Thị Hương',
    leaderEmail: 'tranthihuong@fpt.edu.vn',
    members: [
      {
        id: 'user-23',
        name: 'Trần Thị Hương',
        email: 'tranthihuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-24',
        name: 'Lê Văn Minh',
        email: 'levanminh@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-25',
        name: 'Phạm Thị Lan',
        email: 'phamthilan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['Game Development', 'Unity', 'Unreal Engine', 'C#', '3D Modeling'],
    createdAt: '2024-02-20T14:30:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-7',
    name: 'Blockchain & Cryptocurrency',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 2,
    maxMembers: 4,
    leaderId: 'user-26',
    leaderName: 'Lê Văn Minh',
    leaderEmail: 'levanminh@fpt.edu.vn',
    members: [
      {
        id: 'user-26',
        name: 'Lê Văn Minh',
        email: 'levanminh@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-27',
        name: 'Phạm Thị Lan',
        email: 'phamthilan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: ['Blockchain', 'Cryptocurrency', 'Web3', 'DeFi', 'Smart Contracts'],
    createdAt: '2024-02-25T09:45:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'group-8',
    name: 'IoT & Smart Devices',
    avatar: '/images/logo.svg',
    banner: '/images/home/banner-home.png',
    memberCount: 5,
    maxMembers: 6,
    leaderId: 'user-28',
    leaderName: 'Phạm Thị Lan',
    leaderEmail: 'phamthilan@fpt.edu.vn',
    members: [
      {
        id: 'user-28',
        name: 'Phạm Thị Lan',
        email: 'phamthilan@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'LEADER',
      },
      {
        id: 'user-29',
        name: 'Hoàng Văn Đức',
        email: 'hoangvanduc@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-30',
        name: 'Vũ Thị Hoa',
        email: 'vuthihoa@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-31',
        name: 'Nguyễn Văn Bảo',
        email: 'nguyenvanbao@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
      {
        id: 'user-32',
        name: 'Trần Thị Hương',
        email: 'tranthihuong@fpt.edu.vn',
        avatar: '/images/avatar.jpg',
        role: 'MEMBER',
      },
    ],
    tags: [
      'IoT',
      'Smart Devices',
      'Arduino',
      'Raspberry Pi',
      'Embedded Systems',
    ],
    createdAt: '2024-02-28T16:15:00Z',
    status: 'ACTIVE',
  },
];

export const MOCK_GROUP_REQUESTS: GroupRequest[] = [
  {
    id: 'request-1',
    groupId: 'group-2',
    groupName: 'Web Development Team',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Hoàng Văn Em',
    memberCount: 5,
    maxMembers: 6,
    requestedAt: '2024-02-15T10:30:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-2',
    groupId: 'group-3',
    groupName: 'Data Science & Analytics',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Lê Thị Mai',
    memberCount: 3,
    maxMembers: 4,
    requestedAt: '2024-02-18T14:20:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-3',
    groupId: 'group-5',
    groupName: 'Cybersecurity Research',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Nguyễn Văn Bảo',
    memberCount: 4,
    maxMembers: 5,
    requestedAt: '2024-02-20T09:15:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-4',
    groupId: 'group-6',
    groupName: 'Game Development Studio',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Trần Thị Hương',
    memberCount: 3,
    maxMembers: 6,
    requestedAt: '2024-02-22T16:45:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-5',
    groupId: 'group-7',
    groupName: 'Blockchain & Cryptocurrency',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Lê Văn Minh',
    memberCount: 2,
    maxMembers: 4,
    requestedAt: '2024-02-25T11:30:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-6',
    groupId: 'group-8',
    groupName: 'IoT & Smart Devices',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Phạm Thị Lan',
    memberCount: 5,
    maxMembers: 6,
    requestedAt: '2024-02-28T13:20:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-7',
    groupId: 'group-9',
    groupName: 'Cloud Computing & DevOps',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Hoàng Văn Đức',
    memberCount: 4,
    maxMembers: 5,
    requestedAt: '2024-03-01T08:10:00Z',
    status: 'PENDING',
  },
  {
    id: 'request-8',
    groupId: 'group-10',
    groupName: 'UI/UX Design Collective',
    groupAvatar: '/images/logo.svg',
    groupLeader: 'Vũ Thị Hoa',
    memberCount: 3,
    maxMembers: 4,
    requestedAt: '2024-03-03T15:40:00Z',
    status: 'PENDING',
  },
];

export const MOCK_INCOMING_REQUESTS: IncomingRequest[] = [
  {
    id: 'incoming-1',
    studentId: 'student-101',
    studentName: 'Nguyễn Văn Hoàng',
    studentEmail: 'nguyenvanhoang@fpt.edu.vn',
    majorName: 'Công nghệ phần mềm',
    requestedAt: '2024-03-05T10:30:00Z',
    status: 'PENDING',
  },
  {
    id: 'incoming-2',
    studentId: 'student-102',
    studentName: 'Trần Thị Linh',
    studentEmail: 'tranthilinh@fpt.edu.vn',
    majorName: 'Khoa học máy tính',
    requestedAt: '2024-03-06T14:20:00Z',
    status: 'PENDING',
  },
  {
    id: 'incoming-3',
    studentId: 'student-103',
    studentName: 'Lê Minh Quân',
    studentEmail: 'leminhquan@fpt.edu.vn',
    majorName: 'Trí tuệ nhân tạo',
    requestedAt: '2024-03-07T09:15:00Z',
    status: 'PENDING',
  },
  {
    id: 'incoming-4',
    studentId: 'student-104',
    studentName: 'Phạm Thị Hằng',
    studentEmail: 'phamthihang@fpt.edu.vn',
    majorName: 'Khoa học dữ liệu',
    requestedAt: '2024-03-08T16:45:00Z',
    status: 'PENDING',
  },
  {
    id: 'incoming-5',
    studentId: 'student-105',
    studentName: 'Hoàng Văn Tú',
    studentEmail: 'hoangvantu@fpt.edu.vn',
    majorName: 'An toàn thông tin',
    requestedAt: '2024-03-09T11:30:00Z',
    status: 'PENDING',
  },
];

// Mock current user status
export const MOCK_USER_GROUP_STATUS: UserGroupStatus = {
  isLeader: true,
  hasGroup: true,
  currentGroup: MOCK_GROUPS[0],
  pendingRequests: MOCK_GROUP_REQUESTS,
  incomingRequests: MOCK_INCOMING_REQUESTS,
};

// API functions
export const getUserGroupStatus = (): UserGroupStatus => {
  return MOCK_USER_GROUP_STATUS;
};

export const getAllGroups = (): Group[] => {
  return MOCK_GROUPS;
};

export const searchGroups = (query: string, memberFilter?: number): Group[] => {
  let filteredGroups = MOCK_GROUPS;

  if (query.trim()) {
    const lowercaseQuery = query.toLowerCase();
    filteredGroups = filteredGroups.filter(
      group =>
        group.name.toLowerCase().includes(lowercaseQuery) ||
        group.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  if (memberFilter !== undefined) {
    filteredGroups = filteredGroups.filter(
      group => group.memberCount <= memberFilter
    );
  }

  return filteredGroups;
};

export const cancelGroupRequest = (_requestId: string): boolean => {
  // Mock API call - in real app, this would make an API request
  // console.log('Cancelling group request:', requestId);
  return true;
};

export const approveJoinRequest = (_requestId: string): boolean => {
  // Mock API call - in real app, this would make an API request
  // console.log('Approving join request:', requestId);
  return true;
};

export const rejectJoinRequest = (_requestId: string): boolean => {
  // Mock API call - in real app, this would make an API request
  // console.log('Rejecting join request:', requestId);
  return true;
};
