import { useParams } from 'react-router-dom';
import { User, Mail, FileText, Github, Linkedin, Globe } from 'lucide-react';
import {
  getUserProfile,
  getUserStats,
  getUserActivities,
  type UserProfile,
  type UserStats,
} from '../mock/user.mockapi';
import { MemberSuggestions } from '../components/profile/MemberSuggestions';

export function UserProfile() {
  const { username } = useParams<{ username: string }>();

  // Mock: Get user profile by username (in real app, this would be an API call)
  const profile: UserProfile = getUserProfile(username || 'user-1');
  const stats: UserStats = getUserStats(username || 'user-1');
  const activities = getUserActivities(username || 'user-1', 5);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='h-48 relative'>
              <img
                src={profile.coverImage || '/images/cover/cover-profile1.jpg'}
                alt='Cover'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='p-6 -mt-16 relative'>
              <div className='flex items-start gap-6'>
                <div className='w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden'>
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
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
                      {profile.fullName}
                    </h1>
                    {profile.isVerified && (
                      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                  </div>

                  <p className='text-text-subtitle mb-2'>
                    {profile.major} • {profile.university}
                  </p>
                  <p className='text-text-subtitle mb-4'>{profile.location}</p>

                  <div className='mb-4'>
                    {profile.status === 'LOOKING_FOR_GROUP' ? (
                      <span className='bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium'>
                        🔍 Đang tìm nhóm
                      </span>
                    ) : (
                      <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                        ✅ Đã có nhóm: {profile.groupName}
                      </span>
                    )}
                  </div>

                  {profile.bio && (
                    <p className='text-text-subtitle mb-4'>{profile.bio}</p>
                  )}

                  {/* Stats */}
                  <div className='flex gap-6 text-sm text-text-subtitle'>
                    <div className='flex items-center gap-1'>
                      <FileText className='w-4 h-4' />
                      <span>{stats.postsCount} bài đăng</span>
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

            {/* Skills */}
            <div className='mb-6'>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Kỹ năng
              </h3>
              <div className='flex flex-wrap gap-2'>
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Sở thích
              </h3>
              <div className='flex flex-wrap gap-2'>
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className='bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm'
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className='mt-6'>
              <h3 className='text-lg font-medium text-text-title mb-3'>
                Thông tin liên hệ
              </h3>
              <div className='space-y-2'>
                {profile.email && (
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-gray-400' />
                    <span className='text-text-title'>{profile.email}</span>
                  </div>
                )}
                {profile.website && (
                  <div className='flex items-center gap-2'>
                    <Globe className='w-4 h-4 text-gray-400' />
                    <a
                      href={profile.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-black hover:text-primary text-sm'
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
                {profile.linkedin && (
                  <div className='flex items-center gap-2'>
                    <Linkedin className='w-4 h-4 text-gray-400' />
                    <a
                      href={profile.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-black hover:text-primary text-sm'
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {profile.github && (
                  <div className='flex items-center gap-2'>
                    <Github className='w-4 h-4 text-gray-400' />
                    <a
                      href={profile.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-black hover:text-primary text-sm'
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
                {profile.otherSocials && profile.otherSocials.length > 0 && (
                  <div className='flex items-center gap-2'>
                    <Globe className='w-4 h-4 text-gray-400' />
                    <div className='flex flex-wrap gap-2'>
                      {profile.otherSocials.map((social, index) => (
                        <a
                          key={index}
                          href={social}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary hover:text-primary/80 text-sm'
                        >
                          Social Link {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h2 className='text-xl font-semibold text-text-title mb-4'>
              Hoạt động gần đây
            </h2>
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
                      {new Date(activity.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='lg:col-span-1'>
          <MemberSuggestions major={profile.major} currentUserId={profile.id} />
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-text-title mb-4'>
              Cùng chuyên ngành {profile.major}
            </h3>
            <p className='text-text-subtitle'>
              Member suggestions sẽ được thêm vào đây
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
