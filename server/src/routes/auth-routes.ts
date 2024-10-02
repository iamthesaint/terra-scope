import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const router = Router();


export const login = async (req: Request, res: Response) => {
  // if the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  return res.status(200).json({ token });
};

router.post("/login", login);


export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey, { expiresIn: "1h" });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
}

router.post("/signup", signUp);

export default router;
