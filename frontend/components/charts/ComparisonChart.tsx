'use client';

import { CollegeData } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  data: CollegeData[];
  title?: string;
}

export default function ComparisonChart({ data, title }: ComparisonChartProps) {
  const chartData = [...data]
    .sort((a, b) => a.year - b.year)
    .map(d => ({
      year: d.year,
      score: d.score,
      perception: d.perception,
      gap: d.perception_gap,
    }));

  return (
    <div className="w-full h-80">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
          <Legend wrapperStyle={{ color: '#a1a1aa' }} />
          <Bar dataKey="score" name="Score" fill="#86efac" radius={[4, 4, 0, 0]} />
          <Bar dataKey="perception" name="Perception" fill="#93c5fd" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}