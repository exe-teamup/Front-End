import { cn } from '../../utils/cn';

interface UsernameBadgeProps {
  name: string;
  active?: boolean;
  className?: string;
}

export function UsernameBadge({
  name,
  active = false,
  className,
}: UsernameBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-4 py-2 rounded-lg',
        active
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-white text-text-title',
        className
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={cn('w-6 h-6', active ? 'text-white' : 'text-text-title')}
        aria-hidden='true'
      >
        <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
        <circle cx='12' cy='7' r='4' />
      </svg>

      <span className='font-medium'>{name}</span>
    </div>
  );
}
