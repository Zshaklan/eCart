import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.middleware.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../controller/order.controller.js";

const router = express.Router();

// for User
router.post("/place-order", authMiddleware, placeOrder);
router.get("/user-orders", authMiddleware, getUserOrders);

// for Admin
router.get("/list", adminAuthMiddleware, getAllOrders);
router.post("/update-status", adminAuthMiddleware, updateOrderStatus);

export default router;
