import { Request, Response } from 'express';
import { University } from '../models/University';
import { Course } from '../models/Course';

export const compareUniversities = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length < 2 || ids.length > 4) {
      return res.status(400).json({ success: false, message: 'Compare 2-4 universities' });
    }
    const universities = await University.find({ _id: { $in: ids }, isVerified: true }).lean();
    const courses = await Course.find({ universityId: { $in: ids }, isActive: true }).lean();
    const enriched = universities.map((u) => ({
      ...u,
      courses: courses.filter((c) => c.universityId.toString() === u._id.toString()),
    }));
    const comparison = {
      fees: enriched.map((u) => ({ id: u._id, name: u.name })),
      rankings: enriched.map((u) => ({ id: u._id, name: u.name, nirf: u.ranking?.nirf, qs: u.ranking?.qs, naac: u.ranking?.naacGrade })),
      placements: enriched.map((u) => ({ id: u._id, name: u.name })),
      summary: enriched.map((u) => ({
        id: u._id, name: u.name, totalCourses: u.courses?.length || 0,
        facilities: u.facilities?.length || 0, score: calculateScore(u),
      })),
    };
    res.json({ success: true, data: comparison });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function calculateScore(u: any): number {
  let score = 0;
  if (u.ranking?.nirf && u.ranking.nirf < 10) score += 30;
  else if (u.ranking?.nirf && u.ranking.nirf < 50) score += 20;
  else if (u.ranking?.nirf) score += 10;
  if (u.ranking?.naacGrade?.startsWith('A++')) score += 25;
  else if (u.ranking?.naacGrade?.startsWith('A+')) score += 20;
  else if (u.ranking?.naacGrade?.startsWith('A')) score += 15;
  score += Math.min(u.facilities?.length || 0, 20);
  return Math.min(score, 100);
}

export default compareUniversities;
