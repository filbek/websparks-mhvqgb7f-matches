import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DailyBulletinSection } from './components/sections/DailyBulletin';
import { MatchAnalysisPage } from './components/sections/MatchAnalysisPage';
import { QuickStats } from './components/sections/QuickStats';
import { todaysBulletin, sampleAnalysis } from './data/mockData';

function App() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Arama:', query);
  };

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  const handleBackToBulletin = () => {
    setSelectedMatchId(null);
  };

  if (selectedMatchId) {
    return (
      <div className="min-h-screen bg-white dark:bg-secondary-900">
        <Header onSearch={handleSearch} />
        <MatchAnalysisPage 
          analysis={sampleAnalysis} 
          onBack={handleBackToBulletin}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      <Header onSearch={handleSearch} />
      
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                <i className="bi bi-robot mr-2"></i>
                AI Destekli Analiz
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-secondary-900 dark:text-white mb-4">
              İddaa Severlerin
              <span className="text-primary-500 block">Güvenilir Rehberi</span>
            </h1>
            
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 max-w-3xl mx-auto">
              Yapay zeka destekli tahminler, detaylı istatistikler ve uzman analizleri ile bahis kararlarınızı daha bilinçli verin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                <i className="bi bi-calendar-event mr-2"></i>
                Bugünün Maçları
              </button>
              <button className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-lg font-medium transition-colors">
                <i className="bi bi-graph-up mr-2"></i>
                AI Tahminleri
              </button>
            </div>
          </div>
        </section>

        <QuickStats />
        
        <DailyBulletinSection 
          bulletin={todaysBulletin}
          onMatchSelect={handleMatchSelect}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
