import { University } from '../../models/University';
import { Cutoff, ICutoff } from '../../models/Cutoff';
import { Placement } from '../../models/Placement';
import { Course } from '../../models/Course';

export interface RankPredictorInput {
  rank: number;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'PWD';
  gender: 'Male' | 'Female' | 'All';
  preferredBranch?: string;
  district?: string;
  collegeTypes?: string[];
  budget?: number;
  minPlacement?: number;
}

export interface RankPredictionResult {
  chance: 'High' | 'Medium' | 'Dream';
  college: {
    id: string;
    name: string;
    shortName: string;
    collegeCode: string;
    city: string;
    district: string;
    ownership: string;
    collegeType: string;
  };
  branch: string;
  closingRank: number;
  year: number;
  matchScore: number;
  placementRate?: number;
  averagePackage?: number;
  highestPackage?: number;
  fees?: number;
  naacGrade?: string;
  nirfRank?: number;
}

export interface RankPredictorResponse {
  highChance: RankPredictionResult[];
  mediumChance: RankPredictionResult[];
  dream: RankPredictionResult[];
  aiRecommendation: {
    bestCollege?: RankPredictionResult;
    alternative?: RankPredictionResult;
    safeOption?: RankPredictionResult;
    highestROI?: RankPredictionResult;
    bestPlacement?: RankPredictionResult;
  };
  totalColleges: number;
  matchSummary: {
    rank: number;
    category: string;
    gender: string;
    branch: string;
  };
}

/**
 * Maps user-friendly branch names to department codes used in Cutoff model
 */
function mapBranchToDepartment(preferredBranch?: string): string | undefined {
  if (!preferredBranch) return undefined;
  const branchMap: Record<string, string> = {
    'CSE': 'CSE',
    'Computer Science': 'CSE',
    'Computer Science & Engineering': 'CSE',
    'AI & ML': 'CSE',
    'Artificial Intelligence & Machine Learning': 'CSE',
    'AI & DS': 'CSE',
    'Artificial Intelligence & Data Science': 'CSE',
    'Data Science': 'CSE',
    'Cyber Security': 'CSE',
    'IT': 'CSE',
    'Information Technology': 'CSE',
    'ECE': 'ECE',
    'Electronics & Communication Engineering': 'ECE',
    'Electronics and Communication Engineering': 'ECE',
    'EEE': 'EEE',
    'Electrical & Electronics Engineering': 'EEE',
    'Electrical and Electronics Engineering': 'EEE',
    'ME': 'ME',
    'Mechanical Engineering': 'ME',
    'CE': 'CE',
    'Civil Engineering': 'CE',
    'CHE': 'CHE',
    'Chemical Engineering': 'CHE',
    'BT': 'BT',
    'Biotechnology': 'BT',
  };
  return branchMap[preferredBranch.trim()] || undefined;
}

function getMatchScore(studentRank: number, closingRank: number): number {
  if (closingRank <= 0) return 0;
  const ratio = studentRank / closingRank;
  if (ratio <= 0.7) return Math.round(95 + Math.random() * 5); // 95-100
  if (ratio <= 0.85) return Math.round(85 + Math.random() * 10); // 85-95
  if (ratio <= 1.0) return Math.round(75 + Math.random() * 10); // 75-85
  if (ratio <= 1.2) return Math.round(60 + Math.random() * 15); // 60-75
  if (ratio <= 1.5) return Math.round(40 + Math.random() * 20); // 40-60
  return Math.round(20 + Math.random() * 20); // 20-40
}

function classifyChance(studentRank: number, closingRank: number): 'High' | 'Medium' | 'Dream' {
  if (closingRank <= 0) return 'Dream';
  const ratio = studentRank / closingRank;
  if (ratio <= 0.85) return 'High';
  if (ratio <= 1.15) return 'Medium';
  return 'Dream';
}

export async function predictColleges(input: RankPredictorInput): Promise<RankPredictorResponse> {
  const { rank, category, gender, preferredBranch, district, collegeTypes, budget, minPlacement } = input;

  // Build query for cutoffs
  const cutoffQuery: any = {
    examName: 'TG EAPCET',
    year: { $gte: 2022 }, // Last 3 years of data
  };

  // Filter by category - map input to what Cutoff model uses
  const categoryMap: Record<string, string> = {
    'General': 'General',
    'OBC': 'OBC',
    'SC': 'SC',
    'ST': 'ST',
    'EWS': 'EWS',
    'PWD': 'PWD',
  };
  cutoffQuery.category = categoryMap[category] || 'General';

  // Filter by gender
  if (gender === 'Male' || gender === 'Female') {
    cutoffQuery.gender = { $in: [gender, 'All'] };
  }

  // Filter by branch if specified
  const department = mapBranchToDepartment(preferredBranch);
  if (department) {
    cutoffQuery.department = department;
  }

  // Get matching cutoffs
  const cutoffs = await Cutoff.find(cutoffQuery).sort({ year: -1, round: -1 }).lean();

  // Get unique university IDs from cutoffs
  const universityIds = [...new Set(cutoffs.map(c => c.universityId.toString()))];

  // Fetch universities with their details
  const universityFilter: any = {
    _id: { $in: universityIds },
    isVerified: true,
  };

  if (collegeTypes && collegeTypes.length > 0) {
    universityFilter.ownership = { $in: collegeTypes };
  }
  if (district) {
    universityFilter.district = { $regex: district, $options: 'i' };
  }

  const universities = await University.find(universityFilter).lean();
  const universityMap = new Map(universities.map(u => [u._id.toString(), u]));

  // Fetch placements for these universities
  const placements = await Placement.find({
    universityId: { $in: universityIds },
    batchYear: { $gte: 2023 },
  }).sort({ batchYear: -1 }).lean();

  const placementMap = new Map<string, any[]>();
  placements.forEach(p => {
    const key = p.universityId.toString();
    if (!placementMap.has(key)) placementMap.set(key, []);
    placementMap.get(key)!.push(p);
  });

  // Fetch courses for fee info
  const courses = await Course.find({
    universityId: { $in: universityIds },
    isActive: true,
  }).lean();

  const courseMap = new Map<string, any[]>();
  courses.forEach(c => {
    const key = c.universityId.toString();
    if (!courseMap.has(key)) courseMap.set(key, []);
    courseMap.get(key)!.push(c);
  });

  // Process and score each cutoff entry
  const results: RankPredictionResult[] = [];

  for (const cutoff of cutoffs) {
    const uniId = cutoff.universityId.toString();
    const uni = universityMap.get(uniId);
    if (!uni) continue;

    // Additional filters
    if (budget) {
      const uniCourses = courseMap.get(uniId) || [];
      const minFee = Math.min(...uniCourses.map(c => c.feeStructure?.tuitionFee || Infinity));
      if (minFee > budget) continue;
    }

    if (minPlacement) {
      const uniPlacements = placementMap.get(uniId) || [];
      const avgPlacement = uniPlacements.length > 0
        ? uniPlacements.reduce((sum, p) => sum + (p.placementRate || 0), 0) / uniPlacements.length
        : 0;
      if (avgPlacement < minPlacement) continue;
    }

    const matchScore = getMatchScore(rank, cutoff.closingRank);
    const chance = classifyChance(rank, cutoff.closingRank);

    // Get placement data for this university
    const uniPlacements = placementMap.get(uniId) || [];
    const avgPlacement = uniPlacements.length > 0
      ? uniPlacements.reduce((sum, p) => sum + (p.placementRate || 0), 0) / uniPlacements.length
      : undefined;
    const avgPackage = uniPlacements.length > 0
      ? uniPlacements.reduce((sum, p) => sum + (p.averagePackage || 0), 0) / uniPlacements.length
      : undefined;
    const highestPackage = uniPlacements.length > 0 ? uniPlacements[0].highestPackage : undefined;

    // Get fee info
    const uniCourses = courseMap.get(uniId) || [];
    const minFee = uniCourses.length > 0
      ? Math.min(...uniCourses.map(c => c.feeStructure?.tuitionFee || Infinity))
      : undefined;

    results.push({
      chance,
      college: {
        id: uni._id.toString(),
        name: uni.name,
        shortName: uni.shortName || uni.collegeCode || uni.name.substring(0, 8),
        collegeCode: uni.collegeCode || '',
        city: uni.city,
        district: uni.district || '',
        ownership: uni.ownership,
        collegeType: uni.collegeType,
      },
      branch: cutoff.department,
      closingRank: cutoff.closingRank,
      year: cutoff.year,
      matchScore,
      placementRate: avgPlacement ? Math.round(avgPlacement) : undefined,
      averagePackage: avgPackage ? Math.round(avgPackage / 100000) : undefined,
      highestPackage: highestPackage ? Math.round(highestPackage / 100000) : undefined,
      fees: minFee !== undefined && minFee !== Infinity ? minFee : undefined,
      naacGrade: uni.ranking?.naacGrade,
      nirfRank: uni.ranking?.nirf,
    });
  }

  // Sort by match score descending, then by year (most recent first)
  results.sort((a, b) => {
    if (a.chance !== b.chance) {
      const order = { High: 0, Medium: 1, Dream: 2 };
      return order[a.chance] - order[b.chance];
    }
    return b.matchScore - a.matchScore;
  });

  // Deduplicate - keep the best entry per college per branch
  const seen = new Set<string>();
  const dedupedResults: RankPredictionResult[] = [];
  for (const r of results) {
    const key = `${r.college.id}-${r.branch}`;
    if (!seen.has(key)) {
      seen.add(key);
      dedupedResults.push(r);
    }
  }

  // Classify into categories
  const highChance = dedupedResults.filter(r => r.chance === 'High').slice(0, 10);
  const mediumChance = dedupedResults.filter(r => r.chance === 'Medium').slice(0, 10);
  const dream = dedupedResults.filter(r => r.chance === 'Dream').slice(0, 10);

  // AI Recommendation
  const allSorted = [...highChance, ...mediumChance, ...dream];
  const aiRecommendation = {
    bestCollege: highChance[0],
    alternative: highChance[1] || mediumChance[0],
    safeOption: highChance.length > 0 ? highChance[highChance.length - 1] : mediumChance[0],
    highestROI: allSorted
      .filter(r => r.averagePackage && r.fees)
      .sort((a, b) => ((b.averagePackage || 0) - (b.fees || 0) / 100000) - ((a.averagePackage || 0) - (a.fees || 0) / 100000))[0],
    bestPlacement: allSorted
      .filter(r => r.placementRate)
      .sort((a, b) => (b.placementRate || 0) - (a.placementRate || 0))[0],
  };

  return {
    highChance,
    mediumChance,
    dream,
    aiRecommendation,
    totalColleges: dedupedResults.length,
    matchSummary: {
      rank,
      category,
      gender,
      branch: preferredBranch || 'All Branches',
    },
  };
}

