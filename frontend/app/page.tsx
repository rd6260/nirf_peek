import { loadCollegeData } from '@/lib/dataLoader';
import { calculateDashboardStats, groupByInstitute, calculateCollegeStats } from '@/lib/dataUtils';
import StatCard from '@/components/StatCard';
import { Trophy, TrendingUp, TrendingDown, Activity, Database } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CollegeCard from '@/components/CollegeCard';
import { CollegeStats } from '@/lib/types';

export default async function Home() {
  const data = await loadCollegeData();
  const dashboardStats = calculateDashboardStats(data);
  
  const grouped = groupByInstitute(data);
  const allColleges: CollegeStats[] = [];
  grouped.forEach((yearlyData, name) => {
    allColleges.push(calculateCollegeStats(name, yearlyData));
  });
  
  const topRanked = [...allColleges]
    .sort((a, b) => a.latestRank - b.latestRank)
    .slice(0, 10);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Explore Indian College Rankings
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive analytics and insights from NIRF rankings across {dashboardStats.yearsRange[1] - dashboardStats.yearsRange[0] + 1} years
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar colleges={allColleges} placeholder="Search for colleges..." />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Colleges"
            value={dashboardStats.totalColleges}
            icon={Database}
            color="primary"
          />
          <StatCard
            title="Data Points"
            value={dashboardStats.totalDataPoints}
            icon={Activity}
            color="secondary"
          />
          <StatCard
            title="Years Covered"
            value={`${dashboardStats.yearsRange[0]} - ${dashboardStats.yearsRange[1]}`}
            icon={Trophy}
            color="accent"
          />
          <StatCard
            title="Top Rank"
            value={topRanked[0]?.institute.split(' ')[0] || 'N/A'}
            subtitle={topRanked[0] ? `Rank ${topRanked[0].latestRank}` : ''}
            icon={Trophy}
            color="green"
          />
        </div>

        {/* Top Ranked Colleges */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Top Ranked Colleges</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {topRanked.map((college, index) => (
              <CollegeCard key={college.institute} college={college} rank={index + 1} />
            ))}
          </div>
        </section>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Movers */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-accent-green" />
              <h2 className="text-2xl font-bold text-foreground">Top Movers</h2>
            </div>
            <div className="space-y-3">
              {dashboardStats.topMovers.slice(0, 5).map((college) => (
                <CollegeCard key={college.institute} college={college} />
              ))}
            </div>
          </section>

          {/* Most Stable */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-6 w-6 text-accent-blue" />
              <h2 className="text-2xl font-bold text-foreground">Most Stable</h2>
            </div>
            <div className="space-y-3">
              {dashboardStats.mostStable.slice(0, 5).map((college) => (
                <CollegeCard key={college.institute} college={college} />
              ))}
            </div>
          </section>

          {/* Declining */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingDown className="h-6 w-6 text-accent-red" />
              <h2 className="text-2xl font-bold text-foreground">Needs Attention</h2>
            </div>
            <div className="space-y-3">
              {dashboardStats.bottomMovers.slice(0, 5).map((college) => (
                <CollegeCard key={college.institute} college={college} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}