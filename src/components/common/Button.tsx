import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'type'
> {
  variant?: Variant;
  size?: 'sm' | 'md';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps): React.JSX.Element {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:pointer-events-none';
  const variants: Record<Variant, string> = {
    primary:
      'bg-accent text-white border-accent hover:bg-accent/90 shadow-sm hover:shadow-[0_0_12px_rgba(19,173,199,0.35)]',
    outline:
      'border border-line bg-card text-ink hover:border-accent hover:text-accent hover:bg-accent/5',
    ghost:
      'border border-transparent bg-transparent text-muted hover:text-accent hover:bg-accent/5',
  };
  const sizes: Record<'sm' | 'md', string> = {
    sm: 'min-h-9 min-w-9 px-3 text-xs',
    md: 'min-h-11 min-w-11 px-4 text-sm',
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
