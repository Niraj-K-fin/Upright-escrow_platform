import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
  animate?: boolean;
}

export const Card = ({
  className,
  children,
  hover = false,
  bordered = false,
  compact = false,
  animate = false,
  ...props
}: CardProps) => {
  const baseComponent = (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg overflow-hidden',
        hover && 'transition-shadow duration-200 hover:shadow-card-hover',
        bordered && 'border border-gray-200 dark:border-gray-700',
        !compact && 'p-6',
        compact && 'p-4',
        'shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {baseComponent}
      </motion.div>
    );
  }

  return baseComponent;
};

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mb-4', className)}
    {...props}
  />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-xl font-semibold text-gray-900 dark:text-white', className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
    {...props}
  />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('', className)}
    {...props}
  />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-4 flex items-center', className)}
    {...props}
  />
);