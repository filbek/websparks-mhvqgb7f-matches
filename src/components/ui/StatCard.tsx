import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: 'primary' | 'green' | 'red' | 'yellow' | 'blue' | 'purple';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  trend,
  trendValue
}) => {
  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20',
    green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    yellow: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
  };

  const trendIcons = {
    up: 'bi-arrow-up text-green-500',
    down: 'bi-arrow-down text-red-500',
    neutral: 'bi-dash text-secondary-500'
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {icon && (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                <i className={`${icon} text-lg`}></i>
              </div>
            )}
            <h3 className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
              {title}
            </h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
              {value}
            </span>
            {trend && trendValue && (
              <div className="flex items-center space-x-1">
                <i className={`${trendIcons[trend]} text-sm`}></i>
                <span className="text-sm text-secondary-500">
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-secondary-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
