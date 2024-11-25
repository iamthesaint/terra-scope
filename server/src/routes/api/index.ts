import { Router } from 'express';
import { userRouter } from './user-routes.js';
import  savedLocationsRouter  from '../saved.js';
import wikiRouter from '../api/wiki.js';


const router = Router();

router.use('/users', userRouter);
router.use('/saved', savedLocationsRouter);
router.use('/wiki', wikiRouter);


export default router;