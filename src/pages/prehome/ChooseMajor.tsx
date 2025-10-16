import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepProgress from '@/components/Progress/StepProgress';
import { MajorSelector } from '@/components/Select/MajorSelector';
import { Button } from '@/components/Button';

export function ChooseMajor() {
  const navigate = useNavigate();
  const [major, setMajor] = useState<string | undefined>(undefined);

  function handleContinue() {
    try {
      localStorage.setItem('preferredMajor', major ?? '');
    } catch {
      // Ignore storage errors
    }
    try {
      localStorage.setItem('onboardCompleted', '1');
    } catch {
      // Ignore storage errors
    }
    navigate('/hot-setup/choose-interests');
  }

  function handleSkip() {
    try {
      localStorage.setItem('onboardCompleted', '3');
    } catch {
      // Ignore storage errors
    }
    navigate('/hot-setup/choose-interests');
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-3xl bg-white rounded-lg shadow-md p-8'>
        <StepProgress step={2} total={4} className='mb-6' />

        <h2 className='text-2xl font-bold text-center mb-2'>
          Chuyên ngành của bạn
        </h2>
        <p className='text-center text-gray-500 mb-6'>
          Cho chúng tôi biết ngành bạn học để có gợi ý phù hợp
        </p>

        <MajorSelector
          options={[
            'Công nghệ thông tin',
            'Kỹ thuật phần mềm',
            'Thiết kế',
            'Mạng',
            'AI/ML',
          ]}
          value={major}
          onChange={setMajor}
        />

        <div className='mt-6 flex justify-center gap-4'>
          <Button
            variant='outline'
            className='px-6 py-2 rounded-md border w-full'
            onClick={handleSkip}
          >
            Bỏ qua
          </Button>
          <Button
            variant='primary'
            className='px-6 py-2 rounded-md bg-primary text-white'
            onClick={handleContinue}
            disabled={!major}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChooseMajor;
