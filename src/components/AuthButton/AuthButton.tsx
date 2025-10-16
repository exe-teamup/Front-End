import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../store/auth';
import { Button } from '../Button/Button';
import { IconBell, IconUser } from '../Icon/icons';

export function AuthButton() {
  const { status, user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

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
        <button
          aria-label='notifications'
          className='relative text-text-title cursor-pointer hover:text-primary transition-colors'
        >
          <IconBell className='h-6 w-6' />
          <span className='absolute -top-1 -right-2 bg-error text-white text-xs rounded-full px-1'>
            2
          </span>
        </button>

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
