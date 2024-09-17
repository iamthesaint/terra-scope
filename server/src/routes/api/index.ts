import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { flightRouter } from './flightRoutes';
import { destinationRouter } from './destinationRoutes';

const router = Router();

// home route
router.get('/', (_req, res) => {
  res.json({ message: 'Home' });
});

// user routes
router.use('/users', userRouter);

// flight routes
router.use('/flights', flightRouter)

// destination routes
router.use('/destinations', destinationRouter)

export { router as apiRoutes };