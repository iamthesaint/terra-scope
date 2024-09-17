import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import flightRoutes from './flightRoutes';
import destRoutes from './destinationRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/flights', flightRoutes)
router.use('destination', destRoutes)

export default router;