export type PostType = 'RECRUIT' | 'LOOKING';
export type MajorCode = 'SE' | 'SS' | 'AI' | 'GD' | 'DS' | 'CS' | 'IT';

export interface PostItem {
  id: string;
  type: PostType; // 'RECRUIT' (tuyển người) | 'LOOKING' (tìm nhóm)
  title: string;
  description: string;
  groupId?: string; // for RECRUIT posts
  groupName?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  major: MajorCode;
  createdAt: string;
  joinRequests?: number; // for hot/recruit posts
}

// Helpers
const now = new Date();
const daysAgo = (d: number) =>
  new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (h: number) =>
  new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

export const MOCK_POSTS: PostItem[] = [
  // Recent RECRUIT posts
  {
    id: 'p-1',
    type: 'RECRUIT',
    title: 'Tuyển thành viên AI/ML cho đồ án cuối kỳ',
    description:
      'Nhóm đang cần 2 bạn có kinh nghiệm Python, Scikit-Learn, biết viết báo cáo.',
    groupId: 'group-1',
    groupName: 'AI & Machine Learning Research',
    authorId: 'user-1',
    authorName: 'Nguyễn Văn An',
    authorAvatar: '/images/avatar.jpg',
    major: 'SE',
    createdAt: hoursAgo(10),
    joinRequests: 5,
  },
  {
    id: 'p-2',
    type: 'RECRUIT',
    title: 'Web team tuyển 1 Frontend React',
    description:
      'Yêu cầu: React, Tailwind, biết Git flow cơ bản. Deadline mềm.',
    groupId: 'group-2',
    groupName: 'Web Development Team',
    authorId: 'user-5',
    authorName: 'Hoàng Văn Em',
    authorAvatar: '/images/avatar.jpg',
    major: 'SE',
    createdAt: hoursAgo(20),
    joinRequests: 2,
  },
  // LOOKING posts
  {
    id: 'p-3',
    type: 'LOOKING',
    title: 'Tìm nhóm đồ án Hệ thống thông tin',
    description: 'Mình mạnh phần backend Node.js, cần nhóm đã có đề tài.',
    authorId: 'user-10',
    authorName: 'Lê Thị Mai',
    authorAvatar: '/images/avatar.jpg',
    major: 'SS',
    createdAt: hoursAgo(30),
  },
  {
    id: 'p-4',
    type: 'LOOKING',
    title: 'Muốn join nhóm Data Science',
    description: 'Kinh nghiệm pandas, seaborn, có thể trình bày báo cáo.',
    authorId: 'user-11',
    authorName: 'Phạm Văn Nam',
    authorAvatar: '/images/avatar.jpg',
    major: 'DS',
    createdAt: hoursAgo(40),
  },
  // Older within 3 days
  {
    id: 'p-5',
    type: 'RECRUIT',
    title: 'Tuyển 1 bạn Mobile Flutter',
    description: 'Nhóm game, cần người build UI theo figma nhanh.',
    groupId: 'group-4',
    groupName: 'Game Development Studio',
    authorId: 'user-23',
    authorName: 'Trần Thị Hương',
    authorAvatar: '/images/avatar.jpg',
    major: 'GD',
    createdAt: daysAgo(2),
    joinRequests: 4,
  },
  {
    id: 'p-6',
    type: 'LOOKING',
    title: 'Cần nhóm Blockchain/Smart Contract',
    description: 'Đã làm solidity cơ bản, cần môi trường học hỏi.',
    authorId: 'user-26',
    authorName: 'Lê Văn Minh',
    authorAvatar: '/images/avatar.jpg',
    major: 'CS',
    createdAt: daysAgo(2),
  },
  // 1 week old
  {
    id: 'p-7',
    type: 'RECRUIT',
    title: 'Nhóm IoT tuyển 1 bạn firmware',
    description: 'Yêu cầu C/C++, Arduino hoặc ESP32.',
    groupId: 'group-8',
    groupName: 'IoT & Smart Devices',
    authorId: 'user-28',
    authorName: 'Phạm Thị Lan',
    authorAvatar: '/images/avatar.jpg',
    major: 'IT',
    createdAt: daysAgo(5),
    joinRequests: 1,
  },
  {
    id: 'p-8',
    type: 'LOOKING',
    title: 'Sinh viên năm 2 tìm nhóm UI/UX',
    description: 'Có thể prototyping, wireframe, figma.',
    authorId: 'user-32',
    authorName: 'Trần Thị Hương',
    authorAvatar: '/images/avatar.jpg',
    major: 'IT',
    createdAt: daysAgo(6),
  },
  // Bulk fill to support infinite loading demo
  ...Array.from({ length: 24 }).map((_, i) => {
    const isRecruit = i % 2 === 0;
    const type: PostType = isRecruit ? 'RECRUIT' : 'LOOKING';
    const majors: MajorCode[] = ['SE', 'SS', 'AI', 'GD', 'DS', 'CS', 'IT'];
    const major = majors[i % majors.length];
    const created =
      i < 6 ? hoursAgo(6 + i) : i < 12 ? daysAgo(2) : daysAgo(5 + (i % 3));
    return {
      id: `p-auto-${i + 9}`,
      type,
      title: isRecruit
        ? `Tuyển ${major} #${i + 1}`
        : `Tìm nhóm ${major} #${i + 1}`,
      description: isRecruit
        ? 'Cần thêm 1-2 thành viên, ưu tiên có kinh nghiệm thực tế.'
        : 'Muốn tham gia nhóm nghiêm túc, có định hướng rõ ràng.',
      groupId: isRecruit ? `group-${(i % 8) + 1}` : undefined,
      groupName: isRecruit ? `Group ${(i % 8) + 1}` : undefined,
      authorId: `user-${(i % 30) + 1}`,
      authorName: `User ${(i % 30) + 1}`,
      authorAvatar: '/images/avatar.jpg',
      major,
      createdAt: created,
      joinRequests: isRecruit ? (i % 5) + 1 : undefined,
    } as PostItem;
  }),
];

export type TimeFilter = '24H' | '3D' | '1W' | 'ALL';

export interface FetchPostsParams {
  type: PostType;
  time?: TimeFilter;
  majorSort?: MajorCode | 'ALL';
  offset?: number; // pagination offset
  limit?: number; // page size
}

const withinLastHours = (iso: string, hours: number) => {
  const dt = new Date(iso).getTime();
  return now.getTime() - dt <= hours * 60 * 60 * 1000;
};

export const fetchPosts = (
  params: FetchPostsParams
): { items: PostItem[]; total: number } => {
  const {
    type,
    time = 'ALL',
    majorSort = 'ALL',
    offset = 0,
    limit = 10,
  } = params;
  let items = MOCK_POSTS.filter(p => p.type === type);

  // time filter
  if (time === '24H')
    items = items.filter(p => withinLastHours(p.createdAt, 24));
  if (time === '3D')
    items = items.filter(p => withinLastHours(p.createdAt, 72));
  if (time === '1W')
    items = items.filter(p => withinLastHours(p.createdAt, 168));

  // major sort/filter (treat as filter by major)
  if (majorSort !== 'ALL') items = items.filter(p => p.major === majorSort);

  // sort newest first
  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = items.length;
  const paged = items.slice(offset, offset + limit);
  return { items: paged, total };
};
