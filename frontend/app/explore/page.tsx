'use client';

import { useEffect, useState } from 'react';
import { CollegeStats } from '@/lib/types';
import CollegeCard from '@/components/CollegeCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ExplorePage() {
  const [colleges, setColleges] = useState<CollegeStats[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<CollegeStats[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [rankRange, setRankRange] = useState<[number, number]>([1, 100]);
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [volatilityRange, setVolatilityRange] = useState<[number, number]>([0, 30]);
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'improvement' | 'volatility'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/colleges')
      .then(res => res.json())
      .then(data => {
        setColleges(data);
        setFilteredColleges(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...colleges];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.institute.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply rank range filter
    filtered = filtered.filter(c => 
      c.latestRank >= rankRange[0] && c.latestRank <= rankRange[1]
    );

    // Apply score range filter
    filtered = filtered.filter(c => 
      c.latestScore >= scoreRange[0] && c.latestScore <= scoreRange[1]
    );

    // Apply volatility range filter
    filtered = filtered.filter(c => 
      c.volatility >= volatilityRange[0] && c.volatility <= volatilityRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: number, bVal: number;
      
      switch (sortBy) {
        case 'rank':
          aVal = a.latestRank;
          bVal = b.latestRank;
          break;
        case 'score':
          aVal = a.latestScore;
          bVal = b.latestScore;
          break;
        case 'improvement':
          aVal = a.bestRank - a.latestRank;
          bVal = b.bestRank - b.latestRank;
          break;
        case 'volatility':
          aVal = a.volatility;
          bVal = b.volatility;
          break;
        default:
          aVal = a.latestRank;
          bVal = b.latestRank;
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    setFilteredColleges(filtered);
  }, [colleges, searchTerm, rankRange, scoreRange, volatilityRange, sortBy, sortOrder]);

  const resetFilters = () => {
    setSearchTerm('');
    setRankRange([1, 100]);
    setScoreRange([0, 100]);
    setVolatilityRange([0, 30]);
    setSortBy('rank');
    setSortOrder('asc');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Explore Colleges</h1>
            <p className="text-muted-foreground">Filter and discover colleges based on your preferences</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Filters</h2>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="College name..."
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Rank Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Rank Range: {rankRange[0]} - {rankRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={rankRange[0]}
                        onChange={(e) => setRankRange([Number(e.target.value), rankRange[1]])}
                        className="w-full accent-primary"
                      />
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={rankRange[1]}
                        onChange={(e) => setRankRange([rankRange[0], Number(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>

                  {/* Score Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Score Range: {scoreRange[0]} - {scoreRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={scoreRange[0]}
                        onChange={(e) => setScoreRange([Number(e.target.value), scoreRange[1]])}
                        className="w-full accent-secondary"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={scoreRange[1]}
                        onChange={(e) => setScoreRange([scoreRange[0], Number(e.target.value)])}
                        className="w-full accent-secondary"
                      />
                    </div>
                  </div>

                  {/* Volatility Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Volatility Range: {volatilityRange[0]} - {volatilityRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="0.1"
                        value={volatilityRange[0]}
                        onChange={(e) => setVolatilityRange([Number(e.target.value), volatilityRange[1]])}
                        className="w-full accent-accent"
                      />
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="0.1"
                        value={volatilityRange[1]}
                        onChange={(e) => setVolatilityRange([volatilityRange[0], Number(e.target.value)])}
                        className="w-full accent-accent"
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="rank">Rank</option>
                      <option value="score">Score</option>
                      <option value="improvement">Improvement</option>
                      <option value="volatility">Volatility</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Order
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortOrder('asc')}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                          sortOrder === 'asc'
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        Ascending
                      </button>
                      <button
                        onClick={() => setSortOrder('desc')}
                        className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                          sortOrder === 'desc'
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-semibold">{filteredColleges.length}</span> of <span className="text-foreground font-semibold">{colleges.length}</span> colleges
                </p>
              </div>

              <div className="space-y-4">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.institute} college={college} />
                ))}
              </div>

              {filteredColleges.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No colleges match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}