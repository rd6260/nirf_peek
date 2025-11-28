'use client';

import { CollegeStats } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CollegeCardProps {
  college: CollegeStats;
  rank?: number;
}

export default function CollegeCard({ college, rank }: CollegeCardProps) {
  const router = useRouter();
  const slug = college.institute.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const trendColors = {
    improving: 'text-accent-green',
    declining: 'text-accent-red',
    stable: 'text-accent-blue',
  };

  const TrendIcon = college.trend === 'improving' ? TrendingUp : college.trend === 'declining' ? TrendingDown : Minus;

  return (
    <button
      onClick={() => router.push(`/college/${slug}`)}
      className="w-full bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        {rank !== undefined && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">#{rank}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-2">
            {college.institute}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
            <span className="text-muted-foreground">
              Rank: <span className="text-foreground font-medium">{college.latestRank}</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Score: <span className="text-foreground font-medium">{college.latestScore.toFixed(2)}</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <div className={`flex items-center gap-1 ${trendColors[college.trend]}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="font-medium capitalize">{college.trend}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>Volatility: {college.volatility.toFixed(2)}</span>
            <span>•</span>
            <span>{college.totalYears} years of data</span>
          </div>
        </div>
      </div>
    </button>
  );
}