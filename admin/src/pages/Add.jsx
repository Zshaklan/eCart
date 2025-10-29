import { useContext, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import uploadImg from "../assets/upload.jpeg";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { serverUrl } = useContext(AuthDataContext);

  async function handleAddProduct(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);

    try {
      const response = await axios.post(
        `${serverUrl}/api/product/add`,
        formData,
        { withCredentials: true },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      if (response.data) {
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("TopWear");
        setBestseller(false);
        setSizes([]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] overflow-x-hidden relative">
      <Navbar />
      <Sidebar />

      <div className="w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0">
        <form
          onSubmit={handleAddProduct}
          className="w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <h2 className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            Add Product Page
          </h2>

          {loading && (
            <p className="text-[#46d1f7] text-lg font-medium">
              Uploading product... Please wait.
            </p>
          )}

          {error && <p className="text-red-500 text-lg font-medium">{error}</p>}

          <div className="w-full flex flex-col items-start justify-center mt-5 gap-4">
            <p className="text-[20px] md:text-[25px] text-white font-semibold">
              Upload Images
            </p>

            <div className="flex flex-wrap gap-6">
              <label
                htmlFor="image1"
                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={image1 ? URL.createObjectURL(image1) : uploadImg}
                  alt="preview1"
                  className="w-full h-full object-cover rounded-lg"
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                />
              </label>

              <label
                htmlFor="image2"
                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={image2 ? URL.createObjectURL(image2) : uploadImg}
                  alt="preview2"
                  className="w-full h-full object-cover rounded-lg"
                />
                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                />
              </label>

              <label
                htmlFor="image3"
                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={image3 ? URL.createObjectURL(image3) : uploadImg}
                  alt="preview3"
                  className="w-full h-full object-cover rounded-lg"
                />
                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </label>

              <label
                htmlFor="image4"
                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={image4 ? URL.createObjectURL(image4) : uploadImg}
                  alt="preview4"
                  className="w-full h-full object-cover rounded-lg"
                />
                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5 text-white w-[80%]">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#46d1f7] outline-none"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#46d1f7] outline-none h-[100px]"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#46d1f7] outline-none"
              required
            />

            <div className="flex flex-wrap gap-10 w-[80%] text-white">
              <div className="flex flex-col gap-2 text-white">
                <label className="text-[18px] font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#46d1f7] outline-none"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 text-white">
                <label className="text-[18px] font-medium">Subcategory</label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="p-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#46d1f7] outline-none"
                >
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>
            </div>

            {/* Product Sizes */}
            <div className="flex flex-col gap-3 text-white w-[80%] mt-4">
              <label className="text-[18px] font-medium">Available Sizes</label>

              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size]
                      );
                    }}
                    className={`px-4 py-2 rounded-md border cursor-pointer transition-all duration-200 ${
                      sizes.includes(size)
                        ? "bg-[#46d1f7] text-black border-[#46d1f7]"
                        : "bg-[#1a1a1a] text-white border-gray-600 hover:border-[#46d1f7]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-white w-[80%] mt-4">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="w-5 h-5 accent-[#46d1f7] cursor-pointer"
              />
              <label
                htmlFor="bestseller"
                className="text-[18px] font-medium cursor-pointer"
              >
                Mark as Bestseller
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#46d1f7] hover:bg-[#34b6d9] text-black font-semibold py-2 px-6 rounded-md mt-4 mb-8 w-fit cursor-pointer"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
