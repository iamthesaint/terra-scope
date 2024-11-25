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
    console.log("Incoming request body:", req.body); // Log the incoming request body
    
    const newLocation = req.body;

    // Validate the incoming data
    if (
        !newLocation.name ||
        !newLocation.description ||
        !newLocation.image ||
        typeof newLocation.name !== "string" ||
        typeof newLocation.description !== "string" ||
        typeof newLocation.image !== "string"
    ) {
        console.log("Validation failed:", newLocation); // Log validation failure
        return res.status(400).json({ error: 'Invalid location data' });
    }

    try {
        const savedLocation = await SavedLocation.create(newLocation); // Save to the database
        return res.status(201).json(savedLocation); // Respond with the newly created location
    } catch (error) {
        console.error("Error creating saved location:", error);
        return res.status(500).json({ error: "Error creating saved location" });
    }
});


// DELETE /api/saved/:id - remove a saved location
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedLocation = await SavedLocation.destroy({ where: { id } });
    if (!deletedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting location:", error);
    return res.status(500).json({ error: "Error deleting location" });
  }
});

export default router;
