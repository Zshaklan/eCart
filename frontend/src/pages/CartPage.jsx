import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartData,
    currency,
    delivery_fee,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getCartTotal,
    products,
  } = useContext(ShopDataContext);

  const navigate = useNavigate();

  const total = getCartTotal();

  return (
    <div className="w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pt-[120px] pb-[100px]">
      <Title text1={"YOUR"} text2={"CART"} />

      {cartData.length === 0 ? (
        <p className="text-gray-400 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-[90%] lg:w-[70%] flex flex-col gap-6">
          {cartData.map((cartItem) => {
            const product = products.find((p) => p._id === cartItem.productId);

            if (!product) return null;

            return (
              <div
                key={`${cartItem.productId}-${cartItem.size}`}
                className="flex flex-col md:flex-row justify-between items-center bg-[#ffffff0a] backdrop-blur-lg rounded-2xl p-4 border border-[#ffffff10]"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-[100px] h-[100px] object-contain rounded-xl"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-[#46d1f7]">
                      {currency}
                      {product.price}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Size: {cartItem.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      decreaseQty(cartItem.productId, cartItem.size)
                    }
                    className="border border-gray-400 px-3 py-1 rounded-lg cursor-pointer hover:bg-[#ffffff15] transition-all"
                  >
                    -
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() =>
                      increaseQty(cartItem.productId, cartItem.size)
                    }
                    className="border border-gray-400 px-3 py-1 rounded-lg cursor-pointer hover:bg-[#ffffff15] transition-all"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(cartItem.productId, cartItem.size)
                  }
                  className="text-red-400 mt-4 md:mt-0 hover:text-red-300 transition-all cursor-pointer"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="bg-[#ffffff0a] backdrop-blur-lg rounded-2xl p-6 border border-[#ffffff10] flex flex-col gap-3 text-lg font-medium">
            <div className="flex justify-between">
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

            <button
              className="bg-[#46d1f7] text-black font-semibold py-3 mt-5 rounded-xl hover:bg-[#2bb4da] transition-all cursor-pointer"
              onClick={() => navigate("/placeorder")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
