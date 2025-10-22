import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillSelectorProps {
  options: string[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export function SkillSelector({
  options,
  value = [],
  onChange,
  className,
}: SkillSelectorProps) {
  const [selected, setSelected] = useState<string[]>(value);

  function toggle(skill: string) {
    setSelected(prev => {
      const exists = prev.includes(skill);
      const next = exists ? prev.filter(s => s !== skill) : [...prev, skill];
      onChange?.(next);
      return next;
    });
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type='button'
            onClick={() => toggle(opt)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm border transition-colors duration-150 focus:outline-none',
              active
                ? 'bg-primary text-white border-primary shadow-[0_8px_20px_rgba(243,112,33,0.12)]'
                : 'bg-white text-text-title border-border-primary hover:shadow-sm'
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
