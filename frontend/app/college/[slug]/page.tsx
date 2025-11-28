import { loadCollegeData } from '@/lib/dataLoader';
import { groupByInstitute, calculateCollegeStats, findSimilarColleges } from '@/lib/dataUtils';
import { notFound } from 'next/navigation';
import { TrendingUp, TrendingDown, Minus, Award, BarChart3, Activity } from 'lucide-react';
import TrendChart from '@/components/charts/TrendChart';
import ComparisonChart from '@/components/charts/ComparisonChart';
import PerformanceChart from '@/components/charts/PerformanceChart';
import CollegeCard from '@/components/CollegeCard';
import StatCard from '@/components/StatCard';
import { CollegeStats } from '@/lib/types';

export default async function CollegePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await loadCollegeData();
  const grouped = groupByInstitute(data);
  
  // Find college by slug
  let targetCollege: CollegeStats | null = null;
  let targetData: typeof data = [];
  
  for (const [name, yearlyData] of grouped.entries()) {
    const collegeSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (collegeSlug === slug) {
      targetCollege = calculateCollegeStats(name, yearlyData);
      targetData = yearlyData;
      break;
    }
  }
  
  if (!targetCollege) {
    notFound();
  }
  
  // Get all colleges for similarity
  const allColleges: CollegeStats[] = [];
  grouped.forEach((yearlyData, name) => {
    allColleges.push(calculateCollegeStats(name, yearlyData));
  });
  
  const similarColleges = findSimilarColleges(targetCollege, allColleges, 5);
  
  const TrendIcon = targetCollege.trend === 'improving' ? TrendingUp : 
                    targetCollege.trend === 'declining' ? TrendingDown : Minus;
  
  const trendColors = {
    improving: 'text-accent-green bg-accent-green/10 border-accent-green/20',
    declining: 'text-accent-red bg-accent-red/10 border-accent-red/20',
    stable: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl border ${trendColors[targetCollege.trend]}`}>
                <TrendIcon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {targetCollege.institute}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span>Current Rank: <span className="text-foreground font-semibold">#{targetCollege.latestRank}</span></span>
                  <span>•</span>
                  <span>Score: <span className="text-foreground font-semibold">{targetCollege.latestScore.toFixed(2)}</span></span>
                  <span>•</span>
                  <span className="capitalize">{targetCollege.trend} trend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Latest Rank"
              value={`#${targetCollege.latestRank}`}
              subtitle={`Year ${targetCollege.latestYear}`}
              icon={Award}
              color="primary"
            />
            <StatCard
              title="Best Rank"
              value={`#${targetCollege.bestRank}`}
              subtitle="All-time best"
              icon={TrendingUp}
              color="green"
            />
            <StatCard
              title="Average Score"
              value={targetCollege.avgScore.toFixed(2)}
              subtitle={`Over ${targetCollege.totalYears} years`}
              icon={BarChart3}
              color="secondary"
            />
            <StatCard
              title="Volatility"
              value={targetCollege.volatility.toFixed(2)}
              subtitle="Stability indicator"
              icon={Activity}
              color="accent"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <TrendChart 
                data={targetData} 
                metric="rank" 
                title="Rank Progression Over Time"
              />
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <TrendChart 
                data={targetData} 
                metric="score" 
                title="Score Progression Over Time"
              />
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <ComparisonChart 
                data={targetData} 
                title="Score vs Perception Comparison"
              />
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <PerformanceChart 
                data={targetData} 
                title="Year-over-Year Rank Changes"
              />
            </div>
          </div>

          {/* Detailed Stats Table */}
          <div className="bg-card border border-border rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Historical Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Year</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rank</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Perception</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rank Change</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score Change</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Volatility</th>
                  </tr>
                </thead>
                <tbody>
                  {[...targetData].sort((a, b) => b.year - a.year).map((row) => (
                    <tr key={row.year} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{row.year}</td>
                      <td className="py-3 px-4 text-foreground">#{row.rank}</td>
                      <td className="py-3 px-4 text-foreground">{row.score.toFixed(2)}</td>
                      <td className="py-3 px-4 text-foreground">{row.perception.toFixed(2)}</td>
                      <td className={`py-3 px-4 font-medium ${
                        row.rank_change && row.rank_change > 0 ? 'text-accent-green' :
                        row.rank_change && row.rank_change < 0 ? 'text-accent-red' : 'text-muted-foreground'
                      }`}>
                        {row.rank_change !== null ? (row.rank_change > 0 ? `+${row.rank_change}` : row.rank_change) : '-'}
                      </td>
                      <td className={`py-3 px-4 font-medium ${
                        row.score_change && row.score_change > 0 ? 'text-accent-green' :
                        row.score_change && row.score_change < 0 ? 'text-accent-red' : 'text-muted-foreground'
                      }`}>
                        {row.score_change !== null ? (row.score_change > 0 ? `+${row.score_change.toFixed(2)}` : row.score_change.toFixed(2)) : '-'}
                      </td>
                      <td className="py-3 px-4 text-foreground">{row.volatility.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Similar Colleges */}
          {similarColleges.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Similar Colleges</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {similarColleges.map((college) => (
                  <CollegeCard key={college.institute} college={college} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}