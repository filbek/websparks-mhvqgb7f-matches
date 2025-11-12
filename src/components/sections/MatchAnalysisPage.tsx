import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StatCard } from '../ui/StatCard';
import { ComparisonBar } from '../ui/ComparisonBar';
import { MatchAnalysis } from '../../types';

interface MatchAnalysisPageProps {
  analysis: MatchAnalysis;
  onBack: () => void;
}

export const MatchAnalysisPage: React.FC<MatchAnalysisPageProps> = ({ 
  analysis, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prediction' | 'stats' | 'h2h' | 'comments' | 'live' | 'betting' | 'social'>('overview');
  const [newComment, setNewComment] = useState('');
  const [selectedBetType, setSelectedBetType] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('');
  const [liveOdds, setLiveOdds] = useState(analysis.match.odds);
  const [betVolume, setBetVolume] = useState({
    home: 45,
    draw: 15,
    away: 40,
    over25: 68,
    under25: 32,
    bothTeamsScore: 72
  });

  // Simulated live updates
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (liveOdds) {
        setLiveOdds(prev => prev ? {
          ...prev,
          home: prev.home + (Math.random() - 0.5) * 0.1,
          draw: prev.draw + (Math.random() - 0.5) * 0.1,
          away: prev.away + (Math.random() - 0.5) * 0.1,
          over25: prev.over25 + (Math.random() - 0.5) * 0.05,
          under25: prev.under25 + (Math.random() - 0.5) * 0.05,
          bothTeamsScore: prev.bothTeamsScore + (Math.random() - 0.5) * 0.05
        } : null);
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [liveOdds]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'green';
    if (confidence >= 50) return 'yellow';
    return 'red';
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'bet': return 'bi-check-circle-fill text-green-500';
      case 'value': return 'bi-gem text-blue-500';
      case 'avoid': return 'bi-x-circle-fill text-red-500';
      default: return 'bi-info-circle text-secondary-500';
    }
  };

  const renderFormBadges = (form: string) => {
    return form.split('').map((result, index) => (
      <span
        key={index}
        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
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

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: 'bi-house' },
    { id: 'prediction', label: 'AI Tahminleri', icon: 'bi-robot' },
    { id: 'betting', label: 'Bahis Analizi', icon: 'bi-currency-dollar' },
    { id: 'live', label: 'Canlı Veriler', icon: 'bi-broadcast' },
    { id: 'stats', label: 'İstatistikler', icon: 'bi-bar-chart' },
    { id: 'h2h', label: 'Karşılıklı', icon: 'bi-arrow-left-right' },
    { id: 'social', label: 'Sosyal Analiz', icon: 'bi-people' },
    { id: 'comments', label: 'Yorumlar', icon: 'bi-chat-dots' }
  ];

  const popularBets = [
    { market: 'Galatasaray Kazanır', percentage: 45, volume: '€2.3M', trend: 'up' },
    { market: 'Üst 2.5 Gol', percentage: 68, volume: '€1.8M', trend: 'up' },
    { market: 'İki Takım Gol', percentage: 72, volume: '€1.5M', trend: 'down' },
    { market: 'Fenerbahçe Kazanır', percentage: 40, volume: '€2.1M', trend: 'neutral' },
    { market: 'İlk Yarı/Maç Sonucu', percentage: 35, volume: '€900K', trend: 'up' }
  ];

  const valueBets = [
    { market: 'Galatasaray +1.5 Handicap', odds: 1.85, value: 12, confidence: 78 },
    { market: 'Üst 3.5 Gol', odds: 2.40, value: 8, confidence: 65 },
    { market: 'İlk Gol 15-30 dk', odds: 3.20, value: 15, confidence: 72 }
  ];

  const liveStats = {
    possession: { home: 58, away: 42 },
    shots: { home: 12, away: 8 },
    shotsOnTarget: { home: 5, away: 3 },
    corners: { home: 7, away: 4 },
    fouls: { home: 9, away: 11 },
    yellowCards: { home: 2, away: 3 }
  };

  const socialSentiment = {
    twitter: { positive: 65, negative: 25, neutral: 10 },
    reddit: { positive: 58, negative: 32, neutral: 10 },
    telegram: { positive: 72, negative: 18, neutral: 10 }
  };

  const expertPredictions = [
    { expert: 'Futbol Analisti Pro', prediction: 'Galatasaray 2-1', confidence: 85, followers: '125K' },
    { expert: 'Bahis Uzmanı', prediction: 'Üst 2.5 Gol', confidence: 78, followers: '89K' },
    { expert: 'Taktik Guru', prediction: 'İki Takım Gol', confidence: 82, followers: '156K' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-secondary-100 dark:hover:bg-secondary-800"
        >
          <i className="bi bi-arrow-left mr-2"></i>
          Bültene Dön
        </Button>

        {/* Match Header with Live Odds */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-white to-primary-50 dark:from-secondary-800 dark:to-primary-900/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex items-center space-x-6 mb-4 lg:mb-0">
              <div className="text-center bg-white dark:bg-secondary-700 rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {formatTime(analysis.match.kickoffTime)}
                </div>
                <div className="text-sm text-secondary-500">
                  {formatDate(analysis.match.kickoffTime)}
                </div>
                <Badge variant="primary" size="sm" className="mt-1">
                  {analysis.match.league}
                </Badge>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-red-500 font-medium">CANLI</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={analysis.match.homeTeamLogo}
                    alt={analysis.match.homeTeam}
                    crossOrigin="anonymous"
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <div className="font-bold text-xl text-secondary-900 dark:text-white">
                      {analysis.match.homeTeam}
                    </div>
                    <div className="text-sm text-secondary-500">Ev Sahibi</div>
                    <div className="flex space-x-1 mt-1">
                      {renderFormBadges(analysis.liveData.homeForm)}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-400 mb-2">VS</div>
                  <div className="text-sm text-secondary-500">
                    {analysis.match.stadium}
                  </div>
                  <div className="text-xs text-green-600 font-medium mt-1">
                    Maç Öncesi
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-xl text-secondary-900 dark:text-white">
                      {analysis.match.awayTeam}
                    </div>
                    <div className="text-sm text-secondary-500">Deplasman</div>
                    <div className="flex space-x-1 mt-1 justify-end">
                      {renderFormBadges(analysis.liveData.awayForm)}
                    </div>
                  </div>
                  <img
                    src={analysis.match.awayTeamLogo}
                    alt={analysis.match.awayTeam}
                    crossOrigin="anonymous"
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Live Odds with Changes */}
            {liveOdds && (
              <div className="bg-white dark:bg-secondary-700 rounded-lg p-4 shadow-sm border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Canlı Oranlar
                  </h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">GÜNCELLENIYOR</span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-3 text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="text-xs text-secondary-500 mb-1">1</div>
                    <div className="font-bold text-lg text-green-600">
                      {liveOdds.home.toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600">↗ +0.05</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
                    <div className="text-xs text-secondary-500 mb-1">X</div>
                    <div className="font-bold text-lg text-yellow-600">
                      {liveOdds.draw.toFixed(2)}
                    </div>
                    <div className="text-xs text-red-600">↘ -0.02</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="text-xs text-secondary-500 mb-1">2</div>
                    <div className="font-bold text-lg text-blue-600">
                      {liveOdds.away.toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600">↗ +0.03</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="text-xs text-secondary-500 mb-1">Ü2.5</div>
                    <div className="font-bold text-lg text-purple-600">
                      {liveOdds.over25.toFixed(2)}
                    </div>
                    <div className="text-xs text-secondary-500">→ 0.00</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="text-xs text-secondary-500 mb-1">KG</div>
                    <div className="font-bold text-lg text-orange-600">
                      {liveOdds.bothTeamsScore.toFixed(2)}
                    </div>
                    <div className="text-xs text-red-600">↘ -0.01</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weather & Match Info */}
          {analysis.liveData.weather && (
            <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-600">
              <div className="flex items-center justify-center space-x-6 text-sm text-secondary-600 dark:text-secondary-400">
                <div className="flex items-center space-x-2">
                  <i className="bi bi-thermometer-half"></i>
                  <span>{analysis.liveData.weather.temperature}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-cloud-sun"></i>
                  <span>{analysis.liveData.weather.condition}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-wind"></i>
                  <span>{analysis.liveData.weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-people"></i>
                  <span>45,000 Kapasite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-person-badge"></i>
                  <span>Hakem: Ali Palabıyık</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* AI Prediction Summary with Betting Focus */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-l-4 border-primary-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
              <i className="bi bi-robot mr-3 text-primary-500 text-3xl"></i>
              AI Bahis Önerileri
            </h3>
            <div className="text-right">
              <Badge variant="primary" size="lg" className="text-lg px-4 py-2">
                %{analysis.aiPrediction.confidence} Güven
              </Badge>
              <div className="text-sm text-secondary-500 mt-1">
                Risk Seviyesi: {analysis.aiPrediction.confidence >= 70 ? 'Düşük' : 'Orta'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm border-2 border-green-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {analysis.aiPrediction.scorePrediction}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                En Olası Skor
              </div>
              <div className="text-xs text-green-600 mt-1 font-medium">
                ✓ ÖNERİLEN BAHIS
              </div>
            </div>
            
            <div className="text-center bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm border-2 border-blue-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                %{analysis.aiPrediction.goalsPrediction.over25}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Üst 2.5 Gol
              </div>
              <div className="text-xs text-blue-600 mt-1 font-medium">
                💎 DEĞER BAHSI
              </div>
            </div>
            
            <div className="text-center bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                %{analysis.aiPrediction.goalsPrediction.bothTeamsScore}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                İki Takım Gol
              </div>
              <div className="text-xs text-orange-600 mt-1 font-medium">
                ⚠️ RİSKLİ
              </div>
            </div>

            <div className="text-center bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm border-2 border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {analysis.aiPrediction.winner === 'home' ? '1' : analysis.aiPrediction.winner === 'away' ? '2' : 'X'}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Maç Sonucu
              </div>
              <div className="text-xs text-purple-600 mt-1 font-medium">
                🎯 GÜVENLİ
              </div>
            </div>
          </div>

          {/* Quick Betting Stats */}
          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">€3.2M</div>
                <div className="text-xs text-secondary-500">Toplam Bahis Hacmi</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">68%</div>
                <div className="text-xs text-secondary-500">Üst 2.5 Gol Oranı</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">45%</div>
                <div className="text-xs text-secondary-500">Ev Sahibi Bahsi</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">12%</div>
                <div className="text-xs text-secondary-500">Değer Bahsi Fırsatı</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-white dark:bg-secondary-800 p-1 rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-0 py-3 px-2 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md transform scale-105'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-700'
              }`}
            >
              <i className={`${tab.icon} mr-1 sm:mr-2`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'betting' && (
          <div className="space-y-6">
            {/* Popular Bets Worldwide */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-globe text-primary-500 mr-3"></i>
                Dünya Genelinde Popüler Bahisler
              </h4>
              <div className="space-y-4">
                {popularBets.map((bet, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-2xl font-bold text-primary-600">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-secondary-900 dark:text-white">
                          {bet.market}
                        </div>
                        <div className="text-sm text-secondary-500">
                          Bahis Hacmi: {bet.volume}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary-900 dark:text-white">
                          %{bet.percentage}
                        </div>
                        <div className="text-xs text-secondary-500">
                          Bahisçi Oranı
                        </div>
                      </div>
                      <div className={`text-2xl ${
                        bet.trend === 'up' ? 'text-green-500' : 
                        bet.trend === 'down' ? 'text-red-500' : 'text-secondary-500'
                      }`}>
                        <i className={`bi ${
                          bet.trend === 'up' ? 'bi-arrow-up' : 
                          bet.trend === 'down' ? 'bi-arrow-down' : 'bi-dash'
                        }`}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Value Bets */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-gem text-blue-500 mr-3"></i>
                Değer Bahisleri (Value Bets)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {valueBets.map((bet, index) => (
                  <div key={index} className="bg-white dark:bg-secondary-800 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                    <div className="text-center mb-4">
                      <div className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                        {bet.market}
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {bet.odds.toFixed(2)}
                      </div>
                      <Badge variant="success" size="sm">
                        +%{bet.value} Değer
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <ProgressBar
                        value={bet.confidence}
                        label="Güven Seviyesi"
                        color="blue"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600 dark:text-secondary-400">Beklenen Oran:</span>
                        <span className="font-bold text-secondary-900 dark:text-white">
                          {(bet.odds - (bet.odds * bet.value / 100)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Betting Volume Analysis */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-bar-chart text-purple-500 mr-3"></i>
                Bahis Hacmi Analizi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-secondary-900 dark:text-white mb-4">Maç Sonucu Dağılımı</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">Ev Sahibi Kazanır</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.home}</span>
                    </div>
                    <ProgressBar value={betVolume.home} color="green" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">Beraberlik</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.draw}</span>
                    </div>
                    <ProgressBar value={betVolume.draw} color="yellow" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">Deplasman Kazanır</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.away}</span>
                    </div>
                    <ProgressBar value={betVolume.away} color="blue" />
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-secondary-900 dark:text-white mb-4">Gol Bahisleri</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">Üst 2.5 Gol</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.over25}</span>
                    </div>
                    <ProgressBar value={betVolume.over25} color="purple" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">Alt 2.5 Gol</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.under25}</span>
                    </div>
                    <ProgressBar value={betVolume.under25} color="red" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-600 dark:text-secondary-400">İki Takım Gol</span>
                      <span className="font-bold text-secondary-900 dark:text-white">%{betVolume.bothTeamsScore}</span>
                    </div>
                    <ProgressBar value={betVolume.bothTeamsScore} color="primary" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert Predictions */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-award text-yellow-500 mr-3"></i>
                Uzman Tahminleri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {expertPredictions.map((expert, index) => (
                  <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <i className="bi bi-person-check text-white text-lg"></i>
                      </div>
                      <div>
                        <div className="font-bold text-secondary-900 dark:text-white">
                          {expert.expert}
                        </div>
                        <div className="text-sm text-secondary-500">
                          {expert.followers} takipçi
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                        {expert.prediction}
                      </div>
                      <Badge variant="warning" size="sm">
                        %{expert.confidence} Güven
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="space-y-6">
            {/* Live Match Stats */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-broadcast text-red-500 mr-3"></i>
                Canlı Maç İstatistikleri
                <div className="ml-3 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-sm text-red-500">CANLI</span>
                </div>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ComparisonBar
                    homeValue={liveStats.possession.home}
                    awayValue={liveStats.possession.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="Top Hakimiyeti (%)"
                    format="percentage"
                  />
                  <ComparisonBar
                    homeValue={liveStats.shots.home}
                    awayValue={liveStats.shots.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="Toplam Şut"
                  />
                  <ComparisonBar
                    homeValue={liveStats.shotsOnTarget.home}
                    awayValue={liveStats.shotsOnTarget.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="İsabetli Şut"
                  />
                </div>
                
                <div className="space-y-4">
                  <ComparisonBar
                    homeValue={liveStats.corners.home}
                    awayValue={liveStats.corners.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="Korner"
                  />
                  <ComparisonBar
                    homeValue={liveStats.fouls.home}
                    awayValue={liveStats.fouls.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="Faul"
                  />
                  <ComparisonBar
                    homeValue={liveStats.yellowCards.home}
                    awayValue={liveStats.yellowCards.away}
                    homeLabel={analysis.match.homeTeam}
                    awayLabel={analysis.match.awayTeam}
                    title="Sarı Kart"
                  />
                </div>
              </div>
            </Card>

            {/* Live Odds Movement */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-graph-up text-green-500 mr-3"></i>
                Oran Hareketleri
              </h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <div className="text-center text-secondary-600 dark:text-secondary-400 mb-4">
                  <i className="bi bi-graph-up text-4xl mb-2"></i>
                  <p>Oran grafikleri burada görüntülenecek</p>
                  <p className="text-sm">Son 24 saatteki oran değişimleri</p>
                </div>
              </div>
            </Card>

            {/* Live News & Updates */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-newspaper text-blue-500 mr-3"></i>
                Son Dakika Haberleri
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <i className="bi bi-clock text-blue-500 mt-1"></i>
                  <div>
                    <div className="text-sm text-blue-600 font-medium">5 dakika önce</div>
                    <div className="text-secondary-900 dark:text-white">Galatasaray kadrosunda son dakika değişikliği</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <i className="bi bi-clock text-yellow-500 mt-1"></i>
                  <div>
                    <div className="text-sm text-yellow-600 font-medium">12 dakika önce</div>
                    <div className="text-secondary-900 dark:text-white">Fenerbahçe taraftarları stadyuma gelmeye başladı</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <i className="bi bi-clock text-green-500 mt-1"></i>
                  <div>
                    <div className="text-sm text-green-600 font-medium">18 dakika önce</div>
                    <div className="text-secondary-900 dark:text-white">Hava durumu maç için ideal koşullarda</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            {/* Social Media Sentiment */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-chat-heart text-pink-500 mr-3"></i>
                Sosyal Medya Analizi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-twitter text-blue-500 text-3xl mr-2"></i>
                    <h5 className="font-bold text-secondary-900 dark:text-white">Twitter</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Pozitif</span>
                      <span className="font-bold">%{socialSentiment.twitter.positive}</span>
                    </div>
                    <ProgressBar value={socialSentiment.twitter.positive} color="green" />
                    <div className="flex justify-between">
                      <span className="text-red-600">Negatif</span>
                      <span className="font-bold">%{socialSentiment.twitter.negative}</span>
                    </div>
                    <ProgressBar value={socialSentiment.twitter.negative} color="red" />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-reddit text-orange-500 text-3xl mr-2"></i>
                    <h5 className="font-bold text-secondary-900 dark:text-white">Reddit</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Pozitif</span>
                      <span className="font-bold">%{socialSentiment.reddit.positive}</span>
                    </div>
                    <ProgressBar value={socialSentiment.reddit.positive} color="green" />
                    <div className="flex justify-between">
                      <span className="text-red-600">Negatif</span>
                      <span className="font-bold">%{socialSentiment.reddit.negative}</span>
                    </div>
                    <ProgressBar value={socialSentiment.reddit.negative} color="red" />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-telegram text-blue-600 text-3xl mr-2"></i>
                    <h5 className="font-bold text-secondary-900 dark:text-white">Telegram</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Pozitif</span>
                      <span className="font-bold">%{socialSentiment.telegram.positive}</span>
                    </div>
                    <ProgressBar value={socialSentiment.telegram.positive} color="green" />
                    <div className="flex justify-between">
                      <span className="text-red-600">Negatif</span>
                      <span className="font-bold">%{socialSentiment.telegram.negative}</span>
                    </div>
                    <ProgressBar value={socialSentiment.telegram.negative} color="red" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Trending Hashtags */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-hash text-purple-500 mr-3"></i>
                Trend Hashtagler
              </h4>
              <div className="flex flex-wrap gap-3">
                {['#GalatasarayFenerbahçe', '#Derbi', '#SüperLig', '#Cimbom', '#Fener', '#TürkTelekom', '#Futbol', '#Maç'].map((tag, index) => (
                  <Badge key={index} variant="primary" size="md" className="cursor-pointer hover:scale-105 transition-transform">
                    {tag}
                    <span className="ml-2 text-xs opacity-70">
                      {Math.floor(Math.random() * 10) + 1}K
                    </span>
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Social Media Posts */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-chat-square-quote text-green-500 mr-3"></i>
                Popüler Gönderiler
              </h4>
              <div className="space-y-4">
                <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className="bi bi-twitter text-white"></i>
                    </div>
                    <div>
                      <div className="font-bold text-secondary-900 dark:text-white">@futbolanalisti</div>
                      <div className="text-sm text-secondary-500">2 saat önce</div>
                    </div>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    Bu derbi maçında Galatasaray'ın ev sahibi avantajı çok önemli. Son 5 derbide 3 galibiyet aldılar. #Derbi #Analiz
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-secondary-500">
                    <span><i className="bi bi-heart mr-1"></i>1.2K</span>
                    <span><i className="bi bi-arrow-repeat mr-1"></i>456</span>
                    <span><i className="bi bi-chat mr-1"></i>89</span>
                  </div>
                </div>
                
                <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <i className="bi bi-reddit text-white"></i>
                    </div>
                    <div>
                      <div className="font-bold text-secondary-900 dark:text-white">u/bahisuzmanı</div>
                      <div className="text-sm text-secondary-500">4 saat önce</div>
                    </div>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300 mb-3">
                    İstatistiklere göre bu maçta üst 2.5 gol çok mantıklı. Her iki takım da ofansif oyun sergiliyor.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-secondary-500">
                    <span><i className="bi bi-arrow-up mr-1"></i>234</span>
                    <span><i className="bi bi-chat mr-1"></i>67</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Diğer tab içerikleri burada devam edecek... */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Ev Sahibi Galibiyet"
                value={`%${Math.round((analysis.statistics.homeStats.won / analysis.statistics.homeStats.played) * 100)}`}
                icon="bi-house"
                color="green"
                subtitle="Genel performans"
              />
              <StatCard
                title="Deplasman Galibiyet"
                value={`%${Math.round((analysis.statistics.awayStats.won / analysis.statistics.awayStats.played) * 100)}`}
                icon="bi-airplane"
                color="blue"
                subtitle="Deplasman formu"
              />
              <StatCard
                title="Ortalama Gol"
                value={(analysis.statistics.homeStats.avgGoalsFor + analysis.statistics.awayStats.avgGoalsFor).toFixed(1)}
                icon="bi-bullseye"
                color="purple"
                subtitle="Maç başına"
              />
              <StatCard
                title="Risk Seviyesi"
                value={analysis.aiPrediction.confidence >= 70 ? 'Düşük' : analysis.aiPrediction.confidence >= 50 ? 'Orta' : 'Yüksek'}
                icon="bi-shield-check"
                color={analysis.aiPrediction.confidence >= 70 ? 'green' : analysis.aiPrediction.confidence >= 50 ? 'yellow' : 'red'}
                subtitle="Tahmin riski"
              />
            </div>

            {/* Team Comparison */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 text-center">
                Takım Karşılaştırması
              </h4>
              <div className="space-y-6">
                <ComparisonBar
                  homeValue={analysis.statistics.homeStats.avgGoalsFor}
                  awayValue={analysis.statistics.awayStats.avgGoalsFor}
                  homeLabel={analysis.match.homeTeam}
                  awayLabel={analysis.match.awayTeam}
                  title="Ortalama Attığı Gol"
                />
                <ComparisonBar
                  homeValue={analysis.statistics.homeStats.avgGoalsAgainst}
                  awayValue={analysis.statistics.awayStats.avgGoalsAgainst}
                  homeLabel={analysis.match.homeTeam}
                  awayLabel={analysis.match.awayTeam}
                  title="Ortalama Yediği Gol"
                />
                <ComparisonBar
                  homeValue={Math.round((analysis.statistics.homeStats.won / analysis.statistics.homeStats.played) * 100)}
                  awayValue={Math.round((analysis.statistics.awayStats.won / analysis.statistics.awayStats.played) * 100)}
                  homeLabel={analysis.match.homeTeam}
                  awayLabel={analysis.match.awayTeam}
                  title="Galibiyet Yüzdesi"
                  format="percentage"
                />
                <ComparisonBar
                  homeValue={Math.round((analysis.statistics.homeStats.over25Games / analysis.statistics.homeStats.played) * 100)}
                  awayValue={Math.round((analysis.statistics.awayStats.over25Games / analysis.statistics.awayStats.played) * 100)}
                  homeLabel={analysis.match.homeTeam}
                  awayLabel={analysis.match.awayTeam}
                  title="Üst 2.5 Gol Oranı"
                  format="percentage"
                />
              </div>
            </Card>

            {/* Injuries & Suspensions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-4 flex items-center">
                  <i className="bi bi-bandaid text-red-500 mr-2"></i>
                  Sakatlık Durumu
                </h4>
                <div className="space-y-3">
                  {analysis.liveData.injuries.length > 0 ? (
                    analysis.liveData.injuries.map((injury, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          injury.severity === 'major' ? 'bg-red-500' : 
                          injury.severity === 'minor' ? 'bg-yellow-500' : 'bg-orange-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-secondary-900 dark:text-white">
                            {injury.name}
                          </div>
                          <div className="text-sm text-secondary-500">
                            {injury.position} - {injury.severity === 'major' ? 'Ciddi' : injury.severity === 'minor' ? 'Hafif' : 'Şüpheli'}
                          </div>
                          {injury.expectedReturn && (
                            <div className="text-xs text-secondary-400">
                              Dönüş: {formatDate(injury.expectedReturn)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-secondary-500">
                      <i className="bi bi-check-circle text-green-500 text-2xl mb-2"></i>
                      <p>Sakatlık raporu yok</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-4 flex items-center">
                  <i className="bi bi-exclamation-triangle text-yellow-500 mr-2"></i>
                  Ceza Durumu
                </h4>
                <div className="space-y-3">
                  {analysis.liveData.suspensions.length > 0 ? (
                    analysis.liveData.suspensions.map((suspension, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <i className="bi bi-exclamation-triangle text-yellow-500"></i>
                        <div className="flex-1">
                          <div className="font-medium text-secondary-900 dark:text-white">
                            {suspension.name}
                          </div>
                          <div className="text-sm text-secondary-500">
                            {suspension.position} - {suspension.reason}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-secondary-500">
                      <i className="bi bi-check-circle text-green-500 text-2xl mb-2"></i>
                      <p>Ceza durumu yok</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'prediction' && (
          <div className="space-y-6">
            {/* AI Recommendations */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 flex items-center">
                <i className="bi bi-lightbulb text-yellow-500 mr-3"></i>
                AI Önerileri & Tahminler
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analysis.aiPrediction.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-secondary-50 dark:from-secondary-800 dark:to-secondary-700 rounded-lg p-6 border-l-4 border-primary-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <i className={`${getRecommendationIcon(rec.type)} text-2xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-lg text-secondary-900 dark:text-white">
                            {rec.market}
                          </h5>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={rec.confidence >= 70 ? 'success' : rec.confidence >= 50 ? 'warning' : 'danger'}
                              size="md"
                            >
                              %{rec.confidence}
                            </Badge>
                            <Badge variant={rec.type === 'bet' ? 'primary' : rec.type === 'value' ? 'secondary' : 'danger'} size="sm">
                              {rec.type === 'bet' ? 'ÖNERİ' : rec.type === 'value' ? 'DEĞER' : 'KAÇIN'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-secondary-700 dark:text-secondary-300 mb-3 font-medium">
                          {rec.description}
                        </p>
                        <div className="bg-secondary-100 dark:bg-secondary-600 rounded-lg p-3">
                          <p className="text-sm text-secondary-600 dark:text-secondary-300">
                            <strong>Analiz:</strong> {rec.reasoning}
                          </p>
                        </div>
                        <div className="mt-3">
                          <ProgressBar
                            value={rec.confidence}
                            color={getConfidenceColor(rec.confidence)}
                            label="Güven Seviyesi"
                            size="md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prediction Breakdown */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6">
                Detaylı Tahmin Analizi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
                    <i className="bi bi-trophy text-primary-500 text-4xl mb-4"></i>
                    <h5 className="font-bold text-lg text-secondary-900 dark:text-white mb-2">
                      Maç Sonucu
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Ev Sahibi:</span>
                        <span className="font-bold">%{analysis.aiPrediction.winner === 'home' ? analysis.aiPrediction.confidence : 100 - analysis.aiPrediction.confidence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beraberlik:</span>
                        <span className="font-bold">%{Math.round((100 - analysis.aiPrediction.confidence) / 3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deplasman:</span>
                        <span className="font-bold">%{analysis.aiPrediction.winner === 'away' ? analysis.aiPrediction.confidence : Math.round((100 - analysis.aiPrediction.confidence) / 2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <i className="bi bi-bullseye text-green-500 text-4xl mb-4"></i>
                    <h5 className="font-bold text-lg text-secondary-900 dark:text-white mb-2">
                      Gol Tahminleri
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Üst 2.5:</span>
                        <span className="font-bold">%{analysis.aiPrediction.goalsPrediction.over25}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alt 2.5:</span>
                        <span className="font-bold">%{analysis.aiPrediction.goalsPrediction.under25}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>İki Takım Gol:</span>
                        <span className="font-bold">%{analysis.aiPrediction.goalsPrediction.bothTeamsScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <i className="bi bi-calculator text-blue-500 text-4xl mb-4"></i>
                    <h5 className="font-bold text-lg text-secondary-900 dark:text-white mb-2">
                      Risk Analizi
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Güven:</span>
                        <span className="font-bold">%{analysis.aiPrediction.confidence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk:</span>
                        <span className={`font-bold ${analysis.aiPrediction.confidence >= 70 ? 'text-green-600' : analysis.aiPrediction.confidence >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {analysis.aiPrediction.confidence >= 70 ? 'Düşük' : analysis.aiPrediction.confidence >= 50 ? 'Orta' : 'Yüksek'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Önerilen Oran:</span>
                        <span className="font-bold">1.50+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert Analysis */}
            <Card className="p-6 bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-800 dark:to-primary-900/20">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 flex items-center">
                <i className="bi bi-person-check text-primary-500 mr-3"></i>
                Uzman Görüşü
              </h4>
              <div className="bg-white dark:bg-secondary-700 rounded-lg p-6 shadow-sm">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed text-lg">
                  {analysis.expertAnalysis}
                </p>
                <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-600">
                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <span>Analiz Tarihi: {formatDate(new Date().toISOString())}</span>
                    <span>Son Güncelleme: 2 saat önce</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Detailed Team Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-6 text-center flex items-center justify-center">
                  <img
                    src={analysis.match.homeTeamLogo}
                    alt={analysis.match.homeTeam}
                    crossOrigin="anonymous"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {analysis.match.homeTeam} İstatistikleri
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analysis.statistics.homeStats.won}
                      </div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">Galibiyet</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analysis.statistics.homeStats.drawn}
                      </div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">Beraberlik</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <ProgressBar
                      value={Math.round((analysis.statistics.homeStats.won / analysis.statistics.homeStats.played) * 100)}
                      label="Galibiyet Oranı"
                      color="green"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.homeStats.over25Games / analysis.statistics.homeStats.played) * 100)}
                      label="Üst 2.5 Gol Oranı"
                      color="blue"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.homeStats.bothTeamsScoreGames / analysis.statistics.homeStats.played) * 100)}
                      label="İki Takım Gol Oranı"
                      color="purple"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.homeStats.cleanSheets / analysis.statistics.homeStats.played) * 100)}
                      label="Temiz Çarşaf Oranı"
                      color="yellow"
                    />
                  </div>

                  <div className="pt-4 border-t border-secondary-200 dark:border-secondary-600">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Attığı Gol:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.homeStats.goalsFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Yediği Gol:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.homeStats.goalsAgainst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Ort. Attığı:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.homeStats.avgGoalsFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Ort. Yediği:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.homeStats.avgGoalsAgainst}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-6 text-center flex items-center justify-center">
                  <img
                    src={analysis.match.awayTeamLogo}
                    alt={analysis.match.awayTeam}
                    crossOrigin="anonymous"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {analysis.match.awayTeam} İstatistikleri
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analysis.statistics.awayStats.won}
                      </div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">Galibiyet</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analysis.statistics.awayStats.drawn}
                      </div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">Beraberlik</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <ProgressBar
                      value={Math.round((analysis.statistics.awayStats.won / analysis.statistics.awayStats.played) * 100)}
                      label="Galibiyet Oranı"
                      color="green"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.awayStats.over25Games / analysis.statistics.awayStats.played) * 100)}
                      label="Üst 2.5 Gol Oranı"
                      color="blue"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.awayStats.bothTeamsScoreGames / analysis.statistics.awayStats.played) * 100)}
                      label="İki Takım Gol Oranı"
                      color="purple"
                    />
                    <ProgressBar
                      value={Math.round((analysis.statistics.awayStats.cleanSheets / analysis.statistics.awayStats.played) * 100)}
                      label="Temiz Çarşaf Oranı"
                      color="yellow"
                    />
                  </div>

                  <div className="pt-4 border-t border-secondary-200 dark:border-secondary-600">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Attığı Gol:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.awayStats.goalsFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Yediği Gol:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.awayStats.goalsAgainst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Ort. Attığı:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.awayStats.avgGoalsFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Ort. Yediği:</span>
                        <span className="font-medium text-secondary-900 dark:text-white">{analysis.statistics.awayStats.avgGoalsAgainst}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Home vs Away Performance */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 text-center">
                Ev Sahibi vs Deplasman Performansı
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-secondary-900 dark:text-white mb-4 text-center">
                    {analysis.match.homeTeam} (Ev Sahibi)
                  </h5>
                  {analysis.statistics.homeStats.homeRecord && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600 dark:text-secondary-400">Oynanan</span>
                        <span className="font-bold text-secondary-900 dark:text-white">
                          {analysis.statistics.homeStats.homeRecord.played}
                        </span>
                      </div>
                      <ProgressBar
                        value={Math.round((analysis.statistics.homeStats.homeRecord.won / analysis.statistics.homeStats.homeRecord.played) * 100)}
                        label="Ev Sahibi Galibiyet Oranı"
                        color="green"
                      />
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                          <div className="font-bold text-green-600">{analysis.statistics.homeStats.homeRecord.won}</div>
                          <div className="text-xs text-secondary-500">G</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                          <div className="font-bold text-yellow-600">{analysis.statistics.homeStats.homeRecord.drawn}</div>
                          <div className="text-xs text-secondary-500">B</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                          <div className="font-bold text-red-600">{analysis.statistics.homeStats.homeRecord.lost}</div>
                          <div className="text-xs text-secondary-500">M</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-semibold text-secondary-900 dark:text-white mb-4 text-center">
                    {analysis.match.awayTeam} (Deplasman)
                  </h5>
                  {analysis.statistics.awayStats.awayRecord && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center"><span className="text-secondary-600 dark:text-secondary-400">Oynanan</span>
                        <span className="font-bold text-secondary-900 dark:text-white">
                          {analysis.statistics.awayStats.awayRecord.played}
                        </span>
                      </div>
                      <ProgressBar
                        value={Math.round((analysis.statistics.awayStats.awayRecord.won / analysis.statistics.awayStats.awayRecord.played) * 100)}
                        label="Deplasman Galibiyet Oranı"
                        color="blue"
                      />
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                          <div className="font-bold text-green-600">{analysis.statistics.awayStats.awayRecord.won}</div>
                          <div className="text-xs text-secondary-500">G</div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                          <div className="font-bold text-yellow-600">{analysis.statistics.awayStats.awayRecord.drawn}</div>
                          <div className="text-xs text-secondary-500">B</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                          <div className="font-bold text-red-600">{analysis.statistics.awayStats.awayRecord.lost}</div>
                          <div className="text-xs text-secondary-500">M</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'h2h' && (
          <div className="space-y-6">
            {/* Head to Head Summary */}
            <Card className="p-6">
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-6 text-center">
                Karşılıklı Geçmiş ({analysis.statistics.headToHead.totalGames} Maç)
              </h4>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {analysis.statistics.headToHead.homeWins}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                    {analysis.match.homeTeam}
                  </div>
                  <div className="text-xs text-secondary-500">
                    %{Math.round((analysis.statistics.headToHead.homeWins / analysis.statistics.headToHead.totalGames) * 100)}
                  </div>
                </div>
                <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">
                    {analysis.statistics.headToHead.draws}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                    Beraberlik
                  </div>
                  <div className="text-xs text-secondary-500">
                    %{Math.round((analysis.statistics.headToHead.draws / analysis.statistics.headToHead.totalGames) * 100)}
                  </div>
                </div>
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {analysis.statistics.headToHead.awayWins}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                    {analysis.match.awayTeam}
                  </div>
                  <div className="text-xs text-secondary-500">
                    %{Math.round((analysis.statistics.headToHead.awayWins / analysis.statistics.headToHead.totalGames) * 100)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Ortalama Gol"
                  value={analysis.statistics.headToHead.avgGoals.toFixed(1)}
                  icon="bi-bullseye"
                  color="green"
                  subtitle="Maç başına"
                />
                <StatCard
                  title="Üst 2.5 Gol"
                  value={`${analysis.statistics.headToHead.over25Games}/${analysis.statistics.headToHead.totalGames}`}
                  icon="bi-arrow-up"
                  color="blue"
                  subtitle={`%${Math.round((analysis.statistics.headToHead.over25Games / analysis.statistics.headToHead.totalGames) * 100)}`}
                />
                <StatCard
                  title="İki Takım Gol"
                  value={`${analysis.statistics.headToHead.bothTeamsScoreGames}/${analysis.statistics.headToHead.totalGames}`}
                  icon="bi-target"
                  color="purple"
                  subtitle={`%${Math.round((analysis.statistics.headToHead.bothTeamsScoreGames / analysis.statistics.headToHead.totalGames) * 100)}`}
                />
              </div>
            </Card>

            {/* Recent Games */}
            <Card className="p-6">
              <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-6">
                Son Karşılaşmalar
              </h4>
              <div className="space-y-3">
                {analysis.statistics.headToHead.recentGames.map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-center min-w-0">
                        <div className="text-sm font-medium text-secondary-900 dark:text-white">
                          {formatDate(game.date)}
                        </div>
                        <Badge variant="secondary" size="sm" className="mt-1">
                          {game.competition}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <span className="font-medium text-secondary-900 dark:text-white truncate">
                          {game.homeTeam}
                        </span>
                        <span className="text-secondary-400">vs</span>
                        <span className="font-medium text-secondary-900 dark:text-white truncate">
                          {game.awayTeam}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary-600">
                          {game.score}
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-6">
            {/* Add Comment */}
            <Card className="p-6">
              <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-4 flex items-center">
                <i className="bi bi-chat-square-text mr-2"></i>
                Yorum & Tahmin Paylaş
              </h4>
              <div className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Maç hakkındaki analizinizi, tahminlerinizi ve görüşlerinizi diğer kullanıcılarla paylaşın..."
                  className="w-full p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <select 
                      value={selectedBetType}
                      onChange={(e) => setSelectedBetType(e.target.value)}
                      className="px-3 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Tahminim Seç</option>
                      <option value="home">1 (Ev Sahibi Kazanır)</option>
                      <option value="draw">X (Beraberlik)</option>
                      <option value="away">2 (Deplasman Kazanır)</option>
                      <option value="over25">Üst 2.5 Gol</option>
                      <option value="under25">Alt 2.5 Gol</option>
                      <option value="btts">İki Takım da Gol Atar</option>
                      <option value="single">Tek Taraf Gol</option>
                    </select>
                    <select 
                      value={confidenceLevel}
                      onChange={(e) => setConfidenceLevel(e.target.value)}
                      className="px-3 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Güven Seviyesi</option>
                      <option value="very-high">Çok Yüksek (%80+)</option>
                      <option value="high">Yüksek (%60-80)</option>
                      <option value="medium">Orta (%40-60)</option>
                      <option value="low">Düşük (%20-40)</option>
                    </select>
                  </div>
                  <Button className="w-full sm:w-auto">
                    <i className="bi bi-send mr-2"></i>
                    Yorum Gönder
                  </Button>
                </div>
              </div>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
              {analysis.userComments.map((comment) => (
                <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      crossOrigin="anonymous"
                      className="w-12 h-12 rounded-full object-cover border-2 border-secondary-200 dark:border-secondary-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-secondary-900 dark:text-white">
                            {comment.user}
                          </span>
                          {comment.prediction && (
                            <Badge variant="primary" size="sm">
                              <i className="bi bi-bullseye mr-1"></i>
                              {comment.prediction}
                            </Badge>
                          )}
                          <Badge variant="secondary" size="sm">
                            <i className="bi bi-shield-check mr-1"></i>
                            Doğrulanmış
                          </Badge>
                        </div>
                        <span className="text-sm text-secondary-500">
                          {formatDate(comment.timestamp)} • {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-secondary-700 dark:text-secondary-300 mb-4 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-secondary-500 hover:text-red-500 transition-colors group">
                            <i className="bi bi-heart group-hover:bi-heart-fill"></i>
                            <span className="text-sm font-medium">{comment.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-secondary-500 hover:text-primary-500 transition-colors">
                            <i className="bi bi-reply"></i>
                            <span className="text-sm">Yanıtla</span>
                          </button>
                          <button className="flex items-center space-x-2 text-secondary-500 hover:text-blue-500 transition-colors">
                            <i className="bi bi-share"></i>
                            <span className="text-sm">Paylaş</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="bi bi-trophy text-yellow-500"></i>
                          <span className="text-sm text-secondary-500">Başarı: %78</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Comments */}
            <div className="text-center">
              <Button variant="outline" className="w-full sm:w-auto">
                <i className="bi bi-arrow-down-circle mr-2"></i>
                Daha Fazla Yorum Yükle
              </Button>
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-500">
          <div className="flex items-start space-x-4">
            <i className="bi bi-exclamation-triangle text-yellow-600 text-2xl mt-1 flex-shrink-0"></i>
            <div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">
                Önemli Uyarı ve Sorumluluk Reddi
              </h4>
              <div className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed space-y-2">
                <p>
                  <strong>Bu platform sadece bilgilendirme ve eğlence amaçlıdır.</strong> Sunulan analizler, tahminler ve öneriler kesinlikle yatırım tavsiyesi değildir.
                </p>
                <p>
                  Bahis oynamak bağımlılık yapabilir ve ciddi mali kayıplara neden olabilir. 18 yaşından küçüklerin bahis oynaması yasaktır.
                </p>
                <p>
                  <strong>Sorumlu bahis oynayın:</strong> Kaybetmeyi göze alamayacağınız miktarlarla bahis yapmayın. Bahis sadece eğlence amaçlı olmalıdır.
                </p>
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                    🆘 Bahis bağımlılığı için yardım: <a href="tel:08502220222" className="underline hover:no-underline">0850 222 0 222</a>
                  </p>
                  <p className="text-xs mt-1">
                    Yeşilay Danışma Merkezi - 7/24 ücretsiz destek hattı
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
