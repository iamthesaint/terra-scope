import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

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

const router = Router();
router.post("/login", login);
export default router;
