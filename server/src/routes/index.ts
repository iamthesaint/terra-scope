import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import authRouter from './auth-routes.js';
import apiRouter from './api/index.js';
import wikiRouter from './api/wiki.js';
import userRouter from './api/index.js';
import savedRoutes from '../routes/saved.js';

const router = Router();

// auth routes (login, signup, etc.)
router.use('/auth', authRouter);

// user routes
router.use('/users', authenticateToken, userRouter);

router.use('/api', apiRouter);

// wiki routes
router.use('/wiki', wikiRouter);

router.use('/saved', savedRoutes);

export default router;
