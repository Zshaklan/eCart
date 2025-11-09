import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserOrders, placeOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get("/user-orders", authMiddleware, getUserOrders);

export default router;
