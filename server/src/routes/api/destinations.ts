// routes/destinations.js
import express from 'express';
import { Destination } from '../../models/index.js';

const router = express.Router();

// GET /api/destinations
router.get('/', async (_req, res) => {
  try {
    const destinations = await Destination.findAll();
    return res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return res.status(500).json({ error: "Failed to fetch destinations" });
  }
});

export { router as DestinationRouter };
