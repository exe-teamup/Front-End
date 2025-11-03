import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/post';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const {
    currentPost,
    currentPostStatus,
    currentPostError,
    fetchPostById,
    clearCurrentPost,
  } = usePostStore();

  useEffect(() => {
    if (postId) {
      fetchPostById(postId).catch(() => {
        toast.error('Không thể tải bài đăng');
      });
    }

    return () => {
      clearCurrentPost();
    };
  }, [postId, fetchPostById, clearCurrentPost]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = () => {
    toast.info('Chức năng ứng tuyển đang được phát triển!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <div className='flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium'>
            <Clock className='w-4 h-4' />
            Đang tuyển
          </div>
        );
      case 'TRASHED':
        return (
          <div className='flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium'>
            <Clock className='w-4 h-4' />
            Đã tạm ẩn
          </div>
        );
      default:
        return null;
    }
  };

  // Loading State
  if (currentPostStatus === 'loading') {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-32 mb-6' />
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
              <div className='h-8 bg-gray-200 rounded w-3/4 mb-4' />
              <div className='h-4 bg-gray-200 rounded w-1/4 mb-6' />
              <div className='space-y-3 mb-6'>
                <div className='h-4 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded w-5/6' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (currentPostStatus === 'error' || !currentPost) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <button
            onClick={handleBack}
            className='flex items-center gap-2 text-text-subtitle hover:text-text-title mb-6 transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Quay lại</span>
          </button>
          <div className='bg-red-50 border border-red-200 rounded-lg p-8 text-center'>
            <p className='text-red-600 font-medium text-lg mb-2'>
              Không thể tải bài đăng
            </p>
            <p className='text-red-500 text-sm'>{currentPostError}</p>
            <button
              onClick={() => navigate(ROUTES.POSTS.ROOT)}
              className='mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
            >
              Về trang danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Back Button */}
        <button
          onClick={handleBack}
          className='flex items-center gap-2 text-text-subtitle hover:text-text-title mb-6 transition-colors'
        >
          <ArrowLeft className='w-5 h-5' />
          <span>Quay lại</span>
        </button>

        {/* Post Detail Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
          {/* Header with status */}
          <div className='flex justify-between items-start mb-6'>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-text-title mb-4'>
                {currentPost.title}
              </h1>
              <div className='flex items-center gap-4 text-text-subtitle'>
                <div className='flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  <span className='font-medium'>{currentPost.authorName}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  <span>{formatDate(currentPost.createdAt)}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(currentPost.postStatus)}
          </div>

          {/* Post Type Badge */}
          {currentPost.postType && (
            <div className='mb-6'>
              <span
                className={cn(
                  'inline-block px-4 py-2 rounded-lg text-sm font-medium',
                  currentPost.postType === 'GROUP_POST'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                )}
              >
                {currentPost.postType === 'GROUP_POST'
                  ? '🎯 Nhóm tuyển người'
                  : '🔍 Tìm nhóm'}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className='border-t border-gray-200 my-6' />

          {/* Post Detail/Description */}
          {currentPost.postDetail && (
            <div className='mb-8'>
              <h2 className='text-xl font-semibold text-text-title mb-4'>
                Mô tả chi tiết
              </h2>
              <div className='prose prose-sm max-w-none text-text-subtitle whitespace-pre-wrap'>
                {currentPost.postDetail}
              </div>
            </div>
          )}

          {/* Required Majors */}
          {currentPost.postMajors && currentPost.postMajors.length > 0 && (
            <div className='mb-8'>
              <h2 className='text-xl font-semibold text-text-title mb-4'>
                Ngành cần tuyển
              </h2>
              <div className='flex flex-wrap gap-3'>
                {currentPost.postMajors.map((major, index) => {
                  let colorClass = 'bg-purple-100 text-purple-700';
                  if (index % 3 === 0) {
                    colorClass = 'bg-blue-100 text-blue-700';
                  } else if (index % 3 === 1) {
                    colorClass = 'bg-green-100 text-green-700';
                  }

                  return (
                    <div
                      key={`${major.majorCode}-${index}`}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium',
                        colorClass
                      )}
                    >
                      <div className='text-sm'>{major.majorCode}</div>
                      <div className='text-xs opacity-75'>
                        Số lượng: {major.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Group Info if available */}
          {currentPost.groupId && (
            <div className='mb-8 p-4 bg-gray-50 rounded-lg'>
              <h2 className='text-xl font-semibold text-text-title mb-2'>
                Thông tin nhóm
              </h2>
              <p className='text-text-subtitle'>
                Mã nhóm: {currentPost.groupId}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {currentPost.postStatus === 'ACTIVE' && (
            <div className='flex gap-4 pt-6 border-t border-gray-200'>
              <button
                onClick={handleApply}
                className='flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center cursor-pointer'
              >
                Ứng tuyển ngay
              </button>
              <button
                onClick={handleBack}
                className='flex-1 bg-gray-100 text-text-title py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center cursor-pointer'
              >
                Quay lại
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
