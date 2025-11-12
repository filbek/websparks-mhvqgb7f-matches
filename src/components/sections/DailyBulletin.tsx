import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DailyBulletin, Match } from '../../types';

interface DailyBulletinProps {
  bulletin: DailyBulletin;
  onMatchSelect: (matchId: string) => void;
}

export const DailyBulletinSection: React.FC<DailyBulletinProps> = ({ 
  bulletin, 
  onMatchSelect 
}) => {
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  
  const leagues = Array.from(new Set(bulletin.matches.map(match => match.league)));
  
  const filteredMatches = selectedLeague === 'all' 
    ? bulletin.matches 
    : bulletin.matches.filter(match => match.league === selectedLeague);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getOddsColor = (odds: number) => {
    if (odds <= 1.5) return 'text-green-600 font-bold';
    if (odds <= 2.0) return 'text-blue-600 font-semibold';
    if (odds <= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <section className="py-8 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-secondary-900 dark:text-white mb-2">
              Günlük Futbol Bülteni
            </h2>
            <p className="text-secondary-600 dark:text-secondary-300">
              {new Date(bulletin.date).toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} - {bulletin.totalMatches} Maç
            </p>
          </div>
          
          {/* League Filter */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => setSelectedLeague('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedLeague === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
              }`}
            >
              Tümü ({bulletin.totalMatches})
            </button>
            {leagues.map(league => (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedLeague === league
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                }`}
              >
                {league} ({bulletin.matches.filter(m => m.league === league).length})
              </button>
            ))}
          </div>
        </div>

        {/* Matches List - Kompakt Tasarım */}
        <div className="space-y-1">
          {filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              hover 
              className="p-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-secondary-50 dark:hover:bg-secondary-800"
              onClick={() => onMatchSelect(match.id)}
            >
              <div className="flex items-center justify-between">
                {/* Time & League */}
                <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-sm font-bold text-secondary-900 dark:text-white leading-tight">
                      {formatTime(match.kickoffTime)}
                    </div>
                    <Badge variant="primary" size="sm" className="text-xs mt-0.5">
                      {match.league}
                    </Badge>
                  </div>
                </div>

                {/* Teams */}
                <div className="flex items-center space-x-3 flex-1 min-w-0 mx-4">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <img
                      src={match.homeTeamLogo}
                      alt={match.homeTeam}
                      crossOrigin="anonymous"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="font-medium text-sm text-secondary-900 dark:text-white truncate">
                      {match.homeTeam}
                    </span>
                  </div>
                  
                  <div className="text-secondary-400 font-bold text-xs flex-shrink-0">VS</div>
                  
                  <div className="flex items-center space-x-2 flex-1 min-w-0 justify-end">
                    <span className="font-medium text-sm text-secondary-900 dark:text-white truncate">
                      {match.awayTeam}
                    </span>
                    <img
                      src={match.awayTeamLogo}
                      alt={match.awayTeam}
                      crossOrigin="anonymous"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  </div>
                </div>

                {/* Odds - Kompakt */}
                {match.odds && (
                  <div className="flex items-center space-x-2 text-xs flex-shrink-0">
                    <div className="text-center">
                      <div className="text-xs text-secondary-500 mb-0.5">1</div>
                      <div className={`${getOddsColor(match.odds.home)} text-xs`}>
                        {match.odds.home.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-secondary-500 mb-0.5">X</div>
                      <div className={`${getOddsColor(match.odds.draw)} text-xs`}>
                        {match.odds.draw.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-secondary-500 mb-0.5">2</div>
                      <div className={`${getOddsColor(match.odds.away)} text-xs`}>
                        {match.odds.away.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-secondary-500 mb-0.5">Ü2.5</div>
                      <div className={`${getOddsColor(match.odds.over25)} text-xs`}>
                        {match.odds.over25.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-secondary-500 mb-0.5">KG</div>
                      <div className={`${getOddsColor(match.odds.bothTeamsScore)} text-xs`}>
                        {match.odds.bothTeamsScore.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                  {bulletin.featuredMatches.includes(match.id) && (
                    <Badge variant="warning" size="sm" className="text-xs">
                      <i className="bi bi-star-fill mr-1"></i>
                      Öne Çıkan
                    </Badge>
                  )}
                  <i className="bi bi-chevron-right text-secondary-400 text-sm"></i>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500">
              {bulletin.matches.filter(m => m.league === 'Süper Lig').length}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">Süper Lig</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500">
              {bulletin.matches.filter(m => m.league === 'Premier League').length}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">Premier League</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500">
              {bulletin.matches.filter(m => m.league === 'La Liga').length}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">La Liga</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary-500">
              {bulletin.featuredMatches.length}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">Öne Çıkan</div>
          </div>
        </div>
      </div>
    </section>
  );
};
