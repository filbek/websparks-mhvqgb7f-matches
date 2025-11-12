import React from 'react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 sm:pt-24 pb-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-primary-500 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-accent-500 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-accent-500 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                <i className="bi bi-lightning-charge mr-2"></i>
                Veri Odaklı Analiz
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-secondary-900 dark:text-white mb-6 leading-tight">
              Futbolun
              <span className="text-primary-500 block">Derinliklerini</span>
              Keşfedin
            </h1>
            
            <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Maç öncesi detaylı analizler, takım formları ve taktiksel değerlendirmeler ile futbol severlere objektif içgörüler sunuyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                <i className="bi bi-play-circle mr-2 group-hover:scale-110 transition-transform"></i>
                Analizleri İncele
              </Button>
              <Button variant="outline" size="lg">
                <i className="bi bi-calendar-event mr-2"></i>
                Yaklaşan Maçlar
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-1">500+</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">Analiz</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-1">50+</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">Takım</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-1">10K+</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">Okuyucu</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop"
                  alt="Futbol Analizi"
                  crossOrigin="anonymous"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="bi bi-graph-up text-primary-400"></i>
                    <span className="text-sm font-medium">Canlı Analiz</span>
                  </div>
                  <h3 className="text-lg font-semibold">Galatasaray vs Fenerbahçe</h3>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-4 animate-bounce-subtle">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Canlı</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-primary-500 text-white rounded-xl shadow-lg p-4">
                <div className="text-2xl font-bold">2.1</div>
                <div className="text-xs opacity-90">xG Değeri</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
