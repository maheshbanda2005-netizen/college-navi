import { Router } from 'express';
import {
  getRecommendations, predictAdmission, getScholarshipMatches,
  chatWithAI, getCareerGuidance, predictByRank,
} from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/recommendations', authenticate, getRecommendations);
router.post('/admission-predict', authenticate, predictAdmission);
router.post('/rank-predictor', predictByRank);
router.post('/scholarship-match', authenticate, getScholarshipMatches);
router.post('/chat', chatWithAI);
router.post('/career-guidance', authenticate, getCareerGuidance);

export default router;
