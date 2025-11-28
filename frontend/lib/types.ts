export interface CollegeData {
  year: number;
  institute_original: string;
  institute_norm: string;
  rank: number;
  score: number;
  perception: number;
  institute: string;
  rank_prev: number | null;
  score_prev: number | null;
  rank_change: number | null;
  score_change: number | null;
  volatility: number;
  perception_gap: number;
}

export interface CollegeStats {
  institute: string;
  latestYear: number;
  latestRank: number;
  latestScore: number;
  bestRank: number;
  worstRank: number;
  avgScore: number;
  totalYears: number;
  yearlyData: CollegeData[];
  trend: 'improving' | 'declining' | 'stable';
  volatility: number;
}

export interface DashboardStats {
  totalColleges: number;
  totalDataPoints: number;
  yearsRange: [number, number];
  topMovers: CollegeStats[];
  bottomMovers: CollegeStats[];
  mostStable: CollegeStats[];
}

export interface FilterOptions {
  yearRange: [number, number];
  rankRange: [number, number];
  scoreRange: [number, number];
  volatilityRange: [number, number];
  searchTerm: string;
  sortBy: 'rank' | 'score' | 'improvement' | 'volatility';
  sortOrder: 'asc' | 'desc';
}