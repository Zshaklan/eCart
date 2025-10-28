import User from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateAdminToken, generateToken } from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter valid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Enter strong password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    let token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Register error: ", error);
    return res
      .status(500)
      .json({ message: `Registration error ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: `Login error ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Logout error: ", error);
    return res.status(500).json({ message: `Logout error ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    let token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Google Login successfull",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Google Login Error: ", error);
    return res
      .status(500)
      .json({ message: `Google Login error ${error.message}` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = generateAdminToken({ email });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        samesite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(token);
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("adminLogin error: ", error);
    return res
      .status(500)
      .json({ message: `adminLogin error ${error.message}` });
  }
};
