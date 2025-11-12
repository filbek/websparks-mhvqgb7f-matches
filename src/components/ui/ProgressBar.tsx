import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'green' | 'red' | 'yellow' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showValue = true,
  label
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-primary-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  };
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            {label}
          </span>
          {showValue && (
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              {value}{max === 100 ? '%' : `/${max}`}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-secondary-200 dark:bg-secondary-700 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
