import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#9a9a95]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined
          }
          className={cn(
            'flex h-10 w-full rounded-md border border-white/15 bg-[#141414] px-3.5 py-2 text-sm text-[#f5f3ee] placeholder:text-[#9a9a95]/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8ff3e] focus-visible:border-[#d8ff3e] disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-rose-400 font-medium">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-desc`} className="text-xs text-[#9a9a95]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
