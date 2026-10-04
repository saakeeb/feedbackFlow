import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#9a9a95]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-desc` : undefined
          }
          className={cn(
            'flex w-full rounded-md border border-white/15 bg-[#141414] p-3 text-sm text-[#f5f3ee] placeholder:text-[#9a9a95]/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8ff3e] focus-visible:border-[#d8ff3e] disabled:cursor-not-allowed disabled:opacity-40 resize-y',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-rose-400 font-medium">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${textareaId}-desc`} className="text-xs text-[#9a9a95]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
