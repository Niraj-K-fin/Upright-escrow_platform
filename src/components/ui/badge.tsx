import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  className,
  children,
}: BadgeProps) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-500',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-500',
    error: 'bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-500',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export function getStatusBadgeProps(status: string) {
  switch (status) {
    case 'pending_confirmation':
      return { variant: 'warning' as BadgeVariant, label: 'Pending Confirmation' };
    case 'confirmed':
      return { variant: 'primary' as BadgeVariant, label: 'Confirmed' };
    case 'in_delivery':
      return { variant: 'secondary' as BadgeVariant, label: 'In Delivery' };
    case 'completed':
      return { variant: 'success' as BadgeVariant, label: 'Completed' };
    case 'cancelled':
      return { variant: 'error' as BadgeVariant, label: 'Cancelled' };
    default:
      return { variant: 'default' as BadgeVariant, label: status };
  }
}