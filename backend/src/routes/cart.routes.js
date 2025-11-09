import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/get", authMiddleware, getUserCart);
router.post("/add", authMiddleware, addToCart);
router.post("/update", authMiddleware, updateCart);

export default router;
