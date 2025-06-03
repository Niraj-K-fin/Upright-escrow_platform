import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkTo?: string;
}

export const Logo = ({ size = 'md', className, linkTo = '/' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };
  
  const content = (
    <>
      <BarChart3 size={iconSizes[size]} className="text-primary-600 mr-2" />
      <span className={cn(
        'font-bold text-gray-900 dark:text-white', 
        sizeClasses[size]
      )}>
        <span className="text-primary-700 dark:text-primary-400">Up</span>right
      </span>
    </>
  );
  
  if (linkTo) {
    return (
      <Link 
        to={linkTo} 
        className={cn(
          'flex items-center transition-opacity hover:opacity-90', 
          className
        )}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <div className={cn('flex items-center', className)}>
      {content}
    </div>
  );
};