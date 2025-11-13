import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../store/auth';
import { useStudentProfileStore } from '../../store/studentProfile';

export function Login() {
  const { signInWithGoogle, status, user, error, account } = useAuthStore();
  const { fetchProfile } = useStudentProfileStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string } | null;

  useEffect(() => {
    if (status === 'authenticated' && user && account) {
      if (account.role === 'STUDENT') {
        fetchProfile();
      }

      if (account.role === 'ADMIN') {
        navigate(ROUTES.ADMIN.ROOT, { replace: true });
      } else if (account.role === 'MODERATOR') {
        navigate(ROUTES.MODERATOR.ROOT, { replace: true });
      } else {
        navigate(ROUTES.HOME, { replace: true });
      }
    }
  }, [status, user, navigate, state, account, fetchProfile]);

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4'
      style={{ backgroundImage: 'url(/images/bg-hcm-campus.svg)' }}
    >
      <div className='bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden'>
        <div className='p-8 md:p-12 flex flex-col justify-center'>
          <div className='mb-8 text-center'>
            <img
              src='/images/logo-fpt.png'
              alt='FPT University'
              className='h-24 w-auto mx-auto'
            />
          </div>

          <div className='text-center space-y-6'>
            <p className='text-text-title mb-6'>Sign in with</p>

            <Button
              size='lg'
              className='w-full flex items-center justify-center gap-2 text-text-title hover:text-white rounded-md font-thin bg-transparent border border-border-primary'
              icon={
                <img
                  src='/images/icon-google.svg'
                  alt='Google'
                  className='h-5 w-5'
                />
              }
              onClick={signInWithGoogle}
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? 'Signing in...'
                : '@fpt.edu.vn (FPT provided)'}
            </Button>

            {error && (
              <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm'>
                Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.
              </div>
            )}
          </div>

          {/* Cookie Notice */}
          <div className='mt-12 pt-6 flex items-center justify-center cursor-pointer hover:underline'>
            <img
              src='/images/icon-confused.svg'
              alt='icon confused'
              className='w-5 h-5'
            />
            <p className='text-xs text-primary text-center'>Cookies notices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
