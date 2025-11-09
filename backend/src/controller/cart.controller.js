import User from "../model/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product ID and size are required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cartData || typeof user.cartData !== "object") {
      user.cartData = [];
    }

    let cartArray = Array.isArray(user.cartData) ? user.cartData : [];

    const existingItemIndex = cartArray.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (existingItemIndex !== -1) {
      cartArray[existingItemIndex].quantity += 1;
    } else {
      cartArray.push({ productId, size, quantity: 1 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { cartData: cartArray },
      { new: true, runValidators: false }
    ).select("cartData");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cartData } = req.body;

    if (!cartData || !Array.isArray(cartData)) {
      return res.status(400).json({
        success: false,
        message: "Valid cart data is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { cartData: cartData },
      { new: true, runValidators: false }
    ).select("cartData");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = Array.isArray(user.cartData) ? user.cartData : [];

    res.status(200).json({
      success: true,
      cartData: cartData,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
      error: error.message,
    });
  }
};
