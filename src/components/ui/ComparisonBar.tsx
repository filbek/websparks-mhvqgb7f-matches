import React from 'react';

interface ComparisonBarProps {
  homeValue: number;
  awayValue: number;
  homeLabel: string;
  awayLabel: string;
  title: string;
  format?: 'number' | 'percentage';
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  homeValue,
  awayValue,
  homeLabel,
  awayLabel,
  title,
  format = 'number'
}) => {
  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;

  const formatValue = (value: number) => {
    if (format === 'percentage') {
      return `${value}%`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 text-center">
        {title}
      </h4>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-secondary-900 dark:text-white">
            {homeLabel}
          </span>
          <span className="text-primary-600 font-bold">
            {formatValue(homeValue)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-bold">
            {formatValue(awayValue)}
          </span>
          <span className="font-medium text-secondary-900 dark:text-white">
            {awayLabel}
          </span>
        </div>
      </div>
      
      <div className="flex h-3 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
        <div 
          className="bg-primary-500 transition-all duration-300"
          style={{ width: `${homePercentage}%` }}
        />
        <div 
          className="bg-blue-500 transition-all duration-300"
          style={{ width: `${awayPercentage}%` }}
        />
      </div>
    </div>
  );
};
