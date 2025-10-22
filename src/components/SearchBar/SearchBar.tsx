import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
        'w-full rounded-xl ring-1 ring-black/20 transition-all duration-200',
        focused
          ? 'ring-2 ring-primary shadow-[0_6px_20px_rgba(243,112,33,0.2)]'
          : 'bg-white',
        className
      )}
    >
      <div className='flex items-center px-4 py-2 gap-3'>
        <Search className='w-5 h-5 text-text-subtitle' />

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
