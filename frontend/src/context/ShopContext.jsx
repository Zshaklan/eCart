import { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";

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

  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      try {
        setCartData(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cartData");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (productId, size) => {
    if (!size) {
      alert("Please select a size");
      return;
    }

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
  };

  const removeFromCart = (productId, size) => {
    setCartData((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  const increaseQty = (productId, size) => {
    setCartData((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId, size) => {
    setCartData((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
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
  };

  return (
    <ShopDataContext.Provider value={values}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContextProvider;
