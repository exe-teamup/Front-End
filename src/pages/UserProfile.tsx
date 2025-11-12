import { useParams } from 'react-router-dom';
import { User, Mail, FileText, Phone } from 'lucide-react';
import { useGetUserById } from '../hooks/api/useUsersApi';
import type { UserPublicProfile } from '../types/user';
import { MemberSuggestions } from '../components/profile/MemberSuggestions';
import {
  getUserActivities,
  getRandomCoverImage,
  getRandomAvatar,
  type UserActivity,
} from '../mock/user.mockapi';

export function UserProfile() {
  const { username } = useParams<{ username: string }>();

  // username is actually userId in the URL (e.g., /exe/3)
  const userId = username || '';

  const { data: profile, isLoading, isError } = useGetUserById(userId);

  const activities: UserActivity[] = userId ? getUserActivities(userId, 5) : [];

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-text-subtitle'>Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-red-500'>
            Không thể tải thông tin người dùng. Vui lòng thử lại.
          </div>
        </div>
      </div>
    );
  }

  const typedProfile = profile as UserPublicProfile;

  const coverImage = getRandomCoverImage(userId);
  const avatar = getRandomAvatar(userId);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='h-48 relative'>
              <img
                src={coverImage}
                alt='Cover'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='p-6 -mt-16 relative'>
              <div className='flex items-start gap-6'>
                <div className='w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden'>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt='Avatar'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <User className='w-16 h-16 text-gray-400' />
                  )}
                </div>

                {/* User Info */}
                <div className='flex-1 pt-16'>
                  <div className='flex items-center gap-2 mb-2'>
                    <h1 className='text-2xl font-bold text-text-title'>
                      {typedProfile.fullName}
                    </h1>
                    {typedProfile.isLeader && (
                      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                  </div>

                  <p className='text-text-subtitle mb-2'>
                    {typedProfile.majorName} • {typedProfile.userCode}
                  </p>

                  <div className='mb-4'>
                    {typedProfile.groupId ? (
                      <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                        ✅ Đã có nhóm: {typedProfile.groupName}
                      </span>
                    ) : (
                      <span className='bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium'>
                        🔍 Đang tìm nhóm
                      </span>
                    )}
                  </div>

                  {typedProfile.bio && (
                    <p className='text-text-subtitle mb-4'>
                      {typedProfile.bio}
                    </p>
                  )}

                  {/* Stats */}
                  <div className='flex gap-6 text-sm text-text-subtitle'>
                    <div className='flex items-center gap-1'>
                      <FileText className='w-4 h-4' />
                      <span>0 bài đăng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Interests & Contact */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h2 className='text-xl font-semibold text-text-title mb-4'>
              Kỹ năng & Sở thích
            </h2>

            {/* Skills - Empty for now since API doesn't provide */}
            <div className='mb-6'>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Kỹ năng
              </h3>
              <div className='flex flex-wrap gap-2'>
                <span className='text-text-subtitle text-sm'>
                  Chưa có thông tin kỹ năng
                </span>
              </div>
            </div>

            {/* Interests - Empty for now since API doesn't provide */}
            <div>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Sở thích
              </h3>
              <div className='flex flex-wrap gap-2'>
                <span className='text-text-subtitle text-sm'>
                  Chưa có thông tin sở thích
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className='mt-6'>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Thông tin liên hệ
              </h3>
              <div className='space-y-2'>
                {typedProfile.email && (
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-gray-400' />
                    <span className='text-text-title'>
                      {typedProfile.email}
                    </span>
                  </div>
                )}

                {typedProfile.phoneNumber && (
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-gray-400' />
                    <span className='text-text-title'>
                      {typedProfile.phoneNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Group Info (if has group) - Moved below contact info */}
            {typedProfile.groupId && (
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <h3 className='text-lg font-medium text-text-title mb-3'>
                  Thông tin nhóm
                </h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-text-subtitle'>Tên nhóm:</span>
                    <span className='text-text-title font-medium'>
                      {typedProfile.groupName}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-text-subtitle'>Vai trò:</span>
                    <span className='text-text-title font-medium'>
                      {typedProfile.isLeader ? 'Nhóm trưởng' : 'Thành viên'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h2 className='text-xl font-semibold text-text-title mb-4'>
              Hoạt động gần đây
            </h2>
            {activities.length > 0 ? (
              <div className='space-y-4'>
                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='w-2 h-2 bg-primary rounded-full mt-2'></div>
                    <div className='flex-1'>
                      <p className='font-medium text-text-title'>
                        {activity.title}
                      </p>
                      <p className='text-sm text-text-subtitle'>
                        {activity.description}
                      </p>
                      <p className='text-xs text-text-subtitle mt-1'>
                        {new Date(activity.createdAt).toLocaleDateString(
                          'vi-VN'
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-text-subtitle'>Chưa có hoạt động nào</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='lg:col-span-1'>
          <MemberSuggestions
            major={typedProfile.majorName}
            currentUserId={userId}
          />
        </div>
      </div>
    </div>
  );
}
