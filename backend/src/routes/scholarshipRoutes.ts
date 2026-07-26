import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { Scholarship } from '../models/Scholarship';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category, gender, state, maxIncome, page = 1, limit = 20 } = req.query;
    const query: any = { isActive: true };
    if (category) query['eligibility.category'] = category;
    if (gender) query['eligibility.gender'] = gender;
    if (state) query['eligibility.state'] = state;
    if (maxIncome) query['eligibility.maxIncome'] = { $gte: Number(maxIncome) };
    const skip = (Number(page) - 1) * Number(limit);
    const [scholarships, total] = await Promise.all([
      Scholarship.find(query).skip(skip).limit(Number(limit)).sort({ deadline: 1 }),
      Scholarship.countDocuments(query),
    ]);
    res.json({ success: true, data: scholarships, pagination: { total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) return res.status(404).json({ success: false, message: 'Scholarship not found' });
    res.json({ success: true, data: scholarship });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json({ success: true, data: scholarship });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scholarship) return res.status(404).json({ success: false, message: 'Scholarship not found' });
    res.json({ success: true, data: scholarship });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Scholarship deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
