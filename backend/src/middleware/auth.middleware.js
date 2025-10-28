import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(`Auth Middleware Error `, error);
    return res.status(500).json({ message: "Authentication Error" });
  }
};
