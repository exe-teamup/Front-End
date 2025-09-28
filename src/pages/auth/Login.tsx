import { Button } from '../../components/Button/Button';

export function Login() {
  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4'
      style={{ backgroundImage: 'url(/images/bg-hcm-campus.svg)' }}
    >
      <div className='bg-white rounded-lg shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
        {/* Left Side - Student Login */}
        <div className='p-4 py-6 md:p-6 md:py-12 flex flex-col justify-center items-center'>
          <div className='mb-8'>
            <img
              src='/images/logo-fpt.png'
              alt='FPT University'
              className='h-24 w-auto'
            />
          </div>

          {/* Login Form */}
          <div className='space-y-4 w-full'>
            <div>
              <input
                id='email'
                type='email'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none'
                placeholder='Enter'
              />
            </div>

            <div>
              <input
                id='password'
                type='password'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none'
                placeholder='Password'
              />
            </div>

            <Button variant='primary' size='lg' className='w-full rounded-md'>
              Login
            </Button>

            <div className='text-center'>
              <button
                type='button'
                className='text-primary hover:underline text-sm cursor-pointer'
              >
                Lost Password?
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Teacher Login */}
        <div className='bg-gray-50 p-8 md:p-12 flex flex-col justify-center'>
          <div className='text-center space-y-6'>
            <p className='text-text-title mb-6'>Sign in with</p>

            <Button
              size='lg'
              className='w-full flex items-center justify-center gap-2 text-text-title hover:text-white rounded-md font-thin bg-transparent border border-border-primary'
            >
              <img
                src='/images/icon-google.svg'
                alt='Google'
                className='h-5 w-5'
              />
              @fpt.edu.vn (For lecturer only)
            </Button>
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
