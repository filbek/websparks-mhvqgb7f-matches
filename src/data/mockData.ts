import { Match, MatchAnalysis, DailyBulletin, TeamStats, HeadToHeadStats } from '../types';

export const todaysBulletin: DailyBulletin = {
  date: '2024-01-20',
  totalMatches: 12,
  featuredMatches: ['1', '2', '3'],
  matches: [
    {
      id: '1',
      homeTeam: 'Galatasaray',
      awayTeam: 'Fenerbahçe',
      homeTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      awayTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      kickoffTime: '2024-01-20T19:00:00Z',
      league: 'Süper Lig',
      stadium: 'Türk Telekom Stadyumu',
      slug: 'galatasaray-vs-fenerbahce',
      status: 'upcoming',
      odds: {
        home: 2.10,
        draw: 3.40,
        away: 3.20,
        over25: 1.65,
        under25: 2.15,
        bothTeamsScore: 1.75
      }
    },
    {
      id: '2',
      homeTeam: 'Beşiktaş',
      awayTeam: 'Trabzonspor',
      homeTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      awayTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      kickoffTime: '2024-01-20T16:00:00Z',
      league: 'Süper Lig',
      stadium: 'Vodafone Park',
      slug: 'besiktas-vs-trabzonspor',
      status: 'upcoming',
      odds: {
        home: 1.85,
        draw: 3.60,
        away: 4.20,
        over25: 1.70,
        under25: 2.05,
        bothTeamsScore: 1.80
      }
    },
    {
      id: '3',
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      awayTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      kickoffTime: '2024-01-20T21:00:00Z',
      league: 'La Liga',
      stadium: 'Camp Nou',
      slug: 'barcelona-vs-real-madrid',
      status: 'upcoming',
      odds: {
        home: 2.45,
        draw: 3.20,
        away: 2.80,
        over25: 1.55,
        under25: 2.35,
        bothTeamsScore: 1.65
      }
    },
    {
      id: '4',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      homeTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      awayTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      kickoffTime: '2024-01-20T17:30:00Z',
      league: 'Premier League',
      stadium: 'Etihad Stadium',
      slug: 'manchester-city-vs-liverpool',
      status: 'upcoming',
      odds: {
        home: 2.20,
        draw: 3.50,
        away: 3.10,
        over25: 1.60,
        under25: 2.25,
        bothTeamsScore: 1.70
      }
    },
    {
      id: '5',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      awayTeamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=50&h=50&fit=crop',
      kickoffTime: '2024-01-20T18:30:00Z',
      league: 'Bundesliga',
      stadium: 'Allianz Arena',
      slug: 'bayern-munich-vs-borussia-dortmund',
      status: 'upcoming',
      odds: {
        home: 1.75,
        draw: 3.80,
        away: 4.50,
        over25: 1.50,
        under25: 2.45,
        bothTeamsScore: 1.85
      }
    }
  ]
};

export const sampleAnalysis: MatchAnalysis = {
  id: '1',
  match: todaysBulletin.matches[0],
  aiPrediction: {
    winner: 'home',
    confidence: 68,
    scorePrediction: '2-1',
    goalsPrediction: {
      over25: 72,
      under25: 28,
      bothTeamsScore: 65
    },
    recommendations: [
      {
        type: 'bet',
        market: 'Galatasaray Kazanır',
        description: 'Ev sahibi avantajı ve form durumu',
        confidence: 68,
        reasoning: 'Galatasaray son 5 maçta 4 galibiyet aldı ve ev sahibi olarak güçlü performans sergiliyor.'
      },
      {
        type: 'value',
        market: 'Üst 2.5 Gol',
        description: 'Her iki takım da ofansif oyun sergiliyor',
        confidence: 72,
        reasoning: 'Son karşılaşmalarda ortalama 3.2 gol atılıyor ve her iki takım da gol atmada etkili.'
      },
      {
        type: 'bet',
        market: 'İki Takım da Gol Atar',
        description: 'Savunma zafiyetleri mevcut',
        confidence: 65,
        reasoning: 'Her iki takım da son maçlarda savunma hatası yapıyor ve gol yeme eğiliminde.'
      }
    ]
  },
  statistics: {
    homeStats: {
      played: 20,
      won: 14,
      drawn: 3,
      lost: 3,
      goalsFor: 42,
      goalsAgainst: 18,
      avgGoalsFor: 2.1,
      avgGoalsAgainst: 0.9,
      cleanSheets: 8,
      failedToScore: 2,
      over25Games: 14,
      under25Games: 6,
      bothTeamsScoreGames: 12,
      homeRecord: {
        played: 10,
        won: 8,
        drawn: 1,
        lost: 1
      }
    },
    awayStats: {
      played: 20,
      won: 13,
      drawn: 4,
      lost: 3,
      goalsFor: 38,
      goalsAgainst: 20,
      avgGoalsFor: 1.9,
      avgGoalsAgainst: 1.0,
      cleanSheets: 6,
      failedToScore: 3,
      over25Games: 13,
      under25Games: 7,
      bothTeamsScoreGames: 11,
      awayRecord: {
        played: 10,
        won: 6,
        drawn: 2,
        lost: 2
      }
    },
    headToHead: {
      totalGames: 10,
      homeWins: 4,
      draws: 3,
      awayWins: 3,
      avgGoals: 3.2,
      over25Games: 7,
      bothTeamsScoreGames: 6,
      recentGames: [
        {
          date: '2023-12-10',
          homeTeam: 'Fenerbahçe',
          awayTeam: 'Galatasaray',
          score: '1-0',
          competition: 'Süper Lig'
        },
        {
          date: '2023-05-28',
          homeTeam: 'Galatasaray',
          awayTeam: 'Fenerbahçe',
          score: '2-1',
          competition: 'Süper Lig'
        },
        {
          date: '2022-12-26',
          homeTeam: 'Galatasaray',
          awayTeam: 'Fenerbahçe',
          score: '1-1',
          competition: 'Süper Lig'
        }
      ]
    }
  },
  liveData: {
    homeForm: 'WWDWL',
    awayForm: 'WLWWW',
    injuries: [
      {
        name: 'Sergio Oliveira',
        position: 'Orta Saha',
        severity: 'major',
        expectedReturn: '2024-02-15'
      }
    ],
    suspensions: [
      {
        name: 'Lucas Torreira',
        position: 'Orta Saha',
        reason: 'Sarı kart cezası'
      }
    ],
    weather: {
      condition: 'Açık',
      temperature: 12,
      humidity: 65,
      windSpeed: 8
    }
  },
  expertAnalysis: 'Bu derbi maçında Galatasaray ev sahibi avantajını kullanarak üstünlük kurmaya çalışacak. Fenerbahçe ise son haftalardaki iyi formunu sürdürmeye odaklanacak. Her iki takım da ofansif oyun sergileme eğiliminde olduğu için gollü bir maç bekleniyor.',
  userComments: [
    {
      id: '1',
      user: 'Futbol Analisti',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: 'Galatasaray\'ın ev sahibi performansı çok güçlü. Kesinlikle 1 oynayacağım.',
      timestamp: '2024-01-20T10:30:00Z',
      likes: 24,
      prediction: 'Galatasaray Kazanır'
    },
    {
      id: '2',
      user: 'İddaa Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      content: 'Her iki takım da gol atar seçeneği çok mantıklı. Son 5 karşılaşmada 4 kez gerçekleşti.',
      timestamp: '2024-01-20T11:15:00Z',
      likes: 18,
      prediction: 'İki Takım da Gol Atar'
    }
  ]
};
