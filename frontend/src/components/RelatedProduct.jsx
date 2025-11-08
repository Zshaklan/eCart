import { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import Card from "./Card.jsx";
import Title from "./Title.jsx";

const RelatedProduct = ({ category, subCategory, currentProdId }) => {
  const { products } = useContext(ShopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products
        .filter(
          (item) =>
            item.category.toLowerCase().trim() ===
              category.toLowerCase().trim() &&
            item.subCategory.toLowerCase().trim() ===
              subCategory.toLowerCase().trim() &&
            item._id !== currentProdId
        )
        .slice(0, 4);

      setRelated(relatedProducts);
    }
  }, [products, category, subCategory, currentProdId]);

  return (
    <section className="w-full bg-linear-to-l from-[#141414] to-[#0c2025] text-white py-10 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-10">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>

        {related.length > 0 ? (
          <div className="lg:w-[80vw] md:w-[60vw] w-full min-h[70vh] flex items-center justify-start flex-wrap gap-[30px]">
            {related.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                image={item.image1}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            No related products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default RelatedProduct;
