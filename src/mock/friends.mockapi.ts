export interface Friend {
  id: string;
  name: string;
  email: string;
  studentCode: string;
  major: string;
  avatar?: string;
  status: 'LOOKING_FOR_GROUP' | 'HAVE_GROUP';
}

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'friend-1',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@fpt.edu.vn',
    studentCode: 'SE181256',
    major: 'Software Engineering',
    avatar: '/images/avatar.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'friend-2',
    name: 'Trần Thị Bình',
    email: 'tranthibinh@fpt.edu.vn',
    studentCode: 'SS180031',
    major: 'Information Technology',
    avatar: '/images/avatar.jpg',
    status: 'HAVE_GROUP',
  },
  {
    id: 'friend-3',
    name: 'Lê Văn Cường',
    email: 'levancuong@fpt.edu.vn',
    studentCode: 'SE181789',
    major: 'Computer Science',
    avatar: '/images/avatar.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'friend-4',
    name: 'Phạm Thị Dung',
    email: 'phamthidung@fpt.edu.vn',
    studentCode: 'SE191234',
    major: 'Software Engineering',
    avatar: '/images/avatar.jpg',
    status: 'HAVE_GROUP',
  },
  {
    id: 'friend-5',
    name: 'Hoàng Văn Em',
    email: 'hoangvanem@fpt.edu.vn',
    studentCode: 'SE190345',
    major: 'Information Technology',
    avatar: '/images/avatar.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'friend-6',
    name: 'Vũ Thị Phương',
    email: 'vuthiphuong@fpt.edu.vn',
    studentCode: 'SS190456',
    major: 'Computer Science',
    avatar: '/images/avatar.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
  {
    id: 'friend-7',
    name: 'Đặng Văn Giang',
    email: 'dangvangiang@fpt.edu.vn',
    studentCode: 'SS181034',
    major: 'Software Engineering',
    avatar: '/images/avatar.jpg',
    status: 'HAVE_GROUP',
  },
  {
    id: 'friend-8',
    name: 'Bùi Thị Hoa',
    email: 'buithihoa@fpt.edu.vn',
    studentCode: 'SS181006',
    major: 'Information Technology',
    avatar: '/images/avatar.jpg',
    status: 'LOOKING_FOR_GROUP',
  },
];

export const searchFriends = (query: string): Friend[] => {
  if (!query.trim())
    return MOCK_FRIENDS.filter(friend => friend.status === 'LOOKING_FOR_GROUP');

  const lowercaseQuery = query.toLowerCase();
  return MOCK_FRIENDS.filter(
    friend =>
      friend.status === 'LOOKING_FOR_GROUP' &&
      (friend.name.toLowerCase().includes(lowercaseQuery) ||
        friend.email.toLowerCase().includes(lowercaseQuery) ||
        friend.studentCode.toLowerCase().includes(lowercaseQuery))
  );
};
