import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MatchPreview } from '../../types';

interface LatestAnalysesProps {
  previews: MatchPreview[];
}

export const LatestAnalyses: React.FC<LatestAnalysesProps> = ({ previews }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-secondary-50 dark:bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
            Son Analizler
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Uzman yazarlarımızın hazırladığı detaylı maç analizleri ve taktiksel değerlendirmeler
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {previews.map((preview) => (
            <Card key={preview.id} hover className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="primary" size="sm">
                      {preview.match.league}
                    </Badge>
                    <span className="text-sm text-secondary-500">
                      {formatDate(preview.publishedAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-secondary-500">
                    <i className="bi bi-person"></i>
                    {preview.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 line-clamp-2">
                  {preview.title}
                </h3>

                <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                  {preview.excerpt}
                </p>

                {/* Match Info */}
                <div className="flex items-center justify-between mb-4 p-3 bg-secondary-100 dark:bg-secondary-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={preview.match.homeTeamLogo}
                      alt={preview.match.homeTeam}
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-sm text-secondary-900 dark:text-white">
                      {preview.match.homeTeam}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-secondary-500 mb-1">
                      {new Date(preview.match.kickoffTime).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                    <div className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                      {new Date(preview.match.kickoffTime).toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-sm text-secondary-900 dark:text-white">
                      {preview.match.awayTeam}
                    </span>
                    <img
                      src={preview.match.awayTeamLogo}
                      alt={preview.match.awayTeam}
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Metrics Preview */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-primary-50 dark:bg-primary-900/20 rounded">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {preview.metrics.homeXG}
                    </div>
                    <div className="text-xs text-secondary-600 dark:text-secondary-400">
                      Ev Sahibi xG
                    </div>
                  </div>
                  <div className="text-center p-2 bg-primary-50 dark:bg-primary-900/20 rounded">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {preview.metrics.awayXG}
                    </div>
                    <div className="text-xs text-secondary-600 dark:text-secondary-400">
                      Deplasman xG
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {preview.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                    <i className="bi bi-arrow-right-circle mr-2"></i>
                    Detayları Oku
                  </button>
                  <div className="flex items-center space-x-2">
                    <button className="text-secondary-500 hover:text-secondary-600 transition-colors">
                      <i className="bi bi-heart"></i>
                    </button>
                    <button className="text-secondary-500 hover:text-secondary-600 transition-colors">
                      <i className="bi bi-share"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
            <i className="bi bi-collection mr-2"></i>
            Tüm Analizleri Görüntüle
          </button>
        </div>
      </div>
    </section>
  );
};
