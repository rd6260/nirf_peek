'use client';

import { CollegeData } from '@/lib/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: CollegeData[];
  title?: string;
}

export default function PerformanceChart({ data, title }: PerformanceChartProps) {
  const chartData = [...data]
    .sort((a, b) => a.year - b.year)
    .map(d => ({
      year: d.year,
      rankChange: d.rank_change || 0,
      scoreChange: d.score_change || 0,
    }));

  return (
    <div className="w-full h-80">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRankChange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorScoreChange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f0abfc" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f0abfc" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
          <XAxis 
            dataKey="year" 
            stroke="#a1a1aa"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#a1a1aa"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1a1a24',
              border: '1px solid #27273a',
              borderRadius: '8px',
              color: '#e4e4e7'
            }}
            labelStyle={{ color: '#a1a1aa' }}
          />
          <Area 
            type="monotone" 
            dataKey="rankChange" 
            name="Rank Change"
            stroke="#a78bfa" 
            strokeWidth={2}
            fill="url(#colorRankChange)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}