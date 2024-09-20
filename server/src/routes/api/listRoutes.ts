import express from "express";
import type { Request, Response } from "express";
import { List } from "../../models/index.js";

const router = express.Router();

// GETTING /lists

router.get("/", async (_req: Request, res: Response) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GETTING LIST BY ID

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const list = await List.findByPk(id);
    if (list) {
      res.json(list);
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POSTING LISTS (CREATING)

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newList = await List.create({ name });
    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (UPDATING A LIST BY ID)

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const list = await List.findByPk(id);
    if (list) {
      list.name = name;
      await list.save();
      res.json(list);
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (DELETE LIST BY ID)

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const list = await List.findByPk(id);
    if (list) {
      await list.destroy();
      res.json({ message: "List deleted" });
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as listRouter };