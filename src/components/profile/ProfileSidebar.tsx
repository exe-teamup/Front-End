import { User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSidebarProps {
  className?: string;
  active?: 'account' | 'settings' | 'posts' | 'groups';
  onChange?: (key: 'account' | 'settings' | 'posts' | 'groups') => void;
}

export function ProfileSidebar({
  className,
  active = 'account',
  onChange,
}: ProfileSidebarProps) {
  return (
    <div className={cn('lg:col-span-1', className)}>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-28'>
        <h3 className='text-lg font-semibold text-text-title mb-4'>
          Tài khoản
        </h3>
        <nav className='space-y-2'>
          <button
            type='button'
            onClick={() => onChange && onChange('account')}
            className={cn(
              'w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:text-primary',
              active === 'account'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-subtitle hover:bg-gray-50'
            )}
          >
            <User className='w-4 h-4' />
            Thông tin cá nhân
          </button>
          {/* <button
            type='button'
            onClick={() => onChange && onChange('settings')}
            className={cn(
              'w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:text-primary',
              active === 'settings'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-subtitle hover:bg-gray-50'
            )}
          >
            <Settings className='w-4 h-4' />
            Cài đặt
          </button> */}
          {/* <button
            type='button'
            onClick={() => onChange && onChange('posts')}
            className={cn(
              'w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:text-primary',
              active === 'posts'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-subtitle hover:bg-gray-50'
            )}
          >
            <FileText className='w-4 h-4' />
            Bài đăng của tôi
          </button> */}
          <button
            type='button'
            onClick={() => onChange && onChange('groups')}
            className={cn(
              'w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:text-primary',
              active === 'groups'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-subtitle hover:bg-gray-50'
            )}
          >
            <Users className='w-4 h-4' />
            Nhóm của tôi
          </button>
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
