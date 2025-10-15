interface GlobalLoaderProps {
  text?: string;
}

export default function GlobalLoader({
  text = 'Đang tải...',
}: GlobalLoaderProps) {
  return (
    <div className='fixed inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin' />
        <span className='text-sm text-gray-700'>{text}</span>
      </div>
    </div>
  );
}
