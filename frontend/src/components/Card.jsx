import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext.jsx";

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(ShopDataContext);

  return (
    <div className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg hover:scale-[102%] flex items-start justify-start flex-col p-2.5 cursor-pointer border border-[#80808049]">
      <img
        src={image}
        alt="productImg"
        className="w-full h-[80%] rounded-sm object-cover"
      />
      <p className="text-[#c3f6fa] text-lg mt-1 font-medium truncate">{name}</p>
      <p className="text-gray-300 text-sm mt-1">
        {currency}
        {price}
      </p>
    </div>
  );
};

export default Card;
