import React, { useContext, useEffect, useState } from "react";
import { AuthDataContext } from "../context/AuthContext";
import { ShopDataContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title";
import { toast } from "react-toastify";

const Order = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const { currency } = useContext(ShopDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/order/user-orders`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-blue-400";
      case "Processing":
        return "text-yellow-400";
      case "Shipped":
        return "text-purple-400";
      case "Out for Delivery":
        return "text-orange-400";
      case "Delivered":
        return "text-green-400";
      case "Cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-linear-to-r from-[#141414] to-[#0c2025] flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-[#141414] to-[#0c2025] py-30 md:py-25 px-3 sm:px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="text-gray-400 text-lg sm:text-xl mb-3 sm:mb-4">
              No orders yet
            </div>
            <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 text-center px-4">
              Start shopping to see your orders here
            </p>

            <a
              href="/collections"
              className="bg-[#46d1f7] text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-[#2bb4da] transition-all text-sm sm:text-base"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-[#ffffff0a] backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#ffffff10]"
              >
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 pb-4 border-b border-[#ffffff20]">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-gray-400 text-xs sm:text-sm">Order ID</p>
                    <p className="text-white font-semibold text-xs sm:text-base break-all">
                      {order._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Date</p>
                    <p className="text-white text-xs sm:text-base">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Payment</p>
                    <p className="text-white capitalize text-xs sm:text-base">
                      {order.paymentMethod === "COD" ? "COD" : "Razorpay"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Status</p>
                    <p
                      className={`font-semibold text-xs sm:text-base ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start sm:items-center gap-3 sm:gap-4 bg-[#ffffff05] rounded-lg p-3 sm:p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm sm:text-lg line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 sm:mt-2 text-gray-400 text-xs sm:text-base">
                          <p>
                            {currency}
                            {item.price}
                          </p>
                          <p>Qty: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                      <div className="text-[#46d1f7] font-semibold text-sm sm:text-lg shrink-0">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-[#ffffff20]">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">
                      Delivery Address
                    </p>
                    <p className="text-white text-sm sm:text-base">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {order.address.street}, {order.address.city}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {order.address.state}, {order.address.pincode},{" "}
                      {order.address.country}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Phone: {order.address.phone}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Total Amount
                      </p>
                      <p className="text-[#46d1f7] font-bold text-xl sm:text-2xl">
                        {currency}
                        {order.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchOrders()}
                        className="flex-1 sm:flex-none bg-slate-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-slate-600 transition-all text-sm sm:text-base"
                      >
                        Track
                      </button>
                      {order.status === "Order Placed" && (
                        <button className="flex-1 sm:flex-none bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-all text-sm sm:text-base">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {order.payment ? (
                  <div className="mt-4 inline-flex items-center gap-2 bg-green-500 bg-opacity-20 border border-green-500 text-green-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Payment Completed</span>
                  </div>
                ) : (
                  <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500 bg-opacity-20 border border-yellow-500 text-yellow-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Payment Pending</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
