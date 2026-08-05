import type { University } from './university';

export interface AIRecommendation {
  universityId: string;
  universityName: string;
  matchScore: number;
  estimatedAdmissionChance: number;
  scholarshipSuggestions: string[];
  careerRoadmap: string[];
  reasons: string[];
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

export interface AdmissionPrediction {
  admissionProbability: number;
  safeColleges: University[];
  moderateColleges: University[];
  dreamColleges: University[];
}

export interface CareerSuggestion {
  career: string;
  matchScore: number;
  requiredSkills: string[];
  averageSalary: number;
  growthOutlook: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
}

export interface SalaryPrediction {
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
}

export interface CareerGuidance {
  careerSuggestions: CareerSuggestion[];
  skillGapAnalysis: SkillGap[];
  salaryPrediction: SalaryPrediction;
  learningRoadmap: string[];
}
