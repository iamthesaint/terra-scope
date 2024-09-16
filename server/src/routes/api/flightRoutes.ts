import express from 'express';
import { searchFlights } from '../../controllers/flightController';

const router = express.Router();

router.get('/search', searchFlights); // route for searching flights

export default router;
