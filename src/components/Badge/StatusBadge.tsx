import { cn } from '../../utils/cn';

type Status = 'incomplete' | 'recruiting' | 'done';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const map = {
    incomplete: 'bg-yellow-300 text-black',
    recruiting: 'bg-primary-blue text-white',
    done: 'bg-primary-green text-white',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
        map[status],
        className
      )}
    >
      {/* optional icon could be added here */}
      {status === 'incomplete' && 'Chưa hoàn thiện'}
      {status === 'recruiting' && 'Đang tuyển'}
      {status === 'done' && 'Hoàn tất'}
    </span>
  );
}
