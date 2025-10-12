export interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
  category: string;
  readTime: number;
}

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: '10 ý tưởng khởi nghiệp đột phá cho sinh viên',
    description:
      'Khám phá những ý tưởng kinh doanh sáng tạo và tiềm năng, phù hợp với nguồn lực và kiến thức của sinh viên.',
    author: 'ThS. Nguyễn Thị Hoa',
    createdAt: '2024-01-20T10:00:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Khởi nghiệp',
    readTime: 8,
  },
  {
    id: 'blog-2',
    title: 'Làm thế nào để xây dựng một portfolio ấn tượng?',
    description:
      'Hướng dẫn chi tiết cách tạo dựng một portfolio chuyên nghiệp, thu hút nhà tuyển dụng trong mọi lĩnh vực.',
    author: 'Lê Văn Nam',
    createdAt: '2024-01-18T14:30:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Kỹ năng',
    readTime: 6,
  },
  {
    id: 'blog-3',
    title: 'Tầm quan trọng của kỹ năng mềm trong kỷ nguyên số',
    description:
      'Phân tích vai trò của các kỹ năng mềm như giao tiếp, làm việc nhóm, tư duy phản biện trong môi trường làm việc hiện đại.',
    author: '',
    createdAt: '2024-01-15T09:15:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Kỹ năng',
    readTime: 10,
  },
  {
    id: 'blog-4',
    title: 'Học lập trình từ con số 0: Lộ trình và tài nguyên',
    description:
      'Tổng hợp các bước đi, ngôn ngữ lập trình nên học và các khóa học miễn phí/trả phí cho người mới bắt đầu.',
    author: 'Phạm Thị Mai',
    createdAt: '2024-01-10T11:00:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Công nghệ',
    readTime: 12,
  },
  {
    id: 'blog-5',
    title: 'Quản lý thời gian hiệu quả cho sinh viên bận rộn',
    description:
      'Các phương pháp và công cụ giúp sinh viên cân bằng việc học, làm thêm và các hoạt động ngoại khóa.',
    author: 'Nguyễn Thanh Tùng',
    createdAt: '2024-01-05T16:45:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Kỹ năng',
    readTime: 7,
  },
  {
    id: 'blog-6',
    title: 'Xu hướng công nghệ 2024: AI, Blockchain và hơn thế nữa',
    description:
      'Cập nhật những công nghệ mới nhất đang định hình tương lai và cơ hội nghề nghiệp đi kèm.',
    author: 'ThS. Lê Hoàng Anh',
    createdAt: '2024-01-01T08:00:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Công nghệ',
    readTime: 9,
  },
  {
    id: 'blog-7',
    title: 'Ý tưởng kinh doanh online với vốn ít',
    description:
      'Chia sẻ những mô hình kinh doanh online phù hợp với sinh viên, không cần vốn lớn nhưng vẫn có thể tạo thu nhập.',
    author: 'Trần Thị Lan',
    createdAt: '2023-12-28T13:20:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Khởi nghiệp',
    readTime: 11,
  },
  {
    id: 'blog-8',
    title: 'Cách viết CV và cover letter thu hút nhà tuyển dụng',
    description:
      'Bí quyết tạo CV và thư xin việc ấn tượng, giúp bạn nổi bật trong hàng trăm ứng viên khác.',
    author: 'PGS.TS. Võ Minh Tuấn',
    createdAt: '2023-12-25T15:30:00Z',
    imageUrl: 'images/home/thumbnail.png',
    category: 'Kỹ năng',
    readTime: 8,
  },
];

export const getRecentBlogs = (limit: number = 3): Blog[] => {
  return MOCK_BLOGS.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, limit);
};
