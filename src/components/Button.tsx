interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
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
    primary: 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

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
