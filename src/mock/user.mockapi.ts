export type UserStatus = 'LOOKING_FOR_GROUP' | 'HAS_GROUP';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  coverImage: string;
  major: string;
  year: number;
  university: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  otherSocials?: string[];
  skills: string[];
  interests: string[];
  status: UserStatus; // 'LOOKING_FOR_GROUP' | 'HAS_GROUP'
  groupId?: string;
  groupName?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  isVerified: boolean;
}

export interface Member {
  id: string;
  name: string;
  major: string;
  avatar?: string;
  isVerified?: boolean;
  status: 'LOOKING_FOR_GROUP' | 'HAS_GROUP';
  groupName?: string;
}

export interface MemberSuggestionsProps {
  major: string;
  currentUserId: string;
  className?: string;
}

export interface UserStats {
  postsCount: number;
  groupStatus: UserStatus;
  views: number;
}

export interface UserActivity {
  id: string;
  type: 'post_created' | 'blog_published';
  title: string;
  description: string;
  createdAt: string;
  relatedId?: string;
}

export const getRandomCoverImage = (userId: string): string => {
  const coverImages = [
    '/images/cover/cover-profile1.jpg',
    '/images/cover/cover-profile2.jpg',
    '/images/cover/cover-profile3.jpg',
    '/images/cover/cover-profile4.jpg',
    '/images/cover/cover-profile5.jpg',
  ];

  const hash = userId.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const index = Math.abs(hash) % coverImages.length;
  return coverImages[index];
};

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-1',
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan@fpt.edu.vn',
  phone: '+84 123 456 789',
  bio: 'Sinh viên năm 3 ngành Công nghệ thông tin, đam mê phát triển ứng dụng web và mobile. Có kinh nghiệm với React, Node.js và Python.',
  avatar: '/images/avatar.jpg',
  coverImage: getRandomCoverImage('user-1'),
  major: 'Công nghệ thông tin',
  year: 3,
  university: 'FPT University',
  location: 'Hà Nội, Việt Nam',
  website: 'https://nguyenvanan.dev',
  linkedin: 'https://linkedin.com/in/nguyenvanan',
  github: 'https://github.com/nguyenvanan',
  otherSocials: [],
  skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
  interests: ['Web Development', 'Mobile Development', 'AI/ML', 'Blockchain'],
  status: 'LOOKING_FOR_GROUP',
  createdAt: '2023-09-01T00:00:00Z',
  updatedAt: '2024-01-20T10:00:00Z',
  isPublic: true,
  isVerified: true,
};

export const MOCK_USER_STATS: UserStats = {
  postsCount: 1,
  groupStatus: 'LOOKING_FOR_GROUP',
  views: 1240,
};

export const MOCK_USER_ACTIVITIES: UserActivity[] = [
  {
    id: 'activity-1',
    type: 'blog_published',
    title: 'Cách thuyết phục nhà đầu tư cho dự án khởi nghiệp',
    description:
      'Bài đăng về các chiến lược và mẹo để thu hút sự chú ý của nhà đầu tư cho dự án khởi nghiệp của bạn.',
    createdAt: '2024-01-15T10:00:00Z',
    relatedId: 'post-1',
  },
  {
    id: 'activity-3',
    type: 'blog_published',
    title: 'Xuất bản bài viết',
    description: '10 ý tưởng khởi nghiệp đột phá cho sinh viên',
    createdAt: '2024-01-08T09:15:00Z',
    relatedId: 'blog-1',
  },
  {
    id: 'activity-4',
    type: 'post_created',
    title: 'AI Innovators Labs',
    description: 'AI Innovators - Nhóm nghiên cứu và phát triển AI',
    createdAt: '2024-01-05T16:45:00Z',
    relatedId: 'group-1',
  },
];

// Mock data for members with same major
export const MOCK_MEMBERS: Member[] = [
  {
    id: 'member-1',
    name: 'Đức Trần',
    major: 'Công nghệ thông tin',
    avatar: '/images/avatar_rcm.jpg',
    isVerified: false,
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'member-2',
    name: 'Anh The',
    major: 'Công nghệ thông tin',
    avatar: '/images/avatar_rcm.jpg',
    isVerified: true,
    status: 'HAS_GROUP',
    groupName: 'Tech Solutions',
  },
  {
    id: 'member-3',
    name: 'Nhân Hà Thế',
    major: 'Công nghệ thông tin',
    avatar: '/images/avatar_rcm.jpg',
    isVerified: true,
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'member-4',
    name: 'Khang Nguyen Hoang',
    major: 'Công nghệ thông tin',
    avatar: '/images/avatar_rcm.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'member-5',
    name: 'Minh Phạm',
    major: 'Công nghệ thông tin',
    avatar: '/images/avatar_rcm.jpg',
    isVerified: false,
    status: 'HAS_GROUP',
    groupName: 'AI Innovators',
  },
];

export const getUserProfile = (userId: string): UserProfile => {
  return {
    ...MOCK_USER_PROFILE,
    id: userId,
    coverImage: getRandomCoverImage(userId),
  };
};

export const getUserStats = (_userId: string): UserStats => {
  return MOCK_USER_STATS;
};

export const getUserActivities = (
  _userId: string,
  limit: number = 10
): UserActivity[] => {
  return MOCK_USER_ACTIVITIES.slice(0, limit);
};

export const getUserPosts = (_userId: string) => {
  return [];
};

export const getUserGroups = (_userId: string) => {
  return [];
};
