import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findOne(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User fetched successfully!!", user });
  } catch (error) {
    console.log(`getCurrentUser Error `, error);
    return res.status(500).json({ message: "User fetching error " });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminEmail = req.adminEmail;

    if (!adminEmail) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({
      message: "Admin fetched successfully!!",
      admin: { email: adminEmail, role: "admin" },
    });
  } catch (error) {
    console.log(`getAdmin Error `, error);
    return res.status(500).json({ message: "Admin fetching error " });
  }
};
