import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { Review } from '../models/Review';
import mongoose from 'mongoose';

const router = Router();

router.get('/university/:universityId', async (req, res: Response) => {
  try {
    const reviews = await Review.find({ universityId: req.params.universityId, isVerified: true })
      .populate('userId', 'name avatar').sort({ createdAt: -1 });
    const stats = await Review.aggregate([
      { $match: { universityId: new mongoose.Types.ObjectId(req.params.universityId) } },
      { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    res.json({ success: true, data: { reviews, stats: stats[0] || { average: 0, count: 0 } } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await Review.findOne({ universityId: req.body.universityId, userId: req.user?.id });
    if (existing) return res.status(400).json({ success: false, message: 'Already reviewed this university' });
    const review = await Review.create({ ...req.body, userId: req.user?.id });
    res.status(201).json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
