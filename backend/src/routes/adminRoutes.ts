import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { User } from '../models/User';
import { University } from '../models/University';
import { Application } from '../models/Application';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/dashboard', async (req, res) => {
  try {
    const [totalUsers, totalUniversities, totalApplications, activeStudents] = await Promise.all([
      User.countDocuments(),
      University.countDocuments(),
      Application.countDocuments(),
      User.countDocuments({ role: 'student', isActive: true }),
    ]);
    res.json({
      success: true,
      data: { totalUsers, totalUniversities, totalApplications, activeStudents },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
