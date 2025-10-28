import express from "express";
import {
  adminLogin,
  googleLogin,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/logout", logout);
router.post("/user/google-login", googleLogin);
router.post("/user/admin-login", adminLogin);

export default router;
