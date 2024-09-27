import { Router } from 'express';
import userRouter from './user-routes.js';
import savedLocationsRouter from '../saved.js';
import tripadvRouter from './tripadv.js';


const router = Router();

router.use('/users', userRouter);
router.use('/saved', savedLocationsRouter);
router.use('/tripadv', tripadvRouter);


export default router;