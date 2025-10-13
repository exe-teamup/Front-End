import { useState } from 'react';
import { getHotPosts } from '../../mock/post.mockapi';
import { PostCard } from '../ui/PostCard';
import { cn } from '../../utils/cn';

interface PostSectionProps {
  className?: string;
}

export function PostSection({ className }: PostSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allHotPosts = getHotPosts(10);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allHotPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allHotPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn('py-12', className)}>
      <div>
        <div className='text-start mb-8'>
          <h2 className='text-3xl font-bold text-text-title mb-2'>
            Nhóm nổi bật
          </h2>
          <p className='text-text-subtitle'>
            Các nhóm có nhiều lượt yêu cầu tham gia thời gian qua
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {posts.map(post => (
            <div key={post.id} className='relative'>
              {/* Ribbon */}
              <div className='absolute -top-2 -left-2 z-10'>
                <div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center gap-1 text-xs font-bold'>
                  <span className='text-yellow-300'>🔥</span>
                  <span>HOT TEAM</span>
                  <span className='bg-white/20 px-1 rounded text-xs'>
                    {post.requestCount}
                  </span>
                </div>
              </div>

              {/* Post Card */}
              <div className='transform'>
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-text-title hover:bg-gray-50 border border-gray-200'
              )}
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-title hover:bg-gray-50 border border-gray-200'
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-text-title hover:bg-gray-50 border border-gray-200'
              )}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
