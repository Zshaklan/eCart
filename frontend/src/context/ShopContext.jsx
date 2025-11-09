import { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// eslint-disable-next-line
export const ShopDataContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(AuthDataContext);
  let currency = "₹";
  let delivery_fee = 10;

  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      console.log(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getUserCart = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/cart/get`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCartData(response.data.cartData);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line
  }, []);

  const syncCartToBackend = async (updatedCart) => {
    try {
      await axios.post(
        `${serverUrl}/api/cart/update`,
        { cartData: updatedCart },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/add`,
        { productId, size },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartData((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.productId === productId && item.size === size
          );

          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + 1,
            };
            return updated;
          }

          return [...prev, { productId, size, quantity: 1 }];
        });
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId, size) => {
    const updatedCart = cartData.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    setCartData(updatedCart);
    await syncCartToBackend(updatedCart);
    toast.success("Item removed from cart");
  };

  const increaseQty = async (productId, size) => {
    const updatedCart = cartData.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartData(updatedCart);
    await syncCartToBackend(updatedCart);
  };

  const decreaseQty = async (productId, size) => {
    const updatedCart = cartData.map((item) =>
      item.productId === productId && item.size === size
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
        : item
    );

    setCartData(updatedCart);
    await syncCartToBackend(updatedCart);
  };

  const getCartTotal = () => {
    return cartData.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (product) {
        return total + product.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  const getCartCount = () => {
    return cartData.reduce((count, item) => count + item.quantity, 0);
  };

  let values = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartData,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    getCartTotal,
    getCartCount,
    getUserCart,
  };

  return (
    <ShopDataContext.Provider value={values}>
      <ToastContainer />
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContextProvider;
