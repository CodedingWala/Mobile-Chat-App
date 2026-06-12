import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import {  getMe, login, Register } from "../controller/authController";

const router = Router();

router.get("/me", protectRoute, getMe);
router.post("/register", Register);
router.post("/login", login);

export default router;