import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Match } from '../../types';

interface UpcomingMatchesProps {
  matches: Match[];
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <section id="previews" className="py-16 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
            Yaklaşan Maçlar
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Detaylı analizler ve taktiksel değerlendirmeler ile maç öncesi hazırlık yapın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const { date, time } = formatDate(match.kickoffTime);
            
            return (
              <Card key={match.id} hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="primary" size="sm">
                    {match.league}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium text-secondary-900 dark:text-white">
                      {date}
                    </div>
                    <div className="text-sm text-secondary-500">
                      {time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  {/* Home Team */}
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={match.homeTeamLogo}
                      alt={match.homeTeam}
                      crossOrigin="anonymous"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-secondary-900 dark:text-white text-sm sm:text-base">
                      {match.homeTeam}
                    </span>
                  </div>

                  {/* VS */}
                  <div className="px-4">
                    <span className="text-secondary-400 font-medium">VS</span>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center space-x-3 flex-1 justify-end">
                    <span className="font-medium text-secondary-900 dark:text-white text-sm sm:text-base">
                      {match.awayTeam}
                    </span>
                    <img
                      src={match.awayTeamLogo}
                      alt={match.awayTeam}
                      crossOrigin="anonymous"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center text-sm text-secondary-500 mb-4">
                  <i className="bi bi-geo-alt mr-2"></i>
                  {match.stadium}
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                    <i className="bi bi-bar-chart mr-2"></i>
                    Analizi Görüntüle
                  </button>
                  <button className="text-secondary-500 hover:text-secondary-600 transition-colors">
                    <i className="bi bi-bookmark text-lg"></i>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors">
            <i className="bi bi-plus-circle mr-2"></i>
            Tüm Maçları Görüntüle
          </button>
        </div>
      </div>
    </section>
  );
};
