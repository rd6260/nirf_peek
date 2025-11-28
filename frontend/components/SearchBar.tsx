'use client';

import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CollegeStats } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  colleges: CollegeStats[];
  placeholder?: string;
}

export default function SearchBar({ colleges, placeholder = 'Search colleges...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [filteredColleges, setFilteredColleges] = useState<CollegeStats[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim()) {
      const filtered = colleges
        .filter(c => c.institute.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);
      setFilteredColleges(filtered);
      setShowDropdown(true);
    } else {
      setFilteredColleges([]);
      setShowDropdown(false);
    }
  }, [query, colleges]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (college: CollegeStats) => {
    const slug = college.institute.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/college/${slug}`);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      {showDropdown && filteredColleges.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {filteredColleges.map((college) => (
            <button
              key={college.institute}
              onClick={() => handleSelect(college)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="font-medium text-foreground">{college.institute}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Rank {college.latestRank} • Score {college.latestScore.toFixed(2)} • {college.latestYear}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}