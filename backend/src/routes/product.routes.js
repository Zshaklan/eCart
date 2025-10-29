import express from "express";
import upload from "../middleware/multer.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.middleware.js";
import {
  addProduct,
  listProducts,
  removeProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/list", listProducts);
router.delete("/remove/:productId", adminAuthMiddleware, removeProduct);

export default router;
