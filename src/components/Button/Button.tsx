import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'blue'
    | 'green'
    | 'error'
    | 'danger'
    | 'outline'
    | 'ghost'
    | 'muted';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  icon,
  disabled = false,
  className,
  ...props
}) => {
  const baseClasses =
    'rounded transition-colors duration-200 cursor-pointer px-2';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/80',
    blue: 'bg-primary-blue hover:bg-primary-blue/80',
    green: 'bg-primary-green hover:bg-primary-green/80',
    error: 'bg-error hover:bg-error/80',
    danger: 'bg-danger hover:bg-danger/80',
    // White with border, used for neutral "Xem chi tiết"
    outline:
      'bg-white text-text-title border border-border-primary hover:bg-background-card',
    // Pale primary/peach background with primary text (e.g. soft highlighted action)
    ghost: 'bg-primary/10 text-primary hover:bg-primary/20',
    // Muted / disabled style (use with disabled=true)
    muted: 'bg-gray-300 text-text-subtitle cursor-default',
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const disabledClasses =
    'text-text-title cursor-default bg-gray-300 opacity-70 pointer-events-none';

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return (
    <div>
      <button
        onClick={disabled ? undefined : onClick}
        className={cn(
          baseClasses,
          sizeClasses[size],
          disabled ? disabledClasses : variantClasses[variant],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    </div>
  );
};
