import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../store/auth';
import { Button } from '../Button/Button';

export function AuthButton() {
  const { status, user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Don't show button while loading initial auth state
  if (status === 'idle') {
    return null;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <Button variant='primary' size='md' disabled>
        Loading...
      </Button>
    );
  }

  // Show sign out button when authenticated
  if (status === 'authenticated' && user) {
    return (
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className='h-8 w-8 rounded-full'
            />
          )}
          <span className='text-sm text-gray-700 hidden md:block'>
            {user.displayName || user.email}
          </span>
        </div>
        <Button variant='error' size='md' onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  // Show sign in button when unauthenticated
  return (
    <Button variant='primary' size='md' onClick={handleSignIn}>
      Sign In
    </Button>
  );
}
