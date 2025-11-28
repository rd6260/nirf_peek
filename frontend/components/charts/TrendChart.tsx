'use client';

import { CollegeData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: CollegeData[];
  metric: 'rank' | 'score' | 'perception';
  title?: string;
}

export default function TrendChart({ data, metric, title }: TrendChartProps) {
  const chartData = [...data].sort((a, b) => a.year - b.year);

  const metricConfig = {
    rank: {
      key: 'rank',
      name: 'Rank',
      color: '#a78bfa',
      reversed: true,
    },
    score: {
      key: 'score',
      name: 'Score',
      color: '#86efac',
      reversed: false,
    },
    perception: {
      key: 'perception',
      name: 'Perception',
      color: '#93c5fd',
      reversed: false,
    },
  };

  const config = metricConfig[metric];

  return (
    <div className="w-full h-80">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
          <XAxis 
            dataKey="year" 
            stroke="#a1a1aa"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#a1a1aa"
            style={{ fontSize: '12px' }}
            reversed={config.reversed}
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
          <Legend 
            wrapperStyle={{ color: '#a1a1aa' }}
          />
          <Line 
            type="monotone" 
            dataKey={config.key} 
            name={config.name}
            stroke={config.color} 
            strokeWidth={3}
            dot={{ fill: config.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}