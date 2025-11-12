import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/groups?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
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
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className='w-full bg-transparent outline-none placeholder:text-text-subtitle'
          />
        </div>
      </div>
    </form>
  );
}
