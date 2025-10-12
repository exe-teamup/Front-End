import { User, Camera } from 'lucide-react';
import { type UserProfile } from '../../mock/user.mockapi';

interface ProfilePhotoSectionProps {
  profile: UserProfile;
  onPhotoChange?: (file: File) => void;
}

export function ProfilePhotoSection({ profile }: ProfilePhotoSectionProps) {
  const handleUpdateAvatar = () => {
    // TODO: Implement avatar update functionality
    alert('Đợi tí nhé! Chức năng này đang được phát triển.');
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-text-title mb-4'>
        Ảnh đại diện
      </h2>
      <div className='flex items-start gap-6'>
        <div className='relative'>
          <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden'>
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt='Avatar'
                className='w-full h-full object-cover'
              />
            ) : (
              <User className='w-12 h-12 text-gray-400' />
            )}
          </div>
          <button
            className='absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer'
            onClick={handleUpdateAvatar}
          >
            <Camera className='w-4 h-4' />
          </button>
        </div>
        <div className='flex-1'>
          <p className='text-sm text-text-subtitle mb-2'>
            Thêm ảnh đại diện để mọi người nhận ra bạn dễ dàng hơn
          </p>
          <button
            className='text-primary hover:text-primary/80 text-sm font-medium cursor-pointer'
            onClick={handleUpdateAvatar}
          >
            Thay đổi ảnh đại diện
          </button>
        </div>
      </div>
    </div>
  );
}
