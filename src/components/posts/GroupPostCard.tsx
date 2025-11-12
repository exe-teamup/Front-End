import { cn } from '@/lib/utils';
import { Clock, User } from 'lucide-react';
import { toast } from 'sonner';
import type { GroupPost } from '../../types/post';
import { formatDate } from '@/utils/formatDate';
import { useJoinRequest } from '@/hooks/usePostsQuery';
import { useStudentProfileStore } from '@/store/studentProfile';

interface GroupPostCardProps {
  post: GroupPost;
  showHotBadge?: boolean;
}

/**
 * GroupPostCard component for displaying group recruitment posts
 * Uses real API data from GroupPost type
 */
export function GroupPostCard({
  post,
  showHotBadge = false,
}: GroupPostCardProps) {
  const { profile } = useStudentProfileStore();
  const { mutateAsync: sendJoinRequest, isPending } = useJoinRequest();

  const handleApply = async () => {
    if (!profile?.userId) {
      toast.error('Vui lòng đăng nhập để ứng tuyển.');
      return;
    }

    if (!post.groupId) {
      toast.error('Không tìm thấy thông tin nhóm.');
      return;
    }

    try {
      await sendJoinRequest({
        studentId: Number(profile.userId),
        groupId: Number(post.groupId),
        requestType: 'STUDENT_REQUEST',
      });

      toast.success('Đã gửi yêu cầu tham gia nhóm!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Không thể gửi yêu cầu. Vui lòng thử lại.';
      toast.error(message);
    }
  };

  const handleViewDetails = () => {
    // TODO: Implement navigation to post details when route is ready
    toast.info('Trang xem chi tiết đang được phát triển!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <div className='flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
            <Clock className='w-3 h-3' />
            Đang tuyển
          </div>
        );
      case 'TRASHED':
        return (
          <div className='flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
            <Clock className='w-3 h-3' />
            Đã tạm ẩn
          </div>
        );
      case 'DELETED':
        return null; // Don't show deleted posts
      default:
        return null;
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      {/* Header with title and status */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex-1'>
          <h3 className='text-lg font-bold text-text-title mb-1 line-clamp-2'>
            {post.title}
          </h3>
          <div className='flex items-center gap-2 text-sm text-text-subtitle'>
            <User className='w-4 h-4' />
            <span>{post.authorName}</span>
          </div>
        </div>
        {getStatusBadge(post.postStatus)}
      </div>

      {/* Post detail/description */}
      {post.postDetail && (
        <p className='text-sm text-text-subtitle mb-4 line-clamp-3'>
          {post.postDetail}
        </p>
      )}

      {/* Required Majors */}
      {post.postMajors && post.postMajors.length > 0 && (
        <div className='mb-4'>
          <p className='text-sm text-text-subtitle mb-2'>Ngành cần tuyển:</p>
          <div className='flex flex-wrap gap-2'>
            {post.postMajors.map((major, index) => {
              let colorClass = 'bg-purple-100 text-purple-700';
              if (index % 3 === 0) {
                colorClass = 'bg-blue-100 text-blue-700';
              } else if (index % 3 === 1) {
                colorClass = 'bg-green-100 text-green-700';
              }

              return (
                <span
                  key={`${major.majorCode}-${index}`}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    colorClass
                  )}
                >
                  {major.majorCode} ({major.quantity})
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Posted time */}
      <div className='flex items-center gap-2 mb-4 text-sm text-text-subtitle'>
        <Clock className='w-4 h-4' />
        <span>{formatDate(post.createdAt)}</span>
      </div>

      {/* Hot badge if needed */}
      {showHotBadge && (
        <div className='mb-4'>
          <div className='inline-flex items-center gap-1 bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold'>
            <span className='text-yellow-300'>🔥</span>
            <span>HOT TEAM</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <button
          className='flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleApply}
          disabled={isPending}
        >
          {isPending ? 'Đang gửi...' : 'Ứng tuyển'}
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
