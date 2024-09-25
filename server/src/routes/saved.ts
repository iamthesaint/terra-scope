import express from 'express';
import { Request, Response } from 'express';
import { SavedLocation } from '../models/saved-location.js';

const router = express.Router();

// GET /api/saved - fetch all saved locations
router.get('/', async (_req: Request, res: Response) => {
  try {
    const savedLocations = await SavedLocation.findAll(); // Fetch all locations from the database
    res.json(savedLocations);
  } catch (error) {
    console.error("Error fetching saved locations:", error);
    res.status(500).json({ error: "Error fetching saved locations" });
  }
});

// POST /api/saved - add a new saved location
router.post('/', async (req: Request, res: Response) => {
  const newLocation = req.body;

  // val the incoming data
  if (
    !newLocation.name ||
    !newLocation.description ||
    !newLocation.image ||
    !newLocation.web_url
  ) {
    res.status(400).json({ error: 'Invalid location data' });
  }

  try {
    const savedLocation = await SavedLocation.create(newLocation); // save to the database
    return res.status(201).json(savedLocation); // respond with the newly created location
  } catch (error) {
    console.error("Error creating saved location:", error);
    return res.status(500).json({ error: "Error creating saved location" });
  }
}
  
  );


export default router;
