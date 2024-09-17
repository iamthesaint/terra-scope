import { Router } from 'express';
import { searchDestinations } from '../../controllers/destinationController';

const destinationRouter = Router();

// define a route for searching destinations
destinationRouter.get('/', searchDestinations);

export { destinationRouter };
