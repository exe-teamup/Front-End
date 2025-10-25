import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MajorSelectorProps {
  options: string[];
  value?: string;
  onChange?: (major: string) => void;
  className?: string;
}

export function MajorSelector({
  options,
  value,
  onChange,
  className,
}: MajorSelectorProps) {
  const [selected, setSelected] = useState<string | undefined>(value);

  function select(option: string) {
    setSelected(option);
    onChange?.(option);
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {options.map(opt => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type='button'
            onClick={() => select(opt)}
            className={cn(
              'w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition duration-150',
              active
                ? 'bg-primary text-white shadow-[0_8px_30px_rgba(243,112,33,0.18)]'
                : 'bg-white text-text-title border border-border-primary'
            )}
            aria-pressed={active}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
