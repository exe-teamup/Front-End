import { useNavigate } from 'react-router-dom';
import StepProgress from '../../components/Progress/StepProgress';
import { Button } from '@/components/Button';
import { Search } from 'lucide-react';

export function PreHome() {
  const navigate = useNavigate();

  function goCreateTeam() {
    setTimeout(() => {
      navigate('/posts/create-post');
    }, 1000);
  }
  function goChooseMajor() {
    navigate('/hot-setup/choose-major');
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-5xl bg-white rounded-lg shadow-md p-10'>
        <StepProgress step={1} total={4} className='mb-6' />

        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold'>
            Chào mừng đến với <span className='text-primary'>EXE TEAM UP</span>
          </h1>
          <p className='text-gray-800 mt-2 text-lg md:text-xl'>
            Bắt đầu tìm đồng đội cho mình
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='border rounded-lg p-6 flex flex-col items-center'>
            <div className='mb-4 w-20 h-20'>
              <img
                src='/images/home/create_team.svg'
                alt='icon'
                className='w-full h-full'
              />
            </div>
            <h3 className='font-semibold mb-2'>Lập nhóm mới</h3>
            <p className='text-sm text-gray-500 mb-4 text-center'>
              Tạo nhóm của riêng bạn và bắt đầu tuyển thành viên
            </p>
            <Button
              variant='primary'
              onClick={goCreateTeam}
              className='mt-auto bg-primary text-white px-6 py-2 rounded-md'
            >
              Tạo nhóm
            </Button>
          </div>

          <div className='border rounded-lg p-6 flex flex-col items-center'>
            <div className='mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-orange-50'>
              <Search className='w-8 h-8' />
            </div>
            <h3 className='font-semibold mb-2'>Tìm nhóm</h3>
            <p className='text-sm text-gray-500 mb-4 text-center'>
              Khám phá và tham gia các nhóm phù hợp với mục tiêu, sở thích
            </p>
            <Button
              variant='primary'
              onClick={goChooseMajor}
              className='mt-auto bg-primary text-white px-6 py-2 rounded-md'
            >
              Tìm nhóm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreHome;
