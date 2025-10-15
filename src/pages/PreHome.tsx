import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/Progress/StepProgress';

export function PreHome() {
  const navigate = useNavigate();

  function goCreateTeam() {
    navigate('/create-team');
  }
  function goChooseMajor() {
    navigate('/choose-major');
  }
  function handleSkip() {
    try {
      localStorage.setItem('onboardCompleted', '1');
    } catch {
      // Ignore storage errors
    }
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-5xl bg-white rounded-lg shadow-md p-10'>
        <StepProgress step={1} total={4} className='mb-6' />

        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold'>
            Chào mừng đến với <span className='text-primary'>EXE TEAM UP</span>
          </h1>
          <p className='text-gray-500 mt-2'>Bắt đầu tìm đồng đội cho mình</p>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='border rounded-lg p-6 flex flex-col items-center'>
            <div className='mb-4 p-4 rounded-full bg-orange-50'>
              <svg
                className='w-8 h-8 text-orange-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
              >
                <circle cx='12' cy='12' r='10' strokeWidth='1.5' />
              </svg>
            </div>
            <h3 className='font-semibold mb-2'>Lập nhóm mới</h3>
            <p className='text-sm text-gray-500 mb-4 text-center'>
              Tạo nhóm của riêng bạn và bắt đầu tuyển thành viên
            </p>
            <button
              onClick={goCreateTeam}
              className='mt-auto bg-primary text-white px-6 py-2 rounded-md'
            >
              Tạo nhóm
            </button>
          </div>

          <div className='border rounded-lg p-6 flex flex-col items-center'>
            <div className='mb-4 p-4 rounded-full bg-orange-50'>
              <svg
                className='w-8 h-8 text-orange-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
              >
                <path d='M21 21l-4.35-4.35' strokeWidth='1.5' />
              </svg>
            </div>
            <h3 className='font-semibold mb-2'>Tìm nhóm</h3>
            <p className='text-sm text-gray-500 mb-4 text-center'>
              Khám phá và tham gia các nhóm phù hợp với mục tiêu, sở thích
            </p>
            <button
              onClick={goChooseMajor}
              className='mt-auto bg-primary text-white px-6 py-2 rounded-md'
            >
              Tìm nhóm
            </button>
          </div>
        </div>

        <div className='mt-6 text-right'>
          <button onClick={handleSkip} className='text-sm text-gray-500'>
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreHome;
