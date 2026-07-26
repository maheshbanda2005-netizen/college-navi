import { Request, Response } from 'express';
import { University } from '../models/University';
import { Course } from '../models/Course';
import { Placement } from '../models/Placement';
import { CampusImage } from '../models/CampusImage';
import { Hostel } from '../models/Hostel';
import { Faculty } from '../models/Faculty';
import { Cutoff } from '../models/Cutoff';

export const getAllUniversities = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 12, search, country, state, city, district, collegeType, ownership } = req.query;
    const query: any = { isVerified: true };
    if (search) query.$text = { $search: search as string };
    if (country) query.country = country;
    if (state) query.state = state;
    if (city) query.city = city;
    if (district) query.district = district;
    if (collegeType) query.collegeType = collegeType;
    if (ownership) query.ownership = ownership;
    const skip = (Number(page) - 1) * Number(limit);
    const [universities, total] = await Promise.all([
      University.find(query).skip(skip).limit(Number(limit)).sort({ 'ranking.nirf': 1, createdAt: -1 }),
      University.countDocuments(query),
    ]);
    res.json({
      success: true,
      data: universities,
      pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityById = async (req: Request, res: Response) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ success: false, message: 'University not found' });
    const [courses, placements, campusImages, hostels, faculty, cutoffs] = await Promise.all([
      Course.find({ universityId: university._id, isActive: true }),
      Placement.find({ universityId: university._id }).sort({ batchYear: -1 }),
      CampusImage.find({ universityId: university._id }).sort({ isPrimary: -1, category: 1 }),
      Hostel.find({ universityId: university._id }),
      Faculty.find({ universityId: university._id }).sort({ isHod: -1 }),
      Cutoff.find({ universityId: university._id }).sort({ year: -1, round: -1 }),
    ]);
    res.json({
      success: true,
      data: { ...university.toObject(), courses, placements, campusImages, hostels, faculty, cutoffs },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const university = await University.create({ ...req.body, createdBy: (req as any).user?.id });
    res.status(201).json({ success: true, data: university });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUniversity = async (req: Request, res: Response) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!university) return res.status(404).json({ success: false, message: 'University not found' });
    res.json({ success: true, data: university });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUniversity = async (req: Request, res: Response) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ success: false, message: 'University not found' });
    await Promise.all([
      Course.deleteMany({ universityId: university._id }),
      Placement.deleteMany({ universityId: university._id }),
      CampusImage.deleteMany({ universityId: university._id }),
      Hostel.deleteMany({ universityId: university._id }),
      Faculty.deleteMany({ universityId: university._id }),
      Cutoff.deleteMany({ universityId: university._id }),
    ]);
    res.json({ success: true, message: 'University deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// === New dedicated sub-resource endpoints ===

export const getUniversityPlacements = async (req: Request, res: Response) => {
  try {
    const placements = await Placement.find({ universityId: req.params.id }).sort({ batchYear: -1 });
    res.json({ success: true, data: placements });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityCampusImages = async (req: Request, res: Response) => {
  try {
    const images = await CampusImage.find({ universityId: req.params.id }).sort({ isPrimary: -1, category: 1 });
    res.json({ success: true, data: images });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityHostels = async (req: Request, res: Response) => {
  try {
    const hostels = await Hostel.find({ universityId: req.params.id });
    res.json({ success: true, data: hostels });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityFaculty = async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.find({ universityId: req.params.id }).sort({ isHod: -1 });
    res.json({ success: true, data: faculty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityCutoffs = async (req: Request, res: Response) => {
  try {
    const { year, category, course } = req.query;
    const filter: any = { universityId: req.params.id };
    if (year) filter.year = Number(year);
    if (category) filter.category = category;
    if (course) filter.course = course;
    const cutoffs = await Cutoff.find(filter).sort({ year: -1, round: -1 });
    res.json({ success: true, data: cutoffs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ universityId: req.params.id, isActive: true });
    res.json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
