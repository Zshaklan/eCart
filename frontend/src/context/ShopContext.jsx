import { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";

// eslint-disable-next-line
export const ShopDataContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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
  }, []);

  let values = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopDataContext.Provider value={values}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContextProvider;
