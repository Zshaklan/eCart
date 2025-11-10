import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Orders = () => {
  const { serverUrl } = useContext(AuthDataContext);

  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/order/list`, {
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [serverUrl]);

  const toggleExpand = (orderId) => {
    setExpandedId((prev) => (prev === orderId ? null : orderId));
  };

  const updateOrderStatus = async (id, newStatus) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to change the order status to "${newStatus}"?`
    );
    if (!confirmUpdate) return;

    try {
      setUpdating(true);
      await axios.post(
        `${serverUrl}/api/order/update-status`,
        { orderId: id, status: newStatus },
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update order status!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] overflow-x-hidden relative">
      <Navbar />
      <Sidebar />

      <div className="w-full md:w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute md:right-0 md:left-auto left-0">
        <div className="w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-6 py-20 px-4 sm:px-6 md:px-[60px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
            All Orders List
          </h2>

          {loading ? (
            <p className="text-gray-400 text-center">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-400 text-center">No orders found</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => {
                const isExpanded = expandedId === order._id;
                return (
                  <article
                    key={`order-${order._id}`}
                    className={`bg-linear-to-br from-slate-700/80 to-slate-800/80 
              backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg 
              border transition-all duration-300 hover:-translate-y-1 
              ${
                isExpanded
                  ? "border-[#00e0c6]/50 shadow-[#00e0c6]/20"
                  : "border-slate-600/30"
              }`}
                  >
                    <div className="p-5 space-y-4">
                      <div className="flex flex-col items-start gap-2">
                        <h3 className="font-semibold text-lg text-white truncate">
                          Order #{order._id}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "Shipped"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-slate-600/30 pt-2">
                        {order.items.map((item, index) => (
                          <div
                            key={`${order._id}-${index}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-white ">{item.name}</span>
                            <span className="text-gray-400">
                              x{item.quantity} — ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-600/30 pt-2">
                        <p className="text-sm text-gray-400">
                          Total :{" "}
                          <span className="text-[#00e0c6] font-semibold">
                            ₹{order.amount}
                          </span>
                        </p>
                      </div>

                      <div className="border-t border-slate-600/30 pt-2">
                        <p className="text-sm text-gray-400">
                          PaymentMode :{" "}
                          <span className="text-[#00e0c6] font-semibold">
                            {order.paymentMethod}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.payment === false
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            } float-end`}
                          >
                            {order.payment === false ? "Pending" : "Paid"}
                          </span>
                        </p>
                      </div>

                      <div className="text-sm text-gray-400 border-t border-slate-600/30 pt-2">
                        <p>
                          Name :{" "}
                          {`${order.address.firstName} ${order.address.lastName}`}
                        </p>
                        <p>{order.address.email}</p>
                      </div>

                      <button
                        onClick={() => toggleExpand(order._id)}
                        className="w-full bg-[#00e0c6] hover:bg-[#00b8a0] 
                  text-[#0c2025] px-4 py-2.5 rounded-lg text-sm 
                  font-semibold transition-all duration-200 shadow-lg 
                  shadow-[#00e0c6]/30"
                      >
                        {isExpanded ? "Hide Details" : "View Full Details"}
                      </button>

                      {isExpanded && (
                        <div
                          className="pt-4 border-t border-slate-600/50 space-y-3 animate-fadeIn"
                          style={{ animation: "fadeIn 0.3s ease-in-out" }}
                        >
                          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-600/30">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                              Shipping Address
                            </p>
                            <p className="text-sm text-white">
                              {order.address.street}
                            </p>
                            <p className="text-sm text-gray-400">
                              {order.address.city}, {order.address.state} -{" "}
                              {order.address.pincode}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-600/40">
                        <label className="block text-xs text-gray-500 uppercase font-semibold mb-1">
                          Update Order Status
                        </label>
                        <select
                          disabled={updating}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600/50 focus:outline-none focus:border-[#00e0c6] transition"
                          defaultValue={order.status}
                        >
                          <option>Order Placed</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
