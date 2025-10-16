interface StepProgressProps {
  step: number;
  total?: number;
  className?: string;
}

export default function StepProgress({
  step,
  total = 4,
  className = '',
}: StepProgressProps) {
  const pct = Math.max(0, Math.min(100, Math.round((step / total) * 100)));
  return (
    <div className={`w-full ${className}`}>
      <div className='flex items-center justify-between text-sm text-gray-500 mb-2'>
        <div>
          Bước {step} / {total}
        </div>
        <button
          className='text-sm text-black hover:text-primary cursor-pointer'
          onClick={() => (window.location.href = '/')}
        >
          Bỏ qua
        </button>
      </div>

      <div className='w-full h-3 bg-orange-100 rounded-full overflow-hidden'>
        <div
          aria-hidden
          className='h-full bg-orange-500 transition-all duration-300'
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
