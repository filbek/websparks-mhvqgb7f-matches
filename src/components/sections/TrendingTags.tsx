import React from 'react';
import { Badge } from '../ui/Badge';

interface TrendingTagsProps {
  tags: string[];
}

export const TrendingTags: React.FC<TrendingTagsProps> = ({ tags }) => {
  return (
    <section id="tags" className="py-16 bg-secondary-50 dark:bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
            Popüler Etiketler
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            En çok aranan konular ve trend olan futbol analizleri
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, index) => (
            <button
              key={tag}
              className="group relative"
            >
              <Badge 
                variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'success'}
                size="md"
                className="hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <i className="bi bi-hash mr-1"></i>
                {tag}
                <span className="ml-2 text-xs opacity-70">
                  {Math.floor(Math.random() * 50) + 10}
                </span>
              </Badge>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-secondary-600 dark:text-secondary-300 mb-4">
            İlginizi çeken konuları keşfedin ve detaylı analizlere ulaşın
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
            <i className="bi bi-search mr-2"></i>
            Tüm Etiketleri Keşfet
          </button>
        </div>
      </div>
    </section>
  );
};
