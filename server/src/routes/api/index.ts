import { Router } from 'express';
import { userRouter } from './userRoutes.js';

const router = Router();

// home route
router.get('/', (_req, res) => {
  res.json({ message: 'Home' });
});

// user routes
router.use('/users', userRouter);


export { router as apiRoutes };