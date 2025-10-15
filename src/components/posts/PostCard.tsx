import type { PostItem } from '@/mock/posts.mockapi';
import { Users, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: PostItem;
}

export default function PostCard({ post }: PostCardProps) {
  const isRecruit = post.type === 'RECRUIT';
  const created = new Date(post.createdAt);
  const dateLabel = created.toLocaleString('vi-VN');

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
      {/* Header: author */}
      <div className='flex items-center gap-3 mb-3'>
        <Link to={`/exe/${post.authorId}`} className='shrink-0'>
          <img
            src={post.authorAvatar || '/images/avatar.jpg'}
            alt={post.authorName}
            className='w-9 h-9 rounded-full object-cover hover:opacity-90'
          />
        </Link>
        <div className='min-w-0'>
          <Link
            to={`/exe/${post.authorId}`}
            className='block text-sm font-medium text-gray-900 truncate hover:text-primary'
          >
            {post.authorName}
          </Link>
          <div className='flex items-center gap-2 text-[11px] text-gray-500'>
            <span className='px-1.5 py-0.5 rounded bg-gray-100 text-gray-700'>
              {isRecruit ? 'Tuyển người' : 'Tìm nhóm'}
            </span>
            <span>{dateLabel}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2 text-xs text-gray-500 mb-2'>
            <span className='px-2 py-0.5 rounded-full bg-primary/10 text-primary'>
              {post.major}
            </span>
            {isRecruit && post.groupName && (
              <Link
                to={`/groups/${post.groupId || ''}`}
                className='flex items-center gap-1 hover:text-primary'
              >
                <Users className='w-3 h-3' />
                {post.groupName}
              </Link>
            )}
          </div>
          <h3 className='font-semibold text-gray-900'>{post.title}</h3>
          <p className='text-sm text-gray-600 mt-1'>{post.description}</p>
        </div>
        {isRecruit && (
          <div className='flex flex-col items-end'>
            {typeof post.joinRequests === 'number' && (
              <span className='text-xs text-orange-600'>
                🔥 {post.joinRequests} yêu cầu
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
