import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'default';
  className?: string;
}

const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'badge-primary',
    accent: 'badge-accent',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };

  return (
    <span className={clsx('badge', variantClasses[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;