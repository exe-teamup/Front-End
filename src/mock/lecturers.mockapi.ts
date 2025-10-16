import { getAllGroups } from './groups.mockapi';

export interface Lecturer {
  id: string;
  fullName: string;
  email: string;
  major: 'SE' | 'SS' | 'AI' | 'GD' | 'DS' | 'CS' | 'IT';
  avatar?: string;
}

const MOCK_LECTURERS: Lecturer[] = [
  {
    id: 'lec-1',
    fullName: 'TS. Nguyễn Thị Hạnh',
    email: 'hanhnt@fe.edu.vn',
    major: 'SE',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-2',
    fullName: 'ThS. Trần Văn Lâm',
    email: 'lamtv@fe.edu.vn',
    major: 'SE',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-3',
    fullName: 'TS. Phạm Minh Khoa',
    email: 'khoapm@fe.edu.vn',
    major: 'SS',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-4',
    fullName: 'ThS. Lê Hoài Nam',
    email: 'namlh@fe.edu.vn',
    major: 'AI',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-5',
    fullName: 'TS. Vũ Thu Trang',
    email: 'trangvt@fe.edu.vn',
    major: 'DS',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-6',
    fullName: 'ThS. Đỗ Quang Huy',
    email: 'huydq@fe.edu.vn',
    major: 'IT',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-7',
    fullName: 'TS. Nguyễn Đức Long',
    email: 'longnd@fe.edu.vn',
    major: 'SE',
    avatar: '/images/avatar.jpg',
  },
  {
    id: 'lec-8',
    fullName: 'ThS. Bùi Thị Thảo',
    email: 'thaobt@fe.edu.vn',
    major: 'SE',
    avatar: '/images/avatar.jpg',
  },
];

// in-memory registrations: groupId -> lecturerIds
const groupToLecturers: Record<string, string[]> = {};

export const listLecturers = (): Lecturer[] => {
  return MOCK_LECTURERS;
};

export interface RegisterLecturersResult {
  ok: boolean;
  error?: string;
}

export const registerLecturers = (
  groupId: string,
  lecturerIds: string[]
): RegisterLecturersResult => {
  const group = getAllGroups().find(g => g.id === groupId);
  if (!group) return { ok: false, error: 'Nhóm không tồn tại' };

  if (!lecturerIds || lecturerIds.length === 0) {
    return { ok: false, error: 'Hãy chọn ít nhất 1 giảng viên' };
  }
  if (lecturerIds.length > 3) {
    return { ok: false, error: 'Chọn tối đa 3 giảng viên' };
  }

  // Overwrite preferences; a lecturer can be chosen by many groups (no constraint here)
  groupToLecturers[groupId] = [...new Set(lecturerIds)].slice(0, 3);
  return { ok: true };
};

export const getRegisteredLecturers = (groupId: string): string[] => {
  return groupToLecturers[groupId] || [];
};
