import { Router } from 'express';
import { apiRoutes } from './api'; // Import the API routes

const router = Router();

// Use the API routes (e.g., /api/users)
router.use('/api', apiRoutes);


export { router };

