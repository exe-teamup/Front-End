import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/Progress/StepProgress';

const DEFAULT_OPTIONS = [
  'Phát triển web',
  'Ứng dụng di động',
  'AI / Machine Learning',
  'Data / Analytics',
  'UI / UX',
  'Game Dev',
  'IoT',
  'Research',
];

export function ChooseInterests() {
  const navigate = useNavigate();
  const [options] = useState<string[]>(DEFAULT_OPTIONS);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const minRequired = 1;

  useEffect(() => {
    try {
      const raw = localStorage.getItem('preferredInterests');
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        const map: Record<string, boolean> = {};
        arr.forEach(s => (map[s] = true));
        setSelected(map);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const toggle = (opt: string) => {
    setSelected(prev => {
      const next = { ...prev, [opt]: !prev[opt] };
      if (!next[opt]) delete next[opt];
      return next;
    });
  };

  const chosen = Object.keys(selected).filter(k => selected[k]);
  const canContinue = chosen.length >= minRequired;

  function handleContinue() {
    try {
      localStorage.setItem('preferredInterests', JSON.stringify(chosen));
    } catch {
      // Ignore storage errors
    }
    navigate('/suggest-groups');
  }

  function handleSkip() {
    try {
      localStorage.setItem('preferredInterests', JSON.stringify([]));
      localStorage.setItem('onboardCompleted', '1');
    } catch {
      // Ignore storage errors
    }
    navigate('/');
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
      <div className='w-full max-w-5xl bg-white rounded-lg shadow p-10'>
        <StepProgress step={3} total={4} className='mb-6' />

        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>
            Sở thích / Mục tiêu dự án mong muốn
          </h1>
          <p className='text-gray-500 mt-2'>
            Chọn thể loại dự án bạn quan tâm (có thể chọn nhiều)
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {options.map(opt => {
            const active = !!selected[opt];
            return (
              <div
                key={opt}
                role='button'
                tabIndex={0}
                aria-pressed={active}
                onClick={() => toggle(opt)}
                onKeyDown={e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggle(opt);
                  }
                }}
                className={`flex items-center justify-center h-20 rounded-md border transition-shadow select-none cursor-pointer
                  ${active ? 'bg-orange-500 text-white shadow-lg border-orange-400' : 'bg-white text-gray-800 border-gray-200 hover:shadow-sm'}`}
              >
                <span className='text-lg font-medium'>{opt}</span>
              </div>
            );
          })}
        </div>

        <div className='mt-8 flex items-center justify-center gap-4'>
          <button onClick={handleSkip} className='px-6 py-2 rounded-md border'>
            Bỏ qua
          </button>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`px-6 py-2 rounded-md text-white ${canContinue ? 'bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseInterests;
