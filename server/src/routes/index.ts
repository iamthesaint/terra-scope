import { Router } from 'express';
import apiRoutes from './api/index.js';
import authRoutes from './authRoutes.js'
import { authenticateToken } from '../middleware/auth.js';
import tripadvRoutes from './api/tripadv.js';

const router = Router();

router.use('/api', 
    authenticateToken,
     apiRoutes);
router.use('/auth', authRoutes);
router.use('/tripadvisor', tripadvRoutes);

export default router;