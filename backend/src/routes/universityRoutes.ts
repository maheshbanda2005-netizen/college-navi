import { Router } from 'express';
import {
  getAllUniversities, getUniversityById, createUniversity,
  updateUniversity, deleteUniversity,
  getUniversityPlacements, getUniversityCampusImages,
  getUniversityHostels, getUniversityFaculty,
  getUniversityCutoffs, getUniversityCourses,
} from '../controllers/universityController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllUniversities);
router.get('/:id', getUniversityById);
router.post('/', authenticate, authorize('admin', 'university'), createUniversity);
router.put('/:id', authenticate, authorize('admin', 'university'), updateUniversity);
router.delete('/:id', authenticate, authorize('admin'), deleteUniversity);

// Sub-resource endpoints
router.get('/:id/placements', getUniversityPlacements);
router.get('/:id/campus-images', getUniversityCampusImages);
router.get('/:id/hostels', getUniversityHostels);
router.get('/:id/faculty', getUniversityFaculty);
router.get('/:id/cutoffs', getUniversityCutoffs);
router.get('/:id/courses', getUniversityCourses);

export default router;
