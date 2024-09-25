import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

let savedLocations: Array<{
  name: string;
  description: string;
  image: string;
  web_url: string;
}> = [];

// GET /api/saved - fetch all saved locations
router.get('/', (_req: Request, res: Response) => {
  res.json(savedLocations);
});

// POST /api/saved - add a new saved location
router.post('/', (req: Request, res: Response) => {
  const newLocation = req.body;

  // val the incoming data
  if (
    !newLocation.name ||
    !newLocation.description ||
    !newLocation.image ||
    !newLocation.web_url
  ) {
    return res.status(400).json({ error: 'Invalid location data' });
  }

  savedLocations.push(newLocation);
  return res.status(201).json(newLocation); // Respond with the newly created location
});

export default router;
