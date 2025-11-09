import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title.jsx";
import { ShopDataContext } from "../context/ShopContext.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const PlaceOrder = () => {
  const { cartData, products, currency, delivery_fee, getCartTotal } =
    useContext(ShopDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const total = getCartTotal();

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (let item of cartData) {
        const product = products.find((p) => p._id === item.productId);
        if (product) {
          orderItems.push({
            productId: item.productId,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            size: item.size,
            image: product.image1,
          });
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: total + delivery_fee,
      };

      if (paymentMethod === "razorpay") {
        console.log("Processing Razorpay payment...");
      } else {
        console.log("Order placed with Cash on Delivery");

        const response = await axios.post(
          `${serverUrl}/api/order/place-order`,
          orderData,
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
      }

      navigate("/order");
    } catch (error) {
      console.error("Order placement error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-[#141414] to-[#0c2025] flex items-start justify-center py-25 px-5">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="py-2.5">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="text"
                placeholder="First Name"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                required
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="text"
                placeholder="Street"
                className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="text"
                placeholder="City"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />

              <input
                type="text"
                placeholder="State"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="text"
                placeholder="Pincode"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                required
              />

              <input
                type="text"
                placeholder="Country"
                className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="w-full h-[70px] flex items-center justify-between px-2.5">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="py-5 px-2.5">
              <Title text1={"PAYMENT"} text2={"METHOD"} />

              <div className="flex flex-col gap-4 mt-5">
                <div
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "bg-[#46d1f7] bg-opacity-20 border-2 border-[#46d1f7]"
                      : "bg-slate-700 border-2 border-transparent hover:border-slate-500"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "razorpay"
                        ? "border-[#46d1f7]"
                        : "border-gray-400"
                    }`}
                  >
                    {paymentMethod === "razorpay" && (
                      <div className="w-3 h-3 rounded-full bg-[#46d1f7]"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">Razorpay</span>
                    <span className="text-sm text-gray-400">
                      (Credit/Debit/UPI/Netbanking)
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "bg-[#46d1f7] bg-opacity-20 border-2 border-[#46d1f7]"
                      : "bg-slate-700 border-2 border-transparent hover:border-slate-500"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod"
                        ? "border-[#46d1f7]"
                        : "border-gray-400"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-3 h-3 rounded-full bg-[#46d1f7]"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">
                      Cash on Delivery
                    </span>
                    <span className="text-sm text-gray-400">
                      (Pay when you receive)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[400px] h-fit bg-[#ffffff0a] backdrop-blur-lg rounded-2xl p-6 border border-[#ffffff10] flex flex-col gap-3 text-lg font-medium sticky top-10">
          <div className="flex justify-between text-[#46d1f7] text-xl mt-3">
            <p>Subtotal:</p>
            <p>
              {currency}
              {total.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-gray-400">
            <p>Delivery Fee:</p>
            <p>
              {currency}
              {delivery_fee.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-[#46d1f7] text-xl font-semibold mt-3">
            <p>Total:</p>
            <p>
              {currency}
              {(total + delivery_fee).toFixed(2)}
            </p>
          </div>

          <div className="mt-3 p-3 bg-slate-700 bg-opacity-50 rounded-lg">
            <p className="text-sm text-gray-300">Payment Method:</p>
            <p className="text-base font-semibold text-[#46d1f7] mt-1">
              {paymentMethod === "razorpay"
                ? "Razorpay (Online)"
                : "Cash on Delivery"}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#46d1f7] text-black font-semibold py-3 mt-3 rounded-xl hover:bg-[#2bb4da] transition-all cursor-pointer"
          >
            {paymentMethod === "razorpay"
              ? "Proceed to Payment"
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
