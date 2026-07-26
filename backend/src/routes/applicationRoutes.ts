import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { Application } from '../models/Application';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const query: any = {};
    if ((req as any).user.role === 'student') query.userId = (req as any).user.id;
    const applications = await Application.find(query).populate('universityId', 'name').populate('courseId', 'name').sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, authorize('student'), async (req, res) => {
  try {
    const application = await Application.create({ ...req.body, userId: (req as any).user.id });
    res.status(201).json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/status', authenticate, authorize('admin', 'university'), async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
