import { Request, Response } from 'express';
import { University } from '../models/University';
import { Scholarship } from '../models/Scholarship';
import { predictColleges, RankPredictorInput } from '../services/ai/rankPredictorService';

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { academicScore, entranceScore, budget, preferredLocation, preferredCourses, careerGoal, skills } = req.body;
    let universities = await University.find({ isVerified: true }).limit(50);
    const scored = universities.map((u) => {
      let score = 0;
      if (u.ranking.nirf && u.ranking.nirf < 100) score += 30;
      if (u.ranking.naacGrade?.startsWith('A')) score += 20;
      if (u.ranking.qs && u.ranking.qs < 500) score += 15;
      if (budget) {
        score += 10;
      }
      if (preferredLocation && (u.state === preferredLocation || u.city === preferredLocation)) score += 15;
      return { university: u, matchScore: Math.min(100, score + Math.floor(Math.random() * 20)), reasons: [] };
    });
    scored.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ success: true, data: scored.slice(0, 10) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const predictAdmission = async (req: Request, res: Response) => {
  try {
    const { tenthMarks, twelfthMarks, ugCGPA, entranceScore, reservation, category, workExperience } = req.body;
    const academicScore = ((tenthMarks || 0) * 0.2 + (twelfthMarks || 0) * 0.3 + (ugCGPA || 0) * 10 * 0.3 + (entranceScore || 0) * 0.2);
    const universities = await University.find({ isVerified: true }).limit(30);
    const scored = universities.map((u) => {
      let prob = 50;
      if (u.ranking.nirf && u.ranking.nirf < 50) prob -= 20;
      else if (u.ranking.nirf && u.ranking.nirf < 200) prob -= 10;
      else prob += 10;
      if (academicScore > 85) prob += 15;
      else if (academicScore > 70) prob += 5;
      if (reservation && reservation !== 'general') prob += 10;
      prob = Math.min(98, Math.max(5, prob));
      return { university: u, probability: prob };
    });
    const safe = scored.filter((s) => s.probability > 70).slice(0, 3);
    const moderate = scored.filter((s) => s.probability > 40 && s.probability <= 70).slice(0, 3);
    const dream = scored.filter((s) => s.probability <= 40).slice(0, 3);
    const avgProb = scored.reduce((sum, s) => sum + s.probability, 0) / scored.length;
    res.json({
      success: true,
      data: { admissionProbability: Math.round(avgProb), safeColleges: safe, moderateColleges: moderate, dreamColleges: dream },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getScholarshipMatches = async (req: Request, res: Response) => {
  try {
    const { income, category, gender, state, marks, disability, sports } = req.body;
    const scholarships = await Scholarship.find({ isActive: true });
    const matched = scholarships.filter((s) => {
      const e = s.eligibility;
      if (income && e.maxIncome && Number(income) > e.maxIncome) return false;
      if (category && e.category && e.category !== category) return false;
      if (gender && e.gender && e.gender !== gender) return false;
      if (state && e.state && e.state !== state) return false;
      if (marks && e.minMarks && Number(marks) < e.minMarks) return false;
      if (disability === false && e.disability) return false;
      if (sports === false && e.sports) return false;
      return true;
    });
    res.json({ success: true, data: matched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const lower = message.toLowerCase();
    let response = '';
    if (lower.includes('hello') || lower.includes('hi')) response = 'Hello! How can I help you with your education journey today?';
    else if (lower.includes('best college') || lower.includes('best university')) response = 'Based on rankings, IIT Bombay, IIT Delhi, and IIT Madras are top choices. Would you like recommendations based on your profile?';
    else if (lower.includes('scholarship')) response = 'We have various scholarships available. Check our Scholarships page or tell me your eligibility criteria.';
    else if (lower.includes('admission') || lower.includes('deadline')) response = 'Admission deadlines vary by university. Most IITs have applications in June. Use our Admission Predictor for personalized analysis.';
    else if (lower.includes('placement') || lower.includes('package')) response = 'Top universities have average packages of ₹20-30 LPA. IITs lead with highest packages exceeding ₹1 Cr.';
    else if (lower.includes('career') || lower.includes('job')) response = 'Explore our Career Guidance page for AI-powered career suggestions, skill gap analysis, and learning roadmaps!';
    else if (lower.includes('compare')) response = 'Use our Compare page to compare up to 4 universities across fees, placements, rankings, and more!';
    else response = 'I can help with university recommendations, admissions, scholarships, placements, and career guidance. Could you be more specific?';
    res.json({ success: true, data: { message: response } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const predictByRank = async (req: Request, res: Response) => {
  try {
    const { rank, category, gender, preferredBranch, district, collegeTypes, budget, minPlacement } = req.body;

    if (!rank || !category || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Rank, category, and gender are required fields',
      });
    }

    const input: RankPredictorInput = {
      rank: Number(rank),
      category: category as RankPredictorInput['category'],
      gender: gender as RankPredictorInput['gender'],
      preferredBranch,
      district,
      collegeTypes,
      budget: budget ? Number(budget) : undefined,
      minPlacement: minPlacement ? Number(minPlacement) : undefined,
    };

    const result = await predictColleges(input);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Rank prediction error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCareerGuidance = async (req: Request, res: Response) => {
  try {
    const { skills, interests, education } = req.body;
    res.json({
      success: true,
      data: {
        careerSuggestions: [
          { career: 'Data Scientist', matchScore: 92, requiredSkills: ['Python', 'ML', 'Statistics'], averageSalary: '₹25 LPA', growthOutlook: 'Very High' },
          { career: 'AI/ML Engineer', matchScore: 88, requiredSkills: ['Python', 'TensorFlow', 'NLP'], averageSalary: '₹28 LPA', growthOutlook: 'Very High' },
          { career: 'Software Engineer', matchScore: 85, requiredSkills: ['DSA', 'System Design', 'Any Language'], averageSalary: '₹20 LPA', growthOutlook: 'High' },
        ],
        skillGapAnalysis: [
          { skill: 'Python', currentLevel: 3, requiredLevel: 5 },
          { skill: 'Machine Learning', currentLevel: 2, requiredLevel: 5 },
          { skill: 'Statistics', currentLevel: 3, requiredLevel: 4 },
        ],
        learningRoadmap: ['Learn Python basics', 'Master ML algorithms', 'Build portfolio projects', 'Kaggle competitions', 'Industry internship'],
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
