import { useState } from 'react';
import { cn } from '../../utils/cn';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = 'Tìm kiếm nhóm, chuyên ngành,...',
  className,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        'w-full rounded-full',
        focused
          ? 'ring-2 ring-primary shadow-[0_6px_20px_rgba(243,112,33,0.2)]'
          : 'bg-white',
        className
      )}
    >
      <div className='flex items-center px-4 py-2 gap-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='w-5 h-5 text-text-subtitle'
          aria-hidden='true'
        >
          <circle cx='11' cy='11' r='6' />
          <path d='M21 21l-4.35-4.35' />
        </svg>

        <input
          type='text'
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className='w-full bg-transparent outline-none placeholder:text-text-subtitle'
        />
      </div>
    </div>
  );
}
