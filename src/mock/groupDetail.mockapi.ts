export interface GroupDetail {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  memberCount: number;
  maxMembers: number;
  leader: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'LEADER';
  };
  mentor?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'MENTOR';
  };
  major: string;
  status: 'ACTIVE' | 'FULL' | 'CLOSED';
  tags: string[];
  createdAt: string;
  isJoined: boolean;
  joinRequestStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface RelatedGroup {
  id: string;
  name: string;
  avatar?: string;
  memberCount: number;
  maxMembers: number;
  status: 'ACTIVE' | 'FULL' | 'CLOSED';
  isRecruiting: boolean;
  major: string;
}

export const MOCK_GROUP_DETAILS: GroupDetail[] = [
  {
    id: 'group-1',
    name: 'AI & Machine Learning Research',
    description:
      'Nhóm nghiên cứu về trí tuệ nhân tạo và machine learning. Chúng tôi tập trung vào các dự án thực tế và ứng dụng AI trong cuộc sống. Chúng tôi thường xuyên tổ chức các buổi seminar, workshop và hackathon để chia sẻ kiến thức và kinh nghiệm.',
    avatar: '/images/logo.svg',
    banner: '/images/cover/cover-profile1.jpg',
    memberCount: 4,
    maxMembers: 6,
    leader: {
      id: 'user-1',
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@fpt.edu.vn',
      avatar: '/images/avatar.jpg',
      role: 'LEADER',
    },
    mentor: {
      id: 'teacher-1',
      name: 'ThS. Trần Thị Minh',
      email: 'tranthiminh@fe.edu.vn',
      avatar: '/images/avatar.jpg',
      role: 'MENTOR',
    },
    major: 'SE',
    status: 'ACTIVE',
    tags: ['AI', 'Machine Learning', 'Research', 'Python', 'Deep Learning'],
    createdAt: '2024-01-15T10:00:00Z',
    isJoined: false,
    joinRequestStatus: undefined,
  },
  {
    id: 'group-2',
    name: 'Web Development Team',
    description:
      'Nhóm phát triển web với React, Node.js và các công nghệ hiện đại. Chúng tôi xây dựng các ứng dụng web chất lượng cao và học hỏi lẫn nhau về các best practices trong phát triển web.',
    avatar: '/images/logo.svg',
    banner: '/images/cover/cover-profile2.jpg',
    memberCount: 5,
    maxMembers: 6,
    leader: {
      id: 'user-5',
      name: 'Hoàng Văn Em',
      email: 'hoangvanem@fpt.edu.vn',
      avatar: '/images/avatar.jpg',
      role: 'LEADER',
    },
    // No mentor assigned
    major: 'SS',
    status: 'ACTIVE',
    tags: ['Web Development', 'React', 'Node.js', 'JavaScript', 'Frontend'],
    createdAt: '2024-01-20T14:30:00Z',
    isJoined: false,
    joinRequestStatus: undefined,
  },
];

export const MOCK_RELATED_GROUPS: RelatedGroup[] = [
  // SE related groups
  {
    id: 'group-1',
    name: 'Software Engineering Project',
    avatar: '/images/logo.svg',
    memberCount: 3,
    maxMembers: 4,
    status: 'ACTIVE',
    isRecruiting: true,
    major: 'SE',
  },
  {
    id: 'group-2',
    name: 'System Security Research',
    avatar: '/images/logo.svg',
    memberCount: 5,
    maxMembers: 6,
    status: 'ACTIVE',
    isRecruiting: false,
    major: 'SE',
  },
  {
    id: 'group-3',
    name: 'Mobile App Development',
    avatar: '/images/logo.svg',
    memberCount: 4,
    maxMembers: 5,
    status: 'ACTIVE',
    isRecruiting: true,
    major: 'SE',
  },
  {
    id: 'group-4',
    name: 'Game Development Studio',
    avatar: '/images/logo.svg',
    memberCount: 2,
    maxMembers: 4,
    status: 'ACTIVE',
    isRecruiting: true,
    major: 'SE',
  },
  // SS group groups
  {
    id: 'group-5',
    name: 'Data Science & Analytics',
    avatar: '/images/logo.svg',
    memberCount: 4,
    maxMembers: 5,
    status: 'ACTIVE',
    isRecruiting: true,
    major: 'SS',
  },
  {
    id: 'group-6',
    name: 'Information Systems',
    avatar: '/images/logo.svg',
    memberCount: 6,
    maxMembers: 6,
    status: 'FULL',
    isRecruiting: false,
    major: 'SS',
  },
  {
    id: 'group-7',
    name: 'Cybersecurity Research',
    avatar: '/images/logo.svg',
    memberCount: 3,
    maxMembers: 4,
    status: 'ACTIVE',
    isRecruiting: true,
    major: 'SS',
  },
  {
    id: 'group-8',
    name: 'Database Management',
    avatar: '/images/logo.svg',
    memberCount: 5,
    maxMembers: 6,
    status: 'ACTIVE',
    isRecruiting: false,
    major: 'SS',
  },
];

// API functions
export const getGroupDetail = (groupId: string): GroupDetail | null => {
  return MOCK_GROUP_DETAILS.find(group => group.id === groupId) || null;
};

export const getRelatedGroups = (
  major: string,
  currentGroupId: string
): RelatedGroup[] => {
  return MOCK_RELATED_GROUPS.filter(
    group => group.major === major && group.id !== currentGroupId
  );
};

export const joinGroup = (groupId: string): boolean => {
  // Mock API call
  getGroupDetail(groupId);
  return true;
};

export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return {
        label: 'Đang hoạt động',
        description: 'Nhóm đang hoạt động và tuyển thành viên',
        color: 'bg-primary-green/30 text-green-800',
      };
    case 'FULL':
      return {
        label: 'Đã đầy',
        description: 'Nhóm đã đủ thành viên, không tuyển thêm',
        color: 'bg-primary/30 text-yellow-800',
      };
    case 'CLOSED':
      return {
        label: 'Đã đóng',
        description: 'Nhóm đã ngừng hoạt động',
        color: 'bg-red-100 text-red-800',
      };
    default:
      return {
        label: 'Không xác định',
        description: 'Trạng thái không xác định',
        color: 'bg-gray-100 text-gray-800',
      };
  }
};
