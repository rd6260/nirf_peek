import { CollegeData, CollegeStats, DashboardStats } from './types';

export function groupByInstitute(data: CollegeData[]): Map<string, CollegeData[]> {
  const grouped = new Map<string, CollegeData[]>();
  
  data.forEach(row => {
    const key = row.institute;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(row);
  });
  
  return grouped;
}

export function calculateCollegeStats(name: string, yearlyData: CollegeData[]): CollegeStats {
  const sortedData = [...yearlyData].sort((a, b) => a.year - b.year);
  const latestData = sortedData[sortedData.length - 1];
  
  const ranks = sortedData.map(d => d.rank);
  const scores = sortedData.map(d => d.score);
  
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const bestRank = Math.min(...ranks);
  const worstRank = Math.max(...ranks);
  
  // Calculate trend
  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  if (sortedData.length >= 3) {
    const recentRanks = sortedData.slice(-3).map(d => d.rank);
    const avgRecent = recentRanks.reduce((a, b) => a + b, 0) / recentRanks.length;
    const olderRanks = sortedData.slice(0, -3).map(d => d.rank);
    const avgOlder = olderRanks.length > 0 ? olderRanks.reduce((a, b) => a + b, 0) / olderRanks.length : avgRecent;
    
    if (avgRecent < avgOlder - 5) trend = 'improving';
    else if (avgRecent > avgOlder + 5) trend = 'declining';
  }
  
  return {
    institute: name,
    latestYear: latestData.year,
    latestRank: latestData.rank,
    latestScore: latestData.score,
    bestRank,
    worstRank,
    avgScore,
    totalYears: sortedData.length,
    yearlyData: sortedData,
    trend,
    volatility: latestData.volatility,
  };
}

export function calculateDashboardStats(data: CollegeData[]): DashboardStats {
  const grouped = groupByInstitute(data);
  const allStats: CollegeStats[] = [];
  
  grouped.forEach((yearlyData, name) => {
    allStats.push(calculateCollegeStats(name, yearlyData));
  });
  
  const years = data.map(d => d.year);
  const yearsRange: [number, number] = [Math.min(...years), Math.max(...years)];
  
  // Top movers (most improved in rank)
  const withRankChange = allStats.filter(s => s.yearlyData.some(d => d.rank_change !== null));
  const topMovers = withRankChange
    .map(s => ({
      ...s,
      totalChange: s.bestRank - s.latestRank,
    }))
    .sort((a, b) => b.totalChange - a.totalChange)
    .slice(0, 10)
    .map(({ totalChange, ...rest }) => rest);
  
  // Bottom movers (most declined)
  const bottomMovers = withRankChange
    .map(s => ({
      ...s,
      totalChange: s.latestRank - s.bestRank,
    }))
    .sort((a, b) => b.totalChange - a.totalChange)
    .slice(0, 10)
    .map(({ totalChange, ...rest }) => rest);
  
  // Most stable (lowest volatility)
  const mostStable = allStats
    .filter(s => s.totalYears >= 3)
    .sort((a, b) => a.volatility - b.volatility)
    .slice(0, 10);
  
  return {
    totalColleges: grouped.size,
    totalDataPoints: data.length,
    yearsRange,
    topMovers,
    bottomMovers,
    mostStable,
  };
}

export function findSimilarColleges(target: CollegeStats, allStats: CollegeStats[], limit: number = 5): CollegeStats[] {
  // Similarity based on:
  // 1. Rank proximity (±20 ranks)
  // 2. Score similarity
  // 3. Volatility similarity
  
  const scored = allStats
    .filter(s => s.institute !== target.institute)
    .map(college => {
      const rankDiff = Math.abs(college.latestRank - target.latestRank);
      const scoreDiff = Math.abs(college.latestScore - target.latestScore);
      const volatilityDiff = Math.abs(college.volatility - target.volatility);
      
      // Lower score is better (more similar)
      const similarityScore = rankDiff * 0.5 + scoreDiff * 2 + volatilityDiff * 0.3;
      
      return { college, similarityScore };
    })
    .sort((a, b) => a.similarityScore - b.similarityScore)
    .slice(0, limit);
  
  return scored.map(s => s.college);
}

export function searchColleges(query: string, allStats: CollegeStats[]): CollegeStats[] {
  const lowerQuery = query.toLowerCase();
  return allStats.filter(s => s.institute.toLowerCase().includes(lowerQuery));
}

export function filterColleges(
  allStats: CollegeStats[],
  filters: {
    yearRange?: [number, number];
    rankRange?: [number, number];
    scoreRange?: [number, number];
    volatilityRange?: [number, number];
    searchTerm?: string;
  }
): CollegeStats[] {
  return allStats.filter(stat => {
    if (filters.searchTerm && !stat.institute.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filters.yearRange && stat.latestYear < filters.yearRange[0] || stat.latestYear > filters.yearRange[1]) {
      return false;
    }
    
    if (filters.rankRange && (stat.latestRank < filters.rankRange[0] || stat.latestRank > filters.rankRange[1])) {
      return false;
    }
    
    if (filters.scoreRange && (stat.latestScore < filters.scoreRange[0] || stat.latestScore > filters.scoreRange[1])) {
      return false;
    }
    
    if (filters.volatilityRange && (stat.volatility < filters.volatilityRange[0] || stat.volatility > filters.volatilityRange[1])) {
      return false;
    }
    
    return true;
  });
}