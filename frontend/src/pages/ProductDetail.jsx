import { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext.jsx";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopDataContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setMainImage(found.image1);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white bg-linear-to-l from-[#141414] to-[#0c2025]">
        Loading...
      </div>
    );
  }

  const {
    name,
    description,
    image1,
    image2,
    image3,
    image4,
    price,
    category,
    subCategory,
  } = productData;

  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] items-center justify-start md:pt-[150px] pt-[90px] overflow-x-hidden text-white">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] flex flex-col lg:flex-row gap-10 items-start justify-center">
        <div className="w-full lg:w-[45%] flex flex-col gap-5">
          <div className="w-full h-[500px] rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={mainImage}
              alt={name}
              className="w-full h-full object-contain rounded-xl transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-center gap-5 flex-wrap">
            {[image1, image2, image3, image4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-xl border-2 transition-all ${
                  mainImage === img ? "border-[#46d1f7]" : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col gap-5">
          <h1 className="text-[30px] font-semibold">{name}</h1>
          <p className="text-[20px] text-[#46d1f7]">
            {currency}
            {price}
          </p>
          <p className="text-[15px] text-gray-300 leading-relaxed">
            {description || "No description available for this product."}
          </p>

          <div className="text-gray-400 text-[14px]">
            <p>
              <span className="font-medium text-white">Category : </span>
              {category}
            </p>
            <p>
              <span className="font-medium text-white">Subcategory : </span>
              {subCategory}
            </p>
          </div>

          <div>
            <p className="text-[16px] mb-2 text-gray-200">Select Size : </p>
            <div className="flex items-center gap-3">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-[45px] h-[45px] rounded-full border-2 ${
                    size === s
                      ? "border-[#46d1f7] bg-[#46d1f7] text-black font-semibold"
                      : "border-gray-500 text-white hover:border-[#46d1f7]"
                  } transition-all`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            <button
              className="bg-[#46d1f7] hover:bg-[#2bb4da] text-black font-semibold px-10 py-3 rounded-xl transition-all cursor-pointer"
              disabled={!size}
            >
              Add to Cart
            </button>
            {!size && (
              <p className="text-[13px] text-red-400">
                Select a size to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
