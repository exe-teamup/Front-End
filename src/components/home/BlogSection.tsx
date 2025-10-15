import { getRecentBlogs } from '../../mock/blog.mockapi';
import { BlogCard } from '../ui/BlogCard';
import { cn } from '../../utils/cn';
import { toast } from 'sonner';

interface BlogSectionProps {
  className?: string;
}

export function BlogSection({ className }: BlogSectionProps) {
  const recentBlogs = getRecentBlogs(3);

  return (
    <div className={cn('py-12 bg-gray-50', className)}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-start mb-8'>
          <h2 className='text-3xl font-bold text-text-title mb-2'>
            Blogs mới nhất
          </h2>
          <p className='text-text-subtitle'>
            Bài chia sẽ của giảng viên và học viên
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {recentBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className='text-center'>
          <button
            className='bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer'
            onClick={() => {
              toast.info('Trang xem tất cả bài viết đang được phát triển!');
            }}
          >
            Xem tất cả bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
