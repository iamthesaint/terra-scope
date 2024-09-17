import express from 'express';
import { flightRouter } from './routes/api/flightRoutes';
import { destinationRouter } from './routes/api/destinationRoutes';

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// use the flight-related routes under api/flights
app.use('/flights', flightRouter);

// use the destination-related routes under api/destinations
app.use('/destinations', destinationRouter);

export default app;
