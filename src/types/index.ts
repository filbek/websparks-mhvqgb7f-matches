export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  kickoffTime: string;
  league: string;
  stadium: string;
  slug: string;
  status: 'upcoming' | 'live' | 'finished';
  odds?: {
    home: number;
    draw: number;
    away: number;
    over25: number;
    under25: number;
    bothTeamsScore: number;
  };
}

export interface MatchAnalysis {
  id: string;
  match: Match;
  aiPrediction: {
    winner: 'home' | 'draw' | 'away';
    confidence: number;
    scorePrediction: string;
    goalsPrediction: {
      over25: number;
      under25: number;
      bothTeamsScore: number;
    };
    recommendations: Recommendation[];
  };
  statistics: {
    homeStats: TeamStats;
    awayStats: TeamStats;
    headToHead: HeadToHeadStats;
  };
  liveData: {
    homeForm: string;
    awayForm: string;
    injuries: PlayerInjury[];
    suspensions: PlayerSuspension[];
    weather?: WeatherInfo;
  };
  expertAnalysis: string;
  userComments: Comment[];
}

export interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  avgGoalsFor: number;
  avgGoalsAgainst: number;
  cleanSheets: number;
  failedToScore: number;
  over25Games: number;
  under25Games: number;
  bothTeamsScoreGames: number;
  homeRecord?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
  awayRecord?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
}

export interface HeadToHeadStats {
  totalGames: number;
  homeWins: number;
  draws: number;
  awayWins: number;
  avgGoals: number;
  over25Games: number;
  bothTeamsScoreGames: number;
  recentGames: RecentGame[];
}

export interface RecentGame {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  competition: string;
}

export interface PlayerInjury {
  name: string;
  position: string;
  severity: 'minor' | 'major' | 'doubtful';
  expectedReturn?: string;
}

export interface PlayerSuspension {
  name: string;
  position: string;
  reason: string;
}

export interface WeatherInfo {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface Recommendation {
  type: 'bet' | 'avoid' | 'value';
  market: string;
  description: string;
  confidence: number;
  reasoning: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  prediction?: string;
}

export interface DailyBulletin {
  date: string;
  matches: Match[];
  featuredMatches: string[];
  totalMatches: number;
}
