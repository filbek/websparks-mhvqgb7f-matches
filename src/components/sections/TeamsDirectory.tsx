import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Team } from '../../types';

interface TeamsDirectoryProps {
  teams: Team[];
}

export const TeamsDirectory: React.FC<TeamsDirectoryProps> = ({ teams }) => {
  const getFormColor = (form: string) => {
    const wins = (form.match(/W/g) || []).length;
    const total = form.length;
    const winRate = wins / total;
    
    if (winRate >= 0.8) return 'success';
    if (winRate >= 0.6) return 'warning';
    return 'danger';
  };

  const renderFormBadges = (form: string) => {
    return form.split('').map((result, index) => (
      <span
        key={index}
        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
          result === 'W' 
            ? 'bg-green-500 text-white' 
            : result === 'D' 
            ? 'bg-yellow-500 text-white' 
            : 'bg-red-500 text-white'
        }`}
      >
        {result}
      </span>
    ));
  };

  return (
    <section id="teams" className="py-16 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
            Takım Rehberi
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Takımların güncel form durumları, istatistikleri ve detaylı analizleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team.id} hover className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  crossOrigin="anonymous"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                    {team.name}
                  </h3>
                  <Badge variant="primary" size="sm">
                    {team.league}
                  </Badge>
                </div>
              </div>

              {/* Form */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Son 5 Maç
                  </span>
                  <Badge variant={getFormColor(team.recentForm)} size="sm">
                    {((team.recentForm.match(/W/g) || []).length / team.recentForm.length * 100).toFixed(0)}% Galibiyet
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  {renderFormBadges(team.recentForm)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                  <div className="text-xl font-bold text-secondary-900 dark:text-white">
                    {team.stats.played}
                  </div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">
                    Oynanan
                  </div>
                </div>
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {team.stats.won}
                  </div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">
                    Galibiyet
                  </div>
                </div>
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                  <div className="text-xl font-bold text-primary-600">
                    {team.stats.goalsFor}
                  </div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">
                    Attığı Gol
                  </div>
                </div>
                <div className="text-center p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                  <div className="text-xl font-bold text-red-600">
                    {team.stats.goalsAgainst}
                  </div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">
                    Yediği Gol
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                  <i className="bi bi-bar-chart mr-2"></i>
                  Detaylı Analiz
                </button>
                <button className="text-secondary-500 hover:text-secondary-600 transition-colors">
                  <i className="bi bi-star text-lg"></i>
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors">
            <i className="bi bi-grid-3x3-gap mr-2"></i>
            Tüm Takımları Görüntüle
          </button>
        </div>
      </div>
    </section>
  );
};
