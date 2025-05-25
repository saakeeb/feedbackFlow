import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx('card p-6', className)}>
      {children}
    </div>
  );
};

export default Card;

export const CardHeader = ({ children, className }: CardProps) => {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h3 className={clsx('text-xl font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className }: CardProps) => {
  return (
    <p className={clsx('text-sm text-gray-500 mt-1', className)}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }: CardProps) => {
  return (
    <div className={clsx('', className)}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }: CardProps) => {
  return (
    <div className={clsx('mt-6 pt-4 border-t border-gray-100', className)}>
      {children}
    </div>
  );
};