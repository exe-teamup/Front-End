import { useGetMyNotifications } from '@/hooks/api/useNotificationsApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../store/auth';
import { Button } from '../Button/Button';
import { IconBell, IconUser } from '../Icon/icons';
import { NotificationDropdown } from '../notifications/NotificationDropdown';

export function AuthButton() {
  const { status, user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data: notifications = [] } = useGetMyNotifications();

  const handleSignIn = () => {
    navigate(ROUTES.AUTH.ROOT);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  // Calculate unread count
  const notificationsArray = Array.isArray(notifications) ? notifications : [];
  const unreadCount = notificationsArray.filter(
    (n: { checked: boolean }) => !n.checked
  ).length;

  // Show loading state
  if (status === 'loading') {
    return (
      <Button variant='primary' size='md' disabled>
        Loading...
      </Button>
    );
  }

  // Show sign out button when authenticated
  if (user && status !== 'unauthenticated') {
    return (
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <button
            type='button'
            aria-label='notifications'
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className='relative text-text-title cursor-pointer hover:text-primary transition-colors'
          >
            <IconBell className='h-6 w-6' />
            {unreadCount > 0 && (
              <span className='absolute -top-1 -right-2 bg-error text-white text-xs rounded-full px-1.5 min-w-[20px] text-center'>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>

        {/* User Dropdown */}
        <div className='relative group'>
          <button
            aria-label='user menu'
            className='flex items-center gap-2 text-text-title cursor-pointer hover:text-primary transition-colors'
          >
            <IconUser className='h-6 w-6' />
          </button>

          {/* Dropdown Menu */}
          <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
            <div className='py-2'>
              <button
                onClick={() => navigate('/profile')}
                className='w-full px-4 py-2 cursor-pointer text-left text-sm text-text-title hover:bg-gray-50 hover:text-primary transition-colors'
              >
                Tài khoản
              </button>
              <button
                onClick={() => navigate('/groups/my')}
                className='w-full px-4 py-2 cursor-pointer text-left text-sm text-text-title hover:bg-gray-50 hover:text-primary transition-colors'
              >
                Nhóm của tôi
              </button>
              <div className='border-t border-gray-200 my-1'></div>
              <button
                onClick={handleSignOut}
                className='w-full px-4 py-2 cursor-pointer text-left text-sm text-error hover:bg-gray-50 transition-colors'
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show sign in button when unauthenticated
  return (
    <Button
      variant='primary'
      size='md'
      onClick={handleSignIn}
      className='text-white'
    >
      Đăng nhập
    </Button>
  );
}
