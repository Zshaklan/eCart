import Order from "../model/order.model.js";
import User from "../model/user.model.js";

// for User
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: [] });

    return res.status(201).json({
      message: "Order Placed Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Placing Order" });
  }
};

// for User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// for Admin
export const getAllOrders = async (req, res) => {
  try {
    const adminEmail = req.adminEmail;

    if (!adminEmail) {
      return res.status(404).json({ message: "Unauthorized, Admin only!" });
    }

    const orders = await Order.find();
    res.status(200).json({ message: "Orders fetched successfully!", orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all orders ",
      error: error.message,
    });
  }
};

// for Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Order status updated!" });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status ",
      error: error.message,
    });
  }
};
