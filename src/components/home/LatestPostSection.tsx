import { useState } from 'react';
import { getNewestPosts } from '../../mock/post.mockapi';
import { PostCard } from '../ui/PostCard';
import { cn } from '../../utils/cn';

interface LatestPostSectionProps {
  className?: string;
}

export function LatestPostSection({ className }: LatestPostSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get 15 latest posts
  const recentPosts = getNewestPosts(15);

  // Paginate the recent posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = recentPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recentPosts.length / postsPerPage);

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

        {/* Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
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
