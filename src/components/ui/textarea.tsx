import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    helperText,
    error,
    fullWidth = false,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'px-4 py-2 bg-white dark:bg-gray-900 border rounded-md text-gray-900 dark:text-gray-100',
            'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-gray-300 dark:border-gray-700',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        
        {(helperText || error) && (
          <p 
            className={cn(
              'mt-1 text-sm',
              error ? 'text-error-500' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';