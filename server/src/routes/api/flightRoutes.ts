import { Router } from 'express';
import { searchFlights } from '../../controllers/flightController';

const flightRouter = Router();

flightRouter.get('/flights', searchFlights);

export { flightRouter };