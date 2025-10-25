import { cn } from '@/lib/utils';

interface TeamAvatarsProps {
  avatars: string[]; // avatar image URLs
  maxVisible?: number; // how many avatars to show before collapsing into +N
  size?: number; // diameter in px
  className?: string;
}

export function TeamAvatars({
  avatars,
  maxVisible = 3,
  size = 40,
  className,
}: TeamAvatarsProps) {
  const visible = avatars.slice(0, maxVisible);
  const remaining = Math.max(0, avatars.length - maxVisible);
  const overlap = Math.round(size * 0.35);

  return (
    <div className={cn('flex items-center', className)}>
      <div className='flex items-center' style={{ marginLeft: -overlap }}>
        {visible.map((src, i) => (
          <div
            key={i}
            className='rounded-full border-2 border-white overflow-hidden bg-white'
            style={{
              width: size,
              height: size,
              marginLeft: i === 0 ? 0 : -overlap,
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}
          >
            {src ? (
              <img
                src={src}
                alt={`avatar ${i}`}
                className='w-full h-full object-cover'
              />
            ) : (
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                className='w-full h-full text-text-title'
                aria-hidden='true'
              >
                <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
            )}
          </div>
        ))}

        {remaining > 0 && (
          <div
            className='flex items-center justify-center rounded-full bg-white border-2 border-white text-text-title font-medium'
            style={{
              width: size,
              height: size,
              marginLeft: -overlap,
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}
          >
            +{remaining}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamAvatars;
