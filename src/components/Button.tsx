interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  disabled = false,
}) => {
  const baseClasses =
    'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-white focus:ring-primary',
    secondary:
      'bg-primary-blue hover:bg-primary-blue/90 text-white focus:ring-primary-blue',
    success:
      'bg-primary-green hover:bg-primary-green/90 text-white focus:ring-primary-green',
    danger: 'bg-error hover:bg-error/90 text-white focus:ring-error',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // console.log();

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
