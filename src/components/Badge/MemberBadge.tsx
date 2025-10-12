import { cn } from '../../utils/cn';

interface MemberBadgeProps {
  count: number;
  capacity?: number; // optional capacity like 6
  className?: string;
}

export function MemberBadge({ count, capacity, className }: MemberBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-white border border-border-primary text-text-title',
        className
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className='w-4 h-4'
        aria-hidden='true'
      >
        <path d='M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2' />
        <circle cx='12' cy='7' r='4' />
      </svg>

      <span>
        {count}
        {capacity ? `/${capacity} thành viên` : ' thành viên'}
      </span>
    </span>
  );
}
