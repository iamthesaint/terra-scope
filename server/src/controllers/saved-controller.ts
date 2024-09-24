import { Destination } from '../models/destination.js';
import { Request, Response } from 'express';

declare module 'express-session' {
  interface Session {
    userId: string;
  }
}

export const getSaved = async (_req: Request, res: Response) => {
  try {
    const userId = _req.session.userId;
    const savedDestinations = await Destination.findAll({ where: { userId } });
    res.json(savedDestinations);
  } catch (error) {
    console.error("Error getting saved destinations:", error);
    res.status(500).json({ error: "Failed to get saved destinations" });
  }
};

export const createSaved = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const { image, name, description, web_url } = req.body;

  try {
    const newDestination = await Destination.create({
      image,
      name,
      description,
      web_url,
      userId: Number(userId)
    });
    res.status(201).json(newDestination);
  } catch (error) {
    console.error("Error creating saved destination:", error);
    res.status(500).json({ error: "Failed to create saved destination" });
  }
};

export const deleteSaved = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCount = await Destination.destroy({ where: { id } });
    if (deletedCount) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error deleting saved destination:", error);
    res.status(500).json({ error: "Failed to delete saved destination" });
  }
};
