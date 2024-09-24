import express from "express";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt'; // Ensure bcrypt is used for password hashing
import { User } from "../../models/index.js"; // Adjust path to your models

const router = express.Router();

// GET ALL USERS (excluding passwords)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER BY ID (excluding password)
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE A NEW USER
router.post("/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE USER BY ID (Username, Email, Password)
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    // Update email if provided
    if (email) {
      user.email = email;
    }

    // Hash the new password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();
    res.json(user); // Return the updated user details
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE USER BY ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };
