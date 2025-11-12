import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { NewsArticle } from '../../types';

interface NewsSectionProps {
  articles: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="news" className="py-16 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
            Futbol Haberleri
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Futbol dünyasından son gelişmeler, transfer haberleri ve taktiksel analizler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Card key={article.id} hover className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="primary" size="sm">
                    Haber
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-secondary-500">
                    <i className="bi bi-calendar3"></i>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-secondary-500">
                    <i className="bi bi-person"></i>
                    <span>{article.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                    <i className="bi bi-arrow-right-circle mr-2"></i>
                    Haberi Oku
                  </button>
                  <div className="flex items-center space-x-2">
                    <button className="text-secondary-500 hover:text-secondary-600 transition-colors">
                      <i className="bi bi-bookmark"></i>
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
          <button className="inline-flex items-center px-6 py-3 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors">
            <i className="bi bi-newspaper mr-2"></i>
            Tüm Haberleri Görüntüle
          </button>
        </div>
      </div>
    </section>
  );
};
