interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <div
      className={[
        'inline-block rounded-full border-2 border-gray-300 border-t-primary animate-spin',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size }}
      aria-label='loading'
    />
  );
}
