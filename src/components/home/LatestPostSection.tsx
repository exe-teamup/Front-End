import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { GroupPost } from '../../types/post';
import { GroupPostCard } from '../posts/GroupPostCard';

interface LatestPostSectionProps {
  className?: string;
  posts: GroupPost[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

export function LatestPostSection({
  className,
  posts: allPosts,
  isLoading = false,
  isError = false,
  error,
}: LatestPostSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Paginate the latest posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn('py-12 bg-gray-50', className)}>
      <div>
        <div className='text-start mb-8'>
          <h2 className='text-3xl font-bold text-text-title mb-2'>
            Bài đăng tuyển gần nhất
          </h2>
          <p className='text-text-subtitle'>
            Khám phá các cơ hội tham gia nhóm mới nhất trong 3 ngày qua
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
            <p className='text-red-600 font-medium'>Không thể tải bài đăng</p>
            <p className='text-red-500 text-sm mt-1'>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && posts.length === 0 && (
          <div className='bg-white border border-gray-200 rounded-lg p-8 text-center'>
            <p className='text-gray-500'>Chưa có bài đăng nào</p>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {posts.map(post => (
              <GroupPostCard key={post.postId} post={post} />
            ))}
          </div>
        )}

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
