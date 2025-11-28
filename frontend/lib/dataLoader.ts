import Papa from 'papaparse';
import { CollegeData } from './types';
import fs from 'fs';
import path from 'path';

export async function loadCollegeData(): Promise<CollegeData[]> {
  const filePath = path.join(process.cwd(), '..', 'data', 'master_nirf_cleaned_final.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const result = Papa.parse<Record<string, string | number>>(fileContent, {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });
  
  return result.data
    .filter(row => row.year && row.institute && row.rank)
    .map(row => ({
      year: Number(row.year),
      institute_original: String(row.institute_original || ''),
      institute_norm: String(row.institute_norm || ''),
      rank: Number(row.rank),
      score: Number(row.score),
      perception: Number(row.perception),
      institute: String(row.institute || ''),
      rank_prev: row.rank_prev && String(row.rank_prev).trim() ? Number(row.rank_prev) : null,
      score_prev: row.score_prev && String(row.score_prev).trim() ? Number(row.score_prev) : null,
      rank_change: row.rank_change && String(row.rank_change).trim() ? Number(row.rank_change) : null,
      score_change: row.score_change && String(row.score_change).trim() ? Number(row.score_change) : null,
      volatility: Number(row.volatility),
      perception_gap: Number(row.perception_gap),
    }));
}