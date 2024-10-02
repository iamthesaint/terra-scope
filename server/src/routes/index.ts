import { Router } from 'express';
import authRouter from './auth-routes.js';
import apiRouter from './api/index.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/api', apiRouter);

export default router;
