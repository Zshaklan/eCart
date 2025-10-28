import express from "express";
import { getAdmin, getCurrentUser } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentUser);
router.get("/getadmin", adminAuthMiddleware, getAdmin);

export default router;
