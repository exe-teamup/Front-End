import { User, Settings, FileText, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProfileSidebarProps {
  className?: string;
}

export function ProfileSidebar({ className }: ProfileSidebarProps) {
  return (
    <div className={cn('lg:col-span-1', className)}>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-28'>
        <h3 className='text-lg font-semibold text-text-title mb-4'>
          Tài khoản
        </h3>
        <nav className='space-y-2'>
          <a
            href='/profile/account'
            className='flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 hover:text-primary text-primary font-medium'
          >
            <User className='w-4 h-4' />
            Thông tin cá nhân
          </a>
          <a
            href='/profile/settings'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-text-subtitle hover:text-primary hover:bg-gray-50'
          >
            <Settings className='w-4 h-4' />
            Cài đặt
          </a>
          <a
            href='/profile/posts'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-text-subtitle hover:text-primary hover:bg-gray-50'
          >
            <FileText className='w-4 h-4' />
            Bài đăng của tôi
          </a>
          <a
            href='/profile/groups'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-text-subtitle hover:text-primary hover:bg-gray-50'
          >
            <Users className='w-4 h-4' />
            Nhóm của tôi
          </a>
          <a
            href='/'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:text-primary hover:bg-red-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Đăng xuất
          </a>
        </nav>
      </div>
    </div>
  );
}
