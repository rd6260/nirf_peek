import { NextResponse } from 'next/server';
import { loadCollegeData } from '@/lib/dataLoader';
import { groupByInstitute, calculateCollegeStats } from '@/lib/dataUtils';
import { CollegeStats } from '@/lib/types';

export async function GET() {
  try {
    const data = await loadCollegeData();
    const grouped = groupByInstitute(data);
    const allColleges: CollegeStats[] = [];
    
    grouped.forEach((yearlyData, name) => {
      allColleges.push(calculateCollegeStats(name, yearlyData));
    });
    
    return NextResponse.json(allColleges);
  } catch (error) {
    console.error('Error loading colleges:', error);
    return NextResponse.json({ error: 'Failed to load colleges' }, { status: 500 });
  }
}