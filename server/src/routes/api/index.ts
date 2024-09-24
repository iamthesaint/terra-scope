import { Router } from 'express';
import userRouter from './user-routes.js';
// import { listRouter } from './listRoutes.js'


const router = Router();

router.use('/users', userRouter);
// router.use('/lists', listRouter)

export default router;