import Papa from 'papaparse';
import { CollegeData } from './types';
import fs from 'fs';
import path from 'path';

export async function loadCollegeData(): Promise<CollegeData[]> {
  const filePath = path.join(process.cwd(), '..', 'data', 'master_nirf_cleaned_final.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const result = Papa.parse<CollegeData>(fileContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });
  
  return result.data.map(row => ({
    ...row,
    year: Number(row.year),
    rank: Number(row.rank),
    score: Number(row.score),
    perception: Number(row.perception),
    volatility: Number(row.volatility),
    perception_gap: Number(row.perception_gap),
    rank_prev: row.rank_prev ? Number(row.rank_prev) : null,
    score_prev: row.score_prev ? Number(row.score_prev) : null,
    rank_change: row.rank_change ? Number(row.rank_change) : null,
    score_change: row.score_change ? Number(row.score_change) : null,
  }));
}