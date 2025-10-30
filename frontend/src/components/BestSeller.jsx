import { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import Card from "./Card.jsx";

const BestSeller = () => {
  const { products } = useContext(ShopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProducts = products.filter((item) => item.bestseller);

    setBestSeller(filterProducts.slice(0, 4));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-full text-center md:mt-[50px]">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100">
          Tried, Tested, Loved | Discover Our All-Time Best Sellers.
        </p>
      </div>

      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
