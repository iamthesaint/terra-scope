// controllers/saved-controller.js
import { Destination } from '../models/destination.js';
import { Request, Response } from 'express';

export const getSaved = async (_req: Request, res: Response) => {
  try {
    const savedDestinations = await Destination.findAll();
    res.json(savedDestinations);
  } catch (error) {
    console.error("Error fetching saved destinations:", error);
    res.status(500).json({ error: "Failed to fetch saved destinations" });
  }
};

export const createSaved = async (req: Request, res: Response) => {
  const { name, description, image, web_url, userId } = req.body;
  try {
    const newDestination = await Destination.create({ name, description, image, web_url, userId });
    res.status(201).json(newDestination);
  } catch (error) {
    console.error("Error creating saved destination:", error);
    res.status(400).json({ error: "Failed to create saved destination" });
  }
};

export const deleteSaved = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCount = await Destination.destroy({ where: { id } });
    if (deletedCount) {
      res.status(204).send(); // no content
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error deleting saved destination:", error);
    res.status(500).json({ error: "Failed to delete saved destination" });
  }
};
