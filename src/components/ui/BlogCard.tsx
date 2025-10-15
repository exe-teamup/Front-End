import { Clock, BookOpen } from 'lucide-react';
import { type Blog } from '../../mock/blog.mockapi';
import { toast } from 'sonner';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  function handleViewDetails() {
    toast.info('Trang xem chi tiết bài viết đang được phát triển!');
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={blog.imageUrl || 'images/placeholder.png'}
          alt={blog.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute top-3 left-3'>
          <span className='bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium'>
            {blog.category}
          </span>
        </div>
      </div>
      <div className='p-6'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-text-title mb-2 line-clamp-2'>
              {blog.title}
            </h3>
            <p className='text-sm text-text-subtitle line-clamp-2'>
              {blog.description}
            </p>
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-text-subtitle'>Tác giả:</span>
            <span className='text-sm font-medium text-text-title'>
              {blog.author || 'Không xác định'}
            </span>
          </div>

          <div className='flex items-center justify-between text-sm text-text-subtitle'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>{blog.readTime} phút đọc</span>
            </div>
            <div className='flex items-center gap-1'>
              <BookOpen className='w-4 h-4' />
              <span>
                {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        <button
          className='w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer'
          onClick={handleViewDetails}
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
}
