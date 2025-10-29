import jwt from "jsonwebtoken";

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (error) {
    console.log(`Admin Auth Middleware Error `, error);
    return res.status(500).json({ message: "Authentication Error" });
  }
};
