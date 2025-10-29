import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { AuthDataContext } from "../context/AuthContext.jsx";

const Lists = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serverUrl } = useContext(AuthDataContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${serverUrl}/api/product/remove/${id}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] overflow-x-hidden relative">
      <Navbar />
      <Sidebar />

      <div className="w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0">
        <div className="w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]">
          <h2 className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            All Listed Products
          </h2>

          {loading ? (
            <p className="text-gray-400 text-center">Loading products...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-gray-400 text-center">No products found</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-slate-600 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col"
                >
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />

                  <div className="flex-1 flex flex-col justify-between relative">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 truncate text-white">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {product.category} • {product.subcategory}
                      </p>
                      <p className="font-medium text-[#00e0c6] mb-2">
                        ₹{product.price}
                      </p>
                      <p className="text-white text-sm">
                        Size: {product.sizes.join(", ") || "N/A"}
                      </p>
                      <p className="text-white text-sm">
                        Bestseller: {product.bestseller ? "Yes" : "No"}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="absolute bottom-0 right-2 text-red-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <MdDeleteOutline size={30} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
