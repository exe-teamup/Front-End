import { Clock, Users, MapPin, User, GraduationCap } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { type Post } from '../../mock/post.mockapi';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // const navigate = useNavigate();

  function handleApplied() {
    // TODO: Implement apply logic - open application modal or navigate to post details
    toast.info('Chức năng ứng tuyển đang được phát triển!');
  }

  function handleViewDetails() {
    // navigate(`/posts/${post.id}`);
    toast.info('Trang xem chi tiết đang được phát triển!');
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return (
          <div className='flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
            <Clock className='w-3 h-3' />
            Đang tuyển
          </div>
        );
      case 'FULL':
        return (
          <div className='flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
            <Users className='w-3 h-3' />
            Đủ thành viên
          </div>
        );
      case 'CLOSED':
        return (
          <div className='flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
            <Clock className='w-3 h-3' />
            Đã đóng
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-lg font-bold text-text-title mb-1'>
            {post.title}
          </h3>
          <p className='text-sm text-text-subtitle'>
            Trưởng nhóm: {post.groupLeader}
          </p>
        </div>
        {getStatusBadge(post.status)}
      </div>
      <p className='text-sm text-text-subtitle mb-4 line-clamp-2'>
        {post.description}
      </p>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Users className='w-4 h-4 text-text-subtitle' />
          <span className='text-sm text-text-subtitle'>
            {post.currentMembers}/{post.maxMembers} thành viên
          </span>
        </div>
        <div className='flex -space-x-2'>
          {Array.from({ length: Math.min(post.currentMembers, 3) }).map(
            (_, index) => (
              <div
                key={index}
                className='w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium'
              >
                {String.fromCharCode(65 + index)}
              </div>
            )
          )}
          {post.currentMembers > 3 && (
            <div className='w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium'>
              +{post.currentMembers - 3}
            </div>
          )}
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex items-center gap-2 mb-2'>
          <MapPin className='w-4 h-4 text-text-subtitle' />
          <span className='text-sm text-text-subtitle'>Ngành cần tuyển</span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {post.requiredMajors.map((major, index) => (
            <span
              key={index}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                index % 2 === 0
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              )}
            >
              {major}
            </span>
          ))}
        </div>
      </div>
      <div className='mb-4 space-y-1'>
        <div className='flex items-center gap-2'>
          <User className='w-4 h-4 text-text-subtitle' />
          <span className='text-sm text-text-subtitle'>
            Giảng viên hướng dẫn:{' '}
            <span className='text-text-title'>{post.instructor}</span>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <GraduationCap className='w-4 h-4 text-text-subtitle' />
          <span className='text-sm text-text-subtitle'>
            Số ngành hiện có:{' '}
            <span className='text-text-title'>{post.currentMajors} ngành</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <button
          className='flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer'
          onClick={handleApplied}
        >
          Ứng tuyển
        </button>
        <button
          className='flex-1 bg-gray-100 text-text-title py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer'
          onClick={handleViewDetails}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
