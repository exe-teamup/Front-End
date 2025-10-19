import MyGroupsTab from '@/components/groups/MyGroupsTab';
import { Mail, Phone, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { useStudentProfileStore } from '../../store/studentProfile';
import { cn } from '../../utils/cn';

type TabKey = 'account' | 'settings' | 'posts' | 'groups';

export function AccountSetting() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('account');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });

  const { fetchProfile, profile, status, updateProfile } =
    useStudentProfileStore();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Sync form data with profile when it loads or changes
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      // Only send fields that can be updated
      await updateProfile({
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
      });
      setIsEditing(false);
      // TODO: Show success notification
    } catch {
      // TODO: Show error notification
      // Error is already handled in the store
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    // Reset form data to original profile values
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber || '',
        bio: profile.bio || '',
      });
    }
    setIsEditing(false);
  };

  // Show loading state
  if (status === 'loading') {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-text-subtitle'>Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (status === 'error' || !profile) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-red-500'>
            Không thể tải thông tin profile. Vui lòng thử lại.
          </div>
        </div>
      </div>
    );
  }

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
              {/* Contact Information */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold text-text-title'>
                    Thông tin liên hệ
                  </h2>
                  <button
                    onClick={
                      isEditing ? handleCancel : () => setIsEditing(true)
                    }
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
                        value={formData.fullName}
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
                          value={formData.email}
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

                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='phoneNumber'
                        className='block text-sm font-medium text-text-title mb-2'
                      >
                        Số điện thoại
                      </label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                          id='phoneNumber'
                          type='tel'
                          value={formData.phoneNumber}
                          onChange={e =>
                            handleInputChange('phoneNumber', e.target.value)
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
                    value={formData.bio}
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
