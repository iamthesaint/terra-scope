import { Router } from 'express';
import { apiRoutes } from './api/index.js';
import authRoutes from './authRoutes.js'
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use the API routes (e.g., /api/users)
router.use('/api', authenticateToken, apiRoutes);
router.use('/auth', authRoutes)


export default router;

