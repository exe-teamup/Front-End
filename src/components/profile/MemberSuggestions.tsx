import { User, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOCK_MEMBERS,
  type MemberSuggestionsProps,
} from '../../mock/user.mockapi';
import { Link } from 'react-router-dom';

export function MemberSuggestions({
  major,
  currentUserId,
  className,
}: MemberSuggestionsProps) {
  const suggestedMembers = MOCK_MEMBERS.filter(
    member => member.id !== currentUserId
  ).slice(0, 5);

  return (
    <div className={cn('space-y-6', className)}>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-2 w-full flex'>
        <Link
          to='/posts'
          className='w-full bg-primary text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors'
        >
          Xem tất cả bài đăng tuyển
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-text-title mb-4'>
          Cùng chuyên ngành {major}
        </h3>
        <div className='space-y-4'>
          {suggestedMembers.map(member => (
            <div key={member.id} className='flex items-start gap-3'>
              <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0'>
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <User className='w-6 h-6 text-gray-400' />
                )}
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-1 mb-1'>
                  <h4 className='font-medium text-text-title truncate'>
                    {member.name}
                  </h4>
                  {member.isVerified && (
                    <div className='w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
                      <span className='text-white text-xs'>✓</span>
                    </div>
                  )}
                </div>
                <p className='text-sm text-text-subtitle mb-2 line-clamp-2'>
                  {member.major}
                </p>

                <div className='mb-2'>
                  {member.status === 'LOOKING_FOR_GROUP' ? (
                    <span className='bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full'>
                      🔍 Đang tìm nhóm
                    </span>
                  ) : (
                    <span className='bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full'>
                      ✅ Đã có nhóm: {member.groupName}
                    </span>
                  )}
                </div>

                {/* in real, go to exe/username */}
                <Link
                  className='flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium cursor-pointer'
                  to={`/exe/${member.id}`}
                >
                  <Eye className='w-4 h-4' />
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-4 border-t border-gray-200'>
          <button className='w-full text-center text-primary hover:text-primary/80 text-sm font-medium cursor-pointer'>
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
