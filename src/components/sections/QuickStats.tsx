import React from 'react';
import { Card } from '../ui/Card';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: 'bi-trophy',
      label: 'Başarılı Tahmin',
      value: '78%',
      color: 'text-green-500'
    },
    {
      icon: 'bi-graph-up',
      label: 'Günlük Analiz',
      value: '25+',
      color: 'text-blue-500'
    },
    {
      icon: 'bi-people',
      label: 'Aktif Kullanıcı',
      value: '15K+',
      color: 'text-purple-500'
    },
    {
      icon: 'bi-star',
      label: 'Uzman Puanı',
      value: '4.8',
      color: 'text-yellow-500'
    }
  ];

  return (
    <section className="py-8 bg-secondary-50 dark:bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center hover:scale-105 transition-transform">
              <div className={`text-3xl ${stat.color} mb-2`}>
                <i className={stat.icon}></i>
              </div>
              <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
