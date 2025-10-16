import { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Save,
  Plus,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { getUserProfile, type UserProfile } from '../../mock/user.mockapi';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { ProfilePhotoSection } from '../../components/profile/ProfilePhotoSection';
import { SkillsInterestsSection } from '../../components/profile/SkillsInterestsSection';
import MyGroupsTab from '@/components/groups/MyGroupsTab';

type TabKey = 'account' | 'settings' | 'posts' | 'groups';

export function AccountSetting() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile('user-1'));
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('account');

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setProfile(prev => ({ ...prev, skills }));
  };

  const handleInterestsChange = (interests: string[]) => {
    setProfile(prev => ({ ...prev, interests }));
  };

  const handleOtherSocialChange = (index: number, value: string) => {
    setProfile(prev => {
      const newOtherSocials = [...(prev.otherSocials || [])];
      newOtherSocials[index] = value;
      return {
        ...prev,
        otherSocials: newOtherSocials,
      };
    });
  };

  const handleAddOtherSocial = () => {
    setProfile(prev => {
      const currentSocials = prev.otherSocials || [];
      if (currentSocials.length < 4) {
        return {
          ...prev,
          otherSocials: [...currentSocials, ''],
        };
      }
      return prev;
    });
  };

  const handleRemoveOtherSocial = (index: number) => {
    setProfile(prev => {
      const newOtherSocials = [...(prev.otherSocials || [])];
      newOtherSocials.splice(index, 1);
      return {
        ...prev,
        otherSocials: newOtherSocials,
      };
    });
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-text-title mb-2'>
          Thông tin tài khoản
        </h1>
        <p className='text-text-subtitle'>
          Quản lý thông tin cá nhân và cài đặt tài khoản
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <ProfileSidebar active={activeTab} onChange={setActiveTab} />

        <div className='lg:col-span-2 space-y-6'>
          {activeTab === 'account' && (
            <div>
              <ProfilePhotoSection profile={profile} />

              {/* Contact Information */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold text-text-title'>
                    Thông tin liên hệ
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className='text-primary hover:text-primary/80 font-medium cursor-pointer'
                  >
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='fullName'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Họ và tên
                      </label>
                      <input
                        id='fullName'
                        type='text'
                        value={profile.fullName}
                        onChange={e =>
                          handleInputChange('fullName', e.target.value)
                        }
                        disabled={!isEditing}
                        className={cn(
                          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                          !isEditing && 'bg-gray-50 cursor-not-allowed'
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Email
                      </label>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='email'
                          type='email'
                          value={profile.email}
                          onChange={e =>
                            handleInputChange('email', e.target.value)
                          }
                          disabled={!isEditing}
                          className={cn(
                            'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                            !isEditing && 'bg-gray-50 cursor-not-allowed'
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='major'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Chuyên ngành
                      </label>
                      <input
                        id='major'
                        type='text'
                        value={profile.major}
                        onChange={e =>
                          handleInputChange('major', e.target.value)
                        }
                        disabled={!isEditing}
                        className={cn(
                          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                          !isEditing && 'bg-gray-50 cursor-not-allowed'
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Số điện thoại
                      </label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='phone'
                          type='tel'
                          value={profile.phone || ''}
                          onChange={e =>
                            handleInputChange('phone', e.target.value)
                          }
                          disabled={!isEditing}
                          className={cn(
                            'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                            !isEditing && 'bg-gray-50 cursor-not-allowed'
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <label
                    htmlFor='bio'
                    className='block text-sm font-medium text-text-title mb-2'
                  >
                    Giới thiệu bản thân
                  </label>
                  <textarea
                    id='bio'
                    value={profile.bio || ''}
                    onChange={e => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className={cn(
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none',
                      !isEditing && 'bg-gray-50 cursor-not-allowed'
                    )}
                    placeholder='Hãy giới thiệu về bản thân, sở thích và mục tiêu của bạn...'
                  />
                </div>

                <div className='mt-6'>
                  <h3 className='text-lg font-medium text-text-title mb-4'>
                    Liên kết mạng xã hội
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='website'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Website
                      </label>
                      <div className='relative'>
                        <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='website'
                          type='url'
                          value={profile.website || ''}
                          onChange={e =>
                            handleInputChange('website', e.target.value)
                          }
                          disabled={!isEditing}
                          className={cn(
                            'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                            !isEditing && 'bg-gray-50 cursor-not-allowed'
                          )}
                          placeholder='https://yourwebsite.com'
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='linkedin'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        LinkedIn
                      </label>
                      <div className='relative'>
                        <Linkedin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='linkedin'
                          type='url'
                          value={profile.linkedin || ''}
                          onChange={e =>
                            handleInputChange('linkedin', e.target.value)
                          }
                          disabled={!isEditing}
                          className={cn(
                            'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                            !isEditing && 'bg-gray-50 cursor-not-allowed'
                          )}
                          placeholder='https://linkedin.com/in/yourprofile'
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='github'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        GitHub
                      </label>
                      <div className='relative'>
                        <Github className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='github'
                          type='url'
                          value={profile.github || ''}
                          onChange={e =>
                            handleInputChange('github', e.target.value)
                          }
                          disabled={!isEditing}
                          className={cn(
                            'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary',
                            !isEditing && 'bg-gray-50 cursor-not-allowed'
                          )}
                          placeholder='https://github.com/yourusername'
                        />
                      </div>
                    </div>

                    {/* Other Social Links */}
                    <div className='col-span-2'>
                      <div className='flex items-center justify-between mb-4'>
                        <h4 className='text-lg font-medium text-text-title'>
                          Liên kết mạng xã hội khác
                        </h4>
                        {isEditing &&
                          (profile.otherSocials?.length || 0) < 4 && (
                            <button
                              onClick={handleAddOtherSocial}
                              className='flex items-center gap-2 px-3 py-1 text-primary hover:text-primary/80 text-sm font-medium cursor-pointer'
                            >
                              <Plus className='w-4 h-4' />
                              Thêm liên kết
                            </button>
                          )}
                      </div>

                      <div className='space-y-3'>
                        {profile.otherSocials?.map((social, index) => (
                          <div key={index} className='flex items-center gap-3'>
                            <div className='flex-1'>
                              <input
                                type='url'
                                value={social}
                                onChange={e =>
                                  handleOtherSocialChange(index, e.target.value)
                                }
                                disabled={!isEditing}
                                className={cn(
                                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm',
                                  !isEditing && 'bg-gray-50 cursor-not-allowed'
                                )}
                                placeholder='https://example.com/yourprofile'
                              />
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveOtherSocial(index)}
                                className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                              >
                                <X className='w-4 h-4' />
                              </button>
                            )}
                          </div>
                        ))}

                        {(!profile.otherSocials ||
                          profile.otherSocials.length === 0) && (
                          <div className='text-center py-8 text-text-subtitle'>
                            <Globe className='w-12 h-12 mx-auto mb-2 text-gray-300' />
                            <p>Chưa có liên kết mạng xã hội nào</p>
                            {isEditing && (
                              <button
                                onClick={handleAddOtherSocial}
                                className='mt-2 text-primary hover:text-primary/80 text-sm font-medium'
                              >
                                Thêm liên kết đầu tiên
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className='mt-6 flex justify-end'>
                    <button
                      onClick={handleSave}
                      className='flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer'
                    >
                      <Save className='w-4 h-4' />
                      Lưu thay đổi
                    </button>
                  </div>
                )}
                {/* Skills & Interests Section */}
                <SkillsInterestsSection
                  profile={profile}
                  isEditing={isEditing}
                  onSkillsChange={handleSkillsChange}
                  onInterestsChange={handleInterestsChange}
                />
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-text-title mb-4'>
                Cài đặt
              </h2>
              <p className='text-text-subtitle text-sm'>
                Trang cài đặt sẽ được phát triển.
              </p>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-text-title mb-4'>
                Bài đăng của tôi
              </h2>
              <p className='text-text-subtitle text-sm'>
                Danh sách bài đăng sẽ được phát triển.
              </p>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-0'>
              <MyGroupsTab />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
