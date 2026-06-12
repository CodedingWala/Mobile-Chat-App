import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils/getToken";

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
}


export async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    
   
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    
    const hash = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name,
      email,
      password: hash
    });
   

    const token = generateToken(newUser._id.toString())
    
    
    res.status(201).json({
      message: "User created successfully",
      token,
      user:newUser
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    
  
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    
   
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    
    
    const token = generateToken(user._id.toString());
    

    res.status(200).json({
      message: "Login successful",
      token,
      user:user
    });
    
  } catch (error) {
    console.error(error);
    res.status(500)
    next(error);
  }
}