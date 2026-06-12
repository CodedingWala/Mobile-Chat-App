import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export type AuthRequest = Request & {
  userId?: string;
};

export const protectRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
   
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      res.status(401).json({ message: "Not authorized. No token provided." });
      return;
    }
    

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    

    const user = await User.findById(decoded.id);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
  
    req.userId = user._id.toString();
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    
    res.status(500).json({ message: "Server error" });
    next(error);
  }
};