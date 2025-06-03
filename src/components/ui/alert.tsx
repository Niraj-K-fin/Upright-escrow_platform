import { cn } from '../../utils/cn';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const variants = {
  info: {
    container: 'bg-primary-50 border-primary-200 dark:bg-primary-900/30 dark:border-primary-800',
    icon: <Info className="h-5 w-5 text-primary-500" />,
    title: 'text-primary-800 dark:text-primary-300',
    content: 'text-primary-700 dark:text-primary-200',
  },
  success: {
    container: 'bg-success-50 border-success-200 dark:bg-success-900/30 dark:border-success-800',
    icon: <CheckCircle className="h-5 w-5 text-success-500" />,
    title: 'text-success-800 dark:text-success-300',
    content: 'text-success-700 dark:text-success-200',
  },
  warning: {
    container: 'bg-warning-50 border-warning-200 dark:bg-warning-900/30 dark:border-warning-800',
    icon: <AlertCircle className="h-5 w-5 text-warning-500" />,
    title: 'text-warning-800 dark:text-warning-300',
    content: 'text-warning-700 dark:text-warning-200',
  },
  error: {
    container: 'bg-error-50 border-error-200 dark:bg-error-900/30 dark:border-error-800',
    icon: <XCircle className="h-5 w-5 text-error-500" />,
    title: 'text-error-800 dark:text-error-300',
    content: 'text-error-700 dark:text-error-200',
  },
} as const;

export const Alert = ({
  variant = 'info',
  title,
  children,
  className,
  icon,
}: AlertProps) => {
  const variantStyles = variants[variant];

  return (
    <div
      className={cn(
        'flex p-4 border rounded-md',
        variantStyles.container,
        className
      )}
      role="alert"
    >
      {icon || variantStyles.icon ? (
        <div className="flex-shrink-0 mr-3">
          {icon || variantStyles.icon}
        </div>
      ) : null}
      
      <div>
        {title && (
          <h3 className={cn('text-sm font-medium mb-1', variantStyles.title)}>
            {title}
          </h3>
        )}
        <div className={cn('text-sm', variantStyles.content)}>
          {children}
        </div>
      </div>
    </div>
  );
};