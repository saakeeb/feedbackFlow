import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline' | 'paper';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-[#f5f3ee] border border-white/15',
    secondary: 'bg-[#1b1b1b] text-[#9a9a95] border border-white/10',
    accent: 'bg-[#d8ff3e] text-[#0b0b0b] font-semibold border border-[#d8ff3e]',
    success: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
    outline: 'border border-white/20 text-[#f5f3ee] bg-transparent',
    paper: 'border border-black/15 bg-black/5 text-[#111111]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;