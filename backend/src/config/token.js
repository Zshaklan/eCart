import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    const token = jwt.sign(userId, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Token error", error);
  }
};

export const generateAdminToken = (email) => {
  try {
    const token = jwt.sign(email, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Admin Token error", error);
  }
};
