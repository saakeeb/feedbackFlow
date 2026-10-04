import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'paper';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff3e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b] disabled:opacity-40 disabled:pointer-events-none select-none';

    const variants = {
      primary:
        'bg-[#d8ff3e] text-[#0b0b0b] font-semibold hover:bg-[#cbf52b] active:bg-[#bee424] shadow-subtle',
      secondary:
        'bg-[#1b1b1b] border border-white/15 text-[#f5f3ee] hover:bg-[#242424] active:bg-[#2b2b2b]',
      outline:
        'border border-white/20 bg-transparent text-[#f5f3ee] hover:bg-white/5 active:bg-white/10',
      ghost:
        'bg-transparent text-[#f5f3ee]/80 hover:text-[#f5f3ee] hover:bg-white/5 active:bg-white/10',
      destructive:
        'bg-red-600/90 text-white hover:bg-red-600 active:bg-red-700',
      paper:
        'bg-[#111111] text-[#f5f3ee] hover:bg-[#222222] active:bg-[#000000]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-sm md:text-base gap-2.5 font-medium tracking-tight',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;