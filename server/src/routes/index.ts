import { Router } from 'express';
import { userRouter } from './api/user-routes.js';
import { authRouter } from './auth-routes.js';
import { tripadvRouter } from './api/tripadv.js';
import { authenticateToken } from '../middleware/auth.js';
import { apiRouter } from './api/index.js';

const router = Router();

// auth routes (login, signup, etc.)
router.use('/auth', authRouter);

// user routes
router.use('/users', authenticateToken, userRouter);

// protected route
router.use('/api', apiRouter);

// tripadvisor routes
router.use('/tripadvisor', authenticateToken, tripadvRouter);

export default router;
